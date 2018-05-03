var p = {
   
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
    
    
    //
    // exec sur la class
    set_height_to_parent(".set_height_to_parent", 1);
    
    
    //
    // c'est ICI que ca se passe
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
    
    
    get_content( ".box" );
    
});






//
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
 

