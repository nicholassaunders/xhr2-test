# xhr2-test
Monkey-patch the xhr2 library for testing.

If you are using xhr2 to test your AJAX code in a Node context, then this tool might be for you. It allows you to add an
arbitrary prefix to any URL requested by xhr2. Most likely, you would use this to forward all requests to a test server
that provides a known response for a given request.

For example, if your code makes a request to https://api.foo.ly/bar, you can run ```xhr2-test http://localhost:8080/```
to send the request to http://localhost:8080/https://api.foo.ly/bar instead.
