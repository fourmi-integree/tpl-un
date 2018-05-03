var p = {
    
    vp_w:null,      // view port width
    vp_h:null,      // view port height
    vp_o:"v",   // view port orientation : v, h
    
    mo_w:null,       // mobile width triger
    tab_w:null,       // tab width triger
    
    cell_w:480,       // petit mobile width triger def dans css
    
    img_align_opt:{},       // img_align_opt : left, right,center

    header_dsk:450,     // page normale desktop
    header_mo:350,       // page normale mo - n est pas utilise !
    
    
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
    init_vp_val();
    
    
    // menu
    mo_burger();
    
    jQuery(window).resize(function() {
            
        jQuery("#mo_menu").removeClass("open");
        jQuery("#body_over").fadeOut(10);
        
    }); 
    
    
    //
    // get img attr 
    p.img_align_opt.dsk = jQuery("div.img_full_vp div.img").attr("data-align-dsk");
    p.img_align_opt.tab = jQuery("div.img_full_vp div.img").attr("data-align-tab");
    p.img_align_opt.mo = jQuery("div.img_full_vp div.img").attr("data-align-mo");
    
    jQuery.each(p.img_align_opt, function(k,v){
            
        switch (v)
        {
            case "left":
                p.img_align_opt[k] = "0 0";        
            break;
            
            case "right":
                p.img_align_opt[k] = "100% 0";
            break;
            
            case "center":
                p.img_align_opt[k] = "50% 0";
            break;
            
            case "bottom":
                p.img_align_opt[k] = "50% 100%";
            break;
        }         
            
    });
    

    
    
    // page accueil
    if ( jQuery("body").hasClass("page_big") )
    {
        init_page_big();
    }
    
    // page normal
    if ( jQuery("body").hasClass("page") )
    {
        init_page_normal();
    }
    
    
    // exec sur la class
    set_height_to_parent(".set_height_to_parent", 1);
    
    
    
    
    init_pf();
       
    parse_pm("@iphenix.com");
    
    
    
    // init_go_to_top();
});



//--------------------------------------------------

// FUNCTION : init_vp_val()
// init val des var dimension viewport
function init_vp_val()
{
    // param p global
    // js data
    p.mo_w = parseInt( jQuery("#mo_w").text() );
    // js data
    p.tab_w = parseInt( jQuery("#tab_w").text() );
    
    //
    // view port height and width
    p.vp_w = jQuery(window).width();
    p.vp_h = jQuery(window).height();
    p.lang_url = jQuery("#lang_url").text();
    
    jQuery(window).resize(function(){
        p.vp_w = jQuery(window).width();
        p.vp_h = jQuery(window).height();
    });
}


// FUNCTION : init_page_normal()
// image header a la hauteur de 450
// dans le mode desktop et tablette
// utilise une technique similaire a 
// https://scottjehl.github.io/picturefill/
function init_page_normal()
{
    // BMK : methode local
    
    // FUNCTION : dim - dimension
    var dim = function(){
        
        var h_height, img_url, position, size, bg_url;
        
        p.vp_o =  (p.vp_w < p.vp_h) ? "v" : "h";
        jQuery("body")
        
        // if MO
        if ( p.vp_w <= p.mo_w )
        {
            p.log("mo " + p.vp_o);
            // h_height = p.header_mo;
            // ratio 609 x 280
            
            if (p.vp_o == "h")
            {
                h_height = p.vp_h -  jQuery("div#top").height();
            }
            else
            {
                h_height = p.vp_w / 609 * 280;
            }
            img_url = jQuery("div.img_full_vp div.img").attr("data-src-mo");
            bg_url = jQuery("div.img_full_vp").attr("data-src-mo");
            
            size = "100% auto";
            position =  p.img_align_opt.mo;
        }
        // if TAB
        else if ( p.vp_w <= p.tab_w )
        {
            if (p.vp_o == "h")
            {
                h_height = p.vp_h -  jQuery("div#top").height();
            }
            else
            {
                h_height = p.header_dsk;
            }
            img_url = jQuery("div.img_full_vp div.img").attr("data-src-tab");
            bg_url = jQuery("div.img_full_vp").attr("data-src-tab");
            
            size = "100% auto";
            position = p.img_align_opt.tab;
            
            p.log("tab "+ p.vp_o);
        }
        // if DSK
        else
        {
            h_height = p.header_dsk;
            img_url = jQuery("div.img_full_vp div.img").attr("data-src-dsk");
            bg_url = jQuery("div.img_full_vp").attr("data-src-dsk");
            
            position =  p.img_align_opt.dsk;
            size = "auto auto";
            
            p.log("dek "+ p.vp_o);
        }
        
        
        jQuery("div.img_full_vp").css({
                backgroundImage: "url(" + bg_url + ")"
        });
        
        jQuery("div.img_full_vp div.img").css({
                backgroundImage: "url(" + img_url + ")",
                height: h_height + "px",
                backgroundPosition: position,
                backgroundSize: size 
        });
        
    };
    
    
    
    
    
    
    
    jQuery(window).resize(function(){
        dim();
    });
    
    dim();
}
// init pg normal




