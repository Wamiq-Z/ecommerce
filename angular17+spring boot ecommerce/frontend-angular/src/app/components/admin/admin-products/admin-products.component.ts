import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../Models/AppState';
import { ProductService } from '../../../state/Product/product.service';
import { Subscription } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { ProductTableComponent } from '../product-table/product-table.component';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [ProductTableComponent,MatPaginatorModule,MatButtonModule],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.css'
})
export class AdminProductsComponent {
  private routeQueryParamsSubscription: Subscription | undefined;

  filterValue = {
    category: '',
    availability: '',
    sort: '',
  };

  customersProduct = {
    products: {
      totalPages: 0,
      content: [], // Add your product data here
    },
  };

  products: any;
  content:any;

  currentPage = 1;

  constructor(
    private store: Store<AppState>,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.store.pipe(select((store) => store.product)).subscribe((products) => {
      this.products = products;
      this.content=products?.content
      console.log('all products ', products.content);
    });

    const data = {
      category: '',
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: 'price_low',
      pageNumber: 0 || 0,
      pageSize: 10,
      stock: 'in_stock',
    };

    this.productService.findProductsByCategory(data);

    this.routeQueryParamsSubscription=this.activatedRoute.queryParams.subscribe((params)=>{
      const data = {
        category: '',
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 100000,
        minDiscount: 0,
        sort: 'price_low',
        pageNumber: params["pageNumber"] || 0,
        pageSize: 10,
        stock: 'in_stock',
      };
      this.productService.findProductsByCategory(data);
    })
  }

 

  handleDeleteProduct(productId: number) {
    this.productService.deleteProduct(productId);
  }

  handlePaginationChange(event: any) {
    const newPageIndex = event.pageIndex; // Page index is zero-based
    const queryParams = { ...this.activatedRoute.snapshot.queryParams };

    queryParams["pageNumber"] = newPageIndex;

    this.router.navigate([], { queryParams });
  }

  displayedColumns: string[] = [
    'imageUrl',
    'title',
    'category',
    'discountedPrice',
    'quantity',
    'delete',
  ];
}
