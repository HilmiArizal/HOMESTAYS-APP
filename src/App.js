import React, { Component } from 'react';
import './App.css';
import Homestay from './Component/Homestay';
import GoogleMapReact from 'google-map-react';
import Marker from './Component/Marker';


class App extends Component {

  state = {
    homestay: [],
    selectedHomestay: null,
    homeAsTarget: [],
    search: ""
  }

  componentDidMount() {
    fetch(`https://raw.githubusercontent.com/algosigma/js-reactjs/master/homestays.json`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          homestay: data,
          homeAsTarget: data
        })
      })
  }

  selectedHomestay = (homestay) => {
    this.setState({ selectedHomestay: homestay })
  }

  handleSearch = (e) => {
    this.setState({
      search: e.target.value,
      homestay: this.state.homeAsTarget.filter((item) => new RegExp(e.target.value, "i").exec(item.nama))
    })

  }


  render() {
    console.log(this.state.homestay)
    let center = {
      lat: -7.797068,
      lng: 110.3715745
    }

    if (this.state.selectedHomestay) {
      center = {
        lat: this.state.selectedHomestay.lat,
        lng: this.state.selectedHomestay.lng
      }
    }


    return (
      
      <div className="app">
        <div className="main">
          <div className="search">
            <input type="text" placeholder="Cari penginapan ..." value={this.state.search} onChange={this.handleSearch} />
          </div>
          <div className="homestays">
            {this.state.homestay.map((homestay) => {
              return (
                <Homestay
                  key={homestay.id}
                  homestay={homestay}
                  selectedHomestay={this.selectedHomestay}
                />
              )
            })}
          </div>
        </div>
        <div className="peta">
          <GoogleMapReact
            center={center}
            zoom={15}
          >
            {this.state.homestay.map((item) => {
              return <Marker
                key={item.id}
                lat={item.lat}
                lng={item.lng}
                text={item.harga}
                selected={item === this.state.selectedHomestay}
              />
            })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;