// import { Users } from "lucide-react";

import type { Activity } from "../components/Appointments/DraggableList";

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
  clinical_case: string;
  doctorId: string;
  type: number;
  status: "scheduled" | "completed" | "cancelled" | "no-show";
  attention_date: string; // Cambiado de date a attention_date
}

export interface AppointmentPayload {
  // clinical_case: string;
  // doctorId: string;
  // type: number;
  // status: "scheduled" | "completed" | "cancelled" | "no-show";
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

export interface AppointmentTypePayload {
  name: string;
  description: string;
}

export interface ClinicalCasePayload {
  patient: number;
  summary: string;
  initial_diagnosis: string;
  treatment_plan?: string;
}

export interface ProcedurePayload {
  name: string;
  start_date: string;
  // end_date: string;
  description: string;
  notes?: string; 
}

export interface ActivityPayload {
  name: string;
  procedure: number;
  is_done: boolean;
}

export interface AppointmentPayload {
  patient: { id: number | undefined; first_name: string; last_name: string };
  appointmentType: { id: number | undefined; name: string };
  date: string;
  time: string;
  case: { id: number | undefined; initial_diagnosis: string };
  procedure: { id: number | undefined; name: string };
  activities: Activity[];
}