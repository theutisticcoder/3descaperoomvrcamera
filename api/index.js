const express = require("express");
const { Client, Environment } = require("square");

const app = express();
app.use(express.json());

const squareClient = new Client({
    environment: Environment.Production, // Change to Environment.Production for live payments
    accessToken: "EAAAlyds8tzs4Knf1MvV6t86RNeW0sQRh5bOEQkXT_m886RaUTW0GUi5ToPWaaTp",
});

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

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
}
app.listen(3000, () => console.log("Server running on port 3000"));
