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

		amended_from: DF.Link | None
		cname: DF.Data | None
		customer_mailid: DF.Data | None
		name1: DF.Link
		products: DF.Table[ProdItems]
	# end: auto-generated types

	pass
