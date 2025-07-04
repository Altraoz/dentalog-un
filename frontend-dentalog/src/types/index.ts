// import { Users } from "lucide-react";

export interface ResponsableUser {
  id_user: number;
  created_at: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_photo_url: string;
  role: number;
  is_active: boolean;
  last_login: string | null;
  updated_at: string;
  email: string;
}

export interface Patient {
  id: number;
  dni: number;
  created_at: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  responsable_user: ResponsableUser;
  gender: "Masculino" | "Femenino";
  blood_type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  address: string;
  profile_photo_url: string;
  allergies: string[];

  // allergies?: string[]; // Descomenta si tu API lo devuelve
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

export interface User {
  id: string;
  id_user: string;
  first_name: string;
  last_name: string;
  name: string;
  profile_photo_url: string;
  role: number;
  last_login: string;
  email: string;
  token: string;
}

export interface UserPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role: number; // opcional si lo dejas que lo defina el backend
}

export interface PatientPayload {
  first_name: string;
  last_name: string;
  birth_date: string;
  gender: string;
  blood_type: string;
  address: string;
  profile_photo_url: string;
  dni: number;
  // responsable_user: number;
  responsable_user_data: UserPayload;
}
