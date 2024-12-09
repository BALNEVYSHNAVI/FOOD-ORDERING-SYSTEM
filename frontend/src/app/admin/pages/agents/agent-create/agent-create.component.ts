import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../../../services/agent.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-agent-create',
  imports: [FormsModule,NgFor],
  templateUrl: './agent-create.component.html',
  styleUrl: './agent-create.component.css'
})
export class AgentCreateComponent implements OnInit{

  newAgent:any = {}
  agents:any[] = []

  constructor(
    private agentService:AgentService,
    private toastr:ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
      this.loadAllAgents()
  }

  navigateToAssignAgent(agentId:string){
    this.router.navigate([`/admin/agents/assign-order/${agentId}`])
  }

  async loadAllAgents(){
    try{
      const res:any = await this.agentService.getAllDeliveryAgents();
      this.agents = res.data;
    }catch(e){
      console.log(e);
    }
  }

  async createAgent(){
    try{
      await this.agentService.createAget(this.newAgent)
      this.loadAllAgents()
      this.toastr.success("Agent created")
    }catch(e){
      console.log(e);
    }
  }
}
