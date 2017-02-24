loadTemplate('templates/nav-cats.hbs','mocks/navigation.json', function(template,data){
    $('#navaccordion').html(template({items:data})).accordion({
        select: function(event, ui) {
            $(".search").submit();
        }
    });
})
