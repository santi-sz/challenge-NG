import { useState } from 'react';
import CandidateForm from './components/CandidateForm';
import JobList from './components/JobList';
import './App.css';

function App() {
  const [candidate, setCandidate] = useState(null);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Challenge NG</h1>
        <p>Portal de postulaciones</p>
      </header>

      {!candidate ? (
        <CandidateForm onCandidateLoaded={setCandidate} />
      ) : (
        <>
          <div className="candidate-info card">
            <p>
              Bienvenido/a, <strong>{candidate.firstName} {candidate.lastName}</strong>
            </p>
          </div>
          <JobList candidate={candidate} />
        </>
      )}
    </div>
  );
}

export default App;
