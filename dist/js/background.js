parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"JlD7":[function(require,module,exports) {
function e(e){return chrome.tabs.query({active:!0,currentWindow:!0},function(e){var r=e[0].id;r&&chrome.tabs.remove(r)}),chrome.windows.create({url:e.url,incognito:!0}),{cancel:!0}}chrome.webRequest&&chrome.storage.sync.get(["incognito","excludedObj"],function(r){r.excludedObj&&r.excludedObj.filteredArr&&r.excludedObj.filteredArr[0]&&!0===r.incognito&&chrome.webRequest.onBeforeRequest.addListener(e,{urls:r.excludedObj.filteredArr},["blocking"])}),chrome.storage.onChanged.addListener(function(){chrome.webRequest&&(chrome.webRequest.onBeforeRequest.hasListener(e)&&chrome.webRequest.onBeforeRequest.removeListener(e),chrome.storage.sync.get(["incognito","excludedObj"],function(r){r.excludedObj&&r.excludedObj.filteredArr&&r.excludedObj.filteredArr[0]&&!0===r.incognito&&chrome.webRequest.onBeforeRequest.addListener(e,{urls:r.excludedObj.filteredArr},["blocking"])}))});
},{}]},{},["JlD7"], null)