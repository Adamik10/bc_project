<% response.setContentType("text/html;charset=utf-8"); %>
<%@ page import="xtk:server/jsspcontext.js"%>
<%@ page import="xtk:shared/nl.js"%>
<%@ page import="xtk:shared/xtk.js" %>
<%
    var context = logonEscalation("admin");
    
    //get all parameters from the URL
    var chosenCountry = request.getParameter("country");
    var chosenCategory = request.getParameter("category");
    var chosenMCO = request.getParameter("MCO");
    var chosenUmbrella = request.getParameter("umbrella");
    var chosenStartLine = request.getParameter("startLine");
    var chosenStatus = request.getParameter("status");
    var chosenLabel = request.getParameter("label");
    var chosenDefault = request.getParameter("default");
    var chosenLineCount = request.getParameter("lineCount");

    var condition = "";

    //building the condition for query based on parameters that were passed through URL (has to start with AND!!!)
    //COUNTRY
    if(chosenCountry != null && chosenCountry != ''){
      condition += "AND [category/@name] LIKE '%'+'"+chosenCountry+"'+'%'";
    }
    //MCO
    if(chosenMCO != null && chosenMCO != ''){
      condition += "AND [category/@name] LIKE '%'+'"+chosenMCO+"'+'%'";
    }

    //UMBRELLA
    if(chosenUmbrella != null && chosenUmbrella != ''){
      condition += "AND [category/@name] LIKE '%'+'"+chosenUmbrella+"'+'%'";
    }

    //CATEGORY
    if(chosenCategory == "Default"){
      condition += "AND [@name] LIKE '%'+'"+chosenCategory+"'+'%'";
    }else if(chosenCategory != null && chosenCategory != ''){
      condition += "AND [category/@name] LIKE '%'+'"+chosenCategory+"'+'%'";
    }

    //STATUS
    if(chosenStatus == "Live"){
      var status = 6;
      condition += "AND [prodOffer/@status] = "+status;
    }else if(chosenStatus == "Disabled"){
      var status = 6;
      condition += "AND [prodOffer/@status] != "+status;
    }
    
    //LABEL
    if(chosenLabel !== "" || chosenLabel !== null || chosenLabel !== undefined){
      condition += "AND [@label] LIKE '%'+'"+chosenLabel+"'+'%'";
    }

    var sDefaultOffers = "Default";
    //DEFAULT
    if(chosenDefault == "true"){
      condition += "AND [@name] LIKE '%'+'"+sDefaultOffers+"'+'%'";
    }

    var results = [];

    var query = xtk.queryDef.create(
        <queryDef schema="nms:offer" operation="select" lineCount={+chosenLineCount} startLine={+chosenStartLine}>
          <select>
            <node expr="[@label]" alias="@label" />
            <node expr="[@id]" alias="@id" />
            <node expr="[@status]" alias="@statusDesign"/>
            <node expr="[prodOffer/@status]" alias="@statusLive"/>
            <node expr="[@name]" alias="@internalName"/>
            <node expr="[category/@name]" alias="@categoryInternalName"/>
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
          <condition expr={"[category/@name] NOT LIKE '%'+'_liveRcp'+'%' "+condition}/>
          </where>
         </queryDef>
       )

var  selectedOffers = query.ExecuteQuery();



for each (var offer in selectedOffers){

    var correctURL = offer.@imageDesktopURL.toString();
    correctURL = correctURL.replace("https://","");
    correctURL = correctURL.replace("http://","");

    var correctURLMobile = offer.@imageDesktopURL.toString();
    correctURLMobile = correctURLMobile.replace("https://","");
    correctURLMobile = correctURLMobile.replace("http://","");

    //TO DO: this needs to be smarter - check if this is actually language code on the this position - this wont work for segmented offers
    var splitInternalName = offer.@internalName.toString().split("_");

    var offerBlock = {
      "offerLabel" :offer.@label.toString(),
      "offerId" :offer.@id.toString(),
      "offerName" :offer.@internalName.toString(),
      "statusDesign" :offer.@statusDesign.toString(),
      "statusLive" :offer.@statusLive.toString(),
      "created" :offer.@created.toString(),
      "offerLanguage" : getLanguage[2],
      //offer content fields below
      "subject1" :offer.@subject1.toString(),
      "subject2" :offer.@subject2.toString(),
      "preheader" :offer.@preheader.toString(),
      "headline" :offer.@headline.toString(),
      "subheadline" :offer.@subheadline.toString(),
      "eventDate" :offer.@eventDate.toString(),
      "CTAtext" :offer.@CTAtext.toString(),
      "destinationURL" :offer.@destinationURL.toString(),
      "imageDesktopURL" : correctURL,
      "imageMobileURL" : correctURLMobile,
      "imageAltText" :offer.@imageAltText.toString(),
      "rating" :offer.@rating.toString(),
      "loyaltyPoints" :offer.@loyaltyPoints.toString(),
      "unitQuantity" :offer.@unitQuantity.toString(),
      "unitPrice" :offer.@unitPrice.toString(),
      "utmTerm" :offer.@utmTerm.toString(),
      "utmImageTerm" :offer.@utmImageTerm.toString(),
      "copyText" :offer.@copyText.toString(),
      "categoryInternalName" :offer.@categoryInternalName.toString(),
      "eligibility": []
    }
    results.push(offerBlock);
          
      var offerId = offer.@id;
      var offerLabel = offer.@label;

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
        if(eligibility.@label.toString().toLowerCase().indexOf("longproof") === -1){

          var eligibilityBlock = {
            "label" : eligibility.@label.toString(),
            "startDate" : eligibility.@startDate.toString(),
            "endDate" : eligibility.@endDate.toString(),
            "weight" : eligibility.@weightExpr.toString()
          }

          offerBlock.eligibility.push(eligibilityBlock);
        }

        
      }

}

    document.write(JSON.stringify(results));
    console.log(JSON.stringify(results))
%><% logonWithContext(context);%>