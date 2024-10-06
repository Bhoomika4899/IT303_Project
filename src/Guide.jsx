import React, { useState, useEffect } from 'react';
import './styles.css';

const Guide = () => {
  const [students, setStudents] = useState([
    { name: 'John', registerNumber: '011', projectType: 'MAJOR', status: 'Inomplete' },
    { name: 'Jane', registerNumber: '012', projectType: 'MINOR', status: 'Incomplete' },
    { name: 'Ria D', registerNumber: '013', projectType: 'MAJOR', status: 'Inomplete' },
    { name: 'Brown', registerNumber: '044', projectType: 'MAJOR', status: 'Inomplete' },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [marks, setMarks] = useState({
    midSem: {
      depth: '',
      workDone: '',
      exceptionalWork: '',
      viva: '',
      presentation: '',
      report: '',
      attendance: '',
    },
    endSem: {
      depth: '',
      workDone: '',
      exceptionalWork: '',
      viva: '',
      presentation: '',
      report: '',
      attendance: '',
    },
  });

  const fieldDisplayNames = {
    depth: 'Depth of Understanding',
    workDone: 'Work done and Results',
    exceptionalWork: 'Exceptional Work',
    viva: 'Viva-Voce',
    presentation: 'Presentation',
    report: 'Report',
    attendance: 'Attendance',
  };
  
  useEffect(() => {
    // Load stored students data, including status
    const storedStudents = localStorage.getItem('studentsData');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  useEffect(() => {
    if (currentStudent) {
      // Fetch stored mid-sem and end-sem marks for the current student from localStorage
      const savedMidSemMarks = localStorage.getItem(`guide_${currentStudent.registerNumber}_midSem`);
      const savedEndSemMarks = localStorage.getItem(`guide_${currentStudent.registerNumber}_endSem`);

      if (savedMidSemMarks) {
        setMarks((prev) => ({
          ...prev,
          midSem: JSON.parse(savedMidSemMarks),
        }));
      }

      if (savedEndSemMarks) {
        setMarks((prev) => ({
          ...prev,
          endSem: JSON.parse(savedEndSemMarks),
        }));
      }
    }
  }, [currentStudent]);

  const openModal = (student, type) => {
    if (student.status === 'Complete') {
      setCurrentStudent(student);
      setModalOpen(type); // Store which type of marks are being entered
    } else {
      alert('Evaluation not completed. You cannot enter marks.');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentStudent(null);
  };

  const handleMarksChange = (e) => {
    const { name, value } = e.target;
    setMarks((prevMarks) => ({
      ...prevMarks,
      [modalOpen]: {
        ...prevMarks[modalOpen],
        [name]: value,
      },
    }));
  };
  
  const handleDateTimeChange = (e, student) => {
    const updatedStudents = students.map((s) =>
      s.registerNumber === student.registerNumber ? { ...s, evaluationDateTime: e.target.value } : s
    );
    setStudents(updatedStudents);
    localStorage.setItem('studentsData', JSON.stringify(updatedStudents));
  };

  const submitMarks = () => {
    const currentMarks = marks[modalOpen];

    if (Object.values(currentMarks).some((mark) => mark === '')) {
      alert('Please fill in all fields.');
      return;
    }

    // Validate each field
    const depth = parseInt(currentMarks.depth);
    const workDone = parseInt(currentMarks.workDone);
    const exceptionalWork = parseInt(currentMarks.exceptionalWork);
    const viva = parseInt(currentMarks.viva);
    const presentation = parseInt(currentMarks.presentation);
    const report = parseInt(currentMarks.report);
    const attendance = parseInt(currentMarks.attendance);

    if (depth < 0 || workDone < 0 || exceptionalWork < 0 || viva < 0 || presentation < 0 || report < 0 || attendance < 0) {
      alert('Marks cannot be negative.');
      return;
    }
    if (depth > 12) {
      alert('Maximum marks for "Depth of Understanding" is 12.');
      return;
    }
    if (workDone > 18) {
      alert('Maximum marks for "Work done and Results" is 18.');
      return;
    }
    if (exceptionalWork > 6) {
      alert('Maximum marks for "Exceptional Work" is 6.');
      return;
    }
    if (viva > 12) {
      alert('Maximum marks for "Viva-Voce" is 12.');
      return;
    }
    if (presentation > 6) {
      alert('Maximum marks for "Presentation" is 6.');
      return;
    }
    if (report > 3) {
      alert('Maximum marks for "Report" is 3.');
      return;
    }
    if (attendance > 3) {
      alert('Maximum marks for "Attendance" is 3.');
      return;
    }

    const totalMarksMidSem = depth + workDone + exceptionalWork + viva + presentation + report + attendance;
    if (totalMarksMidSem > 60) {
      alert('Total mid-sem marks cannot exceed 60. Please adjust the marks.');
      return;
    }

    if (currentStudent) {
      localStorage.setItem(`guide_${currentStudent.registerNumber}_${modalOpen}`, JSON.stringify(currentMarks));
      alert('Marks have been successfully submitted!');
      closeModal();
    }
  };

  // Function to calculate total marks for each student
  const calculateTotalMarks = (student) => {
    const midSemMarks = JSON.parse(localStorage.getItem(`guide_${student.registerNumber}_midSem`)) || {};
    const endSemMarks = JSON.parse(localStorage.getItem(`guide_${student.registerNumber}_endSem`)) || {};

    const totalMidSem = Object.values(midSemMarks).reduce((sum, mark) => sum + (parseInt(mark) || 0), 0);
    const totalEndSem = Object.values(endSemMarks).reduce((sum, mark) => sum + (parseInt(mark) || 0), 0);
    
    return totalMidSem + totalEndSem;
  };
  
  // Function to change the evaluation status of a student to "Complete"
  const toggleEvaluationStatus = (student) => {
  // Check if the current status is 'Incomplete'
  if (student.status === 'Incomplete') {
    const updatedStudents = students.map((s) =>
      s.registerNumber === student.registerNumber ? { ...s, status: 'Complete' } : s
    );
    setStudents(updatedStudents);
    localStorage.setItem('studentsData', JSON.stringify(updatedStudents));
  } else {
    //alert('Status cannot be changed back to Incomplete once it is set to Complete.');
    const updatedStudents = students.map((s) =>
      s.registerNumber === student.registerNumber ? { ...s, status: 'Incomplete' } : s
    );
    setStudents(updatedStudents);
    localStorage.setItem('studentsData', JSON.stringify(updatedStudents));

  }
};


  return (
    <div className="examiner-container">
      {/* Header */}
      <div className="header">
        GUIDE MODE
      </div>

      {/* Image Section */}
      <div className="image-container">
        <img src="guidesc.png" alt="Guide Screenshot" />
      </div>

      {/* Student List Title */}
      <h1 className="student-list-title">STUDENT LIST</h1>

      {/* Student Table */}
      <div className="table-container">
        <table id="studentsTable">
          <thead>
            <tr>
              <th>STUDENT NAME</th>
              <th>REGISTER NUMBER</th>
              <th>PROJECT TYPE</th>
              <th>EVALUATION STATUS</th>
              <th>ENTER MID-SEM MARKS</th>
              <th>ENTER END-SEM MARKS</th>
              <th>TOTAL MARKS</th> 
              <th>EVALUATION DATE & TIME</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student.registerNumber} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                <td>{student.name}</td>
                <td>{student.registerNumber}</td>
                <td>{student.projectType}</td>
                <td
                  className={student.status === 'Complete' ? 'status-complete' : 'status-incomplete'}
                  onClick={() => toggleEvaluationStatus(student)} // Toggle status on click
                  style={{ cursor: 'pointer' }}
                >
                  {student.status}
                </td>
                <td>
                  <button onClick={() => openModal(student, 'midSem')} 
                    className={localStorage.getItem(`guide_${student.registerNumber}_midSem`) ? 'button-edit' : ''}>
                    {localStorage.getItem(`guide_${student.registerNumber}_midSem`) ? 'Edit Marks' : 'Enter Marks'}
                  </button>
                </td>
                <td>
                  <button onClick={() => openModal(student, 'endSem')} 
                    className={localStorage.getItem(`guide_${student.registerNumber}_endSem`) ? 'button-edit' : ''}>
                    {localStorage.getItem(`guide_${student.registerNumber}_endSem`) ? 'Edit Marks' : 'Enter Marks'}
                  </button>
                </td>
                <td>{calculateTotalMarks(student)}</td> {/* Display total marks here */}
                <td>
                  <input
                    type="datetime-local"
                    value={student.evaluationDateTime}
                    onChange={(e) => handleDateTimeChange(e, student)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Submit All Marks Button */}
      <div className="submit-button-container">
        <button onClick={() => alert('Marks updated successfully.')}>
          Submit All Marks
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="enter-marks">Enter {modalOpen === 'midSem' ? 'Mid-Sem' : 'End-Sem'} Marks for {currentStudent?.name}</h2>
            <div className="modal-form">
              {Object.keys(marks[modalOpen]).map((field) => (
                <div key={field} className="modal-field">
                  <label className="modal-label">{fieldDisplayNames[field]}</label>
                  <input
                    type="number"
                    name={field}
                    value={marks[modalOpen][field]}
                    onChange={handleMarksChange}
                    className="modal-input"
                  />
                </div>
              ))}
            </div>
            <button onClick={submitMarks} className="submit-modal-button">Submit Marks</button>
            <button onClick={closeModal} className="close-modal-button">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guide;
