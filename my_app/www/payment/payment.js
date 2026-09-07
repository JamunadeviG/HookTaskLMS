let currentBill = null;


// --------------------------------------------------
// SEARCH BILL
// --------------------------------------------------

document.getElementById("search_btn").addEventListener("click", function () {

    const billId = document.getElementById("bill_id").value.trim();

    if (!billId) {
        showMessage("Please enter Bill ID", "error");
        return;
    }

    getBill(billId);

});


// --------------------------------------------------
// GET BILL
// --------------------------------------------------

function getBill(billId) {

    showMessage("Loading...", "info");

    frappe.call({

        method: "my_app.api1.payment.get_bill",

        args: {
            bill_id: billId
        },

        callback: function (response) {

            if (response.message) {

                currentBill = response.message;

                displayBill(currentBill);

                showMessage("", "");

            }

        },

        error: function (error) {

            console.error(error);

            showMessage(
                "Bill not found",
                "error"
            );

        }

    });

}


// --------------------------------------------------
// DISPLAY BILL
// --------------------------------------------------

function displayBill(bill) {

    document.getElementById("bill_section")
        .classList.remove("hidden");


    // Customer

    document.getElementById("customer_name")
        .textContent = bill.cname || "-";

    document.getElementById("customer_phone")
        .textContent = bill.customer_phone || "-";


    // Products

    const tbody =
        document.getElementById("products_body");

    tbody.innerHTML = "";


    bill.products.forEach(function (product) {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${product.prod_name}</td>
            <td>${product.quantity}</td>
            <td>₹${formatAmount(product.price)}</td>
            <td>₹${formatAmount(product.total)}</td>
        `;

        tbody.appendChild(row);

    });


    // Summary

    document.getElementById("gross_total")
        .textContent =
        formatAmount(bill.gross_total);


    document.getElementById("discount")
        .textContent =
        formatAmount(bill.discount_applied);


    document.getElementById("total_amount")
        .textContent =
        formatAmount(bill.total_amount);


    document.getElementById("balance_amount")
        .textContent =
        formatAmount(bill.balance_amount);


    // Maximum payment = current balance

    document.getElementById("pay_amount")
        .max = bill.balance_amount;

}


// --------------------------------------------------
// PAY BUTTON
// --------------------------------------------------

document.getElementById("pay_btn")
    .addEventListener("click", function () {

        if (!currentBill) {

            showMessage(
                "Please search for a bill first",
                "error"
            );

            return;
        }


        const payVia =
            document.getElementById("pay_via").value;


        const payAmount =
            parseFloat(
                document.getElementById("pay_amount").value
            );


        // Validate payment method

        if (!payVia) {

            showMessage(
                "Please select a payment method",
                "error"
            );

            return;
        }


        // Validate amount

        if (!payAmount || payAmount <= 0) {

            showMessage(
                "Please enter a valid payment amount",
                "error"
            );

            return;
        }


        // Check against balance

        if (payAmount > currentBill.balance_amount) {

            showMessage(
                "Payment amount cannot be greater than balance",
                "error"
            );

            return;
        }


        createPayment(
            currentBill.name,
            payVia,
            payAmount
        );

    });


// --------------------------------------------------
// CREATE PAYMENT
// --------------------------------------------------

function createPayment(
    billId,
    payVia,
    payAmount
) {

    const payButton =
        document.getElementById("pay_btn");

    payButton.disabled = true;

    payButton.textContent = "Processing...";


    frappe.call({

        method: "my_app.api1.payment.create_payment",

        args: {

            bill_id: billId,

            pay_via: payVia,

            pay_amount: payAmount

        },

        callback: function (response) {

            if (response.message) {

                const result =
                    response.message;


                showSuccess(result);

            }

        },

        error: function (error) {

            console.error(error);

            showMessage(
                "Payment failed",
                "error"
            );

            payButton.disabled = false;

            payButton.textContent = "Pay Now";

        }

    });

}


// --------------------------------------------------
// SUCCESS
// --------------------------------------------------

function showSuccess(result) {

    const message =
        document.getElementById("message");


    message.className = "success";


    message.innerHTML = `

        <h2>Payment Successful 🎉</h2>

        <p>
            Payment ID:
            <strong>${result.payment_id}</strong>
        </p>

        <p>
            Bill ID:
            <strong>${result.bill_id}</strong>
        </p>

        <p>
            Paid Amount:
            <strong>₹${formatAmount(result.paid_amount)}</strong>
        </p>

        <p>
            Remaining Balance:
            <strong>₹${formatAmount(result.balance_amount)}</strong>
        </p>

        <p>
            Status:
            <strong>${result.workflow_state}</strong>
        </p>

    `;


    // Update displayed balance

    document.getElementById("balance_amount")
        .textContent =
        formatAmount(result.balance_amount);


    // Disable payment if fully paid

    if (result.balance_amount <= 0) {

        document.getElementById("pay_btn")
            .disabled = true;

        document.getElementById("pay_btn")
            .textContent = "Fully Paid";

    }
    else {

        document.getElementById("pay_btn")
            .disabled = false;

        document.getElementById("pay_btn")
            .textContent = "Pay Now";

    }


    // Update local bill data

    currentBill.balance_amount =
        result.balance_amount;

}


// --------------------------------------------------
// MESSAGE
// --------------------------------------------------

function showMessage(text, type) {

    const message =
        document.getElementById("message");

    message.textContent = text;

    message.className = type;

}


// --------------------------------------------------
// FORMAT MONEY
// --------------------------------------------------

function formatAmount(amount) {

    return Number(amount || 0)
        .toFixed(2);

}