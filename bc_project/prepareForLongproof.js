// Postpone evaluation to personalization
var jsstart = '<' + '%';
var jsend = '%' + '>';
// Shorthand version
var jss = jsstart;
var jse = jsend;

function commonLibrary_sendDelivery( vDeliveryName, vPersonID ){

    try{
      var cond1 = "@id = "+vPersonID;
      
      var notifId = nms.delivery.SubmitNotification(
        vDeliveryName,
        <delivery>
          <targets>
            <deliveryTarget>
              <targetPart type='query' exclusion='false' ignoreDeleteStatus='false'>
                <where>
                  <condition expr={cond1}/>
                </where>
              </targetPart>
           </deliveryTarget>
          </targets>
        </delivery>
      );
     
    }
    catch (e){
      logInfo( 'Delivery send out error : ' + e );
      return e;
    }
    
 return 'Delivery send successful';
}


/** Postpone evaluation of a string of javascript code to the personalization step */
function personalization(input) {
  return jsstart + input + jsend;
}

/** Postpone evaluation of a string of javascript code to the long proof step */
function prepareForLongProof(propositionStr,index,htmlSource) {
  //return '@ include proposition="targetData.'+propositionStr+index+'" view="offer/view/'+htmlSource+'"';
  var longstr = '';
  for(var i=1;i<=index;i++) {
    if(i == 1) {
      longstr = longstr
      + '<% if (offerindex == '+i+'){ %>'   
      + 'Offer Label : '
      +'<%@ include proposition="targetData.'+propositionStr+i+'" view="offer/@label"%>'
      +'<br>Subject Line 1: '
      +'<xmp><%@ include proposition="targetData.'+propositionStr+i+'" view="offer/view/emailSubject1"%></xmp>'
      +'<br>Subject Line 2: '
      +'<xmp><%@ include proposition="targetData.'+propositionStr+i+'" view="offer/view/emailSubject2"%></xmp>'
      +'<br>Pre Header : '
      +'<%@ include proposition="targetData.'+propositionStr+i+'" view="offer/view/preHeader"%>'
      +'<%@ include proposition="targetData.'+propositionStr+i+'" view="offer/view/'+htmlSource+'"%>'
      + '<% } %>';
    }
    else {
      longstr = longstr
      + '<% else if (offerindex == '+i+'){ %>'   
      + 'Offer Label : '
      +'<%@ include proposition="targetData.'+propositionStr+i+'" view="offer/@label"%>'
      +'<br>Subject Line 1: '
      +'<xmp><%@ include proposition="targetData.'+propositionStr+i+'" view="offer/view/emailSubject1"%></xmp>'
      +'<br>Subject Line 2: '
      +'<xmp><%@ include proposition="targetData.'+propositionStr+i+'" view="offer/view/emailSubject2"%></xmp>'
      +'<br>Pre Header : '
      +'<%@ include proposition="targetData.'+propositionStr+i+'" view="offer/view/preHeader"%>'
      +'<%@ include proposition="targetData.'+propositionStr+i+'" view="offer/view/'+htmlSource+'"%>'
      + '<% } %>';
    }
  }
  return longstr+'<% if(offerindex < '+index+'){ offerindex = offerindex +1;}else{break;} %>';
}

//Select and return the value of field by parameter;
//Return array of the data
function getFieldByTableAndField( vTable, vField, vCondition ){
  var res = [];
  
  try {
    var cnx = application.getConnection();
    var sqlStr = 'select ' + vField + ' from ' + vTable + ' where ' + vCondition;
    var stmt = cnx.query( sqlStr );
    for each(var row in stmt){
      for (var i=0;i<row.length;i++){
        res.push( row[i] );
      }
    }
    cnx.dispose();
  }
  catch (e) {
    cnx.dispose();
    return e;  
  }
  
  return res;
}

