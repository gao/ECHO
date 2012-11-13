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
			if (data.id) {
				app.StudyDao.get(data.id).done(function(study) {
					dfd.resolve(study);
				});
			} else {
				dfd.resolve({});
			}
			dfd.done(function(study) {
				view.studytId = study.id;
				renderer.render("StudyCreate", study).done(function(html) {
					var $e = $(html);
					createDfd.resolve($e);
				});
			});

			return createDfd.promise();
		},
		
		postDisplay: function(){
			var view = this;
		 	var $e = view.$el;
		},
		
		events: {
			"btap; .btnBackHome": btnBackHomeMethod, 
			
			"btap; .btnDetail": btnDetailMethod 
		}

	});
	
	// --------- Event Methods --------- //
	function btnBackHomeMethod(){
		brite.display("StudyView");
	}
	
	function btnDetailMethod(event){
		var view = this;
		brite.display("DetailCreate",null,{id:view.studytId});
	}
	// --------- /Event Methods --------- //
	

})();
