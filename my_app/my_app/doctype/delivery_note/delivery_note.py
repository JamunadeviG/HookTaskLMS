# Copyright (c) 2026, Jamuna and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class DeliveryNote(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		amended_from: DF.Link | None
		customer: DF.Link | None
		delivery_date: DF.Date | None
		sales_order: DF.Link | None
		status: DF.Literal["Draaft", "Submitted", "Cancelled"]
	# end: auto-generated types

	pass
