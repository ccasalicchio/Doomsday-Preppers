var offset = 80;
var counter = 0;
app.encode = function(url){
    return encodeURI(url);
};
app.replaceSpace = function(str){
    if(str!==undefined)
        return str.split(' ').join('+');
};
app.$(function (){
    "use strict";
    app.$.noConflict();
    
    /**Flowtype**/
    app.$('body').flowtype({
     minFont : 8,
     maxFont : 18,
     minimum : 480, 
     maximum : 1200
 });

    /**Remove Loader**/
    setTimeout(function(){
        app.$('.loader').fadeOut();
    },1*1000);

    /**Hamburger Menu**/
    app.$(".hamburger").click(function(){
        app.$(this).toggleClass("is-active");
        app.$('nav > ul').toggleClass('is-visible');
    });

    /**Sticky Navigation**/
    app.$("nav").sticky({ topSpacing: 0 });

    /**Back to top functions**/
    app.$('#backtop').click(function (){
        var top = app.$('a[id="start"]').offset().top;
        app.$('html, body').animate({scrollTop: top}, 800);
    });

    app.$('#backtop').hide();

    app.$(document).scroll(function(){
        if(app.$(document).scrollTop()>150){
            if(app.$(document).width()>680)
                app.$('#backtop').fadeIn();
        }
        else{
            app.$('#backtop').fadeOut();
        }
    });

    /**Search Function**/
    app.$('.close').click(function(){
        app.$("#searchBox").removeClass('visible');
    });
    app.$('.fa-search').click(function(event){
        app.$("#searchBox").toggleClass('visible');
        app.$("#txtsearch").focus();
    });

    app.$("#btnsearch").click(function(event){
        app.$("body").removeHighlight();
        app.$("body").highlight(app.$("#txtsearch").val());
        var curr = app.$('.highlight')[counter];
        var top =  app.$(curr).offset().top - offset;

        app.$('html, body').animate({
            scrollTop: top
        }, 800);
        counter++;
        if(counter>=app.$('.highlight').length)counter=0;
    });

    /**Selecting text in search**/
    app.$("#txtsearch").focus(function(){
        if(app.$(this).val()!=="") app.$(this).val("");
    });
    /**Pressing Enter proceeds search**/
    app.$("#txtsearch").keypress(function(e){
        if(e.which===13) {
            app.$("#btnsearch").click();
        }
    });

    /**Contact form**/
    app.$('#submit').click(function(event){

        var input = app.$('input[name=captcha]').val();
        var response = app.$('#captcha-response').val();
        var wrong = app.$('#captcha-wrong').val();

        if(input!==response){
            alert(wrong);
            event.preventDefault();
            return;
        }

        app.$(app.$('input[required],textarea')).each(function(){
            if(app.$(this).val()===''){
                app.$(this).addClass('error');
            }
        });

        if(app.$('input[required],textarea').val()===''){

            event.preventDefault();
            return;
        }

        app.$('input[required],textarea').removeClass('error');
        app.$('.single4').show();

        app.$.ajax({
            type:"POST",
            data: app.$('form').serialize(),
            url:"webservice/sendmail.php",
            success: function() {
                app.$('form').hide();
                app.$('.single4').hide();
                app.$('#success').show();
            },
            error: function() {
                app.$('#error').fadeIn();
                app.$('.single4').hide();
            }
        });
    });
});