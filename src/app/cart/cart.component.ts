import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../models/Cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartProducts: Cart [] = [];
  totalPrice: number = 0;


  constructor(private cartService: CartService,private route: Router){
  }
  ngOnInit(): void {
    this.cartProducts = this.cartService.getCartProduct();
    this.calculateTotalPrice();
  }

  //Function to change value on amount change
  AdjustProductAmount(id: number, event: any): void{
      //Get selected amount 
      const selectedAmount = event.target.options[event.target.options.selectedIndex].value;
      //get exact product based on id
      const cartId_added = this.cartProducts.findIndex(cart => cart.id === id);
      cartId_added != -1 && this.cartProducts.length > 0 ? this.cartProducts[cartId_added].amount = selectedAmount: null;
      //Update amount
      this.cartProducts.length > 0 ? this.cartService.addToCart(this.cartProducts): null;

      this.calculateTotalPrice()
  }

  //Funcation to remove product from cart
  RemoveFromCart(id: number): void{
    const cartId_added = this.cartProducts? this.cartProducts.findIndex(cart => cart.id === id): -1;
    if(cartId_added != -1 && this.cartProducts.length > 0){
      this.cartProducts.splice(cartId_added,1)
      this.cartService.addToCart(this.cartProducts)
      this.calculateTotalPrice()
    }
    
  }

  //Function to calculate total
  calculateTotalPrice(): void{
    this.totalPrice = this.cartProducts.reduce((acc: number, val: any) =>{
      return acc + val.price * Number(val.amount);
    }, 0);
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

  //Function to run after form submit
  checkoutSuccess(fullName: string): void{
    this.cartService.clearCart();
    this.route.navigateByUrl(`success/${fullName}/${this.totalPrice}`);
  }
}
