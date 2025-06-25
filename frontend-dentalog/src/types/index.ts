export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "doctor";
  avatar?: string;
  token?: string;
}

export interface Patient {
  id: string;
  name: string;
  lastName: string;
  birthDate: string;
  age: number;
  gender: "male" | "female";
  phone: string;
  parentName: string;
  parentPhone: string;
  address: string;
  medicalHistory: string[];
  allergies: string[];
  createdAt: string;
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  duration: number;
  serviceId: string;
  serviceName: string;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  notes?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  category: "preventive" | "restorative" | "orthodontic" | "surgical";
  ageRange: string;
}

export interface Treatment {
  id: string;
  patientId: string;
  serviceId: string;
  doctorId: string;
  startDate: string;
  endDate?: string;
  status: "planning" | "in-progress" | "completed" | "cancelled";
  progress: number;
  notes: string[];
  nextAppointment?: string;
}

export interface DentalCalculation {
  id: string;
  patientId: string;
  calculationType: "space-analysis" | "growth-prediction" | "treatment-plan";
  measurements: Record<string, number>;
  results: Record<string, unknown>;
  date: string;
  notes?: string;
}
