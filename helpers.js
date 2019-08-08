import {Roles} from './roles';
import {Template} from 'meteor/templating';

Template.registerHelper('currentUserIsInRole', function (rolesAsString, property) {
    const roles = rolesAsString.split(',');

    return Roles.loggedInUserIsInRole(roles, property);
});