// FUNCTION : init_page_big()
// page accueil
// image header a la hauteur du view port
// dans le mode desktop et tablette
// image est dans le bg
function init_page_big()
{
    // methode local
    var dim = function(){
        
        var h_height, img_url, position, size, bg_url;
       
        
        // if MO
        if ( p.vp_w <= p.mo_w )
        {
            p.log("mo"); 
            // hauteur de l'image pas plus grosse que le view port
            
            // ratio de l'image = 480 x 320
            // p.vp_w/480 = h/320
            h_height = p.vp_w / 480 * 320;
            
            
            
            img_url = jQuery("div.img_full_vp div.img").attr("data-src-mo");
            bg_url = jQuery("div.img_full_vp").attr("data-src-mo");
           
            position =  p.img_align_opt.mo;
           
           
            // btn fleche pg accueill
            // fleche - texte
             
            jQuery("div.btn_flech").hide();
            
            size = "100% auto";
        }
        // if TAB
        else if ( p.vp_w <= p.tab_w )
        {
            p.log("tab big");
            // h_height = p.header_mo;
            h_height = p.vp_h - jQuery("div#top").height();
            
            img_url = jQuery("div.img_full_vp div.img").attr("data-src-tab");
            bg_url = jQuery("div.img_full_vp").attr("data-src-tab");
            
            // 1176 x 768
            // p.vp_w/1176 = h/768
            
            if ( h_height < (p.vp_w / 1176 * 768) )
            {
                position =  "50% 0";
            }
            else
            {
                position = p.img_align_opt.tab;
            }
            
            // btn fleche pg accueill
            // fleche - texte
            if (
// texte
( jQuery("div.top_label_box div.top div.label").offset().top + jQuery("div.top_label_box div.top div.label").height() + jQuery("#top").height() + 30 ) > p.vp_h
|| 
( ( jQuery("div.btn_CTA").offset().top +  jQuery("div.btn_flech").height() + jQuery("#top").height() ) > p.vp_h )
               )
            {
                jQuery("div.btn_flech").hide();
            }
            else
            {
                jQuery("div.btn_flech").show();
            }
            
            
            size = "100% auto";
        }
        // if DSK
        else
        {
           
             
            h_height = p.vp_h - jQuery("div#top").height();
            img_url = jQuery("div.img_full_vp div.img").attr("data-src-dsk");
            bg_url = jQuery("div.img_full_vp").attr("data-src-dsk");
            
            // 2100 x   850
            // p.vp_w/2100 = h/850
            // if ( h_height < (p.vp_w / 2100 * 850) )
            // pas de ratio car pour l'image dsk on est size : auto auto
            // de modification de la dimension de l'image
            if ( h_height < 785) 
            {
                position =  "50% 0";
                p.log("dsk big ratio text, h = " + h_height);
            }
            else
            {
                p.log("dsk big ");
                position =  p.img_align_opt.dsk;
            }
            
            
            // btn fleche pg accueill
            // fleche - cta
            if ( ( jQuery("div.btn_CTA").offset().top + jQuery("#top").height() + 30 ) > p.vp_h )
            {
                jQuery("div.btn_flech").hide();
            }
            else
            {
                jQuery("div.btn_flech").show();
            }
            
            size = "auto"; // normal
            
        }
        
        
        jQuery("div.img_full_vp").css({
                backgroundImage: "url(" + bg_url + ")"
        });
        
        if ( h_height != "")
        {
            jQuery("div.img_full_vp div.img").css({
                    backgroundImage: "url(" + img_url + ")",
                    height: h_height + "px",
                    backgroundPosition: position,
                    backgroundSize : size
            });
        }
        else{
            // just image
            jQuery("div.img_full_vp").css({
                    backgroundImage: "url(" + img_url + ")"
            });
        }
        
        
        
    };
    
    jQuery(window).resize(function(){
        dim();
    })
    
    dim();
}
// init page big