//Select and return the value of field by parameter;
//Return array of the data
function commonLibrary_getFieldByTableAndField_sqlSelect( vTable, vField, vCondition, vOverrideFields ){
  var res = [];
  
  try {
    var sqlStr = 'select ' + vField + ' from ' + vTable + ' where ' + vCondition;
    if ( typeof vOverrideFields != 'undefined' && vOverrideFields != '' ){ 
      var fieldArray = vOverrideFields.split(",");
    } else {
      var fieldArray = vField.split(","); //vField.replace( ",", ":String, " ) + ":String";
    }
    var convertedField = '';
    for (var i=0;i<fieldArray.length;i++){
      if ( fieldArray[i].indexOf(":") > -1 ){
        var alias = fieldArray[i].substring( fieldArray[i].indexOf(":") + 1, 255 );
        convertedField += '@'+alias;
        logInfo( "fieldArray[i] : " + fieldArray[i] + " / alias : " + alias );
      } else {
        convertedField += '@'+fieldArray[i].trim()+":String,";
      }
          
    }

    convertedField = convertedField.substring( 0,convertedField.length-1 );
    
    var stmt = sqlSelect( "row, " + convertedField, sqlStr);
    for each( var vXMLElement in stmt.row ){
      var attrObject = {};
      for each( var vAttributes in vXMLElement.attributes() ){
        //attrObject[vAttributes.name().toString()] = vAttributes.toString();
        attrObject[vAttributes.name().toString().replace('.','_')] = vAttributes.toString();
      }
      res.push( attrObject );
    }
    
  }
  catch (e) {
    return e;  
  }
  
  return res;
}

//Select and return the value of field by parameter, with Neolane queryDef method
//Return array of the data
function commonLibrary_getFieldByTableAndField_queryDef( vSchema, vFields, vCondition, vOrderBy, vLineCount ){
  var res = [];
  var lineCount = 2000;
  var selectXMLnode = <select/>;
  var fieldArray = vFields.split(',');
  var elements = [];
  for (var i=0;i<fieldArray.length;i++){
    var nodeXML = <node expr={fieldArray[i].trim()}/>;
    selectXMLnode.appendChild( nodeXML );
    if ( ( fieldArray[i].trim().indexOf( '/' ) > -1 ) && ( elements.indexOf( fieldArray[i].trim().substring( 1, fieldArray[i].trim().indexOf( '/' ) ) ) == -1 ) ){
      elements.push( fieldArray[i].trim().substring( 1, fieldArray[i].trim().indexOf( '/' ) ) );
    }
  }
  
  var conditionXMLnode = <where/>;
  var conditionArray = vCondition.split(',');
  for (var i=0;i<conditionArray.length;i++){
    var nodeXML = <condition expr={conditionArray[i].trim()}/>;
    conditionXMLnode.appendChild( nodeXML );
  }
  
  
  try {
    if ( typeof vOrderBy != 'undefined' && vOrderBy.trim() != '' ){
      var orderByXML = <orderBy/>;
      var orderArray = vOrderBy.split(',');
      for (var i=0;i<orderArray.length;i++){
        var sortDesc = 0;
        if ( fieldArray[i].indexOf(":") > -1 ) { sortDesc = fieldArray[i].substring( fieldArray[i].indexOf(":") + 1, 255 ) }
        var nodeXML = <node expr={fieldArray[i].trim()} sort="true" sortDesc={sortDesc}/>;
        selectXMLnode.appendChild( nodeXML );
      }
    }
    
    if ( typeof vLineCount != 'undefined' && vLineCount.trim() != '' ){
      lineCount = vLineCount;
    }
  
    xmlQuery = <queryDef schema={vSchema} operation="getIfExists" lineCount={lineCount}>
                 {orderByXML}
                 {selectXMLnode}
                 {conditionXMLnode}
               </queryDef>;
               
    
    var resXML = xtk.queryDef.create(xmlQuery).ExecuteQuery();
    if ( elements.length > 0 ){
      for ( var i=0; i<elements.length;i++ ){
        for each(var rowElement in resXML[elements[i]] ){
          for each(var rowAttr in rowElement.attributes() ){
            res.push( rowAttr.toString() );
          }
        }
      }
    } else {
      for each(var rowAttr in resXML.attributes() ){
        res.push( rowAttr.toString() );
      }
    }
  }
  catch (e) {
    return e;  
  }
  
  return res;
}

