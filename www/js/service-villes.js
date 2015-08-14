app.factory('villesService', [function () {
	
	var martinique = [ 
			{ "nom":"Basse-Pointe"},
			{ "nom":"Bellefontaine"},
			{ "nom":"Case-Pilote"},
			{ "nom":"Ducos"},			
			{ "nom":"Fonds-Saint-Denis"},
			{ "nom":"Fort-de-France" },
			{ "nom":"Grand'Rivière"},
			{ "nom":"Gros-Morne"},
			{ "nom":"L'Ajoupa-Bouillon"},
			{ "nom":"Le Carbet"},
			{ "nom":"Le Diamant"}, 
			{ "nom":"La Trinité"},
			{ "nom":"Le François"}, 
			{ "nom":"Le Lamentin" },
			{ "nom":"Le Lorrain"},
			{ "nom":"Le Marin"},
			{ "nom":"Le Marigot"},
			{ "nom":"Le Morne-Rouge"},
			{ "nom":"Le Morne-Vert"},
			{ "nom":"Le Prêcheur"},
			{ "nom":"Le Robert" },
			{ "nom":"Le Vauclin"},
			{ "nom":"Les Anses-d'Arlet"},
			{ "nom":"Les Trois-Îlets"},
			{ "nom":"Macouba"},
			{ "nom":"Rivière-Pilote" },
			{ "nom":"Rivière-Salée"}, 
			{ "nom":"Sainte-Anne"},
			{ "nom":"Saint-Esprit"},
			{ "nom":"Saint-Pierre"}, 
			{ "nom":"Saint-Joseph "},
			{ "nom":"Sainte-Luce"},
			{ "nom":"Sainte-Marie" }, 
			{ "nom":"Schoelcher " }		
		];	

	return {
		martinique : function(i){
			var index = i - 1;
			return martinique[index];
		}
	};
}])