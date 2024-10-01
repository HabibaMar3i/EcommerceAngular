import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartsService } from '../../services/carts.service';
@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.scss'
})
export class CartsComponent implements OnInit {
  constructor(private service: CartsService) { }

  cartProducts: any[] = []
  total: any = 0
  success: boolean = false

  ngOnInit(): void {
    this.getCartProducts()
  }

  getCartProducts() {
    if ("cart" in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      console.log("LocalStorage cart:", localStorage.getItem("cart"));
    }
    this.getCartTotal()
  }

  getCartTotal() {
    this.total = 0
    for (let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
  }

  minusQuantity(index: number) {
    this.cartProducts[index].quantity--
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  plusQuantity(index: number) {
    this.cartProducts[index].quantity++
    this.getCartTotal()
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  detectChange(){
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  deleteProduct(index: number){
    this.cartProducts.splice(index, 1)
    localStorage.setItem("cart", JSON.stringify(this.cartProducts));
  }

  clearCart(){
    localStorage.removeItem("cart")
    this.cartProducts = []
    this.total = 0
  }

  addCart(){
    let products = this.cartProducts.map(item => {
      return {
        productId: item.item.id,
        quantity: item.quantity
      }
    })
    let model = {
        userId: 5,
        date: new Date(),
        products:products
    }
    this.service.sendCart(model).subscribe(response =>{
      this.success = true
    })
  }
}
