import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

/** A controler to handle role related stuff */
export const Roles = {
    availableRoleLabels: {},

   /**
     * The Roles that the app support
     * @member {string[]} Roles#availableRoles
     */
    availableRoles: [],


   /**
     * Configure roles
     *
     * @param {object} rolesWithLabels - object that contains roles associated with labels
     */
    config(rolesWithLabels) {
        check(rolesWithLabels, Object);

        for (let [key, value] in rolesWithLabels) {
            Roles.availableRoleLabels[key] = value;
            Roles.availableRoles.push(key);
        }
    },

   /**
     * @summary Check if user is in ANY of the provided roles.
     * @locus Anywhere
     *
     * @param {string|object} user - either the user id or the user instance
     * @param {string|string{}} roles - either a single role or an object of roles
     * @param {object} [mongoOptions] - an object to pass to mongo while retriving the user, if passed Roles.userIsInRole will return the user instance if the user has any of the provided roles
     * @return {boolean|object|null} if mongoOptions was provided it returns the user object or null depending on user has role or not, if mongoOptions was not provided it returns boolean value
     * @importFromFile
     */
    userIsInRole(user, roles, property, mongoOptions) {
        if (!user) {
            return false;
        }

        if (typeof roles == 'string') {
            roles = [roles];
        }

        if (typeof user == 'string') {
            //developer passed the user id
            let mongoSelector = {
                _id: user,
            };
            mongoSelector[`roles.${property}`] = {$in: roles};
            if (mongoOptions) {
                //developer specified that he want to get the user instance
                //useful when we will perform other things on the user
                return Meteor.users.findOne(mongoSelector, mongoOptions);
            } else {
                return Meteor.users.find(mongoSelector, {limit: 1}).count() != 0;
            }
        } else {
            //developer passed the user instance
            if (user && Array.isArray(user.roles[`${property}`])) {
                for (let i = 0;i < roles.length;++i) {
                    if (user.roles[`${property}`].indexOf(roles[i]) != -1) {
                        return true;
                    }
                }
            } else {
                throw new Meteor.Error(500, 'Expecting user id or user instance with roles array');
            }

            return false;
        }
    },
    /**
     * @summary Check if logged in user is in ANY of the provided roles.
     * @locus Anywhere
     *
     * @param {string|string{}} roles - either a single role or an object of roles
     * @param {object} [mongoOptions] - an object to pass to mongo while retriving the user, if passed Roles.userIsInRole will return the user instance if the user has any of the provided roles
     * @return {boolean|object|null} if mongoOptions was provided it returns the user object or null depending on user has role or not, if mongoOptions was not provided it returns boolean value
     * @importFromFile
     */
    loggedInUserIsInRole(roles, property, mongoOptions) {
        return this.userIsInRole(Meteor.userId(), roles, property, mongoOptions);
    }
};
