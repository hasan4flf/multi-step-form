jQuery(document).ready(function($) {

	"use strict";

	// Multi Steps Form
	// Step 0 Start
	$("[name='victim']").click(function(){
        if($("[name='victim']:checked").val() == "No") {
            $("#step_0").addClass("sr-only", 2000);
            $("#step_4").removeClass("sr-only", 2000);

            // Change label and button text
            $("#dynamicLabel_1").addClass('sr-only', 2000);
            $("#dynamicLabel_2").removeClass('sr-only', 2000);
            $("#more_details").attr('placeholder', '');
            $("#clhc_submit").text("Submit");
        } else {
            $("#step_0").addClass("sr-only", 2000);
            $("#step_1").removeClass("sr-only", 2000);
        }
	});
	// Step 0 End

	// Step 1 Start
	$("[name='property_damage']").click(function(){
        if($("[name='property_damage']:checked").val() == "No") {
            $("#step_1").addClass("sr-only", 2000);
            $("#step_4").removeClass("sr-only", 2000);
        } else {
            $("#step_1").addClass("sr-only", 2000);
            $("#step_2").removeClass("sr-only", 2000);
        }
	});
	// Step 1 End
	
	// Step 2 Start
	$("[name='medical_treatment']").click(function(){
        if($("[name='medical_treatment']:checked").val() == "No") {
            $("#step_2").addClass("sr-only", 2000);
            $("#step_3").removeClass("sr-only", 2000);
        } else {
            $("#step_2").addClass("sr-only", 2000);
            $("#step_4").removeClass("sr-only", 2000);
        }
	});
	// Step 2 End

	// Step 3 Start
	$("[name='injuries_documented']").click(function(){
		$("#step_3").addClass("sr-only", 2000);
		$("#step_4").removeClass("sr-only", 2000);
	});
	// Step 3 End

	// Step 4 Start
	$("[name='worth']").click(function(){
		$("#step_4").addClass("sr-only", 2000);
		$("#step_5").removeClass("sr-only", 2000);
	});
	// Step 4 End

	// Get the form.
	var form = $('#clhc_form');

	// Get The submit button
	var submitBtn = $('#clhc_submit');

	// Get the messages div.
	var responseMsg = $('#responseMsg');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Make the button disabled
		$(submitBtn).attr('disabled', 'disabled');

		// Show the processing message to the user
		$(responseMsg).text('Please wait ...');
		$(responseMsg).addClass('processing');
		$(responseMsg).removeClass('error');
		$(responseMsg).removeClass('success');

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: new FormData(this),
			contentType: false,
			cache: false,
			processData:false
		})
		.done(function(response) {
			// Make the button active
			$(submitBtn).removeAttr('disabled');

			// Make sure that the responseMsg div has the 'success' class.
			$(responseMsg).removeClass('processing');
			$(responseMsg).removeClass('error');
			$(responseMsg).addClass('success');

			// Set the message text.
			$(responseMsg).text(response);

			// Clear the form.
			$('.form-control').val('');
			window.location.assign("https://womensrightsgroup.com/thank-you")

		})
		.fail(function(data) {
			// Make the button active
			$(submitBtn).removeAttr('disabled');

			// Make sure that the responseMsg div has the 'error' class.
			$(responseMsg).removeClass('processing');
			$(responseMsg).removeClass('success');
			$(responseMsg).addClass('error');

			// Set the message text.
			if (data.responseText !== '') {
				$(responseMsg).text(data.responseText);
			} else {
				$(responseMsg).text('Oops! An error occurred and your message could not be sent.');
			}
		});

	});

});