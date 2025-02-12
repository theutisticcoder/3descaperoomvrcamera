const express = require("express");
const { Client, Environment } = require("square");

const app = express();
app.use(express.json());
app.use(express.static(__dirname))

const squareClient = new Client({
    environment: Environment.Sandbox, // Change to Environment.Production for live payments
    accessToken: "YOUR_SQUARE_ACCESS_TOKEN",
});

app.post("/process-payment", async (req, res) => {
    try {
        const { token } = req.body;
        const paymentsApi = squareClient.paymentsApi;

        const response = await paymentsApi.createPayment({
            sourceId: token,
            idempotencyKey: crypto.randomUUID(),
            amountMoney: { amount: 500, currency: "USD" }, // $5.00
        });

        res.json({ success: true, payment: response.result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
