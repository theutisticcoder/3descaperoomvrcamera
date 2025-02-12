import * as express from "express";
import {SquareClient} from "square"
const app = express();
app.use(express.json());

const client = new SquareClient({
    token: "EAAAlyds8tzs4Knf1MvV6t86RNeW0sQRh5bOEQkXT_m886RaUTW0GUi5ToPWaaTp",
});

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();

    try {
        const { token } = req.body;
        const paymentsApi = client.paymentsApi;

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
