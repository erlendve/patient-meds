import React, { Component } from 'react'

export default class SearchForm extends Component{
	_handleSubmit(event) {
		event.preventDefault();

		this.props.onSubmit(this._searchString.value);
		this._searchString.value= '';
	}

	render()  {
		return(
				<form onSubmit={this._handleSubmit.bind(this)}>
				        <div className="input-field">
				          <input id="search" type="search" required ref={(input => this._searchString = input)}/>
				          <label htmlFor="search"><i className="material-icons">search</i></label>
				          <i className="material-icons">close</i>
				        </div>
			        
			    </form>
		      
	      )
	}
}
