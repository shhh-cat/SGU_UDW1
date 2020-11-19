requirejs.config({
    paths: {
        jquery : 'lib/jquery-3.5.1.min',
        bootstrap : '../bootstrap/js/bootstrap.bundle.min',
        zoomImage: 'lib/zoom-image',
    }
});

requirejs(['jquery','bootstrap','zoomImage'], function($,bootstrap,zoomImage) {
  //LOGIN PAGE
    $( "form#user-login-form" ).submit(function( event ) {
    if ( $( "input#user-username" ).val() === "user" && $( "input#user-password" ).val() === "123") {
      window.location.href = '/SGU_UDW1/';
    }
    else {
      $("div.alert").text("This account is invalid").show();
    }
    event.preventDefault();
  });
  //FIX NAVBAR

    $(window).scroll(function() {
    var currentScroll = $(window).scrollTop();
    if (currentScroll >= 600) {
        $( "nav.navbar" ).addClass( "fixed-top").fadeIn(1000);
    } else {
        $( "nav.navbar" ).removeClass( "fixed-top" );
    }
  });

  imageZoom("zimage", "zimageResult");
});

function magic() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("insert-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("insert-html");
          magic();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

magic();
/*THANK YOU W3 SCHOOL*/