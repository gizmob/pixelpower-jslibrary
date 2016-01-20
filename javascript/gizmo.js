//  "Name": "Pixel Power JavaScript Library",
//  "Author": "Gizmo Beardon",
//  "Version": 0004,
//	"Date" : 01/2016

//gets the computed width of an object
function getWidth(obj) {
	var objWidth 
	try {
		objWidth = ((obj.extents.max.x - obj.extents.min.x) * 0.5)* obj.scale.x;
	}
	catch (err) {
		objWidth = 0;
		//ppLog(err)
	}
	return objWidth;
}

//gets the computed height of an object
function getHeight(obj) {
	var objHeight
	try {
		objHeight = ((obj.extents.max.y - obj.extents.min.y) * 0.5) * obj.scale.y;
	}
	catch (err) {
		objHeight = 0;
		//ppLog(err)
	}
	return objHeight;
}

//gets the right hand edge
function rightEdge(obj){
	var rightEdge
	try {
		rightEdge = obj.position.x + (obj.extents.max.x + obj.offset.x)*obj.scale.x;
	} 
	catch (err) {
		rightEdge = obj.position.x + (obj.offset.x * obj.scale.x);
	}
	return rightEdge;
}

//gets the right hand edge
function leftEdge(obj){
	var leftEdge
	try {
		 leftEdge = obj.position.x + (obj.extents.min.x + obj.offset.x)*obj.scale.x;
	} 
	catch (err) {
		 leftEdge = obj.position.x + (obj.offset.x * obj.scale.x);
	}	
	return leftEdge;
}

//gets the top edge
function topEdge(obj){
	var topEdge
	try {
		topEdge = obj.position.y + (obj.extents.max.y + obj.offset.y)*obj.scale.y;
	} 
	catch (err) {
		topEdge = obj.position.y + (obj.offset.y * obj.scale.y);
	}
	return topEdge;
}

//gets the bottom edge
function bottomEdge(obj){
	var bottomEdge
	try {
		 bottomEdge = obj.position.y + (obj.extents.min.y + obj.offset.y)*obj.scale.y;
	} 
	catch (err) {
		 bottomEdge = obj.position.y + (obj.offset.y * obj.scale.y);
	}	
	return bottomEdge;
}

//// DISTRIBUTE FUNCTIONS
//distributes objects vertically in the order; top to bottom of the array
function distributeVertical(objects) {

	var distance = 0.0, totalHeight = 0.0,  spacing = 0.0;

//check to see if correct number of objects is used
	if(objects.length < 3) {
		return ppLog("distributeVertical requires 3 objects minimum");
	}
//calculate distance
	distance = bottomEdge(objects[0]) - topEdge(objects[objects.length -1]);

//calculate total width of objects
	for(i = 1; i < objects.length - 1; i++){
		totalHeight += getHeight(objects[i]) ;
		
	}

//calculate spacing between objects
	spacing = (distance - (totalHeight * 2)) / (objects.length - 1);
	
	
//position objects
	for(i = 1; i < objects.length - 1; i++) {

//check to see if object is flat text and has an origin property		
		if( objects[i].hasOwnProperty("origin") ){

			if ( objects[i].origin === 8 || objects[i].origin ===  9 || objects[i].origin === 10) {

				objects[i].position.y = bottomEdge(objects[i-1]) - spacing - (getHeight(objects[i])*2) - (objects[i].offset.y * objects[i].scale.y );

			} else if ( objects[i].origin === 4 || objects[i].origin ===  5 || objects[i].origin === 6) {

				objects[i].position.y = bottomEdge(objects[i-1]) - spacing - (objects[i].offset.y * objects[i].scale.y );

			} else {
				
				objects[i].position.y = bottomEdge(objects[i-1]) - spacing - getHeight(objects[i]) - (objects[i].offset.y * objects[i].scale.y );
			}

		} else {
			objects[i].position.y = bottomEdge(objects[i-1]) - spacing - getHeight(objects[i]) - (objects[i].offset.y * objects[i].scale.y );
		}
	}
}

