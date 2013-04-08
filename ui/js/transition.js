function sampleTransition() {
	// 1. Draw the selection box
  $('.input').animate({
    opacity: 'show',
  }, 1000, function() {
    // Animation complete.
  });
	//$(".input").show();
	// 2. Move the selection box to the left side
	// 3. Show the compact widget hinged to left
  $('.input').animate({
    opacity: 'show',
  }, 1000, function() {
    // Animation complete.
  });
	
  $('#box').animate({
    attr: ("src", 'img/mockups/Kinect_Pinned.svg'),
  }, 1000, function() {
    // Animation complete.
  });
	//$("#box").attr("src","img/mockups/Kinect_Pinned.svg");
}

$(document).ready(function() {
	$.ajax({
		url: "kinect.xml",
		dataType: "xml",
		success: function (svg) {
					$(".device-icon").append(svg);
					$("body").html($("body").html());
		}
	}
	);

});