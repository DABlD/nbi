import React, { useState } from 'react'
import axios from 'axios'
import $ from 'jquery'

import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_green.css"

import Swal from 'sweetalert2'
import moment from 'moment'
import Select from 'react-select'

import { BlobServiceClient, BlobItem } from "@azure/storage-blob"

const api = "https://nbi-webapi.azurewebsites.net";
const local = "https://nbimvc.azurewebsites.net";

const Create = (data) => {

	const [iheight, setIHeight] = useState(90);
	const [iweight, setIWeight] = useState(40);

	const [gender, setGender] = useState("");
	const [civil_status, setCivilStatus] = useState("");
	const [highest_education, setHighestEducation] = useState("");
	const [complexion, setComplexion] = useState("");
	const [branch, setBranch] = useState("");
	const [valid_id, setValidID] = useState("");

	const [birthday, setBirthday] = useState("");
	const [date, setDate] = useState("");

	let file;

	$('.card-title')[0].innerText = "Add Applicant";

	function changeImage(img){
		const account = "storagefornbiclearance";
		const sas = "?sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2021-06-30T00:58:26Z&st=2021-06-07T16:58:26Z&sip=0.0.0.0-255.255.255.255&spr=https,http&sig=sIZKJ3tVwRyS9GT3yfnghJ47wrRM%2FdTgKZcL%2BZRRUs0%3D";

		const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net${sas}`);

		var containerClient = blobServiceClient.getContainerClient("images");

		file = moment().format() + ".png";
		const blockBlobClient = containerClient.getBlockBlobClient(file);
  		const uploadBlobResponse = blockBlobClient.upload(img, 1);

  		var reader = new FileReader();

        reader.onload = function (e) {
            $('.dImage').attr('src', e.target.result);
        }

        reader.readAsDataURL(img);
	}

	function submit(){
		Swal.fire({
			icon: 'question',
			title: 'Confirmation',
			text: 'Are you sure all details are complete and correct?',
			showCancelButton: true,
			cancelButtonColor: '#f76c6b',
		}).then(result => {
			if(result.isConfirmed){
				Swal.showLoading();

				let applicant = {};
				let application = {};
				let relationship = {};

				applicant.fname = $('.ifname')[0].value; 
				applicant.mname = $('.imname')[0].value; 
				applicant.lname = $('.ilname')[0].value; 
				applicant.birthday = birthday; 
				applicant.gender = gender; 
				applicant.civil_status = civil_status; 
				applicant.highest_education = highest_education; 
				applicant.landline_number = $('.ilandline_number')[0].value; 
				applicant.mobile_number = $('.imobile_number')[0].value; 
				applicant.email = $('.iemail')[0].value; 
				applicant.complexion = complexion; 
				applicant.peculiarities = $('.ipeculiarities')[0].value; 
				applicant.religion = $('.ireligion')[0].value; 
				applicant.height = $('.iheight')[0].value; 
				applicant.weight = $('.iweight')[0].value;
				applicant.image = file;

                relationship.name = $('.iname')[0].value; 
                relationship.name_of_father = $('.iname_of_father')[0].value; 
                relationship.place_of_birth1 = $('.iplace_of_birth1')[0].value; 
                relationship.name_of_mother = $('.iname_of_mother')[0].value; 
                relationship.place_of_birth2 = $('.iplace_of_birth2')[0].value; 

                application.branch = branch; 
                application.date = date; 
                application.valid_id = valid_id; 
                application.id_number = $('.iid_number')[0].value; 

                axios.post(api + "/api/Applicant/Create", {applicant, relationship, application}
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

	return (
		<div>
			<h2><b>Personal Information</b></h2>
			<hr/>

			<div className="row">
				<img src="https://storagefornbiclearance.blob.core.windows.net/images/User.png" className="col-md-2 border rounded dImage" alt="User"/>
			</div>
			<div className="row">
				<div className="col-md-2">
					<input type="file" className="form-control iimg" onChange={e => changeImage(e.target.files[0])} />
				</div>
			</div>

			<br/>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>First Name</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control ifname" placeholder="Enter First Name"/>
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Middle Name</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control imname" placeholder="Enter Middle Name"/>
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Last Name</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control ilname" placeholder="Enter Last Name"/>
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
							className="ibirthday"
							placeholder="Select Birthday"
							options={{
							    altInput: true,
							    altFormat: "F j, Y",
							    dateFormat: "Y-m-d",
							}}
							onChange={e => setBirthday(moment(e[0]).format('YYYY-MM-DD'))}
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
							className = 'igender'
							onChange = {e => setGender(e.value)}
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
							className = 'icivil_status'
							onChange = {e => setCivilStatus(e.value)}
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
							className = 'ihighest_education'
							onChange = {e => setHighestEducation(e.value)}
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
						<input type="text" className="form-control ilandline_number" placeholder="Enter Landline Number" />
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Mobile Number</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control imobile_number" placeholder="Enter Mobile Number" />
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Email</label>
					</div>
					<div className="col-md-10">
						<input type="email" className="form-control iemail" placeholder="Enter Email" />
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
							className = 'icomplexion'
							onChange = {e => setComplexion(e.value)}
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
						<input type="text" className="form-control ipeculiarities" placeholder="Enter Peculiarities" />
					</div>
				</div>
			</h5>
			
			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Religion</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control ireligion" placeholder="Enter Religion" />
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
						<input type="range" min="90" max="200" step=".1" className="form-control iheight" placeholder="Enter Height" value={iheight} onChange={e => setIHeight(e.target.value)} />
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
						<input type="range" min="40" max="150" step=".1" className="form-control iweight" placeholder="Enter Weight" value={iweight} onChange={e => setIWeight(e.target.value)} />
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
						<input type="text" className="form-control iname" placeholder="Enter Name of Spouse" />
					</div>
				</div>
			</h5>

			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Name of Father</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control iname_of_father" placeholder="Enter Name of Father" />
					</div>
				</div>
			</h5>

			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Place of Birth</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control iplace_of_birth1" placeholder="Enter Place of Birth" />
					</div>
				</div>
			</h5>

			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Name of Mother</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control iname_of_mother" placeholder="Enter Name of Mother" />
					</div>
				</div>
			</h5>

			<h5>
				<div className="row">
					<div className="col-md-2">
						<label>Place of Birth</label>
					</div>
					<div className="col-md-10">
						<input type="text" className="form-control iplace_of_birth2" placeholder="Enter Place of Birth" />
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
							className = 'ibranch'
							onChange = {e => setBranch(e.value)}
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
							className="idate"
							placeholder="Select Date"
							options={{
							    altInput: true,
							    altFormat: "F j, Y",
							    dateFormat: "Y-m-d",
							}}
							onChange={e => setDate(moment(e[0]).format('YYYY-MM-DD'))}
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
							placeholder = "Select Valid ID"
							className = 'ivalid_id'
							onChange = {e => setValidID(e.value)}
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
						<input type="text" className="form-control iid_number" placeholder="Enter ID Number" />
					</div>
				</div>
			</h5>

			<hr/>
			<button className="btn btn-success" onClick={submit}>Submit</button>
		</div>
	);
}

export default Create