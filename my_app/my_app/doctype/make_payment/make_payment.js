// Copyright (c) 2026, Jamuna and contributors
// For license information, please see license.txt

frappe.ui.form.on("Make Payment", {
    before_save(frm) {
        frm.set_value("balance_amount", (frm.doc.balance_amount - frm.doc.pay_amount));
	},
	after_save(frm) {
        frappe.db.set_value("Billing", frm.doc.bill_id, "balance_amount", frm.doc.balance_amount);
    }
});