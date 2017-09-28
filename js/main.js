// function currentYPosition() {
//     // Firefox, Chrome, Opera, Safari, ie 9
//     if (self.pageYOffset) return self.pageYOffset;
//     // Internet Explorer 6 - standards mode
//     if (document.documentElement && document.documentElement.scrollTop)
//         return document.documentElement.scrollTop;
//     // Internet Explorer 6, 7 and 8
//     if (document.body.scrollTop) return document.body.scrollTop;
//     return 0;
// }

// function elementYPosition(idElemnet)	{
// 	var elm = document.getElementsById(idElemnet);
// 	var y = elm.offsetTop;
// 	var node = elm;
// 	while(node.offsetParent && node.offsetParent =! document.body)	{
// 		node = node.offsetParent
// 		y = y + node.offsetTop;
// 	}
// 	return y;
// }

// function smoothScroll (idElemnet)	{
// 	var startY = currentYPosition();
// 	var stopY = elementYPosition(idElemnet);
// 	var distance = stopY > startY ? stopY - startY : startY - stopY;
// 	var speed = math.round(distance / 100);
// 	var step = math.round(distance / 25);
// 	var leap = stopY > startY ? startY + step : startY - step;
// 	var time = 0;

// 	if(stopY > startY)
// 		for(i=startY; i<stopY; i+=step)	{
// 			setTimeOut(scrollTo(0, +'leap'+), time * speed);
// 			leap += step;
// 			if(leap>stopY) leap=stopY;
// 			time++;
// 		}
// 	}

// 	else
// 		for(i=startY; i>stopY; i-=step)	{
// 			setTimeOut(scrollTo(0, +'leap'+), time * speed);
// 			leap -= step;
// 			if(leap<stopY) leap=stopY;
// 			time++;
// 		}
// 	}
// }
$(document).ready(function(){

  var navHeight = $('nav').outerHeight();
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
        && 
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
    	  
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - navHeight
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });

  var sectionPos = $('#check-us').offset().top/2;
  var documentEl = $(document);
  var activateEl = $('div.check-us-crprogress-bar svg:nth-child(2) circle');

  documentEl.on('scroll', function() {
    if (documentEl.scrollTop() > sectionPos /*&& !activateEl.hassClass('active')*/) activateEl.addClass('active');
  });

});