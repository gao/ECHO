;(function() {

	// --------- View Registration --------- //
	brite.registerView("MainScreen", {
		loadTmpl : true,
		parent : "#bodyPage"
	}, {
		create : function(data, config) {
			var view = this;
			return $("#tmpl-MainScreen").render({});
		},

		postDisplay : function(data, config) {
			var view = this;
			var $e = view.$el;
			var $content = $e.find(".MainScreen-content");
			brite.display("StudyView",$content);
		},
		
		docEvents:{
			"btap; .MainScreen header": function(){
				brite.display("StudyView");
			}
		}

	});
	// --------- View Registration --------- //
})();
