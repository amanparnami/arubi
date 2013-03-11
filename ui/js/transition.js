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
	$("#box").attr("src","img/mockups/Kinect_Pinned.svg");
}