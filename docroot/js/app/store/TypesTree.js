Ext.define('Uploader.store.TypesTree', {
    extend: 'Ext.data.TreeStore',
    //requires: 'Uploader.model.TypesTree',
    model: 'Uploader.model.TypesTree',
    requires: ['Uploader.config'],

	
	root: {
        text: Uploader.config.repositoryDescription ,
        expanded: true,
        id: 0
    },
    
    proxy: {
        type: 'ajax',
        //url: '/django/mountTree/deroberto2/',
        url: 'http://glibrary.ct.infn.it/django/mountTree/' + Uploader.config.repository + '/',
        reader: {
            type: 'json'
        }
    } 
});