//Select and return the value of field by parameter, with Neolane queryDef method
//Return array of the data
function commonLibrary_queryDef( vSchema, vOperation, vFields, vCondition, vOrderBy, vLineCount ){
  var res = [];
  var lineCount = 2000;
  var selectXMLnode = <select/>;
  var fieldArray = vFields.split(';');
  var elements = [];
  for (var i=0;i<fieldArray.length;i++){
    if ( fieldArray[i].indexOf(":") > -1 ){
      var alias = fieldArray[i].substring( fieldArray[i].indexOf(":") + 1, 255 );
      var nodeXML = <node alias={alias} expr={fieldArray[i].substring( 1, fieldArray[i].indexOf(":")).trim()}/>;
    } else {
      var nodeXML = <node expr={fieldArray[i].trim()}/>;
    }
    selectXMLnode.appendChild( nodeXML );
    if ( ( fieldArray[i].trim().indexOf( '/' ) > -1 ) && ( elements.indexOf( fieldArray[i].trim().substring( 1, fieldArray[i].trim().indexOf( '/' ) ) ) == -1 ) ){
      elements.push( fieldArray[i].trim().substring( 1, fieldArray[i].trim().indexOf( '/' ) ) );
    }
  }
  
  var conditionXMLnode = <where/>;
  var conditionArray = vCondition.split(';');
  for (var i=0;i<conditionArray.length;i++){
    if ( i == 0 ){
      var nodeXML = <condition expr={conditionArray[i].trim()}/>;
    } else {
      var nodeXML = <condition boolOperator="AND" expr={conditionArray[i].trim()}/>;
    }
    
    conditionXMLnode.appendChild( nodeXML );
  }
  
  
  try {
    if ( typeof vOrderBy != 'undefined' && vOrderBy.trim() != '' ){
      var orderByXML = <orderBy/>;
      var orderArray = vOrderBy.split(';');
      for (var i=0;i<orderArray.length;i++){
        var sortDesc = 0;
        if ( orderArray[i].indexOf(":") > -1 ){
          sortDesc = orderArray[i].substring( orderArray[i].indexOf(":") + 1, 255 );
          var expr = (orderArray[i].substring( 0, orderArray[i].indexOf(":") ) );
          var nodeXML = <node expr={expr} sort="1" sortDesc={sortDesc}/>;
        } else {
          var nodeXML = <node expr={orderArray[i].trim()} sort="1" sortDesc={sortDesc}/>;
        }
        orderByXML.appendChild( nodeXML );
      }
    }
    
    if ( typeof vLineCount != 'undefined' && vLineCount.trim() != '' ){
      lineCount = vLineCount;
    }
  
    xmlQuery = <queryDef schema={vSchema} operation={vOperation} lineCount={lineCount}>
                 {orderByXML}
                 {selectXMLnode}
                 {conditionXMLnode}
               </queryDef>;
    //logInfo( "xmlQuery : " + xmlQuery.toXMLString() );
    
    var resXML = xtk.queryDef.create(xmlQuery).ExecuteQuery();
  }
  catch (e) {
    logInfo( "Error on commonLibrary_queryDef : " + e );
    return e;
  }

  return resXML;
}

//Return content as XML
function commonLibrary_getContentXML( contentID ){
  var res;
  
  try {
    var cond = '@id = ' + contentID
    xmlQuery = <queryDef schema="ncm:content" operation="getIfExists">
                 <select>
                   <node expr="data"/>
                   <node expr="@name"/>
                 </select>
                 <where>
                   <condition expr={cond}/>
                 </where>
               </queryDef>;
               
    res = xtk.queryDef.create(xmlQuery).ExecuteQuery();
  }
  catch (e) {
    return e;  
  }
  
  return res;
}

//Return content as XML
function commonLibrary_getContentXML_select( contentID ){
  var res;
  
  try {
    var cond = '@id = ' + contentID;
    xmlQuery = <queryDef schema="ncm:content" operation="select">
                 <select>
                   <node expr="data"/>
                 </select>
                 <where>
                   <condition expr={cond}/>
                 </where>
               </queryDef>;

    res = xtk.queryDef.create(xmlQuery).ExecuteQuery();
    var res = new XML( res );
  }
  catch (e) {
    return e;  
  }
  
  return res;
}

//Return content as XML
function commonLibrary_getContentModel( contentID ){
  var res;
  
  try {
    var cond = '@id = ' + contentID
    xmlQuery = <queryDef schema="ncm:content" operation="getIfExists">
                 <select>
                   <node analyze="false" alias="jsName" expr="[publishing/model/renderer/javascript/@javascript-name]"/>
                   <node analyze="false" alias="publishName" expr="[publishing/@name]"/>
                 </select>
                 <where>
                   <condition expr={cond}/>
                 </where>
               </queryDef>;
               
    var resXML = xtk.queryDef.create(xmlQuery).ExecuteQuery();
    var res = ( resXML.jsName.toString() != '' ? resXML.jsName.toString() : resXML.publishName.toString() );
  }
  catch (e) {
    return e;  
  }
  
  return res;
}

