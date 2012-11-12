;(function() {

	brite.registerView("StudyCreate", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			var view = this;
			return $("#tmpl-StudyCreate").render({});
		},
		
		postDisplay: function(){
			var view = this;
		 	var $e = view.$el;
		},
		
		events: {
			"btap; .btnBackHome": btnBackHomeMethod, 
			
			"btap; .btnDetail": btnDetailMethod 
		}

	});
	
	// --------- Event Methods --------- //
	function btnBackHomeMethod(){
		brite.display("StudyView");
	}
	
	function btnDetailMethod(event){
		brite.display("DetailCreate");
	}
	// --------- /Event Methods --------- //
	

})();
