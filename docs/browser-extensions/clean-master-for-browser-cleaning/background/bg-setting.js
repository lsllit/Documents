"use strict";var browsingData,userAgent=navigator.userAgent,bgSetting=(-1<userAgent.indexOf("Firefox")&&(browsingData=[{name:"cache",isClean:!0,asname:"Cached Images and Files",info:"Clears the browser cache"},{name:"cookies",isClean:!1,asname:"Cookies",info:"Clears the browser cookies modified within a particular timeframe"},{name:"downloads",isClean:!0,asname:"Download History",info:"Clears the browser list of downloaded files (not the downloaded files themselves)"},{name:"formData",isClean:!1,asname:"Autofill form Data",info:"Clears the browser stored form data"},{name:"history",isClean:!0,asname:"Browsing History",info:"Clears the browser history"},{name:"indexedDB",isClean:!1,asname:"IndexedDB Data",info:"Clears website IndexedDB data"},{name:"localStorage",isClean:!1,asname:"Local Storage Data",info:"Clears website local storage data"},{name:"pluginData",isClean:!1,asname:"Plugin Data",info:"Clears browser plugin storage data"},{name:"passwords",isClean:!1,asname:"Saved Passwords",info:"Clears the browser stored passwords"}]),-1<userAgent.indexOf("Chrome")&&(browsingData=[{name:"appcache",isClean:!1,asname:"Application Cache",info:"Clears website appcache data"},{name:"cache",isClean:!0,asname:"Cached Images and Files",info:"Clears the browser cache"},{name:"cookies",isClean:!1,asname:"Cookies",info:"Clears the browser cookies modified within a particular timeframe"},{name:"downloads",isClean:!0,asname:"Download History",info:"Clears the browser list of downloaded files (not the downloaded files themselves)"},{name:"fileSystems",isClean:!1,asname:"Website File Systems",info:"Clears website file system data"},{name:"formData",isClean:!1,asname:"Autofill form Data",info:"Clears the browser stored form data"},{name:"history",isClean:!0,asname:"Browsing History",info:"Clears the browser history"},{name:"indexedDB",isClean:!1,asname:"IndexedDB Data",info:"Clears website IndexedDB data"},{name:"localStorage",isClean:!1,asname:"Local Storage Data",info:"Clears website local storage data"},{name:"pluginData",isClean:!1,asname:"Plugin Data",info:"Clears browser plugin storage data"},{name:"passwords",isClean:!1,asname:"Saved Passwords",info:"Clears the browser stored passwords"},{name:"webSQL",isClean:!1,asname:"Web SQL Data",info:"Clears website WebSQL data"}]),{init:async function(){await infinity.localGet("clean-master")||infinity.localSet("clean-master",{clean_item:browsingData,clean_time:"Last Hour",clean_tabs:{tabs:!1,fixed:!1}})}});