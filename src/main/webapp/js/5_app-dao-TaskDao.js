(function($){
	
	//-------- InMemory dao ---------//
	
	function InMemoryTaskDao(){
		this.constructor._super.constructor.call(this,"Task");
	}
	brite.inherit(InMemoryTaskDao,brite.InMemoryDaoHandler);
	
	InMemoryTaskDao.prototype.getTasksByStudy = function(study_id){
		var dao = this;
		var dfd = $.Deferred();
		if (study_id && study_id != "") {
			brite.dao("Task").list({
				match : {
					study_id : study_id
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