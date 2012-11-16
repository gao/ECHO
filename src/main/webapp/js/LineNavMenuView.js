;(function() {

	brite.registerView("LineNavMenuView", {
		loadTmpl : true,
		parent : "#bodyPage"
	}, {
		create : function(data, config) {
			var view = this;
			return $.when(app.StudyDao.get(data.study_id)).pipe(function(study){
				view.$screen = $("<div class='notTransparentScreen'></div>").appendTo("#bodyPage");
				return $("#tmpl-LineNavMenuView").render(study);
			});	
		},
		
		postDisplay: function(data){
			var view = this;
		 	var $e = view.$el;
		 	
		 	view.study_id = data.study_id;
		},
		
		events: {	
			"btap; .btnDetail": btnDetailMethod,
			
			"btap; .btnTask": btnTaskMethod,
			
			"btap; .btnTestUser": btnTestUserMethod
		},
		
		close : function(update) {
			var view = this;
			var $e = view.$el;

			$e.bRemove();
			view.$screen.remove();
		},

	});
	
	// --------- Event Methods --------- //
	function btnDetailMethod(event){
		var view = this;
		brite.display("DetailCreate",null,{study_id:view.study_id});
		view.close();
	}
	
	function btnTaskMethod(event){
		var view = this;
		brite.display("TaskView",null,{study_id:view.study_id});
		view.close();
	}
	
	function btnTestUserMethod(event){
		var view = this;
		brite.display("TestUserView",null,{study_id:view.study_id});
		view.close();
	}
	// --------- /Event Methods --------- //
	

})();
