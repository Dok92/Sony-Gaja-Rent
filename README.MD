# Sony Gaja Rent


#### Rent PS4 & PS5 consoles

Sony Gaja Rent is Sony PlayStation interface like website for renting sony. It was built as an extension to the [sony-gaja](https://github.com/Dok92/sony-gaja) website, with intention to provide registered users a way to earn additional discounts, as well as being my own personal showcase project.

Project in Action - [sony-gaja-rent](https://sony-gaja-rent.herokuapp.com/)
For full experience use credentials:
- Email:     test@gmail.com
- Password:  123456
---
### Run The App Locally

```sh
npm run install-dependencies
```

- rename .env.temp to .env
- setup values for - MONGO_URL, JWT_SECRET, JWT_LIFETIME 

```sh
npm start
```

- visit url http://localhost:3000/


## Packages

#### Normalize.css 
[normalize docs](https://necolas.github.io/normalize.css/)


- small CSS file that provides cross-browser consistency in the default styling of HTML elements.
```sh
npm install normalize.css
```

#### Express-Async-Errors Package
[Express-Async-Errors](https://www.npmjs.com/package/express-async-errors)


- remove try/catch
- in server.js
- import 'express-async-errors'

- use throw Error('error') instead of next(error)
```sh
npm install express-async-errors
```

#### Http Status Codes
[Http Status Codes](https://www.npmjs.com/package/http-status-codes)

- constants for status codes
- personal preference
- provides consistency
- less bugs
- easier to read/manage


```sh
npm install http-status-codes
```
#### Concurrently
[concurrently](https://www.npmjs.com/package/concurrently)

- front-end and backend (server)
- run separate terminals

```sh
npm install concurrently --save-dev

```

#### Cors Error

[Cors Error](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

- two fixes (cors package and proxy)

#### Cors Package

[cors package](https://www.npmjs.com/package/cors)

```sh
npm install cors
```


#### Proxy
[cra proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development/)

- access from anywhere
- don't want to use full url


- my preference to remove trailing slash /
- restart app


#### Morgan Package

[morgan docs](https://www.npmjs.com/package/morgan)

- http logger middleware for node.js
```sh
npm i morgan
```


#### Dayjs
[dayjs](https://www.npmjs.com/package/dayjs)

- Format Dates
```sh
npm i dayjs
```


#### Security Packages

- [helmet](https://www.npmjs.com/package/helmet)
  Helmet helps you secure your Express apps by setting various HTTP headers.
- [xss-clean](https://www.npmjs.com/package/xss-clean)
  Node.js Connect middleware to sanitize user input coming from POST body, GET queries, and url params.
- [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize)
  Sanitizes user-supplied data to prevent MongoDB Operator Injection.
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
  Basic rate-limiting middleware for Express.

  ---

  ## TODO

- Try different (more modern) approach - rewrite entire app using only functional components, styled        components, framer motion (react animations)
- Edit user functionality
- Add phone number in user model, basic CRUD, use as default, instead of typing on every rent adding
###

- Register page: add confirm, show, forgot/reset password

![](https://i.stack.imgur.com/NjuC4.gif)

- Avatar choosing

![](https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2021/09/ps4-select-an-avatar.jpeg)

- Trophies achievements, additional awards and discounts

![](https://images.pushsquare.com/56b6e4b00c211/1280x720.jpg)




