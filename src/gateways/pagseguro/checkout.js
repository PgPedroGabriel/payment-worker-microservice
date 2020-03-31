/**
 * @todo
 * Make extenral request to
 * gateway checkout to processs payment
 */
class CheckoutPagseguro {
  static async doCheckoutRequest(paymentModelContract) {
    console.log(`Checkout pagseguro... ${paymentModelContract.id}`);

    console.log(`Payment approved... ${paymentModelContract.id}`);
    return {
      order_id: paymentModelContract.id,
      products: paymentModelContract.products,
      status: 'APPROVED'
    };
  }
}

export default CheckoutPagseguro;
