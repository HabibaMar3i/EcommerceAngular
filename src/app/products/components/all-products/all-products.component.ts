import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { SelectComponent } from "../../../shared/components/select/select.component";
import { ProductComponent } from "../product/product.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [CommonModule, NgFor, SpinnerComponent, NgIf, SelectComponent, ProductComponent, RouterLink],
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products: any = [];
  categories: any = [];
  loading: boolean = false;
  cartProducts: any[] = []
  constructor(private _ProductsService: ProductsService) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.loading = true
    this._ProductsService.getAllProducts().subscribe((response) => {
      this.loading = false
      this.products = response;
    }, error => {
      this.loading = false
      console.log(error.message);
    });
  }

  getCategories() {
    this.loading = true
    this._ProductsService.getAllCategories().subscribe((response) => {
      this.loading = false
      this.categories = response;
    },
      error => {
        this.loading = false
        console.log(error.message);
      });
  }

  getSpecificCategory(event: any) {
    let value = event;
    (value == "all") ? this.getProducts() : this.getCategory(value)
  }

  getCategory(category: string) {
    this.loading = true
    this._ProductsService.getSpecificCategory(category).subscribe((response) => {
      this.loading = false
      this.products = response
    },
      error => {
        this.loading = false
        console.log(error.message);
      });
  }

  addToCart(event: any) {
    if ("cart" in localStorage) {
      const storedCart = localStorage.getItem("cart");
      this.cartProducts = storedCart ? JSON.parse(storedCart) : [];
      const existedItem = this.cartProducts.find(item => item.item.id === event.item.id);

      if (existedItem) {
        alert("Product already exists in the cart");
      } else {
        this.cartProducts.push(event);
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      }
    } else {
      this.cartProducts.push(event);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }

  }
}
