/*

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////LIST OF FUNCTIONS://///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

-moveOffer(offerId, categoryName)
-moveRecoOffers(offers, categoryName)
-disableDefaultOffers(ctxSpace, categoryName, languageName)
-disableRecoOffers(ctxSpace, categoryName, languageName, isDefault)
-disableOffers(offers, ctxSpace)
-createDefaultOffers(MCO, country, language, languageName, countLanguage, lou, productCtaLouString, recipeCtaLouString)
-createOfferContext( offerId, label, weightConditionLabel, weight, ctxSpace, filterLabel )
-updateOffer(offerId, ctxSpace, offerContent)

*/

loadLibrary("wun:offerLayouts.js");

//Function to move Default Offers to bin subfolder for disabled offers
//INPUT: , offer primary key, cetegory folder internal name
//OUTPUT: offer ID, internal name category folder
//RESULT: Default Offers foreign key updated with id Category subfolder for diaabled offer
function moveOffer(offerId, categoryName) {

  var exprCategory = "@name = '"+categoryName+"'";
  
  var folder = xtk.queryDef.create(
        <queryDef schema="nms:offerCategory" operation="select">
            <select>
                <node expr="@id"/>
            </select>
           <where> 
               <condition boolOperator="AND" expr={exprCategory}/>
           </where>
        </queryDef>).ExecuteQuery();

   xtk.session.Write(<offer _key="@id" _operation="update" xtkschema="nms:offer" id={offerId} category-id={folder.offerCategory.@id} />);      
         
}

//Function to move in bulk offers to bin subfolder for disabled offers
//INPUT: , offer primary key, cetegory folder internal name
//OUTPUT: None
//RESULT: Default Offers foreign key updated with id Category subfolder for diaabled offer
function moveRecoOffers(offers, categoryName) {

  var exprCategory = "@name = '"+categoryName+"'";
  
  var folder = xtk.queryDef.create(
        <queryDef schema="nms:offerCategory" operation="select">
            <select>
                <node expr="@id"/>
            </select>
           <where> 
               <condition boolOperator="AND" expr={exprCategory}/>
           </where>
        </queryDef>).ExecuteQuery();
        
   var offersCollection = <offer-collection _operation="update" xtkschema="nms:offer"/>
        
   for each (o in offers){
   
      offersCollection.appendChild(<offer _key="@id" id={o.@id} category-id={folder.offerCategory.@id}/>)
   }

   xtk.session.WriteCollection(offersCollection);      
         
};

//Function to disable all Default/FallBackDefault offers in the live space UFS Email Channel Dynamic Block
//INPUT: cetegory folder internal name, country's language (ISO2 Upper Case)
//OUTPUT: None
//RESULT: Default Offers disabled, moved to Cetegory subfolder (foreign key updated) and published in Production environment.
function disableDefaultOffers(ctxSpace, categoryName, languageName) {

 var exprLabel = "@label LIKE '%_Default_%'";  
// var exprLabel = "@label LIKE '%_"+language+"_Default_%'"; 
 var exprCategory = "[category/@name] = '"+categoryName+"'";
 var exprLanguage = "@language IN ('not_apply','"+languageName+"')";
 
 var offers = xtk.queryDef.create(
        <queryDef schema="nms:offer" operation="select">
            <select>
                <node expr="@id"/>
                <node expr="[prodOffer/@id]"/>
            </select>
           <where>
               <condition boolOperator="AND" expr={exprLabel}/> 
               <condition boolOperator="AND" expr={exprCategory}/>
               <condition expr={exprLanguage}/>
           </where>
        </queryDef>).ExecuteQuery();
  //logInfo(offers); 
        
  for each (o in offers) {
     
     moveBinDefaultOffer (o.@id, categoryName);
     
     var validated = <validated _{ctxSpace[0]}="5" _{ctxSpace[1]}="5" _{ctxSpace[2]}="5" _{ctxSpace[3]}="5"/>;                                                                                   
     nms.offer.Validation( o.@id, 0, validated, 0, null );                                                                    
     nms.offer.Validation( o.@id, 1, validated, 0, null );
     
     //xtk.session.Write(<offer _key="@id" _operation="update" xtkschema="nms:offer" id={o.prodOffer.@id} eligibilityStatus = "5" contentStatus = "5"/>);  
     xtk.session.Write(<offer _key="@id" _operation="update" xtkschema="nms:offer" id={o.@id} eligibilityStatus = "5" contentStatus = "5"/>);
  }
}

