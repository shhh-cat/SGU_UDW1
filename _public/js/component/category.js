function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}


var currentCategory = window.location.pathname.split("/")[3];
//GET DATA OF CATEGORY
var category;
for (var i in product) {
    if (currentCategory === i) {
        category = product[i];
        break;
    }
}
var breadcrumbCategory = document.getElementById('bCategory');
breadcrumbCategory.insertAdjacentHTML('afterbegin',capitalizeFirstLetter(currentCategory));


var e = document.getElementById('category');
for(var i in category){
    var price = '$'+numberWithCommas(parseFloat(category[i].price).toFixed(2));
    discount = '';
    if (category[i].discount > 0) {
        discount = '<span class="fsize-12 ml-2 text-white bg-danger rounded p-1 font-weight-bold">-'+category[i].discount+'%</span>';
        var priceBefore = category[i].price / ((100-category[i].discount)/100);
        price += '<del class="fsize-16 ml-2">$'+numberWithCommas(parseFloat(priceBefore).toFixed(2))+'</del>';
    }
        

    e.insertAdjacentHTML('beforeend','<a href="'+category[i].id+'" class="text-decoration-none text-dark">'+
    '<div class="col-md-3 card-deck product-card m-0 p-0 float-left">'+
        '<div class="card-body p-4">'+
            '<img src="'+category[i].img[0]+'" class="card-img-top" alt="test">'+
            '<h5 class="card-title text-brown opensans mt-3 fsize-16"><strong>'+category[i].detail.Brand+'</strong> - '+category[i].name+ discount+'</h5>'+
            '<div class="card-text fsize-20">'+price+'</div>'+
            '<div class="row no-gutters mt-3">'+
                '<a href="#" class="btn btn-outline-dark mr-1 col">Buy now</a>'+
                '<a href="#" class="btn btn-outline-brown col">Add to cart</a>'+
            '</div>'+
        '</div>'+
    '</div>'+
'</a>');
}