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
		},
		
		events: {
			"btap; li[data-entity='Text']": textMethod,
			
			"btap; li[data-entity='Image']": ImageMethod,
			
			"btap; li[data-entity='Data']": DataMethod
		},
		
		close : function(update) {
			var view = this;
			var $e = view.$el;

			$e.bRemove();
			view.$screen.remove();
		},

	});
	
	// --------- Event Methods --------- //
	function textMethod(event){
		var view = this;
		//brite.display("TaskElementCreate",null,{task_id:view.task_id});
		view.close();
	}
	
	function ImageMethod(event){
		var view = this;
		//brite.display("TaskElementCreate",null,{task_id:view.task_id});
		view.close();
	}
	
	function DataMethod(event){
		var view = this;
		//brite.display("TaskElementCreate",null,{task_id:view.task_id});
		view.close();
	}
	// --------- /Event Methods --------- //
	

})();
