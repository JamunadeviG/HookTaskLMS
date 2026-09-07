// Copyright (c) 2026, Jamuna and contributors
// For license information, please see license.txt

frappe.query_reports["Customer Report"] = {
	filters: [
		{
			fieldname: "name1",
			label: __("Customer"),
			fieldtype: "Link",
			options: "Customer",
		},
	],
};
