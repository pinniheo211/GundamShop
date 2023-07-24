import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import banner from '../../assets/Gundam/Banner.png'
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          hotprods: []
        };
      }
    render() {
        return (
            <div className="banner">
                    <div className="banner__content">
                        <h1>GUNDAM</h1>
                        <p>Gunpla is an acronym for "Gandamu no Puramoderu", which means "Gundam Plastic Model " . This word is used to refer to the type of stereoscopic plastic toy with the theme of Robots called Mobile Suit and Mobile Armor and the battleships appearing in the Gundam Anime series.
                        </p>
                    </div>
                    <div className="banner__img">
                        <img src={banner} alt=""></img>
                    </div>
                </div>
        )
    }
    apiGetHotProducts() {
        axios.get('/api/customer/products/hot').then((res) => {
          const result = res.data;
          this.setState({ hotprods: result });
        });
      }
}

export default Main