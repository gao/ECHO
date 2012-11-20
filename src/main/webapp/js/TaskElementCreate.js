;(function() {

	brite.registerView("TaskElementCreate", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			var view = this;
			var type = data.type;
			return $("#tmpl-TaskElementCreate").render({type:type});
		},
		
		postDisplay: function(data, config){
			var view = this;
		 	var $e = view.$el;
		 	
		 	view.study_id = data.study_id;
		 	view.task_id = data.task_id;
		 	view.type = data.type;
		},
		
		events: {
			"btap; .btnBack": btnBackMethod,

			"btap; .btnCreate": btnCreateMethod 
		}

	});
	
	// --------- Event Methods --------- //
	function btnBackMethod(event){
		var view = this;
		brite.display("TaskElementView",null,{study_id:view.study_id,task_id:view.task_id});
	}
	
	function btnCreateMethod(event){
		var view = this;
		var $e = view.$el;

		var value = $e.find("input[name='value']").val();
		var data = {
			elementValue : value,
			task_id : view.task_id,
			elementType : view.type
		};

		app.TaskElementDao.create(data).done(function(obj) {
			brite.display("TaskElementView",null,{study_id:view.study_id,task_id:view.task_id});
		});
	}
	// --------- /Event Methods --------- //
	

})();
