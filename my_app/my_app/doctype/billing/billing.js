// Copyright (c) 2026, Jamuna and contributors
// For license information, please see license.txt
let products_list = {};
frappe.ui.form.on("ProdItems", {
	total(frm) {
        calculate_gross(frm);
	},
    products_remove(frm){
        calculate_gross(frm);
    }
});

frappe.ui.form.on('Billing', {
    onload_post_render(frm) {
        frm.__old_quantities = {};

        (frm.doc.products || []).forEach(row => {
            frm.__old_quantities[row.prod_id] =
                (frm.__old_quantities[row.prod_id] || 0) + (row.quantity || 0);
        });
    },
    customer_phone(frm){
        if(frm.doc.customer_phone.length == 10){
            frappe.db.get_list("Customer", {filters: {phone: frm.doc.customer_phone}, fields: ["name", "name1"], limit: 1}).then(customers => {
                if (customers.length > 0) {
                    frm.set_value("cname", customers[0].name1);
                } else {
                    frm.set_value("cname", "");
                    frappe.msgprint("Customer not found");
                    frm.set_df_property("button", "hidden", 0);
                }
            });
        }
    },
    button(frm){
        let dialog = new frappe.ui.Dialog({
            fields: [
                {
                    label:"Customer Name",
                    fieldname:"customer_name",
                    fieldtype:"Data"
                },
                {
                    label:"Customer Phone no",
                    fieldname:"customer_phone",
                    fieldtype:"Data",
                    options:"Phone",
                    default: frm.doc.customer_phone
                },
                {
                    label:"Customer Email",
                    fieldname:"customer_email",
                    fieldtype:"Data"
                }
            ],
            primary_action_label: "Create",
            primary_action(values){
                dialog.hide();
                frappe.call({
                    method: "my_app.api.create_customer",
                    args: {
                        "name": values.customer_name,
                        "phone": values.customer_phone,
                        "email": values.customer_email
                    },
                    callback(res){
                        frm.set_df_property("button", "hidden", "1");
                        frm.set_value("cname", res.message);
                    }
                })
            }
        })
        dialog.show()
    },
    
    discount_coupon(frm) {
        discount(frm);
    },
    gross_total(frm){
        discount(frm);
    },
    async after_save(frm) {
        let new_quantities = {};
        (frm.doc.products || []).forEach(row => {
            new_quantities[row.prod_id] =
                (new_quantities[row.prod_id] || 0) + (row.quantity || 0);
        });
        let product_ids = new Set([
            ...Object.keys(frm.__old_quantities || {}),
            ...Object.keys(new_quantities)
        ]);
        for (let prod_id of product_ids) {
            let old_qty = (frm.__old_quantities || {})[prod_id] || 0;
            let new_qty = new_quantities[prod_id] || 0;
            let difference = new_qty - old_qty;
            if (difference === 0) {
                continue;
            }
            let product = await frappe.db.get_doc("Products", prod_id);
            let new_stock = product.stock - difference;
            if (new_stock < 0) {
                frappe.throw(`Only ${product.stock} stocks available for ${product.pname}`);
            }
            await frappe.db.set_value("Products", prod_id, "stock", new_stock);
            console.log(`${product.pname}: ${product.stock} → ${new_stock}`);
        }
        frm.__old_quantities = new_quantities;
    },
    workflow_status(frm){
        set_indicator(frm);
    },
    refresh(frm){
        if(frm.doc.docstatus === 1){
            frm.add_custom_button("Make Payment", ()=>{
                frappe.db.get_list("Make Payment",{fields: ["name","bill_id"], filters: {bill_id: frm.doc.name}, limit: 1})
                .then((doc)=>{
                    if(doc.length > 0){
                        frappe.set_route("Form", "Make Payment", doc[0].name);
                    }else{
                        frappe.new_doc("Make Payment", {
                            bill_id: frm.doc.name,
                            total_amount: frm.doc.total_amount,
                            balance_amount: frm.doc.balance_amount
                        })
                    }
                })
            })
        }
        frm.fields_dict.products.grid.cannot_add_rows = true;
        frm.fields_dict.products.grid.refresh();
            //     let dialog = new frappe.ui.Dialog({
            //         title: "Select Products",
            //         size: "extra-large",
            //         fields: [
            //             {
            //                 fieldname: "products_html",
            //                 fieldtype: "HTML"
            //             }
            //         ],
            //         primary_action_label: "Get Products",
            //         primary_action() {
            //             let selected_products = [];
            //             dialog.$wrapper
            //                 .find(".product-row")
            //                 .each(function () {
            //                     let row = $(this);
            //                     let checkbox = row.find(".product-check");
            //                     if (checkbox.is(":checked")) {
            //                         let qty = Number(row.find(".product-qty").val());
            //                         let stock = Number(row.attr("data-stock"));
            //                         if (!qty || qty <= 0) {
            //                             frappe.throw("Please enter quantity");
            //                         }
            //                         if (qty > stock) {
            //                             frappe.throw(`Only ${stock} stock available`);
            //                         }
            //                         selected_products.push({
            //                             name: row.attr("data-name"),
            //                             pname: row.attr("data-pname"),
            //                             price: Number(row.attr("data-price")),
            //                             stock: stock,
            //                             qty: qty
            //                         });
            //                     }
            //                 });
            //             selected_products.forEach(product => {
            //                 let ex_row = (frm.doc.products || []).find(
            //                     row => row.prod_id === product.name
            //                 );
            //                 if(ex_row){
            //                     ex_row.quantity += product.qty;
            //                     ex_row.total = ex_row.price * ex_row.quantity;
            //                 }else{
            //                     let child = frm.add_child("products");
            //                     child.prod_id = product.name;
            //                     child.prod_name = product.pname;
            //                     child.quantity = product.qty;
            //                     child.price = product.price;
            //                     child.total = product.price * product.qty;
            //                 }
            //             });
            //             frm.refresh_field("products");
            //             calculate_gross(frm);
            //             dialog.hide();
            //         }
            //     });
            //     frappe.call({
            //         method: "frappe.client.get_list",
            //         args: {
            //             doctype: "Products",
            //             fields: ["name","pname", "price", "stock"],
            //             filters: {
            //                 docstatus: ["!=", 2]
            //             },
            //             limit_page_length: 0
            //         },
            //         callback(r) {
            //             let products = r.message || "";
            //             let html = `
            //                 <div class="product-table">
            //                     <div class="row header">
            //                         <div class="check"></div>
            //                         <div>Name</div>
            //                         <div>Pname</div>
            //                         <div>Price</div>
            //                         <div>Stock</div>
            //                         <div>Qty</div>
            //                     </div>
            //             `;

            //             products.forEach(product => {
            //                 html += `
            //                     <div class="row product-row"
            //                         data-name="${product.name}"
            //                         data-pname="${product.pname}"
            //                         data-price="${product.price}"
            //                         data-stock="${product.stock}">
            //                         <div class="check">
            //                             <input type="checkbox" class="product-check">
            //                         </div>
            //                         <div>
            //                             ${product.name}
            //                         </div>
            //                         <div>
            //                             ${product.pname}
            //                         </div>
            //                         <div>
            //                             ${product.price}
            //                         </div>
            //                         <div>
            //                             ${product.stock}
            //                         </div>
            //                         <div>
            //                             <input
            //                                 type="number"
            //                                 class="form-control product-qty"
            //                                 min="1"
            //                                 value="1"
            //                                 max="${product.stock}"
            //                                 placeholder="Qty"
            //                             >
            //                         </div>
            //                     </div>
            //                 `;
            //             });

            //             html += `</div>`;
            //             dialog.fields_dict.products_html
            //                 .$wrapper
            //                 .html(html);
            //         }
            //     });
            //     dialog.show();
        frm.add_custom_button("Add multiple Products", function () {
            let dialog = new frappe.ui.Dialog({
                title: "Add Multiple Products",
                fields: [
                    {
                        label: "Product Selection Table",
                        fieldname: "products_tab",
                        fieldtype: "Table",
                        fields: [
                            {
                                label: "Product ID",
                                fieldname: "prod_id",
                                fieldtype: "Data",
                                in_list_view: 1
                            },
                            {
                                label: "Product Name",
                                fieldname: "pname",
                                fieldtype: "Data",
                                in_list_view: 1
                            },
                            {
                                label: "Price",
                                fieldname: "price",
                                fieldtype: "Float",
                                in_list_view: 1
                            },
                            {
                                label: "Quantity",
                                fieldname: "quantity",
                                fieldtype: "Int",
                                default: 1,
                                in_list_view: 1
                            }
                        ]
                    }
                ],
                primary_action_label: "Add Products",
                primary_action() {
                    let selected = dialog.fields_dict.products_tab.grid.get_selected_children();
                    console.log("Selected Products:", selected);
                    selected.forEach(function (row) {
                        let ex_row = (frm.doc.products || []).find(r => r.prod_id === row.prod_id);
                        if(ex_row){
                            ex_row.quantity += row.quantity;
                            ex_row.total = ex_row.price * ex_row.quantity;
                        }else{
                            let child = frm.add_child("products");
                            child.prod_id = row.prod_id;
                            child.prod_name = row.pname;
                            child.quantity = row.quantity;
                            child.price = row.price;
                            child.total = row.price * row.quantity;
                        }

                    });
                    frm.refresh_field("products");
                    calculate_gross(frm);
                    dialog.hide();
                }
            });
            frappe.db.get_list("Products", {
                fields: ["name", "pname", "price"]
            }).then(products => {
                let table = dialog.fields_dict.products_tab;
                products.forEach(product => {
                    table.df.data = products.map(product => ({
                        prod_id: product.name,
                        pname: product.pname,
                        price: product.price,
                        quantity: 1
                    }));
                });
                table.grid.refresh();
            });
            dialog.show();
            dialog.fields_dict.products_tab.grid.cannot_add_rows = true;
            dialog.fields_dict.products_tab.grid.cannot_add_rows = true;
            dialog.fields_dict.products_tab.grid.refresh();
        });
    }
});

