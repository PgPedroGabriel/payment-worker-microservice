import PaymentProductContract from './PaymentProductContract';

class PaymentModelContract {
  constructor(id, gateway, products = []) {
    this.id = id;
    this.gateway = gateway;
    this.products = products;
  }

  static parse(jsonString) {
    const json = JSON.parse(jsonString);

    const model = new PaymentModelContract(json.id, json.gateway, []);

    json.products.forEach(product =>
      model.products.push(PaymentProductContract.parse(product))
    );

    return model;
  }
}

export default PaymentModelContract;
