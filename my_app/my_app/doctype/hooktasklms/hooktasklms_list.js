// frappe.listview_settings["HookTaskLMS"] = {
//     // Fields to fetch
//     add_fields: [
//         "status"
//     ],
//     get_indicator(doc) {
//         console.log("STATUS:", doc.status);
//         if (doc.status === "Open") {
//             return ["Hi", "green", "status,=,Open"];
//         }
//         if (doc.status === "Closed") {
//             return ["Closed", "blue", "status,=,Closed"];
//         }
//         if (doc.status === "Cancelled") {
//             return ["Cancelled", "red", "status,=,Cancelled"];
//         }
//     },
//     // Runs when list loads
//     onload(listview) {
//         listview.filter_area.add([
//             ["HookTaskLMS", "description", "like", "%Jamuna%"]
//         ]);
//     },
//     // Runs before every render
//     before_render() {
//         console.log("Before rendering list");
//     },
//     // Button for every row
//     button: {
//         show(doc) {
//             return true;
//         },
//         get_label() {
//             return "View";
//         },
//         get_description(doc) {
//             return `Open ${doc.name}`;
//         },
//         action(doc) {
//             frappe.set_route(
//                 "Form",
//                 "HookTaskLMS",
//                 doc.name
//             );
//         }
//     },
//     // Format fields
    
// };

frappe.listview_settings["HookTaskLMS"] = {
    hide_name_column: true,

    add_fields: [
        "name",
        "description",
        "status"
    ],

    // Normal row button
    button: {
        show: function(doc) {
            return doc.description;
        },

        get_label: function() {
            return __("Open");
        },

        get_description: function(doc) {
            return __("Open {0}", [
                `${__(doc.name)}: ${doc.description}`
            ]);
        },

        action: function(doc) {
            frappe.set_route(
                "Form",
                'hooktasklms',
                doc.name
            );
        }
    },

    // Dropdown button
    dropdown_button: {

        get_label: __("Dropdown"),

        buttons: [

            // Button 1
            {
                get_label: __("Button 1"),

                show: function(doc) {
                    return true;
                },

                get_description: function(doc) {
                    return "Open Button 1 " +
                        doc.description;
                },

                action: function(doc) {
                    frappe.msgprint(
                        "Dropdown Button 1 Clicked " +
                        doc.description
                    );
                }
            },

            // Button 2
            {
                get_label: __("Button 2"),

                show: function(doc) {
                    return doc.status != "Closed";
                },

                get_description: function(doc) {
                    return "Open Button 2 " +
                        doc.description;
                },

                action: function(doc) {
                    frappe.msgprint(
                        "Dropdown Button 2 Clicked " +
                        doc.description
                    );
                }
            },

            // Button 3
            {
                get_label: __("Button 3"),

                show: function(doc) {
                    return doc.status != "Cancelled";
                },

                get_description: function(doc) {
                    return "Open Button 3 " +
                        doc.description;
                },

                action: function(doc) {
                    frappe.msgprint(
                        "Dropdown Button 3 Clicked " +
                        doc.description
                    );
                }
            }
        ]
    }
};