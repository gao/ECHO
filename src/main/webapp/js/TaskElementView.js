;(function() {

	brite.registerView("TaskElementView", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			return $.when(app.TaskDao.get(data.taskId)).pipe(function(task){
				return $("#tmpl-TaskElementView").render(task);
			});	
		},
		
		postDisplay: function(data, config){
			var view = this;
		 	var $e = view.$el;
		 	
		 	view.taskId = data.taskId;
		 	view.studytId = data.studytId;
		},
		
		events: {
			"btap; .btnBack": btnBackMethod, 
			
			"btap; .btnTaskElement": btnTaskElementMethod

		}

	});
	
	// --------- Event Methods --------- //
	function btnBackMethod(event){
		var view = this;
		brite.display("TaskView",null,{studytId:view.studytId});
	}
	
	function btnTaskElementMethod(event){
		var view = this;
		brite.display("TaskElementCreate",null,{taskId:view.taskId});
	}
	// --------- /Event Methods --------- //
	

})();
