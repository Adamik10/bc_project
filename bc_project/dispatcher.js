<% response.setContentType("text/html;charset=utf-8"); %>
<%@ page import="xtk:server/jsspcontext.js"%>
<%@ page import="xtk:shared/nl.js"%>
<%@ page import="xtk:shared/xtk.js" %>
<%
  var context = logonEscalation("admin");

  var postData = JSON.parse(request.getBodyAsString());
  var offerId = postData.offerId.toString();
  var categoryInternalName = postData.category.toString();

// ---------------------------------------------------- ENABLE RECO OFFERS FUNCTION -------------------------------------------------------
  function enableRecoOffer(){

  }

// ---------------------------------------------------- DISABLE RECO OFFERS FUNCTION -------------------------------------------------------
  function disableRecoOffer(){

  }

// ---------------------------------------------------- CALLING CORRECT FUNCTION BASED ON ACTION PASSED IN POST DATA -------------------------------------------------------
  if(postData.action.toString() == "enable"){
    var results = "enable was called";
    enableRecoOffer();

  }else if(postData.action.toString() == "disable"){
    var results = "disable was called";
    disableRecoOffer();
  }

  document.write(results);
%><% logonWithContext(context);%>