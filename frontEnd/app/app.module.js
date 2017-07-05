angular.module("secretMail", ['ngRoute'])
	.config(function($routeProvider) {
		$routeProvider
			// pagina de login
			.when('/login', {
				templateUrl : 'app/telas/login.html'
			})
			// pagina inicial
      .when('/home', {
				templateUrl : 'app/telas/home.html'
			})
			.otherwise({
				redirectTo: '/home'
			});
	});
