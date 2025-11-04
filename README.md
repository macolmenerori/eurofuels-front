# eurofuels-front

This is the frontend part of [eurofuels-back](https://github.com/macolmenerori/eurofuels-back), check first that repo.

## What's this project about

_eurofuels_ is an improved version of [eurocombustibles](https://github.com/macolmenerori/eurocombustibles), being this the frontend part.

Retrieve the fuel prices data from the [EU Weekly Oil Bulletin](https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en), store them on an AWS S3 bucket and display it on a webpage.

For retrieving the data, an AWS Lambda function will be used, which will store the data (as a JSON file) on an AWS S3 bucket. The lambda will run periodically triggered by an AWS EventBridge (by CloudWatch) event.

## Run locally

### Requirements

- Node JS `>=24.11.0`
- [PNPM](https://pnpm.io/installation) `>=10.12.1`

### Run

First, install the needed packages with

```bash
pnpm i
```

Then, start the app with

```bash
pnpm start
```

The app should be available in `localhost:3000`

## How to contribute

1. Clone the repo, create a branch and do the desired changes
2. Open a PR and wait for review

Before creating the PR ensure to run the command `pnpm verify` to perform some basic checks.

## How to dockerize

A Dockerfile is provided to build an image and create a container out of it.

The image can be generated with

```bash
docker build -t miancolrin/eurofuels-front .
```

And then the container can be created and run with

```bash
docker run -p 80:80 --name eurofuels-front  miancolrin/eurofuels-front
```

## How to run tests

### Jest test

```bash
pnpm test
pnpm test <TEST_FILE_NAME>
```

## Check out the implementation

This frontend part of this little project has been implemented on [this webpage](https://eurofuels.miguelangelcolmenero.es), check it out there.
