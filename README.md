# Zestimator

The Zestimator will return an estimated value of a given property.

## Purpose
The purpose of this repo was to practice using [snowpack](https://www.npmjs.com/package/snowpack), [react-final-form](https://www.npmjs.com/package/react-final-form), and an [express](https://www.npmjs.com/package/express) proxy.

## Configuration
In order to use the Zestimator you must have a [Zillow API key](https://www.zillow.com/howto/api/APIOverview.htm), although recent attempts to query Zillow's API using newly created keys have resulted in authorization errors...

## Get Started
1. clone the repo
2. create an environment variable with your [Zillow API key](https://www.zillow.com/howto/api/APIOverview.htm) in your bash profile as `ZILLOW_API_KEY="your_zillow_api_key"` 
3. run `npm i` in the root of the project
4. run `npm run start-ui` in one terminal window
5. run `npm run start-api` in another terminal window
6. navigate to http://localhost:8080 or wherever else frontend is being served