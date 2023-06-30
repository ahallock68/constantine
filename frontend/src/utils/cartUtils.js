export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed();
};

export const updateCart = (state) => {
  // Calc items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calc shipping price (if order is over 110 then free, else 10)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Calc tax amount (15%)
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  // Calc total items price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
