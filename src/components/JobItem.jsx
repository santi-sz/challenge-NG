import { useState } from 'react';
import './JobItem.css';

function JobItem({ job, candidate }) {
  const [repoUrl, setRepoUrl] = useState('');

  return (
    <div className="job-item job-card">
      <h3>{job.title}</h3>
      <div className="job-item-form">
        <input
          type="url"
          placeholder="Ingresá el link de tu repositorio"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
        <button disabled={!repoUrl.trim()}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default JobItem;
