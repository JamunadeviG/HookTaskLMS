
frappe.provide("my_app.student");

my_app.student.get_name = function () {
    return "Jammy";
};

console.log(my_app.student.get_name());