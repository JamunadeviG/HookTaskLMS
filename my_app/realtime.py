import frappe
from frappe.realtime import realtime

@realtime.on(
    "test_get_doc",
    frappe_context=True,
    allow_guest=True
)
def test_get_doc(socket, doctype, docname):

    try:
        # Get the document
        doc = frappe.get_doc(doctype, docname)

        # Check whether current user has permission
        doc.check_permission()

        # Send result back to the same browser/socket
        socket.emit(
            "test_get_doc_result",
            {
                "ok": True,
                "site": frappe.local.site,
                "user": frappe.session.user,
                "doctype": doc.doctype,
                "name": doc.name,
                "modified": str(doc.get("modified")),
            }
        )

    except Exception as e:

        socket.emit(
            "test_get_doc_result",
            {
                "ok": False,
                "error": f"{type(e).__name__}: {e}"
            }
        )