import React, { Component } from 'react';
import '../Style/Homestay.css';


class Homestay extends Component {

    handleClick = () => {
        this.props.selectedHomestay(this.props.homestay);
    }

    render() {

        const judul = `${this.props.homestay.nama} - Rp. ${this.props.homestay.harga.toLocaleString()}`
        const style = {
            backgroundImage: `url(${this.props.homestay.fotoUrl})`
        }

        return (
            <div className="homestay" onClick={this.handleClick}>
                <div className="homestay-foto" style={style}></div>
                <div className="homestay-judul" >{judul}</div>
            </div>
        );
    }
}

export default Homestay;