/////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////RENDERING FUNCTIONS////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

function get2MainColumnHTML()
{   




var html = "<%";
html+="var utmSource='ACM_UFS';\n";
html+="var utmTermImg='UFS';\n";
html+="var utmTermLink='UFS';\n";
html+="var labelImg='B_2MainDynamicOffers_' + proposition.offer.label + 'IMG';\n";
html+="var labelLink='B_2MainDynamicOffers_' + proposition.offer.label + 'Link';\n";
html+="var utmContentImg= labelImg;\n";
html+="var utmContentLink= labelLink;\n";
html+="var textDir= \"ltr\";\n";
html+="var alignment= \"left\"\n";
html+="if(delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!=null && delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!=undefined && delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!='')\n";
html+="utmSource = delivery.content.content.Common_template_v1.elmGeneral.@['utmSource'];\n";
html+="if(proposition.offer.view.uTMTerm_jst!=null && proposition.offer.view.uTMTerm_jst!=undefined && proposition.offer.view.uTMTerm_jst!='')\n";
html+="utmTermImg = proposition.offer.view.uTMTerm_jst;\n";
html+="if(proposition.offer.view.uTMTermImage_jst!=null && proposition.offer.view.uTMTermImage_jst!=undefined && proposition.offer.view.uTMTermImage_jst!='')\n";
html+="utmTermLink = proposition.offer.view.uTMTermImage_jst;\n";
html+="if(delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!=null && delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!=undefined && delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!='' && (delivery.content.content.Common_template_v1.elmGeneral.@['language-cs'] == 'he' || delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']== 'ar' || delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']== 'ur')){\n";
html+="textDir = \"rtl\";\n";
html+="alignment = \"right\";\n";
html+="}\n";
html+="var ART = escapeUrl(encryptDES('8574827493847364', recipient.partyId, 'CBC', '0000000000000000'));%>\n";
html+="<table class=\"force-row\" cellpadding=\"0\" cellspacing=\"0\" width=\"300\" align=\"left\" border=\"0\">\n";
html+="                                        <tbody><tr class=\"hide-mobile\">\n";
html+="                                            <td style=\"padding:0 10px 16px 10px;\" valign=\"top\" align=\"<%=alignment%>\">\n";
html+="                                                <a _urltype=\"11\" _label=\"<%= labelImg %>\" _category=\"OfferImage\" target=\"_blank\" style=\"text-decoration:none;\" href=\"https://<%= proposition.offer.view.trackedUrls.url_jst %>?utm_content=<%=utmContentImg%>&utm_medium=email&utm_source=<%=utmSource%>&ART=<%=ART%>&utm_campaign=<%= delivery.label %>&utm_term=<%=utmTermImg%>\"><img alt=\"ALT\" style=\"display:block;\"  src=\"https://<%= proposition.offer.view.imageUrl_jst %>\"  width=\"230\" border=\"0\"></a>\n";
html+="                                            </td>\n";
html+="                                        </tr>\n";
html+="                                        <!--[if !mso]><!-->\n";
html+="                                        <tr style=\"display:none; width:0; max-height:0; overflow:hidden; float:left;\" class=\"show-mobile-tr\">                                            <td class=\"show-mobile-td\" style=\"display:none; width:0; max-height:0; overflow:hidden; float:left; padding:0 0 16px 0;\" id=\"mobile-image-padding\" valign=\"top\" align=\"left\">                                                <a _urltype=\"11\" _label=\"<%= labelImg %>\" _category=\"OfferImage\" target=\"_blank\" style=\"text-decoration:none;\" href=\"https://<%= proposition.offer.view.trackedUrls.url_jst %>?utm_content=<%=utmContentImg%>&utm_medium=email&utm_source=<%=utmSource%>&ART=<%=ART%>&utm_campaign=<%= delivery.label %>&utm_term=<%=utmTermImg%>\"><img alt=\"ALT\" style=\"display:block;\" src=\"https://<%= proposition.offer.view.imageUrl_jst %>\" width=\"230\" border=\"0\"></a>                                            </td>                                        </tr>\n";
html+="                                         <!--<![endif]-->\n";           
html+="                                        <tr>\n";
html+="                                            <td style=\"padding:0 20px 0 20px\" class=\"mobile-padding\" valign=\"top\" dir=\"<%=textDir%>\" align=\"<%=alignment%>\">\n";
html+="                                                <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\n";
html+="                                                    <tbody><tr>\n";
html+="                                                      <td style=\"font-family:Verdana; mso-line-height-rule:exactly; line-height:17px; font-size:13px; color:#000000; padding:0 0 16px 0;height:40px;\" valign=\"top\" align=\"<%=alignment%>\">\n";
html+="<%= proposition.offer.view.shortContent_jst %>                                                        </td>\n";
html+="                                                    </tr>\n";
html+="                                                    <tr>\n";
html+="                                                        <td style=\"padding:0 0 0 0;\" align=\"<%=alignment%>\">\n";
html+="                                                            <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n";
html+="                                                                <tbody><tr>\n";
html+="                                                                    <th style=\"padding:6px 14px; -webkit-border-radius:4px; border-radius:4px; font-size:14px; font-family:Verdana; color:#ffffff; display:inline-block; border:1px solid #ff5a00;\" align=\"center\" bgcolor=\"#ff5a00\">\n";
html+="                                                                     <a _urltype=\"11\" href=\"https://<%= proposition.offer.view.trackedUrls.url_jst %>?utm_content=<%=utmContentLink%>&utm_medium=email&utm_source=<%=utmSource%>&ART=<%=ART%>&utm_campaign=<%= delivery.label %>&utm_term=<%=utmTermLink%>\" _label=\"<%= labelLink%>\" _category=\"OfferLink\" target=\"_blank\" style=\"font-size:14px; font-family:Verdana; text-decoration:none; font-weight:bold; mso-line-height-rule:exactly; line-height:14px; color:#ffffff;\">                                                                        <%= targetData.buttonTextRecipe %>\n";
html+="                                                                        </a>\n";
html+="                                                                    </th>\n";
html+="                                                                </tr>\n";
html+="                                                            </tbody></table>\n";
html+="                                                        </td>\n";
html+="                                                    </tr>\n";
html+="                                                </tbody></table>\n";
html+="                                            </td>\n";
html+="                                        </tr>\n";
html+="                                    </tbody></table>\n";                   

    return html;
}


