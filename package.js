Package.describe({
  name: 'perfectsofttunisia:roles-users',
  version: '1.0.1',
  summary: 'Carefully Designed roles package for meteor',
  git: 'git@github.com:benbahrikhawla/roles.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.8.1');
  api.use(['ecmascript', 'accounts-base', 'check']);
  
  api.addFiles('helpers.js', 'client');
  api.mainModule('roles.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('perfectsofttunisia:roles-users');
  api.mainModule('roles-users-tests.js');
});
