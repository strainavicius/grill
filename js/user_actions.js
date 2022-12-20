		$("#reg-btn").click(function() {
			var password1 = $("#reg-pass-1").val();
			var password2 = $("#reg-pass-2").val();
			var firstName = $("#reg-fname").val();
			var lastName = $("#reg-lname").val();
			var email = $("#reg-email").val();
			var address = $("#reg-address").val();
			var phone = $("#reg-phone").val();
			if (!password1 || !password2 || !firstName || !lastName || !email || !address || !phone) {
				alert("Visi laukeliai privalo būti užpildyti!");
			} else {
				$("#preloader").fadeIn();
				jQuery.ajax({
					url: "register.php",
					data: "firstname=" + firstName + "&lastname=" + lastName + "&email=" + email + "&password1=" + password1 + "&password2=" + password2 + "&address=" + address + "&phone=" + phone,
					type: "POST",
					success: function(response) {
						$("#preloader").delay(500).fadeOut('slow', function() {
							alert(response);
							window.location.reload();
						});
					},
					error: function(response) {
						alert(response);
					}
				});
			}
		});
		$("#login-btn").click(function() {
			var password = $("#login-pass").val();
			var email = $("#login-email").val();
			if (!password || !email) {
				alert("Visi laukeliai privalo būti užpildyti!");
			} else {
				$("#preloader").fadeIn();
				jQuery.ajax({
					url: "login.php",
					data: "email=" + email + "&password=" + password,
					type: "POST",
					success: function(response) {
						$("#preloader").delay(500).fadeOut('slow', function() {
							alert(response);
							window.location.reload();
						});
					},
					error: function(response) {
						alert(response);
					}
				});
			}
		});
		$(".res-delete").click(function() {
			var id = $(this).attr('data-id');
			if (!id) {
				alert("Visi laukeliai privalo būti užpildyti!");
			} else {
				$("#preloader").fadeIn();
				jQuery.ajax({
					url: "res_delete.php",
					data: "id=" + id,
					type: "POST",
					success: function(response) {
						$("#preloader").delay(500).fadeOut('slow', function() {
							alert(response);
							$("#res-"+id).remove();
						});
					},
					error: function(response) {
						alert(response);
					}
				});
			}
		});
		$(".ord-delete").click(function() {
			var id = $(this).attr('data-id');
			if (!id) {
				alert("Visi laukeliai privalo būti užpildyti!");
			} else {
				$("#preloader").fadeIn();
				jQuery.ajax({
					url: "ord_delete.php",
					data: "id=" + id,
					type: "POST",
					success: function(response) {
						$("#preloader").delay(500).fadeOut('slow', function() {
							alert(response);
							$("#ord-"+id).remove();
						});
					},
					error: function(response) {
						alert(response);
					}
				});
			}
		});