logInfo("Email: "+vars.email);
logInfo("OfferLabel: "+vars.offerLabel);
logInfo("CategoryInternalName: "+vars.categoryInternalName);

// 0 - incorrectly passed cat internal name - send notification?
// 1 - displayed in main 2 col block (recipe recommendation, recipe recommendation v02, recipe recommendation v03)
// 2 - displayed in ecommerce 3 cols block (all product categories)
// 3 - displayed in main 1 col block (hero articles, secondary articles, competition, chef rewards)
// 4 - displayed in event locator block (events)

var sCatIntName = vars.categoryInternalName.toString();
var sCleanCatIntName = sCatIntName.replace("categoryRootRcp",'');
var aCatIntName = sCleanCatIntName.split("_");
var sMCO = aCatIntName[0];
var sCountry = aCatIntName[1];
var sCategory = aCatIntName[2];
var sSubCategory = aCatIntName[3];
if(sSubCategory == "proAct" || sSubCategory == "inspr" || sSubCategory == "com" || sSubCategory == "event" || sSubCategory == "crM" || sSubCategory == "crNonM"){
vars.SubCategory = sSubCategory;
}
vars.aCatIntName = aCatIntName;
vars.MCO = sMCO;
vars.Country = sCountry;
vars.Category = sCategory;

vars.category = 0;

//get the category
if(sCategory == "rcr" || sCategory == "rcrv02" || sCategory == "rcrv03"){
//recipe
  vars.category = 1;
}else if(sCategory == "ws" || sCategory == "dps" || sCategory == "dpr" || sCategory == "ret" || sCategory == "arc" || sCategory == "ups"){
//product
  vars.category = 2;
}else if(sCategory == "ha"){
// ha
  vars.category = 3;
}else if(sCategory == "sa"){
// sa
  vars.category = 4;
}else if(sCategory == "ce"){
//comp
  vars.category = 5;
}


//get the country from category
if(sCatIntName.indexOf("dach_de") != -1){
//germany
var param = "<variables category='" + vars.category + "' sCatInternalName='"+vars.sCatIntName+"' offerLabel='"+vars.offerLabel+"'/>";
xtk.workflow.PostEvent("TestOfferDashboardSendProofGermany","signal","",param,false);

}else if(sCatIntName.indexOf("es_es") != -1){
//spain
var param = "<variables category='" + vars.category + "' sCatInternalName='"+vars.sCatIntName+"' offerLabel='"+vars.offerLabel+"'/>";
xtk.workflow.PostEvent("TestOfferDashboardSendProofSpain","signal","",param,false);
}else{
logInfo("THE OFFER NEEDS TO BE GERMAN OR SPANISH TO BE ABLE TO SEND A PROOF")
}

logInfo("category: "+vars.category);
logInfo("clean category: "+vars.aCatIntName);
logInfo("MCO: "+vars.MCO);
logInfo("country: "+vars.Country);
logInfo("Category: "+vars.Category);
logInfo("category: "+vars.category);
logInfo("sub category: "+vars.SubCategory);

vars.languageCode = 'FR';
logInfo( vars.languageCode );