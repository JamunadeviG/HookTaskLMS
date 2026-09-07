import frappe

def get_context(context):
    context.articles = frappe.get_all(
        "Article",
        filters={"status": "Published"},
        fields=["article_name", "name"]
    )

    context.title = "Latest News"
    context.no_cache = True

    return context