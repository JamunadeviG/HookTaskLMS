// Copyright (c) 2026, Jamuna and contributors
// For license information, please see license.txt

// frappe.ui.form.on('Sales Order', {
//     onload(frm) {
//         frm.ignore_doctypes_on_cancel_all = [
//             'Payment Entry'
//         ];
//     }
// });


frappe.ui.form.on("Sales Order", {
    refresh(frm){
        let dialog = new frappe.ui.Dialog({
            title: "Enter sales order",
            fields:[
                {
                    fieldname:"total",
                    label: "Grand Total",
                    fieldtype:"Currency",
                    reqd:1
                }
            ],
            primary_action_label : "Create",
            primary_action(values){
                frappe.call({
                    method: "my_app.api.create_new_total",
                    args: {
                        total: values.total
                    },
                    callback: function(res) {
                        dialog.hide(),
                        frappe.msgprint({
                            title: "Success",
                            message: "Sales Order added successfully brooo",
                            indicator: "green"
                        })
                    }
                })
            }
        })
        dialog.show()
    }
})