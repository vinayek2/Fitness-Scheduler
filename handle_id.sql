ALTER TABLE students.students AUTO_INCREMENT = 1000;

ALTER TABLE students.students
  MODIFY COLUMN student_id INT NOT NULL AUTO_INCREMENT,
  ADD PRIMARY KEY (student_id);
DESC students.students;