import json
import os

import frappe
from frappe.model.document import Document

DATA_FILE = os.path.join(os.path.dirname(__file__), "data.json")


def read_data():
    if not os.path.exists(DATA_FILE):
        return []

    with open(DATA_FILE, "r") as f:
        return json.load(f)


def write_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)


class ShruthiVirtual(Document):

    # Load a single document
    def load_from_db(self):
        data = read_data()

        for row in data:
            if row["name"] == self.name:
                self.update(row)
                return

        frappe.throw("Document not found")

    # Insert
    def db_insert(self, *args, **kwargs):
        data = read_data()

        data.append({
            "name": self.name,
            "age": self.age
        })

        write_data(data)

    # Update
    def db_update(self, *args, **kwargs):
        data = read_data()

        for row in data:
            if row["name"] == self.name:
                row["age"] = self.age
                break

        write_data(data)

    # Delete
    def delete(self, *args, **kwargs):
        data = read_data()

        data = [row for row in data if row["name"] != self.name]

        write_data(data)

    # List View
    @staticmethod
    def get_list(args):
        return read_data()

    # Count
    @staticmethod
    def get_count(args):
        return len(read_data())

    # Stats
    @staticmethod
    def get_stats(args):
        return {}