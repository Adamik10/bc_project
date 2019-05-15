<% response.setContentType("text/html;charset=utf-8"); %>
<%@ page import="xtk:server/jsspcontext.js"%>
<%@ page import="xtk:shared/nl.js"%>
<%@ page import="xtk:shared/xtk.js" %>
<%
    var context = logonEscalation("admin");
    
    var chosenCountry = request.getParameter("country");
    var chosenCategory = request.getParameter("category");
    var chosenMCO = request.getParameter("MCO");
    var chosenUmbrella = request.getParameter("umbrella");

    var results = [];

    var query = xtk.queryDef.create(
        <queryDef schema="nms:offer" operation="select" lineCount="12" startLine="0">
          <select>
            <node expr="[@label]" alias="@label" />
            <node expr="[@id]" alias="@id" />
            <node expr="[@status]" alias="@status"/>
            <node expr="[@created]" sort="true" alias="@created"/>
            //offer content fields below
            <node expr="[view/emailSubject1_jst]" alias="@subject1"/>
            <node expr="[view/emailSubject2_jst]" alias="@subject2"/>
            <node expr="[view/preHeader_jst]" alias="@preheader"/>
            <node expr="[view/shortContent_jst]" alias="@headline"/>
            <node expr="[view/subHeading_jst]" alias="@subheadline"/>
            <node expr="[view/eventDate2_jst]" alias="@eventDate"/>
            <node expr="[view/cTAText_jst]" alias="@CTAtext"/>
            <node expr="[view/trackedUrls/url_jst]" alias="@destinationURL"/>
            <node expr="[view/imageUrl_jst]" alias="@imageDesktopURL"/>
            <node expr="[view/mImageUrl_jst]" alias="@imageMobileURL"/>
            <node expr="[view/imageAltText_jst]" alias="@imageAltText"/>
            <node expr="[view/rating_jst]" alias="@rating"/>
            <node expr="[view/loyaltyPoints_jst]" alias="@loyaltyPoints"/>
            <node expr="[view/unitQuantity_jst]" alias="@unitQuantity"/>
            <node expr="[view/unitPrice_jst]" alias="@unitPrice"/>
            <node expr="[view/uTMTerm_jst]" alias="@utmTerm"/>
            <node expr="[view/uTMTermImage_jst]" alias="@utmImageTerm"/>
            <node expr="[view/htmlSource_jst]" alias="@copyText"/>
          </select>
            <orderBy displayOrder="Creation date (descending)">
             <node expr="[@created]" label="Creation date" sort="1" sortDesc="1"/>
            </orderBy>
           <groupBy/>
           <having/>
          <where>
          <condition expr={"[category/@name] LIKE '%'+'"+chosenMCO+"'+'%' AND [category/@name] LIKE '%'+'"+chosenCountry+"'+'%' AND [category/@name] LIKE '%'+'"+chosenCategory+"'+'%'"}/>
          </where>
         </queryDef>
       )

var  selectedOffers = query.ExecuteQuery();

for each (var offer in selectedOffers){
    var offerBlock = {
      "offerLabel" :offer.@label.toString(),
      "offerId" :offer.@id.toString(),
      "status" :offer.@status.toString(),
      "created" :offer.@created.toString(),
      //offer content fields below
      "subject1" :offer.@subject1.toString(),
      "subject2" :offer.@subject2.toString(),
      "preheader" :offer.@preheader.toString(),
      "headline" :offer.@headline.toString(),
      "subheadline" :offer.@subheadline.toString(),
      "eventDate" :offer.@eventDate.toString(),
      "CTAtext" :offer.@CTAtext.toString(),
      "destinationURL" :offer.@destinationURL.toString(),
      "imageDesktopURL" :offer.@imageDesktopURL.toString(),
      "imageMobileURL" :offer.@imageMobileURL.toString(),
      "imageAltText" :offer.@imageAltText.toString(),
      "rating" :offer.@rating.toString(),
      "loyaltyPoints" :offer.@loyaltyPoints.toString(),
      "unitQuantity" :offer.@unitQuantity.toString(),
      "unitPrice" :offer.@unitPrice.toString(),
      "utmTerm" :offer.@utmTerm.toString(),
      "utmImageTerm" :offer.@utmImageTerm.toString(),
      "copyText" :offer.@copyText.toString(),
      "eligibility": [
      ]
    }
    results.push(offerBlock);
          
      var offerId = offer.@id;

      var query2 = xtk.queryDef.create(
        <queryDef schema="nms:offerContext" operation="select">
          <select>
            <node expr="[@label]" alias="@label" />
            <node expr="[@startDate]" alias="@startDate" />
            <node expr="[@endDate]" alias="@endDate"/>
            <node expr="[@weightExpr]" alias="@weightExpr"/>
          </select>
            <groupBy/>
            <having/>
          <where>
          <condition expr={"[@offer-id]= '"+offerId+"'"}/>
          </where>
        </queryDef>
      )
      
      var eligibilities = query2.ExecuteQuery();
      for each (var eligibility in eligibilities){

        var eligibilityBlock = {
          "label" : eligibility.@label.toString(),
          "startDate" : eligibility.@startDate.toString(),
          "endDate" : eligibility.@endDate.toString(),
          "weight" : eligibility.@weightExpr.toString()
        }
        offerBlock.eligibility.push(eligibilityBlock);
      }
}




    document.write(JSON.stringify(results));
    console.log(JSON.stringify(results))
%><% logonWithContext(context);%>