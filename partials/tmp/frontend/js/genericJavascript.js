// JavaScript Document

var resultResponse	= "";
var errMessage		= "";
var waitingImage    = "<div id='waitImage' class='ajaxLoading'><img  src='/theme/default/images/wait.gif'>Loading...</div>";

// THIS IS AJAX ASYCHRONOUS FUNCTION, FUNCTION WILL SET THE SERVER CONNECTION FOR COMMUNICATION USING JQUERY AND RETURN THE RESULT
// PARAMETERS 
// 1) requestUrl      - THIS IS USED TO SENT THE REQUEST TO GIVEN PHP FILE
// 2) urlData         - WANT TO PASS THE VARIABLES FOR PROCESS
// 3) method          - VAR USE FOR FORM METHOD LIKE GET OR POST
// 4) callingFunction - AFTER SUCCESS OF PROCESS THIS FUNCTION WILL CALL TO SET THE RESULT
function ajaxRequestAsyncrs(requestUrl, urlData, method,callingFunction,waitImage){ 
	if(waitImage == "Y"){
		$('body').append(waitingImage);
		$('#waitImage').show();
		//alert("in");
		//Popup.showModal('iframeProcessingDiv');
	}
	$.ajax({
		beforeSend: function() { 
			resultResponse = "";
	    },
		
		//THIS IS THE PHP FILE THAT PROCESS THE DATA
		url: requestUrl,	
		
		// THIS IS METHOD OF SENT VARIABLES TO PHP FILE, DEFAULT IS GET
		type: method,
		
		// PARAMETERS SENT WITH URL
		data: urlData,		
		
		// DO NOT CACHE THE PAGE
		cache: false,
		
		// IF THE PROCESS COMPLETED AND SUCCESS
		success: function(responseHtml){
		 	resultResponse = responseHtml;
			if(waitImage == "Y"){
				if($('#waitImage')){
					$('#waitImage').fadeOut(1200,function(){
						$('#waitImage').remove();
					});
				}
			}
			
		}, // END OF success 
		complete: function() {
			eval(callingFunction);
  	    }

	}); // END OF FUNCTION $.ajax
}// END OF FUNCTION ajaxRequestAsyncrs



// THIS IS AJAX ASYCHRONOUS FUNCTION, FUNCTION WILL SET THE SERVER CONNECTION FOR COMMUNICATION USING JQUERY AND RETURN THE RESULT
// PARAMETERS 
// 1) requestUrl      - THIS IS USED TO SENT THE REQUEST TO GIVEN PHP FILE
// 2) urlData         - WANT TO PASS THE VARIABLES FOR PROCESS
// 3) method          - VAR USE FOR FORM METHOD LIKE GET OR POST
// 4) callingFunction - AFTER SUCCESS OF PROCESS THIS FUNCTION WILL CALL TO SET THE RESULT
function ajaxRequestSynchronous(requestUrl, urlData, method){
	$.ajax({
		//THIS WILL SENT THE ASYCHRONOUS REQUEST TO PROCESS THE DATA
		async: false,
		
		//THIS IS THE PHP FILE THAT PROCESS THE DATA
		url: requestUrl,	
		
		// THIS IS METHOD OF SENT VARIABLES TO PHP FILE, DEFAULT IS GET
		type: method,
		
		// PARAMETERS SENT WITH URL
		data: urlData,		
		
		// DO NOT CACHE THE PAGE
		cache: false,
		
		// IF THE PROCESS COMPLETED AND SUCCESS
		success: function(responseHtml){	
			resultResponse = responseHtml;
		} // END OF success 
	}); // END OF FUNCTION $.ajax
}// END OF FUNCTION ajaxRequestSynchronous


// Function will find the Enter key or Mouse click event occured and called the given passed function.
// e is the event and callingFunction is the javascript function name eg. validateForm()
function onKeyPressed(e,callingFunction){ 
	var eventOccured = (!e) ? window.event : e;
	if(eventOccured.keyCode == 13 || eventOccured.type == "click"){ //  13 is keycode of Enter Key Pressed 
		eval(callingFunction);    // function wants to execute..
	}
}
// END OF FUNCTION onKeyPressed


//Following function is used to clear the form fields.
jQuery.fn.reset = function() {
	this.each(function(){
		if($(this).is('form')) {
			var button = jQuery(jQuery('<input type="reset" />'));
			button.hide();
			$(this).append(button);
			button.click().remove();
		} else if($(this).parent('form').size()) {
			var button = jQuery(jQuery('<input type="reset" />'));
			button.hide();
			$(this).parent('form').append(button);
			button.click().remove();
		} else if($(this).find('form').size()) {
			$(this).find('form').each(function(){
				var button = jQuery(jQuery('<input type="reset" />'));
				button.hide();
				$(this).append(button);
				button.click().remove();
			});
		}
	})
	return this;
};