/** set proof email addresses */
var setProofFor = function(delivery_id, emails) {

  var delivery = nms.delivery.load(delivery_id);
  
  delivery.fcpParameters["fcpMode"] = "substituteAddress";
  delivery.fcpParameters.substitution.removeAll();
  
  emails = emails.split(',');
  
  for (var i = 0; i < emails.length; i++) {
    var email = emails[i].replace(/(^\s+|\s+$)/g, '');
    if (email != '')
      delivery.fcpParameters.substitution.add(<substitution id={i} address={email}><profile><rcp cs="Random"/></profile></substitution>);
  }
  
  delivery.save();
};

function parseConditionInput(input) {
  if (isNumber(input)) {
    // If primary key condition is simple
    var cond = "@id = '" + input + "'";
  } else {
    // Otherwise parse input
    var namespace = "";
    var template = "";
    input = input.split(':');
    if (input.length == 1) {
      template = input[0];
    } else {
      namespace = input[0];
      for (var i=1;i<input.length;i++) {
        template += input[i];
      }
    }
    // Build query
    var cond = "@name = '" + template + "'";
    if (namespace !== "") {
      cond += " AND @namespace = '" + namespace + "'";
    }
  }
  return cond;
}

/** Load JavaScript templates as a string. Input can be with or without namespace.  */
loadTemplate = function(input) {

  var cond = parseConditionInput(input);

  // Execute query
  var query = xtk.queryDef.create(
    <queryDef schema="xtk:jst" operation="select">
      <select>
        <node expr="code" />
      </select>
      <where>
        <condition expr={cond} />
      </where>  
    </queryDef>
  );
  var res = query.ExecuteQuery();
  
  return res.jst.code.toString();
}

