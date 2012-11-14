;(function() {

	brite.registerView("TaskCreate", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			return $("#tmpl-TaskCreate").render({});
		},
		
		postDisplay: function(data, config){
			var view = this;
		 	var $e = view.$el;
		 	
		 	view.studytId = data.id;
		},
		
		events: {
			"btap; .btnBack": btnBackMethod, 
		}

	});
	
	// --------- Event Methods --------- //
	function btnBackMethod(){
		var view = this;
		brite.display("TaskView",null,{id:view.studytId});
	}
	// --------- /Event Methods --------- //
	

})();
