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

	//Save new cilent information when user click "Change Save" button in matters page
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

	//when user change client in the select, reload the client user inforamtion
	$('#formSelect2').on('change', function() {
		listenOnClientContactInforClick(this);
	});

	$('.dropdown-item').click(function(){
		listenOnCLientContactInforDropdown();
	});

	var listenOnCLientContactInforDropdown = function(){
		alert('BBB');
	}

	var listenOnClientContactInforClick = function(that){
		law.getListItems(that, 4, function( response ) {
			let resultHtml = '';
			for (let eachMemOfGroup of response) {
				resultHtml +=	`<li class="list-group-item">${eachMemOfGroup.displayName}</li>
								<div class="dropdown">
									<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										选择角色
									</button>
									<div class="dropdown-menu" aria-labelledby="dropdownMenu2">
										<button class="dropdown-item" type="button" id="clientSelAction-1">投诉人</a>
										<button class="dropdown-item" type="button" id="clientSelAction-2">原告</a>
										<button class="dropdown-item" type="button" id="clientSelAction-3">被告</a>
					  				</div>
								</div>`;
			};
			$('#contactInformationBody').html(resultHtml);
			$('.dropdown-item').click(function(){
				listenOnCLientContactInforDropdown();
			});
		});
	};
})();