/** Load JavaScript code as a string. Input can be with or without namespace.  */
loadJavascript = function(input) {

  var cond = parseConditionInput(input);

  // Execute query
  var query = xtk.queryDef.create(
    <queryDef schema="xtk:javascript" operation="select">
      <select>
        <node expr="data" />
      </select>
      <where>
        <condition expr={cond} />
      </where>  
    </queryDef>
  );
  var res = query.ExecuteQuery();
  
  return jsstart + "\n" + res.javascript.data.toString() + "\n" + jsend;
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function getContentXML(schema, name) {
  var where = "@name = '" + name + "'";
  var query = xtk.queryDef.create(
    <queryDef schema={schema} operation="select">
        <select>
          <node expr="data"/>
        </select>
        <where>
          <condition expr={where} />
        </where>  
      </queryDef>
    );
  return query.ExecuteQuery();
}

function getShortDate(sendDate, country) {
  if ( sendDate != null && typeof sendDate != 'undefined' ){
    if (country) country = country.toLowerCase();

    D = sendDate.getDate();
    var DD = D;
    if (D < 10) { 
      DD = '0' + D;
    }
    var M = sendDate.getMonth() + 1;
    var MM = M;
    if (M < 10) { 
      MM = '0' + M;
    }
    var YYYY = sendDate.getFullYear();
    
    var localDate;
    if (country == "us") {
      localDate = MM + '.' + DD + '.' + YYYY;
    } else {
      localDate = DD + '.' + MM + '.' + YYYY;
    }
    
    return localDate;
  } else {
    return '';
  }
  
}

/**
 * Returns the first day of the passed month. Returns the first day of the
 * current month if nothing is passed. If a date is passed, the month and
 * year of that date is used.
 */
function firstDayOfMonth(input) {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  if (typeof input !== 'undefined') {
    if (typeof input === 'object') {
      year = input.getFullYear();
      month = input.getMonth();
    } else {
      month = input;
    }
  }
  return new Date(year, month, 1);
}

/**
 * Returns the last day of the passed month. Returns the last day of the
 * current month if nothing is passed. If a date is passed, the month and
 * year of that date is used.
 */
function lastDayOfMonth(input) {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  if (typeof input !== 'undefined') {
    if (typeof input === 'object') {
      year = input.getFullYear();
      month = input.getMonth();
    } else {
      month = input;
    }
  }
  return new Date(year, month + 1, 0);
}

function firstDayOfNextMonth(date) {
  if (typeof date === 'undefined') {
    date = new Date();
  }
  if (date.getMonth() == 11) {
    var current = new Date(date.getFullYear() + 1, 0, 1);
  } else {
    var current = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  }
  return current;
}

/*
Borrowed from http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
*/
function lpad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getLanguage(langLabel){

var idCond1 = "[@label]='"+ langLabel + "' ";
var idCond2 = "[enum/@name]='"+ enumInternalname + "' ";

var query = xtk.queryDef.create(
    <queryDef schema="xtk:enumValue" operation="getIfExists">
        <select>
          <node expr="@name"/>
        </select>
        <where>
           <condition expr={idCond1}/> 
           <condition expr={idCond2}/> 
        </where>  
      </queryDef>
    );
  return query.ExecuteQuery().@name;
}

//New function to pad zeros
function padZerosToEbNumber(number, digits) {
    return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

//Collect all deliveryID from a workflow and update delivery content.
function collectDelvieryIdFromWorflowAndRefreshDelivery( workflowId ){

  try{
    var cond = "[@id] = " + workflowId;
    var queryWrkf = xtk.queryDef.create(
      <queryDef schema="xtk:workflow" operation="select">
        <select>
          <node alias="XMLContent" expr="[data]"/>
        </select>
        <where>
          <condition expr={cond}/>
        </where>
      </queryDef>
    );
    
    var resWrkf = queryWrkf.ExecuteQuery();
    //Search for delivery inside that workflow
    for each (var workflowXMLContent in resWrkf.workflow.activities.deliveryRecurring){
      if ( typeof workflowXMLContent.@["delivery-id"] != 'undefined' && workflowXMLContent.@["delivery-id"].toString() != '' ){
        refreshDeliveryContent( parseInt( workflowXMLContent.@["delivery-id"].toString() ) );
      }
    }
    
  }
  catch(e){
    return -1;
  }
  
  return 0;
}

function refreshDeliveryContentByFolderId( vFolderId ){
  try{
    var deliveryListXML = commonLibrary_queryDef( "nms:delivery", "select", "[@id]", "[folder/@id] = " + vFolderId, "@lastModified" );
    for each ( var deliveryList in deliveryListXML.delivery ){
      var vDeliveryId = deliveryList.@id;
      if ( typeof vDeliveryId != 'undefined' && vDeliveryId.toString != '' ){
        var res = refreshDeliveryContent( parseInt( vDeliveryId.toString() ) );
      }
    }
  }
  catch(e){
    return -1;
  }
  
  return 0;
} 


function getHeader(vCountry, vLanguage,vHeaderType)
{

  var query = xtk.queryDef.create(
                      <queryDef schema="wun:Common_Header" operation="select">
                        <select>
                          <node expr="data"/>
                          <node expr="@id"/>
                        </select>
                        <where>
                          <condition expr="@xtkschema = 'wun:Common_Header'"/>
                        </where>
                      </queryDef>)
                      
  var result = query.ExecuteQuery();
  
  var contentToDisplay =[];
  var i = 0;
  

  for each (var content in result.Common_Header){

    if ( content.elmGeneral.@["country-id"].toString() == vCountry && content.elmGeneral.@["language-id"].toString() == vLanguage &&  content.elmGeneral.@["headerFooterType-id"].toString() == vHeaderType){
    


  for each (var header in content.elmHeader){
  
        var tabContent = [content.@["id"].toString(), header.@["headerType"].toString(), content.elmGeneral.@["country-id"].toString(), content.elmGeneral.@["language-id"].toString() ]

        contentToDisplay.push(tabContent);
         }
    } 
  }
  
  return contentToDisplay.sort(sortFunction);

}


function getFooter(vCountry, vLanguage, vFooterType)
{

  var query = xtk.queryDef.create(
                      <queryDef schema="wun:Common_Footer" operation="select">
                        <select>
                          <node expr="data"/>
                          <node expr="@id"/>
                        </select>
                        <where>
                          <condition expr="@xtkschema = 'wun:Common_Footer'"/>
                        </where>
                      </queryDef>)
                      
  var result = query.ExecuteQuery();
  
  var contentToDisplay =[];
  var i = 0;
  
  for each (var content in result.Common_Footer){

    if ( content.elmGeneral.@["country-id"].toString() == vCountry && content.elmGeneral.@["language-id"].toString() == vLanguage &&  content.elmGeneral.@["headerFooterType-id"].toString() == vFooterType){
    


  for each (var footer in content.elmFooter){

        var tabContent = [content.@["id"].toString(), footer.@["footerType"].toString(), content.elmGeneral.@["country-id"].toString(), content.elmGeneral.@["language-id"].toString() ]

        contentToDisplay.push(tabContent);
         }
    } 
  }
  
  return contentToDisplay.sort(sortFunction);

}

function sortFunction(a, b) {
    if (a[4] === b[4]) {
        return 0;
    }
    else {
        return (a[4] < b[4]) ? -1 : 1;
    }
}