//Function to disable in bulk offers in the live space UFS Email Channel Dynamic Block
//INPUT: offer space id, cetegory folder internal name, country's language (ISO2 Upper Case)
//OUTPUT: None
//RESULT: Default Offers disabled, moved to Cetegory subfolder (foreign key updated) and published in Production environment.
function disableRecoOffers(ctxSpace, categoryName, languageName, isDefault) {

 var exprLabel;
 
 if (isDefault == 1)  exprLabel = "@label LIKE '%_Default_%'"
 
 else if (isDefault == 0) exprLabel = "@label NOT LIKE '%_Default_%'"

// var exprLabel = "@label LIKE '%_"+language+"_Default_%'"; 
 var exprCategory = "[category/@name] = '"+categoryName+"'";
 var exprLanguage = "@language IN ('not_apply','"+languageName+"')";
 
 var offers = xtk.queryDef.create(
        <queryDef schema="nms:offer" operation="select">
            <select>
                <node expr="@id"/>
                <node expr="[prodOffer/@id]"/>
            </select>
           <where>
               <condition boolOperator="AND" expr={exprLabel}/> 
               <condition boolOperator="AND" expr={exprCategory}/>
               <condition expr={exprLanguage}/>
           </where>
        </queryDef>).ExecuteQuery();
  //logInfo(offers); 
        
  for each (var o in offers) {
     
     moveBinOffer (o.@id, categoryFolder);
     
     var validated = <validated _{ctxSpace[0]}="5" _{ctxSpace[1]}="5" _{ctxSpace[2]}="5" _{ctxSpace[3]}="5"/>;                                                                                   
     nms.offer.Validation( o.@id, 0, validated, 0, null );                                                                    
     nms.offer.Validation( o.@id, 1, validated, 0, null );
     
     //xtk.session.Write(<offer _key="@id" _operation="update" xtkschema="nms:offer" id={o.prodOffer.@id} eligibilityStatus = "5" contentStatus = "5"/>);  
     xtk.session.Write(<offer _key="@id" _operation="update" xtkschema="nms:offer" id={o.@id} eligibilityStatus = "5" contentStatus = "5"/>);
  }
}

//Function to disable in bulk offers in the live space UFS Email Channel Dynamic Block
//INPUT: offers to disable (XML), offer space id
//OUTPUT: None
//RESULT: Default Offers disabled, moved to Cetegory subfolder (foreign key updated) and published in Production environment.
function disableOffers(offers, ctxSpace) {

   for each (o in offers) {
   
        var validated = <validated _{ctxSpace[0]}="5" _{ctxSpace[1]}="5" _{ctxSpace[2]}="5" _{ctxSpace[3]}="5"/>;                                                                                   
        nms.offer.Validation( o.@id, 0, validated, 0, null );                                                                    
        nms.offer.Validation( o.@id, 1, validated, 0, null );
     
        //xtk.session.Write(<offer _key="@id" _operation="update" xtkschema="nms:offer" id={o.prodOffer.@id} eligibilityStatus = "5" contentStatus = "5"/>);  
        xtk.session.Write(<offer _key="@id" _operation="update" xtkschema="nms:offer" id={o.@id} eligibilityStatus = "5" contentStatus = "5"/>);
   }
}

