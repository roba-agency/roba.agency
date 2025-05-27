const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    const { session_id, payment_intent } = event.queryStringParameters;

    if (!session_id && !payment_intent) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing session_id or payment_intent parameter' })
      };
    }

    let paymentStatus;
    let customerEmail;

    // Try session first
    if (session_id) {
      try {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        paymentStatus = session.payment_status;
        customerEmail = session.customer_email;
      } catch (sessionError) {
        console.log('Session retrieval failed, trying payment intent');
      }
    }

    // If session failed or wasn't provided, try payment intent
    if (!paymentStatus && payment_intent) {
      try {
        const intent = await stripe.paymentIntents.retrieve(payment_intent);
        paymentStatus = intent.status === 'succeeded' ? 'paid' : intent.status;
        customerEmail = intent.receipt_email;
      } catch (intentError) {
        console.log('Payment intent retrieval failed');
        throw intentError;
      }
    }

    if (!paymentStatus) {
      throw new Error('Could not verify payment status');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payment_status: paymentStatus,
        customer_email: customerEmail
      })
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Error verifying payment status',
        details: error.message
      })
    };
  }
}; 