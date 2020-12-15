function login() {
  $( "form#user-login-form" ).submit(function( event ) {
    if ( $( "input#user-username" ).val() === "user" && $( "input#user-password" ).val() === "123") {
      setCookie("username","user",30);
      window.location.href = '../';
    }
    else {
      $("div.alert").text("This account is invalid").show();
    }
    event.preventDefault();
  });

  $( "form#admin-login-form" ).submit(function( event ) {
    if ( $( "input#user-username" ).val() === "admin" && $( "input#user-password" ).val() === "iamadmin") {
      setCookie("admin","admin",30);
      window.location.href = '../admin/';
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
    window.location.href = back;
  });
  $( "#logoutbtn-admin" ).click(function() {
    setCookie("admin","admin",-1);
    window.location.href = back;
  });
}
    