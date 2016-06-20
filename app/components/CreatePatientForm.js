import React, { Component } from 'react'

export default class CreatePatientForm extends Component {
	constructor() {
		super();
		this.state = {showAddForm: false}
	}


	_handleSubmit(event) {
		event.preventDefault();
		this.props.addPatient(this._first_name.value, this._last_name.value, this._phone.value, this._email.value, this._birthday.value);

		this._first_name.value = '';
		this._last_name.value = '';
		this._email.value = '';
		this._phone.value = '';
		this._birthday.value = '';
	}

	componentDidMount() {
		$('.datepicker').pickadate({
			selectMonths: true, 
    		selectYears: true,
    		onRender: () => {
    			$('.picker__year-display').hide()
    			$('.picker__select--year').hide()
    		},
    		format: 'dd mmmm'
  		});
	}

	_handleCancel() {
		this.props.cancelCreate();
	}

	render()
	{
		return (
			<div className="card blue-grey darken-1">
		          <form onSubmit={this._handleSubmit.bind(this)}>
		            <div className="card-content white-text">
		             <span className="card-title">New Patient</span>
			              <div className="row">
					        <div className="input-field col s6">
					          <input id="first_name" type="text" className="validate" ref={(input => this._first_name = input)}/>
					          <label htmlFor="first_name">First Name</label>
					        </div>
					        <div className="input-field col s6">
					          <input id="last_name" type="text" className="validate" ref={(input => this._last_name = input)}/>
					          <label htmlFor="last_name">Last Name</label>
					        </div>
					      </div>
					      <div className="row">
					        <div className="input-field col s6">
					          <input id="phone" type="tel" className="validate" ref={(input => this._phone = input)}/>
					          <label htmlFor="phone">Phone number</label>
					        </div>
					        <div className="input-field col s6">
					          <input id="email" type="email" className="validate" ref={(input => this._email = input)}/>
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
			            <div className="col s6">
				              <button className="btn waves-effect red lighten-1" onClick={this._handleCancel.bind(this)} name="action">Cancel 
							    	<i className="material-icons right">cancel</i>
							  </button>
							</div>
				            <div className="col s6">
				              <button className="btn waves-effect waves-light" type="submit" name="action">Add 
							    	<i className="material-icons right">add_circle_outline</i>
							  </button>
							</div>
					  </div>
		            </div>
	            </form>
      		</div>
			);
	}
}