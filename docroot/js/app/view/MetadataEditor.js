Ext.define('Uploader.view.MetadataEditor', {
    extend: 'Ext.form.Panel',
    alias: 'widget.metadataeditor',
    
    title: 'Metadata Editor',
    split: true,
    useArrows: true,
    itemId: 'editor',
    defaults : {
    	xtype: 'textfield',
    	columnWidth: 0.5,
    	labelStyle: 'padding-left:10px;',
    	labelWidth: 150,
    	padding: 5
    },
    layout: 'column',
    autoScroll: true,
    
    bodyPadding: 10,
 	frame: true,
    
    initComponent: function() {
    	var me = this;

    	me.dockedItems = [{
    		xtype: 'toolbar',
    		docked: 'top',
    		items : [{
    			xtype: 'box',
    			hidden: true,
    			itemId: 'downloadLink',
    			autoEl: {
        			tag: 'a',
        			href: 'http://www.google.it',
        			html: 'http://www.google.it'
    			}}, 
    			'->',
    			{text: 'Save Metadata', iconCls: 'save-icon16', action: 'save'}
    		]
    	}];
    	me.callParent();
    },

    buildItems: function(fields, record) {
    	var me = this;
    	me.removeAll();
    	console.log("building fields at runtime");
    	//console.log(fields);
    	var form = [];
    	for (var i = 0; i < fields.length; i++) {
    		var fname = fields[i].name;
    		if (fname != 'CategoryIDs' && fname != 'TypeID' && fname != 'Keywords2' && (fname.indexOf('/') != 0)) {
    			var f = {name: fname, fieldLabel: fname};
    			if (fields[i].type) {
    				f.xtype = 'numberfield';
    			}
    			if (fname == 'FileName') {
    				f.value = record.filename;
    				f.readOnly = true;
    			} else if (fname == 'Size') {
    				f.value = record.size;
    				f.readOnly = true;
    			} else if (fname == 'LastModificationDate' || fname == 'SubmissionDate') {
    				f.xtype = 'datefield';
    				f.value = new Date();
    				f.format = 'd/m/Y H:m';
    				f.submitFormat = 'Y-m-d H:m';
    			}
    			me.add(f);
    		}
    		
    		//form.push(f);
    	}
    	console.log(form);

    	//me.items = form;
    	

    }
});