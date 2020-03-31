/**
 * @todo
 * Make extenral request to
 * gateway checkout to processs payment
 */
class CheckoutMercadoPago {
  static async doCheckoutRequest(paymentModelContract) {
    console.log(`Checkout mercado pago... ${paymentModelContract.id}`);
    console.log(`Payment approved... ${paymentModelContract.id} `);
    return {
      order_id: paymentModelContract.id,
      status: 'APPROVED'
    };
  }
}

export default CheckoutMercadoPago;
