import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../admin/services/menu.service';
import { FeedbackService } from '../../../services/feedback.service';

@Component({
  selector: 'app-menu-card',
  imports: [NgFor],
  templateUrl: './menu-card.component.html',
  styleUrl: './menu-card.component.css'
})
export class MenuCardComponent implements OnInit {

  menuItems:any[] = []
  rating:number = 0;

  constructor(
    private menuService:MenuService,
    private feedbackService:FeedbackService
  ) {}

  ngOnInit(): void {
      this.loadAllMenuItems()
  }

  async loadAllMenuItems(){
    try{
      const res:any = await this.menuService.getAllMenus()
      this.menuItems = res.data.filter((item:any) => item.availability === true).map((item:any) => ({
        ...item,
        avgRating: 4.2,
        image: 'https://tse1.mm.bing.net/th?id=OIP.jJI3bTJ-diLfKDHb9-vwmwHaE8&pid=Api&P=0&h=180'
      }));
    }catch(e){
      console.log(e);
    }
  }

  addToCart(item: any) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCartItem = {
      ...item,
      quantity: 1,
    }
    cart.push(updatedCartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    window.location.reload();
  }

  generateStars(rating: number): Array<number> {
    return Array(5).fill(0).map((_, i) => i + 1);
  }

  // async loadAllFeedbacks(){
  //   try{
  //     const res:any = await this.feedbackService.getAllFeedbacks();
  //     this.menuItems.map((item:any) => {

  //     })
  //   }catch(e){
  //     console.log(object);
  //   }
  // }
}
