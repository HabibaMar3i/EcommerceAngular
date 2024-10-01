import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private _HttpClient: HttpClient) { }


  sendCart(model:any){
    return this._HttpClient.post('https://fakestoreapi.com/carts',model);
  }
}
