// Tw.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Tw = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
                    <p className="text-xl font-semibold mb-4">Faculty Name: Mr AmritPal</p>
                    <p className="text-lg mb-6">Choose a role:</p>
                    <div className="flex justify-center gap-4">
                        <Link to="/guide" className="w-full">
                            <button className="text-white px-4 py-2 rounded w-full bg-indigo-500 hover:bg-indigo-600">Guide</button>
                        </Link>
                        <Link to="/examiner" className="w-full">
                            <button className="text-white px-4 py-2 rounded w-full bg-indigo-500 hover:bg-indigo-600">Examiner</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tw;

