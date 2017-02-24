$.ajax({
        url: "mocks/search.js",
        dataType: "JSON",
        success: function (data) {
            $("#pojam" ).autocomplete({
                source: data,
				select: function(event, ui) { 
				$(".search").submit();
				}
       		})
    	}
    });