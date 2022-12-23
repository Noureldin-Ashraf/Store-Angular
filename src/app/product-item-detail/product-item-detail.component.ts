import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { ThisReceiver } from '@angular/compiler';
import { Cart } from '../models/Cart';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit {

  id: number|null = null;
  products: Product[]= [];
  product: Product | null = null;
  selectedOption: string = '';

  constructor(private route: ActivatedRoute, private productService: ProductService,private cartService: CartService){

  }
  ngOnInit(): void {
    /* Function to capture id sent in the router*/
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    })

    /* Function to get products then filter through with id
    NOT IDEAL, IF REAL LIFE PROJECT WILL CREATE SEPERATE API TO GET PRODUCT BY ID */
    this.productService.getProducts().subscribe(data=>{
      this.products = data;
      this.product = this.products.filter(product => product.id === this.id)[0]
    })
  }

//Submit Action
onSubmit(cartProduct: Product, event: any): boolean{

  let newCartProduct: Cart[] = [];
  let isCartAmountExist: boolean = false;
  let message: string = '';
 
  // Get selected amount from the drop down list
  const selectedAmount = event.target[0].options[event.target[0].options.selectedIndex].value;
  const cartProducts: Cart[] | [] = this.cartService.getCartProduct();

  //Check to see if cart id exist in cart products
  const cartId_added = cartProducts.findIndex(cart => cart.id === cartProduct.id)
  newCartProduct = cartProducts;

  if((cartId_added === -1) || (cartProducts.length === 0)){
    //If this item has not been added before ie id doenst exist; Add the product to the cart
    newCartProduct.push(Object.assign(cartProduct, {amount: selectedAmount}))
    message = `${selectedAmount} Item(s) of ${cartProduct.name} has been added to your cart`;
  }else{
    //If this item is already in the cart; check the amount added before
    const amount: number = newCartProduct[cartId_added].amount;
    isCartAmountExist = selectedAmount === amount

    if (isCartAmountExist){
      //If amount is same ; alert user
      message = `${amount} Item(s) of ${cartProduct.name} already exist in cart.`;
    }else{
      // if amount is not the same then change to the new amount and alert user with the change
      newCartProduct[cartId_added].id = cartProduct.id;
      newCartProduct[cartId_added].amount = selectedAmount;
      //message = `${amount} Item(s) of '${cartProduct.name}' already exist in cart. Will be updated to ${selectedAmount}`;
      message = `${cartProduct.name} Item(s) has been updated to ${selectedAmount} instead of ${amount}`;
    }
    
  }
  !isCartAmountExist? this.cartService.addToCart(newCartProduct): null;

  // Alert Message that was dynamically compiled
  alert(message);
  //Log cart products for debugging to be removed
  console.log(this.cartService.getCartProduct())

  return false;
}
 

}
