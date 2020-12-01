function login() {
  $( "form#user-login-form" ).submit(function( event ) {
    if ( $( "input#user-username" ).val() === "user" && $( "input#user-password" ).val() === "123") {
      setCookie("username","user",30);
      window.location.href = '/SGU_UDW1/';
    }
    else {
      $("div.alert").text("This account is invalid").show();
    }
    event.preventDefault();
  });
}

function logout(back) {
  $( "#logoutbtn" ).click(function() {
    setCookie("username","user",-1);
    window.location.href = '/SGU_UDW1/'+back;
  });
}
    