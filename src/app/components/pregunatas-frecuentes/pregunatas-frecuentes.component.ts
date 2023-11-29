import { Component } from '@angular/core';

@Component({
  selector: 'app-pregunatas-frecuentes',
  templateUrl: './pregunatas-frecuentes.component.html',
  styleUrls: ['./pregunatas-frecuentes.component.css']
})
export class PregunatasFrecuentesComponent {
  accordionItems = [
    { id: 1, title: '❔ ¿Como realizan los envíos?', content: 'Respuesta de ejemplo' },
    { id: 2, title: '❔ ¿Es seguro pagar por aquí?', content: 'Respuesta de ejemplo' },
    { id: 3, title: '❔ ¿Cuanto puede tardar en llegar el producto a mi casa?', content: 'Respuesta: Esta la responde el desarrollador🤭🤭.' },
    { id: 4, title: '❔ ¿Pregunta de ejemplo?', content: 'Respuesta de ejemplo' },
    { id: 5, title: '❔ ¿Pregunta de ejemplo?', content: 'Respuesta de ejemplo' },

  ];

  activeItem: number | null = null;

  toggleAccordion(id: number): void {
    this.activeItem = (this.activeItem === id) ? null : id;
  }
}
