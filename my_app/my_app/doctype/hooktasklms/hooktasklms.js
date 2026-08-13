// // Copyright (c) 2026, Jamuna and contributors
// // For license information, please see license.txt

// // frappe.ui.form.on("HookTaskLMS", {
// // 	refresh(frm) {

// // 	},
// // });
// frappe.ui.form.on("HookTaskLMS",{
//     refresh(frm){
//         // frm.add_custom_button('Open Reference form', () => {
//         //     frappe.msgprint('Button clicked!');
//         // });
//         // frm.change_custom_button_type('Open Reference form', //button label
//         //  null, //group
//         //  'primary' //button type
//         // );
//         // frm.remove_custom_button('Open Reference form');

//         // For group
//         // frm.add_custom_button('Closed', () => {
//         //     frappe.msgprint('Closing...');
//         // }, 'Set Status');
//         // frm.remove_custom_button('Closed', 'Set Status');

//         // frm.add_custom_button('Button 1', () => {
//         //     frappe.msgprint('Button 1');
//         // });
//         // frm.add_custom_button('Button 2', () => {
//         //     frappe.msgprint('Button 2');
//         // });
//         // frm.add_custom_button('Button 3', () => {
//         //     frappe.msgprint('Button 3');
//         // });
//         // frm.clear_custom_buttons();

//         // frm.set_df_property('priority', 'reqd', 1);

//         // frm.toggle_enable('priority', true); //false -->read-only, true-->editable
//         // frm.toggle_enable(
//         //     ['description', 'priority'],
//         //     true
//         // );

//         // frm.toggle_reqd(
//         //     'priority',
//         //     frm.doc.status === 'Open'   //works only after save
//         // );

//         // frm.toggle_display(
//         //     'priority',  //hide or display
//         //     false
//         // );

//         // frm.call("ageOfPerson").then(r => {
//         //     console.log("The age is ", r.message);
//         // });

//         // frm.trigger('set_mandatory_fields');

//         // frm.add_custom_button('Show', () => {
//         //     let selected = frm.get_selected();
//         //     console.log(selected);
//         //     frappe.msgprint(                             //still working on it
//         //         JSON.stringify(selected)
//         //     );
//         // });

//         // frm.set_value("description", 'New description')
//         // frm.refresh();

//     }
//     // set_mandatory_fields(frm) {

//     //     frm.toggle_reqd(
//     //         'priority',
//     //         frm.doc.status === 'Open'
//     //     );

//     // }
// });

// frappe.ui.form.on("HookTaskLMS", {
//     refresh(frm) {

//         // Get the HTML field where we want to create
//         // our dynamic controls
//         const wrapper = frm.fields_dict.dynamic_controls.$wrapper;

//         // Clear old controls whenever the form refreshes
//         wrapper.empty();

//         // =====================================================
//         // 1. CREATE A DYNAMIC DATE FIELD
//         // =====================================================

//         const due_date = frappe.ui.form.make_control({
//             parent: wrapper,
//             df: {
//                 label: "Due Date",
//                 fieldname: "due_date",
//                 fieldtype: "Date"
//             },
//             render_input: true
//         });

//         // Set a default value
//         due_date.set_value(frappe.datetime.get_today());


//         // =====================================================
//         // 2. CREATE A DYNAMIC SELECT FIELD
//         // =====================================================

//         const status = frappe.ui.form.make_control({
//             parent: wrapper,
//             df: {
//                 label: "Status",
//                 fieldname: "status",
//                 fieldtype: "Select",
//                 options: [
//                     "Open",
//                     "Closed",
//                     "Cancelled"
//                 ]
//             },
//             render_input: true
//         });

//         // Set default value
//         status.set_value("Open");


//         // =====================================================
//         // 3. CREATE A DYNAMIC TEXT FIELD
//         // =====================================================

//         const name = frappe.ui.form.make_control({
//             parent: wrapper,
//             df: {
//                 label: "Name",
//                 fieldname: "name",
//                 fieldtype: "Data"
//             },
//             render_input: true
//         });


//         // =====================================================
//         // 4. CREATE A DYNAMIC BUTTON
//         // =====================================================

