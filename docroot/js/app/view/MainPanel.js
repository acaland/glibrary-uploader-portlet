Ext.define('Uploader.view.MainPanel', {
    extend: 'Ext.panel.Panel',
    requires: [
    	'Uploader.view.TypesTree',
    	'Uploader.view.FilesList',
    	'Uploader.view.MetadataEditor',
        'Ext.ux.upload.Panel',
        'Ext.ux.upload.uploader.ExtJsUploader'
    ],  
    layout: 'border',
    renderTo: Ext.get('glibraryDiv'),
    height: 600,
    items :[
            	{
            		xtype: 'typestree',
            		region: 'west',
            		width: '20%'
            	},
                Ext.create('Ext.ux.upload.Panel', {
                    uploaderOptions: {
                        url: './extjs-upload-widget/public/upload.php'
                    },
                    
                    // synchronous: false,
                    region: 'center'
                }),
                /*{
                    xtype: 'fileslist',
                    region: 'center',
                    dialogTitle: 'My Upload Widget',
                    uploadUrl: 'upload.php'
                    
                }, */
                {
                	xtype: 'metadataeditor',
                	region: 'south',
                	height: '50%'
                }
    	]
    
    /*
    initComponent: function() {
    	this.
    	this.callParent();
    } */
});