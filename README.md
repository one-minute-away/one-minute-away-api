# one-minute-away-api  

[![Build Status](https://travis-ci.org/one-minute-away/one-minute-away-api.svg?branch=dev)](https://travis-ci.org/one-minute-away/one-minute-away-api)


#### Create User
POST json to /signup with object
```
{
"username":"exampleusername"
"phoneNumber":"55512345678"
"password":"examplepassword"
"email":"user@example.com"
}
```
will return token and user id to be used for future requests

#### Authenticate user
GET request to /signin (use basic auth)

will return token and user id to be used for future requests

#### After Authentication
Use token in headers
```
token:[token]
```

#### Find stops
in order to set an alert you must first find your stop and route with a GET request to /transit/findstops with an address as query string
```
/transit/findstops/2245+Eastlake+Ave+E,+Seattle,+WA
```
from return object determine your route_id and stop_id (example 1_100264 and 1_9200)


### Save Route
POST json to /user/[user_id]/routes will save a route
````
{
"nickname":"Home to Work",
"route_id":"1_100264",
"stop_id":"1_9200"
}
````
#### List routes
GET request will return all routes a user has saved
```
/user/[userid]/routes
```

#### Create Alert
POST json to /user/[user_id]/alert
with your route id and time in seconds
```
{
routeId: 'dsauf89dsf70example'
leadTime: '300'
}
```
