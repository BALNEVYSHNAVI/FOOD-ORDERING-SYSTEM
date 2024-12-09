import { Injectable } from '@angular/core';
import { CustomHttpService } from './customhttp.service';
import API_ENDPOINTS from '../constants/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private customHttp:CustomHttpService
  ) { }

  addFeedback(payload:any){
    try{
      return this.customHttp.post(API_ENDPOINTS.ADD_FEEDBACK_API,payload)
    }catch(e){
      throw e;
    }
  }

  getFeedbackByOrderId(orderId:string){
    try{
      return this.customHttp.get(API_ENDPOINTS.GET_FEEDBACK_BY_ORDER_ID_API(orderId))
    }catch(e){
      console.log(e);
      throw e;
    }
  }

  getFeedbackByUserId(userId:string){
    try{
      return this.customHttp.get(API_ENDPOINTS.GET_FEEDBACK_BY_USER_ID_API(userId))
    }catch(e){
      console.log(e);
      throw e;
    }
  }

  getAllFeedbacks(){
    try{
      return this.customHttp.get(API_ENDPOINTS.GET_ALL_FEEDBACK_API)
    }catch(e){
      console.log(e);
      throw e;
    }
  }
}
