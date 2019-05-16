<% response.setContentType("text/html;charset=utf-8"); %>
<%@ page import="xtk:server/jsspcontext.js"%>
<%@ page import="xtk:shared/nl.js"%>
<%@ page import="xtk:shared/xtk.js" %>
<%
    var context = logonEscalation("admin");

    var results = {"MCOs":[], "umbrellas":[], "countries":[], "all":[]};

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
    var query = xtk.queryDef.create(
        <queryDef schema="nms:localOrgUnit" operation="select">
          <select>
            <node expr="[@label]" alias="@label" />
            <node expr="[@abbreviation]" alias="@countryCode" />
          </select>
          <orderBy displayOrder="Label (ascending)">
             <node expr="[@label]" label="label" sort="1" sortAsc="1"/>
            </orderBy>
          <where>
          <condition expr={"[@id]> 0 AND [@nature]= 'Country'"}/>
          </where>
         </queryDef>
       )

var  countries = query.ExecuteQuery();

for each (var country in countries){
          results.countries.push({"marketLabel" :country.@label.toString(),
          "marketCountryCode" :country.@countryCode.toString()
        });
}




    document.write(JSON.stringify(results));
    console.log(JSON.stringify(results))
%><% logonWithContext(context);%>