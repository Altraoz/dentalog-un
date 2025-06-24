import React from 'react';
import { Users, Calendar, TrendingUp, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import './DashboardStats.css';

export const DashboardStats: React.FC = () => {
  type StatColor = keyof typeof colorClasses;

  const stats: {
    title: string;
    value: string;
    change: string;
    changeType: 'positive' | 'negative' | 'neutral';
    icon: React.ElementType;
    color: StatColor;
  }[] = [
    {
      title: 'Pacientes Activos',
      value: '127',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'blue',
    },
    {
      title: 'Citas Hoy',
      value: '8',
      change: '3 pendientes',
      changeType: 'neutral',
      icon: Calendar,
      color: 'emerald',
    },
    {
      title: 'Tratamientos Activos',
      value: '23',
      change: '+5%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'orange',
    },
    {
      title: 'Tiempo Promedio',
      value: '35 min',
      change: '-2 min',
      changeType: 'positive',
      icon: Clock,
      color: 'purple',
    },
  ];

  const colorClasses = {
    blue: 'stat-icon-blue',
    emerald: 'stat-icon-emerald',
    orange: 'stat-icon-orange',
    purple: 'stat-icon-purple',
  };

  const changeColorClasses = {
    positive: 'stat-change-positive',
    negative: 'stat-change-negative',
    neutral: 'stat-change-neutral',
  };

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} hover>
            <div className="stat-card-content">
              <div className="stat-text">
                <p className="stat-title">{stat.title}</p>
                <p className="stat-value">{stat.value}</p>
                <p className={`stat-change ${changeColorClasses[stat.changeType]}`}>
                  {stat.change}
                </p>
              </div>
              <div className={`stat-icon ${colorClasses[stat.color]}`}>
                <Icon className="stat-icon-image" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};