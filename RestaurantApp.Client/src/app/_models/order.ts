export class Order {
    id: number;
    userID: string;
    tableID: number;
    orderName: string;
    total: number;
    isPaid: boolean;
    createdAt: Date;
}
