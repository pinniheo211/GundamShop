import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../../utils/withRouter';
import Footer from '../Footer/FooterComponent';
import Contact from '../Home/Contact/ContactComponent';
import './productModule.scss'

class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],


    };
  }

  render() {
    const searchForm = document.querySelector('searchForm');
    const prods = this.state.products.map((item) => {
      return (

        <div key={item._id} className="inline tall-items" >
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
            {/* <figcaption className="text-center">{item.name}<br />Price: {item.price}</figcaption> */}
          </figure>
        </div>
      );
    });
    const title = this.state.products.map((item, index) => {

      if (index === 0) {
        return (
          <h2 className="text-center">Danh sách sản phẩm của {item.category.name}</h2>
        );
      }

    });
    return (
      <div className="text-center product">
        {title}
        <div >
          <form className="search">
            <input type="search" id="searchForm" placeholder="Enter keyword" className="keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
            <svg onClick={(e) => this.btnSearchClick(e)} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
            {/* <input type="submit" value="SEARCH"  /> */}
          </form>
          <div className="product-items">
            {prods}
          </div>
        </div>
        <Contact />
        <Footer />
      </div>
    )
  }
  componentDidMount() { // first: /product/...
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }


  componentDidUpdate(prevProps) { // changed: /product/...
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  //handle
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  // apis
  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }
  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

}
export default withRouter(Product);