function get2MainImageColumnHTML()
{ 

var html = "<%";
html+="var utmSource='ACM_UFS';\n";
html+="var utmTermImg='UFS';\n";
html+="var utmTermLink='UFS';\n";
html+="   var labelImg='B_2ColumnNLDynamicOffers_' + proposition.offer.label + 'IMG';\n";
html+="   var labelLink='B_2ColumnNLDynamicOffers_' + proposition.offer.label + 'Link';\n";
html+="   var utmContentImg= labelImg;\n";
html+="   var utmContentLink= labelLink;\n";
html+="   var textDir= \"ltr\";\n";
html+="   var alignment= \"left\"\n";
html+="   if(targetData.alignment === \"center\")\n";
html+="  alignment = \"center\";\n";
html+="  if(delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!=null && delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!=undefined && delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!='')\n";
html+="   utmSource = delivery.content.content.Common_template_v1.elmGeneral.@['utmSource'];\n";
html+="   if(proposition.offer.view.uTMTerm_jst!=null && proposition.offer.view.uTMTerm_jst!=undefined && proposition.offer.view.uTMTerm_jst!='')\n";
html+="   utmTermImg = proposition.offer.view.uTMTerm_jst;\n";
html+="   if(proposition.offer.view.uTMTermImage_jst!=null && proposition.offer.view.uTMTermImage_jst!=undefined && proposition.offer.view.uTMTermImage_jst!='')\n";
html+="   utmTermLink = proposition.offer.view.uTMTermImage_jst;\n";
html+="  if(delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!=null && delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!=undefined && delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!='' && (delivery.content.content.Common_template_v1.elmGeneral.@['language-cs'] == 'he' || delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']== 'ar' || delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']== 'ur')){\n";
html+="   textDir = \"rtl\";\n";
html+="   alignment = \"right\";\n";
html+="   }\n";
html+="   var ART = escapeUrl(encryptDES('8574827493847364', recipient.partyId, 'CBC', '0000000000000000'));\n";
html+="%>\n";
html+="<table class=\"force-row\" cellpadding=\"0\" cellspacing=\"0\" width=\"300\" align=\"left\" border=\"0\">\n"; 
html+="                                        <tbody>  <tr class=\"hide-mobile\">\n"; 
html+="     <td align=\"<%=alignment%>\" valign=\"top\" style=\"padding:0 10px 16px 10px;\">\n"; 
html+="         <a _urltype=\"11\" href=\"https://<%= proposition.offer.view.trackedUrls.url_jst %>?utm_content=<%= utmContentImg %>&utm_medium=email&utm_source=<%=utmSource%>&ART=<%=ART%>&utm_campaign=<%= delivery.label %>&utm_term=<%=utmTermImg%>\" _label=\"<%= labelImg %>\" _category=\"OfferImage\" target=\"_blank\" style=\"text-decoration:none;\"><img src=\"https://<%= proposition.offer.view.imageUrl_jst %>\" height=\"280\" width=\"280\" alt=\"<%= proposition.offer.view.imageAltText_jst %>\" border=\"0\" style=\"display:block;\"></a>\n"; 
html+="      </td>\n"; 
html+="  </tr>\n"; 
html+="                                        <!--[if !mso]><!-->\n"; 
html+="                                        <tr style=\"display:none; width:0; max-height:0; overflow:hidden; float:left;\" class=\"show-mobile-tr\">\n"; 
html+="     <td align=\"<%=alignment%>\" valign=\"top\" class=\"show-mobile-td\" style=\"display:none; width:0; max-height:0; overflow:hidden; float:left; padding:0 0 16px 0;\" id=\"mobile-image-padding\">\n"; 
html+="        <a _urltype=\"11\" href=\"https://<%= proposition.offer.view.trackedUrls.url_jst %>?utm_content=<%= utmContentImg %>&utm_medium=email&utm_source=<%=utmSource%>&ART=<%=ART%>&utm_campaign=<%= delivery.label %>&utm_term=<%=utmTermImg%>\" _label=\"<%= labelImg %>\" _category=\"OfferImage\" target=\"_blank\" style=\"text-decoration:none;\"><img width=\"100%\" src=\"https://<%= proposition.offer.view.imageUrl_jst %>\" border=\"0\" alt=\"<%= proposition.offer.view.imageAltText_jst %>\" style=\"display:block;\"></a>\n"; 
html+="     </td>\n"; 
html+="  </tr>\n"; 
html+="                                         <!--<![endif]-->\n"; 
html+="                                        <tr>\n"; 
html+="                                            <td style=\"padding:0 20px 0 20px\" class=\"mobile-padding\" valign=\"top\" dir=\"<%=textDir%>\" align=\"<%=alignment%>\">\n"; 
html+="                                                <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\n"; 
html+="                                                    <tbody><tr>\n"; 
html+="                                                      <td style=\"font-family:Verdana; mso-line-height-rule:exactly; line-height:17px; font-size:13px; color:#000000; padding:0 0 16px 0;height:40px;\" valign=\"top\" align=\"<%=alignment%>\">\n"; 
html+="<%= proposition.offer.view.shortContent_jst %>                                                        </td>\n"; 
html+="                                                    </tr>\n";                                                     
html+="                                                </tbody></table>\n"; 
html+="                                            </td>\n"; 
html+="                                        </tr>\n"; 
html+="                                    </tbody></table>\n"; 

    return html;
}




