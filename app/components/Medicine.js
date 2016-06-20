import React, { PropTypes, Component } from 'react'

export default class Medicine extends Component {

	_handleSelect(event) {
		event.preventDefault();
		this.props.onSelect(this.props.data);
	}

	render() {
		return(<a href="#" onClick={this._handleSelect.bind(this)}
				  className="collection-item"> Name: {this.props.data.openfda.brand_name} <br/>Made by: {this.props.data.openfda.manufacturer_name}</a>)
	}
}