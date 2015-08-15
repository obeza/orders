app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.commandes', {
    url: '/commandes/:statut',
    views: {
      'menuContent': {
        templateUrl: 'comp/commandes/commandes-tpl.html',
        controller: 'commandesCtrl'
      }
    }
  })
  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'comp/login/login-tpl.html',
        controller: 'loginCtrl'
      }
    }
  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
