;(function() {

	brite.registerView("StudyView", {
		loadTmpl : true,
		parent : "#bodyPage"
	}, {
		create : function(data, config) {
			var view = this;
			return $("#tmpl-StudyView").render({});
		},
		
		postDisplay: function(){
			var view = this;
		 	var $e = view.$el;
		 	view.$sectionContent = $e.find("section.content"); 	
		}

	});
	
	// --------- Event Methods --------- //
	
	// --------- /Event Methods --------- //
	

})();
