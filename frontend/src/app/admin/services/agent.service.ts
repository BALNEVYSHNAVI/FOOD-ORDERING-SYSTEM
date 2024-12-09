import { Injectable } from '@angular/core';
import { CustomHttpService } from '../../services/customhttp.service';
import API_ENDPOINTS from '../../constants/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private customHttp:CustomHttpService) { }

  createAget(payload:any){
    try{
      return this.customHttp.post(API_ENDPOINTS.CREATE_DELIVERY_AGENT_API,payload);
    }catch(e){
      throw e;
    }
  }

  assignOrderToAgent(agentId:string,payload:any){
    try{
      return this.customHttp.post(API_ENDPOINTS.ASSIGN_ORDER_TO_DELIVERY_AGENT_API(agentId),payload);
    }catch(e){
      throw e;
    }
  }

  updateAgentLocation(agentId:string,payload:string){
    try{
      return this.customHttp.post(API_ENDPOINTS.UPDATE_DELIVERY_AGENT_LOCATION_API(agentId),payload);
    }catch(e){
      throw e;
    }
  }

  getAllDeliveryAgents(){
    try{
      return this.customHttp.get(API_ENDPOINTS.GET_ALL_DELIVERY_AGENTS_API);
    }catch(e){
      throw e;
    }
  }

  getAgentByOrderId(orderId:string){
    try{
      return this.customHttp.get(API_ENDPOINTS.GET_AGENT_BY_ORDER_ID_API(orderId));
    }catch(e){
      throw e;
    }
  }

  getAgentByAgentId(agentId:string){
    try{
      return this.customHttp.get(API_ENDPOINTS.GET_AGENT_BY_AGENT_ID_API(agentId));
    }catch(e){
      throw e;
    }
  }
}