function get3EcommerceHTML()
{

var html = "<%";
html+="var utmSource='ACM_UFS';\n";
html+="var utmTermImg='UFS';\n";
html+="var utmTermLink='UFS';\n";
html+="var labelImg='B_3EcommerceDynamicOffers_' + proposition.offer.label + 'IMG';\n";
html+="var labelLink='B_3EcommerceDynamicOffers_' + proposition.offer.label + 'Link';\n";
html+="var utmContentImg= labelImg;\n";
html+="var utmContentLink= labelLink;\n";
html+="var textDir= \"ltr\";\n";
html+="var alignment= \"left\"\n";
html+="if(delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!=null && delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!=undefined && delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!='')\n";
html+="utmSource = delivery.content.content.Common_template_v1.elmGeneral.@['utmSource'];\n";
html+="if(proposition.offer.view.uTMTerm_jst!=null && proposition.offer.view.uTMTerm_jst!=undefined && proposition.offer.view.uTMTerm_jst!='')\n";
html+="utmTermImg = proposition.offer.view.uTMTerm_jst;\n";
html+="if(proposition.offer.view.uTMTermImage_jst!=null && proposition.offer.view.uTMTermImage_jst!=undefined && proposition.offer.view.uTMTermImage_jst!='')\n";
html+="utmTermLink = proposition.offer.view.uTMTermImage_jst;\n";
html+="if(delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!=null && delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!=undefined && delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!='' && (delivery.content.content.Common_template_v1.elmGeneral.@['language-cs'] == 'he' || delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']== 'ar' || delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']== 'ur')){\n";
html+="textDir = \"rtl\";\n";
html+="alignment = \"right\";\n";
html+="}\n";
html+="if(targetData.alignment == \"center\")\n";
html+="alignment = \"center\";\n";
html+="var ART = escapeUrl(encryptDES('8574827493847364', recipient.partyId, 'CBC', '0000000000000000'));\n";
html+="%>\n";
html+="<table class=\"force-row\" id=\"margin-top-30\" cellpadding=\"0\" cellspacing=\"0\" width=\"173\" style=\"height:381px;table-layout: fixed; \" align=\"left\" border=\"0\">\n";
html+="   <tbody >\n";
html+="      <tr>\n";
html+="         <td style=\"font-family:Verdana; color:#000000; font-size:17px; mso-line-height-rule:exactly; line-height:20px; height: 90px; overflow: hidden; max-width: 173px; max-height: 120px;\" valign=\"top\" align=\"<%=alignment%>\">\n";
html+="          <%= proposition.offer.view.shortContent_jst %>         </td>\n";
html+="      </tr>\n";
html+="      <tr class=\"hide-mobile\">\n";
html+="         <td style=\"padding-bottom:20px;\" valign=\"top\" align=\"left\">\n";
html+="            <a _urltype=\"11\" href=\"https://<%= proposition.offer.view.trackedUrls.url_jst %>?utm_content=<%= utmContentImg %>&utm_medium=email&utm_source=<%=utmSource%>&ART=<%=ART%>&utm_campaign=<%= delivery.label %>&utm_term=<%=utmTermImg%>\" _label=\"<%= labelImg %>\" _category=\"OfferImage\" target=\"_blank\" style=\"text-decoration:none;\"><img src=\"https://<%= proposition.offer.view.imageUrl_jst %>\"  alt=\"\" style=\"display:block;\" height=\"173\" width=\"173\" border=\"0\">\n";
html+="             </a>\n";
html+="          </td>\n";
html+="      </tr>\n";
html+="      <!--[if !mso]><!-->\n";
html+="      <tr style=\"display:none; width:0; max-height:0; overflow:hidden; float:left;\" class=\"show-mobile-tr\">\n";
html+="         <td class=\"show-mobile-td\" style=\"display:none; width:0; max-height:0; overflow:hidden; float:left;\" valign=\"top\" align=\"center\">\n";
html+="            <a _urltype=\"11\" href=\"https://<%= proposition.offer.view.trackedUrls.url_jst %>?utm_content=<%= utmContentImg %>&utm_medium=email&utm_source=<%=utmSource%>&ART=<%=ART%>&utm_campaign=<%= delivery.label %>&utm_term=<%=utmTermImg%>\" _label=\"<%= labelImg %>\" _category=\"OfferImage\" target=\"_blank\" style=\"text-decoration:none;\"><img src=\"https://<%= proposition.offer.view.imageUrl_jst %>\" alt=\"\" style=\"display:block;\" width=\"173\" border=\"0\">\n";
html+="            </a>\n";
html+="         </td>\n";
html+="      </tr>\n";
html+="      <!--<![endif]-->\n";
html+="      <tr>\n";
html+="         <td style=\"padding:0 10px 0 10px\" valign=\"top\" dir=\"<%=textDir%>\"  align=\"<%=alignment%>\">\n";
html+="            <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\n";
html+="               <tbody>\n";
html+="                  <tr>\n";
html+="                     <td style=\"padding:0 0 0 0;\" align=\"<%=alignment%>\">\n";
html+="                        <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n";
html+="                           <tbody>\n";
html+="                              <tr>\n";
html+="                                 <th style=\"padding:6px 14px; -webkit-border-radius:4px; border-radius:4px; font-size:14px; font-family:Verdana; color:#ffffff; display:inline-block; border:1px solid #ff5a00;\" align=\"center\" bgcolor=\"#ff5a00\">\n";
html+="                                    <a _urltype=\"11\" href=\"https://<%= proposition.offer.view.trackedUrls.url_jst %>?utm_content=<%= utmContentLink %>&utm_medium=email&utm_source=<%=utmSource%>&ART=<%=ART%>&utm_campaign=<%= delivery.label %>&utm_term=<%=utmTermLink%>\" _label=\"<%= labelLink %>\" _category=\"OfferLink\" target=\"_blank\" style=\"font-size:14px; font-family:Verdana; text-decoration:none; font-weight:bold; mso-line-height-rule:exactly; line-height:14px; color:#ffffff; max-width: 123px; display: block; overflow: hidden;\">\n";
html+="                    <%= targetData.buttonText %>\n";
html+="                                    </a>\n";
html+="                                 </th>\n";
html+="                              </tr>\n";
html+="                           </tbody>\n";
html+="                        </table>\n";
html+="                     </td>\n";
html+="                  </tr>\n";
html+="               </tbody>\n";
html+="            </table>\n";
html+="         </td>\n";
html+="      </tr>\n";
html+="   </tbody>\n";
html+="</table>\n";                                                                                                                                                                                   

return html;

}


