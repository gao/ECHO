var app = app || {};


// --------- Entity Dao Registration --------- //
(function($){
	
	if(app.dataMode == 'Remote'){
		//register RemoteDao
		app.StudyDao = brite.registerDao(new brite.dao.RemoteDao("Study"));
		
		app.TaskDao = brite.registerDao(new brite.dao.RemoteDao("Task"));

	}else{
		//register InMemoryDao
		app.StudyDao = brite.registerDao(new brite.InMemoryDaoHandler("Study"));
		
		app.TaskDao = brite.registerDao(new brite.InMemoryDaoHandler("Task"));

	}
	
	// add dao listeners
	brite.dao.onDao(function(event) {
		console.log("dao.onDao call : " + event.daoEvent.entityType + " - " + event.daoEvent.action);
	}, "namespace1"); 


})(jQuery);

