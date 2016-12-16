app.angular
.directive('bindRepeatDirective', function() {
	return function(scope, element, attrs) {
		if (scope.$last){
			setTimeout(function(){
				/**Tooltips**/
				app.updateTooltips();

				/**Zoom**/
				app.$('.zoom').zoom({ on:'grab' });

				/**Smooth scrolling**/
				app.$("a.navigate").click(function(event){
					event.preventDefault();
					var anchor = app.$(this).attr('href');
					var top =  app.$(anchor).offset().top - offset;
					app.$('html, body').animate({
						scrollTop: top
					}, 800);
					app.$('.hamburger').removeClass("is-active");
					app.$('nav > ul').removeClass('is-visible');
				});

				/**Report Broken Link**/
				app.$('.report-link').off('click');
				app.$('.report-link').click(function(event){
					event.preventDefault();
					var name = "website automated reporting",
					email = "postmaster@doomsdaypreppers.tk",
					message = "Link broken: " + app.$(this).attr('data-name') + ' => ' + app.$(this).attr('data-url');

					app.$.ajax({
						type:"POST",
						data: {"name":name,"email":email,"message":message},
						url:"webservice/sendmail.php",
						success: function() {
							alert(app.$('#link-reported').val());
						}
					});
				});
			},800);
}
};
});