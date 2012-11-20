;(function() {

	brite.registerView("TaskElementView", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			return $.when(app.TaskDao.get(data.task_id),app.TaskElementDao.list({match:{task_id:data.task_id}})).pipe(function(task,taskElement){
				return $("#tmpl-TaskElementView").render({task:task,taskElement:taskElement});
			});	
		},
		
		postDisplay: function(data, config){
			var view = this;
		 	var $e = view.$el;
		 	
		 	view.task_id = data.task_id;
		 	view.study_id = data.study_id;
		},
		
		events: {
			"btap; .btnBack": btnBackMethod, 
			
			"btap; .btnTaskElement": btnTaskElementMethod

		}

	});
	
	// --------- Event Methods --------- //
	function btnBackMethod(event){
		var view = this;
		brite.display("TaskView",null,{study_id:view.study_id});
	}
	
	function btnTaskElementMethod(event){
		var view = this;
		brite.display("ElementView",null,{task_id:view.task_id,study_id:view.study_id});
	}
	// --------- /Event Methods --------- //
	

})();
