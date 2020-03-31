import CheckoutMercadoPago from './mercadopago/checkout';
import CheckoutPagseguro from './pagseguro/checkout';

const instances = {
  'Mercado Pago': CheckoutMercadoPago,
  Pagseguro: CheckoutPagseguro
};

const getCheckoutInstance = gateway => {
  return instances[gateway];
};

export { instances, getCheckoutInstance };
