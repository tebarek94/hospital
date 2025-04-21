import React from 'react';

const Checkout = ({
  first_name,
  last_name,
  email,
  amount,
  currency,
  public_key,
  tx_ref,
  description,
}) => {
  return (
    <form method="POST" action="https://api.chapa.co/v1/hosted/pay">
      <input type="hidden" name="public_key" value={public_key} />
      <input type="hidden" name="tx_ref" value={tx_ref} />
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="currency" value={currency} />
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="first_name" value={first_name} />
      <input type="hidden" name="last_name" value={last_name} />
      <input type="hidden" name="title" value="Let us do this" />
      <input type="hidden" name="description" value={description} />
      <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
      <input type="hidden" name="callback_url" value="https://example.com/callbackurl" />
      <input type="hidden" name="return_url" value="https://example.com/returnurl" />
      <input type="hidden" name="meta[title]" value="test" />
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default Checkout;
