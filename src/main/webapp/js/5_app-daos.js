var app = app || {};


// --------- Entity Dao Registration --------- //
(function($){
	
	if(app.dataMode == 'Remote'){
		//register RemoteDao
		app.StudyDao = brite.registerDao(new brite.dao.RemoteDao("Study"));
		
		app.TaskDao = brite.registerDao(new brite.dao.RemoteDao("Task"));
		
		app.TestUserDao = brite.registerDao(new brite.dao.RemoteDao("TestUser"));
		
		app.AnswerDao = brite.registerDao(new brite.dao.RemoteDao("Answer"));

	}else{
		//register InMemoryDao
		app.StudyDao = brite.registerDao(new brite.InMemoryDaoHandler("Study"));
		
		app.TestUserDao = brite.registerDao(new brite.InMemoryDaoHandler("TestUser"));
		
		app.AnswerDao = brite.registerDao(new brite.InMemoryDaoHandler("Answer"));
		
		//app.TaskDao = brite.registerDao(new brite.InMemoryDaoHandler("Task"));
		
		app.TaskElementDao = brite.registerDao(new brite.InMemoryDaoHandler("TaskElement"));
		
		app.TaskDao = brite.registerDao(new app.InMemoryTaskDao());

	}
	
	// add dao listeners
	brite.dao.onDao(function(event) {
		console.log("dao.onDao call : " + event.daoEvent.entityType + " - " + event.daoEvent.action);
	}, "namespace1"); 


})(jQuery);

