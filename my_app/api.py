import frappe
from frappe.query_builder import DocType

def custom_logic(self):
    frappe.msgprint("Hook Executed..!!!")

@frappe.whitelist()
def update_library_books():

    author = DocType("Author")
    lib = DocType("Library Book")

    #FIRST

    records = (
        frappe.qb.from_(author).join(lib)
        .on(lib.author == author.name)
        .select(author.name, lib.book_name, author.name1, author.email, lib.price)
    ).run(as_dict=True)

    if not records:
        return "No records found"

    # # SECOND

    first_record = frappe.get_doc("Author", records[0]["name"])
    first_record.email = "summa_2006@gmail.com"

    first_record.save()

    # # THIRD

    for row in records:
        frappe.db.set_value(
            "Author",
            row["name"],
            "name1",
            "ellamavanseyal",
            update_modified=False
        )

    frappe.db.commit()
    return records