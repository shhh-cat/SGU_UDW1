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
	var name = $("#name").val();
	$('#table-result').hide(250).fadeOut();
	$("#result").html("");
	
	var data = [];
	if (to < from) {
		var myModal = new jBox('Modal', {
          content: 'Invalid!'
        });
         
        myModal.open();
	}
	else {
		var dataForSearch = [];
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
				if (name.length) {
					if (dataForSearch[i].name.toLowerCase().includes(name.toLowerCase())) {
						data.push(dataForSearch[i]);
					}
				}
				else
					data.push(dataForSearch[i]);
			}
		}
	}




	if (data.length) {
		$('#table-result').show(1000).fadeIn();
		for (var i in data) {
			var link;
	        if (data[i].key === "coffee") {
	          link = 'coffee/'+data[i].id;
	        }
	        else
	          link = 'tools/'+data[i].key+'/'+data[i].id;
	      	$("#result").prepend('<tr> <td>'+capitalizeFirstLetter(data[i].key).replace(/-/g,' ') +'</td> <td>' +data[i].name +'</td> <td> <img src="../'+data[i].img[0]+' " height="100px" width="100px" alt="product"></td> +<td><strong>$'+numberWithCommas(parseFloat(data[i].price).toFixed(2))+'</strong></td> <td><a href="../'+link+'" class="nav-link text-brown">Go<i class="ml-2 fas fa-external-link-alt"></i></a></td> </tr>');
		}
	}
	else {
		$('#table-result').show(1000).fadeIn();
		$("#result").prepend('<tr class="text-center"> <td colspan="4" class="fsize-20">No record found</td></tr>');
	}
		
	
});
