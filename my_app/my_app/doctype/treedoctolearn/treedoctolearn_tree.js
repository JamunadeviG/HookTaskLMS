// Copyright (c) 2026, Jamuna and contributors
// For license information, please see license.txt

frappe.treeview_settings["TreeDocToLearn"] = {
    breadcrumb: "Electronic company",
	title: "Electronic Gadgets",

	filters: [
		{
			fieldname: "electronic",
			fieldtype: "Select",
			label: "Electronic",
			options: "Laptops 1\nMobiles 2",
			// on_change: handle_electronic_change(),
		},
	],

	// get_tree_nodes: "path.to.whitelisted_method.get_children",
	// add_tree_node: "path.to.whitelisted_method.handle_add_treedoctolearn",

	fields: [
		{
			fieldtype: "Data",
			fieldname: "left",
			label: "Left",
			reqd: true,
		},
		{
			fieldtype: "Link",
			fieldname: "old_parent",
			label: "Old Parent",
			options: "TreeDocToLearn",
		},
		{
			fieldtype: "Check",
			fieldname: "is_group",
			label: "Is Group",
		},
	],

	// ignore_fields: ["parent_treedoctolearn"],

	menu_items: [
		{
			label: "New TreeDocToLearn",
			action: function () {
				frappe.new_doc("TreeDocToLearn", true);
			},
			condition: "frappe.boot.user.can_create.indexOf('TreeDocToLearn') !== -1",
		},
	],

	onload: function (treeview) {
        // const a = frappe.set_route(['List', 'Task', 'Task'], { status: 'Open' });
        // const a = frappe.format('2019-10-11', { fieldtype: 'Date' });
        // const a = frappe.format('2399', { fieldtype: 'Currency' }, { inline: true });
        // console.log(a)
        // frappe.require(['/assets/todo_app/js/app.js', '/assets/todo_app/css/app.css'], () => {
        //     console.log("Loaded jamuna....")
        // })
    },

	// post_render: function (treeview) {},

	// onrender: function (node) {},

	// on_get_node: function (nodes) {},

	extend_toolbar: true,

	toolbar: [
		{
			label: "Add Jam",
			click: function (node) {
				frappe.show_alert("10");
			},
			btnClass: "hidden-xs",
		},
	],
};

function handle_electronic_change(){
    frappe.msgprint("Hello");
}
// frappe.msgprint({
//     title: __('Notification'),

//     message: __('Are you sure you want to proceed?'),

//     primary_action: {
//         label: __('Proceed'),
//         server_action: 'my_app.api.msg'
//     }
// });

// let d = new frappe.ui.Dialog({
//     title: 'Enter details',
//     fields: [
//         {
//             label: 'First Name',
//             fieldname: 'first_name',
//             fieldtype: 'Data'
//         },
//         {
//             label: 'Last Name',
//             fieldname: 'last_name',
//             fieldtype: 'Data'
//         },
//         {
//             label: 'Age',
//             fieldname: 'age',
//             fieldtype: 'Int'
//         }
//     ],
//     size: 'small', // small, large, extra-large 
//     primary_action_label: 'Submit',
//     primary_action(values) {
//         frappe.show_alert(String(values.age));
//     },
//     secondary_action_label: 'Reset',
//     secondary_action(values) {
//         d.hide();
//     }
// });

// d.show();

// frappe.prompt('First Name', ({ v }) => console.log(v))
// frappe.prompt('First Name', console.log, 'Enter First Name', 'Submit');
// frappe.prompt({
//     label: 'Birth Date',
//     fieldname: 'date',
//     fieldtype: 'Date'
// }, (values) => {
//     console.log(values.date);
// })
// frappe.prompt([
//     {
//         label: 'First Name',
//         fieldname: 'first_name',
//         fieldtype: 'Data'
//     },
//     {
//         label: 'Last Name',
//         fieldname: 'last_name',
//         fieldtype: 'Data'
//     },
// ], (values) => {
//     console.log(values.first_name, values.last_name);
// })

// frappe.confirm('Are you sure you want to proceed?',
//     () => {
//         frappe.msgprint("Hurrey...!");
//     }, () => {
//         frappe.msgprint("sorrow...!");
//     })

// frappe.warn(
//     'Are you sure you want to proceed?',
//     'There are unsaved changes on this page',
//     () => {
//         frappe.msgprint("Hurrey...!");
//     },
//     'Jamuna',
//     false
// );

// frappe.show_alert({
//     message:__('Hi, you have a new message'),
//     indicator:'green'
// }, 1);   //The number is to mention the seconds the alert be shown

// frappe.show_progress('Loading..', 70, 100, 'Please wait');

// frappe.new_doc("Task", {subject: "New Task"});

// new frappe.ui.form.MultiSelectDialog({
//     doctype: "TreeDoctoLearn",
//     target: this.cur_frm,
//     setters: {
//         schedule_date: null,
//         status: 'Pending'
//     },
//     add_filters_group: 1,
//     date_field: "due_date",
//     get_query() {
//         return {
//             filters: { docstatus: ['!=', 2] }
//         }
//     },
//     action(selections) {
//         console.log(selections);
//     }
// });

// MultiSelectDialog with custom query method
// let query_args = {
//     query:"dotted.path.to.method",
//     filters: { docstatus: ["!=", 2], supplier: "John Doe" }
// }

// new frappe.ui.form.MultiSelectDialog({
//     doctype: "Task",
//     target: this.cur_frm,
//     setters: {
//         schedule_date: null,
//         status: 'Pending'
//     },
//     add_filters_group: 1,
//     date_field: "due_date",
//     columns: ["name", "due_date", "status"],
//     get_query() {
//         return query_args;
//     },
//     action(selections) {
//         console.log(selections);
//     }
// });

// Empty data array

