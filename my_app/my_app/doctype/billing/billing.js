// Copyright (c) 2026, Jamuna and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Billing", {
// 	refresh(frm) {

// 	},
// });
// frappe.ui.form.on("ProdItems", {
//     form_render(frm, cdt, cdn){
//         console.log("Hello");
//     }
// });

frappe.ui.form.on('Billing', {
    refresh(frm) {
//         // frm.add_custom_button('Add Item',()=>{
//         //     // let row = frm.add_child("products",{
//         //     //     pname: "prod-0010",
//         //     //     prod_name: "Sanusha",
//         //     //     quantity: 2,
//         //     //     price:100
//         //     //     // total:200
//         //     // });
//         //     console.log("Jamuna");
//         //     // frm.refresh_field("products");,
            
//         // });
        frm.add_custom_button('Calculate Selected Total', () => {
            let selected = frm.get_selected();
            console.log(selected);
            let a = selected.products;
            frappe.msgprint(`The total number is ${a.length}`);
        });
//     // },
    
//     // setup(frm){
//     //     frm.set_query("pname", "products",()=>{ //link field in child doc, child table field name
//     //         return {
//     //             filters:{
//     //                 price : ["<=", 250]
//     //             }
//     //         };
//     //     })
    }
});
frappe.ui.form.on("Billing", {
    setup(frm){
        frm.set_query("name1",()=>{
            return {
                filters:{
                    age : [">=", 20]
                }
            };
        });
        frappe.prompt([
            {
                label: 'First Name',
                fieldname: 'first_name',
                fieldtype: 'Data'
            },
            {
                label: 'Last Name',
                fieldname: 'last_name',
                fieldtype: 'Data'
            },
        ], (values) => {
            console.log(values.first_name, values.last_name);
        })
    }
});

frappe.ui.form.on("Billing", {
    refresh(frm) {

        frm.add_custom_button("Show Chart", () => {

            if (frm.$wrapper.find("#student-chart").length) {
                return;
            }

            let chart_area = $(`
                <div id="student-chart"
                     style="margin: 20px 0; height: 300px;">
                </div>
            `);

            frm.$wrapper.find(".form-layout").prepend(chart_area);

            let chart = new frappe.Chart("#student-chart", {
                title: "Student Data",
                data: {
                    labels: ["A", "B", "C", "D"],
                    datasets: [
                        {
                            name: "Students",
                            values: [10, 20, 30, 40]
                        }
                    ],
                    color:"blue"
                },
                type: "pie",
                height: 250,
                
            });

            console.log("Normal chart created", chart);
        });
    },
    setup(frm){
        frm.add_custom_button("Click me to route",()=>{
            frappe.get_route('List', 'Task', 'List');
        })
    }
});
