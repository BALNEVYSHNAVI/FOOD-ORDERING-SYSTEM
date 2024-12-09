import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../../../services/agent.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { OrderService } from '../../../../customers/services/order.service';

@Component({
  selector: 'app-assign-agent',
  imports: [FormsModule,NgFor],
  templateUrl: './assign-agent.component.html',
  styleUrl: './assign-agent.component.css'
})
export class AssignAgentComponent implements OnInit{

  agentId:string | null = null
  order:any = {
    orderId: ''
  }
  orders:any[] = []
  agents:any[] = []
  assigendOrders:any[] = []

  constructor(
    private router:Router,
    private agentService:AgentService,
    private toastr:ToastrService,
    private route:ActivatedRoute,
    private orderService:OrderService,
  ) {}

  ngOnInit(): void {
      this.agentId = this.route.snapshot.paramMap.get('agentId');
      this.loadAllOrders()
      this.loadAllAgents()
      // this.assigendOrders = orders.filter()
  }

  async assignAgent(){
    try{
      if(this.agentId){
        await this.agentService.assignOrderToAgent(this.agentId,this.order)
        this.toastr.success("Agent assigned")
      }
    }catch(e){
      console.log(e);
    }
  }

  async loadAllOrders(){
    try{
      const res:any =  await this.orderService.getAllOrders()
      this.orders = res.data.filter((order:any) => order.status === 'Pending')
    }catch(e){
      console.log(e);
    }
  } 

  async loadAllAgents(){
    try{
      const res:any =  await this.agentService.getAllDeliveryAgents()
      this.agents = res.data.filter((agent:any) => agent.assignedOrderId !== null);
    }catch(e){
      console.log(e);
    }
  } 

  navigateToUpdateLocation(agentId:string){
    this.router.navigate([`/admin/agents/location/${agentId}`])
  }
}
