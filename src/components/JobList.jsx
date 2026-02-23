import { useState, useEffect } from 'react';
import { getJobsList } from '../services/api';
import JobItem from './JobItem';
import './JobList.css';

function JobList({ candidate }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobsList();
        setJobs(data);
      } catch (err) {
        setError(err.message || 'No se pudieron cargar las posiciones.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div className="card"><p className="loading-text">Cargando posiciones...</p></div>;
  }

  if (error) {
    return <div className="card"><p className="error-message">{error}</p></div>;
  }

  if (jobs.length === 0) {
    return <div className="card"><p>No hay posiciones disponibles en este momento.</p></div>;
  }

  return (
    <div className="job-list">
      <h2>Posiciones disponibles</h2>
      <div className="job-items">
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} candidate={candidate} />
        ))}
      </div>
    </div>
  );
}

export default JobList;
