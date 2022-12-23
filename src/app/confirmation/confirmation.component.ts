import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {

  name: string | null = '';
  amount: number | null = 0;

  constructor(private route: ActivatedRoute){

  }

  ngOnInit(): void {
   /* Function to capture name and price sent in the router*/
   this.route.paramMap.subscribe(params => {
    this.name = params.get('name');
    this.amount = Number(params.get('amount'));
  })
  }
}
