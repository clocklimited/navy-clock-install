# Clock Install Order

This is an Order which is used by [Captains](http://github.com/microadam/navy-captain) as part of the Navy deployment suite.

It does the following actions:

* Symlink the application build directory to its final location
* Restart the applications services

This order assumes that the following configuration keys have been added to the [Admiral](http://github.com/microadam/navy-admiral) for the application you are trying to prepare:

* buildDir: Location of the directory containing your applications build directory

An example [Admiral](http://github.com/microadam/navy-admiral) application configuration might look like:

    { name: 'My Application'
    , appId: 'myApp'
    , buildDir: '/tmp/build'
    }