//--------------------------------------------------


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

// patern
// [[pm:info]] => mail alias
// var at_part = "@aircom.ca";
function parse_pm(at_part){
    var rq =jQuery( "span:contains('[[pm:')");
        
        
    rq.each(function(k,v){
        var src = jQuery(v).html(),
            re = /\[\[pm:(.*)\]\]/g,
            newstr = "";
            
        newstr = src.replace(re, '<a href="mailto:' + '$1' + at_part + '">' + '$1' + at_part + '</a>');
        jQuery(v).html(newstr);
    });
}


function get_url_hash(url)
{
    var idx = url.indexOf("#"),
        hash = idx != -1 ? url.substring(idx+1) : "";
        
    return hash;
}


/*

1- ajouter une image sentinel pour la hauteur
2- retirer ctrl animation qunad seulement une image
+ prelaod
*/
// FUNCTION init port folio
function init_pf()
{
    if (jQuery("#pf_lst"))
    {
        
        // load img
        
        var pl_src = [],
            pl_length,
            pl_c=0;
        
        jQuery("#pf_lst").hide();
        
        jQuery("#pf_lst img").each(function(k,v){
            pl_src[pl_src.length] = jQuery(v).attr("src");
        });
        
        pl_length = pl_src.length;
        
        pl_img(pl_src, function(){
                pl_c ++;
                p.log( pl_c + " / " + pl_length);
                if ( pl_c == pl_length )
                {
                    jQuery("#pf_lst").show();
                    jQuery("#nav_type li:first-child a").click();
                    p.set_pf_size();
                    p.f_calc();
                    
                }
        });
        
        
        
        p.f_calc = function(){
            
            
            // dimension sentinel
            // en fct de la premier image du pf
            p.pf_ss_h = p.pf_h / p.pf_w * jQuery("#pf_detail div.ss").width();
                 
            if ( p.vp_w > p.cell_w)
            {
                
                
                // si img == div
                if ( jQuery("#pf_detail div.ss").width() == jQuery("#pf_detail").width() )
                {
                    
                   // hateur img + hauteur texte
                   p.pf_ss_h = p.pf_ss_h + jQuery("#pf_detail div.info").height();
                   
                }
                
                
                
            }
            else
            {
                 
                 p.pf_ss_h = p.pf_ss_h + jQuery("#pf_detail div.info ").height() + 100;
                 
            }
            
        },
        
        p.f_close = function(){
            jQuery("#pf_detail").animate({
                height:0},
                500);
            
            jQuery("#ss_nav_prev, #ss_nav_next, #pf_pager").fadeOut();
            p.pf_detail = false;
        },
        
        
        p.f_open = function(img_count, empty){
            // show
            
           
            
            if ( p.pf_detail == false )
            { 
                // recalc
                p.f_calc();
                
                //
                // p.pf_ss_h calcule on window resize
                jQuery("#pf_detail").animate({height: p.pf_ss_h +"px"}, 500);
                p.pf_detail = true;
            }    
          
            
            if ( p.vp_w > p.cell_w)
            {
                if ( !empty && (img_count > 1) )
                    jQuery("#ss_nav_prev, #ss_nav_next, #pf_pager").fadeIn();
            
                // sentinel
                // loding
                if (empty)
                { 
                    jQuery("#pf_detail div.ss_img span").show();
                    
                    // loading icon
                    jQuery("#pf_temoin").show();
                }
                else
                {
                    // sentinel
                    jQuery("#pf_detail div.ss_img span").hide();
                    
                    // loading icon
                    jQuery("#pf_temoin").hide();
                }
            }
            else
            {
                // cell - petit mobile
                jQuery("#ss_nav_prev, #ss_nav_next, #pf_pager, #pf_temoin").hide();
                jQuery("#pf_detail div.ss_img span").hide();
            }
           
        },
        
        p.f_clear = function(){
            
            // clear data
            jQuery("#pf_detail div.ss_img > img").remove();
            //  sentinel
            jQuery("#pf_detail div.ss_img span").show();
            
            jQuery("#pf_detail ul.ss_pager").html("");
            jQuery("#pf_detail div.ss_img" ).cycle('destroy');
            jQuery("#pf_detail dd.client").text("");
            jQuery("#pf_detail dd.secteur").text("");
            
            jQuery("#pf_detail dd.mandat").text("");
            jQuery("#mandatline").hide();
            
            
            jQuery("#ss_nav_prev, #ss_nav_next, #pf_pager").fadeOut();
            
        },
        
        p.set_pf_size = function(){
            // set parametre image
            // dimension sentinel
            // en fct de la premier image du pf
            
            var tmp = jQuery("#pf_lst a:first-child img");
            p.pf_h = tmp.height();
            p.pf_w = tmp.width();
            tmp = p.pf_h > p.pf_w ? p.pf_h : p.pf_w;
            p.pf_h = p.pf_h / tmp;
            p.pf_w = p.pf_w / tmp;
            p.pf_ss_h = 0;  // init, est fermé
        };
        
        p.pf_detail = false;
        
        //
        // click item du pf
        jQuery("#pf_lst a").on( "click", function() {
                
            
            p.f_clear();
            p.f_open(0, 1);
          
            
            // set style selecte
            jQuery("#pf_lst a").removeClass("sel");
            jQuery(this).addClass("sel");
            
            if ( p.vp_w > p.cell_w)
            {
                UIkit.Utils.scrollToElement( UIkit.$('#contenu_pg'), {offset:0} );
            }
            else
            {
                // si petit
                UIkit.Utils.scrollToElement( UIkit.$('#contenu_pg'), {offset:-90} );    
            }
            
            var url = jQuery("#jsData_ref").text(),
                item_ID = get_url_hash( jQuery(this).attr("href") );
            // get data
            jQuery.ajax({
                type: "POST",
                url: url,
                data: {
                    action: "pf_get_item",
                    referer: url,
                    id: item_ID
                }
            }).done(function( data ){
            
                // set data
                // text
                jQuery("#pf_detail dd.client").text(data.client);
                jQuery("#pf_detail dd.secteur").text(data.secteur);
                data.mandat = jQuery.trim(data.mandat);
                if (data.mandat == "" )
                {
                    jQuery("#mandatline").hide();
                }
                else
                {
                    jQuery("#mandatline").show();
                    jQuery("#pf_detail dd.mandat").text(data.mandat);
                }
                
                
                // img
                var img_count = data.img.length;
                for(var i=0; i<img_count; i++)
                {
                    jQuery("#pf_detail div.ss_img").append("<img src='" + data.img[i][0] + "'>");
                }
                
                p.f_open(img_count, 0);
            
                if ( img_count > 1 )
                {
                    jQuery("#pf_detail div.ss_img" ).cycle({
                        paused: true,
                        prev:"#ss_nav_prev",
                        next:"#ss_nav_next",
                        pager: "#pf_detail ul.ss_pager",
                        pagerTemplate: "<li><a href='#'></a></li>",
                        pagerActiveClass: "uk-active"
                    });
                }
                else
                {
                    // sentinel
                    jQuery("#pf_detail div.ss_img span").hide();
                }
                
                // recal selon contenu
                var old_pf_ss_h = p.pf_ss_h;
                p.f_calc();
                if ( old_pf_ss_h != p.pf_ss_h )
                {
                    p.log("h a change");
                     jQuery("#pf_detail").css("height", p.pf_ss_h + "px");
                    jQuery("#pf_detail").animate({height: p.pf_ss_h +"px"}, 500);
                }
                
            });
            
            
            return false;
        });
        
        // close
        jQuery("#tag a, #pf_detail div.ss_close").on( "click", function() {
            if ( p.pf_detail )
            {
                // set style selecte
                jQuery("#pf_lst a").removeClass("sel");
                p.f_close();
            }
        });
        
        
        
        // resize - recalc
        // height div.ss
        jQuery(window).resize(function(){
              p.f_calc();
             if (p.pf_detail)
             {
                  // en fct de  image
                  jQuery("#pf_detail").css("height", p.pf_ss_h + "px");
                 
             }
        });
        
        
        
        // a faire
        // on doit looper les item parent qui on l'attribut  
        // aria-hidden!='true'
        //
        // nav script
        // next - prev from current
        jQuery("#e_nav_prev").on( "click", function() {
                var jq_ref = jQuery("#pf_lst a.sel").parent().parent(),
                loop = 1;
                
                while (loop)
                {
                    jq_ref = jq_ref.prev();
                    
                    if (jq_ref.length == 1) 
                    {
                        if ( jq_ref.attr("aria-hidden") == 'false' )
                        {
                            jq_ref.find("a").click();
                            loop = 0;
                        }
                    }
                    else
                    {
                        // get dernier
                        jq_ref = jQuery("#pf_lst div.uk-grid  div[aria-hidden='false'] ").last();
                        jq_ref.find("a").click();
                        loop = 0;
                    }
                    
                }
                return false;
        });
        
        jQuery("#e_nav_next").on( "click", function() {
                var jq_ref = jQuery("#pf_lst a.sel").parent().parent(),
                    loop = 1;
                
                while (loop)
                {
                    jq_ref = jq_ref.next();
                    
                    if (jq_ref.length == 1) 
                    {
                        
                        if ( jq_ref.attr("aria-hidden") == 'false' )
                        {
                            jq_ref.find("a").click();
                            loop = 0;
                        }
                        
                    }
                    else
                    {
                        // get premier
                        jq_ref = jQuery("#pf_lst div.uk-grid  div[aria-hidden='false'] ").first();
                        jq_ref.find("a").click();
                        loop = 0;
                    }
                }
                return false;
        });
        
    }
}

