;(function() {

	brite.registerView("ElementView", {
		loadTmpl : true,
		parent : "#bodyPage"
	}, {
		create : function(data, config) {
			var view = this;
			view.$screen = $("<div class='notTransparentScreen'></div>").appendTo("#bodyPage");
			return $("#tmpl-ElementView").render({});
		},
		
		postDisplay: function(data, config){
			var view = this;
		 	var $e = view.$el;
		 	
		 	view.task_id = data.task_id;
		 	view.study_id = data.study_id;
		},
		
		events: {
			"btap; li": ElementDataTypeMethod
		},
		
		close : function(update) {
			var view = this;
			var $e = view.$el;

			$e.bRemove();
			view.$screen.remove();
		},

	});
	
	// --------- Event Methods --------- //
	function ElementDataTypeMethod(event){
		var view = this;
		var $e = view.$el;
		var $li = $(event.currentTarget);
		var elementType = $li.attr("data-entity");
		
		if(elementType == "Text"){
			view.close();
			brite.display("TaskElementCreate",null,{study_id:view.study_id,task_id:view.task_id,type:elementType});
		}else if(elementType == "Image"){
			view.close();
		}else if(elementType == "Data"){
			var $elementDataType = $e.find(".elementDataType");
			var $elementType = $e.find(".elementType");
			
			$elementDataType.show();
			$elementType.hide();
		}else{
			view.close();
		}
	}
	
	
	// --------- /Event Methods --------- //
	

})();
