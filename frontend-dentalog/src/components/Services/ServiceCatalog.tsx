import React, { useState } from 'react';
import { Stethoscope, Clock, DollarSign, Users, Plus, Search } from 'lucide-react';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { mockServices } from '../../data/mockData';
import './ServiceCatalog.css';

export const ServiceCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Todos los Servicios', count: mockServices.length },
    { id: 'preventive', name: 'Preventivos', count: mockServices.filter(s => s.category === 'preventive').length },
    { id: 'restorative', name: 'Restaurativos', count: mockServices.filter(s => s.category === 'restorative').length },
    { id: 'orthodontic', name: 'Ortodónticos', count: mockServices.filter(s => s.category === 'orthodontic').length },
    { id: 'surgical', name: 'Quirúrgicos', count: mockServices.filter(s => s.category === 'surgical').length },
  ];

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'preventive': return 'category-preventive';
      case 'restorative': return 'category-restorative';
      case 'orthodontic': return 'category-orthodontic';
      case 'surgical': return 'category-surgical';
      default: return 'category-default';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'preventive': return 'Preventivo';
      case 'restorative': return 'Restaurativo';
      case 'orthodontic': return 'Ortodóntico';
      case 'surgical': return 'Quirúrgico';
      default: return category;
    }
  };

  return (
    <div className="service-catalog">
      <div className="header-container">
        <div>
          <h2 className="header-title">Catálogo de Servicios</h2>
          <p className="header-description">Servicios odontológicos especializados para niños</p>
        </div>
        <Button icon={Plus}>
          Nuevo Servicio
        </Button>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="search-input-container">
          <Input
            placeholder="Buscar servicios..."
            value={searchTerm}
            onChange={setSearchTerm}
            icon={Search}
          />
        </div>
        <div className="categories-container">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`category-button ${selectedCategory === category.id ? 'category-button-active' : ''}`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {filteredServices.map((service) => (
          <Card key={service.id} hover className="service-card">
            <div className="card-content">
              <div className="card-header">
                <div className="icon-container">
                  <Stethoscope className="icon" />
                </div>
                <span className={`category-tag ${getCategoryColor(service.category)}`}>
                  {getCategoryName(service.category)}
                </span>
              </div>

              <div className="card-body">
                <h3 className="service-title">{service.name}</h3>
                <p className="service-description">{service.description}</p>

                <div className="service-details">
                  <div className="detail-item">
                    <Clock className="detail-icon" />
                    <span>{service.duration} minutos</span>
                  </div>
                  <div className="detail-item">
                    <Users className="detail-icon" />
                    <span>{service.ageRange}</span>
                  </div>
                  <div className="detail-item">
                    <DollarSign className="detail-icon price-icon" />
                    <span className="price">{service.price}</span>
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <div className="button-group">
                  <Button variant="outline" className="action-button">
                    Editar
                  </Button>
                  <Button className="action-button">
                    Programar Cita
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card className="empty-state">
          <div className="empty-state-content">
            <Stethoscope className="empty-state-icon" />
            <p className="empty-state-text">No se encontraron servicios</p>
            <p className="empty-state-subtext">
              {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay servicios en esta categoría'}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};