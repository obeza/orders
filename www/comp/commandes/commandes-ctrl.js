app.controller('commandesCtrl', ['$scope', '$http', '$ionicModal', '$ionicLoading', 'villesService', '$stateParams', 'etabService', '$state', function ($scope, $http, $ionicModal, $ionicLoading, villesService, $stateParams, etabService, $state) {
	
	var indexSelect;
	$scope.statut = $stateParams.statut;
	if ($scope.statut !== 'toutes') {
		$scope.statut = $scope.statut -1;
	}
	$scope.titres = [
		'A capturer' ,
		'Validées',
		'En cours' ,
		'En livraison' 
	];
	$scope.titres['toutes'] = 'Toutes les commandes';

	$scope.barColor = [
		'bar-energized',
		'bar-balanced',
		'bar-positive',
		'bar-calm'
	];
	$scope.barColor['toutes'] = 'bar-stable';

	$scope.pastilles = [];
	$scope.navigation = [];
	$scope.navigation[$scope.statut] = true;
	$scope.data = [];
	$scope.tailles = {
		"prix1" : "petite",
		"prix2" : "moyenne",
		"prix3" : "grande"
	};

	var urlStatut = $scope.statut=='toutes' ? 'toutes' : $scope.statut+1;
	
	var url = 'http://fdacentral.com/api/pizza-service/app/order/etab/' + etabService.id + '/commandes/statut/' + urlStatut;

	//console.log("url " + url);
	$ionicLoading.show('Chargement...');

	$http.get( url ).
	  success(function(data, status, headers, config) {
	    // this callback will be called asynchronously
	    // when the response is available
	    $ionicLoading.hide();
	    
	    $scope.datas = data.data;
	    $scope.pastilles = data.pastilles;

	    //console.log('data suce ' + JSON.stringify($scope.datas));
	  }).
	  error(function(data, status, headers, config) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    //alert('data ' + data);
	    $ionicLoading.hide();
	    //alert('impossible de se connecter sur le serveur...');
	  });
	
	$ionicModal.fromTemplateUrl('templates/modal-article.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	}).then(function(modal) {
	    $scope.modal = modal;
	});

	$scope.voir = function(index) {
		// on stock l'index de la data qu'on affiche
		// pour pouvoir l'utiliser plus tard
		// selon le choix sélectionné
		indexSelect = index;
		$scope.data = $scope.datas[index];
		$scope.articles = JSON.parse($scope.data.details);
    	$scope.modal.show();
  	};

  	$scope.fermerModal = function(){
  		$scope.modal.hide();
  	};

  	// format le temps donnée par le json en temps javascript
  	$scope.dateJav = function(dt){
  		var dtFor = new Date(dt);
  		return dtFor;
  	};

  	// on va chercher dans le service les infos sur les villes
  	// les id utilisés pour les villes commence à 1
  	$scope.ville = function(v){
  		var villeId = v;
  		return villesService.martinique(villeId);
  	}

  	$scope.statutService = function (commandeId, statutMaj){

  		var url = 'http://fdacentral.com/api/pizza-service/app/order/etab/' + etabService.id + '/commande';

  		var data = {
  			commandeId : commandeId,
  			statutMaj : statutMaj
  		};

  		$http.post( url, data ).
		  success(function(data, status, headers, config) {
		    // this callback will be called asynchronously
		    // when the response is available
		    $ionicLoading.hide();
		    $scope.modal.hide();
		    
		    //console.log('msg ' + data.msg);

		    if ($stateParams.statut!=='toutes'){
		    	$scope.datas.splice(indexSelect, 1);
		    }
				
	  		$scope.pastilles[statutMaj] =$scope.pastilles[statutMaj] - 1;
		  	$scope.pastilles[statutMaj+1] =$scope.pastilles[statutMaj+1] + 1;

		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    //alert('data ' + data);
		    $ionicLoading.hide();
		    //console.log('msg ' + data.msg);
		    //
		    alert('impossible de se connecter sur le serveur...');
		  });

  	}

  	// force à recharger page active
  	$scope.charge = function(){
  		console.log("msg");
  		$state.go('app.commandes', { statut : 1}, { reload: true });
  	}


}])