//Function to generate Default Offers, if category folders are in place TO BE AMENDED
//INPUT:
//OUTPUT: 
function createDefaultOffers(MCO, country, language, languageName, countLanguage, lou, productCtaLouString, recipeCtaLouString) {
   
   var ctxSpace = [getOption( "ufsOfferContextSpaceId" ),getOption( "ufsEmailOfferSpaceId" ),getOption( "ufsOutboundOfferSpaceId" ),getOption( "ufsEcommerce3ColumnsOfferSpaceId" )];
   
   var recipeCtaUpdated = 0;
   var productCtaUpdated = 0;
   var langCodeLou = country.toLowerCase()+"_"+language.toLowerCase();
   
   var categoryProduct = "categoryRootRcp"+MCO+"_"+country+"_"+"ws";
   var categoryProductId = existCategory(categoryProduct);
   //logInfo("pId:"+categoryProductId);
   var categoryRecipe = "categoryRootRcp"+MCO+"_"+country+"_"+"rcr";
   var categoryRecipeId = existFolder(categoryRecipe);
   //logInfo("rId:"+categoryRecipeId);
   
   var prefixDefaultLabel = MCO+"_"+country+"_"+language+"_Default_Offer_";
   var prefixDefaultName = "ufs_"+country+"_"+language+"_DefaultOffer";
   var prefixFallbackLabel =  MCO+"_"+country+"_"+language+"_Default_Fallback_Offer_";
   var prefixFallbackName = "ufs_"+country+"_"+language+"_DefaultFallbackOffer";

   var filterLabel = "Query: language of offer being processed equal to not_apply or process Language equal to 'Upper(Substring([currentOffer/@language] , 0 , 3'";
   var csvData = collectFileData();
          
   var indexProduct = (getMaxOfferIndex(categoryProduct)+1);
   var indexRecipe = (getMaxOfferIndex(categoryRecipe)+1);
//logInfo("Index Product: "+indexProduct);
//logInfo("Index Recipe: "+indexRecipe);   
   ///Disable all default product recommendation offers (UFS Email Channel Dynamic Block offer space)
   disableDefaultOffers(ctxSpace, categoryProduct, language, languageName);
   ///Disable all default recipe recommendation offers (UFS Email Channel Dynamic Block offer space)
   disableDefaultOffers(ctxSpace, categoryRecipe, language, languageName);
   
   for each (data in csvData.offerContent) {
      var title = data.title.toString();
      title = title.replace("'","\'");
      logInfo("Title: "+title);
      var imageUrl = data.ImageUrl.toString();
      imageUrl = imageUrl.replace("'","\'");
      logInfo("Image URL: "+imageUrl);
      var CTA = data.CTA.toString();
      CTA = CTA.replace("'","\'");
      logInfo("CTA URL: "+CTA);
      var Type = data.Type.toString();
      Type = Type.replace("'","\'");
      logInfo("Type: "+Type);
      var CTA_text = data.CTA_text.toString();
      CTA_text = CTA_text.replace("'","\'");
      
      if (title != "" && imageUrl != "" && CTA != "" && Type != "" && CTA_text != "") {  
         
            if (Type == "Product" && existCategory(categoryProduct) != 0) {
           
               if (productCtaUpdated == 0) {
         
            updateCtaLou(langCodeLou, lou, productCtaLouString, CTA_text, Type); 
          productCtaUpdated = 1;
               }          
               
               var numberFallbackProducts = countFallBackDefaultOffers(categoryProduct, language, languageName);
               logInfo("N Fall back Product: "+numberFallbackProducts);
//logInfo(categoryProduct);        
               
               if (numberFallbackProducts < 3) {
      
                  var label = prefixFallbackLabel + indexProduct.toString();
                  var name = prefixFallbackName + indexProduct.toString() +"ws";            
                  
                  if (countLanguage == 1) {
                  
                      CreateOffer( categoryProductId, name, ctxSpace[0], label, "Default", "0", filterLabel, imageUrl, CTA, title, lou, "not_apply" );
                      
                  } else if (countLanguage > 1) {
                  
                      CreateOffer( categoryProductId, name, ctxSpace[0], label, "Default", "0", filterLabel, imageUrl, CTA, title, lou, languageName );
                  }
                  
                  //logInfo("Create FallBack Product Offer.");
                  
               } else {
               
                  var label = prefixDefaultLabel + indexProduct.toString();
                  var name = prefixDefaultName + indexProduct.toString() +"ws";            
               
                  if (countLanguage == 1) {
                  
                      CreateOffer( categoryProductId, name, ctxSpace[0], label, "Default", "1", filterLabel, imageUrl, CTA, title, lou, "not_apply" );
                      
                  } else if (countLanguage > 1) {
                  
                      CreateOffer( categoryProductId, name, ctxSpace[0], label, "Default", "1", filterLabel, imageUrl, CTA, title, lou, languageName );
                  }
                  
                  //logInfo("Create Default Product Offer.");
               }
               indexProduct++;
                     
            } else if (Type == "Recipe" && existCategory(categoryRecipe) != 0) {
            
               if (recipeCtaUpdated == 0) {
         
            updateCtaLou(langCodeLou, lou, recipeCtaLouString, CTA_text, Type);  
          recipeCtaUpdated = 1;
               } 
                    
               var numberFallbackRecipes = countFallBackDefaultOffers(categoryRecipe, language, languageName);
               logInfo("N Fall back Recipe: "+numberFallbackRecipes);  
//logInfo(categoryRecipe); 
               
               if (numberFallbackRecipes < 3) {
      
                  var label = prefixFallbackLabel + indexRecipe.toString();
                  var name = prefixFallbackName + indexRecipe.toString() +"rcr";         
      
                  if (countLanguage == 1) {
                  
                      CreateOffer( categoryRecipeId, name, ctxSpace[0], label, "Default", "0", filterLabel, imageUrl, CTA, title, lou, "not_apply" );
                      
                  } else if (countLanguage > 1) {
                  
                      CreateOffer( categoryRecipeId, name, ctxSpace[0], label, "Default", "0", filterLabel, imageUrl, CTA, title, lou, languageName );
                  }  
                  
                  //logInfo("Create FallBack Recipe Offer.");
                  
               } else {
      
                  var label = prefixDefaultLabel + indexRecipe.toString();
                  var name = prefixDefaultName + indexRecipe.toString() +"rcr";             
               
                  if (countLanguage == 1) {
                  
                      CreateOffer( categoryRecipeId, name, ctxSpace[0], label, "Default", "1", filterLabel, imageUrl, CTA, title, lou, "not_apply" );
                      
                  } else if (countLanguage > 1) {
                  
                      CreateOffer( categoryRecipeId, name, ctxSpace[0], label, "Default", "1", filterLabel, imageUrl, CTA, title, lou, languageName );
                  } 
                  
                  //logInfo("Create Default Recipe Offer.");
               }
               indexRecipe++;
                             
            } else if (existCategory(categoryRecipe) == 0){
            
               //logInfo("No folder for Recipe category: "+categoryRecipe);
               vars.errorStatus = 3;
               vars.errorDescription = "No folder for Recipe category: "+categoryRecipe; 
               
            } else if (existCategory(categoryProduct) == 0){
            
               //logInfo("No folder for Product category: "+categoryProduct);
               vars.errorStatus = 3;
               vars.errorDescription = "No folder for Product category: "+categoryProduct;                
            } 
            
      } else {
      
         //logInfo("Missing data in the recommendations.csv file.");
         vars.errorStatus = 3;
         vars.errorDescription = "Missing data in the recommendations.csv file";
      }
   }
}

