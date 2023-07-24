import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../../../utils/withRouter'
import './ModuleMenu.scss'
import MyContext from '../../../contexts/MyContext';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';
import 'tippy.js/animations/scale.css';
import Logo from '../../../assets/Gundam/Logo.png'

class Menu extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }



  render() {

    const cates = this.state.categories.map((item) => {
      return (
        <li key={item._id} className="menu-chil"><Link to={'/product/category/' + item._id}>{item.name}</Link></li>
      );
    });
    return (
      <div className="menu-bar">

        <div className="menu-left">
          <div className="logo">
            <Link to="/"><img src={Logo} alt=""></img></Link>
          </div>
          <div className="categories">
            <ul className="menu">
              <li className=""><Link to='/'>HOME</Link></li>
              {cates}
            </ul>
            <ul className="menu-mobile">
              <Tippy
                content={
                  <div className="menu-mobile-list">
                    <div>
                      <li className=""><Link to='/'>HOME</Link></li>
                      {cates}
                    </div>
                  </div>
                }
                animation="scale"
                arrow={true}
                theme="light"
                trigger="click"
                interactive="true"
                placement="top-end"
              >
                
                  <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
              
              </Tippy>
              {/* <div className="menu-mobile-list">
              <li className=""><Link to='/'>HOME</Link></li>
              {cates}
              </div> */}
            </ul>
            {/* <form className="search">
                <input type="search" placeholder="Enter keyword" className="keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
                <input type="submit" value="SEARCH" onClick={(e) => this.btnSearchClick(e)} />
              </form> */}
          </div>
        </div>
        <div className="info">
          <div className="info-user">
            {this.context.token === '' ?

              <Tippy
                content={<div className="login-mobile">
                  <Link to='/login'>Login</Link>
                  <Link to='/signup'>Sign-up</Link>
                  <Link to='/active'>Active</Link>
                </div>}
                animation="scale"
                arrow={true}
                theme="light"
                trigger="click"
                interactive="true"
                placement="top-end"
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>

              </Tippy>
              :
              <div>
                <Tippy
                  content={
                    <div className="user-poper">
                      <div className="user-name">
                        <p>

                          Hello {this.context.customer.name}
                        </p>
                      </div>
                      <div className="info-user-child">
                        <Link to='/myprofile'>My profile</Link>
                        <Link to='/myorders'>My orders</Link>
                        <Link to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link>
                      </div>
                    </div>

                  }
                  animation="scale"
                  arrow={true}
                  theme="light"
                  trigger="click"
                  interactive="true"
                  placement="top-end"
                >
                  <button className="info-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" /></svg>
                  </button>
                </Tippy>
                <Link to='/mycart'>
                  <div className="my-card">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" /></svg>
                    <b>{this.context.mycart.length}</b>
                  </div>
                </Link>


              </div>
            }
          </div>
        </div>
      </div>
    );

  }
  //Search handlers
  // event-handlers
  // event-handlers

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
  }
  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }
  componentDidMount() {
    this.apiGetCategories();
  }
  // apis
  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  //handle menu button

}
const menuMobile = document.querySelector('menuMobile')

export default withRouter(Menu);