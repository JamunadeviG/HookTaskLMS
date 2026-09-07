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
	columns = [
		{
			"label": "Customer Name",
			"fieldname": "customer_name",
			"fieldtype": "Data",
			"width": 200
		},
		{
			"label": "Email",
			"fieldname": "email",
			"fieldtype": "Data",
			"width": 250
		},
		{
			"label": "Phone",
			"fieldname": "phone",
			"fieldtype": "Data",
			"width": 150
		},
		{
			"label": "Amount",
			"fieldname": "amount",
			"fieldtype": "Currency",
			"width": 150
		}
	]
	
	data = [
		{
			"customer_name": "Jammy",
			"email": "jammy@gmail.com",
			"phone": "9876543210",
			"amount": 5000
		},
		{
			"customer_name": "Divakar",
			"email": "divakar@gmail.com",
			"phone": "9876543211",
			"amount": 7500
		},
		{
			"customer_name": "Arun",
			"email": "arun@gmail.com",
			"phone": "9876543212",
			"amount": 3000
		}
	]

	return columns, data
	# columns = get_columns()
	# data = get_data()

	# return columns, data

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
	data = get_data()

	return columns, data

def get_columns() -> list[dict]:
	"""Return columns for the report.

	One field definition per column, just like a DocType field definition.
	"""
	return [
		{
			"label": _("Column 1"),
			"fieldname": "column_1",
			"fieldtype": "Data",
		},
		{
			"label": _("Column 2"),
			"fieldname": "column_2",
			"fieldtype": "Int",
		},
	]


def get_data() -> list[list]:
	"""Return data for the report.

	The report data is a list of rows, with each row being a list of cell values.
	"""
	return [
		["Row 1", 1],
		["Row 2", 2],
	]
