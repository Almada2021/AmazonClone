import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import { Cart } from './Cart.model';
@Injectable()
export class StripeService {
  private stripe;
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }
  checkout(cart: Cart) {
    const totalPrice: number = cart.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0,
    );
    return this.stripe.paymentIntents.create({
      amount: Number(totalPrice.toFixed(2)) * 100, //cents
      currency: 'usd',
      payment_method_types: ['card'],
    });
  }
}
