// Copyright (c) 2026, Jamuna and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Billing", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on("ProdItems", {
    form_render(frm, cdt, cdn){
        console.log("Hello");
    }
});

frappe.ui.form.on('Billing', {
    refresh(frm) {
        frm.add_custom_button('Add Item',()=>{
            let row = frm.add_child("products",{
                pname: "prod-0010",
                prod_name: "Sanusha",
                quantity: 2,
                price:100,
            });
            console.log(row);
            frm.refresh_field("products");
        });
    //     frm.add_custom_button('Calculate Selected Total', () => {
    //         let selected = frm.get_selected();
    //         console.log(selected);
    //         let a = selected.products;
    //         frappe.msgprint(`The total number is ${a.length}`);
    //     });
    // },
    // setup(frm){
    //     frm.set_query("name1",()=>{
    //         return {
    //             filters:{
    //                 age : [">=", 20]
    //             }
    //         };
    //     })
    // }
    // setup(frm){
    //     frm.set_query("pname", "products",()=>{ //link field in child doc, child table field name
    //         return {
    //             filters:{
    //                 price : ["<=", 250]
    //             }
    //         };
    //     })
    }
});