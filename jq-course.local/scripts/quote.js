$(document).ready(function(){
	$.ajax({
		url: 'http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=ru&jsonp=showQuote',
		dataType: 'jsonp'
	})   
})

function showQuote(res){
	$("#lovelyquote").text(res.quoteText + " - " + (res.quoteAuthor || "Джейсон Стетхем"))
}