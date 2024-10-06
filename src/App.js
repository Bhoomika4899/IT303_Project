import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Tw from './Tw';
import Guide from './Guide';
import Examiner from './Examiner';
import Student from './Student';
import Student2 from './Student2';
import StudentStatus from './StudentStatus';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tw />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/examiner" element={<Examiner />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student2" element={<Student2 />} />
        <Route path="/studentstatus" element={<StudentStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
