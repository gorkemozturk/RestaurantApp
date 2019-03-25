import { Pipe, PipeTransform } from '@angular/core';
import { Order } from '../_models/order';

@Pipe({
    name: 'orderFilter'
})

export class OrderPipe implements PipeTransform {
    transform(orders: Order[], keyword: string): Order[] {
        if  (!orders || !keyword) 
            return orders;

        return orders.filter(order => order.orderName.toLowerCase().indexOf(keyword.toLowerCase()) !== -1);
    }
}