//distributes objects horizontally in the order, left to right of the array
function distributeHorizontal(objects) {

	var distance = 0.0, totalWidth = 0.0,  spacing = 0.0;

//check to see if correct number of objects is used
	if(objects.length < 3) {
		return ppLog("distributeHorizontal requires 3 objects minimum");
	}
//calculate distance
	distance = leftEdge(objects[objects.length -1]) - rightEdge(objects[0]);
//calculate total width of objects
	for(i = 1; i < objects.length - 1; i++){
		totalWidth += getWidth(objects[i]) ;
	}
//calculate spacing between objects
	spacing = (distance - (totalWidth *2)) / (objects.length -1);
//position objects
	for(i = 1; i < objects.length - 1; i++) {

//check to see if object is flat text and has an origin property		
		if( objects[i].hasOwnProperty("origin") ){

			if ( objects[i].origin === 2 || objects[i].origin ===  6 || objects[i].origin === 10) {

				objects[i].position.x = rightEdge(objects[i-1]) + spacing + (getWidth(objects[i])*2) -  (objects[i].offset.x*objects[i].scale.x);

			} else if ( objects[i].origin === 1 || objects[i].origin ===  5 || objects[i].origin === 9) {

				objects[i].position.x = rightEdge(objects[i-1]) + spacing -  (objects[i].offset.x*objects[i].scale.x);

			} else {
				
				objects[i].position.x = rightEdge(objects[i-1]) + spacing + getWidth(objects[i]) -  (objects[i].offset.x*objects[i].scale.x);
			}

		} else {
			objects[i].position.x = rightEdge(objects[i-1]) + spacing + getWidth(objects[i]) - (objects[i].offset.x*objects[i].scale.x);

		}
	}
}
////

////STACK FUNCTIONS
//stack objects horizontally from the first selected objects
//alignment default is alignVertical, options include alignTop, alignBottom
function stackHorizontal(objects, spacing, alignment){

	if(typeof alignment === 'undefined'){ alignment = alignVertical}

	alignment(objects);

	if( typeof spacing === 'undefined'){ spacing = 0.0}
//position objects
	for(i = 1; i <= objects.length - 1; i++) {

//check to see if object is flat text and has an origin property		
		if( objects[i].hasOwnProperty("origin") ){

			if ( objects[i].origin === 2 || objects[i].origin ===  6 || objects[i].origin === 10) {

				objects[i].position.x = rightEdge(objects[i-1]) + spacing + (getWidth(objects[i])*2) -  (objects[i].offset.x*objects[i].scale.x);

			} else if ( objects[i].origin === 1 || objects[i].origin ===  5 || objects[i].origin === 9) {

				objects[i].position.x = rightEdge(objects[i-1]) + spacing -  (objects[i].offset.x*objects[i].scale.x);

			} else {
				
				objects[i].position.x = rightEdge(objects[i-1]) + spacing + getWidth(objects[i]) -  (objects[i].offset.x*objects[i].scale.x);
			}

		} else {
			objects[i].position.x = rightEdge(objects[i-1]) + spacing + getWidth(objects[i]) - (objects[i].offset.x*objects[i].scale.x);

		}
	}
}
//stack objects vertically from the first selected object
//alignment default is alignHorizontal, options include alignLeft, alignRight
//example: stackVertical([a,b,c],0.5,alignLeft)
function stackVertical(objects, spacing, alignment) {

	if(typeof alignment === 'undefined'){ alignment = alignHorizontal}

	alignment(objects);

	if( typeof spacing === 'undefined'){ spacing = 0.0}

//position objects
	for(i = 1; i <= objects.length - 1; i++) {

//check to see if object is flat text and has an origin property		
		if( objects[i].hasOwnProperty("origin") ){

			if ( objects[i].origin === 8 || objects[i].origin ===  9 || objects[i].origin === 10) {

				objects[i].position.y = bottomEdge(objects[i-1]) - spacing - (getHeight(objects[i])*2) - (objects[i].offset.y * objects[i].scale.y );

			} else if ( objects[i].origin === 4 || objects[i].origin ===  5 || objects[i].origin === 6) {

				objects[i].position.y = bottomEdge(objects[i-1]) - spacing - (objects[i].offset.y * objects[i].scale.y );

			} else {
				
				objects[i].position.y = bottomEdge(objects[i-1]) - spacing - getHeight(objects[i]) - (objects[i].offset.y * objects[i].scale.y );
			}

		} else {
			objects[i].position.y = bottomEdge(objects[i-1]) - spacing - getHeight(objects[i]) - (objects[i].offset.y * objects[i].scale.y );
		}
	}
}
////

