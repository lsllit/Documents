importScripts("/background/multiDomainFirstParties.js","/background/publicSuffixList.js");var trackerMap={};const start=async()=>{const c=(await loadSeedData())["action_map"];var t=await infinity.localGet("tracker");t&&(trackerMap=t),chrome.webNavigation.onBeforeNavigate.addListener(t=>{var{tabId:t,url:e,frameId:r}=t;0<r||(trackerMap[t]={host:new URL(e).host})}),chrome.webNavigation.onCompleted.addListener(t=>{t=t.tabId;trackerMap[t]&&(trackerMap[t].done=1),infinity.localSet("tracker",trackerMap)}),chrome.webRequest.onBeforeRequest.addListener(t=>{var{tabId:t,url:e,type:r,initiator:i,frameId:a}=t;if((!trackerMap[t]||!trackerMap[t].done)&&i&&!(0<a)&&"main_frame"!=r&&e&&!(t<0)){a=new URL(e).host;if(isThirdPartyDomain(a,new URL(i).host)){var n=explodeSubdomains(a);let e=!1;for(let t=n.length-1;0<=t;t--){var s=n[t];s in c&&"block"===c[s].heuristicAction&&(e=!0)}if(e){const o=trackerMap[t]||{};o.trackerList||(o.trackerList=[]),o.trackerList.includes(a)||(o.trackerList.push(a),trackerMap[t]=o)}}}},{urls:["http://*/*","https://*/*"]}),infinity.onMessage("getTrackerList",(t,e,r)=>{let i={};return r((i=t.tabId?trackerMap[t.tabId]||{}:i).trackerList||[]),!0})};async function loadSeedData(){return fetch(chrome.runtime.getURL("background/seed.json")).then(t=>t.json())}function explodeSubdomains(t){for(var e=t.split(".").pop().split(".").length,r=t.split("."),i=r.length-e,a=[],n=0;n<=i;n++)a.push(r.slice(n).join("."));return a}function isThirdParty(t,e){if(!t||!e)return!0;if((t="."==t.charAt(t.length-1)?t.slice(0,-1):t)==(e="."==e.charAt(e.length-1)?e.slice(0,-1):e))return!1;e=getBaseDomain(e);return t.length>e.length?!t.endsWith("."+e):t!=e}function isThirdPartyDomain(t,e){return!!isThirdParty(t,e)&&!mdfp.isMultiDomainFirstParty(getBaseDomain(t),getBaseDomain(e))}function getBaseDomain(t){if(isIPv6(t="."==t.charAt(t.length-1)?t.slice(0,-1):t)||isIPv4(t))return t;let e=0,r=[],i=t,a=i.indexOf(".");for(;;){if(i in publicSuffixes){e=publicSuffixes[i];break}if(a<0){e=1;break}r.push(i.slice(0,a)),i=i.slice(a+1),a=i.indexOf(".")}for(;0<e&&0<r.length;)i=r.pop()+"."+i,e--;return i}start();const RE_V4=/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0x[0-9a-f][0-9a-f]?|0[0-7]{3})\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0x[0-9a-f][0-9a-f]?|0[0-7]{3})$/i,RE_V4_HEX=/^0x([0-9a-f]{8})$/i,RE_V4_NUMERIC=/^[0-9]+$/,RE_V4inV6=/(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,RE_BAD_CHARACTERS=/([^0-9a-f:])/i,RE_BAD_ADDRESS=/([0-9a-f]{5,}|:{3,}|[^:]:$|^:[^:]$)/i;function isIPv4(t){return!!RE_V4.test(t)||(!!RE_V4_HEX.test(t)||!!RE_V4_NUMERIC.test(t))}function isIPv6(t){var e=0,r=t.match(RE_V4inV6);if(r){for(var i=r[0].split("."),a=0;a<4;a++)if(/^0[0-9]+/.test(i[a]))return!1;if(t=t.replace(RE_V4inV6,""),/[0-9]$/.test(t))return!1;t+=i.join(":"),e=2}if(RE_BAD_CHARACTERS.test(t))return!1;if(RE_BAD_ADDRESS.test(t))return!1;function n(t,e){return(t.length-t.replace(new RegExp(e,"g"),"").length)/e.length}r=n(t,"::");return 1==r&&n(t,":")<=8+e||0==r&&n(t,":")==7+e}