function getSplit5050()
{

var html = "<%\n";
html+="var utmSource='ACM_UFS';\n";
html+="var utmTermImg='UFS';\n";
html+="var utmTermLink='UFS';\n";
html+="var labelImg='B_Split5050DynamicOffers_' + proposition.offer.label + 'IMG';\n";
html+="var labelLink='B_Split5050DynamicOffers_' + proposition.offer.label + 'Link';\n";
html+="var utmContentImg= labelImg;\n";
html+="var utmContentLink= labelLink;\n";
html+="var textDir= \"ltr\";\n";
html+="var alignment= \"left\"\n";
html+="if(delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!=null && delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!=undefined && delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!='')\n";
html+="utmSource = delivery.content.content.Common_template_v1.elmGeneral.@['utmSource'];\n";
html+="if(proposition.offer.view.uTMTerm_jst!=null && proposition.offer.view.uTMTerm_jst!=undefined && proposition.offer.view.uTMTerm_jst!='')\n";
html+="utmTermImg = proposition.offer.view.uTMTerm_jst;\n";
html+="if(proposition.offer.view.uTMTermImage_jst!=null && proposition.offer.view.uTMTermImage_jst!=undefined && proposition.offer.view.uTMTermImage_jst!='')\n";
html+="utmTermLink = proposition.offer.view.uTMTermImage_jst;\n";
html+="if(delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!=null && delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!=undefined && delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!='' && (delivery.content.content.Common_template_v1.elmGeneral.@['language-cs'] == 'he' || delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']== 'ar' || delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']== 'ur')){\n";
html+="textDir = \"rtl\";\n";
html+="alignment = \"right\";\n";
html+="}\n";
html+="var ART = escapeUrl(encryptDES('8574827493847364', recipient.partyId, 'CBC', '0000000000000000'));\n";
html+="%>\n";
html+="<table class=\"container\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" border=\"0\">\n";
html+="                <tbody><tr>\n";
html+="                    <td style=\"padding:0 10px 20px 10px;\" class=\"reset-padding-splitblock\" valign=\"top\" align=\"left\">\n";
html+="                        <table dir=\"<%=textDir%>\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\n";
html+="                            <tbody><tr>\n";
html+="                                <th dir=\"<%=textDir%>\" class=\"force-row-th\" style=\"font-weight:normal; padding:0;\" valign=\"top\">\n";
html+="                                    <table class=\"force-row\" cellpadding=\"0\" cellspacing=\"0\" width=\"290\" border=\"0\">\n";
html+="                                        <tbody><tr class=\"hide-mobile\">\n";
html+="                                            <td style=\"padding:0 0 0 0;\" valign=\"top\" align=\"left\">\n";
html+="                                             <a href=\"https://<%= proposition.offer.view.trackedUrls.url_jst %>?utm_content=<%= utmContentImg %>&utm_medium=email&utm_source=<%=utmSource%>&ART=<%=ART%>&utm_campaign=<%= delivery.label %>&utm_term=<%=utmTermImg%>\" _label=\"<%= labelImg %>\" _category=\"OfferLink\">\n";
html+="                                               <img src=\"https://<%= proposition.offer.view.imageUrl_jst %>\" alt=\"\" style=\"display:block;\" width=\"290\" border=\"0\">\n";
html+="                                            </a></td>\n";
html+="                                        </tr>\n";
html+="                                        <!--[if !mso]><!-->\n";
html+="                                        <tr style=\"display:none; width:0; max-height:0; overflow:hidden; float:left;\" class=\"show-mobile-tr\">\n";
html+="                                            <td class=\"show-mobile-td\" style=\"display:none; width:0; max-height:0; overflow:hidden; float:left; padding:0 0 0 0;\" valign=\"top\" align=\"left\">\n";
html+="                                             href=\"https://<%= proposition.offer.view.trackedUrls.url_jst %>?utm_content=<%= utmContentImg %>&utm_medium=email&utm_source=<%=utmSource%>&ART=<%=ART%>&utm_campaign=<%= delivery.label %>&utm_term=<%=utmTermImg%>\" _label=\"<%= labelImg %>\" _category=\"OfferLink\">\n";
html+="                                                <img src=\"https://<%= proposition.offer.view.imageUrl_jst %>\" alt=\"\" style=\"display:block;\" width=\"100%\" border=\"0\">\n";
html+="                                           </a> </td>\n";
html+="                                        </tr>\n";
html+="                                       <!--<![endif]-->\n";
html+="                                    </tbody></table>\n";
html+="                                </th>\n";
html+="                                <th dir=\"<%=textDir%>\" class=\"force-row-th\" style=\"font-weight:normal; padding:0;\" valign=\"middle\" bgcolor=\"\">\n";
html+="                                    <table class=\"force-row\" cellpadding=\"0\" cellspacing=\"0\" width=\"290\" border=\"0\">\n";
html+="                                        <tbody><tr>\n";
html+="                                           <td style=\"padding:20px\" class=\"mobile-padding\" valign=\"top\" align=\"<%=alignment%>\">\n";
html+="                                                <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\n";
html+="                                                    <tbody><tr>\n";
html+="                                                        <td dir=\"<%=textDir%>\" style=\"font-family:Verdana; font-weight:bold; mso-line-height-rule:exactly; line-height:22px; font-size:21px; color:#ff5a00; padding:0 0 8px 0;\" valign=\"top\" align=\"<%=alignment%>\">\n";
html+="                                                        </td>\n";
html+="                                                    </tr>\n";
html+="                                                    <tr>\n";
html+="                                                        <td dir=\"<%=textDir%>\" style=\"font-family:Verdana; mso-line-height-rule:exactly; line-height:17px; font-size:13px; color:#000000; padding:0 0 16px 0;\" valign=\"top\" align=\"<%=alignment%>\">\n";
html+="<%= targetData.recipeText %> <%= proposition.offer.view.shortContent_jst %>                                                        </td>\n";
html+="                                                    </tr>\n";
html+="                                                    <tr>\n";
html+="                                                        <td style=\"padding:0 0 0 0;\" align=\"<%=alignment%>\">\n";
html+="                                                            <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n";
html+="                                                                <tbody><tr>\n";
html+="                                                                   <th style=\"padding:6px 14px; -webkit-border-radius:4px; border-radius:4px; font-size:14px; font-family:Verdana; color:#ffffff; display:inline-block; border:1px solid #ff5a00;\" align=\"center\" bgcolor=\"#ff5a00\">\n";
html+="                                                                        <a href=\"https://<%= proposition.offer.view.trackedUrls.url_jst %>?utm_content=<%= utmContentLink %>&utm_medium=email&utm_source=<%=utmSource%>&ART=<%=ART%>&utm_campaign=<%= delivery.label %>&utm_term=<%=utmTermLink%>\" _label=\"<%= labelLink %>\" _category=\"OfferLink\" target=\"_blank\" style=\"font-size:14px; font-family:Verdana; text-decoration:none; font-weight:bold; mso-line-height-rule:exactly; line-height:14px; color:#ffffff;\">\n";
html+="                                                                            <%= targetData.buttonTextSample %>\n";
html+="                                                                        </a>\n";
html+="                                                                    </th>\n";
html+="                                                                </tr>\n";
html+="                                                            </tbody></table>\n";
html+="                                                        </td>\n";
html+="                                                    </tr>\n";
html+="                                                </tbody></table>\n";
html+="                                            </td>\n";
html+="                                        </tr>\n";
html+="                                    </tbody></table>\n";
html+="                                </th>\n";
html+="                            </tr>\n";
html+="                        </tbody></table>\n";
html+="                    </td>\n";
html+="                </tr>\n";
html+="            </tbody></table>\n";
return html;
}






