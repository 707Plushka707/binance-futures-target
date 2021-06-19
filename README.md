# Binance Futures: Balance Target

**Warning:** This project just make for fun. Please don't deploy it to any webserver, your personal information on Binance may be stolen.

## Installation

I used Binance Future API with [node-binance-api](https://www.npmjs.com/package/node-binance-api), so before start you need to create API for your Binance account. [How to create API](https://www.binance.com/en/support/faq/360002502072)

### Run with docker compose

```bash
docker build -t senpp/binance-future-target .
docker-compose up -d
```

### Run locally

```bash
pnpm install
pnpm dev
```
