# Cryptocurrency Converter
A wrapper around Coingecko API to convert cryptocurrencies as part of an internship assignment.

## Run Locally

Clone the project

```bash
  git clone https://github.com/chhavitekriwal/crypto-price-converter.git
  cd crypto-price-converter
```
Install dependencies and start the server
```
  yarn install
  yarn start
```
The server runs in production mode by default. To run in development mode:
```
  yarn dev
```


## API Reference

Postman Documentation [here](https://documenter.getpostman.com/view/20079745/2s9Ykkfi1n)


Base URL for local: http://127.0.0.1:8080

Production URL: https://crypto.chhavitekriwal.me

```shell
  GET /api/crypto/price
```

<details>
<summary>Request Parameters</summary>
<pre>
{
    "fromCurrency":"bitcoin",
    "toCurrency":"ethereum",
    "date":"14-12-2023"
}
</pre>
</details>

<details>
<summary>Response</summary>
<pre>
{
    "fromCurrency": {
        "id": "bitcoin",
        "name": "Bitcoin"
    },
    "toCurrency": {
        "id": "ethereum",
        "name": "Ethereum"
    },
    "price": 18.98901266895501,
    "date": "14-12-2023"
}
</pre>
</details>