function getSplit7030()
{


var html = "<%\n";
html+="var utmSource='ACM_UFS';\n";
html+="var utmTermImg='UFS';\n";
html+="var utmTermLink='UFS';\n";
html+="var labelImg='B_Split7030DynamicOffers_' + proposition.offer.label + 'IMG';\n";
html+="var labelLink='B_Split7030DynamicOffers_' + proposition.offer.label + 'Link';\n";
html+="var utmContentImg= labelImg;\n";
html+="var utmContentLink= labelLink;\n";
html+="var textDir= \"ltr\";\n";
html+="var alignment= \"left\"\n";
html+="if(delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!=null && delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!=undefined && delivery.content.content.Common_template_v1.elmGeneral.@['utmSource']!='')\n";
html+="utmSource = delivery.content.content.Common_template_v1.elmGeneral.@['utmSource'];\n";
html+="if(proposition.offer.view.uTMTerm_jst!=null && proposition.offer.view.uTMTerm_jst!=undefined && proposition.offer.view.uTMTerm_jst!='')\n";
html+="utmTermImg = proposition.offer.view.uTMTerm_jst;\n";
html+="if(proposition.offer.view.uTMTermImage_jst!=null && proposition.offer.view.uTMTermImage_jst!=undefined && proposition.offer.view.uTMTermImage_jst!='')\n";
html+="utmTermLink = proposition.offer.view.uTMTermImage_jst;\n";
html+="if(delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!=null && delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!=undefined && delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']!='' && (delivery.content.content.Common_template_v1.elmGeneral.@['language-cs'] == 'he' || delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']== 'ar' || delivery.content.content.Common_template_v1.elmGeneral.@['language-cs']== 'ur')){\n";
html+="textDir = \"rtl\";\n";
html+="alignment = \"right\";\n";
html+="}\n";
html+="var ART = escapeUrl(encryptDES('8574827493847364', recipient.partyId, 'CBC', '0000000000000000'));%>\n";
html+="<table dir=\"<%=textDir%>\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\n";
html+="                            <tbody><tr>\n";
html+="                                <th dir=\"<%=textDir%>\" class=\"force-row-th\" style=\"font-weight:normal; padding:0;\" valign=\"top\">\n";
html+="                                    <table class=\"force-row\" cellpadding=\"0\" cellspacing=\"0\" width=\"174\" border=\"0\">\n";
html+="                                        <tbody><tr class=\"hide-mobile\">\n";
html+="                                            <td style=\"padding:0 0 0 0;\" valign=\"top\" align=\"left\">\n";
html+="                                                <a href=\"https://<%= proposition.offer.view.trackedUrls.url_jst %>?utm_content=<%= utmContentImg %>&utm_medium=email&utm_source=<%=utmSource%>&ART=<%=ART%>&utm_campaign=<%= delivery.label %>&utm_term=<%=utmTermImg%>\" _label=\"<%= labelImg %>\" _category=\"OfferLink\" target=\"_blank\" style=\"text-decoration:none;\"><img src=\"https://<%= proposition.offer.view.imageUrl_jst %>\" alt=\"\" style=\"display:block;\" width=\"174\" border=\"0\"></a>\n";
html+="                                            </td>\n";
html+="                                        </tr>\n";
html+="                                        <!--[if !mso]><!-->\n";
html+="                                        <tr style=\"display:none; width:0; max-height:0; overflow:hidden; float:left;\" class=\"show-mobile-tr\">\n";
html+="                                           <td class=\"show-mobile-td\" style=\"display:none; width:0; max-height:0; overflow:hidden; float:left; padding:0 0 0 0;\" valign=\"top\" align=\"left\">\n";
html+="                                                <a href=\"https://<%= proposition.offer.view.trackedUrls.url_jst %>?utm_content=<%= utmContentImg %>&utm_medium=email&utm_source=<%=utmSource%>&ART=<%=ART%>&utm_campaign=<%= delivery.label %>&utm_term=<%=utmTermImg%>\" _label=\"<%= labelImg %>\" _category=\"OfferLink\" target=\"_blank\" style=\"text-decoration:none;\"><img src=\"https://<%= proposition.offer.view.imageUrl_jst %>\" alt=\"\" style=\"display:block;\" width=\"100%\" border=\"0\"></a>\n";
html+="                                            </td>\n";
html+="                                        </tr>\n";
html+="                                       <!--<![endif]-->\n";
html+="                                    </tbody></table>\n";
html+="                                </th>\n";
html+="                                <th dir=\"<%=textDir%>\" class=\"force-row-th\" style=\"font-weight:normal; padding:0;\" valign=\"middle\" bgcolor=\"\">\n";
html+="                                    <table class=\"force-row\" cellpadding=\"0\" cellspacing=\"0\" width=\"406\" border=\"0\">\n";
html+="                                        <tbody><tr>\n";
html+="                                            <td style=\"padding:16px 20px\" class=\"mobile-padding\" valign=\"top\" align=\"<%=alignment%>\">\n";
html+="                                                <table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" border=\"0\">\n";
html+="                                                    <tbody><tr>\n";
html+="                                                       <td dir=\"<%=textDir%>\" style=\"font-family:Verdana; font-weight:bold; mso-line-height-rule:exactly; line-height:22px; font-size:21px; color:#ff5a00; padding:0 0 8px 0;\" valign=\"top\" align=\"<%=alignment%>\">\n";
html+="                                                        </td>\n";
html+="                                                    </tr>\n";
html+="                                                    <tr>\n";
html+="                                                        <td dir=\"<%=textDir%>\" style=\"font-family:Verdana; mso-line-height-rule:exactly; line-height:17px; font-size:13px; color:#000000; padding:0 0 16px 0;\" valign=\"top\" align=\"<%=alignment%>\">\n";
html+="<%= targetData.recipeText %> <%= proposition.offer.view.shortContent_jst %>                                                        </td>\n";
html+="                                                    </tr>\n";
html+="                                                    <tr>\n";
html+="                                                        <td style=\"padding:0 0 0 0;\" align=\"<%=alignment%>\">\n";
html+="                                                            <table cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n";
html+="                                                                <tbody><tr>\n";
html+="                                                                    <th style=\"padding:6px 14px; -webkit-border-radius:4px; border-radius:4px; font-size:14px; font-family:Verdana; color:#ffffff; display:inline-block; border:1px solid #ff5a00;\" align=\"center\" bgcolor=\"#ff5a00\">\n";
html+="                                                                        <a href=\"https://<%= proposition.offer.view.trackedUrls.url_jst %>?utm_content=<%= utmContentLink %>&utm_medium=email&utm_source=<%=utmSource%>&ART=<%=ART%>&utm_campaign=<%= delivery.label %>&utm_term=<%=utmTermLink%>\" _label=\"<%= labelLink %>\" _category=\"OfferLink\" target=\"_blank\" style=\"font-size:14px; font-family:Verdana; text-decoration:none; font-weight:bold; mso-line-height-rule:exactly; line-height:14px; color:#ffffff;\">\n";
html+="                                                                            <%= targetData.buttonTextSample %>\n";
html+="                                                                        </a>\n";
html+="                                                                    </th>\n";
html+="                                                                </tr>\n";
html+="                                                            </tbody></table>\n";
html+="                                                        </td>\n";
html+="                                                    </tr>\n";
html+="                                                </tbody></table>\n";
html+="                                            </td>\n";
html+="                                        </tr>\n";
html+="                                    </tbody></table>\n";
html+="                                </th>\n";
html+="                            </tr>\n";
html+="                        </tbody></table>\n";

return html;
}  


