$(document).ready(function() {
	current_page = "" + $(".current-page").attr('id');

	{ /* Navbar animation */
		$("#navbar-"+ current_page).css({"opacity" : "100%"});
        $("#navbar-"+ current_page).css({"border-bottom" : "3px solid #324aa0"}); //color: #476d30;

		$(".navbar-links").hover(function() {            
			if(this.id != "navbar-"+current_page) {				
                $(this).css({"opacity" : "100%"});
                $(this).css({"border-bottom-width" : "3px"});			
			}			
		},function() {			
			if(this.id != "navbar-"+current_page) {
				$(this).css({"opacity" : "50%"});
                $(this).css({"border-bottom-width" : "0px"});					
			}		
		});		
	}	
	{ /* Mobile Navbar animation */
		$("#mobnavbar-button").click(function() {
			if( $("#mobnavbar-list").css("display") == "none" )
				$("#mobnavbar-list").css({"display" : "block"});
			else 
				$("#mobnavbar-list").css({"display" : "none"});
			this.classList.toggle("change"); 
		});
    }

    {
        $(".entry-blocks").hover(function(){
			$(this).stop();
			$(this).animate({"padding" : "4.4vh 4.4vw 4.4vh 4.4vw"},80,'swing');
			$(this).animate({"margin" : "5.6vh 5.6vw 5.6vh 5.6vw"},80,'swing');		
        }, function(){    
			$(this).stop();
			$(this).animate({"padding" : "5vh 5vw 5vh 5vw"},80,'swing');
			$(this).animate({"margin" : "5vh 5vw 5vh 5vw"},80,'swing');		    
        });
    }
});
