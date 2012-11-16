;(function() {

	brite.registerView("StudyCreate", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			var view = this;
			var dfd = $.Deferred();
			var createDfd = $.Deferred();
			data = data || {};
			if (data.study_id) {
				app.StudyDao.get(data.study_id).done(function(study) {
					dfd.resolve(study);
				});
			} else {
				dfd.resolve({});
			}
			dfd.done(function(study) {
				view.study_id = study.study_id;
				renderer.render("StudyCreate", study).done(function(html) {
					var $e = $(html);
					createDfd.resolve($e);
				});
			});

			return createDfd.promise();
		},
		
		postDisplay: function(data){
			var view = this;
		 	var $e = view.$el;
		 	
		 	view.study_id = data.study_id;
		},
		
		events: {
			"btap; .btnBackHome": btnBackHomeMethod, 
			
			"btap; .btnDetail": btnDetailMethod,
			
			"btap; .btnTask": btnTaskMethod,
			
			"btap; .btnTestUser": btnTestUserMethod
		}

	});
	
	// --------- Event Methods --------- //
	function btnBackHomeMethod(){
		brite.display("StudyView");
	}
	
	function btnDetailMethod(event){
		var view = this;
		brite.display("DetailCreate",null,{study_id:view.study_id});
	}
	
	function btnTaskMethod(event){
		var view = this;
		brite.display("TaskView",null,{study_id:view.study_id});
	}
	
	function btnTestUserMethod(event){
		var view = this;
		brite.display("TestUserView",null,{study_id:view.study_id});
	}
	// --------- /Event Methods --------- //
	

})();