//function to create offer contexts (f.ex Default with weight 1)
function CreateOfferContext( offerContextId, offerId, label, weight, ctxSpace, filterLabel )
{                                                                                                                                  
  
  try {
  
    if ( offerContextId == 0 )
      var offerXML = <offerContext offer-id = {offerId} label = {label} weightExpr = {weight} space-id = {ctxSpace} >
                <filter label = {filterLabel} schema="nms:recipient">
                  <where displayFilter = {filterLabel} filterName="backGroundFilterFrm" filteringSchema = "nms:recipient">
                    <condition compositeKey = "" dependkey = "" enabledIf = "" expr = {"@id > 0"} /> // 
                  </where>
                  <humanCond>{filterLabel}</humanCond>
                </filter>
                </offerContext>
      var newOfferContext = nms.offerContext.create(offerXML);
      //logInfo("offerXML ++++++++++++++++++++ "+offerXML);
      /*
      var newOfferContext = nms.offerContext.create(
                <offerContext offer-id = {offerId} label = {label} weightExpr = {weight} space-id = {ctxSpace} >
                <filter label = {filterLabel} schema="nms:recipient">
                  <where displayFilter = {filterLabel} filterName="backGroundFilterFrm" filteringSchema = "nms:recipient">
                    <condition compositeKey = "" dependkey = "" enabledIf = "" expr = {"[currentOffer/@language] = 'not_apply' and @processLanguage = Upper(Substring([currentOffer/@language],0 ,3 )) "} /> // 
                  </where>
                  <humanCond>{filterLabel}</humanCond>
                </filter>
                </offerContext>);
                */
     newOfferContext.save();
  }
  catch( err ){                                                                                                                          
      logError( "Error creating offer weight " + weight + " for " + label + ": " + err.message );
      //vars.lastErrorMsg = err.message;  
  }

}


