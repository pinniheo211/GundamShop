import React, { Component } from 'react';
import MyContext from '../../contexts/MyContext';
import CartUtil from '../../utils/CartUtil';
import axios from 'axios'
import withRouter from '../../utils/withRouter'
import './MycartComponentModule.scss'

class Mycart extends Component {
  static contextType = MyContext; // using this.context to access global state
  render() {
    const mycart = this.context.mycart.map((item, index) => {
      return (
        <tr key={item.product._id} className="datatable">
          <td><p>{index + 1}</p></td>
          <td><p>{item.product._id}</p></td>
          <td><p>{item.product.name}</p></td>
          <td><p>{item.product.category.name}</p></td>
          <td><img src={"data:image/jpg;base64," + item.product.image} width="70px" height="70px" alt="" /></td>
          <td><p>{item.product.price} VND</p></td>
          <td><p>{item.quantity}</p></td>
          <td><p>{item.product.price * item.quantity} VND</p></td>
                  <td><span className="link" onClick={() => this.lnkRemoveClick(item.product._id)}>Remove</span></td>

        </tr>
      );
    });
    return (
      <div className="align-center mycart">
        <h2 className="text-center">ITEM LIST</h2>
        <h1 className="Empty"></h1>
        <table className="datatable" border="1">
          <tbody>
            <tr className="datatable">
              <th>No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
            {mycart}
            <tr>
              <td colSpan="6"></td>
              <td>Total</td>
              <td>{CartUtil.getTotal(this.context.mycart)}</td>
              <td><span className="link" onClick={() => this.lnkCheckoutClick()}>CHECKOUT</span></td>            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  // event-handlers
  lnkCheckoutClick() {
    if (window.confirm('ARE YOU SURE?')) {
      if (this.context.mycart.length > 0) {
        const total = CartUtil.getTotal(this.context.mycart);
        const items = this.context.mycart;
        const customer = this.context.customer;
        if (customer) {
          this.apiCheckout(total, items, customer);
        } else {
          this.props.navigate('/login');
          
        }
      } else {
        console.log('gior hang cua ban trong ')
      }
    }
  }
  // apis
  apiCheckout(total, items, customer) {
    const body = { total: total, items: items, customer: customer };
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/customer/checkout', body, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('OK BABY!');
        this.context.setMycart([]);
        this.props.navigate('/home');
      } else {
        alert('SORRY BABY!');
      }
    });
  }
// event-handlers
  lnkRemoveClick(id) {
    const mycart = this.context.mycart;
    const index = mycart.findIndex(x => x.product._id === id);
    if (index !== -1) { // found, remove item
      mycart.splice(index, 1);
      this.context.setMycart(mycart);
    }
  }
}
export default withRouter(Mycart);
