function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

for (var key in product) {
	$("#category").prepend("<option value=\""+key+"\">"+capitalizeFirstLetter(key).replace(/-/g,' ')+"</option>");
}

$("#submit-search").click(function () {
	var category = $("#category").val();
	category = product[category];
	for (var i in category) {
		
	}
	alert(category);
});
