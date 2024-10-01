import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [SpinnerComponent, NgIf],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  id: any
  data: any = {}
  loading: boolean = false
  constructor(private route: ActivatedRoute, private service: ProductsService) {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  ngOnInit() {
    this.getProduct()
  }

  getProduct() {
    this.loading = true
    this.service.getProductById(this.id).subscribe(response => {
      this.loading = false
      this.data = response
    }, error =>{
      this.loading = false
      console.error(error)
    })
  }

}
