To set up a newly created function x:

1. Create a trigger with API Gateway choosing the existing API, the `default` deployment stage, and `Open` security (for the time being)
2. Set the handler to the particular file in the Lambda repo you want to call (ex: `createType.handler` for the `handler` function in `createType.js`).
3. Add environment variables from the `.env` file in this repo
4. In the API Gateway, delete the ANY method and add POST
5. Set up the new POST method to point to your Lambda function
6. On the endpoint itself, enable CORS
7. Write code in the filename you specified in step 2
8. Upload using `./bin/upload.sh`

Now you should be able to hit the endpoint specified in API Gateway

You can test the code itself by using a test case for the function.
