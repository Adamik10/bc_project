<% response.setContentType("text/html;charset=utf-8"); %>
<%@ page import="xtk:server/jsspcontext.js"%>
<%@ page import="xtk:shared/nl.js"%>
<%@ page import="xtk:shared/xtk.js" %>
<%
    var context = logonEscalation("admin");
    
    var chosenMarket = request.getParameter("market");
    var chosenCategory = request.getParameter("category");
    var chosenOfferId = request.getParameter("offerId");

    var results = [];

    var query = xtk.queryDef.create(
        <queryDef schema="nms:offer" operation="select">
          <select>
            <node expr="[@label]" alias="@label" />
            <node expr="[@status]" alias="@status"/>
            <node expr="[@created]" sort="true" />
          </select>
            <orderBy displayOrder="Creation date (descending)">
             <node expr="[@created]" label="Creation date" sort="1" sortDesc="1"/>
            </orderBy>
           <groupBy/>
           <having/>
          <where>
          <condition expr={"[category/@label]= 'Recipe Recommendation' AND [localOrgUnit/@label]= 'Germany'"}/>
          </where>
         </queryDef>
       )

var  selectedOffers = query.ExecuteQuery();

for each (var offer in selectedOffers){

    var block = {
        "offerId" :offer.@id.toString(),
        "labelonoffer" :offer.@label.toString(),
        "category" :offer.category.@label.toString()
          }
          results.push(block);
}




    document.write(JSON.stringify(results));
    console.log(JSON.stringify(results))
%><% logonWithContext(context);%>