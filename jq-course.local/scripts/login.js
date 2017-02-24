
var emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	dialog


function openLoginForm(){
	dialog = $("#loginRegisterForm")

	$.ajax({
		url:'templates/login-overlay.html',
		success: function(html){
			dialog.html(html).dialog({
				buttons: {
			        Cancel: function() {
			          dialog.dialog("close");
			        },
			        Login: function() {
			        	addUser('login')
			        }				    
			    },
			    modal:true
			})

		}
	})
}



function openRegisterForm(){
	dialog = $("#loginRegisterForm")

	$.ajax({
		url:'templates/register-overlay.html',
		success: function(html){
			dialog.html(html).dialog({
				buttons: {
			        Cancel: function() {
			          dialog.dialog("close");
			        },
			        Register: function() {
			        	addUser('register')
			        }			    
			    },
			    modal:true
			})

		}
	})
}


function addUser(p) {

	var login = $( "#flogin" ),
		loginNew = $( "#floginnew" ),
		email = $( "#femail" ),
		password = $( "#fpass" ),
		allFields = $( [] ).add( login ).add( email ).add( loginNew ).add( password ),
		loginTextLine = $("#hlogin")
		

    var valid = true;

      allFields.removeClass( "ui-state-error" );
	if(p=='register'){
		
		valid = valid && checkLength( email, "email", 6, 80 );
		valid = valid && checkLength( loginNew, "login", 3, 16 );
      	
		valid = valid && checkRegexp( email, emailRegex, "eg. ui@jquery.com" );	
      	valid = valid && checkRegexp( loginNew, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );    	
	}
	else if(p=='login'){

		valid = valid && checkLength( login, "username", 3, 16 );
     	valid = valid && checkLength( password, "password", 5, 16 );

     	valid = valid && checkRegexp( login, /^[a-z]([0-9a-z_\s])+$/i, "Username may consist of a-z, 0-9, underscores, spaces and must begin with a letter." );
     	valid = valid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
	}
 
      if ( valid ) {
        if(p=='login'){
        	loginTextLine.html("<p style='color:green'>You are logged in as " + login.val() + "</p>")
        	$("#loginform").submit() 
        } 
        else if(p=='register'){
        	$("#registerform").submit()  
        }
        dialog.dialog( "close" );
      }
      return valid;
    }

    function updateTips( t ) {
    	var tips = $( ".validateTips" )
      tips
        .text( t )
        .addClass( "ui-state-highlight" );
      setTimeout(function() {
        tips.removeClass( "ui-state-highlight", 1500 );
      }, 500 );
    }
 
    function checkLength( o, n, min, max ) {
      if ( o.val().length > max || o.val().length < min ) {
        o.addClass( "ui-state-error" );
        updateTips( "Length of " + n + " must be between " +
          min + " and " + max + "." );
        return false;
      } else {
        return true;
      }
    }
 
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
 