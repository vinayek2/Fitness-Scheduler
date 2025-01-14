ALTER TABLE students.student_courses; 
ALTER TABLE students.student_courses

	ADD PRIMARY KEY (student_courses_id); 
    
ALTER TABLE students.student_courses
    ADD CONSTRAINT fk_student
        FOREIGN KEY (student_id) REFERENCES students(student_id);

ALTER TABLE students.student_courses
    ADD CONSTRAINT fk_course
        FOREIGN KEY (course_id) REFERENCES courses(course_id);
