import React, { Component } from 'react'

export default class EditPatientForm extends Component {

	_handleSubmit(event) {
		event.preventDefault();
		this.props.onSubmit(1, this._first_name.value, this._last_name.value, this._phone.value, this._email.value, this._birthday.value);

		this._first_name = '';
		this._last_name = '';
		this._email = '';
		this._phone = '';
		this._birthday = '';
	}

	render()
	{
		return (
			<div className="card blue-grey darken-1">
		          <form onSubmit={this._handleSubmit.bind(this)}>
		            <div className="card-content white-text">
		             <span className="card-title">{this.props.title}</span>
			              <div className="row">
					        <div className="input-field col s6">
					          <input id="first_name" defaultValue={this.props.firstname} type="text" className="validate" ref={(input => this._first_name = input)}/>
					          <label htmlFor="first_name">First Name</label>
					        </div>
					        <div className="input-field col s6">
					          <input id="last_name" defaultValue={this.props.lastname} type="text" className="validate" ref={(input => this._last_name = input)}/>
					          <label htmlFor="last_name">Last Name</label>
					        </div>
					      </div>
					      <div className="row">
					        <div className="input-field col s6">
					          <input id="phone" defaultValue="13371337" type="tel" className="validate" ref={(input => this._phone = input)}/>
					          <label htmlFor="phone">Phone number</label>
					        </div>
					        <div className="input-field col s6">
					          <input id="email" defaultValue="Alvin@alvin.alv" type="email" className="validate" ref={(input => this._email = input)}/>
					          <label htmlFor="email">Email</label>
					        </div>
					        <div className="input-field col s6">
					       	  <input id="birthday" type="date" className="datepicker" ref={(input => this._birthday = input)}/>
					          <label htmlFor="birthday">Birthday</label>
					        </div>
					      </div>
		            </div>
		            <div className="card-action">
			            <div className="row">
				            <div className="col s6 offset-s6">
				              <button className="btn waves-effect waves-light" type="submit" name="action">{this.props.submitText}
							    	<i className="material-icons right">{this.props.icon}</i>
							  </button>
							</div>
					  </div>
		            </div>
	            </form>
      		</div>
			);
	}
}