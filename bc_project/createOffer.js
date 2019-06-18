<% response.setContentType("text/html;charset=utf-8"); %>
<%@ page import="xtk:server/jsspcontext.js"%>
<%@ page import="xtk:shared/nl.js"%>
<%@ page import="wun:offerLayouts.js"%>
<%@ page import="xtk:shared/xtk.js" %>
<%
  var context = logonEscalation("admin");

  // DECLARE VARS
  var response = "";
  var data = JSON.parse(request.getBodyAsString());
  var market = data.country.toString().split("_"); //e.g. ANGOLA_AO
  var MCO = market[0].toString(); //e.g. ANGOLA
  var country = market[1].toString(); //e.g. AO
  var categoryRef = data.category.toString().replace('_',''); // e.g. rcr
  var categoryInternalName = 'categoryRootRcp'+MCO+'_'+country+'_'+categoryRef; //e.g. categoryRootRcpANGOLA_AO_rcr (design)
  var labelContains = "";
  var maxIndex = "";
  var iMaxIndex = "";
  var newOfferIndex = "";
  var language = data.language.toString().toUpperCase(); //e.g. EN
  var adobeLanguage = ""; //e.g. en-ao
  var contextLabel = "";//e.g. Default
  var weight = ""; //e.g. 0 for fallback, 1 for default
  var filterLabelContext = ""; //e.g. "Query: primary key greather than 0" for fallback and default
  var filterLabel = "Query: language of offer being processed equal to not_apply or process Language equal to 'Upper(Substring([currentOffer/@language] , 0 , 3'";

  
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////
  //function to calculate MAX sequencial index of existing default fallback offers
  //INPUT: category folder internal name 
  function getMaxOfferIndex(categoryFolder, labelContains) {

    var expression = "[category/@name] = '"+categoryFolder+"'";
      
    var offers = xtk.queryDef.create(
           <queryDef schema="nms:offer" operation="select">
               <select>
                   <node expr="@id"/>
                   <node expr="@label"/>
               </select>
              <where>
                  <condition boolOperator="AND" expr={"[@label] LIKE '"+labelContains+"'"}/> 
                  <condition expr={expression}/>
              </where>
           </queryDef>).ExecuteQuery();
    
    if (offers.offer.length() > 0) {
       var array = [];
     
       for each (var o in offers) {
          var index = o.@label.toString().split("_");
          array.push(parseInt(index[index.length-1]));
       }
    
       var max= 0;
   
       for (i=0; i<array.length; i++){
          if (array[i]>max) {
              max=array[i];
          }
       }    
   
       return max;
       
    } else return 0;
   }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  //function to get the id of the org entity of the specified country
  function getOrgEntityId(country){
    var conditionString = "ufs_"+country+"_LOU";
    var getOrgEntityIdQuery = xtk.queryDef.create(
      <queryDef schema="nms:localOrgUnit" operation="select">
        <select>
          <node expr="[@id]" alias="@id" />
        </select>
          <groupBy/>
          <having/>
        <where>
        <condition expr={"[@name] = '"+conditionString+"'"}/>
        </where>
      </queryDef>
    )
    var orgEntityIds = getOrgEntityIdQuery.ExecuteQuery();

    for each(orgEntityId in orgEntityIds){
      orgEntityId = orgEntityId.@id.toString();
    }
    
    return orgEntityId;
  }

   ////////////////////////////////////////////////////////////////////////////////////////////////////////
  //query to get category id - each folder for each market has different id
  function getCategoryId(categoryInternalName){
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

    return offerCategoryId;
  }