function calculate_gross(frm){
    let total = 0;
    (frm.doc.products || []).forEach(prod => {
        total += prod.total || 0;
    });
    frappe.model.set_value("Billing", frm.doc.name, "gross_total", total);
}

function discount(frm){
    if(frm.doc.discount_coupon && frm.doc.discount_coupon.length == 10 ){
        frappe.db.get_doc("Discount", frm.doc.discount_coupon)
        .then((doc)=>{
            if(!doc.is_active){
                frappe.show_alert("Discount is not Active for this Coupon")
                frm.set_value("discount_applied", "0");
                frm.set_value("total_amount", frm.doc.gross_total);
                frm.set_value("balance_amount", frm.doc.gross_total);
            }else{
                if(frm.doc.gross_total >= doc.min_price){
                    let d = 0;
                    d = frm.doc.gross_total * doc.discount_percentage / 100.0;
                    frm.set_value("discount_applied", d);
                    frm.set_value("total_amount", frm.doc.gross_total - d);
                    frm.set_value("balance_amount", frm.doc.gross_total - d);
                }else{
                    frm.set_value("discount_applied", 0);
                    frm.set_value("total_amount", frm.doc.gross_total);
                    frm.set_value("balance_amount", frm.doc.gross_total);
                }
            }
        });
    }else{
        frm.set_value("discount_applied", "0");
        frm.set_value("total_amount", frm.doc.gross_total);
        frm.set_value("balance_amount", frm.doc.gross_total);
    }
}


