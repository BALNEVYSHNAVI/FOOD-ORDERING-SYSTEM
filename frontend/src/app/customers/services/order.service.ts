import { Injectable } from '@angular/core';
import { CustomHttpService } from '../../services/customhttp.service';
import API_ENDPOINTS from '../../constants/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private customHttp:CustomHttpService
  ) { }

  createOrder(payload:any){
    try{
      return this.customHttp.post(API_ENDPOINTS.CREATE_ORDER_API,payload);
    }catch(e){
      throw e
    }
  }

  getAllOrders(){
    try{
      return this.customHttp.get(API_ENDPOINTS.GET_ALL_ORDERS_API);
    }catch(e){
      throw e
    }
  }

  getOrdersByUserId(userId:string){
    try{
      return this.customHttp.get(API_ENDPOINTS.GET_ORDERS_BY_USER_ID(userId));
    }catch(e){
      throw e
    }
  }

  getActiveOrders(){
    try{
      return this.customHttp.get(API_ENDPOINTS.GET_ACTIVE_ORDERS);
    }catch(e){
      throw e
    }
  }

  updateOrderStatus(orderId:string,payload:any){
    try{
      return this.customHttp.patch(API_ENDPOINTS.UPDATE_ORDER_STATUS_API(orderId),payload);
    }catch(e){
      throw e
    }
  }
}
