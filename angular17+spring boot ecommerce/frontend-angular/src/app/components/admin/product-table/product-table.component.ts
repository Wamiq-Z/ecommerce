import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../Models/AppState';
import { ProductService } from '../../../state/Product/product.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [MatPaginatorModule,MatTableModule,MatButtonModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.css'
})
export class ProductTableComponent {
  @Input() dataSource:any
  // @Input() displayedColumns:any
  @Input() isPagination:any
  @Input() isDashboard:any

  private routeQueryParamsSubscription: Subscription | undefined;



  products: any;
  // content:any;

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
      // this.content=products?.content
      console.log('all products ', products.content);
    });

    
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