//// ALIGNMENT FUNCTIONS
//aligns a list of objects to the vertical centre first object in the list
function alignVertical(objects) {
	var boundingEdge;
//calculate top edge position of first object
	
	if(objects[0].hasOwnProperty("origin")){
		
		if ( objects[0].origin === 8 || objects[0].origin ===  9 || objects[0].origin === 10) {
//origin top
			boundingEdge = objects[0].position.y - getHeight(objects[0]) + (objects[0].offset.y * objects[0].scale.y);

		} else if ( objects[0].origin === 4 || objects[0].origin ===  5 || objects[0].origin === 6) {
//origin bottom
			boundingEdge = objects[0].position.y + getHeight(objects[0]) + (objects[0].offset.y * objects[0].scale.y);

		} else {

			boundingEdge = objects[0].position.y + (objects[0].offset.y * objects[0].scale.y);
		}
	} else {

		boundingEdge = objects[0].position.y + (objects[0].offset.y * objects[0].scale.y);
	}

//position objects
	for ( i =1; i < objects.length; i += 1) {
		
//check to see if object is flat text and has an origin property		
		if( objects[i].hasOwnProperty("origin") ){

			if ( objects[i].origin === 8 || objects[i].origin ===  9 || objects[i].origin === 10) {
//origin top
				objects[i].position.y = boundingEdge + getHeight(objects[i])- (objects[i].offset.y * objects[i].scale.y) ;

			} else if ( objects[i].origin === 4 || objects[i].origin ===  5 || objects[i].origin === 6) {
//origin bottom
				objects[i].position.y = boundingEdge - getHeight(objects[i]) - (objects[i].offset.y * objects[i].scale.y) ;
			} else {
				
				objects[i].position.y = boundingEdge - (objects[i].offset.y * objects[i].scale.y);
			}

		} else {
			objects[i].position.y = boundingEdge - (objects[i].offset.y * objects[i].scale.y);
		}
	}


}

//aligns a list of objects to the horizontal centre first object in the list
function alignHorizontal(objects) {

var boundingEdge;
//calculate top edge position of first object
	
	if(objects[0].hasOwnProperty("origin")){
	
		if ( objects[0].origin === 1 || objects[0].origin ===  5 || objects[0].origin === 9) {
	//left origin
			boundingEdge = objects[0].position.x + getWidth(objects[0])+ (objects[0].offset.x  * objects[0].scale.x);

		} else if ( objects[0].origin === 2 || objects[0].origin ===  6 || objects[0].origin === 10) {
	//right origin
			boundingEdge = objects[0].position.x - getWidth(objects[0])+ (objects[0].offset.x  * objects[0].scale.x);

		} else {

			boundingEdge = objects[0].position.x + (objects[0].offset.x * objects[0].scale.x);
		}
	} else {

		boundingEdge = objects[0].position.x + (objects[0].offset.x * objects[0].scale.x);
	}

//position objects
	for ( i =1; i < objects.length; i += 1) {
		
//check to see if object is flat text and has an origin property		
		if( objects[i].hasOwnProperty("origin") ){

			if ( objects[i].origin === 1 || objects[i].origin ===  5 || objects[i].origin === 9) {
		//left origin
				objects[i].position.x = boundingEdge - getWidth(objects[i]) - (objects[i].offset.x  * objects[i].scale.x);

			} else if ( objects[i].origin === 2 || objects[i].origin ===  6 || objects[i].origin === 10) {
		//right origin
				objects[i].position.x = boundingEdge + getWidth(objects[i]) - (objects[i].offset.x  * objects[i].scale.x);
			} else {
				
				objects[i].position.x = boundingEdge - (objects[i].offset.x * objects[i].scale.x);
			}

		} else {
			objects[i].position.x = boundingEdge - (objects[i].offset.x * objects[i].scale.x);
		}
	}
}

//aligns a list of objects to the bottom edge of the first object in the list
function alignBottom(objects) {
var boundingEdge;
//calculate top edge position of first object
	
	if(objects[0].hasOwnProperty("origin")){
		
		if ( objects[0].origin === 8 || objects[0].origin ===  9 || objects[0].origin === 10) {

			
			boundingEdge = objects[0].position.y - (getHeight(objects[0])*2) + (objects[0].offset.y * objects[0].scale.y);

		} else if ( objects[0].origin === 4 || objects[0].origin ===  5 || objects[0].origin === 6) {

			boundingEdge = objects[0].position.y + (objects[0].offset.y * objects[0].scale.y);

		} else {

			boundingEdge = objects[0].position.y - getHeight(objects[0]) + (objects[0].offset.y  * objects[0].scale.y);
		}
	} else {

		boundingEdge = objects[0].position.y - getHeight(objects[0]) + (objects[0].offset.y  * objects[0].scale.y);
	}

//position objects
	for ( i =1; i < objects.length; i += 1) {

//check to see if object is flat text and has an origin property		
		if( objects[i].hasOwnProperty("origin") ){

			if ( objects[i].origin === 8 || objects[i].origin ===  9 || objects[i].origin === 10) {

				objects[i].position.y = boundingEdge + (getHeight(objects[i])*2) - (objects[i].offset.y * objects[i].scale.y) ;

			} else if ( objects[i].origin === 4 || objects[i].origin ===  5 || objects[i].origin === 6) {

				objects[i].position.y = boundingEdge  - (objects[i].offset.y  * objects[i].scale.y);
			} else {
				
				objects[i].position.y = boundingEdge + getHeight(objects[i]) - (objects[i].offset.y  * objects[i].scale.y);
			}

		} else {
			objects[i].position.y = boundingEdge + getHeight(objects[i]) - (objects[i].offset.y  * objects[i].scale.y);
		}
	}
}

