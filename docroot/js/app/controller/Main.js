Ext.define('Uploader.controller.Main', {
	extend: 'Ext.app.Controller',
	requires: ['Uploader.config'],

	init: function() {
		var me = this;

		me.control({
			'grid': {
				itemdblclick: me.fileSelected
			},
			'metadataeditor toolbar button': {
				click: me.saveMetadata
			}
		});

		console.log('Main Controller loaded');

	},

	fileSelected: function(grid,record,item,index,event,ops) {
		var me = this;
		//console.log('hai selezionato un file');

		//console.log(record.data);

		var downloadLink = Ext.ComponentQuery.query('#downloadLink')[0];
		var vo = 'vo.dch-rp.eu';
		var se = 'prod-se-03.ct.infn.it';
		var path = '/dpm/ct.infn.it/home/vo.dch-rp.eu/test/';
		// glibary deployment
		//var root = 'http://glibrary.ct.infn.it/dm/';
		// liferay deployment
		var root = 'https://' + window.location.host ;
		var link = root + '/dm/' + vo + '/' + se + path +
			record.data.filename.replace(/ /g, "_");
		// via gLibrary DJANGO APIs
		//var link = root + '/glibrary/download/' + se + path +
		//	record.data.filename.replace(/ /g, "_") + '/';
		downloadLink.update('<a href="' + link + '" target="_blank">Direct Download Link</a>');
		downloadLink.show();

		var typestree = Ext.ComponentQuery.query('typestree')[0];
		var selectedType = typestree.getSelectionModel().getSelection() [0];

		if (!selectedType || selectedType.data.depth == 0) {
			Ext.Msg.alert("Error","Please select a type first!");
		} else {
			console.log(selectedType.data);
			me.loadMetadata(selectedType.data.path, record.data);
		}
	},

	loadMetadata: function(typepath, record) {

		Ext.Ajax.request({
			url: '/glibrary/metadata' + typepath + '/',
			method: 'GET',
			success: function(response) {
				var data = Ext.decode( response.responseText );
				console.log(data.metadata);
				var editor = Ext.ComponentQuery.query('#editor')[0];
				//console.log(editor);
				editor.buildItems(data.metadata.fields, record);
			},
			failure: function(response) {
				Ext.Msg.alert("Error","Cannot retrieve the metadata for the selected type. Look at the error log");
				console.log("error");
				console.log(response);
			}
		});
	},

	saveMetadata: function() {
		var typestree = Ext.ComponentQuery.query('typestree')[0];
		var selectedType = typestree.getSelectionModel().getSelection()[0];
		if (!selectedType || selectedType.data.depth == 0) {
			Ext.Msg.alert("Error","Please select a type first!");
			return;
		}
		var form = Ext.ComponentQuery.query('metadataeditor')[0].getForm()
		var metadata = form.getValues(false, true);
		var fname = form.getValues().FileName.replace(/ /g, "_");
		metadata.FileName = fname;
		metadata.Size = form.getValues().Size;
		metadata.Replica = "https://prod-se-03.ct.infn.it/dpm/ct.infn.it/home/vo.dch-rp.eu/test/" + fname;
		console.log(metadata);
		Ext.Ajax.request({
			url: '/glibrary/saveMetadata' + selectedType.data.path + '/',
			params: metadata,
			success: function(response) {
				Ext.ComponentQuery.query('metadataeditor')[0].removeAll();
				Ext.Msg.alert("Success!", "Metadata added successfully");
			},
			failure: function(response) {
				Ext.Msg.alert("Error","Cannot save metadata to the server. Look at the error log");
				console.log("error");
				console.log(response);
			}
		});
	}
});
