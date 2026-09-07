import frappe
from frappe.tests.utils import FrappeTestCase


class TestArticle(FrappeTestCase):

    def test_article_creation(self):
        article = frappe.get_doc({
            "doctype": "Article",
            "article_name": "My First Test",
            "status": "Published"
        })

        article.insert()

        self.assertEqual(article.article_name, "My First Test")
        self.assertTrue(
            frappe.db.exists("Article", article.name)
        )