//aligns a list of objects to the top edge of the first object in the list
function alignTop(objects) {
var boundingEdge;
//calculate top edge position of first object
	
	if(objects[0].hasOwnProperty("origin")){
		
		if ( objects[0].origin === 8 || objects[0].origin ===  9 || objects[0].origin === 10) {

			boundingEdge = objects[0].position.y + (objects[0].offset.y * objects[0].scale.y);

		} else if ( objects[0].origin === 4 || objects[0].origin ===  5 || objects[0].origin === 6) {

			boundingEdge = objects[0].position.y + (getHeight(objects[0])*2) + (objects[0].offset.y * objects[0].scale.y);

		} else {

			boundingEdge = objects[0].position.y + getHeight(objects[0]) + (objects[0].offset.y * objects[0].scale.y);
		}
	} else {

		boundingEdge = objects[0].position.y + getHeight(objects[0]) + (objects[0].offset.y * objects[0].scale.y);
	}

//position objects
	for ( i =1; i < objects.length; i += 1) {
		

//check to see if object is flat text and has an origin property		
		if( objects[i].hasOwnProperty("origin") ){

			if ( objects[i].origin === 8 || objects[i].origin ===  9 || objects[i].origin === 10) {

				objects[i].position.y = boundingEdge  - (objects[i].offset.y * objects[i].scale.y) ;

			} else if ( objects[i].origin === 4 || objects[i].origin ===  5 || objects[i].origin === 6) {

				objects[i].position.y = boundingEdge - (getHeight(objects[i])*2)- (objects[i].offset.y * objects[i].scale.y) ;
			} else {
				
				objects[i].position.y = boundingEdge - getHeight(objects[i]) - (objects[i].offset.y * objects[i].scale.y) ;
			}

		} else {
			objects[i].position.y = boundingEdge - getHeight(objects[i]) - (objects[i].offset.y * objects[i].scale.y) ;
		}
	}
}

//aligns a list of objects to the right hand edge of the first object in the list
function alignRight(objects) {
var boundingEdge;
//calculate top edge position of first object
	
	if(objects[0].hasOwnProperty("origin")){
	
		if ( objects[0].origin === 1 || objects[0].origin ===  5 || objects[0].origin === 9) {
	//left origin
			
			boundingEdge = objects[0].position.x + (getWidth(objects[0])*2)+ (objects[0].offset.x  * objects[0].scale.x);

		} else if ( objects[0].origin === 2 || objects[0].origin ===  6 || objects[0].origin === 10) {
	//right origin
			boundingEdge = objects[0].position.x + (objects[0].offset.x  * objects[0].scale.x);

		} else {

			boundingEdge = objects[0].position.x + getWidth(objects[0])+ (objects[0].offset.x  * objects[0].scale.x);
		}
	} else {

		boundingEdge = objects[0].position.x + getWidth(objects[0])+ (objects[0].offset.x  * objects[0].scale.x);
	}

//position objects
	for ( i =1; i < objects.length; i += 1) {

//check to see if object is flat text and has an origin property		
		if( objects[i].hasOwnProperty("origin") ){

			if ( objects[i].origin === 1 || objects[i].origin ===  5 || objects[i].origin === 9) {
		//left origin
				objects[i].position.x = boundingEdge - (getWidth(objects[i])*2) - (objects[i].offset.x  * objects[i].scale.x);

			} else if ( objects[i].origin === 2 || objects[i].origin ===  6 || objects[i].origin === 10) {
		//right origin
				objects[i].position.x = boundingEdge - (objects[i].offset.x  * objects[i].scale.x);
			} else {
				
				objects[i].position.x = boundingEdge - getWidth(objects[i]) - (objects[i].offset.x  * objects[i].scale.x);
			}

		} else {
			objects[i].position.x = boundingEdge - getWidth(objects[i]) - (objects[i].offset.x  * objects[i].scale.x);
		}
	}
}

