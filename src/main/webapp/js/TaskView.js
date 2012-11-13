;(function() {

	brite.registerView("TaskView", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			return $.when(app.TaskDao.list()).pipe(function(taskList){
				return $("#tmpl-TaskView").render({tasks:taskList});
			});	
		},
		
		postDisplay: function(){
			var view = this;
		 	var $e = view.$el;
		},
		
		events: {
			"btap; .btnTask": btnTaskMethod
		}

	});
	
	// --------- Event Methods --------- //
	function btnTaskMethod(event){
		var view = this;
		//brite.display("TaskCreate",null,{});
	}
	// --------- /Event Methods --------- //
	

})();
