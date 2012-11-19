(function($) {

	brite.registerView("RunUserView", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			var view = this;
			var dfd = $.Deferred();
			var createDfd = $.Deferred();
			data = data || {};
			
			app.TestUserDao.get(data.user_id).done(function(user) {
				dfd.resolve(user);
			});

			dfd.done(function(user) {
				view.study_id = data.study_id;
				view.user_id = user.id;
				renderer.render("RunUserView", user).done(function(html) {
					var $e = $(html);
					createDfd.resolve($e);
				});
			});
	
			return createDfd.promise();
		},
		
		postDisplay: function(data){
			var view = this;
		 	var $e = view.$el;
		},
		
		events: {
			
			"btap; .btnBack": btnBackMethod ,
			
			"btap; .btnSave": btnSaveMethod
		}


	});
	
	// --------- Event Methods --------- //
	function btnBackMethod(){
		var view = this;
		brite.display("RunUserView",null,{study_id:view.study_id});
	}
	
	function btnSaveMethod(){
		var view = this;
		var $e = view.$el;
		
		var id = view.user_id||0;
		var name = $e.find(".TestUserCreate-content input[name='name']").val();
		var label = $e.find(".TestUserCreate-content input[name='label']").val();
		var user = {id:id,name:name,label:label,study_id:view.study_id};
		
		if(id==0){
			var date = new Date();
			user.creationDate = date;
			app.TestUserDao.create(user).done(function(user){
				brite.display("RunUserView",null,{study_id:user.study_id});
			});
		}else{
			app.TestUserDao.update(user).done(function(study){
				brite.display("RunUserView",null,{study_id:user.study_id});			
			});
		}
		
	}
	
	// --------- /Event Methods --------- //
	

})(jQuery);