//aligns a list of objects to the left hand edge of the first object in the list
function alignLeft(objects) {
var boundingEdge;
//calculate top edge position of first object
	
	if(objects[0].hasOwnProperty("origin")){
	
		if ( objects[0].origin === 1 || objects[0].origin ===  5 || objects[0].origin === 9) {
	//left origin
			boundingEdge = objects[0].position.x + (objects[0].offset.x  * objects[0].scale.x);

		} else if ( objects[0].origin === 2 || objects[0].origin ===  6 || objects[0].origin === 10) {
	//right origin
			boundingEdge = objects[0].position.x - (getWidth(objects[0])*2)+ (objects[0].offset.x  * objects[0].scale.x);

		} else {

			boundingEdge = objects[0].position.x - getWidth(objects[0])+ (objects[0].offset.x  * objects[0].scale.x);
		}
	} else {

		boundingEdge = objects[0].position.x - getWidth(objects[0])+ (objects[0].offset.x  * objects[0].scale.x);
	}

//position objects
	for ( i =1; i < objects.length; i += 1) {
		

//check to see if object is flat text and has an origin property		
		if( objects[i].hasOwnProperty("origin") ){

			if ( objects[i].origin === 1 || objects[i].origin ===  5 || objects[i].origin === 9) {
		//left origin
				objects[i].position.x = boundingEdge - (objects[i].offset.x  * objects[i].scale.x);
			} else if ( objects[i].origin === 2 || objects[i].origin ===  6 || objects[i].origin === 10) {
		//right origin
				objects[i].position.x = boundingEdge + (getWidth(objects[i])*2) - (objects[i].offset.x  * objects[i].scale.x);
			} else {
				
				objects[i].position.x = boundingEdge + getWidth(objects[i]) - (objects[i].offset.x  * objects[i].scale.x);
			}

		} else {
			objects[i].position.x = boundingEdge + getWidth(objects[i]) - (objects[i].offset.x  * objects[i].scale.x);
		}
	}
}
////

//prototype to offset an objects origin for a given axis
//example: object.setOrigin("-x")
Object.prototype.setOrigin = function(axis){
	var mod = 0.5
	if(axis.charAt(0) === "-"){
		axis = axis.slice(1);
		mod = -0.5;
	}
	if(!mod){		
		mod = 0;
	}
	if(!this.offset.hasOwnProperty(axis)){
		ppLog("Cannot offset on that axis")
	}		
	return this.offset[axis] = (this.extents.max[axis] - this.extents.min[axis]) * mod ;

}
//returns the bounding box edge position
//example: object.edge("x")
Object.prototype.edge = function(axis){	
	var mod = "max";
	if(axis.charAt(0) === "-"){
		axis = axis.slice(1);
		mod = "min";
	}
	if(!this.offset.hasOwnProperty(axis)){
		ppLog("Cannot offset on that axis")
	}	
	return this.position[axis] + (this.extents[mod][axis] + this.offset[axis]) * this.scale[axis]
}
//returns the width of flat 3d text object
Object.prototype.textWidth = function(){
	return (this.textExtents.max.x - this.textExtents.min.x) *0.5;
	
}

//returns the height of flat 3d text object
Object.prototype.textHeight = function(){
	return (this.textExtents.max.y - this.textExtents.min.y)*0.5;
}

function inspect(obj, maxLevels, level) {

if(!maxLevels){maxLevels =1};
if(!level){level = 1};
	var str = "\n", type, msg;
	if (level == null) {
		maxLevels = 1;
	}
	if (maxLevels < 1) {
		return "Error: Levels number must be > 0";
	}
	// We start with a non null object
	if (obj == null) {
		return "Error : Object NULL";
	}
	// Start iterations for all objects in obj
	for (property in obj) {
		try {
			type = typeof (obj[property]);
			str += "Object Property[" + property + "]: " + obj[property] + "  Property Type: " + type + "\n" + ((obj[property] == null) ? (": null") : (""));
			 // We keep iterating if this property is an Object, non null
			// and we are inside the required number of levels
			if ((type == "object") && (obj[property] != null) && (level + 1 < maxLevels)) {
				str += "\n" + "Sub Objects Of Property:  " + property + inspect(obj[property], maxLevels, level + 1) + "   \n";
			}
		}
		catch (err) {
				// Is there some properties in obj we can't access?.
				if (typeof (err) == "string")	{ msg = err; }
				else if (err.message) 			{msg = err.message; }
				else if (err.description)			{msg = err.description; }
				else 						{ msg = "Unknown"; }
				
				str += "(Error) " + property + ": " + msg;
			}
	}
	return str;
}
