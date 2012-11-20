(function() {

	brite.registerView("RunUserTaskView", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			var view = this;
			var index = data.task_index || 0;
			var innerDfd = $.Deferred();
			var createDfd = $.Deferred();
			
			$.when(app.StudyDao.get(data.study_id),app.TaskDao.getTasksByStudy(data.study_id)).done(function(study,tasks){
				var hasTask = tasks.length > 0 ? true : false;
				var obj = {study:study,hasTask:hasTask};
				obj.hasNext = ((index+2) <= tasks.length);
				obj.hasPrevious = (index > 0);
				obj.hasSubmit = ((index+1) == tasks.length);
				if(hasTask){
					obj.task = view.task = tasks[index];
					app.AnswerDao.list({match:{task_id:view.task.id,user_id:data.user_id}}).done(function(answers){
						if(answers.length>0) obj.answer = view.answer = answers[0];
						innerDfd.resolve(obj);
					});
				}else{
					innerDfd.resolve(obj);
				}
			});
			
			innerDfd.done(function(obj){
				var html = $("#tmpl-RunUserTaskView").render(obj);
				return createDfd.resolve(html);
			});
			
			return createDfd.promise();
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
			
			"btap; .btnNext": btnNextMethod ,
			
			"btap; .btnPrevious": btnPreviousMethod ,
			
			"btap; .btnSubmit": btnSubmitMethod 
			
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
		saveOrUpdateAnswer.call(view).done(function(answer){
			brite.display("RunUserTaskView",null,{study_id:view.study_id, user_id:view.user_id, task_index:view.task_index+1});
		});
	}
	
	function btnPreviousMethod(){
		var view = this;
		saveOrUpdateAnswer.call(view).done(function(answer){
			brite.display("RunUserTaskView",null,{study_id:view.study_id, user_id:view.user_id, task_index:view.task_index-1});
		});
	}
	
	function btnPreviousMethod(){
		var view = this;
		saveOrUpdateAnswer.call(view).done(function(answer){
			//submit code...
		});
	}
	// --------- /Event Methods --------- //
	
	
	// --------- private Methods --------- //
	function saveOrUpdateAnswer(){
		var view = this;
		var $e = view.$el;
		
		var dfd = $.Deferred();
		var $result_content = $e.find(".task-content .result-content");
		var answer = view.answer;
		if(!view.answer){
			answer = {task_id:view.task.id, user_id:view.user_id};
		}
		if(view.task.questionType == "string"){
			answer.result = $result_content.find("textarea[name='answer']").val();
		}else if(view.task.questionType == "true-false"){
			answer.result = $result_content.find("button.selected").attr("data-val");
		}else if(view.task.questionType == "rating-5points"){
			answer.result = $result_content.find("button.selected").attr("data-val");
		}else if(view.task.questionType == "rating-10points"){
			answer.result = $result_content.find("button.selected").attr("data-val");
		}
		if(answer.id){
			app.AnswerDao.update(answer).done(function(answer) {
				dfd.resolve(answer);
			});
		}else{
			app.AnswerDao.create(answer).done(function(answer) {
				dfd.resolve(answer);
			});
		}
		
		return dfd.promise();
	}
	
	// --------- /private Methods --------- //
	

})();
