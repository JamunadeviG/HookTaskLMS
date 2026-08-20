import frappe

from frappe.search.full_text_search import FullTextSearch
from whoosh.fields import Schema, ID, TEXT


class BlogSearch(FullTextSearch):

    def get_schema(self):
        return Schema(
            name=ID(stored=True),
            title=TEXT(stored=True),
            content=TEXT(stored=True)
        )

    def get_fields_to_search(self):
        return ["name", "title", "content"]

    def get_id(self):
        return "name"

    def get_items_to_index(self):
        documents = []

        blog_names = frappe.get_all(
            "Blog Post",
            pluck="name"
        )

        for blog_name in blog_names:
            document = self.get_document_to_index(blog_name)

            if document:
                documents.append(document)

        return documents

    def get_document_to_index(self, doc_name):
        blog = frappe.get_doc("Blog Post", doc_name)

        return frappe._dict(
            name=blog.name,
            title=blog.title or "",
            content=blog.content or ""
        )

    def parse_result(self, result):
        return frappe._dict(
            name=result["name"],
            title=result["title"],
            content=result["content"]
        )