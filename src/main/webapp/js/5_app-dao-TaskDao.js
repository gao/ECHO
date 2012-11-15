(function($){
	
	//-------- InMemory dao ---------//
	
	function InMemoryTaskDao(){
		this.constructor._super.constructor.call(this,"Task");
	}
	brite.inherit(InMemoryTaskDao,brite.InMemoryDaoHandler);
	
	InMemoryTaskDao.prototype.getTasksByStudy = function(studyId){
		var dao = this;
		var dfd = $.Deferred();
		if (studyId && studyId != "") {
			brite.dao("Task").list({
				match : {
					studyId : studyId
				}
			}).done(function(tasks) {
				dfd.resolve(tasks);
			});
		} else {
			brite.dao("Task").list().done(function(tasks) {
				dfd.resolve(tasks);
			});
		}

		return dfd.promise();
	}
	
	//-------- /InMemory dao ---------//
	
	app.InMemoryTaskDao = InMemoryTaskDao;
	
})(jQuery);