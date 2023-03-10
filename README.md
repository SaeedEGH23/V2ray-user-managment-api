# V2ray User Management API on X-UI

This is a Node.js API for creating and managing user accounts on v2ray x-ui. The API allows users to create a trojan connection account, retrieve connection data such as remaining traffic and time to expiration.

## Prerequisites

Before using this API, you must have the following prerequisites:

- v2ray x-ui installed
- npm installed

## Installation

1. Clone the project:
   git clone https://github.com/SaeedEGH23/V2ray-user-managment-api.git
2. Install dependencies:
   npm install
3. Rename `sample.env` to `.env`.
4. Set the required environment variables in `.env`.

## Usage

### Set header authorization for requests to api with JWT

```js
const token = jwt.sign({}, yoursecretkey);
```

The API currently handles two requests:

### Create new connection for User

To create a trojan connection account, send a POST request to `serverip:port/createUser` with the following object:

```json
{
  "remark": "connectionname",
  "period": 1,
  "protocol": "trojan",
  "traffic": 30
}
```

Notice: If period set 0 it mean unlimited expire time.
Remark will change when the account is created. Period time is in days, and if set to 1, means 30 days remain until expiration. Protocol currently only supports trojan. Traffic is defined in GB.

The API will return the trojan link.

### Update a connection (Use it for resubscribe or etc)

To update your time and traffic you can deffine package in your service with below object structure and send it az a POST request to `serverip:port/updateAccount`

```json
{
  "remark": "connectionname",
  "period": 1,
  "traffic": 30
}
```

Period 1 = 30 days
Traffic 1 = 1 Gb

Notice: for buy traffic to unlimited exp and enable account which has no traffic just send a JSON with remark: value , traffic: value.
Notice: API will return an updated OBJ containing username, remaintime ,remain traffic.

### Check connection data

To retrieve connection data such as remaining time and traffic, send a POST request to `serverip:port/remainCheck` with the following object:

```json
{
  "cname": "connectionname"
}
```

The API will return an object containing username, remaintime, and remaintraffic. Clients can see the connection name in their VPN client app.

## Features

- Create Account
- Update Account
- Get Account info
- Account renewal
- Account creation limit
- Use JWT bearer tocken

## Roadmap

Upcoming features:

- Logging
- Notification service
- etc.

## License

This project is licensed under the MIT License and comes with no guarantee. Feel free to use it in any way you see fit.

## Acknowledgements

This project relies on the fantastic x-ui project. For more information, please visit https://github.com/vaxilu/x-ui.git.
