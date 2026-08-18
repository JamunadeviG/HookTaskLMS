# Copyright (c) 2026, Jamuna and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Customer(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		age: DF.Int
		amended_from: DF.Link | None
		gmail: DF.Data | None
		name1: DF.Data | None
	# end: auto-generated types

