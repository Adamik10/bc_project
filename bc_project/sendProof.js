<% response.setContentType("text/html;charset=utf-8"); %>
<%@ page import="xtk:server/jsspcontext.js"%>
<%@ page import="xtk:shared/nl.js"%>
<%@ page import="xtk:shared/xtk.js" %>
<%
  var context = logonEscalation("admin");

  data = JSON.parse(request.getBodyAsString());
  var email = data.email.toString();
  var offerLabel = data.offerLabel.toString();
  var categoryInternalName = data.categoryInternalName.toString();
  
  var dataString = JSON.stringify(data);

  xtk.workflow.PostEvent('TestOfferDashboardSendProof', 'signal', "", <variables email={email} offerLabel={offerLabel} categoryInternalName={categoryInternalName} />,false);



  document.write(email);
%><% logonWithContext(context);%>