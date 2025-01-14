import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

function SignIn({setAuthenticated}) {
    const [formData, setFormData] = useState({
        student_id: '', 
        email: '', 
    });

    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { id, value } = e.target; 
        setFormData(prevState => ({
            ...prevState, 
            [id]: value
        })); 
    }; 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        try {
            const { student_id, email } = formData; 
            const response = await fetch(`http://localhost:5000/students?student_id=${student_id}&email=${email}`, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json'
                }, 
            }); 
            if (!response.ok) {
                console.log("Network error occurred!");
            } else {
                const data = await response.json(); 
                if (data.length > 0) {
                    console.log('Student data retrieved successfully: ', data);
                    setAuthenticated(true); 
                    navigate('/home');
                } else {
                    console.log('Student ID or Email not found'); 
                }
            }
        } catch (error) {
            console.error('Error fetching student:', error); 
        }
    };

    return (
        <section>
            <div className="container-fluid">
                <h1 align="center">Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="student_id">Student ID</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="student_id" 
                            placeholder="Enter Student ID" 
                            value={formData.student_id} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="Enter email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required
                        />
                    </div>
                    
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </section>
    );
}

export default SignIn;
