//Ext.Loader.setConfig({ enabled: true });
Ext.Loader.setPath({
    //  standalone deployment
    //'Ext.ux.upload' : './extjs-upload-widget/lib/upload'
    // liferay deployment
    'Ext.ux.upload' : '/glibrary-uploader-portlet/js/extjs-upload-widget/lib/upload'
});


Ext.application({
    name: 'Uploader',
    //liferay deployment
    appFolder: '/glibrary-uploader-portlet/js/app',
    //models: ['TypesTree'],
    stores: ['TypesTree'],
    controllers: ['Main'],
    //requires: ['Uploader.view.Viewport'],
    //autoCreateViewport: true,
    requires: ['Uploader.view.MainPanel'],
    launch: function() {
	console.log("prova");
    	//Ext.create('Uploader.view.Viewport');
	Ext.create('Uploader.view.MainPanel');
        console.log("loaded");
        //this.getTypesTreeStore().load();
    },
    repository: 'demo'

});
