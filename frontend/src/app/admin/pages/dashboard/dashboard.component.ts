import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../customers/services/order.service';
import { ToastrService } from 'ngx-toastr';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule,NgFor,NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  orders: any[] = [];
  activeOrders:any[] = []
  totalEarnings:number  = 0;
  constructor(
    // private webSocketService: WebSocketService,
    private orderService: OrderService,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadActiveOrders()
    // this.webSocketService.getOrderStatusUpdates().subscribe((update) => {
    //   const order = this.orders.find((o) => o.id === update.orderId);
    //   if (order) {
    //     order.status = update.status;
    //   }
    // });
  }

  async loadOrders() {
    try{
      const res:any = await this.orderService.getAllOrders()
      this.orders = res.data;
      this.calculateTotalEarnings()
    }catch(e){

    }
  }

  calculateTotalEarnings(){
    this.totalEarnings = this.orders.reduce((total,order) => total + (order.totalPrice || 0),0)
  }

  async updateOrderStatus(orderId: string, status: string) {
    try{
      const res:any = await this.orderService.updateOrderStatus(orderId,{status});
      this.toastr.success("Order updated successfully")
    }catch(e){
      console.log(e);
    }
  }

  async loadActiveOrders() {
    try{
      const res:any = await this.orderService.getActiveOrders();
      this.activeOrders = res.data;
    }catch(e){
      console.log(e);
    }
  }
}