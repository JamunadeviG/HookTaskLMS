frappe.pages['hook-task-lms'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'HookTaskLMS',
		single_column: true
	});
	page.set_title("Hook Task LMS - Dashboard");
	// page.set_title("Hook Task LMS");
	page.set_title_sub("Learning Management System");
	page.set_indicator("Active","green")
	page.set_primary_action("New Task", () => {
        frappe.new_doc("Task"),
		'primary'
    });
	page.set_secondary_action("Refresh", () => {
        frappe.msgprint("Refreshing HookTaskLMS...");
    });

    page.add_action_item("Export Tasks", () => {
        frappe.msgprint("Exporting tasks...");
    });

    page.add_action_item("Delete Tasks", () => {
        frappe.msgprint("Deleting tasks...");
    });

	page.add_menu_item("My Tasks", () => {
        frappe.msgprint("Opening My Tasks");
    });
	page.add_menu_item("Completed Tasks", () => {
        frappe.msgprint("Opening Completed Tasks");
    });
	// Actions
    

	page.add_inner_button("All Tasks", () => {
        frappe.msgprint("Showing all tasks");
    });

    page.add_inner_button("Completed", () => {
        frappe.msgprint("Showing completed tasks");
    });
	
	page.change_inner_button_type('Completed', null, 'primary');

	// page.clear_actions_menu();
    // Grouped buttons
    page.add_inner_button("New Course", () => {
        frappe.msgprint("Creating new course");
    }, "Create");

    page.add_inner_button("New Lesson", () => {
        frappe.msgprint("Creating new lesson");
    }, "Create");

	// Page field
    let status_field = page.add_field({
        label: "Status",
        fieldtype: "Select",
        fieldname: "status",
        options: [
            "Open",
            "In Progress",
            "Completed"
        ],

        change() {
            console.log(
                "Selected Status:",
                status_field.get_value()
            );
        }
    });


    // Another field
    let priority_field = page.add_field({
        label: "Priority",
        fieldtype: "Select",
        fieldname: "priority",
        options: [
            "Low",
            "Medium",
            "High"
        ],

        change() {
            console.log(
                "Selected Priority:",
                priority_field.get_value()
            );
        }
    });

	// page.set_indicator('Close', 'red')

    // Get all field values
    let values = page.get_form_values();

    console.log(values);
	
}
