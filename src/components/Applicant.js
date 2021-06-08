import React, { useEffect, useState } from 'react'
import axios from 'axios'
import $ from 'jquery'

import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_green.css"

import Select from 'react-select'

const api = "https://nbi-webapi.azurewebsites.net";
const local = "https://nbi-newmvc.azurewebsites.net";

const Applicant = (data) => {
	
	const [isLoading, setLoading] = useState(true);
	const [applicantDetails, setApplicantDetails] = useState();

	const [iheight, setIHeight] = useState(0);
	const [iweight, setIWeight] = useState(0);

	useEffect(() => {
		axios.get(api + "/api/Applicant/" + data.match.params.id).then(response => {
			setApplicantDetails(response.data);
			setLoading(false);
			setIHeight(response.data.applicant.height);
			setIWeight(response.data.applicant.weight);
		});
	}, []);

	if(isLoading){
		return <div> Loading... </div>;
	}

	const applicant = applicantDetails.applicant;
	const application = applicantDetails.application;
	const relationship = applicantDetails.relationship;

	$('.card-title')[0].innerText = "Application Details";

	return (
		<div>
			<h2><b>Personal Information</b></h2>
			<hr/>

			<div className="row">
				<img src={"https://storagefornbiclearance.blob.core.windows.net/images/" + applicant.image} className="col-md-2 border rounded" alt="User"/>
			</div>

			<br/>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>First Name</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control ifname" placeholder="Enter First Name" value={applicant.fname} disabled />
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Middle Name</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control imname" placeholder="Enter Middle Name" value={applicant.mname} disabled />
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Last Name</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control ilname" placeholder="Enter Last Name" value={applicant.lname} disabled />
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Birthday</label>
					</div>
					<div className="col-md-10">
						<Flatpickr
							value={applicant.birthday}
							placeholder="Select Birthday"
							className="ibirthday"
							options={{
							    altInput: true,
							    altFormat: "F j, Y",
							    dateFormat: "Y-m-d",
							    onReady: () => {
							    	$('.ibirthday')[1].disabled = true;
							    }
							}}
						/>
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Gender</label>
					</div>
					<div className="col-md-10">
						<Select 
							options = {[
								{ value: 'Male', label: 'Male'},
								{ value: 'Female', label: 'Female'},
							]}
							placeholder = "Select Gender"
							defaultValue = {{ value: applicant.gender, label: applicant.gender }}
							isDisabled = 'true'
							className = 'igender'
						/>
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Civil Status</label>
					</div>
					<div className="col-md-10">
						<Select 
							options = {[
								{ value: 'Single', label: 'Single'},
								{ value: 'Married', label: 'Married'},
								{ value: 'Widow', label: 'Widow'},
								{ value: 'Legally Separated', label: 'Legally Separated'},
								{ value: 'Annulled', label: 'Annulled'},
							]}
							placeholder = "Select Civil Status"
							defaultValue = {{ value: applicant.civil_status, label: applicant.civil_status }}
							isDisabled = 'true'
							className = 'icivil_status'
						/>
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Highest Education</label>
					</div>
					<div className="col-md-10">
						<Select 
							options = {[
								{ value: 'Elementary', label: 'Elementary'},
								{ value: 'High School', label: 'High School'},
								{ value: 'College', label: 'College'},
							]}
							placeholder = "Select Highest Educational Attainment"
							defaultValue = {{ value: applicant.highest_education, label: applicant.highest_education }}
							isDisabled = 'true'
							className = 'ihighest_education'
						/>
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Landline Number</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control ilandline_number" placeholder="Enter Landline Number" value={applicant.landline_number} disabled />
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Mobile Number</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control imobile_number" placeholder="Enter Mobile Number" value={applicant.mobile_number} disabled />
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Email</label>
					</div>
					<div className="col-md-10">
						<input type="email" className="form-control iemail" placeholder="Enter Email" value={applicant.email} disabled />
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Complexion</label>
					</div>
					<div className="col-md-10">
						<Select 
							options = {[
								{ value: 'Light', label: 'Light'},
								{ value: 'Fair', label: 'Fair'},
								{ value: 'Medium', label: 'Medium'},
								{ value: 'Olive', label: 'Olive'},
								{ value: 'Tan', label: 'Tan'},
								{ value: 'Black', label: 'Black'},
							]}
							placeholder = "Select Complexion"
							defaultValue = {{ value: applicant.complexion, label: applicant.complexion }}
							isDisabled = 'true'
							className = 'icomplexion'
						/>
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Peculiarities</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control ipeculiarities" placeholder="Enter Peculiarities" value={applicant.peculiarities} disabled />
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Religion</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control ireligion" placeholder="Enter Religion" value={applicant.religion} disabled />
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Height (cm)</label>
					</div>
					<div className="col-md-1 d-flex align-items-center" style={{ justifyContent: 'center' }}>
						{iheight}
					</div>
					<div className="col-md-9">
						<input type="range" min="90" max="200" className="form-control iheight" placeholder="Enter Height" value={iheight} onChange={e => setIHeight(e.target.value)} disabled />
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Weight (kg)</label>
					</div>
					<div className="col-md-1 d-flex align-items-center" style={{ justifyContent: 'center' }}>
						{iweight}
					</div>
					<div className="col-md-9">
						<input type="range" min="40" max="150" className="form-control iweight" placeholder="Enter Weight" value={iweight} onChange={e => setIWeight(e.target.value)} disabled />
					</div>
				</div>
			</h5>

			<hr/>
			<h2><b>Relative Details</b></h2>
			<hr/>

			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Name of Spouse</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control iname" placeholder="Enter Name of Spouse" value={relationship.name} disabled />
					</div>
				</div>
			</h5>

			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Name of Father</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control iname_of_father" placeholder="Enter Name of Father" value={relationship.name_of_father} disabled />
					</div>
				</div>
			</h5>

			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Place of Birth</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control iplace_of_birth1" placeholder="Enter Place of Birth" value={relationship.place_of_birth1} disabled />
					</div>
				</div>
			</h5>

			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Name of Mother</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control iname_of_mother" placeholder="Enter Name of Mother" value={relationship.name_of_mother} disabled />
					</div>
				</div>
			</h5>

			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Place of Birth</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control iplace_of_birth2" placeholder="Enter Place of Birth" value={relationship.place_of_birth2} disabled />
					</div>
				</div>
			</h5>

			<hr/>
			<h2><b>Application Details</b></h2>
			<hr/>

			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Branch</label>
					</div>
					<div className="col-md-10">
						<Select 
							options = {[
								{ value: 'Manila', label: 'Manila'},
								{ value: 'Quezon City', label: 'Quezon City'},
								{ value: 'Alabang', label: 'Alabang'},
								{ value: 'Mandaluyong', label: 'Mandaluyong'},
								{ value: 'Las Pinas', label: 'Las Pinas'},
								{ value: 'Rizal', label: 'Rizal'},
							]}
							placeholder = "Select Branch"
							defaultValue = {{ value: application.branch, label: application.branch }}
							isDisabled = 'true'
							className = 'ibranch'
						/>
					</div>
				</div>
			</h5>

			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Date</label>
					</div>
					<div className="col-md-10">
						<Flatpickr
							value={application.date}
							className="idate"
							options={{
							    altInput: true,
							    altFormat: "F j, Y",
							    dateFormat: "Y-m-d",
							    onReady: () => {
							    	$('.idate')[1].disabled = true;
							    }
							}}
						/>
					</div>
				</div>
			</h5>

			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Valid ID Presented</label>
					</div>
					<div className="col-md-10">
						<Select 
							options = {[
								{ value: 'Passport', label: 'Passport'},
								{ value: 'Voters ID', label: 'Voters ID'},
								{ value: 'Drivers License', label: 'Drivers License'},
								{ value: 'PRC License', label: 'PRC License'},
								{ value: 'SSS ID', label: 'SSS ID'},
								{ value: 'GSIS UMID', label: 'GSIS UMID'},
								{ value: 'Postal ID', label: 'Postal ID'},
								{ value: 'School ID', label: 'School ID'},
								{ value: 'TIN ID', label: 'TIN ID'},
								{ value: 'Philhealth ID', label: 'Philhealth ID'},
								{ value: 'Birth Certificate', label: 'Birth Certificate'},
								{ value: 'Alien Cert of Registration', label: 'Alien Cert of Registration'},
								{ value: 'Senior Citizen', label: 'Senior Citizen'},
								{ value: 'Previous COpy of Clearance', label: 'Previous COpy of Clearance'},
							]}
							placeholder = "Select Gender"
							defaultValue = {{ value: application.valid_id, label: application.valid_id }}
							isDisabled = 'true'
							className = 'ivalid_id'
						/>
					</div>
				</div>
			</h5>

			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>ID Number</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control iid_number" placeholder="Enter Valid ID Presented" value={application.id_number} disabled />
					</div>
				</div>
			</h5>
		</div>
	);
}

export default Applicant