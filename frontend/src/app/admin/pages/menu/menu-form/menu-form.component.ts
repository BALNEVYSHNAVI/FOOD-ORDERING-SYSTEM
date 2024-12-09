import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-menu-form',
  imports: [FormsModule,NgFor,NgClass,NgIf],
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.css'
})
export class MenuFormComponent implements OnInit {
  menus: any[] = [];
  newMenu: any = {
    name: '',
    category: {
      categoryId: '',
      name: ''
    },
    description: '',
    price: null,
    availability: true,
  };
  isEdit:boolean = false;
  menuId:string |null = null
  categories:any[] = []

  constructor(
    private menuService: MenuService,
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute,
    private categoryService:CategoryService
  ) {}

  ngOnInit(): void {
    this.menuId = this.route.snapshot.paramMap.get('menuId')
    this.isEdit = this.menuId ? true : false;
    this.loadMenuById()
    this.loadMenus()
    this.loadCategories()
  }

  async loadMenus(){
    try{
      const res:any = await this.menuService.getAllMenus()
      this.menus = res.data;
    }catch(e){  
      console.log(e);
    }
  }

  async loadCategories(){
    try{
      const res:any = await this.categoryService.getAllCategories()
      this.categories = res.data;
    }catch(e){  
      console.log(e);
    }
  }

  async loadMenuById(){
    try{
      if(this.menuId){
        const res:any = await this.menuService.getMenuById(this.menuId)
        this.newMenu = res.data;
      }
    }catch(e){  
      console.log(e);
    }
  }

  async addMenu(){
    try{
      if(this.isEdit && this.menuId){
        await this.menuService.updateMenu(this.menuId,this.newMenu)
        this.toastr.success("Menu edited successfully")
      }else{
        await this.menuService.addMenu(this.newMenu);
        this.toastr.success("Menu added successfully")
        this.loadMenus()
      }
    }catch(e){  
      console.log(e);
    }
  }

  editMenu(menuId:string){
    this.router.navigate([`/admin/menu/edit/${menuId}`])
  }

  async deleteMenu(menuId:string){
    try{
      await this.menuService.deleteMenuById(menuId)
      this.loadMenus()
      this.toastr.success("menu deleted successfully")
    }catch(e){
      console.log(e);
    }
  }
}
