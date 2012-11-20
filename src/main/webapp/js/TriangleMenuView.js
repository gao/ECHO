;(function() {

	brite.registerView("TriangleMenuView", {
		loadTmpl : true,
		parent : "#bodyPage"
	}, {
		create : function(data, config) {
			var view = this;
			return $.when(app.TaskDao.get(data.task_id)).pipe(function(task,taskElement){
				view.$screen = $("<div class='notTransparentScreen'></div>").appendTo("#bodyPage");
				return $("#tmpl-TriangleMenuView").render(task);
			});	
		},
		
		postDisplay: function(data, config){
			var view = this;
		 	var $e = view.$el;
		 	
		 	view.task_id = data.task_id;
		 	view.study_id = data.study_id;
		},
		
		events: {
			"btap; li": TriangleMenuMethod
		},
		
		close : function(update) {
			var view = this;
			var $e = view.$el;

			$e.bRemove();
			view.$screen.remove();
		},

	});
	
	// --------- Event Methods --------- //
	function TriangleMenuMethod(event){
		var view = this;
		var $e = view.$el;
		var $li = $(event.currentTarget);
		var type = $li.attr("data-entity");
		
		if(type == "CommonView"){
			app.TaskDao.get(view.task_id).done(function(task){
				task.isModeratorView = false;
				app.TaskDao.update(task).done(function(obj) {
					view.close();
					brite.display("TaskElementView",null,{task_id:view.task_id,study_id:view.study_id});
				});
			});	
		}else if(type == "ModeratorView"){
			app.TaskDao.get(view.task_id).done(function(task){
				task.isModeratorView = true;
				app.TaskDao.update(task).done(function(obj) {
					view.close();
					brite.display("TaskElementView",null,{task_id:view.task_id,study_id:view.study_id});
				});
			});
		}else{
			view.close();
		}
		
	}	
	// --------- /Event Methods --------- //
	

})();
