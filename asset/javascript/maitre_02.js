var p = {
    
    vp_w:null,      // view port width
    vp_h:null,      // view port height
    vp_o:"v",   // view port orientation : v, h
    
    
    
   
    do_log : false,
    
    log : function(s){
        if (p.do_log)
        {
            console.log(s);
        }
    }
};


//
// BMK : jQuery ready
jQuery( document ).ready(function( $ ){
     
    var $ = jQuery;
    
    
    // vp size
    // set p. val
    // init_vp_val();
    
    // exec sur la class
    set_height_to_parent(".set_height_to_parent", 1);
 
    
    //
    // utile unit vw et vh dans css au lieu de calculer
    // init_box();
    
    // pour test 02
    if (jQuery("#scrollable").length != 0)
    {
        p.scroller = new FTScroller(document.getElementById('scrollable'), {
                scrollingY: false,
                
                snapping: true,
                snapSizeX:0,
                
                scrollbars: false,
                singlePageScrolls: true,
                updateOnWindowResize: true,
                bouncing: false
            });
    }
    
    /*
    jQuery(window).resize(function(){
        init_vp_val();
        init_box();
    });
    */
    
    
    get_content( ".box" );
    // init_go_to_top();
});





function init_box()
{
    
    jQuery("div.box").css({
            width:p.vp_w,  
            height:p.vp_h
    });
 
    
    jQuery("div.scroll_box").css({
            width:   p.vp_w,  
            height:p.vp_h
    });
    
    jQuery("div.wrap_box").css({
            width:   p.vp_w* jQuery("div.box").length,  
            height:p.vp_h
    });
    
}


//--------------------------------------------------

// FUNCTION : init_vp_val()
// init val des var dimension viewport
function init_vp_val()
{
    //
    // view port height and width
    p.vp_w = jQuery(window).width();
    p.vp_h = jQuery(window).height();
}

 


// fct générique
// 2016
function set_height_to_parent(sel, do_resize_init)
{
    jQuery( sel ).each(function(){
        jQuery(this).height( jQuery(this).parent().height() );
    });
    
    if ( do_resize_init == 1 )
    {
        jQuery(window).resize(function(ev) {
            set_height_to_parent(sel, 0);
        });
    }
}


//--------------------------------------------------
 


function get_url_hash(url)
{
    var idx = url.indexOf("#"),
        hash = idx != -1 ? url.substring(idx+1) : "";
        
    return hash;
}


//
// sel est une class 
// image dans le contenu charger
// avant manupulation
function get_content(sel){
   jQuery( sel ).each(function(){
        var id = jQuery(this).attr( "id" );
        jQuery( "#" + id ).load(id + ".inc.html");
    });
}
 
function init_go_to_top()
{
    
    if ( jQuery('#go_to_top').length == 0 )
        jQuery("body").append("<a href=\"#0\" id=\"go_to_top\">top</a>");
    
    var scroll_top_duration = 700,
		$back_to_top = jQuery('#go_to_top');
		
		
	
	// offset = p.vp_h - jQuery("div#top").height();
	
	
	p.back_to_top_offset = jQuery("div.img_full_vp ").height();
	
	// on resize
	jQuery(window).resize(function() {
	        p.back_to_top_offset = jQuery("div.img_full_vp ").height();
	});
	
	// console.log( offset );
	
	
	jQuery(window).scroll(function(){
	        
		if( ( jQuery(this).scrollTop() > p.back_to_top_offset ) )
        {
            $back_to_top.addClass('visible');
            p.log( "back_to_top is visible");
        }
        else
        {
            $back_to_top.removeClass('visible hidden');
            p.log( "back_to_top is hidden");
        }

	});

	//smooth scroll to top
	$back_to_top.on('click', function(event){
		event.preventDefault();
		jQuery('body,html').animate({
			scrollTop: 0 ,
		 	}, scroll_top_duration
		);
	});
    
}


// pl_img("hoverimage1.jpg","hoverimage2.jpg");
function pl_img(src, cb)
{
    var tmp_obj;
    for (var i=0, l=src.length; i < l; i++) 
    {
        tmp_obj = jQuery("<img />");
        tmp_obj.attr("src", src[i]);
        if ( cb != null ) tmp_obj.load(cb);
    }
    
}

