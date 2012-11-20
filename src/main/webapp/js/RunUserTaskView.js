(function() {

	brite.registerView("RunUserTaskView", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			var view = this;
			var index = data.task_index || 0;
			return $.when(app.StudyDao.get(data.study_id),app.TaskDao.getTasksByStudy(data.study_id)).pipe(function(study,tasks){
				var hasTask = tasks.length > 0 ? true : false;
				view.task = tasks[index];
				return $("#tmpl-RunUserTaskView").render({study:study,task:tasks[index],hasTask:hasTask});
			});
		},
		
		postDisplay: function(data, config){
			var view = this;
		 	var $e = view.$el;
		 	
			view.study_id = data.study_id;
			view.user_id = data.user_id;
			view.task_index = data.task_index || 0;
		},
		
		events: {
			
			"btap; .btnCreateTask": btnCreateTaskMethod ,
			
			"btap; .result-content .btn": btnRatingSelectedMethod ,
			
			"btap; .btnNext": btnNextMethod 
			
		}

	});
	
	// --------- Event Methods --------- //
	function btnCreateTaskMethod(){
		var view = this;
		brite.display("TaskCreate",null,{study_id:view.study_id});
	}
	
	function btnRatingSelectedMethod(event){
		var $thisBtn = $(event.currentTarget);
		$thisBtn.addClass("selected").siblings().removeClass("selected");
	}
	
	function btnNextMethod(){
		var view = this;
		var $e = view.$el;
		var $result_content = $e.find(".task-content .result-content");
		var answer = {task_id:view.task.id, user_id:view.user_id};
		if(view.task.questionType == "string"){
			answer.result = $result_content.find("textarea[name='answer']").val();
		}else if(view.task.questionType == "true-false"){
			answer.result = $result_content.find("button.selected").attr("data-val");
		}else if(view.task.questionType == "rating-5points"){
			answer.result = $result_content.find("button.selected").attr("data-val");
		}else if(view.task.questionType == "rating-10points"){
			answer.result = $result_content.find("button.selected").attr("data-val");
		}
		
		app.AnswerDao.create(answer).done(function(answer) {
			brite.display("RunUserTaskView",null,{study_id:view.study_id, user_id:view.user_id, task_index:view.task_index+1});
		});
	}
	// --------- /Event Methods --------- //
	

})();
