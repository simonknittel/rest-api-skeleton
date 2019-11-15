# rest-api-skeleton

[![Donate on patreon](https://badgen.net/badge/donate%20on/patreon/orange)](https://patreon.com/simonknittel)

_TODO: Add description_

## Features

* Most things are structured in a way that they can be easily stripped out if not needed
* Users can signup an account with email and password
* Users have to verify their email to be able to log in
* Users can log in and log out
* Users can get a permission role assigned
* Individual routes can be secured with permission roles
* Users can get individual permissions whitelisted or blacklisted overwriting the permission role
* Uses Mailgun as email service
* Runs a PostgreSQL database and uses Sequelize as ORM
* Sessions are handled via session ID's stored in cookies
* For each session the user agent, if transmitted, and the time the user has been last seen is saved in the database
* Fully dockerized
* Users can reset their passwords
* Web interface for admins

## Local development

### API

1. Install Docker
2. Run `docker-compose up database api --build` to build and start the containers locally

### Admin web interface

1. Go to the `admin_web_interface` directory
2. Run `nvm use` (or manually install the Node.js version specified in `.nvmrc`)
3. Run `npm install`
4. Run `npm run serve`

## Manual deployment to Google Cloud

_TODO: Cloud SQL, Environmental variables, Cloud Run settings, ..._

1. Build the admin web interface from within the `admin_web_interface` directory: `npm run build`
2. Build images locally:
    * `docker-compose build api admin_web_interface`
3. Tag local images:
   * `docker tag rest-api-skeleton_api eu.gcr.io/rest-api-skeleton/api`
   * `docker tag rest-api-skeleton_admin_web_interface eu.gcr.io/rest-api-skeleton/admin_web_interface`
4. Push local images to Gcloud's Container Registry:
    * `docker push eu.gcr.io/rest-api-skeleton/api`
    * `docker push eu.gcr.io/rest-api-skeleton/admin_web_interface`
5. Deploy Cloud Run Services:
    * `gcloud beta run deploy --image eu.gcr.io/rest-api-skeleton/api --platform managed --region europe-west1 --max-instances 1`
    * `gcloud beta run deploy --image eu.gcr.io/rest-api-skeleton/admin_web_interface --platform managed --region europe-west1 --max-instances 1`

## Support

_"Donations are not required but always appreciated."_

Like this quote implies, I won't stop make things open source, if there are no donations. But they would always be appreciated by me ❤

[![Become a patreon](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://patreon.com/simonknittel)


## License
Copyright 2019 Simon Knittel (<https://simonknittel.de>)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
