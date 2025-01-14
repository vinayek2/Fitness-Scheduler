import React, {useState} from 'react';

import {useNavigate} from 'react-router-dom'; 

function SignUp() {
    const [formData, setFormData] = useState({
        firstName: '', 
        lastName: '',
        dob: '',
        phone: '', 
        email: '', 
        address: '',
        program_id: '',
    });

    const navigate = useNavigate();
    
    const handleChange = (e) => {

        const {id, value} = e.target; 
        setFormData(prevState => ({
            ...prevState, 
            [id]: value
        })); 
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        try {

            //const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
            const response = await fetch(`http://localhost:5000/addStudent`, {

                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    first_name: formData.firstName, 
                    last_name: formData.lastName,
                    dob: formData.dob,
                    phone: formData.phone, 
                    email: formData.email, 
                    address: formData.address,
                    program_id: formData.program_id, 
                    enrollment_date: new Date().toISOString().split('T')[0]
                })

            }); 
            if(!response.ok){
                console.log("Network error occured!");
            } else{
                const result = await response.json();
                console.log('Student added successfully with ID: ', result.student_id);
                navigate('/home'); 
            }
        } catch (error) {
            console.error('Error adding student:', error); 
        }
    }
    return (
        <section>
            <div className="container-fluid">
                <h1 align="center">Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" id="firstName" placeholder="Enter First Name" value={formData.firstName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Enter Last Name" value={formData.lastName} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input type="text" className="form-control" id="dob" placeholder="Enter DOB" value={formData.dob} onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="number" className="form-control" id="phone" placeholder="Enter Phone Number" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="program_id">Program ID</label>
                        <input type="text" className="form-control" id="program_id" placeholder="Enter program id" value={formData.program_id} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Location Address</label>
                        <input type="text" className="form-control" id="address" placeholder="Enter Location" value={formData.address} onChange={handleChange} />
                    </div>

                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </section>
    );
}

export default SignUp;
