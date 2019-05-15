import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() entry: any;

  constructor() {
  }

  toggleState() {
    this.entry.state = !this.entry.state;
  }
}
