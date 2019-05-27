logInfo("Email: "+vars.email);
logInfo("OfferID: "+vars.offerId);
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
  vars.category = 1;
}else if(sCatIntName.indexOf("_ws") != -1 || sCatIntName.indexOf("_dps") != -1 || sCatIntName.indexOf("_dpr") != -1 || sCatIntName.indexOf("_ret") != -1 || sCatIntName.indexOf("_arc") != -1 || sCatIntName.indexOf("_ups") != -1){
  vars.category = 2;
}else if(sCatIntName.indexOf("_ha") != -1 || sCatIntName.indexOf("_sa") != -1 || sCatIntName.indexOf("_ce_com") != -1 || sCatIntName.indexOf("_cr") != -1){
  vars.category = 3;
}else if(sCatIntName.indexOf("_ce_event") != -1){
  vars.category = 4;
}

logInfo("category: "+vars.category);