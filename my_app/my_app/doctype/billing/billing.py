# Copyright (c) 2026, Jamuna and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class Billing(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF
		from my_app.my_app.doctype.proditems.proditems import ProdItems

		age: DF.Data | None
		amended_from: DF.Link | None
		balance_amount: DF.Float
		cname: DF.Data | None
		customer_phone: DF.Data
		discount_applied: DF.Float
		discount_coupon: DF.Data | None
		gross_total: DF.Float
		products: DF.Table[ProdItems]
		total_amount: DF.Float
		workflow_state: DF.Data | None
	# end: auto-generated types

	pass
