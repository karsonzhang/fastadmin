Project Description
=====================

A javascript file that provides the ability to sort lists using drag and drop. Built on the jQuery framework.

Usage
-----

```
$("ul").dragsort({ dragSelector: "li", dragEnd: function() { }, dragBetween: false, placeHolderTemplate: "<li></li>" });

$("ul").dragsort("destroy");
```

* dragSelector - The CSS selector  of the element inside the list item to act as the drag handle. The default is the list item itself e.g. LI.
* dragSelectorExclude - The css selector of the elements inside the dragSelector to not trigger dragsort. The default is "input, textarea".
* itemSelector - The css selector of the list items that are moveable. Will only match elements that are immediate children of list container. The default is tag name of first child e.g. LI.
* dragEnd - The callback function that will be called after the dragging has ended (only called if the list order has changed). The keyword "this" in function will refer to list item that was dragged.
* dragBetween -	Set to "true" if you want to enable the ability to drag between selected lists or to allow dragging of the list item outside of the list for auto scroll. The default is false.
* placeHolderTemplate -	The html of the place holder for the dragged item. The default is empty list item e.g."<li></li>".
* scrollContainer -	The css selector of the element you want to scroll (i.e. div with overflow set to auto) when the list item is dragged outside the list. The default is window.
* scrollSpeed - A number that represents the speed that the page will scroll when dragging an item outside the scroll container, a higher value is faster and a lower value is slower. Set to 0 to disable scrolling. The default is 5.
