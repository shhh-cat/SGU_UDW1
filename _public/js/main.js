function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function checkCookie() {
  var username = getCookie("username");
  if (username != "") {
   alert("Welcome again " + username);
  } else {
    username = prompt("Please enter your name:", "");
    if (username != "" && username != null) {
      setCookie("username", username, 365);
    }
  }
}

function updateCart() {
  //Count Product for icon navbar
  if (getCookie("cartData") && getCookie("username") == "user") {
    pnumber = JSON.parse(getCookie("cartData")).length;
    $("#iconCartCount").html('<span class="num bg-success" id="iconCartCount">'+pnumber+'</span>');
  }

}
requirejs.config({
    paths: {
        jquery : 'lib/jquery-3.5.1.min',
        bootstrap : '../bootstrap/js/bootstrap.bundle.min',
        inputSpinner : 'lib/bootstrap-input-spinner',
        data: '../../_data/data',
        auth: 'component/auth',
        search: 'lib/animated-search-filter',
    }
});

requirejs(['jquery','bootstrap','inputSpinner','data','auth','search'], function($,bootstrap,inputSpinner,data,auth,search) {
  var cfgInSpiner = {
      buttonsWidth: "1rem",
  }
  $("input[type='number'].input-spinner").inputSpinner(cfgInSpiner);
  

  var aaa =window.location.pathname.split("/").length;
      var fixlink = aaa-4;
      var back = '';
      for (var i = 0; i < fixlink; i++) {
        back += '../';
      }

  //FIX NAVBAR

  //   $(window).scroll(function() {
  //   var currentScroll = $(window).scrollTop();
  //   if (currentScroll >= 0) {
  //       $( "nav.navbar" ).addClass( "fixed-top").fadeIn(1000);
  //   } else {
  //       $( "nav.navbar" ).removeClass( "fixed-top" );
  //   }
  // });
  //========================
  //UP TO TOP
  $("#back-to-top").click(function(){return $("body, html").animate({scrollTop:0},400),!1});
  $(function(){$('[data-toggle="tooltip"]').tooltip()});
  //========================
  updateCart();
  //SHOW LOGGED
  var auth = document.getElementById('auth');
  if (auth) {
    if (getCookie("username") === "user") {
      auth.insertAdjacentHTML('afterbegin',
      '<div class="dropdown">'+
        '<a class="nav-link py-3 mr-2 text-light dropdown-toggle" href="#" id="usermenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="opensans fsize-16">Hi !</span> Mona Lisa</a>'+
        '<div class="dropdown-menu dropdown-menu-right opensans fsize-16" aria-labelledby="usermenu">'+
            '<a href="'+back+'user/" class="dropdown-item"><i class="fas fa-user mr-2"></i>Profile</a>'+
            '<a href="'+back+'user/orders" class="dropdown-item"><i class="fas fa-file-alt mr-2"></i>Order history</a>'+
            '<a href="#" class="dropdown-item" id="logoutbtn"><i class="fas fa-sign-out-alt mr-2"></i>Log out</a>'+
        '</div>'+
      '</div>');
    }
    else {
      
      auth.insertAdjacentHTML('afterbegin','<a class="nav-link py-3 mr-2 text-light" href="'+back+'login">LOGIN</a>');
    }
  }
  var authadmin = document.getElementById('admin-auth');
  if(authadmin)
    if (getCookie("admin") === "admin") {
      authadmin.insertAdjacentHTML('afterbegin',
      '<div class="dropdown">'+
        '<a class="nav-link py-3 mr-2 text-light dropdown-toggle" href="#" id="usermenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="opensans fsize-16">Hi !</span> Admin</a>'+
        '<div class="dropdown-menu dropdown-menu-right opensans fsize-16" aria-labelledby="usermenu">'+
            '<a href="#" class="dropdown-item" id="logoutbtn-admin"><i class="fas fa-sign-out-alt mr-2"></i>Log out</a>'+
        '</div>'+
      '</div>');
    }
  
  //
  function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  var dataSearch = getAllProduct(product);
  function search(nameKey){
    var result = [];
    for (var i=0; i < dataSearch.length; i++) {
        if (dataSearch[i].name.toLowerCase().includes(nameKey.toLowerCase())) {
            result.push(dataSearch[i]);
        }
    }
    return result;
  }
  $( "#search-bar" ).on("input",function() {
    var input = $(this).val();
    var searched = [];
    $('#search-result').html("");
    if (input) {
      searched = search(input);
      $('#search-result').addClass('scroll');
    }
    else {
      $('#search-result').html("").removeClass('scroll');
    }

    if (searched.length) {
      for (var i in searched) {
        var link;
        if (searched[i].key === "coffee") {
          link = back+'coffee/'+searched[i].id;
        }
        else
          link = back+'tools/'+searched[i].key+'/'+searched[i].id;
        var item = $('<a></a>').addClass(/*comefromtop*/ 'list-group-item list-group-item-action').attr('href',link).html('<strong>['+capitalizeFirstLetter(searched[i].key).replace(/-/g,' ')+']</strong> '+searched[i].name);
        $('#search-result').prepend(item);//.addClass('pushdown');
      }
    }
    else if(input)
      $('#search-result').prepend('<li class="list-group-item">No record found</li>');
    
    
             
      
      // setTimeout(function () {
      // $('#search-result').removeClass('pushdown');
      // }, 600);
    
    
  });
  $(document).on("click", function(event){
        if(!$(event.target).closest("#searchzone").length){
            $('#ad-search').hide();
            $('#search-result').html("").removeClass('scroll');
            $( "#search-bar" ).val("");
        }
    });
  $( "#search-bar" )
    .focus(function () {
      $('#ad-search').show();
    })
  $(".search").click(function () {
    $('#ad-search').hide();
    $('#search-result').html("").removeClass('scroll');
  })
  
  // enable
  logout(back+'login');
  logoutadmin(back+'admin/login')
  login();

  //
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

