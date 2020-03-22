# rest-api-skeleton

[![Donate on patreon](https://badgen.net/badge/donate%20on/patreon/orange)](https://patreon.com/simonknittel)

This is a project template/skeleton for creating a dockerized REST API with [Express](https://expressjs.com/). It already got most of the usual features like user managament already integrated. I tried to not hide or _over-engineer_ stuff so that individual features can be easily stripped out or added. The API itself is located in the [api](./api) directory and the main part of this repository. I also decided to add a sample web interface with the most usual administration operations, located in the [admin_web_interface](./admin_web_interface) directory, so that you can quickly start hacking and have some examples. Since it's connected via the REST API and dockerized, it could be easily switched out with your own interface.

**Disclaimer:** This project is not intended as a well maintained and stable open source project. It's mostly for my own learning and experimentation with new technologies. Therefore I can't ensure that it can be used anytime and anywhere without issues. Still I'm looking for your feedback and opinions.

## Features

* Fully dockerized
* User managament
    * Signup/login/logout
    * Email verification and email change
    * Password reset
    * Permission roles and invidiual whitelisted or blacklisted permissions
    * Sessions are handled via session ID's stored in cookies
    * For each session the user agent, if transmitted, and the time the user has been last seen is saved in the database
* Method and middleware to require specific permissions
* Uses Mailgun as email service
* Runs a PostgreSQL database and uses Sequelize as ORM
* Users can reset their passwords
* Sample web interface for administration
* Postman collection & environment (located in the [postman](./api/rest/postman) directory)

## Local development

### REST API

1. Install Docker
2. Run `docker-compose up --build database rest` to build and start the containers locally

### Admin web interface

1. Go to the [admin_web_interface](./admin_web_interface) directory
2. Run `nvm use` (or manually install the Node.js version specified in the [.nvmrc](./api/rest/.nvmrc))
3. Run `npm install`
4. Run `npm run serve`

## Manual deployment to Google Cloud

### REST API

1. Build image locally:
    * `docker-compose build rest`
2. Tag local image:
   * `docker tag rest-api-skeleton_api eu.gcr.io/rest-api-skeleton/api/rest`
3. Push local image to Google Cloud Container Registry:
    * `docker push eu.gcr.io/rest-api-skeleton/api/rest`
4. Deploy Cloud Run Service:
    * `gcloud beta run deploy --image eu.gcr.io/rest-api-skeleton/api/rest --platform managed --region europe-west1`
5. On the first deployment the api container/service will fail to boot up because of the missing environmental variables and missing database.
    1. Set up a PostgreSQL database with Cloud SQL.
    2. Deploy a new revision of the api service with the database connected and the environmental variables added (see [.env.production](./api/rest/.env.production) as reference)

### Admin web interface

1. Build the admin web interface from within the `admin_web_interface` directory: `npm run build`
2. Build image locally:
    * `docker-compose build admin_web_interface`
3. Tag local image:
   * `docker tag rest-api-skeleton_admin_web_interface eu.gcr.io/rest-api-skeleton/admin_web_interface`
4. Push local image to Google Cloud Container Registry:
    * `docker push eu.gcr.io/rest-api-skeleton/admin_web_interface`
5. Deploy Cloud Run Service:
    * `gcloud beta run deploy --image eu.gcr.io/rest-api-skeleton/admin_web_interface --platform managed --region europe-west1`

## License

MIT (see the [LICENSE file](./LICENSE))
