## Cryptocurrency Converter
A wrapper around Coingecko API to convert cryptocurrencies = part of an internship assignment.

### Run Locally

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

### API Reference

```http
  GET /api/crypto/price
```
Query Params
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `fromCurrency` | `string` | **Required**. Coingecko ID of the currency whose price is to be found |
|`toCurrency` | `string` | **Required**. Coingecko ID of the currency to be converted into|
|`date`|`DD-MM-YYYY` string | **Required**. The date on which the price is to be found|

Sample request and response [here](https://documenter.getpostman.com/view/20079745/2s9Ykkfi1n)

The backend is deployed at [https://crypto.chhavitekriwal.me](https://crypto.chhavitekriwal.me)
