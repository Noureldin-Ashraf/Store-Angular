import { Injectable } from '@angular/core';
import {Cart} from '../models/Cart';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  myStorage = window.localStorage;
  constructor() { }

  addToCart(product: Cart[]): void{
    this.myStorage.setItem('cart', JSON.stringify(product));
  }
  getCartProduct(): Cart[] | []{
    const getProduct = this.myStorage.getItem('cart')
    return getProduct? JSON.parse(getProduct): [];
  }
  clearCart(): void{
    this.myStorage.clear();
  }
}
