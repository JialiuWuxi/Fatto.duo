(function () {
	"use strict";

	var treeviewMenu = $('.app-menu');

	// Toggle Sidebar
	$('[data-toggle="sidebar"]').click(function(event) {
		event.preventDefault();
		$('.app').toggleClass('sidenav-toggled');
	});

	// Activate sidebar treeview toggle
	$("[data-toggle='treeview']").click(function(event) {
		event.preventDefault();
		if(!$(this).parent().hasClass('is-expanded')) {
			treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
		}
		$(this).parent().toggleClass('is-expanded');
	});

	// Set initial active toggle
	$("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

	//Activate bootstrip tooltips
	$("[data-toggle='tooltip']").tooltip();

	//Save new ciletn information when user click "Change Save" button in matters page
	$("#clientSaveButton").click(async function() {
		let client = {};
		client.Title = $('#newClientNameInput').val();
		client.clientAddress = $('#newClientAddressInput').val();
		client.clientPhone = $('#newClientPhoneInput').val();
		client.clientZIP = $('#newClientZIPInput').val();
		const data = client;
	
		$('#createNewClientModalLong').modal('hide')
		await law.postListItems ( data, 1 );
	
		//hiden the modal and clean the input fields
		$('#newClientNameInput').val('');
		$('#newClientAddressInput').val('');
		$('#newClientPhoneInput').val('');
		$('#newClientZIPInput').val('')
		//update client select dropdown 
		law.getListItems (this, '#formSelect2', 3, function( a ) { return `<option value='${a.fields.clientNumber}'>${a.fields.Title}</option>` });	
	});

})();
