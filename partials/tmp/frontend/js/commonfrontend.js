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

// For Online registration
$(document).ready(function(){
	afterStudentImageDelete();
	createDatePicker("txtdob","dd-mm-yy",false);
	createDatePicker("txtdate","dd-mm-yy",false);
	$("#frmonlineregistration").reset();
	$("#frmonlineregistration").formSet();
	$("#txtinterestedBranch").focus();
	
});



function enableSubmit(){
	if($("#chkdeclaration").is(':checked')){
		$("#btnSubmit").attr('disabled',false);
	}else{
		$("#btnSubmit").attr('disabled',true);
	}
}

function validateOnlineStudentDetailsForm(){
	$("#frmonlineStudentDetailsErrMessage").html("");
	$("#frmonlineStudentDetailsErrMessage").hide();
	if(!validateForm('frmonlineregistration')){
		$("#frmonlineStudentDetailsErrMessage").html(errMessage);
		$("#frmonlineStudentDetailsErrMessage").show();
		return false;
	}
	iframeAttArr = {id:'ifronlineStudentDetails',name:'ifronlineStudentDetails', height:'200', width:'100%', 'class':'hide'};
	createIFrame('divonlineregistrationDiv',iframeAttArr);
	$("#frmonlineregistration").attr('method','post');
	$("#frmonlineregistration").attr('target','ifronlineStudentDetails');
	$("#frmonlineregistration").attr('action','/online-registration/save-online-student-detail');
	$("#frmonlineregistration").submit();
}

function onlineStudentDetailsSaveSuccess(regId){
	window.location = "/online-registration/student-details-save-success/registrationId/"+regId;
	removeIFrame('ifronlineStudentDetails');
	$("#spncancleChangeStudIamgeLink").hide();
	
 	
}

function onlineStudentDetailsSaveFail(result){
	$("#frmonlineStudentDetailsErrMessage").html(result);
	$("#frmonlineStudentDetailsErrMessage").show();
	removeIFrame('ifronlineStudentDetails');
}

function closeOnlineStudentDetailsForm(){
	window.location = "/index";
}

function changeStudentImage()
{
	$("#spnstudentImgInput").show();
	$("#spnchangeRemoveStudImgLink").hide();
	$("#spncancleChangeStudIamgeLink").show();
}
function cancleChangeStudentImage()
{
	$("#spncancleChangeStudIamgeLink").hide();
	$("#spnstudentImgInput").hide();
	$("#spnchangeRemoveStudImgLink").show();
}
function removeStudentImage()
{
		var url 	= "/admin/student/remove-student-image/studentId/"+globalStudentId;
		var urlData	= "";
		ajaxRequestAsyncrs(url,urlData,"GET", "afterStudentImageDelete()","Y");
}
function afterStudentImageDelete()
{
	$("#studentImage").attr('src','/theme/default/images/noimage.jpg');
	$("#spnchangeRemoveStudImgLink").hide();
	$("#spnstudentImgInput").show();
}

function showBranchAddress(){
	if($("#txtinterestedBranch").val() == ""){
		msgBox("<center><div style='margin-top:20px;'>Please select the branch.<div></center>","Address",false);
	}else{
		var branchId	= $("#txtinterestedBranch").val();
		var url			= "/online-registration/get-branch-address";
		var urlParams	= {'branchId':branchId};
		ajaxRequestAsyncrs(url,urlParams,"POST","setBranchAddress()","N");
		return false;
	}
}

function setBranchAddress(){
	resultArr = resultResponse.split('~');
	$("#tdbranchTitle").html(resultArr[0]);
	$("#tdbranchAddress1").html(resultArr[1]);
	$("#tdbranchAddress2").html(resultArr[2]);
	$("#tdbranchCity").html(resultArr[3]);
	$("#tdbranchState").html(resultArr[4]);
	$("#tdbranchPostcode").html(resultArr[5]);
	$("#tdbranchPhone").html(resultArr[6]);
	$("#tdbranchFax").html(resultArr[7]);
	$("#tdbranchMobile").html(resultArr[8]);
	$("#tdbranchemail1").html(resultArr[9]);
	$("#tdbranchemail2").html(resultArr[10]);
	msgBox($("#divbranchAddress").html(),"Branch Details",false);
}

function processPaginatorValues(value,obj,callingFn){
	if(value != -1){
		$(obj).siblings("#pager #ajaxPaginationPageNo").val(value);
	}
	eval(callingFn);
	return false;
}

//For Frontend Our Team Page (Faculty) 
function getFacultyDescription(facultyId)
{
	var facultyId = facultyId;
	var url="/ourteam/get-faculty-description";
	var urlParams={'facultyId':facultyId};
	ajaxRequestAsyncrs(url,urlParams,"GET","setFacultyDescription()","N");
	return false;
}

function setFacultyDescription()
{
	$("#divfacultyList").slideUp('slow');
	$("#divfacultyDescription").html(resultResponse);
	$("#divfacultyDescription").slideDown('slow');
}

function backToFacultyList(){
	$("#divfacultyDescription").html("");
	$("#divfacultyDescription").slideUp('slow');
	$("#divfacultyList").slideDown('slow');
}


