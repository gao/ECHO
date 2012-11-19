;(function() {

	brite.registerView("TaskElementCreate", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			var view = this;
			var type = data.type;
			return $("#tmpl-TaskElementCreate").render({type:type});
		},
		
		postDisplay: function(data, config){
			var view = this;
		 	var $e = view.$el;
		 	
		 	view.task_id = data.task_id;
		 	view.type = data.type;
		},
		
		events: {
			"btap; .btnBack": btnBackMethod

		}

	});
	
	// --------- Event Methods --------- //
	function btnBackMethod(event){
		var view = this;
		brite.display("TaskElementView",null,{task_id:view.task_id});
	}
	// --------- /Event Methods --------- //
	

})();
