Ext.define('Uploader.store.TypesTree', {
    extend: 'Ext.data.TreeStore',
    //requires: 'Uploader.model.TypesTree',
    model: 'Uploader.model.TypesTree',

	
	root: {
        text: 'Demo Collection',
        expanded: true,
        id: 0
    },
    
    proxy: {
        type: 'ajax',
        //url: '/django/mountTree/deroberto2/',
        url: 'http://glibrary.ct.infn.it/django/mountTree/demo/',
        reader: {
            type: 'json'
        }
    } 
});