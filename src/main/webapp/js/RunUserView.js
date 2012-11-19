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
			"btap; .btnBack": btnBackMethod 
		}


	});
	
	// --------- Event Methods --------- //
	function btnBackMethod(){
		var view = this;
		brite.display("TestUserView",null,{study_id:view.study_id});
	}

	
	// --------- /Event Methods --------- //
	

})(jQuery);
