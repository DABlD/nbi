import React, { useEffect, useState } from 'react'
import axios from 'axios'
import $ from 'jquery'
import 'datatables.net-bs4'
import 'datatables.net-responsive-bs4'

import Moment from 'react-moment'

import Swal from 'sweetalert2'

const api = "https://nbi-webapi.azurewebsites.net";
const local = "https://nbimvc.azurewebsites.net";

const Index = () => {
	
	const [isLoading, setLoading] = useState(true);
	const [applicants, setApplicants] = useState();

	useEffect(() => {
		axios.get(api + "/api/applicant").then(response => {
			setApplicants(response.data);
			setLoading(false);
		});

		callDatatable();
	}, []);

	function recallData(){
		$('#table').DataTable().destroy();
		setLoading();
		axios.get(URL + "/api/applicant").then(response => {
			setApplicants(response.data);
			setLoading(false);
		});

		callDatatable();
	}

	if(isLoading){
		return <div> Loading... </div>;
	}

	return (
		<div>
			<table id="table" className="table table-bordered table-striped">
			  <thead>
			  <tr>
			    <th>Name</th>
			    <th>Email</th>
			    <th>Number</th>
			    <th>Birthday</th>
			    <th>Gender</th>
			    <th>Civil Status</th>
			    <th>Religion</th>
			    <th>Height</th>
			    <th>Weight</th>
			    <th>Actions</th>
			  </tr>
			  </thead>
			  <tbody>
			  	{applicants.map((applicant, index) => (
			  		<tr key={index}>
			  			<td>{applicant.lname + ", " + applicant.fname}</td>
			  			<td>{applicant.email}</td>
			  			<td>{applicant.mobile_number}</td>
			  			<td>
			  				<Moment format="MMM DD, Y">
  				                {applicant.birthday}
  				            </Moment>
			  			</td>
			  			<td>{applicant.gender}</td>
			  			<td>{applicant.civil_status}</td>
			  			<td>{applicant.religion}</td>
			  			<td>{applicant.height} cm</td>
			  			<td>{applicant.weight} kg</td>
			  			<td>
			  				<span className="btn btn-success" data-toggle="tooltip" title="View Applicant" onClick={view(applicant.id)}>
						        <span className="fas fa-search"></span>
						    </span>
						    &nbsp;
			  				<span className="btn btn-info" data-toggle="tooltip" title="Edit Applicant" onClick={edit(applicant.id)}>
						        <span className="fas fa-edit"></span>
						    </span>
						    &nbsp;
			  				<span className="btn btn-danger" data-toggle="tooltip" title="Delete Applicant" onClick={deleteA(applicant.id)}>
						        <span className="fa fa-trash"></span>
						    </span>
			  			</td>
			  		</tr>
			  	))}
			  </tbody>
			</table>
		</div>
	);
}

function callDatatable(){
	setTimeout(() => {
		if($('#table').is(':visible')){
			$('#table').DataTable({
			  "paging": true,
			  "lengthChange": false,
			  "searching": false,
			  "ordering": true,
			  "info": true,
			  "autoWidth": false,
			  "responsive": true,
			})
		}
		else{
			callDatatable();
		}
	}, 500);
}

function view(id){
	return () => {
		window.location.href = local + "/applicant/" + id;
	}
}

function edit(id){
	return () => {
		window.location.href = local + "/edit/" + id;
	}
}

function deleteA(id){
	return () => {
		Swal.fire({
			icon: 'warning',
			title: 'Confirm Deletion',
			showCancelButton: true,
			cancelButtonColor: '#f76c6b',
		}).then(result => {
			if(result.isConfirmed){
				axios.delete(api + "/api/Applicant/" + id,
				)
					.then(function (response) {
					console.log(response);
					window.location.href = local;
				})
					.catch(function (error) {
					console.log(error);
				});
			}
		})
	}
}

export default Index