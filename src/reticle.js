(function(){
	//Inject jquery for our own usage
	script = document.createElement( "script" );
	script.src = "https://code.jquery.com/jquery-2.1.3.min.js"; 
	script.onload=useReticle;
	document.body.appendChild(script);

	function useReticle() {
		//Use the version of jquery we just injected, but ensure it doesn't interfere with existing one (if any)
		injectReticle(jQuery.noConflict( true ));
	}
	function injectReticle($) {
		var pageX, pageY;
		var ret_left = undefined;
		var ret_right = undefined;
		var reticleoverlay = undefined;
		var disabled = false;

		var docHeight = undefined;
		var docWidth = undefined;
	
		var reticleFrozen = false;
		
		var thisDoc = $(document);
		
		thisDoc.keypress(function( evt ) {
			if (ret_left && ret_right &&  (evt.which == 70 || evt.which == 102)) { /*freeze: f or F*/
				reticleFrozen = !reticleFrozen;
			}
			else if (evt.which == 81 || evt.which == 113) { /*disable: q or Q*/
		
					if(ret_left && ret_right) {
						disabled = true;
						reticleFrozen = false;
						reticleoverlay.remove();
						reticleoverlay = ret_left = ret_right = docHeight = docWidth = undefined;			
					}
					else {
						disabled = !disabled;
						if(!disabled) { reticleFrozen = false; }
					}	
			}
			else if (ret_left && ret_right && reticleFrozen) { /*nudge mode*/
				if (evt.which == 119 || evt.which == 87) { /*up: w or W*/
					pageY--;
					ret_left.css("top", (pageY - docHeight + 1) + "px");
					ret_right.css("top", (pageY) + "px");
				}
				else if (evt.which == 115 || evt.which == 83) { /*down: s or S*/
					pageY++;
					ret_left.css("top", (pageY - docHeight + 1) + "px");
					ret_right.css("top", (pageY) + "px");
				}
				else if (evt.which == 97 || evt.which == 65) { /*left: a or A*/
					pageX--;
					ret_left.css("left", (pageX - docWidth + 1) + "px");
					ret_right.css("left", (pageX) + "px");
				}
				else if (evt.which == 100 || evt.which == 68) { /*right: d or D*/
					pageX++;
					ret_left.css("left", (pageX - docWidth + 1) + "px");
					ret_right.css("left", (pageX) + "px");
				}
				
			}
			

		});
				
		thisDoc.on("mousemove touchmove", function(evt){

			
			if(!ret_left && !disabled) { /*init elements*/
				
				docHeight = $(document).height();
				docWidth = $(document).width();

				reticleoverlay = $("<div/>", {
					id: "reticleoverlay", 
				})
				.height(docHeight)
				.width(docWidth)
				.css({
					"opacity" : 0.80,
					"position": "absolute",
					"top": 0,
					"left": 0,
					"z-index": 9007199254740992,
					"overflow": "hidden",
					"pointer-events": "none" 
				  });
				reticleoverlay.appendTo("body");
				  
				 
				/* Left and Top crosshair lines */
				ret_left = $("<div/>", {
					id: "reticleleft",    

				})
				.height(docHeight)
				.width(docWidth)
				.css({
					"position": "absolute",
					"border-right": "1px solid #FF00FF",
					"border-bottom" : "1px solid #FF00FF",
					"pointer-events": "none",
					"box-sizing": "border-box"
				});

				ret_left.appendTo(reticleoverlay);
					

				/* Right and bottom crosshair lines */
				ret_right = $("<div/>", {
				   id: "reticleright",    

				})
				.height(docHeight)
				.width(docWidth)
				.css({
					"position": "absolute",
					"border-left": "1px solid #FF00FF",
					"border-top" : "1px solid #FF00FF",
					"pointer-events": "none",
					"box-sizing": "border-box"
				});
					
				ret_right.appendTo(reticleoverlay);		  
			}

			if(!reticleFrozen && !disabled) {
				 
				if(evt.type === "touchmove") {
					pageX = evt.originalEvent.touches[0].pageX;
					pageY = evt.originalEvent.touches[0].pageY;
				}
				else {
					pageX = evt.pageX;
					pageY = evt.pageY;
				}

				ret_left.css("left", (pageX - docWidth + 1) + "px");
				ret_left.css("top", (pageY - docHeight + 1) + "px");

				ret_right.css("left", (pageX) + "px");
				ret_right.css("top", (pageY) + "px");
			}
		});
	}
})();