//For Frontend News & Article Page
function processNewsArticleSearch(){
    $("#newsArticleDetailFrnt").hide();
    $("#newsArticleDetailFrnt").html("");
    
    $('#loadingMsg').fadeIn(1000);

	var pageNoNewsArticle		= $("#newsArticlePaginator #ajaxPaginationPageNo").val();
	var recordLimitNewsArticle	= $("#newsArticlePaginator #ajaxPaginationRecordLimit").val();
	
	if(pageNoNewsArticle == undefined){
		pageNoNewsArticle = 1;
	}
	
	if(recordLimitNewsArticle == undefined){
		recordLimitNewsArticle = 10;
	}
	
	var txtsearchText=$("#divnewsArticleSearchFrnt #txtsearchText").val();
	var cmbnewsArticleType=$("#divnewsArticleSearchFrnt #cmbsnewsArticleType").val();
	
	var url="/newsandarticles";
	var urlParams={'page':pageNoNewsArticle,'limit':recordLimitNewsArticle,'txtsearchText':txtsearchText,'cmbnewsArticleType':cmbnewsArticleType};
	ajaxRequestAsyncrs(url,urlParams,"POST","setNewsArticleList()","N");
	return false;
}

function setNewsArticleList(){
	$('#loadingMsg').fadeOut(1000);	 
	$("#newsArticleListFrnt").html(resultResponse);
	$("#newsArticleListFrnt").show();
}

//For photogallery
function getAlbumList(){
	$('#loadingMsg').fadeIn(1000);
	var pageNoAlbum		 = $("#albumPaginator #ajaxPaginationPageNo").val();
	var recordLimitAlbum = $("#albumPaginator #ajaxPaginationRecordLimit").val();
	
	if(pageNoAlbum == undefined){
		pageNoAlbum = 1;
	}
	if(recordLimitAlbum == undefined){
		recordLimitAlbum = 15;
	}
	
	var url = "/photogallery";
	var urlParams={'page':pageNoAlbum,'limit':recordLimitAlbum};
	ajaxRequestAsyncrs(url,urlParams,"GET","setAlbumList()")	
}

function setAlbumList(){
 $("#divalbumList").html(resultResponse);
 $("#divalbumList").slideDown('slow');
 $("#divgalleriffic").slideUp('slow');
 $('#loadingMsg').fadeOut(1000);	
}

function readDescription(albumId){
	msgBox($("#divalbumDescription_"+albumId).html(),$("#aalbumTitle_"+albumId).html(),false);
}

function getAlbumPhoto(albumId){
	$('#divPhotoGalleryList').hide();
	$('#divgalleriffic').show();
	$('#loadingMsg').fadeIn(1000);
	$('#loadingMsg2').fadeIn(1000);
	$('#thumbs').html("");
	
    var url = "/photogallery/get-album-photo";
	var urlParams={'albumId':albumId};
	ajaxRequestAsyncrs(url,urlParams,"GET","setAlbumPhoto()");	
}

function setAlbumPhoto(){
	 $("#divslideShowArea").html("");
	 $("#divslideShowArea").html(resultResponse);
	 $('#loadingMsg2').fadeOut(1000);	
	 $('#loadingMsg').fadeOut(1000);	
}

function backToAlbum(){
 $("#divslideShowArea").html("");	
 $("#divgalleriffic").hide();
 $("#divPhotoGalleryList").show();
 $('#loadingMsg').fadeOut(1000);
 $('#loadingMsg2').fadeOut(1000);	
} 

function getTestimonialList(){
	$('#loadingMsg').fadeIn(1000);
	var pageNoTestimonial		 = $("#testimonialsPaginator #ajaxPaginationPageNo").val();
	var recordLimitTestimonial = $("#testimonialsPaginator #ajaxPaginationRecordLimit").val();
	
	if(pageNoTestimonial == undefined){
		pageNoTestimonial = 1;
	}
	if(recordLimitTestimonial == undefined){
		recordLimitTestimonial = 10;
	}
	
	var url = "/testimonials";
	var urlParams={'page':pageNoTestimonial,'limit':recordLimitTestimonial};
	ajaxRequestAsyncrs(url,urlParams,"GET","setTestimonialList()")	
}

function setTestimonialList(){
 $("#divtestimonialList").html(resultResponse);
 $('#loadingMsg').fadeOut(1000);
 $("#divwriteTestimonialForm").hide();
 $("#divtmList").show();		
}

function writeTestimonial(){
	$("#frmtestimonial").reset();
	$("#frmtestimonial").formSet();
	$("#frmtestimonialErrMessage").html("");
	$("#frmtestimonialErrMessage").hide();
	$("#txtname").focus();
	$("#divwriteTestimonialForm").show();	
	$("#divtmList").hide();	
}

function validateTestimonialForm(){
	$("#frmtestimonialErrMessage").html("");
	$("#frmtestimonialErrMessage").hide();
	
	if(!validateForm('frmtestimonial')){
		$("#frmtestimonialErrMessage").html(errMessage);
		$("#frmtestimonialErrMessage").show();
		return false;	
	}
	
    iframeAttArr = {id:'ifrtestimonial',name:'ifrtestimonial', height:'200', width:'100%', 'class':'hide'};
	createIFrame('divwriteTestimonialForm',iframeAttArr);
	$("#divwriteTestimonialForm #frmtestimonial").attr('method','post');
	$("#divwriteTestimonialForm #frmtestimonial").attr('target','ifrtestimonial');
	$("#divwriteTestimonialForm #frmtestimonial").attr('action','/testimonials/save-testimonial');
	$("#divwriteTestimonialForm #frmtestimonial").submit();
}

function testimonialSaveSuccess(message){
 	removeIFrame('ifrtestimonial');
 	$("#divwriteTestimonialForm").hide();
 	$("#frmtestimonialSaveMessage").show();
} 

function testimonialSaveFail(errMessage){
	$("#frmtestimonialErrMessage").html(errMessage);
	$("#frmtestimonialErrMessage").show();
	removeIFrame('ifrtestimonial');
}

function bakcToTestimonialList(){
	$("#frmtestimonialSaveMessage").hide();
	$("#divwriteTestimonialForm").hide();
	$("#divtmList").show();
}
