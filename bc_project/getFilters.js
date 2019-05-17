<% response.setContentType("text/html;charset=utf-8"); %>
<%@ page import="xtk:server/jsspcontext.js"%>
<%@ page import="xtk:shared/nl.js"%>
<%@ page import="xtk:shared/xtk.js" %>
<%
    var context = logonEscalation("admin");

    var results = {"MCOs":[], "umbrellas":[], "countries":[]};

//----------------------------------------MCOs QUERY ----------------------------------------------
var query = xtk.queryDef.create(
    <queryDef schema="nms:localOrgUnit" operation="select">
      <select>
        <node expr="[@label]" alias="@label" />
        <node expr="[@abbreviation]" alias="@MCOCode" />
      </select>
      <orderBy displayOrder="Label (ascending)">
         <node expr="[@label]" label="label" sort="1" sortAsc="1"/>
        </orderBy>
      <where>
      <condition expr={"[@id]> 0 AND [@nature]= 'MCO'"}/>
      </where>
     </queryDef>
   )

var  MCOs = query.ExecuteQuery();

for each (var MCO in MCOs){
      results.MCOs.push({"marketLabel" :MCO.@label.toString(),
      "marketCountryCode" :MCO.@MCOCode.toString()
    });
}

//----------------------------------------Umbrellas QUERY ----------------------------------------------
var query = xtk.queryDef.create(
    <queryDef schema="nms:localOrgUnit" operation="select">
      <select>
        <node expr="[@label]" alias="@label" />
        <node expr="[@abbreviation]" alias="@umbrellaCode" />
      </select>
      <orderBy displayOrder="Label (ascending)">
         <node expr="[@label]" label="label" sort="1" sortAsc="1"/>
        </orderBy>
      <where>
      <condition expr={"[@id]> 0 AND [@nature]= 'Umbrella'"}/>
      </where>
     </queryDef>
   )

var  umbrellas = query.ExecuteQuery();

for each (var umbrella in umbrellas){
      results.umbrellas.push({"marketLabel" :umbrella.@label.toString(),
      "marketCountryCode" :umbrella.@umbrellaCode.toString()
    });
}


//----------------------------------------COUNTRIES QUERY ----------------------------------------------
    var query3 = xtk.queryDef.create(
        <queryDef schema="nms:localOrgUnit" operation="select">
          <select>
            <node expr="[@label]" alias="@label" />
            <node expr="[@id]" alias="@id" />
            <node expr="[@abbreviation]" alias="@countryCode" />
            <node expr="[parent/@nature]" alias="@natureOne" />
            <node expr="[parent/@abbreviation]" alias="@abbreviationOne" />
            <node expr="[parent/parent/@nature]" alias="@natureTwo" />
            <node expr="[parent/parent/@abbreviation]" alias="@abbreviationTwo" />
          </select>
          <orderBy displayOrder="Label (ascending)">
             <node expr="[@label]" label="label" sort="1" sortAsc="1"/>
            </orderBy>
          <where>
          <condition expr={"[@id]> 0 AND [@nature]= 'Country'"}/>
          </where>
         </queryDef>
       )

var  countries = query3.ExecuteQuery();

for each (var country in countries){
          if(country.@natureOne.toString() == "MCO"){
            results.countries.push({
              "marketLabel" :country.@label.toString(),
              "marketCountryCode" :country.@abbreviationOne.toString()+"_"+country.@countryCode.toString()
            });
          }else{
            results.countries.push({
              "marketLabel" :country.@label.toString(),
              "marketCountryCode" :country.@abbreviationTwo.toString()+"_"+country.@countryCode.toString()
            });
          } 
}




    document.write(JSON.stringify(results));
    console.log(JSON.stringify(results))
%><% logonWithContext(context);%>