//function to create offers
//ASK IVAN - offerName - is this from wf, how can I get it otherwise?
function CreateOffer( offerCategoryId, offerName, ctxSpace, offerLabel, contextLabel, contextWeight, filterLabel, imageUrl, destinationUrl, title, lou, language ) {                                                                                                                                                                                                                                 
  
  var html2Column = get2MainColumnHTML();
  var html2ColumnImage = get2MainImageColumnHTML();
  var html3Ecommerce = get3EcommerceHTML();
  var html5050Split = getSplit5050();
  var html7030Split = getSplit7030();
  /*var imageUrl = "www.google.com";
  var destinationUrl = "www.gazzetta.it";
  var mImageUrl = "www.repubblica.it";*/
  //localOrgUnit-id        = {lou}
  //language         = {language}        
  try
  {                                                                                                                                
    var newOffer = nms.offer.create(
          <offer
            category-id          = {offerCategoryId}
            code                 = {offerName}
            isContentUpdated     = "1"
            contentBlockOffer-id = "0"
            contentStatus        = "0"
            eligibilityStatus    = "0"            
            isModel              = "0"
            label                = {offerLabel}
            name                 = {offerName}
            owner-id             = "0"
            reminderContent      = ""
            reminderEligibility  = ""
            startDate            = ""
            status               = "0"
            localOrgUnit-id        = {lou}
            language         = {language}
            xtkschema            = "nms:offer">

            <view>
              <trackedUrls>
                  <url_jst>{destinationUrl}</url_jst>
              </trackedUrls>
              <imageUrl_jst>{imageUrl}</imageUrl_jst>
              <shortContent_jst>{title}</shortContent_jst>
              <htmlSource2Main_jst>{html2Column}</htmlSource2Main_jst>
              <htmlSource2MainImage_jst>{html2ColumnImage}</htmlSource2MainImage_jst>
              <htmlSource3Ecommerce_jst>{html3Ecommerce}</htmlSource3Ecommerce_jst>
              <htmlSourceSplit5050_jst>{html5050Split}</htmlSourceSplit5050_jst>
              <htmlSourceSplit7030_jst>{html7030Split}</htmlSourceSplit7030_jst>
            </view>
            
            <filter label = {filterLabel} schema = "nms:recipient">
              <where displayFilter = {filterLabel} filterName="backGroundFilterFrm" filteringSchema = "nms:recipient">
                <condition boolOperator="OR" compositeKey="" dependkey="" enabledIf="" expr="[currentOffer/@language] = 'not_apply'"/>
                <condition compositeKey="" dependkey="" enabledIf="" expr="@processLanguage = Upper(Substring([currentOffer/@language],0 ,3 ))"/>
              </where>
              <humanCond>{filterLabel}</humanCond>
            </filter>
            

          </offer> );
  
    newOffer.contentStatus       = "0";                                                                                            
    newOffer.eligibilityStatus   = "0";                                                                                            
    newOffer.save();                                                                                                               
    
    var filterLabelContext = "Query: primary key greather than 0";                                                                                                                         
    CreateOfferContext( 0, newOffer.id, contextLabel, contextWeight, ctxSpace, filterLabelContext );                                          
                                      
    var validated = <validated _{ctxSpace}="3"/>;                                                                                   
    nms.offer.Validation( newOffer.id, 0, validated, 0, null );                                                                    
    nms.offer.Validation( newOffer.id, 1, validated, 0, null );                                                                   
  }
  catch( err )
  {                                                     
     logError( err.message );
  }                                                                                                      
}

