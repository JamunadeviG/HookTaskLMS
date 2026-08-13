# Copyright (c) 2026, Jamuna and contributors
# For license information, please see license.txt

import frappe
import time
from frappe.model.document import Document
from frappe.model.naming import make_autoname


class HookTaskLMS(Document):
	# begin: auto-generated types
	# This code is auto-generated. Do not modify anything in this block.

	from typing import TYPE_CHECKING

	if TYPE_CHECKING:
		from frappe.types import DF

		description: DF.Data | None
	# end: auto-generated typesgit push -u origin main
# 	def before_insert(self):
# 		frappe.msgprint("This is from before insert....")
# 		if(self.description == None):
# 			self.description = "This is Jamuna's updated description"

# 	def before_naming(self):
# 		self.description = self.description.upper()
# 		frappe.msgprint("This is from before naming..")

# 	def autoname(self):
# 		frappe.msgprint("This is from autoname....")
# 		self.name = make_autoname("HOOK-.####")

# 	def before_validate(self):
# 		self.description = self.description.strip()
# 		frappe.msgprint("From before_validate")

# 	def validate(self):
# 		if(len(self.description)<10):
# 			frappe.throw("Description should atleast have 10 chars init..., from validate")
# 		else:
# 			frappe.msgprint("Bye from validate")

# 	def before_save(self):
# 		self.description = self.description.title()
# 		frappe.msgprint("This is from before save method....")

# 	def before_submit(self):
# 		if("Test" in self.description):
# 			frappe.throw("The testing doc couldn't be submitted")

# 	def on_submit(self):
# 		# comment = frappe.new_doc("Comment")
# 		# comment.comment_type = "Comment"
# 		# comment.content = f"{self.description} is going to be submitted"
# 		# comment.insert(ignore_permissions=True)
# 		self.add_comment(
#         "Comment",
#         "Document submitted successfully."
#     	)

# 	def before_cancel(self):
# 		if("jamuna" in self.description.lower()):
# 			frappe.throw("Description contains name Jamuna, so couldn't cancel")

# 	def on_cancel(self):
# 		frappe.msgprint("Sorry, from on_cancel")

# 	def before_update_after_submit(self):
# 		if("sanusha" in self.description):
# 			frappe.throw("Sorry sanusha from before update after submit")
# 		else:
# 			frappe.msgprint("Hi from before update after submit")

# 	# def db_insert(self):

# 	def after_insert(self):
# 		frappe.msgprint("From after insert....")

# 	# def db_update(self):

# 	def on_update(self):
# 		frappe.msgprint("from on update")

# 	def on_update_after_submit(self):
# 		frappe.msgprint("from on update after submit")

# 	def on_change(self):
# 		frappe.msgprint("from on change brooo")

# 	def before_rename(self, old, new, merge=False):
# 		if(merge):
# 			frappe.msgprint(f"{old} {new} is the new name")
# 		else:
# 			frappe.msgprint(f"from before rename {new}")

# 	def after_rename(self, old, new, merge=False):
# 		frappe.msgprint("From after rename")

# 	def on_trash(self):
# 		if("jam" in self.description):
# 			frappe.throw("From on trash couldn't delete bro")
# 		else:
# 			frappe.msgprint("All is well ffrom on trash")

# 	def after_delete(self):
# 		frappe.msgprint("Hi from after delete...")

# 	@frappe.whitelist()
# 	def ageOfPerson(self):
# 		return 100

# 	# def before_save(self):
# 	# 	if(self.description == None):
# 	# 		self.description = "Default Description"

@frappe.whitelist()
def get_student_details(name):
    time.sleep(5)
    return {
        "name": name,
        "course": "B.Tech AIML",
        "status": "Active"
    }