function mo_burger(){
            
            
    jQuery("#mo_btn").click(function(){
           
        var toggle = jQuery(this).attr("data-toggle"), 
            b1 = Snap.select("#b1"),
            b2 = Snap.select("#b2"),
            b3 = Snap.select("#b3"),
            dt = 250,
            at = mina.linear;
            
        if (toggle == "collapse")
        {
            // do open
            b1.animate({ d: "M17,2    36,18" }, dt, at);
            b3.animate({ d: "M19,2   0,18" }, dt, at);
            
            // b2.animate({ d: "M16,20   16,30  M20,20 20,30" }, dt, at);
            b2.animate({ d: "M18,15   18,15" }, dt, at);
            jQuery(this).attr("data-toggle", "open"); 
        }
        else
        {
            // do close
            b1.animate({ d: "M0,2    36,2" }, dt, at);
            b3.animate({ d: "M0,29   36,28" }, dt, at);
            
            b2.animate({ d: "M0,15   36,15" }, dt, at);
            
            jQuery(this).attr("data-toggle", "collapse");
        }
        
        
        
        jQuery("#mo_menu").toggleClass("open");
          
        if ( jQuery("#mo_menu").hasClass("open") )
        {
            jQuery("#body_over").fadeIn(100);
           // .height( jQuery(window).height() )
        }
        else
        {
            jQuery("#body_over").fadeOut(100);
        }
            
    });
    
    
    jQuery("div.dt_menu li.lang, #mo_menu li.lang").click( function() {
            window.document.location.href = p.lang_url;
            return false;                 
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