//Function to check whether a specific category folder exists or not. 
//INPUT: cetegory folder internal name
//OUTPUT: 0 if category folder doesn't exist, else category folder id
function existFolder(category) {

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
        
  if(category.offerCategory.length() > 0) {
     return category.offerCategory.@id;
  
  } else return 0;

}

//Function to calculate MAX sequencial index of existing default offers (disabled or not in the live space)
//INPUT: cetegory folder internal name
//OUTPUT: 0 if no default offers already created, else the MAX sequencial index
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
 
 //logInfo("Length :"+offers.offer.length());
 
 if (offers.offer.length() > 0) {
    var array = [];
  
    for each (var o in offers) {
       var index = o.@label.toString().split("_");
       array.push(parseInt(index[index.length-1]));
       
       //logInfo(parseInt(index[index.length-1]));
    
    }
    //logInfo(array);
    var max= 0;

//    for (i=0; i<=max;i++){
//       if (array[i]>max) {
//           var max=array[i];
//       }
//    }
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

//Function to move Default Offers in Category subfolder for disabled offer
//INPUT: cetegory folder internal name, country's language (ISO2 Upper Case)
//OUTPUT: None
//RESULT: Default Offers foreign key updated with id Category subfolder for diaabled offer
function moveBinDefaultOffer (offerId, categoryFolder) {

  var newCategoryFolder = categoryFolder+"_bin";
  var exprCategory = "@name = '"+newCategoryFolder+"'";
  
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
         
};

//Function to disable all Default/FallBackDefault offers in the live space UFS Email Channel Dynamic Block
//INPUT: cetegory folder internal name, country's language (ISO2 Upper Case)
//OUTPUT: None
//RESULT: Default Offers disabled, moved to Cetegory subfolder (foreign key updated) and published in Production environment.
function disableDefaultOffers(ctxSpace, categoryFolder, language, languageName) {

 var exprLabel = "@label LIKE '%_Default_%'";  
// var exprLabel = "@label LIKE '%_"+language+"_Default_%'"; 
 var exprCategory = "[category/@name] = '"+categoryFolder+"'";
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
     
     moveBinDefaultOffer (o.@id, categoryFolder);
     
     var validated = <validated _{ctxSpace[0]}="5" _{ctxSpace[1]}="5" _{ctxSpace[2]}="5" _{ctxSpace[3]}="5"/>;                                                                                   
     nms.offer.Validation( o.@id, 0, validated, 0, null );                                                                    
     nms.offer.Validation( o.@id, 1, validated, 0, null );
     
     //xtk.session.Write(<offer _key="@id" _operation="update" xtkschema="nms:offer" id={o.prodOffer.@id} eligibilityStatus = "5" contentStatus = "5"/>);  
     xtk.session.Write(<offer _key="@id" _operation="update" xtkschema="nms:offer" id={o.@id} eligibilityStatus = "5" contentStatus = "5"/>);
  }
};

//Function to collect csv data from temp:offerContent in wkf with internal name = generateDefaultOffers
//INPUT: None
//OUTPUT: csv recommendation Data (xml)
function collectFileData() {
  try {

    // select .csv file data
    var csvQuery = xtk.queryDef.create(
      <queryDef schema="temp:offerContent" operation="select">
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

//Function to generate Default Offers, if category folders are in place
//INPUT:
//OUTPUT: 
function generateDefaultOffers(MCO, country, language, languageName, countLanguage, lou, productCtaLouString, recipeCtaLouString) {
   
   var ctxSpace = [getOption( "ufsOfferContextSpaceId" ),getOption( "ufsEmailOfferSpaceId" ),getOption( "ufsOutboundOfferSpaceId" ),getOption( "ufsEcommerce3ColumnsOfferSpaceId" )];
   
   var recipeCtaUpdated = 0;
   var productCtaUpdated = 0;
   var langCodeLou = country.toLowerCase()+"_"+language.toLowerCase();
   
   var categoryProduct = "categoryRootRcp"+MCO+"_"+country+"_"+"ws";
   var categoryProductId = existFolder(categoryProduct);
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
         
            if (Type == "Product" && existFolder(categoryProduct) != 0) {
           
               if (productCtaUpdated == 0) updateCtaLou(langCodeLou, lou, productCtaLouString, CTA_text, Type);  
               
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
                     
            } else if (Type == "Recipe" && existFolder(categoryRecipe) != 0) {
            
               if (recipeCtaUpdated == 0) updateCtaLou(langCodeLou, lou, recipeCtaLouString, CTA_text, Type);             
            
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
                             
            } else if (existFolder(categoryRecipe) == 0){
            
               //logInfo("No folder for Recipe category: "+categoryRecipe);
               vars.errorStatus = 3;
               vars.errorDescription = "No folder for Recipe category: "+categoryRecipe; 
               
            } else if (existFolder(categoryProduct) == 0){
            
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