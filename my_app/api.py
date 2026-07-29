import frappe

def custom_logic(self):
    frappe.msgprint("Hook Executed..!!!")