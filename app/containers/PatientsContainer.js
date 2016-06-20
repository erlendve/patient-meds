import React, { Component } from 'react'

import Patient from '../components/PatientBox'
import CreatePatientForm from '../components/CreatePatientForm';
import SearchForm from '../components/SearchForm';

export default class PatientsContainer extends Component {
	constructor() {
		super();

		this.state = {
			patients:
			[
				{id: 1, firstname: 'Erlend', lastname: 'Vestad', email: 'erlend@vestad.no', phone: 98613245, birthday: '18 May', medicines: null},
				{id: 2, firstname: 'Kristin', lastname: 'Solgård', email: 'kristin@solgaard.no', phone: 46607499, birthday: '18 May', medicines: null}
			]
		}
	}

	componentWillReceiveProps(nextProp) {
	    let patients = this.state.patients.map((p) => {
	    	let fullname = p.firstname + p.lastname;
			if (this.state.filter && fullname.toLowerCase().indexOf(this.state.filter) > -1) 
			{
				if (!p.medicines) {
		    		p.medicines = [nextProp.addedMedicine];
		    		return p;
		    	} else {
		    		p.medicines = p.medicines.concat(nextProp.addedMedicine);
		    		return p;
		    	}	
			}
	    	return p;
	    });

		this.setState({
			patients: patients
		});
	}

	_demoPatients() {
	$.ajax({
		  url: 'https://randomuser.me/api/?results=5000&nat=dk',
		  dataType: 'json',
		  success: function(data){
		  	for (var i = 0; i < 50; i++) {
		  		this._addPatients(data.results);
		  	}
		  }.bind(this)
		});	
	}
	
	_addPatients(data) {
		let arr = [];
		let patientCount= this.state.patients.length;

		let n = data.length;
 		let myArray = new Array(n); 
 		let i=0;
 		while (i<n) {
			let person = data[i];
 			myArray[i] = {id: i+patientCount, firstname: person.name.first, lastname: person.name.last, 
 				email: person.email, phone: person.phone, birthday: '18 May', medicines: null}; 
 			i++; 
 		}

		this.setState({
			patients: this.state.patients.concat(myArray)
		});
	}

	_addPatient(added_firstname, added_lastname, added_phone, added_email, added_birthday) {
		let patient = [{
			firstname: added_firstname,
			lastname: added_lastname,
			email: added_email,
			phone: added_phone,
			id: this.state.patients.length+1,
			birthday: added_birthday
		}]

		this.setState({
			patients: patient.concat(this.state.patients)
		});
	}

	_editPatient(patientId, edit_firstname, edit_lastname, edit_phone, edit_email, edit_birthday) {
		let patient = [{
			firstname: edit_firstname,
			lastname: edit_lastname,
			email: edit_email,
			phone: edit_phone,
			id: patientId,
			birthday: edit_birthday
		}]

		let patients = this.state.patients.filter(
			patient => patient.id !== patientId
			);

		patients = patient.concat(patients);

		this.setState({
			patients: patients,
			filteredPatients: null,
			filter: null
		});
	}

	_deletePatient(patientId) {
		let patients = this.state.patients.filter(
			patient => patient.id !== patientId
			);

		let filteredPatients = this.state.filteredPatients;
		if (filteredPatients) {
			filteredPatients = filteredPatients.filter(
			patient => patient.id !== patientId
			);
		}

		this.setState({ 
			patients: patients,
			filteredPatients: filteredPatients
		 });
	}

	_getPatients()  {
		let currentPatientList = this.state.patients;
		if (this.state.filteredPatients)
			currentPatientList = this.state.filteredPatients;

		return currentPatientList.slice(0, 10).map((p) => {
			 return (
			 	<Patient 
			 	firstname={p.firstname} 
			 	lastname={p.lastname} 
			 	email={p.email} 
			 	birthday={p.birthday} 
			 	phone={p.phone}
			 	id={p.id}
			 	key={p.id}
			 	onEdit={this._editPatient.bind(this)}
			 	onDelete={this._deletePatient.bind(this)}
			 	medicines={p.medicines}
			 	/>);
		});
	}

	_patientSearch(queryString) {
		let qsLower = queryString.toLowerCase();
		let filtered = this.state.patients.filter((p) => {
			let fullname = p.firstname + p.lastname;
			if (fullname.toLowerCase().indexOf(qsLower) > -1)
				return p;
		});

		this.setState({
			filteredPatients: filtered,
			filter: qsLower
		})
	}

	_handleClearFilter(event) {
		event.preventDefault();

		this.setState({
			filteredPatients: null,
			filter: null
		})
	}

	_toggleCreate() {
		if (!this.state.createOn)
			this.setState({createOn : true});
		else
			this.setState({createOn : !this.state.createOn});
	}

	_cancelCreate() {
		this._toggleCreate();
	}

	render () {
		const patients = this._getPatients();
		let filter;
		let create;

		if(this.state.createOn) {
			create = <CreatePatientForm addPatient={this._addPatient.bind(this)} cancelCreate={this._cancelCreate.bind(this)}/>
		}

		if(this.state.filter) {
			filter = <div className="row">
						<div className="col s4">Search filter: {this.state.filter}</div>
						<a href="#" className="right" onClick={this._handleClearFilter.bind(this)}>Clear filter</a>
					</div>
		}

		return (
			<div>
			<div id='addPatientButton' className="fixed-action-btn">
			    <a className="btn-floating btn-large white">
			      <i className="large material-icons black-text">mode_edit</i>
			    </a>
			    <ul>
			      <li><a className="btn-floating red" onClick={this._demoPatients.bind(this)}><i className="material-icons">playlist_add</i></a></li>
			      <li><a className="btn-floating blue" onClick={this._toggleCreate.bind(this)}><i className="material-icons">add</i></a></li>
			    </ul>
			  </div>
			<SearchForm onSubmit={this._patientSearch.bind(this)}/>
			{filter}
			{create}
			{patients}
			</div>
			)
	}
}
