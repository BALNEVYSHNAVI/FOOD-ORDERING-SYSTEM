import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgentService } from '../../../services/agent.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-location-update',
  imports: [FormsModule],
  templateUrl: './location-update.component.html',
  styleUrl: './location-update.component.css'
})
export class LocationUpdateComponent implements OnInit {
  agentId: string | null = null;
  constructor(
    private agentService:AgentService,
    private route:ActivatedRoute,
    private toastr:ToastrService
  ) {}
  agentDetails: any = {}
  location:string = ''
  ngOnInit(): void {
      this.agentId = this.route.snapshot.paramMap.get('agentId');
      this.loadAgentDetails()
  }

  async updateLocation(){
    try{
        if(this.agentId){
          await this.agentService.updateAgentLocation(this.agentId,this.location)
          this.toastr.success("location updated successfully")
        }
    }catch(e){
      console.log(e);
    }
  }

  async loadAgentDetails(){
    try{
        if(this.agentId){
          const res:any = await this.agentService.getAgentByAgentId(this.agentId)
          this.agentDetails = res.data;
        }
    }catch(e){
      console.log(e);
    }
  }


}
