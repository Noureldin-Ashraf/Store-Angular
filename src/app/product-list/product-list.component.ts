import { Component, OnInit  } from '@angular/core';
import { Product } from '../models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(/*private postService: PostService*/){}

  ngOnInit(): void{
    /*this.postService.getPosts().subscribe(data => {
      this.posts = data;
    });*/
  }

}
