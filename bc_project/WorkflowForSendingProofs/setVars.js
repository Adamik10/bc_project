logInfo("Email: "+vars.email);
logInfo("OfferLabel: "+vars.offerLabel);
logInfo("CategoryInternalName: "+vars.categoryInternalName);

// 0 - incorrectly passed cat internal name - send notification?
// 1 - displayed in main 2 col block (recipe recommendation, recipe recommendation v02, recipe recommendation v03)
// 2 - displayed in ecommerce 3 cols block (all product categories)
// 3 - displayed in main 1 col block (hero articles, secondary articles, competition, chef rewards)
// 4 - displayed in event locator block (events)

var sCatIntName = vars.categoryInternalName.toString().toLowerCase();

vars.category = 0;

//get the category
if(sCatIntName.indexOf("_rcr") != -1 || sCatIntName.indexOf("_rcrv02") != -1 || sCatIntName.indexOf("_rcrv03") != -1){
//recipe
  vars.category = 1;
}else if(sCatIntName.indexOf("_ws") != -1 || sCatIntName.indexOf("_dps") != -1 || sCatIntName.indexOf("_dpr") != -1 || sCatIntName.indexOf("_ret") != -1 || sCatIntName.indexOf("_arc") != -1 || sCatIntName.indexOf("_ups") != -1){
//product
  vars.category = 2;
}else if(sCatIntName.indexOf("_ha") != -1){
// ha
  vars.category = 3;
}else if(sCatIntName.indexOf("_sa") != -1){
// sa
  vars.category = 4;
}else if(sCatIntName.indexOf("_ce_com") != -1){
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

vars.languageCode = 'FR';
logInfo( vars.languageCode );