// Copyright (c) 2026, Jamuna and contributors
// For license information, please see license.txt\


frappe.ui.form.on('Customer', {
    onload: function(frm) {
        const tour_name = 'Sample form tour';
        frm.tour.init({ tour_name }).then(() => frm.tour.start());
    }
});