////////////////////////////////////////////////////////////////////////////////////////////////
//function to create the offer context
  function createOfferContext(offerContextId, offerId, contextLabel, weight, ctxSpace, filterLabel){
    try {
      if ( offerContextId == 0 )
        var offerXML = <offerContext offer-id = {offerId} label = {contextLabel} weightExpr = {weight} space-id = {ctxSpace[0]} >
                  <filter label = {filterLabel} schema="nms:recipient">
                    <where displayFilter = {filterLabel} filterName="backGroundFilterFrm" filteringSchema = "nms:recipient">
                      <condition compositeKey = "" dependkey = "" enabledIf = "" expr = {"@id > 0"} /> // 
                    </where>
                    <humanCond>{filterLabel}</humanCond>
                  </filter>
                  </offerContext>
        var newOfferContext = nms.offerContext.create(offerXML);

       newOfferContext.save();
      
    }
    catch( err ){                                                                                                                          
        response = "error: creating offer weight " + weight + " for " + contextLabel + ": " + err.message;
    }
  } 
  

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function to create new offers
  function createNewOffer(newOfferName, newOfferLabel, data, categoryId, adobeLanguage, newOfferOrgId, filterLabel, contextLabel, weight, filterLabelContext){

    var html2Column = get2MainColumnHTML();
    var html2ColumnImage = get2MainImageColumnHTML();
    var html3Ecommerce = get3EcommerceHTML();
    var html5050Split = getSplit5050();
    var html7030Split = getSplit7030();

    var ctxSpace = [getOption( "ufsOfferContextSpaceId" ),getOption( "ufsEmailOfferSpaceId" ),getOption( "ufsOutboundOfferSpaceId" ),getOption( "ufsEcommerce3ColumnsOfferSpaceId" )];

    try{
      var newOffer = nms.offer.create(
        <offer
          category-id          = {categoryId}
          code                 = {newOfferName}
          contentBlockOffer-id = "0"
          contentStatus        = "0"
          eligibilityStatus    = "0"            
          isModel              = "0"
          label                = {newOfferLabel}
          name                 = {newOfferName}
          owner-id             = "0"
          reminderContent      = ""
          reminderEligibility  = ""
          startDate            = ""
          status               = "0"
          localOrgUnit-id      = {newOfferOrgId}
          language             = {adobeLanguage}
          xtkschema            = "nms:offer">
  
          <view>
            <emailSubject1_jst>{data.subjectOne}</emailSubject1_jst>
            <emailSubject2_jst>{data.subjectTwo}</emailSubject2_jst>
            <preHeader_jst>{data.preHeader}</preHeader_jst>
            <shortContent_jst>{data.headline}</shortContent_jst>
            <subHeading_jst>{data.subheadline}</subHeading_jst>
            <cTAText_jst>{data.CTAText}</cTAText_jst>
            <trackedUrls>
                <url_jst>{data.destinationURL}</url_jst>
            </trackedUrls>
            <imageUrl_jst>{data.imageURL}</imageUrl_jst>
            <mImageUrl_jst>{data.mobileImageURL}</mImageUrl_jst>
            <imageAltText_jst>{data.imageAltText}</imageAltText_jst>
            <htmlSource_jst>{data.copyText}</htmlSource_jst>
  
            <htmlSource2Main_jst>{html2Column}</htmlSource2Main_jst>
            <htmlSource2MainImage_jst>{html2ColumnImage}</htmlSource2MainImage_jst>
            <htmlSource3Ecommerce_jst>{html3Ecommerce}</htmlSource3Ecommerce_jst>
            <htmlSourceSplit5050_jst>{html5050Split}</htmlSourceSplit5050_jst>
            <htmlSourceSplit7030_jst>{html7030Split}</htmlSourceSplit7030_jst>
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
      newOffer.save();
  
      createOfferContext(0, newOffer.id, contextLabel, weight, ctxSpace, filterLabelContext);
      
      var validated = <validated _{ctxSpace[0]}="3" _{ctxSpace[1]}="3" _{ctxSpace[2]}="3" _{ctxSpace[3]}="3"/>;                                                                                   
      nms.offer.Validation( newOffer.id, 0, validated, 0, null );                                                                    
      nms.offer.Validation( newOffer.id, 1, validated, 0, null );

      response = newOfferLabel;

    }catch(err){
      response = "error: creating offer " + newOfferLabel + "message: " + err.message;
    }
                              
  }



////////////////////////////////////////////////////////////////////////////////////////////////////
//getting vars to call createOffers
var categoryId = getCategoryId(categoryInternalName);
var newOfferOrgId = getOrgEntityId(country);

var offerType = data.offerType.toString(); // Default fallback/Default

//SORT ADOBE LANGUAGE
if(country != "CH" && country != "SA" && country != "CA" && country != "BE" && country != "MM" && country != "ID" && country != "MY" && country != "HK" && country != "KW" ){
  adobeLanguage = "not_apply";
}else{
  var languageToChange = "en";
  adobeLanguage = languageToChange + '-' + country.toLowerCase();
}

//CALL CREATEOFFER FUNCTION BASED ON THE TYPE OF THE OFFER
if(offerType == "Default fallback"){
  labelContains = '%_Default_Fallback_Offer_%';
  maxIndex = getMaxOfferIndex(categoryInternalName, labelContains);
  newOfferIndex = maxIndex +1;
  var newOfferLabel = MCO+"_"+country+"_"+language+"_Default_Fallback_Offer" + '_' + newOfferIndex.toString(); //e.g. ANGOLA_AO_EN_Default_Fallback_Offer_73
  var newOfferName = "ufs_"+country+"_"+language+"_DefaultFallbackOffer" + newOfferIndex.toString() + categoryRef; //e.g. ufs_AO_EN_DefaultFallbackOffer73rcr
  contextLabel = "Default";
  weight = 0;
  filterLabelContext = "Query: primary key greather than 0";

  createNewOffer(newOfferName, newOfferLabel, data, categoryId, adobeLanguage, newOfferOrgId, filterLabel, contextLabel, weight, filterLabelContext);

}else if(offerType == "Default"){
  labelContains = "%_Default_Offer_%";
  maxIndex = getMaxOfferIndex(categoryInternalName);
  newOfferIndex = maxIndex +1;
  var newOfferLabel = MCO+"_"+country+"_"+language+"_Default_Offer" + '_' + newOfferIndex.toString(); //e.g. ANGOLA_AO_EN_Default_Offer_78
  var newOfferName = "ufs_"+country+"_"+language+"_DefaultOffer" + newOfferIndex.toString() + categoryRef; //e.g. ufs_AO_EN_DefaultOffer78rcr
  contextLabel = "Default";
  weight = 1;
  filterLabelContext = "Query: primary key greather than 0";

  createNewOffer(newOfferName, newOfferLabel, data, categoryId, adobeLanguage, newOfferOrgId, filterLabel, contextLabel, weight, filterLabelContext);

}else{
  response = "error: this type of offer can´t be created";
}

/*
  if(categoryId != ""){
    
    
    var prefixFallbackDefaultLabel =  MCO+"_"+country+"_"+language+"_Default_Fallback_Offer";
    var prefixFallbackDefaultName = "ufs_"+country+"_"+language+"_DefaultFallbackOffer";
    
    var newOfferLabel = prefixFallbackLabel + '_' + newOfferIndex.toString();
    var newOfferName = prefixFallbackName + newOfferIndex.toString() + categoryRef;

    var filterLabel = "Query: language of offer being processed equal to not_apply or process Language equal to 'Upper(Substring([currentOffer/@language] , 0 , 3'";
    response = newOfferLabel;
    //createNewDefaultOffer(newOfferName, newOfferLabel, data, offerCategoryId, language, newOfferOrgId, filterLabel);
  }*/

  
  
  document.write(response);
%><% logonWithContext(context);%>