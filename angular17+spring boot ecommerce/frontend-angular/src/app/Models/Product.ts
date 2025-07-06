export interface Product {
    brand?: string;
    category?: {
      id: number;
      name: string;
      parentCategory: any; // Replace 'any' with the appropriate type for parentCategory
      level: number;
    };
    color?: string;
    createdAt?: string;
    description?: string;
    discountPercent?: number;
    discountedPrice?: number;
    id?: number;
    imageUrl?: string;
    numRatings?: number;
    price?: number;
    quantity?: number;
    ratings?: any[]; // Replace 'any' with the appropriate type for ratings
    reviews?: any[]; // Replace 'any' with the appropriate type for reviews
    sizes?: any[]; // Replace 'any' with the appropriate type for sizes
    title?: string;
  }
  
  export interface ProductRequest {
    
    colors: any;
    sizes: any;
    minPrice: any;
    maxPrice: any;
    minDiscount: any;
    category: any;
    stock: any;
    sort: any;
    pageNumber: any;
    pageSize: any;
  
}