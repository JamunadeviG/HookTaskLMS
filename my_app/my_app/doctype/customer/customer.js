// Copyright (c) 2026, Jamuna and contributors
// For license information, please see license.txt\


// frappe.ui.form.on('Customer', {
//     onload: function(frm) {
//         const tour_name = 'Sample form tour';
//         frm.tour.init({ tour_name }).then(() => frm.tour.start());
//     }
// });


frappe.ui.form.on("Customer",{
    refresh(frm){
        frm.add_custom_button("MSG", ()=>{
                frappe.throw(
                    title='Error',
                    msg='This file does not exist',
                    exc=FileNotFoundError
                )
        })
        frm.add_custom_button("Job Check",()=>{
            frappe.call({
                method: "my_app.api.bg_job_test",
                callback: function(r){
                    frappe.msgprint(r.message);
                }
            })
        })
    }
})