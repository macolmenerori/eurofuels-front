# eurofuels-front

This is the frontend part of [eurofuels-back](https://github.com/macolmenerori/eurofuels-back), check first that repo.

## What's this project about

_eurofuels_ is an improved version of [eurocombustibles](https://github.com/macolmenerori/eurocombustibles), being this the frontend part.

Retrieve the fuel prices data from the [EU Weekly Oil Bulletin](https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en), store them on an AWS S3 bucket and display it on a webpage.

For retrieving the data, an AWS Lambda function will be used, which will store the data (as a JSON file) on an AWS S3 bucket. The lambda will run periodically triggered by an AWS EventBridge (by CloudWatch) event.

## How to set up the project

Before setting up eurofuels-front, [eurofuels-back](https://github.com/macolmenerori/eurofuels-back) must be set up first. Intructions on how to set it up are detailed on that repo.

Once eurofuels-back has been set up, add the URL of the stored JSON to the `index.html` file

```
var urlJSON = "<INSERT_URL_HERE>";
```

## Check out the implementation

This frontend part of this little project has been implemented on [my personal web page](https://miguelangelcolmenero.es/projects/eurofuels), check it out there.
