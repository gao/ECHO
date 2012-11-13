;(function() {

	brite.registerView("StudyView", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			return $.when(app.StudyDao.list()).pipe(function(studyList){
				var haveStudy = false;
				if(studyList && studyList.length > 0){
					haveStudy = true;
				}
				return $("#tmpl-StudyView").render({studies:studyList, haveStudy:haveStudy});
			});	
		},
		
		postDisplay: function(){
			var view = this;
		 	var $e = view.$el;
		},
		
		events: {
			"btap; .btnStudy": btnStudyMethod 
		}

	});
	
	// --------- Event Methods --------- //
	function btnStudyMethod(event){
		var view = this;
		brite.display("StudyCreate",null,{});
	}
	// --------- /Event Methods --------- //
	

})();
