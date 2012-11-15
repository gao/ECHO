;(function() {

	brite.registerView("TaskView", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			return $.when(app.TaskDao.getTasksByStudy(data.studytId)).pipe(function(taskList){
				return $("#tmpl-TaskView").render({tasks:taskList});
			});	
		},
		
		postDisplay: function(data, config){
			var view = this;
		 	var $e = view.$el;
		 	
		 	view.studytId = data.studytId;
		},
		
		events: {
			"btap; .btnTask": btnTaskMethod,
			
			"btap; .taskPart": taskPartMethod,
		}

	});
	
	// --------- Event Methods --------- //
	function btnTaskMethod(event){
		var view = this;
		brite.display("TaskCreate",null,{studytId:view.studytId});
	}
	
	function taskPartMethod(event){
		var view = this;
		var $taskPart = $(event.currentTarget);
		var taskId = $taskPart.bEntity("Task").id;
		brite.display("TaskElementView",null,{taskId:taskId,studytId:view.studytId});
	}
	// --------- /Event Methods --------- //
	

})();
