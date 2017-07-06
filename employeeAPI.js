$.ajax({
	url:'https://randomuser.me/api/?results=12',
	dataType: 'json',
	success: function(data){

		//loop through the API data and create html to hold data
		var employeeHTML = '<ul class="employeeInfo">';	
		$.each(data.results, function(i, info){
			employeeHTML += '<li class="employeeCard">';
			employeeHTML += '<img class="image" src="' +info.picture.medium+ '">';
			employeeHTML += '<div class="infoAdjust"><p class="info">' +info.name.first+ ' ' +info.name.last+ '</p>'
			employeeHTML += '<p class="info email">' +info.email+ '</p>';
			employeeHTML += '<p class="info">' +info.location.city+ '</p></div></li>';
		});
		employeeHTML += '</ul>';

		//Set html in div id'd employeeList
		$('#employeeList').html(employeeHTML);

		//When user clicks on an employee's card......
		$('.employeeCard').click(function(){
		
			//...grey out background page to ready modal window
			$('#page').css({opacity: "0.4", backgroundColor: "#C4C4C4"});
			$('.modalWindow').show();
			
			//...create html for modal to hold specific employee's data
			var $employeeIndex = $(this).index();
			var $modalBoxEmp = data.results[$employeeIndex];
			var modalHTML = '<ul class="modalHTML">';

			modalHTML += '<li class="modal">';
			modalHTML += '<img class="image" id="modalImage" src="' +$modalBoxEmp.picture.large+ '">';
			modalHTML += '<div id="closeModal"></div>';
			modalHTML += '<div class="modalInfo"><p class="info">' +$modalBoxEmp.name.first+ ' ' +$modalBoxEmp.name.last+ '</p>';
			modalHTML += '<p class="email">' +$modalBoxEmp.email+ '</p>';
			modalHTML += '<p>' +$modalBoxEmp.location.city+ ',' + ' ' + $modalBoxEmp.location.state+ '</p><hr>';
			modalHTML += '<p id="phoneNum">' +$modalBoxEmp.phone+ '</p>';
			modalHTML += '<p id="location">' +$modalBoxEmp.location.street+ ',' + ' ' +$modalBoxEmp.location.postcode+ '</p>';
			modalHTML += '<p id="dob">' + 'Birthday:' + ' ' +$modalBoxEmp.dob+ '</p></div></li>';
			modalHTML += '</ul>';
			$('.modalWindow').html(modalHTML);
			
			//Modify birthday info
			var birthdayText = $('#dob')[0];
			var birthdayNew = $(birthdayText).text().slice(0, -8);
			$('#dob').html(birthdayNew);
			
			//...create a button to close modal window
			$('#closeModal').click(function(){
				$('.modalWindow').hide();
				$('#page').css({opacity: "", backgroundColor: ""});
			});
		});
	}
});





