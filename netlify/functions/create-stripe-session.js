// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

exports.handler = async function(event, context) {
  const { email, plan } = JSON.parse(event.body);

  // Select price ID based on plan
  const priceId = plan === 'premium' 
    ? 'price_1RTIcoCaH7aBr0GIvP9QYSpM'  // Premium plan price
    : 'price_1RTI9uCaH7aBr0GIq6PeWVYe';  // Base plan price

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
    success_url: 'https://roba.agency/payment-success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'https://roba.agency',
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ sessionId: session.id }),
  };
};