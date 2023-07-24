import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './HomeComponentModule.scss'
import Banner from './Banner'
import LineComponent from './Line/LineComponent'
import Contact from './Contact/ContactComponent';
import Footer from '../Footer/FooterComponent';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }
  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="grid-new-item">
          <div className="animatetop">
            
          </div>

          <div className="animatebottom">
            
          </div>
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
            {/* <figcaption className="text-center">{item.name}<br />Price: {item.price}</figcaption> */}
          </figure>
        </div>
      );
    });
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="grid-new-item">
          <div className="animatetop">
            
            </div>
  
            <div className="animatebottom">
              
            </div>
          <figure>
            <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
            {/* <figcaption className="text-center">{item.name}<br />Price: {item.price}</figcaption> */}
          </figure>
        </div>
      );
    });
    return (
      <div className="Home-container">
        <Banner />
        <div className="align-center new-items">
          <div className="text-center">
            <LineComponent
            />
          </div>
          <h2 className="text-center">NEW PRODUCTS</h2>
          <div className="container-items">
            {newprods}
          </div>

        </div>

        {this.state.hotprods.length > 0 ?
          <div className="hot-items">
            <div className="text-center">
              <LineComponent />
            </div>
            <h2 className="text-center">HOT PRODUCTS</h2>
            <div className="container-items">
              {hotprods}
            </div>

          </div>
          : <div />}
        <Contact />
        <Footer />
      </div>
    );
  }
  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
  }
  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}
export default Home;