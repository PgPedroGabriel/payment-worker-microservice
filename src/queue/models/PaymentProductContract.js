class PaymentProductContract {
  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  static parse(json) {
    return new PaymentProductContract(
      json.id,
      json.name,
      json.price,
      json.quantity
    );
  }
}

export default PaymentProductContract;
