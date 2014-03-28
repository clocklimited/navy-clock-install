# Clock Install Order

This is an Order which is used by [Captains](http://github.com/microadam/navy-captain) as part of the Navy deployment suite.

It does the following actions:

* Symlink the application build directory to its final location
* Generate upstart scripts for the applications services
* Run the [Restart](http://github.com/clocklimited/navy-clock-restart) order on this captain

This order assumes that the following configuration keys have been added to the [Admiral](http://github.com/microadam/navy-admiral) for the application you are trying to prepare:

* buildDir: Location of the directory containing your applications build directory
* services: Object containing thes services that this application has. The key forms the suffix of the name of the upstart jobs e.g node-myproject-staging-<-service->. The value is the relative path to the start script of the service

An example [Admiral](http://github.com/microadam/navy-admiral) application configuration might look like:

    { "name": "My Application"
    , "appId": "myApp"
    , "buildDir": "/tmp/build"
    , "nodeVersion": "0.10.22"
    , "services":
      { "admin": "admin/app.js"
      , "site": "site/app.js"
      , "api": "api/app.js"
      , "message-bus": "message-bus.js"
      }
    }