function set_indicator(frm){
    if(frm.workflow_state === "Not Paid"){
        frm.page.set_indicator("Not Paid", "red");
    }else if(frm.workflow_state === "Yet to Pay"){
        frm.page.set_indicator("Yet to Pay", "orange");
    }else{
        frm.page.set_indicator("Paid", "Green");
    }
}

$("<style>")
    .text(`
        .product-table {
            width: 90%;
            margin: 10px;
            align-items: center;
        }

        .product-table .row {
            display: grid;
            grid-template-columns:130px 1fr 1fr 1fr 1fr 200px;

            align-items: center;
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }

        .product-table .header {
            font-weight: bold;
            background: #f5f5f5;
        }

        .product-qty {
            width: 90px;
        }
    `)
    .appendTo("head");


// frappe.ui.form.on('Billing', {
//     refresh(frm) {
        // frm.add_custom_button('Add Item',()=>{
            // let row = frm.add_child("products",{
            //     pname: "prod-0010",
            //     prod_name: "Sanusha",
            //     quantity: 2,
            //     price:100
            //     // total:200
            // });
        //     console.log("Jamuna");
            // frm.refresh_field("products");,
            
        // });
        // frm.add_custom_button('Calculate Selected Total', () => {
        //     let selected = frm.get_selected();
        //     console.log(selected);
        //     let a = selected.products;
        //     frappe.msgprint(`The total number is ${a.length}`);
        // });
    // },
    
    // setup(frm){
    //     frm.set_query("pname", "products",()=>{ //link field in child doc, child table field name
    //         return {
    //             filters:{
    //                 price : ["<=", 250]
    //             }
    //         };
    //     })
//     }
// });
// frappe.ui.form.on("Billing", {
//     setup(frm){
//         frm.set_query("name1",()=>{
//             return {
//                 filters:{
//                     age : [">=", 20]
//                 }
//             };
//         });
//         frappe.prompt([
//             {
//                 label: 'First Name',
//                 fieldname: 'first_name',
//                 fieldtype: 'Data'
//             },
//             {
//                 label: 'Last Name',
//                 fieldname: 'last_name',
//                 fieldtype: 'Data'
//             },
//         ], (values) => {
//             console.log(values.first_name, values.last_name);
//         })
//     }
// });

// frappe.ui.form.on("Billing", {
//     refresh(frm) {

//         frm.add_custom_button("Show Chart", () => {

//             if (frm.$wrapper.find("#student-chart").length) {
//                 return;
//             }

//             let chart_area = $(`
//                 <div id="student-chart"
//                      style="margin: 20px 0; height: 300px;">
//                 </div>
//             `);

//             frm.$wrapper.find(".form-layout").prepend(chart_area);

//             let chart = new frappe.Chart("#student-chart", {
//                 title: "Student Data",
//                 data: {
//                     labels: ["A", "B", "C", "D"],
//                     datasets: [
//                         {
//                             name: "Students",
//                             values: [10, 20, 30, 40]
//                         }
//                     ],
//                     color:"blue"
//                 },
//                 type: "pie",
//                 height: 250,
                
//             });

//             console.log("Normal chart created", chart);
//         });
//     },
//     setup(frm){
//         frm.add_custom_button("Click me to route",()=>{
//             frappe.get_route('List', 'Task', 'List');
//         })
//     }
// });
