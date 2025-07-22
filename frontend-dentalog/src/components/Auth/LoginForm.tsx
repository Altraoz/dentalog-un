import React, { useState } from 'react';
import { Mail, Lock} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import icon from '../../public/logo.png';
import './LoginForm.css';
 
export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Credenciales inválidas.');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <img src={icon} alt="Logo" className="icon" />
          </div>
          <h1 className="login-title">Zafari Dental</h1>
          <p className="login-subtitle">Dentalog Clínica Odontopediátrica</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={setEmail}
            icon={Mail}
            required

          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={setPassword}
            icon={Lock}
            required
          />

          {error && (
            <div className="login-error">
              <p>{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="login-button"
            size="lg"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        {/* <div className="login-hint">
          <p><strong>Credenciales de prueba:</strong></p>
          <p>Email: admin@dentalog.com</p>
          <p>Contraseña: admin123</p>
        </div> */}
      </div>
    </div>
  );
};