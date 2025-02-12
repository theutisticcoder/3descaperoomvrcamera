const payments = Square.payments("sq0idp-E_qLK2OzX4FLJPQdeDc0_Q", "PRODUCTION"); // Use "PRODUCTION" for live
let googlePay;

async function initializeGooglePay() {
    try {
        googlePay = await payments.paymentRequest({
            countryCode: "US",
            currencyCode: "USD",
            total: { amount: "5.00", label: "Total", pending: false },
            requestBillingContact: false,
            requestShippingContact: false,
        });

        const googlePayButton = document.getElementById("google-pay-button");
        const button = await googlePay.attach(googlePayButton);
        button.addEventListener("click", async () => {
            try {
                const result = await googlePay.tokenize();
                if (result.status === "OK") {
                    processPayment(result.token);
                }
            } catch (error) {
                console.error("Google Pay Error:", error);
            }
        });
    } catch (error) {
        console.error("Google Pay Initialization Failed:", error);
    }
}

// Send tokenized payment to your server
async function processPayment(token) {
    const response = await fetch("/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    });

    const data = await response.json();
    if (data.success) {
        localStorage.setItem("Paid", "true")
    } else {
        alert("Payment Failed: " + data.error);
    }
}

// Initialize Google Pay button when the page loads
window.onload = initializeGooglePay;
if(localStorage.getItem("Paid") === "true"){
    document.querySelector("#5").hidden = false;
    document.querySelector("#5im").hidden = false;
    document.querySelector("#6").hidden = false;
    document.querySelector("#6im").hidden = false;

}