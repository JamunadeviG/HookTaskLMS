# Copyright (c) 2026, Jamuna and contributors
# For license information, please see license.txt

import frappe
from frappe import _


def execute(filters: dict | None = None):
	"""Return columns and data for the report.

	This is the main entry point for the report. It accepts the filters as a
	dictionary and should return columns and data. It is called by the framework
	every time the report is refreshed or a filter is updated.
	"""
	columns = get_columns()
	data = get_data(filters)

	return columns, data


def execute_snapshot_report(filters: dict | None = None):
	"""Return columns and data for the report.

	This is the main entry point for snapshot report. When 'Synced
	Report' is enabled in report, framework will call this method
	every time the report is refreshed or a filter is updated. It
	accepts the same filters as normal execute. But a utility method -
	get_latest_sync, is also imported.

	"""
	from frappe.database.duckdb.database import get_latest_sync

	columns = get_columns()
	data = get_data(filters)

	return columns, data


def get_columns() -> list[dict]:
	"""Return columns for the report.

	One field definition per column, just like a DocType field definition.
	"""
	return [
		{
			"label": _("Name"),
			"fieldname": "name1",
			"fieldtype": "Data",
		},
		{
			"label": _("Email"),
			"fieldname": "email",
			"fieldtype": "Data",
		},
		{
			"label": _("Phone No"),
			"fieldname": "phone",
			"fieldtype": "Data",
			"options": "Phone",
		},
	]


def get_data(filters: dict | None = None) -> list[dict]:
	"""Return data for the report.

	The report data is a list of rows, with a dictionary for each customer.
	"""
	query = """
		SELECT *
		FROM `tabCustomer`
	"""
	values = []

	if filters and filters.get("name1"):
		query += " WHERE name1 = %s"
		values.append(filters.get("name1"))

	return frappe.db.sql(query, values, as_dict=True)
