            function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }

            function numberWithCommas(x) {
                return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }

            var currentCategory = window.location.pathname.split("/")[2];
            var currentProduct = window.location.pathname.split("/")[3];

            //GET DATA OF CATEGORY
            var category;
            for (var i in product) {
                if (currentCategory === i) {
                    category = product[i];
                    break;
                }
            }

            //GET POSITION OF PRODUCT
            var i;
            for (var find in category) {
                if (category[find].id === currentProduct) {
                    i = find;
                    break;
                }
            }
            //GET DATA
            var id = category[i].id;
            var detail = category[i].detail;
            var name = category[i].name;
            var brand = category[i].detail.Brand;
            var price = category[i].price;
            var discount = category[i].discount;
            var color = category[i].color;
            var image = category[i].img;
            var desc = category[i].desc;

            //GET ELEMENT OF HTML
            var eDetail = document.getElementById('detail');
            var eName = document.getElementById('name');
            var ePrice = document.getElementById('price');
            var eColor = document.getElementById('color');
            var eImage = document.getElementById('image');
            var eDesc = document.getElementById('description');
            var breadcrumbCategory = document.getElementById('bCategory');
            var breadcrumbProduct = document.getElementById('bProduct');

            //SET BREADCRUMB
            breadcrumbCategory.insertAdjacentHTML('afterbegin',capitalizeFirstLetter(currentCategory));
            breadcrumbCategory.setAttribute("href","/SGU_UDW1/"+currentCategory);
            breadcrumbProduct.insertAdjacentHTML('afterbegin',name);

            //IMAGE DATA
            eImage.insertAdjacentHTML('beforeend','<img class="xzoom" src="'+image[0]+'" xoriginal="'+image[0]+'" width="100%" />');
            if (image.length > 1) {
                eImage.insertAdjacentHTML('beforeend','<div class="row mt-2 no-gutters" id="thumb">');
                for (var i in image) {
                    eImage.insertAdjacentHTML('beforeend','<a href="'+image[i]+'" class="col"><img class="xzoom-gallery" src="'+image[i]+'" width="22%"/></a>');
                }
                eImage.insertAdjacentHTML('beforeend','</div">');
            }

            //TEXT DATA
            ePrice.insertAdjacentHTML('afterbegin','$'+numberWithCommas(parseFloat(price).toFixed(2)));
            if (discount > 0) {
                var priceBefore = price / ((100-discount)/100);
                ePrice.insertAdjacentHTML('beforeend','<del class="fsize-16 ml-2">$'+numberWithCommas(parseFloat(priceBefore).toFixed(2))+'</del><span class="fsize-16 ml-2 text-danger font-weight-bold">-'+discount+'%</span>');
            }
            eName.insertAdjacentHTML('afterbegin','<strong>'+brand+'</strong>');
            eName.insertAdjacentHTML('beforeend',name);
            for(var i in detail){
                eDetail.insertAdjacentHTML('beforeend','<tr><th scope="row">'+i+'</th><td>'+detail[i]+'</td></tr>');
            }

            for(var i in color){
                if (i == 0) {
                    eColor.insertAdjacentHTML('beforeend','<div class="form-check form-check-inline"><input class="form-check-input" type="radio" checked name="color" id="color-'+color[i]+'" value="'+color[i]+'"><label class="form-check-label sm-square" for="color-'+color[i]+'" style="background-color:'+color[i]+';"></label></div>');
                }
                else {
                    eColor.insertAdjacentHTML('beforeend','<div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="color" id="color-'+color[i]+'" value="'+color[i]+'"><label class="form-check-label sm-square" for="color-'+color[i]+'" style="background-color:'+color[i]+';"></label></div>');
                }
            }
            eDesc.insertAdjacentHTML('beforeend',desc);

            //XZOOM PLUGIN
            (function ($) {
            $(document).ready(function() {

            //Integration with "Magnific Popup" plugin
            $(".xzoom, .xzoom-gallery").xzoom({
                position: "right",
            });

            $('.xzoom:first').bind('click', function() {
                var xzoom = $(this).data('xzoom');
                xzoom.closezoom();
                var gallery = xzoom.gallery().cgallery;
                var i, images = new Array();
                for (i in gallery) {
                    images[i] = {src: gallery[i]};
                }
                $.magnificPopup.open({items: images, type:'image', gallery: {enabled: true}});
                event.preventDefault();
            });
            });
            })(jQuery);

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

function addToCart(skip) {
    var amount = $("input.input-spinner").val();
    var color = $("input[name='color']:checked").val()

    var product = {
        "id" : id,
        "amount" : amount,
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

$( "#btnAdd" ).click(function() {
    if (getCookie("username") != "user") {
                window.location = "/SGU_UDW1/login";
              }
        addToCart(false);
        updateCart();
});
$( "#btnBuy" ).click(function() {
    if (getCookie("username") != "user") {
                window.location = "/SGU_UDW1/login";
              }
    addToCart(true);
    window.location.href = "/SGU_UDW1/checkout/cart/";
});





$(".star-rating").html('<span class="fas fa-star"></span><span class="fas fa-star"></span><span class="fas fa-star"></span><span class="fas fa-star"></span><span class="fas fa-star-half-alt"></span>');
