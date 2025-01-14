import React from 'react'; 

function Home(){


    const token = 'your_jwt_token'; 

    fetch('/fetchClass', {
        method: 'GET', 
        header: {
            'Authorization': `Bearer ${token}`
        }
    })
     .then(response =>response.json())
     .then(data => console.log(data))
     .catch(error => console.error('Error fetching data:', error));

    return(
        <section>
            <div className='container-fluid'>
                <h1 align="center"> Build Your Schedule </h1>
            </div>

        </section>
    );  
}

export default Home; 


/*
import React, { useState, useEffect } from 'react';

function Home() {
    const [courses, setCourses] = useState([]);
    const token = 'your_jwt_token'; 

    useEffect(() => {
        fetch('/fetchClass', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => setCourses(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <section>
            <div className='container-fluid'>
                <h1 align="center">Build Your Schedule</h1>
                <table align="center" border="1">
                    <thead>
                        <tr>
                            <th>Course ID</th>
                            <th>Semester ID</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map(course => (
                            <tr key={course.id}>
                                <td>{course.course_id}</td>
                                <td>{course.semester_id}</td>
                                <td>{course.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Home;


*/