/*

/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////LIST OF FUNCTIONS://///////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

-getMaxOfferIndex(categoryFolder)
-countFallBackDefaultOffers(categoryFolder, language, languageName)
-collectFileData(tempTable)
-collectData(tempTable)
-updateCtaLou(langCode, louId, ctaLouString, ctaText, type)
-getLouId(countryCode)
-getDistinctCategories(tempTable)
-getDistinctRecoCodes(tempTable)
-generateStringListRecoCodes(recoCodes)
-getOffersToDisable(categoryName, offersToKeep)
-getMcoCode(tempTable)
-getCountryCode(tempTable)
-existCategory(category)
-getCategoryId(category)
-getOfferId(recoCode, category)
-locationValidation(mco, country)
-countLanguage(country)
-extractRecoMcoCode(recoCode)
-extractRecoCountryCode(recoCode)
-extractRecoLanguageCode(recoCode)
-extractRecoType(recoCode)
-extractRecoId(recoCode)
-apiRequest(url, apiKey)
-getRecommendationContent(tempTable)
-processTempRecommendations(eventActivity)

*/

loadLibrary("wun:offerLayouts.js");
loadLibrary("wun:RecoFeed_Offers.js");

//Function to calculate the max index currently used within recommended offers (NOT DEFAULT) in a specified category
//INPUT: cetegory folder internal name
//OUTPUT: return 0 when no recommended offer available else max index used recommended offers (NOT DEFAULT)
function getMaxOfferIndex(categoryFolder) {

 var expression = "[category/@name] = '"+categoryFolder+"'";
   
 var offers = xtk.queryDef.create(
        <queryDef schema="nms:offer" operation="select">
            <select>
                <node expr="@id"/>
                <node expr="@label"/>
            </select>
           <where>
               <condition boolOperator="AND" expr="@label LIKE '%_Default_%'"/> 
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

//Function to check how many Fall Back Default Offers have been already created (NOT disabled in the live space)
//INPUT: cetegory folder internal name, country's language (ISO2 Upper Case)
//OUTPUT: Number of not disabled Fall Back Default Offers for the required context (country/language)
function countFallBackDefaultOffers(categoryFolder, language, languageName) {

logInfo("Language: "+language);
 var exprLabel = "@label LIKE '%_"+language+"_Default_Fallback_%'"; 
 var exprCategory = "[category/@name] = '"+categoryFolder+"'";
 var exprLanguage = "@language IN ('not_apply','"+languageName+"')";
//logInfo("exprLabel: "+exprLabel);
//logInfo("exprCategory: "+exprCategory); 
 var offers = xtk.queryDef.create(
        <queryDef schema="nms:offer" operation="select">
            <select>
                <node expr="@id"/>
                <node expr="@label"/>
            </select>
           <where>
               <condition boolOperator="AND" expr={exprLabel}/> 
               <condition boolOperator="AND" expr={exprCategory}/>
               <condition expr={exprLanguage}/>
           </where>
        </queryDef>).ExecuteQuery();
  
  return offers.offer.length();
   
}

//Function to collect specified csv data attributes from a specified temporary schema
//INPUT: name temporary schema
//OUTPUT: csv recommendation Data (xml)
function collectFileData(tempTable) {
  try {

    // select .csv file data
    var csvQuery = xtk.queryDef.create(
      <queryDef schema={tempTable} operation="select">
      <select>
        <node expr="title"/>
        <node expr="ImageUrl"/>        
        <node expr="CTA"/>
        <node expr="Type"/>
        <node expr="CTA_text"/>
      </select>
      </queryDef>);
        
    var csvData = csvQuery.ExecuteQuery();
    return csvData;
    
    
  } catch( errorMsg ) {

    logError("Error when calling the 'collectFileData' function (error="+errorMsg+").")
  }
}

//Function to collect ALL csv data attributes from a specified temporary schema
//INPUT: name temporary schema
//OUTPUT: csv recommendation Data (xml)
function collectData(tempTable) {
  try {

    // select .csv file data
    var csvQuery = xtk.queryDef.create(
      <queryDef schema={tempTable} operation="select">
      </queryDef>);
      
    csvQuery.SelectAll(false);  
        
    var csvData = csvQuery.ExecuteQuery();
    return csvData;
    
    
  } catch( errorMsg ) {

    logError("Error when calling the 'collectFileData' function (error="+errorMsg+").")
  }
}

//Function to update Product CTA or Recipe CTA fields in local organizational unit
//INPUT: langCode = (country.toLowerCase()+"_"+language.toLowerCase()); louId = primary key local organizational unit; ctaLouString = content Product/Recipe CTA field; ctaText = CTA text to insert/update; type = Recipe or Product
//OUTPUT: functions returns 1 if succesful, otherwise 0   
function updateCtaLou(langCode, louId, ctaLouString, ctaText, type) { 
  
  try
  {
    if (ctaLouString == "")
      ctaLouString = "{}";                                                                                                                              
    var ctaJson = JSON.parse(ctaLouString); 
    var ctaString = '';
  
    ctaJson[langCode] = ctaText;
    ctaString = JSON.stringify(ctaJson);
  
    if (type == "Product") {
  
       xtk.session.Write(<localOrgUnit _key="@id" _operation="update" xtkschema="nms:localOrgUnit" id={louId} productCTA={ctaString} />);  
       
    } else if (type == "Recipe") {
  
       xtk.session.Write(<localOrgUnit _key="@id" _operation="update" xtkschema="nms:localOrgUnit" id={louId} recipeCTA={ctaString} />);
    }
  
    return 1;                                                           
  }
  catch( err )
  {                                                     
    logError( err.message );
    return 0; 
  }
}

//Function to retrieve the id of a requred local organizational entity (NATURE = Country)
//INPUT: country code (ISO2 Upper Case)
//OUTPUT: returns the id of the local organizational entity if exit, else 0   
function getLouId(countryCode){

  var localOrgUnitCond = "[country/@isoA2] = '"+ countryCode + "'";
  
  var queryLOU = xtk.queryDef.create(
  <queryDef schema="nms:localOrgUnit" operation="select">
    <select>
      <node expr="@id"/>
    </select>
    <where>
      <condition boolOperator="AND" expr="@nature = 'Country'"/>
      <condition boolOperator="AND" expr={localOrgUnitCond}/>
    </where>
  </queryDef>);
      
  var result = queryLOU.ExecuteQuery();

  if(result.localOrgUnit.length() > 0) 
     return result.localOrgUnit.@id
  
  else return 0
}

//Function to retrieve distinct offer category names in a specified temporary schema
//INPUT: name temporary schema
//OUTPUT: query result (xml) with distinct offer category names  
function getDistinctCategories(tempTable){

  var query = xtk.queryDef.create(<queryDef schema={tempTable} operation="select" distinct="true">
                          <select>
                             <node expr="@category"/>                            
                          </select>
                        </queryDef>);
                                              
  var queryResult = query.ExecuteQuery();
  
  return queryResult
}

//Function to retrieve distinct recommended offer codes in a specified temporary schema
//INPUT: name temporary schema
//OUTPUT: query result (xml) with distinct recommended offer codes  
function getDistinctRecoCodes(tempTable){

  var element = tempTable.split(':')[1]
  
  var query = xtk.queryDef.create(<queryDef schema={tempTable} operation="select" distinct="true">
                          <select>
                             <node expr="@code"/>                            
                          </select>
                        </queryDef>);
                                              
  var queryResult = query.ExecuteQuery();
  
  return queryResult  
}

//Function to prepare stringified lists or recommendation codes 
//INPUT: recommendation codes to process (xml)
//OUTPUT: stringified list of recommendation codes with the following format: 'RECO1','RECO2'
function generateStringListRecoCodes(recoCodes){

  var list = "";
  
  for each (reco in recoCodes){
  
     list += "'"+reco.@code.toString()+"',";
  }
  
//logInfo("List :"+list.slice(0,-1));
  return list.slice(0,-1)  
}

//Function to retrieve offers to disable
//INPUT: name of the category folder where offers are located, stringified list of offers to keep
//OUTPUT: ids of offers to be disabled (xml)
function getOffersToDisable(categoryName, offersToKeep){

  var exprCategory = "[category/@name] = '"+categoryName+"'";
  var exprLabel = "@label NOT LIKE '%_Default_%'";
  var exprList = "@label NOT IN ("+offersToKeep+")";
  
  var query = xtk.queryDef.create(<queryDef schema="nms:offer" operation="select">
                          <select>
                             <node expr="@id"/>                            
                          </select>
                          <where>
                             <condition boolOperator="AND" expr= {exprCategory}/>
                             <condition boolOperator="AND" expr={exprLabel}/>
                             <condition expr={exprList}/>
                          </where>                          
                        </queryDef>);
                                              
  var queryResult = query.ExecuteQuery();  
  
  return queryResult
}

//Function to retrieve unique MCO code from the recommendation codes in a specified temporary schema
//INPUT: name of temporary schema
//OUTPUT: MCO code 
function getMcoCode(tempTable){

  var element = tempTable.split(':')[1];

  var query = xtk.queryDef.create(<queryDef schema={tempTable} operation="select" distinct="true">
                          <select>
                             <node expr="split_part(@code,'_',1)" alias="@mcoCode"/>                            
                          </select>
                        </queryDef>);
                                              
  var queryResult = query.ExecuteQuery();
  
  return queryResult[element].@mcoCode
}

//Function to retrieve unique Country code from the recommendation codes in a specified temporary schema
//INPUT: name of temporary schema
//OUTPUT: Country code
function getCountryCode(tempTable){

  var element = tempTable.split(':')[1];

  var query = xtk.queryDef.create(<queryDef schema={tempTable} operation="select" distinct="true">
                          <select>
                             <node expr="split_part(@code,'_',2)" alias="@countryCode"/>                            
                          </select>
                        </queryDef>);
                                              
  var queryResult = query.ExecuteQuery();
  
  return queryResult[element].@countryCode
}

//Function to check whether a specific category folder exists or not. 
//INPUT: cetegory folder internal name
//OUTPUT: 0 if category folder doesn't exist, else category folder id
function existCategory(category) {

 var expression = "@name = '"+category+"'";

 var category = xtk.queryDef.create(
        <queryDef schema="nms:offerCategory" operation="select">
           <select>
                <node expr="@id"/>
           </select>
           <where>
               <condition expr={expression}/> 
           </where>
        </queryDef>).ExecuteQuery();
        
  if(category.offerCategory.length() > 0) 
     return category.offerCategory.@id;
  
  else return 0;
}

//Function to retrieve the id of a specific category folder
//INPUT: cetegory folder internal name
//OUTPUT: 0 if category folder doesn't exist, else category folder id
function getCategoryId(category) {

 var expression = "@name = '"+category+"'";

 var category = xtk.queryDef.create(
        <queryDef schema="nms:offerCategory" operation="select">
           <select>
                <node expr="@id"/>
           </select>
           <where>
               <condition expr={expression}/> 
           </where>
        </queryDef>).ExecuteQuery();
        
  if(category.offerCategory.length() > 0) 
     return category.offerCategory.@id;
  
  else return 0;
}

//Function to retrieve the id of an offer in a specific category 
//INPUT: offer's label, category's name
//OUTPUT: 0 if offer doesn't exist, else offer's id
function getOfferId(recoCode, category) {
  
  var conditionOffer = "@label = '"+recoCode+"'";
  var conditionCategory = "[category/@name] = '"+category+"'";
  
  var query = xtk.queryDef.create(<queryDef schema="nms:offer" operation="select">
                       <select>
                          <node expr="@id"/>                            
                       </select>
                       <where>
                          <condition boolOperator="AND" expr={conditionOffer} />
                          <condition expr={conditionCategory} />
                       </where>
                     </queryDef>);
                     
  var queryResult = query.ExecuteQuery();
  
  if (queryResult.offer.length() > 0) 
       return queryResult.offer.@id;
  
  else return 0;   
}

//Function to validate whether mco and country codes provided are correct 
//INPUT: MCO code, Country code 
//OUTPUT: 1 if both MCO and Country codes are defined in the ufsInputValidationMCOCountries option, else 0
function locationValidation(mco, country){

  var validCountries = getOption( "ufsInputValidationMCOCountries" );
  
  if (validCountries.search( mco + "_" + country ) >= 0) return 1
  
  else return 0
   
}

//Function to retrieve the number of languages defined for a specific market
//INPUT: Country code (ISO 2 format)
//OUTPUT: number of languages defined
function countLanguage(country){

  var languageExpr = "@name LIKE '%' + '-"+ country.toLowerCase() +"'";
  var queryLang = xtk.queryDef.create(
      <queryDef schema="xtk:enumValue" operation="select">
          <select>
              <node expr="@id"/>
              <node expr="@name"/>
              <node expr="@label"/>
          </select>
         <where>
              <condition boolOperator="AND" expr="[enum/@name] = 'common_language'"/>
              <condition boolOperator="AND" expr={languageExpr}/>
          </where>
      </queryDef>);    
  var enumLanguageRes = queryLang.ExecuteQuery();

  return enumLanguageRes.enumValue.length()
}

//Function to extract Mco code from recommendation code
//INPUT: recommendation code
//OUTPUT: Mco code
function extractRecoMcoCode(recoCode) {

  return recoCode.split('_')[0].toUpperCase()
}

//Function to extract Country code from recommendation code
//INPUT: recommendation code
//OUTPUT: Country code
function extractRecoCountryCode(recoCode){

  return recoCode.split('_')[1].toUpperCase()
}

//Function to extract Language code from recommendation code
//INPUT: recommendation code
//OUTPUT: Language code
function extractRecoLanguageCode(recoCode){

  return recoCode.split('_')[2].toUpperCase()
}

//Function to calculate recommendation's type from recommendation code
//INPUT: recommendation code
//OUTPUT: 'recipes'if recommendation code included 'R' in the ID part, else 'products'
function extractRecoType(recoCode){
  
  var type = recoCode.split('_')[3].slice(0,1).toUpperCase();
  
  if (type == 'R') {
  
     return 'recipes'
     
  } else {
  
     return 'products'
  }
}

//Function to extract the recommendation ID from a recommendation code
//INPUT: recommendation code
//OUTPUT: product/recipe ID
function extractRecoId(recoCode){
  
  return recoCode.split('_')[3];
}

//Function to generate api request
//INPUT: full end point url, encrypted api key
//OUTPUT: body of the response (JSON)
function apiRequest(url, apiKey){

  try{
     
     var sifuAPIKey = reversibleDecrypt(apiKey).toString();
  
//logInfo("sifuAPIKey: "+sifuAPIKey);
     
     var endPointUrl = url.toString();
     
     var request = new HttpClientRequest(endPointUrl);
     request.header["Content-Type"] = "application/json; charset=utf-8";
     request.header["x-api-key"] = sifuAPIKey;
     request.method = "GET";
     request.execute();
     
     var response = request.response;
     var jsonBody = JSON.parse(response.body);
//logInfo("Api Call Response: "+JSON.stringify(jsonBody));     
     return jsonBody

     
  } catch(error) {
  
     logWarning("SIFU API Request failing (error="+error+").");
  }
}

//Function to retrieve content for all distinct recommendation codes in a specific temporary schema
//INPUT: name of the temporary schema
//OUTPUT: JSON object containing required recommendation content. The format of the object is the following: {"Recommendation Code": {"name" : "", "imageUrl" : "", "destinationUrl" : ""}}
function getRecommendationContent(tempTable){
  
  var element = tempTable.split(':')[1];
  
  var queryResult = getDistinctRecoCodes(tempTable);
  
//logInfo("queryResult :"+queryResult.toXMLString());
  
  var recoObj = {};
     
  for each (reco in queryResult[element]) {
  
logInfo("-------------------------------Start to process recommendation with code: "+reco.@code+"--------------------------------");
      
      var sifuEndPointUrl = getOption('sifu-api-url');
      var country = extractRecoCountryCode(reco.@code.toString());
      var language = extractRecoLanguageCode(reco.@code.toString());
      var type = extractRecoType(reco.@code.toString());
      var code = extractRecoId(reco.@code.toString());
      var sifuAPIKey = getOption('sifu-api-key');
      
      if (type == 'products'){
    
          if (['DE','AT','CH'].indexOf(country.toUpperCase()) != -1 ) {
    
               sifuEndPointUrl = sifuEndPointUrl +"products/pnir/";
       
          } else {
    
               sifuEndPointUrl = sifuEndPointUrl+"products/";      
      }
    
      sifuEndPointUrl = sifuEndPointUrl+country.toUpperCase()+"/"+language.toLowerCase()+"/cuean/"+code;

     
      } else if (type == 'recipes') {
  
          sifuEndPointUrl = sifuEndPointUrl+"recipes/"+country.toUpperCase()+"/"+language.toLowerCase()+"/full/number/"+code;
      }
      
//logInfo("sifuEndPointUrl: "+sifuEndPointUrl);
      
      var responseBody = apiRequest(sifuEndPointUrl, sifuAPIKey);
      var name;
      var imageUrl;
      var destinationUrl;
      
      if(extractRecoType(reco.@code.toString()) == 'recipes') 
          image = "imageUrl";
                   
      else if (extractRecoType(reco.@code.toString()) == 'products') 
          image = "packshotUrl";
      
//      if(typeof responseBody.name === "undefined" && typeof responseBody[image] === "undefined"  && typeof responseBody.url === "undefined")
        if(responseBody.name == null || responseBody[image] == null || responseBody.url == null)
         logInfo("----------------------------- No data available for recommendation with code "+reco.@code+"--------------------------------");
      
      else {
      
         name = responseBody.name.toString();
//logInfo("name :"+name);
      
//logInfo("imageUrl :"+extractRecoType(reco.@code.toString()))      
         if(extractRecoType(reco.@code.toString()) == 'recipes') 
             imageUrl = responseBody.imageUrl.toString().split('://')[1];
                   
         else if (extractRecoType(reco.@code.toString()) == 'products') 
             imageUrl = responseBody.packshotUrl.toString().split('://')[1];
//logInfo("imageUrl :"+imageUrl);
      
         destinationUrl = responseBody.url.toString().split('://')[1];
//logInfo("destinationUrl :"+destinationUrl);

      //var TBD = jsonBody.TBD.toString();
      
         recoObj[reco.@code.toString()] = {};
         recoObj[reco.@code.toString()]["name"] = name;
         recoObj[reco.@code.toString()]["imageUrl"] = imageUrl;
         recoObj[reco.@code.toString()]["destinationUrl"] = destinationUrl; 
      //recoObj[product.@code.toString()][TBD] = TBD; 
//logInfo("End Code: "+reco.@code);      
      }
  }
  
//logInfo(JSON.stringify(recoObj));

  return recoObj

}


//Function to create all the needed recommendations (products and recipes) based on the result of a workflow calculation, in a temporary table. So far used by the workflow "2 - Create or Update Recommended Offers" (ufsDataCreatUpdateRecommendedOffers)
//INPUT: the name of the temporary table before the activity calling this script. 
//OUTPUT: "OK" as a string, an error is raised otherwise
function processTempRecommendations(eventActivity){
  
  var tempTable = "temp:"+eventActivity;
  
  logInfo("tempTable :"+tempTable);
  
  var categoryDefObject = JSON.parse(getOption("offerCategoriesDefinitionObject"));
  var offerWeightsObject = JSON.parse(getOption("recommendedOffersWeightsDefinitionObject"));
  var ctxSpace = [getOption( "ufsOfferContextSpaceId" ),getOption( "ufsEmailOfferSpaceId" ),getOption( "ufsOutboundOfferSpaceId" ),getOption( "ufsEcommerce3ColumnsOfferSpaceId" )];
  
  var mcoCode = getMcoCode(tempTable);
  //split_part() is not enabled in DEV, therefore mcoCode is hardcoded for testing purpose
  //var mcoCode = "DACH";
  var countryCode = getCountryCode(tempTable);
  //split_part() is not enabled in DEV, therefore countryCode is hardcoded for testing purpose
  //var countryCode = "CH";
  
  //Create JSON data recommendation object, with all required recommendation content data retrieved consuming SIFU api (products and recipes end point)
  var recommendationObject = getRecommendationContent(tempTable);
  
  //Collect all data in the specified temporary schema
  var csvData = collectData(tempTable);
  
  var element = tempTable.split(':')[1]
  
  //Loop all recommendations
  for each (recommendation in csvData[element]){
    
    var recoCode = recommendation.@code.toString(); 
    
    if (recommendationObject.hasOwnProperty(recoCode)) {  
   
         var recoCategory = recommendation.@category.toString();
         var offerId;
         var mco = extractRecoMcoCode(recoCode);
         var country = extractRecoCountryCode(recoCode);
         var language = extractRecoLanguageCode(recoCode);
         var recoCategoryName = "categoryRootRcp"+mco+"_"+country+"_"+categoryDefObject[recoCategory].toString();
         var louId = getLouId(country);
     
      //Collect all required content data from the previously created data recommendation JSON object, based on the recommendation code currently processed   
         var destinationUrl = recommendationObject[recoCode]["destinationUrl"];
         var imageUrl = recommendationObject[recoCode]["imageUrl"];
         var name = recommendationObject[recoCode]["name"];
  
      //Generate offer content JSON  object   
         var offerContent = {"title":name, "imageUrl":imageUrl, "destinationUrl":destinationUrl};
  
      //Check whether an offer with specific recommendation code exists either in a category or in its bin folder      
         if (getOfferId(recoCode, recoCategoryName) != 0 || getOfferId(recoCode, recoCategoryName+"_bin") != 0 ) {
  
      //If offer exists in the bin folder, move it to it parent category folder       
             if (getOfferId(recoCode, recoCategoryName+"_bin") != 0) {
             
                 offerId = getOfferId(recoCode, recoCategoryName+"_bin");
                 moveOffer(offerId, recoCategoryName);
             
             } else if (getOfferId(recoCode, recoCategoryName) != 0) offerId = getOfferId(recoCode, recoCategoryName);
         
      //Update content
             updateOffer(offerId, ctxSpace[0], offerContent);
  
      //If recommendation code to process doesn't exist then create new offer content        
         } else if (getOfferId(recoCode, recoCategoryName) == 0 && getOfferId(recoCode, recoCategoryName+"_bin") == 0 ) {
         
           var recoCategoryId = getCategoryId(recoCategoryName);
            
           if (countLanguage(country) > 1) {
            
           var language = language+"-"+country;      
           createRecommendedOffer(recoCategoryId, categoryDefObject[recoCategory], recoCategory, recoCode, ctxSpace[0], louId, language.toLowerCase(), "recommended", offerWeightsObject, offerContent);
       
         } else createRecommendedOffer(recoCategoryId, categoryDefObject[recoCategory], recoCategory, recoCode, ctxSpace[0], louId, "not_apply", "recommended", offerWeightsObject, offerContent);
       
       } else logError("-------------An offer with label "+recoCode+" exists both in the "+recoCategory+" category and its bin folder---------------");
    }
  }
  
  var distinctCategories = getDistinctCategories(tempTable);
  
  var distinctRecoCodes = getDistinctRecoCodes(tempTable);
  var listOffersToKeep = generateStringListRecoCodes(distinctRecoCodes);
  
  for each (c in distinctCategories) {
     
     var categoryName = "categoryRootRcp"+mcoCode.toUpperCase()+"_"+countryCode.toUpperCase()+"_"+categoryDefObject[c.@category.toString()];
     var binCategoryName = categoryName + "_bin";
  
  //Calculate offer to be disabled (Default offers excluded)  
     var offersToDisable = getOffersToDisable(categoryName, listOffersToKeep);
  
  //Move offers to be disabled in bin folder   
     moveRecoOffers(offersToDisable, binCategoryName);
  
  //Disable all offers previously moved in bin folder   
     disableOffers(offersToDisable, ctxSpace);   
  }
}