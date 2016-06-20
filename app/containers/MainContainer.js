import React, { PropTypes, Component } from 'react'
require('../stylesheets/main.less')

import PatientsContainer from '../containers/PatientsContainer';
import MedicinesContainer from '../containers/MedicinesContainer';

export default class MainContainer extends Component {
	constructor() {
		super();
		this.state = {addedMedicine: null}
	}

	_addMedicineToPatients(medicine) {
		this.setState({addedMedicine: medicine});
	}

	render () {
		return (
		<div className='main container'>
			<div className='row'>
				<div className='col s6'>
					<h2>{'Medicines'}</h2>
					<p>{'Need to find some drugs? You have come to the right place!'}</p>
				</div>
				<div className='col s6'>
					<h2>{'Patients'}</h2>
					<p>{'Or "potential drug buyers" as we like to call them...'}</p>
				</div>
			</div>
			<div className='row'>
				<div className='col s4'>
					<MedicinesContainer addMedicine={this._addMedicineToPatients.bind(this)}/>
				</div>
			    <div className='col s6 offset-s2'>
			    	<PatientsContainer addedMedicine={this.state.addedMedicine}/>
			  	</div>
		  	</div>
		  </div>
		)
  	}
}

MainContainer.propTypes = {
  children: PropTypes.any
}
