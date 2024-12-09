import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-management',
  imports: [FormsModule,NgFor,NgIf],
  templateUrl: './category-management.component.html',
  styleUrl: './category-management.component.css'
})
export class CategoryManagementComponent {
  menus: any[] = [];
  newCategory: any = {
    name: '',
    description: '',
  };
  isEdit:boolean = false;
  categoryId:string |null = null

  constructor(
    private categoryService: CategoryService,
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId')
    this.isEdit = this.categoryId ? true : false;
    this.loadCategoryById()
    this.loadCategories()
  }

  async loadCategories(){
    try{
      const res:any = await this.categoryService.getAllCategories()
      this.menus = res.data;
    }catch(e){  
      console.log(e);
    }
  }

  async loadCategoryById(){
    try{
      if(this.categoryId){
        const res:any = await this.categoryService.getCategoryById(this.categoryId)
        this.newCategory = res.data;
      }
    }catch(e){  
      console.log(e);
    }
  }

  async addMenu(){
    try{
      if(this.isEdit && this.categoryId){
        await this.categoryService.updateCategory(this.categoryId,this.newCategory)
        this.toastr.success("category edited successfully")
      }else{
        await this.categoryService.addCategory(this.newCategory);
        this.toastr.success("category added successfully")
        this.loadCategories()
      }
    }catch(e){  
      console.log(e);
    }
  }

  editMenu(categoryId:string){
    this.router.navigate([`/admin/category/edit/${categoryId}`])
  }

  async deleteMenu(categoryId:string){
    try{
      await this.categoryService.deleteCategoryById(categoryId)
      this.toastr.success("category deleted successfully")
      this.loadCategories()
    }catch(e){
      console.log(e);
    }
  }
}
