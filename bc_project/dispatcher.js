<% response.setContentType("text/html;charset=utf-8"); %>
<%@ page import="xtk:server/jsspcontext.js"%>
<%@ page import="xtk:shared/nl.js"%>
<%@ page import="xtk:shared/xtk.js" %>
<%
  var context = logonEscalation("admin");
  var results = "";

  var postData = JSON.parse(request.getBodyAsString());
  var offerId = postData.offerId.toString();
  var offerLabel = postData.offerLabel.toString();
  var categoryInternalName = postData.categoryInternalName.toString();

  var ctxSpace = [getOption( "ufsOfferContextSpaceId" ),getOption( "ufsEmailOfferSpaceId" ),getOption( "ufsOutboundOfferSpaceId" ),getOption( "ufsEcommerce3ColumnsOfferSpaceId" )];

  var recoOffersSubstrings = ['_rcr', '_dps', '_ws', '_dpr', '_ret', '_arc', '_rcrv02', '_rcrv03', '_ups'];
  var isRecoOffer = 0;
//check if the correct offer id was passed (has to be reco offer)
  for (i = 0; i < recoOffersSubstrings.length; i++){
    if(categoryInternalName.toLowerCase().indexOf(recoOffersSubstrings[i]) != -1){
      isRecoOffer = 1;
    }

  }

// ---------------------------------------------------- ENABLE RECO OFFERS FUNCTION -------------------------------------------------------
  function enableRecoOffer(){
    var newCategoryFolder = categoryInternalName.slice(0, -4);
    var exprCategory = "@name = '"+newCategoryFolder+"'";
    
  }

// ---------------------------------------------------- DISABLE RECO OFFERS FUNCTION -------------------------------------------------------
  function disableRecoOffer(){
    //1. moving offer to disabled folder
    var newCategoryFolder = categoryInternalName+"_bin";
    var exprCategory = "@name = '"+newCategoryFolder+"'";
    
    var query = xtk.queryDef.create(
        <queryDef schema="nms:offerCategory" operation="select">
            <select>
                <node expr="@id"/>
            </select>
           <where> 
               <condition boolOperator="AND" expr={exprCategory}/>
           </where>
        </queryDef>).ExecuteQuery();

    //xtk.session.Write(<offer _key="@id" _operation="update" xtkschema="nms:offer" id={offerId} category-id={query.offerCategory.@id} />);

    //2. updating validation and statuses in various spaces
    var validated = <validated _{ctxSpace[0]}="5" _{ctxSpace[1]}="5" _{ctxSpace[2]}="5" _{ctxSpace[3]}="5"/>;                                                                                   
    nms.offer.Validation( offerId, 0, validated, 0, null );                                                                    
    nms.offer.Validation( offerId, 1, validated, 0, null );

    //xtk.session.Write(<offer _key="@id" _operation="update" xtkschema="nms:offer" id={offerId} eligibilityStatus = "5" contentStatus = "5"/>);
    results = offerLabel;

  }

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
// ---------------------------------------------------- CALLING CORRECT FUNCTION BASED ON ACTION PASSED IN POSTED DATA -------------------------------------------------------
  if(postData.action.toString() == "enable" && isRecoOffer === 1){
    //var results = "enable was called";
    //results += ctxSpace[0].toString();
    enableRecoOffer();

  }else if(postData.action.toString() == "disable" && isRecoOffer === 1){
    //results = "disable was called";
    disableRecoOffer();
  }else{
    results = "this is not a correct type of offer";
  }

  document.write(results);
%><% logonWithContext(context);%>