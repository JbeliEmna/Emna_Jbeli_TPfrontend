import { User } from '../models/user.model';

export const USERS: User[] = [
  { id: 1, name: 'Amira Ben Salah', email: 'amira@taskflow.tn', role: 'Développeur', active: true },
  { id: 2, name: 'Mohamed Trabelsi', email: 'mohamed@taskflow.tn', role: 'Chef de projet', active: true },
  { id: 3, name: 'Sarra Jlassi', email: 'sarra@taskflow.tn', role: 'Testeur', active: false },   // inactive
  { id: 4, name: 'Karim Mansour', email: 'karim@taskflow.tn', role: 'Designer', active: true },  // aucune tâche
];