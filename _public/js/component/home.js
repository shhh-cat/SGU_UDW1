function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            function numberWithCommas(x) {
                return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }


var types = [
    "machine" ,
    "roasting" ,
    "grinders-and-accessories",
    "barista-tools" ,
    "milk-jugs-and-latte-art" ,
    "brewers" ,
];

    machine =  document.getElementById('machine');
    roasting = document.getElementById('roasting');
    glinders = document.getElementById('grinder&');
    barista = document.getElementById('baristatools');
    milkjugs = document.getElementById('milkjugsand');
    brewers = document.getElementById('brewers');

for (var u in types) {
    //GET DATA OF CATEGORY
    var category = null;
    for (var a in product) {
        if (types[u] === a) {
            category = product[a];
            break;
        }
    }
    if (category == null) continue;

    var stop;
    switch (u) {
        case '0': 
            stop = 4;
            break;
        case '1': 
            stop = 4;
            break;
        case '2': 
            stop = 4;
            break;
        case '3': 
            stop = 4;
            break;
        case '4': 
            stop = 8;
            break;
        case '5': 
            stop = 4;
            break;
        default:
            break;
    }

    var e;
    switch (u) {
        case '0': 
            e = machine;
            break;
        case '1': 
            e = roasting;
            break;
        case '2': 
            e = glinders;
            break;
        case '3': 
            e = barista;
            break;
        case '4': 
            e = milkjugs;
            break;
        case '5': 
            e = brewers;
            break;
        default:
            break;
    }

    for(var i in category){
        if (i >= stop) break;
        var price = '$'+numberWithCommas(parseFloat(category[i].price).toFixed(2));
        discount = '';
        if (category[i].discount > 0) {
            discount = '<span class="badge badge-danger ml-1">-'+category[i].discount+'%</span>';
            var priceBefore = category[i].price / ((100-category[i].discount)/100);
            price += '<del class="fsize-16 ml-2">$'+numberWithCommas(parseFloat(priceBefore).toFixed(2))+'</del>';
        }
            

        e.insertAdjacentHTML('afterend','<a href="tools/'+types[u]+'/'+category[i].id+'" class="text-decoration-none text-dark">'+
        '<div class="col-md-3 card-deck product-card m-0 p-0 float-left">'+
            '<div class="card-body p-4">'+
                '<img src="'+category[i].img[0]+'" class="card-img-top" alt="test">'+
                '<h5 class="card-title text-brown opensans mt-3 fsize-16"><strong>'+category[i].detail.Brand+'</strong> - '+category[i].name+ discount+'</h5>'+
                '<div class="card-text fsize-20">'+price+'</div>'+
                '<div class="row no-gutters mt-3">'+
                    '<a href="#!" class="btn btn-outline-dark mr-1 col btnBuy" product="'+category[i].id+'" color="'+category[i].color[0]+'">Buy now</a>'+
                    '<a href="#!" class="btn btn-outline-brown col btnAdd" product="'+category[i].id+'" color="'+category[i].color[0]+'">Add to cart</a>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</a>');
    }
}


// THEM VAO GIO HANG

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

function addToCart(id,color,skip) {

    var product = {
        "id" : id,
        "amount" : 1,
        "color" : color,
    };
    var cart = getCookie("cartData");
    if (!cart) {
        var data = [product];
        setCookie("cartData",JSON.stringify(data));
        var myModal = new jBox('Modal', {
          content: 'Added'
        });
         
        myModal.open();
        return;
    }
    if (JSON.parse(cart).findIndex(x => x.id === product.id) != -1) {
        if(!skip) {
            var myModal = new jBox('Modal', {
              content: 'Product has been added to cart already'
            });
             
            myModal.open();

        }
            
        return;
    }
 
    var data = JSON.parse(cart);
    data.push(product);
    setCookie("cartData",JSON.stringify(data));
    var myModal = new jBox('Modal', {
      content: 'Added'
    });
     
    myModal.open();
    
}

$( ".btnAdd" ).click(function() {
    if (getCookie("username") != "user") {
                window.location = "login";
              }
    var id = $(this).attr("product");
    var color = $(this).attr("color");
    addToCart(id,color,false);
    updateCart();
});
$( ".btnBuy" ).click(function() {
    if (getCookie("username") != "user") {
                window.location = "login";
              }
    var id = $(this).attr("product");
    var color = $(this).attr("color");
    addToCart(id,color,true);
    window.location.href = "checkout/cart/";
});
