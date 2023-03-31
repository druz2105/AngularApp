import {Component, Input} from '@angular/core';
import {CardModel} from "../../models/card.models";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  @Input() modelForm: NgForm;
  @Input() cardModel: CardModel;

  constructor() {
    // @ts-ignore
    this.modelForm = new NgForm();
    this.cardModel = new CardModel();
  }

}
