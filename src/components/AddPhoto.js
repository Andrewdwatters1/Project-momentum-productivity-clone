import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, ToastStore } from 'react-toasts';

class AddPhoto extends Component {
  constructor() {
    super()
    this.state = {
      url: '',
      photographer: '',
      portfolio: '',
      location: '',
    }
  }

  urlChange = (e) => {
    this.setState({
      url: e.target.value
    })
  }
  photographerChange = (e) => {
    this.setState({
      photographer: e.target.value
    })
  }
  portfolioChange = (e) => {
    this.setState({
      portfolio: e.target.value
    })
  }
  locationChange = (e) => {
    this.setState({
      location: e.target.value
    })
  }
  submitPhoto = (e) => { // 
    e.preventDefault();
    let search = 'sports car'
    axios.get(`https://api.unsplash.com/photos/random?client_id=5ed61707f778d0b6915e1cb34046b4a57e1c445bc003d5d11218f347770c3ae4&query=${search}&orientation=squarish&count=30`).then(result => {
      setTimeout(function () {
        for (let i = 0; i < result.data.length; i++) {
          let photoObj = {
            url: result.data[i].urls.regular,
            photographer: result.data[i].user.name,
            portfolio: result.data[i].user.portfolio_url,
            location: result.data[i].location.title 
          }
          axios.post('/api/photo', { photoObj }).then(result => {
            console.log('added to db', result.data)
          })
        }
      }, 300)
    })
  }

  render() {
    return (
      <div>
        <ToastContainer store={ToastStore} position={ToastContainer.POSITION.BOTTOM_RIGHT} />
        <form onSubmit={this.submitPhoto}>
          Photo Url: <input placeholder="www.website.com" onChange={this.urlChange} value={this.state.url}></input>
          Photographer: <input placeholder="first, last, m" onChange={this.photographerChange} value={this.state.photographer}></input>
          Portfolio Site: <input placeholder="www.portfolio.com" onChange={this.portfolioChange} value={this.state.portfolio}></input>
          Photo Location: <input placeholder="name, city, country" onChange={this.locationChange} value={this.state.location}></input>
          <button type="submit">[+] Submit Photo</button>
        </form>
      </div >
    )
  }
}

export default AddPhoto;