jQuery.fn.formSet = function(){
	if($(this).is('form')){
		
		$(this).find(":input:not(button)").each(function(){
			if($(this).siblings(".compulsoryMark").first().html() == null){
				if($(this).attr('required')){
					$(this).after("<span class='compulsoryMark'>*</span>");
				}
				else{
					$(this).after("<span class='compulsoryMark'>&nbsp;&nbsp;</span>");
				}
			}
		});
	}
	return this;
};

function validateForm(formId)
{
	errMessage = "";
	var firstErrorId	= "";
	$("#"+formId+" :input[required='true']").each(function(){
		if($(this).val() == ""){
			errMessage += "<li>"+$(this).attr('message')+"</li>";
			if(firstErrorId == ""){
				firstErrorId = $(this).attr('id');
			}
		}
	});
	if(errMessage != ""){
		errMessage = "Please Correct the Following errors and try again: <br> <ul>"+errMessage+"</ul>";
		$("#"+firstErrorId).focus();
		return false;
	}
	else{
		return true;
	}
}

function createIFrame(addToId,attArr)
{
	$('<iframe />', attArr).appendTo('#'+addToId);
}

function removeIFrame(iFrameId)
{
	$('#'+iFrameId).remove();
}

function changeZIndex(id,indexValue) {
	try {
		$("#"+id).css({
			'z-index':indexValue
		});
	} catch(x) {

	}
}


function commonClearFormFields(formId)
{
	$("#"+formId).reset();
	$("#"+formId+" :input").eq(0).focus();
}

$.fn.clearForm = function() {
  return this.each(function() {
    var type = this.type, tag = this.tagName.toLowerCase();
    if (tag == 'form')
      return $(':input',this).clearForm();
    if (type == 'text' || type == 'password' || tag == 'textarea')
      this.value = '';
    else if (type == 'checkbox' || type == 'radio')
      this.checked = false;
    else if (tag == 'select')
      this.selectedIndex = -1;
  });
};

//value - parameter for pageno field to be updated on next / prev click.
//obj - obj reference where clicked.
//callingFn - function to be called on change event.

function processPaginatorValues(value,obj,callingFn){
	if(value != -1){
		$(obj).siblings("#ajaxPaginationPageNo").val(value);
	}
	eval(callingFn);
	return false;
}
$(document).ready( function() {
	try
	{
		var dialogOpts = {
		modal: true,
		bgiframe: true,
		autoOpen: false,
		height: 'auto',
		width: 'auto',
		position: ['center', 'center'],
		draggable: true,
		resizeable: true,
		}
		$("#msgBox").dialog(dialogOpts);	//end dialog
	}
	catch(x)
	{
		
	}
});
function msgBox(Message,Title,showBtn)
{
	showBtn = typeof(showBtn) != 'undefined' ? showBtn : true;
	if(Title=="")
	{
		Title="Alert";
	}
	if(showBtn==true)
	{
		$("#msgBox #msgBoxButtons").removeClass("hide");
	}
	else
	{
		$("#msgBox #msgBoxButtons").addClass("hide");
	}	
	$("#msgBox #msgBoxMessage").html("<p style='width:400px;white-space:normal;padding-left:5px;'> "+Message+"</p>");
	$("#msgBox").dialog("open");
	$("#msgBox").dialog("option", 'title',Title);	
}
function closeMsgBox()
{
	$("#msgBox").dialog("close");	
}
/*
 * Element Id =name of Element to have date Picker
 * format like 'dd-mm-yy'
 * gotoToday boolean value
 */
function createDatePicker(elementId,format,gotoToday)
{
	try
	{
		$("#"+elementId).datepicker({
		dateFormat: format,
		gotoCurrent: gotoToday
	});
	}
	catch(x)
	{
		//alert(x);
	}
}

//Following Function is used for comparing two supplied date.
//If firstDate is greater than secondDate it will return true else return false.
//Function contain two parameters
//firstDate 	--> fromDate
//secondDate 	--> toDate
function compareTwoDates(firstDate,SecondDate){ 
	var fDateArr 	= firstDate.split("-");
	var sDateArr 	= SecondDate.split("-");
	var fDate   	= new Date(fDateArr[2]+"-"+fDateArr[1]+"-"+fDateArr[0]);
	var sDate   	= new Date(sDateArr[2]+"-"+sDateArr[1]+"-"+sDateArr[0]);
	newFDate 		= Date.parse(fDate);
	newSDate 		= Date.parse(sDate);
	if(newFDate > newSDate){
		return true; 
	}
	else{
		return false;
	}
}//EOF compareTwoDates

function printFn(elId)
{
	$('#'+elId).jqprint({ operaSupport: true });
}

//following function is added by Sourabh on Feb 01-2012 .. 
//this function clears the combo and takes 3 values jquery obj of element ,new desired label and , new value to be selected..
function clearCombo(obj,selectedLabel,selectedValue)
{
	try
	{
		var width="8em";
		if(width==undefined)
		{
			width="8em";
		}
		$(obj).empty();
		var option=new Option(""+selectedLabel,""+selectedValue,false,true);
		option.style.width=width;
		$(obj).append(option);
		$(obj).attr("width",width);
	}
	catch(x)
	{
		//alert("Error"+x);
	}
}