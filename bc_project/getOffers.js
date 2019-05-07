<% response.setContentType("text/html;charset=utf-8"); %>

<%@ page import="xtk:server/jsspcontext.js" %>


<%@ page import="xtk:shared/nl.js"%>
<%@ page import="xtk:shared/xtk.js" %>

<%

    var context = logonEscalation("admin");

    //get the filtering parameters from url

    var chosenMarket = request.getParameter("market");
    var chosenCategory = request.getParameter("category");
    var chosenStatus = request.getParameter("status");

    //hard coded id
    //var results = "209,846,822";
    var results = request.getParameter("id");



    //create the json result
    document.write(JSON.stringify(results));

//the ending tag of the logon - server side javascript
%><% logonWithContext(context);%>