//         const button = frappe.ui.form.make_control({
//             parent: wrapper,
//             df: {
//                 label: "Fetch",
//                 fieldname: "fetch",
//                 fieldtype: "Button",
//                 btn_size: "sm"
//             },
//             render_input: true
//         });


//         // =====================================================
//         // 5. BUTTON CLICK
//         // =====================================================

//         button.$input.on("click", function () {

//             // Get values from dynamic controls
//             const selected_date = due_date.get_value();
//             const selected_status = status.get_value();
//             const entered_name = name.get_value();

//             frappe.msgprint({
//                 title: "Dynamic Control Values",
//                 message: `
//                     <b>Name:</b> ${entered_name || "Not entered"}<br>
//                     <b>Due Date:</b> ${selected_date || "Not selected"}<br>
//                     <b>Status:</b> ${selected_status || "Not selected"}
//                 `
//             });
//         });
//     }
// });


frappe.ui.form.on("HookTaskLMS", {
    refresh(frm) {
        // frm.add_custom_button("Scanner", ()=>{
        //     new frappe.ui.Scanner({
        //         dialog: true, // open camera scanner in a dialog
        //         multiple: false, // stop after scanning one value
        //         on_scan(data) {
        //             frappe.msgprint(data.decodedText);
        //         }
        //     });
        // }),
        // frappe.db.get_doc('Task', null, { status: 'Pending' })
        // .then(doc => {
        //     console.log(doc)
        // })
        // frappe.db.get_list("Task",{
        //     fields: ["description", "priority"],
        //     filters:{
        //         status: "Pending"
        //     }
        // }).then((data)=> console.log(data))

        // frappe.db.get_value('Task',  {status: 'Pending'}, ['status', 'description'])
        // .then(r => {
        //     let values = r.message;
        //     console.log(r)
        // })
        // frappe.db.get_single_value('System Settings', 'time_zone')
        //     .then(time_zone => {
        //     console.log(time_zone);
        // })

        // frappe.db.set_value('Task', 'TASK-14', 'status', 'Completed')
        // .then(r => {
        //     let doc = r.message;
        //     console.log(doc);
        // })
        // frappe.db.insert({
        //     doctype: 'Task',
        //     task_title: 'New Task',
        //     description: 'Hello Jammyyyy'
        // }).then(doc => {
        //     console.log(doc);
        // })
        // frappe.db.count('Task').then(count => {
        //     console.log(count)
        // })
        // frappe.db.count("Task").then((d) => {
        //     console.log("Task Count:", d);
        // })
        // frappe.db.count('Task', {
        //     filters: {
        //         status: 'Pending'
        //     }
        // })
        // .then(count => {
        //     console.log(count);
        // })
        // frappe.db.delete_doc('Task', 'TASK-13').then(()=> console.log("Deleted buddy"))
        // frappe.db.exists('Task', 'TASK00004')
        // .then(exists => {
        //     console.log(exists) // true
        // }),
    }
})


// frappe.ui.form.on("HookTaskLMS", {

//     refresh(frm) {

//         frm.add_custom_button("Get Student", function() {

//             frappe.call({

//                 // 1️⃣ Python method
//                 method: "my_app.my_app.doctype.hooktasklms.hooktasklms.get_student_details",

//                 // 2️⃣ Arguments passed to Python
//                 args: {
//                     name: "Jammy"
//                 },

//                 // 3️⃣ Disable button while request is running
//                 btn: $(".primary-action"),

//                 // 4️⃣ Freeze the screen while request is running
//                 freeze: true,
//                 freeze_message: "Please wait.....",

//                 // 5️⃣ What happens when request succeeds
//                 callback: function(r) {

//                     console.log("Response:", r);

//                     console.log("Student:", r.message);

//                     frappe.msgprint(
//                         `Name: ${r.message.name}<br>
//                          Course: ${r.message.course}<br>
//                          Status: ${r.message.status}`
//                     );
//                 },

//                 // 6️⃣ What happens when request fails
//                 error: function(r) {

//                     console.error("Error:", r);

//                     frappe.msgprint("Something went wrong!");

//                 }

//             });

//         });

//     }

// });