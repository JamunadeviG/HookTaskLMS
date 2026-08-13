# Copyright (c) 2026, Jamuna and contributors
# For license information, please see license.txt

import frappe
from frappe.utils.nestedset import NestedSet


class TreeDocToLearn(NestedSet):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		due_date: DF.Date | None
		is_group: DF.Check
		left: DF.Int
		lft: DF.Int
		old_parent: DF.Link | None
		parent_treedoctolearn: DF.Link | None
		rgt: DF.Int
	# end: auto-generated types


@frappe.whitelist()
def test_realtime():
	frappe.publish_realtime(
		"test_event",
		{
			"label": "Test",
			"value": 50
		}
	)
	return "Realtime event published"