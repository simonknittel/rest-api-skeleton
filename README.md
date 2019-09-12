# rest-api-skeleton

[![Donate on patreon](https://badgen.net/badge/donate%20on/patreon/orange)](https://patreon.com/simonknittel)

_TODO: Add description_

## One-time setup

1. Update Homebrew: `brew update && brew upgrade`
2. Install the database (PostgreSQL) with Homebrew: `brew install postgres`
3. Create a database cluster for PostgreSQL: `initdb /usr/local/var/postgres`
4. Create a new database user: `/usr/local/opt/postgres/bin/createuser -s postgres`
5. Start the database: `pg_ctl -D /usr/local/var/postgres start`
6. Create a database with PostgreSQL: `createdb rest-api-skeleton`
7. Get the required Node.js version: `nvm install && nvm use`
8. Install dependencies: `npm install`
9. Install PM2: `npm install -g pm2`


## During development

1. Start the database:
```
pg_ctl -D /usr/local/var/postgres start
```
2. Start the application:
```
pm2 start --no-daemon

or

DB_HOST=localhost \
DB_USER=postgres \
DB_PASS= \
DB_NAME=rest-api-skeleton \
JWT_SECRET=secret \
ADMIN_LOGIN=admin \
ADMIN_PASS=admin \
TW_CONSUMER_KEY= \
TW_CONSUMER_SECRET= \
TW_ACCESS_TOKEN= \
TW_ACCESS_TOKEN_SECRET= \
FB_APP_ID= \
FB_APP_SECRET= \
npm start
```


## Other

* [pgAdmin](https://www.pgadmin.org/)
* Development database credentials:
  * Host: localhost:5432
  * User: postgres (defined during the setup in step 4)
  * Pass: _none_
  * Name: rest-api-skeleton (defined during the setup in step 6)

## 🎁 Support

_"Donations are not required but always appreciated."_

Like this quote implies, I won't stop make things open source, if there are no donations. But they would always be appreciated by me ❤

[![Become a patreon](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://patreon.com/simonknittel)


## ©️ License
Copyright 2019 Simon Knittel (<https://simonknittel.de>)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
