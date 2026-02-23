import { useState } from 'react';
import { getCandidateByEmail } from '../services/api';
import './CandidateForm.css';

function CandidateForm({ onCandidateLoaded }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Por favor, ingresá tu email.');
      return;
    }

    setLoading(true);
    try {
      const candidate = await getCandidateByEmail(trimmedEmail);
      onCandidateLoaded(candidate);
    } catch (err) {
      setError(err.message || 'No se pudo obtener los datos del candidato.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Ingresá tu email</h2>
      <p className="card-description">Para obtener tus datos de candidato.</p>
      <form onSubmit={handleSubmit} className="email-form">
        <input
          type="email"
          placeholder="tu-email@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default CandidateForm;
