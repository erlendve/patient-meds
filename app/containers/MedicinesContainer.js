import React, { PropTypes, Component } from 'react'

import SearchForm from '../components/SearchForm';
import ShowResult from '../components/ShowResult';


export default class MedicinesContainer extends Component {
	constructor() {
		super();
		this.state = {
			searchMedicine: []
		};
	}

	_onAddMedicine(data) {
		this.props.addMedicine(data);
	}

	_getSearchResults() {
		return (this.state.searchMedicine.map((s) => {
			return (<ShowResult queryString={s} key={s} onAddMedicine={this._onAddMedicine.bind(this)}/>);
		}));
	}

	_fdaSearch(queryString) {
		let qs = [queryString]
		this.setState({
			searchMedicine: qs.concat(this.state.searchMedicine)
		})
	}

	render() {
		let results = this._getSearchResults();
		return(
			<div>
				<SearchForm onSubmit={this._fdaSearch.bind(this)}/>
				{results}
			</div>
		);
	}
}