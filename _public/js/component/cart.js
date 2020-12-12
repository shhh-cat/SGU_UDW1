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

function numberWithCommas(x) {
                return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }
if (getCookie("username") != "user") {
                window.location = "/SGU_UDW1/login";
              }

var cart = getCookie("cartData");

var data = JSON.parse(cart);

var dataCart = [];
var sum = 0;
for (var i in data) {
  for (var category in product) {
    var products = product[category];
    for (var j in products) {
      if (data[i].id === products[j].id) {
        dataCart.push({
          "data" : products[j],
          "amount" : data[i].amount,
          "color" : data[i].color,
        });
      }
    }
    
  }
}

//alert(JSON.stringify(dataCart));


function total()
{
  var sum = 0;
  for (var i in dataCart) {
    sum += dataCart[i].amount * dataCart[i].data.price;
  }
  return sum;
}
$('#total').text('$' + total()); 
$('#total-final').text('$' + total()); 
cartItemCount = dataCart.length;
$("#countItem").prepend(cartItemCount);


for (var i in dataCart) {
  
  $('<div class="row mb-4"> <div class="col-md-5 col-lg-3 col-xl-3 d-flex align-items-center"> <div class="rounded mb-3 mb-md-0"> <img class="img-fluid d-block" src="'+dataCart[i].data.img[0]+'" alt="Sample"> </div> </div> <div class="col-md-7 col-lg-9 col-xl-9"> <div> <div class="d-flex justify-content-between"> <div> <h5>'+dataCart[i].data.name+'</h5> <p class="mb-3 text-muted text-uppercase small"></p> <p class="mb-2 text-muted text-uppercase small">Color: <label class="sm-square m-0" style="background-color:'+dataCart[i].color+';"></label></p> </div> <div> <div class="spinner-width"> <input class="input-spinner form-control-sm" product="'+i+'" type="number" value="'+dataCart[i].amount+'" min="1" max="100" step="1"/> </div> <small id="passwordHelpBlock" class="form-text text-muted text-center"></small> </div> </div> <div class="d-flex justify-content-between align-items-center"> <div> <a href="#" onclick="doit()" data-confirm="Do you really want to remove this product?" type="button" class="text-danger small text-uppercase mr-3 remove"><i class="fas fa-trash-alt mr-1"></i> Remove item </a> <!-- <a href="#!" type="button" class="card-link-secondary small text-uppercase"><i class="fas fa-heart mr-1"></i> Move to wish list </a> --> </div> <p class="mb-0"><span><strong id="summary">$'+numberWithCommas(parseFloat(dataCart[i].data.price).toFixed(2))+'</strong></span></p class="mb-0"> </div> </div> </div> </div><hr class="mb-4">').insertBefore('#endCart');
}

var d = new Date();
var a = new Date();
var b = new Date();
a.setDate(d.getDate() + 3);
b.setDate(d.getDate() + 8); 


$( "input.input-spinner" ).change(function() {
  dataCart[$(this).attr("product")].amount = $(this).val();
  $('#total').text('$' + total()); 
  $('#total-final').text('$' + total()); 
});


$('#timeShip').prepend(a.toDateString() + " - " + b.toDateString());
var jbox = new jBox('Confirm', {
  confirmButton: 'Yes, I sure',
  cancelButton: 'Nope'
});

function doit(argument) {
  
  var myModal = new jBox('Modal', {
              content: 'The website is buggy, please buy them to help us fix the error!!',
              addClass: 'bg-danger'
            });
             
            myModal.open();
}