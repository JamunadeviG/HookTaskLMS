import frappe

def hourly_maintenance():
    frappe.log_error(
        title="Hourly Maintenance",
        message="This is message from hourly maintenance error log"
    )