# Transient Specialists Inventory

This is the React front end for the inventory management system for Transient Specialists.

## Development

The app can be run locally with `npm start`. The application will link to the development API Gateway, Lambdas, and Postgres RDS on AWS.

The app's tests can be run with `npm test`.

Note that local setups will not work without a `.env` file with all required variables. All infrastructure other than the Amplify sites is controlled by terraform in the [Transient Specialists AWS Lambda](https://github.com/pitrak1/transient-specialists-aws-lambda) repository. If resources are destroyed and recreated in the process of development, the ARNs and endpoints in the variables in `.env` may change. In addition to correcting those variables here, they also will need to be corrected in the corresponding Amplify site's environment variables.

## Deployment

The app's development and production environments each have an AWS Amplify site that is linked to the Github repository. The development site is linked to the `master` branch, and the production site is linked to the `prod` branch. Pushing to these branches will automatically deploy to the site.

## Documents

In the `/docs` folder are some helpful SQL queries to use (hopefully only on the production database).

## Scripts

In the `/bin` folder are the bash scripts used to transfer data from the old Azure database (in addition to changing some columns and formats) to the new Postgres RDS database. I doubt they'll be of any use once data is migrated, but I'll keep them there for posterity.

## TODO

- Figure out why React Router is not allowing direct browsing to non-root paths
- Spin up a separate development environment in the AWS Lambda repo
- Create a dev Amplify site
- Minimize column width for button columns in tables
- Consider truncating notes fields when used in tables
