;(function() {

	brite.registerView("TestUserView", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			return $.when(app.TestUserDao.list({match:{study_id:data.study_id}})).pipe(function(users){
				return $("#tmpl-TestUserView").render({users:users});
			});	
		},
		
		postDisplay: function(data, config){
			var view = this;
		 	var $e = view.$el;
		 	view.study_id = data.study_id;
		},
		
		events: {
			"btap; .btnTask": btnTaskMethod
		}

	});
	
	// --------- Event Methods --------- //
	function btnTaskMethod(event){
		var view = this;
		brite.display("TaskCreate",null,{studytId:view.studytId});
	}
	// --------- /Event Methods --------- //
	

})();
