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
			
			"btap; .btnUser": btnUserMethod,
			
			"btap; .btnBack": btnBackMethod,
			
			"btap; .userPart": btnUserUpdateMethod
		}

	});
	
	// --------- Event Methods --------- //
	function btnUserMethod(event){
		var view = this;
		brite.display("TestUserCreate",null,{study_id:view.study_id});
	}
	
	function btnUserUpdateMethod(event){
		var view = this;
		var user_id = $(event.currentTarget).attr("data-entity-id");
		brite.display("TestUserCreate",null,{study_id:view.study_id,user_id:user_id});
	}
	
	function btnBackMethod(){
		var view = this;
		brite.display("StudyCreate",null,{study_id:view.study_id});
	}
	
	// --------- /Event Methods --------- //
	

})();
