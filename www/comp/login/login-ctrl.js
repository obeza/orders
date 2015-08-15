app.controller('loginCtrl', ['$scope', 'urlService', 'etabService', '$http', '$ionicLoading', '$state', function ($scope, urlService, etabService, $http, $ionicLoading, $state) {
	
	$scope.form = {};

	$scope.connecter = function(){
		$ionicLoading.show();
		$scope.form.etab = etabService.id;
		$http.post( urlService.api + 'app/order/conn', $scope.form ).
		  success(function(data, status, headers, config) {
		    console.table(data);
		    $ionicLoading.hide();
		    localStorage.auth_token = data.token;
		    $state.go('app.commandes', {statut : 'toutes'})
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.table(data);
		    $ionicLoading.hide();
		    //alert('impossible de se connecter sur le serveur...');
		  });
	};
	
}]);