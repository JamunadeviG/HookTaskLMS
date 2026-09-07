# Copyright (c) 2026, Jamuna and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class MakePayment(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		amended_from: DF.Link | None
		balance_amount: DF.Float
		bill_id: DF.Data
		pay_amount: DF.Float
		pay_via: DF.Literal["Cash", "UPI", "Credit Card"]
		total_amount: DF.Float
	# end: auto-generated types

	pass
