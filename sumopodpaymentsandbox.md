Create Payment

curl -X POST https://api-pay-sandbox.sumopod.com/api/v1/payments \
  -H "Content-Type: application/json" \
  -H "X-Api-Key: YOUR_API_KEY" \
  -d '{
    "order_id": "INV-2026-001",
    "amount": 50000,
    "currency": "IDR",
    "expires_in_hours": 24,
    "success_return_url": "https://yourapp.com/success",
    "cancel_return_url": "https://yourapp.com/cancel",
    "payment_method_type_code": "QRIS"
  }'


  API KEY : 166b0a48cccd4de36594ac8abe8b86f24e3276b24a7323dcbed9863a8daa4cef