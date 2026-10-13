import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deadline',
})
export class DeadlinePipe implements PipeTransform {
  transform(value: string | null | undefined): string {
   if (!value) return 'Pas d’échéance';
   const today = new Date();
    today.setHours(0, 0, 0, 0);                 // aujourd'hui à minuit : on compare des jours, pas des heures

    const [year, month, day] = value.split('-').map(Number);   // '2026-10-02' → [2026, 10, 2]
    const due = new Date(year, month - 1, day);                // les mois JS vont de 0 à 11, d'où `month - 1`

    const diff = Math.round((due.getTime() - today.getTime()) / 86400000);
    // différence en millisecondes ÷ (24 × 60 × 60 × 1000) = nombre de jours
    // Math.round évite les décalages dus à l'heure d'été

    if (diff === 0) return 'Aujourd’hui';
    if (diff === 1) return 'Demain';
    if (diff > 1) return `Dans ${diff} jours`;

    const late = Math.abs(diff);                                // diff négatif → on prend la valeur positive
    return `En retard de ${late} jour${late > 1 ? 's' : ''}`;   // singulier si 1
  }
}
