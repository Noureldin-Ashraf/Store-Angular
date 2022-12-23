import { Component,OnInit, Output, EventEmitter } from '@angular/core';

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

}



