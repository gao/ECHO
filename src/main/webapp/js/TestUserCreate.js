(function($) {

	brite.registerView("TestUserCreate", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			var view = this;
			return $("#tmpl-TestUserCreate").render(data);
		},
		
		postDisplay: function(data){
			var view = this;
		 	var $e = view.$el;
		 	view.uid = data.id || 0;
		 	view.study_id = data.study_id;
		},
		
		events: {
			"btap; .btnBack": btnBackMethod,
			
			"btap; .btnSave": btnSaveMethod
		}


	});
	
	// --------- Event Methods --------- //
	function btnBackMethod(){
		var view = this;
		brite.display("TestUserView",null,{sid:view.study_id});
	}
	
	function btnSaveMethod(){
		var view = this;
		var $e = view.$el;
		
		var id = view.uid;
		var name = $e.find(".content input[name='name']").val();
		var label = $e.find(".content input[name='label']").val();
		var user = {id:id,name:name,label:label,study_id:view.study_id};
		
		if(id==0){
			var date = new Date();
			user.creationDate = date;
			app.TestUserDao.create(user).done(function(user){
				brite.display("TestUserView",null,{study_id:user.study_id});
			});
		}else{
			app.TestUserDao.update(user).done(function(study){
				brite.display("TestUserView",null,{study_id:user.study_id});			
			});
		}
		
	}
	
	// --------- /Event Methods --------- //
	

})(jQuery);
