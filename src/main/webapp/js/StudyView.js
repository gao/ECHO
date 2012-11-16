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
					$.each(studyList,function(i,study){
						study.creationDate = app.util.formatDate(study.creationDate,"medium");
					});
				}
				return $("#tmpl-StudyView").render({studies:studyList, haveStudy:haveStudy});
			});	
		},
		
		postDisplay: function(){
			var view = this;
		 	var $e = view.$el;
		},
		
		events: {
			"btap; .btnStudy": btnStudyMethod,
			
			"btap; .studyPart": studyPartMethod,
		}

	});
	
	// --------- Event Methods --------- //
	function btnStudyMethod(event){
		var view = this;
		brite.display("StudyCreate",null,{});
	}
	
	function studyPartMethod(event){
		var view = this;
		var $studyPart = $(event.currentTarget);
		var study_id = $studyPart.bEntity("Study").id;
		brite.display("StudyCreate",null,{study_id:study_id});
	}
	// --------- /Event Methods --------- //
	

})();
