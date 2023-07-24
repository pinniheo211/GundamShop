import React, { Component } from 'react';
// import Inform from './InformComponent';
import Home from '../components/Home/HomeComponent';
import { Routes, Route, Navigate } from 'react-router-dom';
import Product from './Product/productComponent'
import ProductDetail from './Product/productDetailComponent'
import Signup from './LoginAndSignup/SignupComponent';
import Active from '../components/Active/ActiveComponent';
import Login from './LoginAndSignup/LoginComponent';
import Myprofile from './Myprofile/MyprofileComponent';
import Mycart from './Mycart/MycartComponent';
import Menu from './Home/Menu/MenuComponent';

import Myorders from './Myorders/MyordersComponent.js';

class Main extends Component {
  render() {
    return (
      <div className="body-customer">
        <Menu />
        {/* <Inform /> */}
        <div className="body">
          <Routes>
            <Route path='/' element={<Navigate replace to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/product/category/:cid' element={<Product />} />
            <Route path='/product/search/:keyword' element={<Product />} />
            <Route path='/product/:id' element={<ProductDetail />} />
            <Route path='/signup' element={<Signup />} />
            <Route path="/active" element={<Active />} />
            <Route path="/login" element={<Login />} />
            <Route path="myprofile" element={<Myprofile />} />
            <Route path="/mycart" element={<Mycart />} />
            <Route path="/myorders" element={<Myorders />} />
          </Routes>
        </div>
      </div>
    );
  }
}
export default Main;