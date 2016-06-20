import React, { PropTypes, Component } from 'react'

import Medicine from '../components/Medicine';

export default class ShowResult extends Component {
	constructor() {
		super();
		this.state = {searching: true}
	}

	componentDidMount() {
		$.ajax({
			  url: "https://api.fda.gov/drug/label.json?api_key=NmhKzXigRUGnW7xIMMwy6gsFkaWanLt7ge7X8LyB&search=" + this.props.queryString + "&limit=10",
			  dataType: 'json',
			  success: function(data) {
			  	this.setState({
			  		result: data,
			  		searching: false
			  	})
			  }.bind(this),
			  error: function () {
			  	this.setState({
			  		searching: false
			  	})

			  }.bind(this)
			});
	}

	_addMedicine(medicine) {
		this.props.onAddMedicine(medicine);
	}

	_renderMedicineResults() {
		return this.state.result.results.map((res) => {
			if(res.openfda.brand_name)
				return(<Medicine data={res} key={res.id} onSelect={this._addMedicine.bind(this)}/>);
		});
	}

	_hideMe(id) {
		$("#" + id).slideUp();
	}

	render() {
		if(this.state.searching) {
			return (
				<div className='card grey lighten-1'>
					<div className="card-content black-text">
						Searching for "{this.props.queryString}"
						<div className="progress">
					      <div className="indeterminate"></div>
					  </div>
					</div>
				</div>
			);
		}

		if(!this.state.searching && !this.state.result) {
			setTimeout(function() { this._hideMe(this.props.queryString)}.bind(this), 1000);
			return (
				<div id={this.props.queryString} className='card red lighten-1'>
					<div className="card-content black-text">
						No data was found for "{this.props.queryString}"
					</div>
				</div>
			);
		}

		const meds = this._renderMedicineResults();
		return (
			<div className="collection blue-grey black-text">
				<div className="collection-header"><h5>Results for '{this.props.queryString}':</h5></div>
				{meds}
			</div>
		)
	}
}