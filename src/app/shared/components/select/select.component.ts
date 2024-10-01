import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgFor],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent {
  @Input() title: string = "";
  @Input() data: string[] = [];
  @Output() selectedValue = new EventEmitter();

detectChanges(event: any) {
  this.selectedValue.emit(event.target.value);
}
}
