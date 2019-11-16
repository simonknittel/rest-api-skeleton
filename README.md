# rest-api-skeleton

[![Donate on patreon](https://badgen.net/badge/donate%20on/patreon/orange)](https://patreon.com/simonknittel)

This is a project template/skeleton for creating a dockerized REST API with [Express](https://expressjs.com/). It already got most of the usual features like user managament already integrated. I tried to not hide or _over-engineer_ stuff so that individual features can be easily stripped out or added. The API itself is located in the [api](./api) directory and the main part of this repository. I also decided to add a sample web interface with the most usual administration operations, located in the [admin_web_interface](./admin_web_interface) directory, so that you can quickly start hacking and have some examples. Since it's connected via the REST API and dockerized, it could be easily switched out with your own interface.

**Disclaimer:** This project is not intended as a well maintained and stable open source project. It's mostly for my own learning and experimentation with new technologies. Therefore I can't ensure that it can be used anytime and anywhere without issues. Still I'm looking for your feedback and opinions.

## Features

* Fully dockerized
* User managament
    * Signup
    * Login/logut
    * Email verification
    * Password reset
    * Email change
    * Permission roles and invidiual whitelisted or blacklisted permissions
    * Sessions are handled via session ID's stored in cookies
    * For each session the user agent, if transmitted, and the time the user has been last seen is saved in the database
* Method and middleware to require specific permissions
* Uses Mailgun as email service
* Runs a PostgreSQL database and uses Sequelize as ORM
* Users can reset their passwords
* Sample web interface for administration

## Local development

### API

1. Install Docker
2. Run `docker-compose up --build database api` to build and start the containers locally

### Admin web interface

1. Go to the [admin_web_interface](./admin_web_interface) directory
2. Run `nvm use` (or manually install the Node.js version specified in `.nvmrc`)
3. Run `npm install`
4. Run `npm run serve`

## Manual deployment to Google Cloud

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
6. On the first deployment the api container/service will fail to boot up because of the missing environmental variables and missing database.
    1. Set up a PostgreSQL database with Cloud SQL.
    2. Deploy a new revision of the api service with the database connected and the environmental variables added (see [.env.production](./.env.production) as reference)

## License

Copyright 2019 Simon Knittel (<https://simonknittel.de>)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