//Function to create an context for a specified offer
//INPUT: offer id, context label, weight expression, weight integer, offer space id, description label of weight expression
//RESULT: offer context created according to input parameters and linked to specified offer
function createOfferContext( offerId, label, weightConditionLabel, weight, ctxSpace, filterLabel ){                                                                                                                                  
  
  try {
  
      var newOfferContext = nms.offerContext.create(
                <offerContext offer-id = {offerId} label = {label} weightExpr = {weight} space-id = {ctxSpace} >
                <filter label = {filterLabel} schema="nms:recipient">
                  <where displayFilter = {filterLabel} filterName="backGroundFilterFrm" filteringSchema = "nms:recipient">
                  <condition compositeKey = "" dependkey = "" enabledIf = "" expr = {weightConditionLabel} />
                  </where>
                  <humanCond>{filterLabel}</humanCond>
                </filter>
                </offerContext>);

     newOfferContext.save();
  }
  catch( err ){                                                                                                                          
      logError( "Error creating offer weight " + weight + " for " + label + ": " + err.message );
      //vars.lastErrorMsg = err.message;  
  }

}

// Function to create new offer
//   OfferCategoryId    - id of the category in which offer will be created
//   offerCategoryAbr - abbreviation of the category description name (for reference, option offerCategoriesDefinitionObject)
//   contextType      - name of the category description (for reference, option offerCategoriesDefinitionObject)
//   offerName        - name of the offer
//   ctxSpace         - space id for the offerContext
//   lou              - organizational entity id
//   language         - language code
//   typeOffer        - 3 values: default, fallback, recommended
//   objWeights       - JSON object describing all defined wights per type of offer (for reference, option recommendedOffersWeightsDefinitionObject)
//   offerContent     - JSON object with content to be implemented in the offer: {"title":"", "imageUrl":"", "destinationUrl":""}
  
