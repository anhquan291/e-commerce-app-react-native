class Order {
  constructor(id, name, items, totalAmount, address, phone, date) {
    this.id = id;
    this.name = name;
    this.items = items;
    this.totalAmount = totalAmount;
    this.address = address;
    this.phone = phone;
    this.date = date;
  }
}

export default Order;
