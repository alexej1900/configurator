(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8581:function(t,e,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return o(4612)}])},5103:function(t,e,o){"use strict";o.d(e,{Z:function(){return c}});var n=o(8923),r=o(4102);async function c(){var t;return await(null===(t=(0,n.a)(r.pp).data)||void 0===t?void 0:t.globalSets[0].settings[0])}},4612:function(t,e,o){"use strict";o.r(e),o.d(e,{default:function(){return P}});var n=o(5893),r=o(5675),c=o(7294),l=o(8923),i=o(4107),a=o(5103),_=o(4102);var s=o(8484),d=o(3554),u=o.n(d),v=o(1664);function m(t){var e=t.title,o=t.href,r=t.classes,c=t.style,l=r.split(" ").reduce((function(t,e){return"".concat(t," ").concat(u()[e])}),"");return(0,n.jsx)(v.default,{href:o,children:(0,n.jsx)("a",{className:l,style:c,children:e})})}var f=o(8943),p=o.n(f);function g(t){var e=t.tab1,o=t.tab1Action,r=t.activeTabStyle,l=t.tab2,i=t.tab2Action,a=(0,c.useState)("tab1"),_=a[0],s=a[1];return(0,n.jsxs)("div",{className:p().toggle,children:[(0,n.jsx)("div",{className:[p().option,"tab1"===_&&p().active].join(" "),onClick:function(){o(),s("tab1")},style:"tab1"===_?r:{background:"#fff"},children:(0,n.jsx)("p",{className:p().toggle__title,children:e})}),(0,n.jsx)("div",{className:[p().option,"tab2"===_&&p().active].join(" "),onClick:function(){i(),s("tab2")},style:"tab2"===_?r:{background:"#fff"},children:(0,n.jsx)("p",{className:p().toggle__title,children:l})})]})}var b=o(1131),y=o(1043),h=o(7260),w=o.n(h);function P(){var t,e=(0,c.useState)(!1),o=e[0],d=e[1],u=(0,y.I0)(),v=(0,y.v9)((function(t){return t.apartSize})),f=(0,a.Z)(),p=async function(){var t,e;return await(null===(e=null===(t=(0,l.a)(_.gC).data)||void 0===t?void 0:t.entries[0].title)||void 0===e?void 0:e.toLowerCase())}(),h=(0,s.Z)();(0,c.useEffect)((function(){f.then((function(e){var o=null===e||void 0===e?void 0:e.brandLogo[0].url,n=!!(null===e||void 0===e?void 0:e.headerBackgroundPicture[0])&&(null===e||void 0===e?void 0:e.headerBackgroundPicture[0].url),r=null===e||void 0===e?void 0:e.headerBackgroundColor;(0,i.Z)(e),u((0,b.bw)(o,n,r)),t=(null===e||void 0===e?void 0:e.welcomePageBg)?f.welcomePageBg:""}))}),[f]),(0,c.useEffect)((function(){h.then((function(t){u((0,b.kK)(!!t)),p.then((function(e){d(t?"/type":e)}))}))}),[h]);var P=(0,l.a)(_.wY),x=P.data,j=P.error;if(P.loading)return(0,n.jsx)("p",{children:"Loading..."});if(j)return(0,n.jsx)("p",{children:" Error"});var k=x.globalSets[0].welcomeScreen[0],N="large"===v.size?k.bigRoomImage[0]:k.smallRoomImage[0];return(0,n.jsx)(n.Fragment,{children:(0,n.jsx)("div",{className:w().welcome,style:{background:t},children:(0,n.jsxs)("div",{className:w().welcome__inner,children:[(0,n.jsxs)("div",{className:"".concat(w().halfLine," ").concat(w().content),children:[(0,n.jsx)("h2",{className:"".concat(w().title),children:k.introText}),(0,n.jsx)("div",{className:w().description,dangerouslySetInnerHTML:{__html:k.paragraph}}),(0,n.jsx)(g,{tab1:k.bigRoomTitle,tab1Action:function(){return u((0,b.Ff)("large",k.bigApartmentPrice,N.url))},tab2:k.smallRoomTitle,tab2Action:function(){return u((0,b.Ff)("small",k.smallApartmentPrice,N.url))}}),(0,n.jsx)("div",{className:"".concat(w().submitBtn," center"),onClick:""===v.image?function(){return u((0,b.Ff)("large",k.bigApartmentPrice,N.url))}:null,children:(0,n.jsx)(m,{title:"Wahl best\xe4tigen",href:o?"".concat(o):"/type",classes:"btn btn--primary btn--check"})})]}),(0,n.jsx)("div",{className:"".concat(w().halfLine," ").concat(w().planImage),children:(0,n.jsx)(r.default,{src:N.url,width:N.width,height:N.height})})]})})})}},4107:function(t,e,o){"use strict";function n(t){var e=document.querySelector(":root");e.style.setProperty("--color__primary","".concat(null===t||void 0===t?void 0:t.mainBrandColor)),e.style.setProperty("--color__primary_10","".concat(null===t||void 0===t?void 0:t.mainBrandColor,"19")),e.style.setProperty("--color__primary_30","".concat(null===t||void 0===t?void 0:t.mainBrandColor,"4C")),e.style.setProperty("--color__secondary","".concat(null===t||void 0===t?void 0:t.additionalBrandColor)),e.style.setProperty("--color__secondary_10","".concat(null===t||void 0===t?void 0:t.additionalBrandColor,"19")),e.style.setProperty("--color__secondary_20","".concat(null===t||void 0===t?void 0:t.additionalBrandColor,"33")),e.style.setProperty("--color__cta","".concat(null===t||void 0===t?void 0:t.colorSelected)),e.style.setProperty("--color__cta_10","".concat(null===t||void 0===t?void 0:t.colorSelected,"19")),e.style.setProperty("--color__cta_30","".concat(null===t||void 0===t?void 0:t.colorSelected,"4C")),e.style.setProperty("--color__cta_secondary","".concat(null===t||void 0===t?void 0:t.ctaSecondary)),e.style.setProperty("--header__bg_color","".concat(null===t||void 0===t?void 0:t.headerBackgroundColor)),e.style.setProperty("--header__bg_image","'".concat(null===t||void 0===t?void 0:t.headerBackgroundPicture,"'")),e.style.setProperty("--title__typo","'".concat(null===t||void 0===t?void 0:t.fontForTitles,"'")),e.style.setProperty("--description__typo","'".concat(null===t||void 0===t?void 0:t.fontForDescriptions,"'"))}o.d(e,{Z:function(){return n}})},7260:function(t){t.exports={welcome:"_welcome_welcome__2w6IG",welcome__inner:"_welcome_welcome__inner__3NvTq",halfLine:"_welcome_halfLine__2qnQ6",content:"_welcome_content__37SrO",planImage:"_welcome_planImage__1zkXS",submitBtn:"_welcome_submitBtn__FZPe9",description:"_welcome_description__Y3K4A",welcome__options:"_welcome_welcome__options__2ziv7",option:"_welcome_option__1eYuq",active:"_welcome_active__22RRm"}},3554:function(t){t.exports={btn:"button_btn__1J637",btn__wrapper:"button_btn__wrapper__eT6u9","btn--primary":"button_btn--primary__2vW6f",disabled:"button_disabled__1f7U8",summaryIcon:"button_summaryIcon__3Qnw9","btn--inline":"button_btn--inline__ksufo","btn--check":"button_btn--check__3uqlC",back:"button_back__2Mj0s"}},8943:function(t){t.exports={toggle:"formToggle_toggle__1_Gtr",option:"formToggle_option__1_K9V",active:"formToggle_active__2IbnL",toggle__title:"formToggle_toggle__title__2EufZ"}}},function(t){t.O(0,[774,888,179],(function(){return e=8581,t(t.s=e);var e}));var e=t.O();_N_E=e}]);