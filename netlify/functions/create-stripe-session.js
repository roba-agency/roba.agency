const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use env variable

exports.handler = async function(event, context) {
  const { email, plan } = JSON.parse(event.body);

  const priceId = 'prod_SNsVWCVzs3jy6K'; 

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    customer_email: email,
    success_url: 'https://example.com',
    cancel_url: 'https://google.com',
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ sessionId: session.id }),
  };
};