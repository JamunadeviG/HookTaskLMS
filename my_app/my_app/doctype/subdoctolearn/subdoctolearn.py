# Copyright (c) 2026, Jamuna and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class SubDocToLearn(Document):
	def validate(self):
		if len(self.title) < 3:
			frappe.throw("Name must contains more than 3 letters...!!!")
