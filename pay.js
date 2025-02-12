const payments = Square.payments("sq0idp-E_qLK2OzX4FLJPQdeDc0_Q", "PRODUCTION"); // Use "PRODUCTION" for live

// Initialize Google Pay button when the page loads
if(localStorage.getItem("Paid") === "true"){
    document.querySelector("#5").hidden = false;
    document.querySelector("#5im").hidden = false;
    document.querySelector("#6").hidden = false;
    document.querySelector("#6im").hidden = false;

}
async function initializeSquare() {
    const card = await payments.card();
    await card.attach("#card-container");

    document.getElementById("card-button").disabled = false;

    document.getElementById("card-button").addEventListener("click", async () => {
        const result = await card.tokenize();
        if (result.status === "OK") {
            processPayment(result.token);
        } else {
            console.error("Payment failed:", result.errors);
        }
    });
}

async function processPayment(token) {
    const response = await fetch("/api/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    });

    const data = await response.json();
    if (data.success) {
        alert("Payment Successful!");
        
    } else {
        alert("Payment Failed: " + data.error);
    }
}

// Initialize the Square Payment Form
window.onload = initializeSquare;
