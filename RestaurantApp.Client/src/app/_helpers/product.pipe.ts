import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../_models/product';

@Pipe({
    name: 'productFilter'
})

export class ProductPipe implements PipeTransform {
    transform(products: Product[], keyword: string): Product[] {
        if  (!products || !keyword) 
            return products;

        return products.filter(product => product.productName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
    }
}