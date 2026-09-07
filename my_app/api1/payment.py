import frappe


@frappe.whitelist(allow_guest=True)
def get_bill(bill_id):

    if not bill_id:
        frappe.throw("Bill ID is required")

    if not frappe.db.exists("Billing", bill_id):
        frappe.throw(f"Bill {bill_id} does not exist")

    bill = frappe.get_doc("Billing", bill_id)

    products = []

    for row in bill.products:
        products.append({
            "prod_id": row.prod_id,
            "prod_name": row.prod_name,
            "quantity": row.quantity,
            "price": row.price,
            "total": row.total
        })

    return {
        "name": bill.name,
        "customer_phone": bill.customer_phone or "",
        "cname": bill.cname or "",

        "products": products,

        "gross_total": float(bill.gross_total or 0),
        "discount_coupon": bill.discount_coupon or "",
        "discount_applied": float(bill.discount_applied or 0),
        "total_amount": float(bill.total_amount or 0),
        "balance_amount": float(bill.balance_amount or 0),

        "workflow_state": bill.workflow_state or ""
    }


@frappe.whitelist(allow_guest=True)
def create_payment(bill_id, pay_via, pay_amount):

    if not bill_id:
        frappe.throw("Bill ID is required")

    if not pay_via:
        frappe.throw("Payment method is required")

    try:
        pay_amount = float(pay_amount)
    except (TypeError, ValueError):
        frappe.throw("Invalid payment amount")

    if pay_amount <= 0:
        frappe.throw("Payment amount must be greater than 0")

    # Get Billing
    bill = frappe.get_doc("Billing", bill_id)

    current_balance = float(bill.balance_amount or 0)

    if current_balance <= 0:
        frappe.throw("This bill has already been fully paid")

    if pay_amount > current_balance:
        frappe.throw(
            f"Payment amount cannot be greater than balance amount ₹{current_balance:.2f}"
        )

    # Calculate new balance
    new_balance = current_balance - pay_amount

    if new_balance <= 0:
        new_balance = 0
        workflow_state = "Paid"
    else:
        workflow_state = "Partially Paid"

    # Create Make Payment
    payment = frappe.get_doc({
        "doctype": "Make Payment",
        "bill_id": bill.name,
        "total_amount": bill.total_amount,
        "balance_amount": new_balance,
        "pay_via": pay_via,
        "pay_amount": pay_amount
    })

    payment.insert(ignore_permissions=True)

    # Update Billing directly
    frappe.db.set_value(
        "Billing",
        bill.name,
        {
            "balance_amount": new_balance,
            "workflow_state": workflow_state
        }
    )

    frappe.db.commit()

    return {
        "success": True,
        "payment_id": payment.name,
        "bill_id": bill.name,
        "paid_amount": pay_amount,
        "balance_amount": new_balance,
        "workflow_state": workflow_state
    }