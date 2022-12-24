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
    this.myStorage.setItem('cartStorage', JSON.stringify(product));
  }
  getCartProduct(): Cart[] | []{
    const getProduct = this.myStorage.getItem('cartStorage')
    return getProduct? JSON.parse(getProduct): [];
  }
  clearCart(): void{
    this.myStorage.clear();
  }
}
