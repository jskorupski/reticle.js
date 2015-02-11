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
		var pageX, pageY;
		var ret_left = undefined;
		var ret_right = undefined;
		var reticleoverlay = undefined;

		var docHeight = undefined;
		var docWidth = undefined;
	
		var reticleFrozen = false;
		
		var thisDoc = $(document);
		
		thisDoc.keypress(function( evt ) {
			if (ret_left && ret_right &&  (evt.which == 70 || evt.which == 102)) { /*freeze: f or F*/
				reticleFrozen = !reticleFrozen;
			}
			else if (ret_left && ret_right && reticleFrozen) { /*nudge mode*/
				if (evt.which == 119 || evt.which == 87) { /*up: w or W*/
					pageY--;
					ret_left.css("top", (pageY - docHeight) + "px");
					ret_right.css("top", (pageY) + "px");
				}
				else if (evt.which == 115 || evt.which == 83) { /*down: s or S*/
					pageY++;
					ret_left.css("top", (pageY - docHeight) + "px");
					ret_right.css("top", (pageY) + "px");
				}
				else if (evt.which == 97 || evt.which == 65) { /*left: a or A*/
					pageX--;
					ret_left.css("left", (pageX - docWidth) + "px");
					ret_right.css("left", (pageX) + "px");
				}
				else if (evt.which == 100 || evt.which == 68) { /*right: d or D*/
					pageX++;
					ret_left.css("left", (pageX - docWidth) + "px");
					ret_right.css("left", (pageX) + "px");
				}
			}
			
			
		});
				
		thisDoc.on("mousemove touchmove", function(evt){

          
			
			if(!ret_left) { /*init elements*/
				
				docHeight = $(document).height();
				docWidth = $(document).width();

				reticleoverlay = $("<div/>", {
					id: "reticleoverlay", 
				})
				.height(docHeight)
				.css({
					"opacity" : 0.80,
					"position": "absolute",
					"top": 0,
					"left": 0,
					"width": "100%",
					"z-index": 9007199254740992,
					"overflow": "visible",
					"pointer-events": "none" 
				  });
				reticleoverlay.appendTo("body");
				  
				 
				/* Left and Top crosshair lines */
				ret_left = $("<div/>", {
					id: "reticleleft",    

				})
				.css({
					"position": "absolute",
					"width": (docWidth) + "px",
					"height": (docHeight) + "px",
					"border-right": "1px solid #FF00FF",
					"border-bottom" : "1px solid #FF00FF",
					"pointer-events": "none"
				});

				ret_left.appendTo(reticleoverlay);
					

				/* Right and bottom crosshair lines */
				ret_right = $("<div/>", {
				   id: "reticleright",    

				})
				.css({
					"position": "absolute",
					"width": (docWidth) + "px",
					"height": (docHeight) + "px",
					"border-left": "1px solid #FF00FF",
					"border-top" : "1px solid #FF00FF",
					"pointer-events": "none"
				});
					
				ret_right.appendTo(reticleoverlay);
					  
			}

			if(!reticleFrozen) {
				 
				if(evt.type === "touchmove") {
					pageX = evt.originalevt.touches[0].pageX;
					pageY = evt.originalevt.touches[0].pageY;
				}
				else {
					pageX = evt.pageX;
					pageY = evt.pageY;
				}

				ret_left.css("left", (pageX - docWidth) + "px");
				ret_left.css("top", (pageY - docHeight) + "px");

				ret_right.css("left", (pageX) + "px");
				ret_right.css("top", (pageY) + "px");
			}
		});
	}
})();