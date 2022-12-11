### Prerequisites:

1. Docker
2. Git

### Setup:

1. Clone the repo

2. Start the containers

```bash
cd docker
docker-compose up
```

### APIs:

1. Abandoned Checkout webhook

```
POST /carts
```

Payload:

```js
{
  cart_token: string;

  abandoned_checkout_url: string;

  created_at: Date;

  customer: {
    email: string;
    first_name: string;
    last_name: string;
  }
}
```

2. Order placed

```
POST /carts/completed
```

Payload:

```js
{
  cart_token: string;
}
```

### Sending Messages:

This project currently uses `console.log` as the messaging service. This can be changed to desirable email service [here](/src/message/message-executor.service.ts).
