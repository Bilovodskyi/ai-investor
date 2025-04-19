export type CheckoutTransactionParams = {
    plan: string;
    buyerId: string;
};

export type CreateTransactionParams = {
    stripeId: string;
    plan: string;
    buyerId: string;
    createdAt: Date;
};
