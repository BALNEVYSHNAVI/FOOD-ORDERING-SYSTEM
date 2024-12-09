import { Injectable } from '@angular/core';
import { CustomHttpService } from '../../services/customhttp.service';
import API_ENDPOINTS from '../../constants/apiEndpoints';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private customHttp:CustomHttpService
  ) { }

  addMenu(payload:string){
    try{
        return this.customHttp.post(API_ENDPOINTS.ADMIN_ADD_MENU_API,payload);
    }catch(e){
      throw e;
    }
  }

  updateMenu(menuId:string,payload:string){
    try{
        return this.customHttp.patch(API_ENDPOINTS.ADMIN_UPDATE_MENU_API(menuId),payload);
    }catch(e){
      throw e;
    }
  }

  getAllMenus(){
    try{
        return this.customHttp.get(API_ENDPOINTS.ADMIN_GET_ALL_MENUS_API);
    }catch(e){
      throw e;
    }
  }

  getMenusByCategoryId(categoryId:string){
    try{
        return this.customHttp.get(API_ENDPOINTS.ADMIN_GET_MENUS_BY_CATEGORY_ID_API(categoryId));
    }catch(e){
      throw e;
    }
  }

  getMenuById(menuId:string){
    try{
        return this.customHttp.get(API_ENDPOINTS.ADMIN_GET_MENU_BY_ID_API(menuId));
    }catch(e){
      throw e;
    }
  }

  deleteMenuById(menuId:string){
    try{
        this.customHttp.delete(API_ENDPOINTS.ADMIN_DELETE_MENU_BY_ID_API(menuId));
    }catch(e){
      throw e;
    }
  }
}
