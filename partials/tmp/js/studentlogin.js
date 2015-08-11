// JavaScript Document
function validateStudentLoginForm()
{
	var errMess	= "";
	$("#studentloginMess").html(errMess);
	if($("#txtstudentEnrollmentNo").val() == ""){
		errMess = "Enrollment no cannot be Blank";
		$("#studentloginMess").html(errMess);
		$("#txtstudentEnrollmentNo").focus();
		return false;
	}	
	
	$("#studentloginMess").html("<img src='/theme/default/images/wait.gif'  height='25' width='30'> Please wait...");
	

	var txtuserName 	= $("#txtstudentEnrollmentNo").val();//Keeping it as username for future version
	var pwdpassword="";
	var url 	= "/studentcorner/validate-student-login/txtuserName/"+txtuserName+"/pwdpassword/"+pwdpassword;
	var urlData	= "";
	
	ajaxRequestAsyncrs(url,urlData,"GET", "afterStudentLoginValidation()","N");
}

function afterStudentLoginValidation()
{
	var resultObj = $.parseJSON(resultResponse);
	if(resultObj.status == "ok"){
		$("#studentloginMess").html(resultObj.okMessage);
		document.location.href = '/studentcorner/index/'
	}
	else{
		
		$("#studentloginMess").html(resultObj.errorMessage);
	}
}

$(document).ready(function(){ 
	$("#txtstudentEnrollmentNo").focus();
});