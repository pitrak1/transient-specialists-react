# Transient Specialists Inventory

This is the React front end for the inventory management system for Transient Specialists.

## Development

The app can be run locally with `npm start`. The application will link to the development API Gateway, Lambdas, and Postgres RDS on AWS.

The app's tests can be run with `npm test`.

Note that local setups will not work without a `.env` file with the `LAMBDA_ENDPOINT` and `LAMBDA_API_KEY` variables. All infrastructure other than the Amplify site is controlled by terraform in the [Transient Specialists AWS Lambda](https://github.com/pitrak1/transient-specialists-aws-lambda) repository. If resources are destroyed and recreated in the process of development, the ARNs and endpoints in the variables in `.env` may change. In addition to correcting those variables here, they also will need to be corrected in the Amplify site's environment variables.

## Deployment

The app has an AWS Amplify site linked to the Github repository's `master` branch. Pushing to this branch will automatically deploy to the site.

To be able to hit the API Gateway locally, you'll need to modify the `terraform.tfvars` file in the AWS Lambda repo, apply the terraform, and then deploy the API. It's okay to do temporarily. Every API Gateway endpoint still requires an API key.

## Documents

In the `/docs` folder are some helpful SQL queries to use (hopefully only on the production database).

## Scripts

In the `/bin` folder are the bash scripts used to transfer data from the old Azure database (in addition to changing some columns and formats) to the new Postgres RDS database. I doubt they'll be of any use once data is migrated, but I'll keep them there for posterity.

## TODO

- Figure out why React Router is not allowing direct browsing to non-root paths
