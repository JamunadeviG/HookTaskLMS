# Copyright (c) 2026, Jamuna and contributors
# For license information, please see license.txt

# import frappe
from frappe.model.document import Document


class SalesOrder(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		amended_from: DF.Link | None
		customer: DF.Link | None
		description: DF.Data | None
		grand_total: DF.Currency
		order_date: DF.Date | None
		status: DF.Literal["Draft", "Submitted", "Cancelled"]
	# end: auto-generated types

	pass
