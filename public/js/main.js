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

	//	Activate bootstrip tooltips
	$("[data-toggle='tooltip']").tooltip();

	//	Save new cilent information when user click "Change Save" button in matters page
	$("#clientSaveButton").click(async function() {
		let client = {};
		client.Title = $('#newClientNameInput').val();
		client.clientAddress = $('#newClientAddressInput').val();
		client.clientPhone = $('#newClientPhoneInput').val();
		client.clientZIP = $('#newClientZIPInput').val();
		let data = client;
	
		$('#createNewClientModalLong').modal('hide')
		await law.postListItems ( data, 1 );

		client = {};
		client.displayName = $('#newClientNameInput').val();
		client.mailEnabled = false;
		client.mailNickname = $('#newClientNameInput').val();
		client.securityEnabled = true;
		data = client;
		await law.postListItems ( data, 3 );

		//hiden the modal and clean the input fields
		$('#newClientNameInput').val('');
		$('#newClientAddressInput').val('');
		$('#newClientPhoneInput').val('');
		$('#newClientZIPInput').val('')
		//update client select dropdown 
		law.getListItems (this, 3, function( response ) { 
			let resultHtml = '';
			for (let val of response) {
				resultHtml +=	`<option value='${val.fields.clientNumber}'>${val.fields.Title}</option>` 
			};
			$('#formSelect2').html(resultHtml);
			$('#formSelect2').on('change', function() {
				listenOnClientContactInforClick(this);
			});
		});	
	});

	//	Save new contact information when user click "Change Save" button in matters page
	$("#contactSaveButton").click(async function() {
		let contact = {};
		contact.guestDisplayName = $('#newContactNameInput').val();
		contact.guestEmailAddress = $('#newContactEmailInput').val();
		contact.guestPhone = $('newContactPhoneInput').val();
		let data = contact;
		$('#createNewClientContactModalLong').modal('hide');
		//save client new contact as guest
		await law.postListItems ( data, 4 );
		//add new guset to exsting group
		await law.addGuesttoGroup ($('#formSelect2').val(), data);
		//clean the input field
		$('#newContactNameInput').val('');
		$('#newContactEmailInput').val('');
		$('#newContactPhoneInput').val('');
		//update client contact information when user create new contact
		listenOnClientContactInforClick("#formSelect2");
	});



	//	when user change client in the select, reload the client user inforamtion
	$('#formSelect2').on('change', function() {
		listenOnClientContactInforClick(this);
	});
	//	when user change Branch sel, then reflash the Department menu
	$('#formSelect3').on('change', function() {
		law.getListItems(this, 1, function( response ) {
			let resultHtml = '';
			for (let eachDepartment of response) {
				resultHtml +=	`<option value=${eachDepartment.fields}>${eachDepartment.fields.Branch} - ${eachDepartment.fields.Title}</option>`
			}
			$('#formSelect4').html(resultHtml);
		});
	});
	
	var listenOnClientContactInforClick = function(that){
		law.getListItems(that, 4, function( response ) {
			let resultHtml = '';
			for (let eachMemOfGroup of response) {
				resultHtml +=	`<li class="list-group-item">${eachMemOfGroup.displayName}
									<div class="form-check">
  										<input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
  										<label class="form-check-label" for="defaultCheck1">
    										涉案成员
  										</label>
									</div>
								</li>`;
			};
			$('#contactInformationBody').html(resultHtml);
			$('.dropdown-item').click(function(){
				listenOnCLientContactInforDropdown();
			});
		});
	};
})();
