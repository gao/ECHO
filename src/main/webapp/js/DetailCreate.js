;(function() {

	brite.registerView("DetailCreate", {
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
				renderer.render("DetailCreate", study).done(function(html) {
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
			"btap; .btnBack": btnBackMethod, 
			
			"btap; .btnCreate": btnCreateMethod 
		}

	});
	
	// --------- Event Methods --------- //
	function btnBackMethod(){
		var view = this;
		brite.display("StudyCreate",null,{study_id:view.study_id});
	}
	
	function btnCreateMethod(event){
		var view = this;
		var $e = view.$el;

		var name = $e.find("input[name='name']").val();
		var description = $e.find("textarea[name='description']").val();
		var tag = $e.find("input[name='tag']").val();
		var data = {
			name : name,
			description : description,
			tag : tag
		};

		// if study id exist do update,else do create
		if (view.study_id) {
			data.id = view.study_id;
			app.StudyDao.update(data).done(function(obj) {
				brite.display("StudyCreate",null,{study_id:obj.id});
			});
		}else{
			var date = new Date();
			data.creationDate = date;
			app.StudyDao.create(data).done(function(obj) {
				brite.display("StudyCreate",null,{study_id:obj.id});
			});
		}

	}
	// --------- /Event Methods --------- //
	

})();
