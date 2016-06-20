import React, { Component } from 'react'

export default class PatientBox extends Component {
	constructor() {
		super();
		this.state = {
			editModeOn: false
		}
	}

	_handleDelete(event) {
		event.preventDefault();

		this.props.onDelete(this.props.id);
	}	

	_toggleEdit(event) {
		event.preventDefault();

		this.setState({editModeOn: !this.state.EditModeOn});
	}

	_handleSubmit(event) {
		event.preventDefault();

		this.props.onEdit(this.props.id, this._first_name.value, this._last_name.value, this._phone.value, this._email.value, this._birthday.value);
		this.setState({editModeOn: false});
	}

	_handleMedicine(event) {
		event.preventDefault();
	}

	componentDidUpdate(prevProps, prevState) {
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

	_getMedicineList() {
		return this.props.medicines;
	}

	render () {
		let fullname = this.props.firstname + ' ' + this.props.lastname;
		let medicines;
		if (this.props.medicines)
			medicines = this.props.medicines.map((medicine) => {
				return(<li>{medicine.openfda.brand_name}</li>)
			});
		else
			medicines = <li>None</li>
		if (this.state.editModeOn) {
			return(
				<div className="card blue-grey darken-1">
		          <form onSubmit={this._handleSubmit.bind(this)} key='edit_form'>
		            <div className="card-content white-text">
		             <span className="card-title">Edit Patient {fullname}</span>
			              <div className="row">
					        <div className="input-field col s6">
					          <input id="edit_first_name" defaultValue={this.props.firstname} type="text" className="validate" ref={(input => this._first_name = input)}/>
					          <label className="active" htmlFor="edit_first_name">First Name</label>
					        </div>
					        <div className="input-field col s6">
					          <input id="edit_last_name" defaultValue={this.props.lastname} type="text" className="validate" ref={(input => this._last_name = input)}/>
					          <label className="active" htmlFor="edit_last_name">Last Name</label>
					        </div>
					      </div>
					      <div className="row">
					        <div className="input-field col s6">
					          <input id="edit_phone" type="tel" defaultValue={this.props.phone} className="validate" ref={(input => this._phone = input)}/>
					          <label className="active" htmlFor="edit_phone">Phone number</label>
					        </div>
					        <div className="input-field col s6">
					          <input id="edit_email" type="email" defaultValue={this.props.email} className="validate" ref={(input => this._email = input)}/>
					          <label className="active" htmlFor="edit_email">Email</label>
					        </div>
					        <div className="input-field col s6">
					       	  <input id="edit_birthday" type="date" defaultValue={this.props.birthday} className="datepicker" ref={(input => this._birthday = input)}/>
					          <label className="active" htmlFor="edit_birthday">Birthday</label>
					        </div>
					      </div>
		            </div>
		            <div className="card-action">
			            <div className="row">
				            <div className="col s6 offset-s6">
				              <button id="edit_button_submit"className="btn waves-effect waves-light" type="submit" name="action">Save 
							    	<i className="material-icons right">save</i>
							  </button>
							</div>
					  </div>
		            </div>
	            </form>
      		</div>);
		} else {
			return (
	    	<div>
		    	<div className="row">
		        	<div className="col s12 m12">
			          <div className="card blue-grey darken-1">
			            <div className="card-content white-text">
			            	<div className='row'>
			            		<span className="card-title">{fullname}</span>
			            	</div>
			            	<div className='row'>
					            <div className="col s6">
					              <p>Birthday: {this.props.birthday}</p>
					              <p>Mail: {this.props.email}</p>
					              <p>Phone: {this.props.phone}</p>
					            </div>
					            <div className="col s6">
					            <span>Medicines:</span>
					            <ul>
					            	{medicines}
					            </ul>
				            	</div>
			            	</div>
			            </div>
			            <div className="card-action">
			              <a href="#" onClick={this._toggleEdit.bind(this)}>Edit</a>
			              <a href="#" onClick={this._handleDelete.bind(this)}>Delete</a>
			            </div>
			          </div>
			        </div>
		      	</div>
	    	</div>);
		}
  }
}
