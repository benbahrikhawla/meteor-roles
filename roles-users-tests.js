// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by roles-users.js.
import { name as packageName } from "meteor/perfectsofttunisia:roles-users";

// Write your tests here!
// Here is an example.
Tinytest.add('roles-users - example', function (test) {
  test.equal(packageName, "roles-users");
});
