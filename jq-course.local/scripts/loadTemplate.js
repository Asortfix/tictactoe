loadTemplate = function(pathTemplate, pathData, callback) {
  var source, template;
    $.ajax({
        url: pathData,
        dataType: 'JSON',
        success: function(data) {
            $.ajax({
                url: pathTemplate,
                success: function(dataTempl){
                    source    = dataTempl;
                    template  = Handlebars.compile(source);
                    if (callback && typeof callback === 'function') {
                    callback(template,data);
                    }                    
                }
            })
        }
    });
};
