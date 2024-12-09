import { Injectable } from '@angular/core';
import { CustomHttpService } from '../../services/customhttp.service';
import API_ENDPOINTS from '../../constants/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private customHttp:CustomHttpService
  ) { }

  addCategory(payload:string){
    try{
        return this.customHttp.post(API_ENDPOINTS.ADMIN_ADD_CATEGORY_API,payload);
    }catch(e){
      throw e;
    }
  }

  updateCategory(categoryId:string,payload:string){
    try{
        return this.customHttp.patch(API_ENDPOINTS.ADMIN_UPDATE_CATEGORY_API(categoryId),payload);
    }catch(e){
      throw e;
    }
  }

  getAllCategories(){
    try{
        return this.customHttp.get(API_ENDPOINTS.ADMIN_GET_ALL_CATEGORYS_API);
    }catch(e){
      throw e;
    }
  }

  getCategoryById(categoryId:string){
    try{
        return this.customHttp.get(API_ENDPOINTS.ADMIN_GET_CATEGORY_BY_ID_API(categoryId));
    }catch(e){
      throw e;
    }
  }

  deleteCategoryById(categoryId:string){
    try{
        this.customHttp.delete(API_ENDPOINTS.ADMIN_DELETE_CATEGORY_BY_ID_API(categoryId));
    }catch(e){
      throw e;
    }
  }
}
