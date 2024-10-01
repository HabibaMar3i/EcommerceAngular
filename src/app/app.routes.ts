import { Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductDetailsComponent } from './products/components/product-details/product-details.component';
import { CartsComponent } from './carts/components/carts/carts.component';

export const routes: Routes = [
  {path: "products", component: AllProductsComponent},
  {path: "details/:id", component: ProductDetailsComponent},
  {path: "cart", component: CartsComponent},
  {path: "**", redirectTo:"products", pathMatch:"full"},
];

