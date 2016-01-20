# PixelPower - JavaScript Library
This library is designed to work with Pixel Power's CGTools software, it's focused on pragmatism and not perfection

Note: All alignment and distribute functions are based on the bounding box for a given object.


##_Current Function List_

###alignVertical(objects)
	//aligns a list of objects to the vertical centre first object in the list
	//example: alignVertical([objectA,objectB]);
![](/images/Example_alignVertical.png)

###alignHorizontal(objects)
	//aligns a list of objects to the horizontal centre first object in the list
	//example: alignHorizontal([objectA,objectB]);
![](/images/Example_alignHorizontal.png)
###alignBottom(objects)
	//aligns a list of objects to the bottom edge of the first object in the list
![](/images/Example_alignBottom.png)
###alignTop(objects)
	//aligns a list of objects to the top edge of the first object in the list
	//example: alignTop([objectA,objectB]);
![](/images/Example_alignTop.png)
###alignRight(objects)
	//aligns a list of objects to the right hand edge of the first object in the list
	//example: alignRight([objectA,objectB]);
![](/images/Example_alignRight.png)
###alignLeft(objects)
	//aligns a list of objects to the left hand edge of the first object in the list
	//example: alignLeft([objectA,objectB]);
![](/images/Example_alignLeft.png)    
###distributeHorizontal(objects)
	//distributes objects horizontally in the order, left to right of the array
	//example: distributeHorizontal([objectA,objectB]);
![](/images/Example_distributeHorizontal.png)    
###distributeVertical(objects)
	//distributes objects vertically in the order; top to bottom of the array
	//example: distributeVertical([objectA,objectB]);
![](/images/Example_distributeVertical.png)        
###stackHorizontal(objects, spacing, alignment)
	//stack objects horizontally from the first object
	//alignment default is alignVertical, options include alignTop, alignBottom
	//spacing is in pixel power units
	//example: stackHorizontal( [objectA,objectB,objectC], 0.1)
![](/images/Example_stackHorizontal.png)    	
###stackVertical(objects, spacing, alignment)
	//stack objects vertically from the first object
	//alignment default is alignHorizontal, options include alignLeft, alignRight
	//spacing is in pixel power units
	//example: stackVertical( [objectA,objectB,objectC], 0.1)
![](/images/Example_stackVertical.png)        
###getWidth(object)
	//gets the computed width of an object in pixel power units
	//example: getWidth(objectA)
![](/images/Example_getWidth.png)    	
###getHeight(object)
	//gets the computed height of an object in pixel power units
	//example: getHeight(objectA)
![](/images/Example_getHeight.png)        
	

	
	
	
	

