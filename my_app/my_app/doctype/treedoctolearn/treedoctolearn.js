// Copyright (c) 2026, Jamuna and contributors
// For license information, please see license.txt
// Empty data array
// frappe.listview_settings["TreeDocToLearn"] = {

//     refresh(listview) {
//         frappe.realtime.socket.on("connect", function() {
//             console.log("🔥 SOCKET CONNECTED");
//         });

//         frappe.realtime.socket.on("connect_error", function(error) {
//             console.error("❌ SOCKET ERROR:", error);
//         });
//         if (!listview.page.main.find("#chart").length) {
//             $('<div id="chart"></div>').prependTo(listview.page.main);
//         }

//         // Chart data
//         // let data = 

//         // Create realtime chart
//         let chart = new frappe.ui.RealtimeChart(
//             "#chart",
//             "test_event",
//             8,
//             {
//                 title: "My Realtime Chart",
//                 data: {
//                     datasets: [
//                         {
//                             name: "Test",
//                             values: []
//                         }
//                     ]
//                 },
//                 type: "line",
//                 height: 250
//             }
//         );

//         // Call Python
//         frappe.call({
//             method: "my_app.my_app.doctype.treedoctolearn.treedoctolearn.test_realtime",

//             callback: function(r) {
//                 console.log("Python response:", r.message);
//             }
//         });
//     }
// };


// frappe.ui.form.on("TreeDocToLearn", {
//     refresh(frm) {

//         frm.add_custom_button("Show Chart", () => {

//             if (frm.$wrapper.find("#student-chart").length) {
//                 return;
//             }

//             let chart_area = $(`
//                 <div id="student-chart"
//                      style="margin: 20px 0; height: 300px;">
//                 </div>
//             `);

//             frm.$wrapper.find(".form-layout").prepend(chart_area);

//             let chart = new frappe.Chart("#student-chart", {
//                 title: "Student Data",
//                 data: {
//                     labels: ["A", "B", "C", "D"],
//                     datasets: [
//                         {
//                             name: "Students",
//                             values: [10, 20, 30, 40]
//                         }
//                     ],
//                     color:"blue"
//                 },
//                 type: "bar",
//                 height: 250,
                
//             });

//             console.log("Normal chart created", chart);
//         });
//     }
// });
