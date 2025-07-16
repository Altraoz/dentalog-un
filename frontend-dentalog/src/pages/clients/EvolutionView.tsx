import { useState, useEffect } from 'react';
import { getPatientsByResponsible } from '../../api/patients';
import { getEvolutionsByPatient } from '../../api/evolutions';
import { Modal } from '../../components/ui/Modal';
import './EvolutionView.css';
import { useAuth } from '../../contexts/AuthContext';

const EvolutionView = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [evolutions, setEvolutions] = useState([]);
  const [fullImage, setFullImage] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchPatients = async () => {
      const res = await getPatientsByResponsible(user.token);
      if (res?.status === 200) {
        const results = res.data.results;
        setPatients(results);
        if (results.length === 1) {
          setSelectedPatientId(results[0].id);
        }
      }
    };
    fetchPatients();
  }, [user]);

  useEffect(() => {
    if (!selectedPatientId) return;
    const fetchEvolutions = async () => {
      const res = await getEvolutionsByPatient(user.token, selectedPatientId);
      if (res?.status === 200) {
        setEvolutions(res.data);
      }
    };
    fetchEvolutions();
  }, [selectedPatientId]);

  console.log(evolutions);

    return (
      <div className="evolutions-container">
        <div className="evolutions-header">
          <h1 className="evolutions-title">Evoluciones de:</h1>
          {patients.length > 1 ? (
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="patient-select"
            >
              <option value="">Seleccionar paciente</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.first_name} {p.last_name}
                </option>
              ))}
            </select>
          ) : (
            <span className="patient-name">{patients[0]?.first_name} {patients[0]?.last_name}</span>
          )}
        </div>

        {!selectedPatientId ? (
          <p className="waiting-msg">Esperando a que se seleccione un paciente</p>
        ) : evolutions.length === 0 ? (
          <p className="waiting-msg">Aún no se han añadido evoluciones a su historia</p>
        ) : (
          <div className="timeline">
            <div className="timeline-line" />
            {evolutions.map((ev, idx) => (
              <div key={idx} className="evolution-block">
                <div className="timeline-marker-wrapper">
                  <div className="timeline-marker" />
                </div>
                <div className="evolution-content">
                  <h3 className="evolution-title">{ev.title}</h3>
                  <p className="evolution-date">{new Date(ev.date).toLocaleDateString()}</p>
                  <div className="images-wrapper">
                    {ev.images.map((imgUrl, i) => (
                      <img
                        key={i}
                        src={imgUrl}
                        alt={`Evolución ${i + 1}`}
                        className="evolution-image"
                        onClick={() => setFullImage(imgUrl)}
                      />
                    ))}
                  </div>
                  <p className="evolution-note">
                    <i>Observación:</i> {ev.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {fullImage && (
          <Modal title="" isOpen={!!fullImage} onClose={() => setFullImage(null)}>
            <img src={fullImage} alt="Imagen completa" className="full-image" />
          </Modal>
        )}
      </div>
    );
  };

export default EvolutionView;