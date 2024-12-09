import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../../auth/services/auth.service';
import { FeedbackComponent } from "../../components/feedback/feedback.component";

@Component({
  selector: 'app-history',
  imports: [NgFor, NgIf, FeedbackComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  orderHistory: any[] = [];
  userId: string = '123'; // Replace with actual user ID
  selectedOrderId:string | null = null;
  isFeedBackModelOpen:boolean = false;
  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.currentUser.userId
    this.loadOrderByUserId();
  }

  openFeedbackModel(orderId:string){
    this.selectedOrderId = orderId
    this.isFeedBackModelOpen = true;
  }

  async loadOrderByUserId(){
    try{
      const res:any = await this.orderService.getOrdersByUserId(this.userId)
      this.orderHistory = res.data;
    }catch(e){
      console.log(e);
    }
  }
}
