export class CreateCart {
  cart_token: string;

  abandoned_checkout_url: string;

  created_at: Date;

  customer: {
    email: string;
    first_name: string;
    last_name: string;
  };
}
