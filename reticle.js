javascript:(function(){
	if (!($ = window.jQuery)) {
		script = document.createElement( "script" );
		script.src = "https://code.jquery.com/jquery-2.1.3.min.js"; 
		script.onload=injectReticle;
		document.body.appendChild(script);
	} 
	else {
		injectReticle();
	}
	 
	function injectReticle() {
		var reticleobjectleft = undefined;
		var reticleobjectright = undefined;
		var reticleoverlay = undefined;

		var docHeight = undefined;
		var docWidth = undefined;

		$(document).on("mousemove", function(evt){
			
			if(!reticleobjectleft) {
				
				docHeight = $(document).height();
				docWidth = $(document).width();

				reticleoverlay = $("<div/>", {
					id: "reticleoverlay", 
				})
				.height(docHeight)
				.css({
					"opacity" : 0.75,
					"position": "absolute",
					"top": 0,
					"left": 0,
					"width": "100%",
					"z-index": 5000,
					"overflow": "visible",
					"pointer-events": "none" 
				  });
				  reticleoverlay.appendTo("body");



				/* Left and Top crosshair lines */
				reticleobjectleft = $("<div/>", {
					id: "reticleleft",    

				})
				.css({
					"position": "absolute",
					"width": (docWidth) + "px",
					"height": (docHeight) + "px",
					"border-right": "1px solid #d00",
					"border-bottom" : "1px solid #d00"
				});

				reticleobjectleft.appendTo(reticleoverlay);
					

				/* Right and bottom crosshair lines */
				reticleobjectright = $("<div/>", {
				   id: "reticleright",    

				})
				.css({
					"position": "absolute",
					"width": (docWidth) + "px",
					"height": (docHeight) + "px",
					"border-left": "1px solid #d00",
					"border-top" : "1px solid #d00"
				});
					
				reticleobjectright.appendTo(reticleoverlay);
					  
			}

			  
			reticleobjectleft.css("left", (evt.pageX - docWidth) + "px");
			reticleobjectleft.css("top", (evt.pageY - docHeight) + "px");
			
			reticleobjectright.css("left", (evt.pageX) + "px");
			reticleobjectright.css("top", (evt.pageY) + "px");
		   
		});
	}
})();

