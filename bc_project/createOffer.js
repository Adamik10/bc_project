<% response.setContentType("text/html;charset=utf-8"); %>
<%@ page import="xtk:server/jsspcontext.js"%>
<%@ page import="xtk:shared/nl.js"%>
<%@ page import="xtk:shared/xtk.js" %>
<%
  var context = logonEscalation("admin");

  var data = JSON.parse(request.getBodyAsString());
  var country = data.country.toString();
  var categoryRef = data.category.toString();
  var categoryInternalName = 'categoryRootRcp'+country+categoryRef;
  var offerCategoryId = "";
  var response = "";

  //query to get category id - each folder for each market has different id
  function getCategoryId(){
    var query2 = xtk.queryDef.create(
      <queryDef schema="nms:offerCategory" operation="select">
        <select>
          <node expr="[@id]" alias="@id" />
        </select>
          <groupBy/>
          <having/>
        <where>
        <condition expr={"[@name]= '"+categoryInternalName+"'"}/>
        </where>
      </queryDef>
    )
    var categories = query2.ExecuteQuery();

    for each(category in categories){
      offerCategoryId = category.@id;
    }

    if(offerCategoryId != ""){
      createNewDefaultOffer();
    }
  } 
  
  function createNewDefaultOffer(){
    var newOffer = nms.offer.create(
      <offer
        category-id          = {offerCategoryId}
        code                 = {offerName + offerCategoryAbr}
        contentBlockOffer-id = "0"
        contentStatus        = "0"
        eligibilityStatus    = "0"            
        isModel              = "0"
        label                = {offerName}
        name                 = {offerName + offerCategoryAbr}
        owner-id             = "0"
        reminderContent      = ""
        reminderEligibility  = ""
        startDate            = ""
        status               = "0"
        localOrgUnit-id      = {lou}
        language             = {language}
        xtkschema            = "nms:offer">

        <view>
          <trackedUrls>
              <url_jst>{offerContent.destinationUrl}</url_jst>
          </trackedUrls>
          <imageUrl_jst>{offerContent.imageUrl}</imageUrl_jst>
          <shortContent_jst>{offerContent.title}</shortContent_jst>
          <htmlSource2Main_jst>{html2Column}</htmlSource2Main_jst>
          <htmlSource2MainImage_jst>{html2Image}</htmlSource2MainImage_jst>
          <htmlSource3Ecommerce_jst>{html3Ecommerce}</htmlSource3Ecommerce_jst>
          <htmlSourceSplit5050_jst>{html5050Split}</htmlSourceSplit5050_jst>
          <htmlSourceSplit7030_jst>{html7030Split}</htmlSourceSplit7030_jst>
          <htmlSourceHeroImage_jst>{htmlHeroImage}</htmlSourceHeroImage_jst>
          <htmlSourceEventLocator_jst>{htmlEventLocator}</htmlSourceEventLocator_jst>
        </view>
          <filter label = { filterLabel } schema = "nms:recipient">
          <where displayFilter = { filterLabel } filterName="backGroundFilterFrm" filteringSchema = "nms:recipient">
              <condition boolOperator="OR" compositeKey="" dependkey="" enabledIf="" expr="[currentOffer/@language] = 'not_apply'"/>
              <condition compositeKey="" dependkey="" enabledIf="" expr="@processLanguage = Upper(Substring([currentOffer/@language],0 ,3 ))"/>
          </where>
          <humanCond>{ filterLabel }</humanCond>
        </filter>
      </offer> );

newOffer.contentStatus       = "0";                                                                                         
newOffer.eligibilityStatus   = "0";                                                                           
//newOffer.save();                                 
  }

  getCategoryId();
  
  document.write(offerCategoryId);
%><% logonWithContext(context);%>