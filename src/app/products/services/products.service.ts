import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _HttpClient: HttpClient) { }
  item: any

  getAllProducts() {
    return this._HttpClient.get('https://fakestoreapi.com/products');
  }

  getAllCategories(){
    return this._HttpClient.get('https://fakestoreapi.com/products/categories');
  }

  getSpecificCategory(category: string){
    return this._HttpClient.get('https://fakestoreapi.com/products/category/'+category);
  }

  getProductById(id: number){
    return this._HttpClient.get('https://fakestoreapi.com/products/'+id);
  }
}
