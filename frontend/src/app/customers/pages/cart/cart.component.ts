import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-cart',
  imports: [NgIf, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems() {
    const cartData = localStorage.getItem('cart');
    this.cartItems = cartData ? JSON.parse(cartData) : [];
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity, // Update to include quantity in the total
      0
    );
  }

  updateQuantity(index: number, increment: boolean) {
    if (increment) {
      this.cartItems[index].quantity += 1;
    } else if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
    }
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.calculateTotal();
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
    this.saveCart();
  }

  async orderNow() {
    try {
      const userId = this.authService.currentUser.userId;
      const modifiedCartItems = this.cartItems.map((item: any) => ({
        userId: userId,
        orderDate: new Date().toISOString(),
        paymentMethod: "CASH",
        menuItem: [
          {
            menuId: item.menuId, // Assuming `id` is part of your menu item
            name: item.name,
            price: item.price,
            quantity: item.quantity // Include the updated quantity here
          }
        ]
      }));

      await this.orderService.createOrder(modifiedCartItems);
      this.toastr.success('Order placed successfully!');
      localStorage.removeItem('cart');
      this.cartItems = [];
      this.totalPrice = 0;
    } catch (e) {
      console.error(e);
      this.toastr.error('Failed to place the order. Please try again.');
    }
  }
}
