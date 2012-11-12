var app = app || {};


// --------- Entity Dao Registration --------- //
(function($){
	
	if(app.dataMode == 'Remote'){
		//register RemoteDao
		app.StudyDao = brite.registerDao(new brite.dao.RemoteDao("Study"));

	}else{
		//register InMemoryDao
		app.StudyDao = brite.registerDao(new brite.InMemoryDaoHandler("Study"));

	}
	
	// add dao listeners
	brite.dao.onDao(function(event) {
		console.log("dao.onDao call : " + event.daoEvent.entityType + " - " + event.daoEvent.action);
	}, "namespace1"); 


})(jQuery);

