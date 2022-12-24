import { Component,OnInit, Output, EventEmitter } from '@angular/core';
import { isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-cart-form',
  templateUrl: './cart-form.component.html',
  styleUrls: ['./cart-form.component.css']
})
export class CartFormComponent {
  
  @Output() checkoutSuccess: EventEmitter<string> = new EventEmitter();

  constructor() { }
  fullName: string='';
  address: string='';
  creditCard:  string = '';

  ngOnInit(): void {
  }

  onSubmit():void{
    this.checkoutSuccess.emit(this.fullName);
  }

  /* Validate function to demonstrate ngmodelchange usage*/
  validateCard(event: any){

    if(isNaN(Number(event))){
      alert('Invalid credit card character');
      this.creditCard = '';
    }
    console.log(event);
  }

}



