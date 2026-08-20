import frappe
import time
from frappe.query_builder import DocType
from frappe.utils.logger import set_log_level
from frappe.utils import now
from frappe.utils import *

def custom_logic(self):
    frappe.msgprint("Hook Executed..!!!")

@frappe.whitelist()
def summa():
    res = frappe.get_doc(
        "Author", "Auth-0004"
    )
    res.email = "updateILU@gmail.com"
    res.save()
    frappe.db.commit()
    return res

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

@frappe.whitelist()
def recordsOfBookandAuthor():
    books = frappe.get_list(
        "Library Book",
        fields = ["book_name", "author", "price"]
    )

    result = []

    for book in books:
        author = frappe.db.get_value(
            "Author",
            book.author,
            "name1"
        )
        result.append(
            {
                "Book" : book.book_name,
                "Author" : author,
                "Price of Book" : book.price
            }
        )

    return {
        "TimeStamp" : now(),
        "Records" : result
    }

@frappe.whitelist()
def send_test_mail():

    frappe.sendmail(
        recipients=["your_email@example.com"],
        subject="Testing Mail Footer",
        message="Hello! This is a test email."
    )

    return "Mail Sent"


@frappe.whitelist()
def msg():
    frappe.msgprint("Hi from me........")

@frappe.whitelist()
def change_log_level(level):
    set_log_level(level)
    return f"Log level changed to {level}"


@frappe.whitelist()
def test_logger():
    # Create/get one logger
    logger = frappe.logger("my_app")

    logger.debug("This is a DEBUG message")
    logger.info("This is an INFO message")
    logger.warning("This is a WARNING message")
    logger.error("This is an ERROR message")
    logger.critical("This is a CRITICAL message")

    return "Logger executed"


@frappe.whitelist()
def show_loggers():
    # Get all active loggers
    return {
        "loggers": list(frappe.loggers.keys())
    }


@frappe.whitelist()
def show_logger_objects():
    # Get the logger objects from frappe.loggers
    return {
        name: str(logger)
        for name, logger in frappe.loggers.items()
    }

@frappe.whitelist()
def create_new_total(total):
    sales_order = frappe.new_doc("Sales Order")
    sales_order.customer = 'cus-0002'
    sales_order.order_date = '2026-08-14'
    sales_order.grand_total = total
    sales_order.description = "New total from the create_new_total method in api"
    sales_order.save()

    return sales_order.name

@frappe.whitelist()
def testing():
    frappe.publish_realtime(
        "trial", 
        {
            "name": "Jamuna",
            "age": 20
        }
    )
    return "Success buddy..."

@frappe.whitelist()
def bg_job_test():
    frappe.enqueue(
        "my_app.api.short_job",
        queue="short"
    )
    return "Successfully completed1"

def short_job():
    for i in range(10):
        print(f"Process {i+1} is completed")
        time.sleep(2)
    return ("Successfully completed2")

@frappe.whitelist()
def download_text_file():
    frappe.response.filename = "hello.txt"
    frappe.response.filecontent = b"Hello world from Jamuna"
    frappe.response.type = "pdf"
    frappe.response.display_content_as = "attachment"