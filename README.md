# Clock Install Order

This is an Order which is used by [Captains](http://github.com/microadam/navy-captain) as part of the Navy deployment suite.

It does the following actions:

* Symlink the application build directory to its final location
* Run the [Restart](http://github.com/clocklimited/navy-clock-restart) order on this captain

This order assumes that the following configuration keys have been added to the [Admiral](http://github.com/microadam/navy-admiral) for the application you are trying to prepare:

* buildDir: Location of the directory containing your applications build directory
* services: Array of services that this application has. These form the suffix of the name of the upstart jobs e.g node-myproject-staging-<-service->

An example [Admiral](http://github.com/microadam/navy-admiral) application configuration might look like:

    { name: 'My Application'
    , appId: 'myApp'
    , buildDir: '/tmp/build'
    , services: [ 'admin', 'api', 'site' ]
    }
