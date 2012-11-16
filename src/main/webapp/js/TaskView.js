;(function() {

	brite.registerView("TaskView", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			return $.when(app.TaskDao.getTasksByStudy(data.study_id)).pipe(function(taskList){
				return $("#tmpl-TaskView").render({tasks:taskList});
			});	
		},
		
		postDisplay: function(data, config){
			var view = this;
		 	var $e = view.$el;
		 	
		 	view.study_id = data.study_id;
		},
		
		events: {
			"btap; .btnTask": btnTaskMethod,
			
			"btap; .taskPart": taskPartMethod,
		}

	});
	
	// --------- Event Methods --------- //
	function btnTaskMethod(event){
		var view = this;
		brite.display("TaskCreate",null,{study_id:view.study_id});
	}
	
	function taskPartMethod(event){
		var view = this;
		var $taskPart = $(event.currentTarget);
		var task_id = $taskPart.bEntity("Task").id;
		brite.display("TaskElementView",null,{task_id:task_id,study_id:view.study_id});
	}
	// --------- /Event Methods --------- //
	

})();