function createRecommendedOffer(offerCategoryId, offerCategoryAbr, contextType, offerName, ctxSpace, lou, language, typeOffer, objWeights, offerContent){                                                                                                                                  
    
  var html2Column = get2MainColumnHTML();
  var html2Image = get2MainImageColumnHTML();
  var html3Ecommerce = get3EcommerceHTML();
  var html5050Split = getSplit5050();
  var html7030Split = getSplit7030();
  var htmlHeroImage = getHeroImageHTML();
  var htmlEventLocator = getEventLocatorHTML();
          
  try{                                                                                                                            
    var filterLabel = "Query: language of offer being processed equal to not_apply or process Language equal to 'Upper(Substring([currentOffer/@language] , 0 , 3'";
 
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
    newOffer.save();                                                                                               
     
     var contextLabel;
     var weightConditionLabel;
   
     if (typeOffer == "default" || typeOffer == "fallback") {
  
          contextLabel = "Query: primary key greather than 0.";
          weightConditionLabel = "@id > 0";
      
          createOfferContext( newOffer.id, "Default", weightConditionLabel, objWeights[typeOffer], ctxSpace, contextLabel )  
      
     } else if (typeOffer == "recommended") {
     
           var nContext = 1;
  
           while (nContext <=3) {
               
               contextLabel = "Query: label of offer being processed equal to " + contextType + nContext.toString() + " of targetData.";
               weightConditionLabel = "[currentOffer/@label] = [interaction/targetData/@" + contextType + nContext.toString() + "]";     
       
               createOfferContext( newOffer.id, "Rank"+nContext.toString(), weightConditionLabel, objWeights[typeOffer]["context"+nContext.toString()], ctxSpace, contextLabel );                                           

               nContext++;         
           }   
     }
   
    var validated = <validated _{ctxSpace}="3"/>;                                                                                    
    nms.offer.Validation( newOffer.id, 0, validated, 0, null );                                                                   
    nms.offer.Validation( newOffer.id, 1, validated, 0, null );                                                             
  }
  catch( err )
  {
      logError("Error creating offer " + offerName+". Error name '"+err.name+"' and error message '"+err.message+"'");
  }
}

// Function to update existing offer
//   offerId          - if of the offer to update
//   ctxSpace         - offer space id
//   offerContent     - JSON object with content to be implemented in the offer: {"title":"", "imageUrl":"", "destinationUrl":""}
function updateOffer(offerId, ctxSpace, offerContent) {

   try {
       
       var html2Column = get2MainColumnHTML();
       var html2Image = get2MainImageColumnHTML();
       var html3Ecommerce = get3EcommerceHTML();
       var html5050Split = getSplit5050();
       var html7030Split = getSplit7030();
       var htmlHeroImage = getHeroImageHTML();
       var htmlEventLocator = getEventLocatorHTML();
   
       var offer = NLWS.nmsOffer.load(offerId);
   
       offer.view.trackedUrls.url_jst = offerContent.destinationUrl;
       offer.view.imageUrl_jst = offerContent.imageUrl;
       offer.view.shortContent_jst = offerContent.title;
       offer.view.htmlSource2Main_jst = html2Column;
       offer.view.htmlSource2MainImage_jst = html2Image;
       offer.view.htmlSource3Ecommerce_jst = html3Ecommerce;
       offer.view.htmlSourceSplit5050_jst = html5050Split;
       offer.view.htmlSourceSplit7030_jst = html7030Split;
       offer.view.htmlSourceHeroImage_jst = htmlHeroImage;
       offer.view.htmlSourceEventLocator_jst = htmlEventLocator;
   
       offer.contentStatus = "0";
       offer.eligibilityStatus = "0"; 
       offer.save();

       var validated = <validated _{ctxSpace}="3"/>;                                                                                    
       nms.offer.Validation( offerId, 0, validated, 0, null );                                                                   
       nms.offer.Validation( offerId, 1, validated, 0, null ); 
       
   } catch(err){
   
       logError("Error updating offer with id: " + offerId+". Error name '"+err.name+"' and error message '"+err.message+"'");
   }        
}