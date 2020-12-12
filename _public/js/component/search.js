function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function numberWithCommas(x) {
                return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }
	$("#category").prepend("<option value=\"*\">All</option>");
for (var key in product) {
	$("#category").prepend("<option value=\""+key+"\">"+capitalizeFirstLetter(key).replace(/-/g,' ')+"</option>");
}

$("#submit-search").click(function () {
	var category = $("#category").val();
	var from = $("#from").val();
	var to = $("#to").val();
	$('#table-result').hide(500).fadeIn();
	$("#result").html("");
	
	var data = [];
	if (to < from) {
		var myModal = new jBox('Modal', {
          content: 'Invalid!'
        });
         
        myModal.open();
	}
	else {
		var dataForSearch = []
		if (category === "*") {
			dataForSearch = getAllProduct(product);
		}
		else {
			var key = category;
			dataForSearch = product[category];
			for (var j in dataForSearch)
				Object.assign(dataForSearch[j], {"key":key});
			
		}
		for (var i in dataForSearch) {
			var pricee = dataForSearch[i].price;
			if (pricee >= from && pricee <= to) {
				data.push(dataForSearch[i]);
			}
		}
	}
	//alert(JSON.stringify(data));
	if (data) {
		$('#table-result').show(1000).fadeIn();
		for (var i in data) {
			var link;
	        if (data[i].key === "coffee") {
	          link = '/SGU_UDW1/coffee/'+data[i].id;
	        }
	        else
	          link = '/SGU_UDW1/tools/'+data[i].key+'/'+data[i].id;
	      	$("#result").prepend('<tr> <td>'+capitalizeFirstLetter(data[i].key).replace(/-/g,' ')+'</td> <td>'+data[i].name+'</td> <td><strong>$'+numberWithCommas(parseFloat(data[i].price).toFixed(2))+'</strong></td> <td><a href="'+link+'" class="nav-link text-brown">Go<i class="ml-2 fas fa-external-link-alt"></i></a></td> </tr>');
		}
	}
	
});
