# Copyright (c) 2026, Jamuna and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class ProdItems(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		parent: DF.Data
		parentfield: DF.Data
		parenttype: DF.Data
		price: DF.Float
		prod_id: DF.Link | None
		prod_name: DF.Data | None
		quantity: DF.Int
		total: DF.Float
	# end: auto-generated types

	pass
