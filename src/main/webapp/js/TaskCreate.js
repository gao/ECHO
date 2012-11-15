;(function() {

	brite.registerView("TaskCreate", {
		loadTmpl : true,
		emptyParent : true,
		parent : ".MainScreen-content"
	}, {
		create : function(data, config) {
			return $("#tmpl-TaskCreate").render({});
		},
		
		postDisplay: function(data, config){
			var view = this;
		 	var $e = view.$el;
		 	
		 	view.studytId = data.studytId;
		},
		
		events: {
			"btap; .btnBack": btnBackMethod, 
			
			"btap; .btnCreate": btnCreateMethod,
			
			"change; select[name='type']": changeSelectTypeMethod 
		}

	});
	
	// --------- Event Methods --------- //
	function btnBackMethod(){
		var view = this;
		brite.display("TaskView",null,{id:view.studytId});
	}
	
	function btnCreateMethod(event){
		var view = this;
		var $e = view.$el;

		var title = $e.find("input[name='title']").val();
		var name = $e.find("input[name='name']").val();
		var type = $e.find("select[name='type']").val();
		var info = $e.find("textarea[name='info']").val();
		
		var data = {
			title : title,
			name : name,
			info : info,
			type : type,
			studytId : view.studytId
		};
		
		app.TaskDao.create(data).done(function(obj) {
			brite.display("TaskView",null,{studytId:view.studytId});
		});
	}
	
	function changeSelectTypeMethod(event){
		var view = this;
		var $e = view.$el;
		var $select = $(event.currentTarget);
		var val = $select.val(); 
		if(val == "string" || val == "true-false" || val == "rating-5points" || val == "rating-10points"){
			$e.find(".TaskCreate-content .taskInfo").hide();
		}else{
			$e.find(".TaskCreate-content .taskInfo").show();
		}
	}
	// --------- /Event Methods --------- //
	

})();
