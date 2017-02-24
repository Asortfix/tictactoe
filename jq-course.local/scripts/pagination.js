var currentPage = 1;
var newsByPage = 7;
var countOfPage;

function nextPage(){
    if(currentPage+1<=countOfPage){
       currentPage++     
       loadPage()
    } 
}

function prevPage(){
    if(currentPage-1>0){
       currentPage--
       loadPage() 
    } 
}

function loadPage(){
    loadTemplate('templates/news-item.hbs','mocks/digg.json', function(template,data){
        countOfPage = Math.ceil(data.stories.length/newsByPage)
        $("#pagenum").html("<span>" + currentPage + " of " + countOfPage + "</span>")
        $('#newsitems').html("")
        data.stories.forEach(function(item,i,arr){
            if(i+1<=currentPage*newsByPage&&i+1>=(currentPage-1)*newsByPage){
                $('#newsitems').append(template({item:item}))
            }       
        })
    })

}

$(document).ready(function(){
    loadPage()
})