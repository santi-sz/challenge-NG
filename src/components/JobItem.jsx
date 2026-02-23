import { useState } from 'react';
import { applyToJob } from '../services/api';
import './JobItem.css';

function JobItem({ job, candidate }) {
  const [repoUrl, setRepoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const hasRepoUrl = repoUrl.trim().length > 0;

  const handleSubmit = async () => {
    if (!candidate || !hasRepoUrl || isSubmitting) return;

    setSubmitError(null);
    setSubmitSuccess(false);
    setIsSubmitting(true);

    try {
      await applyToJob({
        uuid: candidate.uuid,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        jobId: job.id,
        repoUrl: repoUrl.trim(),
      });

      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(
        error.message || 'No se pudo enviar la postulación. Intentalo de nuevo más tarde.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="job-item job-card">
      <h3>{job.title}</h3>
      <div className="job-item-form">
        <input
          type="url"
          placeholder="Ingresá el link de tu repositorio"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          disabled={isSubmitting}
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!hasRepoUrl || isSubmitting}
        >
          {submitSuccess ? 'Enviado' : isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </div>

      {submitSuccess && !submitError && (
        <p className="success-message">Postulación enviada correctamente.</p>
      )}

      {submitError && (
        <p className="error-message">{submitError}</p>
      )}
    </div>
  );
}

export default JobItem;
