/*! jQuery v2.2.4 | (c) jQuery Foundation | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=a.document,e=c.slice,f=c.concat,g=c.push,h=c.indexOf,i={},j=i.toString,k=i.hasOwnProperty,l={},m="2.2.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return e.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:e.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a){return n.each(this,a)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(e.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor()},push:g,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){var b=a&&a.toString();return!n.isArray(a)&&b-parseFloat(b)+1>=0},isPlainObject:function(a){var b;if("object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;if(a.constructor&&!k.call(a,"constructor")&&!k.call(a.constructor.prototype||{},"isPrototypeOf"))return!1;for(b in a);return void 0===b||k.call(a,b)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?i[j.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=d.createElement("script"),b.text=a,d.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b){var c,d=0;if(s(a)){for(c=a.length;c>d;d++)if(b.call(a[d],d,a[d])===!1)break}else for(d in a)if(b.call(a[d],d,a[d])===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):g.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:h.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,e,g=0,h=[];if(s(a))for(d=a.length;d>g;g++)e=b(a[g],g,c),null!=e&&h.push(e);else for(g in a)e=b(a[g],g,c),null!=e&&h.push(e);return f.apply([],h)},guid:1,proxy:function(a,b){var c,d,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(d=e.call(arguments,2),f=function(){return a.apply(b||this,d.concat(e.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:l}),"function"==typeof Symbol&&(n.fn[Symbol.iterator]=c[Symbol.iterator]),n.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(a,b){i["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=!!a&&"length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ga(),z=ga(),A=ga(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+M+"))|)"+L+"*\\]",O=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+N+")*)|.*)\\)|)",P=new RegExp(L+"+","g"),Q=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),R=new RegExp("^"+L+"*,"+L+"*"),S=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),T=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),U=new RegExp(O),V=new RegExp("^"+M+"$"),W={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M+"|[*])"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},X=/^(?:input|select|textarea|button)$/i,Y=/^h\d$/i,Z=/^[^{]+\{\s*\[native \w/,$=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,_=/[+~]/,aa=/'|\\/g,ba=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),ca=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},da=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(ea){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function fa(a,b,d,e){var f,h,j,k,l,o,r,s,w=b&&b.ownerDocument,x=b?b.nodeType:9;if(d=d||[],"string"!=typeof a||!a||1!==x&&9!==x&&11!==x)return d;if(!e&&((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,p)){if(11!==x&&(o=$.exec(a)))if(f=o[1]){if(9===x){if(!(j=b.getElementById(f)))return d;if(j.id===f)return d.push(j),d}else if(w&&(j=w.getElementById(f))&&t(b,j)&&j.id===f)return d.push(j),d}else{if(o[2])return H.apply(d,b.getElementsByTagName(a)),d;if((f=o[3])&&c.getElementsByClassName&&b.getElementsByClassName)return H.apply(d,b.getElementsByClassName(f)),d}if(c.qsa&&!A[a+" "]&&(!q||!q.test(a))){if(1!==x)w=b,s=a;else if("object"!==b.nodeName.toLowerCase()){(k=b.getAttribute("id"))?k=k.replace(aa,"\\$&"):b.setAttribute("id",k=u),r=g(a),h=r.length,l=V.test(k)?"#"+k:"[id='"+k+"']";while(h--)r[h]=l+" "+qa(r[h]);s=r.join(","),w=_.test(a)&&oa(b.parentNode)||b}if(s)try{return H.apply(d,w.querySelectorAll(s)),d}catch(y){}finally{k===u&&b.removeAttribute("id")}}}return i(a.replace(Q,"$1"),b,d,e)}function ga(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ha(a){return a[u]=!0,a}function ia(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ja(a,b){var c=a.split("|"),e=c.length;while(e--)d.attrHandle[c[e]]=b}function ka(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function la(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function na(a){return ha(function(b){return b=+b,ha(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function oa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=fa.support={},f=fa.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=fa.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=n.documentElement,p=!f(n),(e=n.defaultView)&&e.top!==e&&(e.addEventListener?e.addEventListener("unload",da,!1):e.attachEvent&&e.attachEvent("onunload",da)),c.attributes=ia(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ia(function(a){return a.appendChild(n.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Z.test(n.getElementsByClassName),c.getById=ia(function(a){return o.appendChild(a).id=u,!n.getElementsByName||!n.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ba,ca);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return"undefined"!=typeof b.getElementsByClassName&&p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=Z.test(n.querySelectorAll))&&(ia(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\r\\' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ia(function(a){var b=n.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=Z.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ia(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",O)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=Z.test(o.compareDocumentPosition),t=b||Z.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===n||a.ownerDocument===v&&t(v,a)?-1:b===n||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,g=[a],h=[b];if(!e||!f)return a===n?-1:b===n?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return ka(a,b);c=a;while(c=c.parentNode)g.unshift(c);c=b;while(c=c.parentNode)h.unshift(c);while(g[d]===h[d])d++;return d?ka(g[d],h[d]):g[d]===v?-1:h[d]===v?1:0},n):n},fa.matches=function(a,b){return fa(a,null,null,b)},fa.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(T,"='$1']"),c.matchesSelector&&p&&!A[b+" "]&&(!r||!r.test(b))&&(!q||!q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return fa(b,n,null,[a]).length>0},fa.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},fa.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},fa.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},fa.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=fa.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=fa.selectors={cacheLength:50,createPseudo:ha,match:W,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ba,ca),a[3]=(a[3]||a[4]||a[5]||"").replace(ba,ca),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||fa.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&fa.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return W.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&U.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ba,ca).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=fa.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(P," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h,t=!1;if(q){if(f){while(p){m=b;while(m=m[p])if(h?m.nodeName.toLowerCase()===r:1===m.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){m=q,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n&&j[2],m=n&&q.childNodes[n];while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if(1===m.nodeType&&++t&&m===b){k[a]=[w,n,t];break}}else if(s&&(m=b,l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),j=k[a]||[],n=j[0]===w&&j[1],t=n),t===!1)while(m=++n&&m&&m[p]||(t=n=0)||o.pop())if((h?m.nodeName.toLowerCase()===r:1===m.nodeType)&&++t&&(s&&(l=m[u]||(m[u]={}),k=l[m.uniqueID]||(l[m.uniqueID]={}),k[a]=[w,t]),m===b))break;return t-=e,t===d||t%d===0&&t/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||fa.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ha(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ha(function(a){var b=[],c=[],d=h(a.replace(Q,"$1"));return d[u]?ha(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ha(function(a){return function(b){return fa(a,b).length>0}}),contains:ha(function(a){return a=a.replace(ba,ca),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ha(function(a){return V.test(a||"")||fa.error("unsupported lang: "+a),a=a.replace(ba,ca).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Y.test(a.nodeName)},input:function(a){return X.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:na(function(){return[0]}),last:na(function(a,b){return[b-1]}),eq:na(function(a,b,c){return[0>c?c+b:c]}),even:na(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:na(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:na(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:na(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=la(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=ma(b);function pa(){}pa.prototype=d.filters=d.pseudos,d.setFilters=new pa,g=fa.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){c&&!(e=R.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=S.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(Q," ")}),h=h.slice(c.length));for(g in d.filter)!(e=W[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?fa.error(a):z(a,i).slice(0)};function qa(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function ra(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j,k=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(j=b[u]||(b[u]={}),i=j[b.uniqueID]||(j[b.uniqueID]={}),(h=i[d])&&h[0]===w&&h[1]===f)return k[2]=h[2];if(i[d]=k,k[2]=a(b,c,g))return!0}}}function sa(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ta(a,b,c){for(var d=0,e=b.length;e>d;d++)fa(a,b[d],c);return c}function ua(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function va(a,b,c,d,e,f){return d&&!d[u]&&(d=va(d)),e&&!e[u]&&(e=va(e,f)),ha(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ta(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:ua(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=ua(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=ua(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function wa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=ra(function(a){return a===b},h,!0),l=ra(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[ra(sa(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return va(i>1&&sa(m),i>1&&qa(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(Q,"$1"),c,e>i&&wa(a.slice(i,e)),f>e&&wa(a=a.slice(e)),f>e&&qa(a))}m.push(c)}return sa(m)}function xa(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,o,q,r=0,s="0",t=f&&[],u=[],v=j,x=f||e&&d.find.TAG("*",k),y=w+=null==v?1:Math.random()||.1,z=x.length;for(k&&(j=g===n||g||k);s!==z&&null!=(l=x[s]);s++){if(e&&l){o=0,g||l.ownerDocument===n||(m(l),h=!p);while(q=a[o++])if(q(l,g||n,h)){i.push(l);break}k&&(w=y)}c&&((l=!q&&l)&&r--,f&&t.push(l))}if(r+=s,c&&s!==r){o=0;while(q=b[o++])q(t,u,g,h);if(f){if(r>0)while(s--)t[s]||u[s]||(u[s]=F.call(i));u=ua(u)}H.apply(i,u),k&&!f&&u.length>0&&r+b.length>1&&fa.uniqueSort(i)}return k&&(w=y,j=v),t};return c?ha(f):f}return h=fa.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=wa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,xa(e,d)),f.selector=a}return f},i=fa.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ba,ca),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=W.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ba,ca),_.test(j[0].type)&&oa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&qa(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,!b||_.test(a)&&oa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ia(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ia(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ja("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ia(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ja("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ia(function(a){return null==a.getAttribute("disabled")})||ja(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),fa}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.uniqueSort=n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},v=function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c},w=n.expr.match.needsContext,x=/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,y=/^.[^:#\[\.,]*$/;function z(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(y.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return h.call(b,a)>-1!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(z(this,a||[],!1))},not:function(a){return this.pushStack(z(this,a||[],!0))},is:function(a){return!!z(this,"string"==typeof a&&w.test(a)?n(a):a||[],!1).length}});var A,B=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,C=n.fn.init=function(a,b,c){var e,f;if(!a)return this;if(c=c||A,"string"==typeof a){if(e="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:B.exec(a),!e||!e[1]&&b)return!b||b.jquery?(b||c).find(a):this.constructor(b).find(a);if(e[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(e[1],b&&b.nodeType?b.ownerDocument||b:d,!0)),x.test(e[1])&&n.isPlainObject(b))for(e in b)n.isFunction(this[e])?this[e](b[e]):this.attr(e,b[e]);return this}return f=d.getElementById(e[2]),f&&f.parentNode&&(this.length=1,this[0]=f),this.context=d,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?void 0!==c.ready?c.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};C.prototype=n.fn,A=n(d);var D=/^(?:parents|prev(?:Until|All))/,E={children:!0,contents:!0,next:!0,prev:!0};n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=w.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.uniqueSort(f):f)},index:function(a){return a?"string"==typeof a?h.call(n(a),this[0]):h.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.uniqueSort(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function F(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return u(a,"parentNode")},parentsUntil:function(a,b,c){return u(a,"parentNode",c)},next:function(a){return F(a,"nextSibling")},prev:function(a){return F(a,"previousSibling")},nextAll:function(a){return u(a,"nextSibling")},prevAll:function(a){return u(a,"previousSibling")},nextUntil:function(a,b,c){return u(a,"nextSibling",c)},prevUntil:function(a,b,c){return u(a,"previousSibling",c)},siblings:function(a){return v((a.parentNode||{}).firstChild,a)},children:function(a){return v(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(E[a]||n.uniqueSort(e),D.test(a)&&e.reverse()),this.pushStack(e)}});var G=/\S+/g;function H(a){var b={};return n.each(a.match(G)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?H(a):n.extend({},a);var b,c,d,e,f=[],g=[],h=-1,i=function(){for(e=a.once,d=b=!0;g.length;h=-1){c=g.shift();while(++h<f.length)f[h].apply(c[0],c[1])===!1&&a.stopOnFalse&&(h=f.length,c=!1)}a.memory||(c=!1),b=!1,e&&(f=c?[]:"")},j={add:function(){return f&&(c&&!b&&(h=f.length-1,g.push(c)),function d(b){n.each(b,function(b,c){n.isFunction(c)?a.unique&&j.has(c)||f.push(c):c&&c.length&&"string"!==n.type(c)&&d(c)})}(arguments),c&&!b&&i()),this},remove:function(){return n.each(arguments,function(a,b){var c;while((c=n.inArray(b,f,c))>-1)f.splice(c,1),h>=c&&h--}),this},has:function(a){return a?n.inArray(a,f)>-1:f.length>0},empty:function(){return f&&(f=[]),this},disable:function(){return e=g=[],f=c="",this},disabled:function(){return!f},lock:function(){return e=g=[],c||(f=c=""),this},locked:function(){return!!e},fireWith:function(a,c){return e||(c=c||[],c=[a,c.slice?c.slice():c],g.push(c),b||i()),this},fire:function(){return j.fireWith(this,arguments),this},fired:function(){return!!d}};return j},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().progress(c.notify).done(c.resolve).fail(c.reject):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=e.call(arguments),d=c.length,f=1!==d||a&&n.isFunction(a.promise)?d:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(d){b[a]=this,c[a]=arguments.length>1?e.call(arguments):d,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(d>1)for(i=new Array(d),j=new Array(d),k=new Array(d);d>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().progress(h(b,j,i)).done(h(b,k,c)).fail(g.reject):--f;return f||g.resolveWith(k,c),g.promise()}});var I;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(I.resolveWith(d,[n]),n.fn.triggerHandler&&(n(d).triggerHandler("ready"),n(d).off("ready"))))}});function J(){d.removeEventListener("DOMContentLoaded",J),a.removeEventListener("load",J),n.ready()}n.ready.promise=function(b){return I||(I=n.Deferred(),"complete"===d.readyState||"loading"!==d.readyState&&!d.documentElement.doScroll?a.setTimeout(n.ready):(d.addEventListener("DOMContentLoaded",J),a.addEventListener("load",J))),I.promise(b)},n.ready.promise();var K=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)K(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},L=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function M(){this.expando=n.expando+M.uid++}M.uid=1,M.prototype={register:function(a,b){var c=b||{};return a.nodeType?a[this.expando]=c:Object.defineProperty(a,this.expando,{value:c,writable:!0,configurable:!0}),a[this.expando]},cache:function(a){if(!L(a))return{};var b=a[this.expando];return b||(b={},L(a)&&(a.nodeType?a[this.expando]=b:Object.defineProperty(a,this.expando,{value:b,configurable:!0}))),b},set:function(a,b,c){var d,e=this.cache(a);if("string"==typeof b)e[b]=c;else for(d in b)e[d]=b[d];return e},get:function(a,b){return void 0===b?this.cache(a):a[this.expando]&&a[this.expando][b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=a[this.expando];if(void 0!==f){if(void 0===b)this.register(a);else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in f?d=[b,e]:(d=e,d=d in f?[d]:d.match(G)||[])),c=d.length;while(c--)delete f[d[c]]}(void 0===b||n.isEmptyObject(f))&&(a.nodeType?a[this.expando]=void 0:delete a[this.expando])}},hasData:function(a){var b=a[this.expando];return void 0!==b&&!n.isEmptyObject(b)}};var N=new M,O=new M,P=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,Q=/[A-Z]/g;function R(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(Q,"-$&").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:P.test(c)?n.parseJSON(c):c;
}catch(e){}O.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return O.hasData(a)||N.hasData(a)},data:function(a,b,c){return O.access(a,b,c)},removeData:function(a,b){O.remove(a,b)},_data:function(a,b,c){return N.access(a,b,c)},_removeData:function(a,b){N.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=O.get(f),1===f.nodeType&&!N.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),R(f,d,e[d])));N.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){O.set(this,a)}):K(this,function(b){var c,d;if(f&&void 0===b){if(c=O.get(f,a)||O.get(f,a.replace(Q,"-$&").toLowerCase()),void 0!==c)return c;if(d=n.camelCase(a),c=O.get(f,d),void 0!==c)return c;if(c=R(f,d,void 0),void 0!==c)return c}else d=n.camelCase(a),this.each(function(){var c=O.get(this,d);O.set(this,d,b),a.indexOf("-")>-1&&void 0!==c&&O.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){O.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=N.get(a,b),c&&(!d||n.isArray(c)?d=N.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return N.get(a,c)||N.access(a,c,{empty:n.Callbacks("once memory").add(function(){N.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=N.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var S=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=new RegExp("^(?:([+-])=|)("+S+")([a-z%]*)$","i"),U=["Top","Right","Bottom","Left"],V=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)};function W(a,b,c,d){var e,f=1,g=20,h=d?function(){return d.cur()}:function(){return n.css(a,b,"")},i=h(),j=c&&c[3]||(n.cssNumber[b]?"":"px"),k=(n.cssNumber[b]||"px"!==j&&+i)&&T.exec(n.css(a,b));if(k&&k[3]!==j){j=j||k[3],c=c||[],k=+i||1;do f=f||".5",k/=f,n.style(a,b,k+j);while(f!==(f=h()/i)&&1!==f&&--g)}return c&&(k=+k||+i||0,e=c[1]?k+(c[1]+1)*c[2]:+c[2],d&&(d.unit=j,d.start=k,d.end=e)),e}var X=/^(?:checkbox|radio)$/i,Y=/<([\w:-]+)/,Z=/^$|\/(?:java|ecma)script/i,$={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};$.optgroup=$.option,$.tbody=$.tfoot=$.colgroup=$.caption=$.thead,$.th=$.td;function _(a,b){var c="undefined"!=typeof a.getElementsByTagName?a.getElementsByTagName(b||"*"):"undefined"!=typeof a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function aa(a,b){for(var c=0,d=a.length;d>c;c++)N.set(a[c],"globalEval",!b||N.get(b[c],"globalEval"))}var ba=/<|&#?\w+;/;function ca(a,b,c,d,e){for(var f,g,h,i,j,k,l=b.createDocumentFragment(),m=[],o=0,p=a.length;p>o;o++)if(f=a[o],f||0===f)if("object"===n.type(f))n.merge(m,f.nodeType?[f]:f);else if(ba.test(f)){g=g||l.appendChild(b.createElement("div")),h=(Y.exec(f)||["",""])[1].toLowerCase(),i=$[h]||$._default,g.innerHTML=i[1]+n.htmlPrefilter(f)+i[2],k=i[0];while(k--)g=g.lastChild;n.merge(m,g.childNodes),g=l.firstChild,g.textContent=""}else m.push(b.createTextNode(f));l.textContent="",o=0;while(f=m[o++])if(d&&n.inArray(f,d)>-1)e&&e.push(f);else if(j=n.contains(f.ownerDocument,f),g=_(l.appendChild(f),"script"),j&&aa(g),c){k=0;while(f=g[k++])Z.test(f.type||"")&&c.push(f)}return l}!function(){var a=d.createDocumentFragment(),b=a.appendChild(d.createElement("div")),c=d.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var da=/^key/,ea=/^(?:mouse|pointer|contextmenu|drag|drop)|click/,fa=/^([^.]*)(?:\.(.+)|)/;function ga(){return!0}function ha(){return!1}function ia(){try{return d.activeElement}catch(a){}}function ja(a,b,c,d,e,f){var g,h;if("object"==typeof b){"string"!=typeof c&&(d=d||c,c=void 0);for(h in b)ja(a,h,c,d,b[h],f);return a}if(null==d&&null==e?(e=c,d=c=void 0):null==e&&("string"==typeof c?(e=d,d=void 0):(e=d,d=c,c=void 0)),e===!1)e=ha;else if(!e)return a;return 1===f&&(g=e,e=function(a){return n().off(a),g.apply(this,arguments)},e.guid=g.guid||(g.guid=n.guid++)),a.each(function(){n.event.add(this,b,e,d,c)})}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return"undefined"!=typeof n&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(G)||[""],j=b.length;while(j--)h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=N.hasData(a)&&N.get(a);if(r&&(i=r.events)){b=(b||"").match(G)||[""],j=b.length;while(j--)if(h=fa.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&N.remove(a,"handle events")}},dispatch:function(a){a=n.event.fix(a);var b,c,d,f,g,h=[],i=e.call(arguments),j=(N.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())a.rnamespace&&!a.rnamespace.test(g.namespace)||(a.handleObj=g,a.data=g.data,d=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==d&&(a.result=d)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&("click"!==a.type||isNaN(a.button)||a.button<1))for(;i!==this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>-1:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,e,f,g=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||d,e=c.documentElement,f=c.body,a.pageX=b.clientX+(e&&e.scrollLeft||f&&f.scrollLeft||0)-(e&&e.clientLeft||f&&f.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||f&&f.scrollTop||0)-(e&&e.clientTop||f&&f.clientTop||0)),a.which||void 0===g||(a.which=1&g?1:2&g?3:4&g?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,e,f=a.type,g=a,h=this.fixHooks[f];h||(this.fixHooks[f]=h=ea.test(f)?this.mouseHooks:da.test(f)?this.keyHooks:{}),e=h.props?this.props.concat(h.props):this.props,a=new n.Event(g),b=e.length;while(b--)c=e[b],a[c]=g[c];return a.target||(a.target=d),3===a.target.nodeType&&(a.target=a.target.parentNode),h.filter?h.filter(a,g):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==ia()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===ia()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?ga:ha):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={constructor:n.Event,isDefaultPrevented:ha,isPropagationStopped:ha,isImmediatePropagationStopped:ha,isSimulated:!1,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=ga,a&&!this.isSimulated&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=ga,a&&!this.isSimulated&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=ga,a&&!this.isSimulated&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return e&&(e===d||n.contains(d,e))||(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),n.fn.extend({on:function(a,b,c,d){return ja(this,a,b,c,d)},one:function(a,b,c,d){return ja(this,a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return b!==!1&&"function"!=typeof b||(c=b,b=void 0),c===!1&&(c=ha),this.each(function(){n.event.remove(this,a,c,b)})}});var ka=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,la=/<script|<style|<link/i,ma=/checked\s*(?:[^=]|=\s*.checked.)/i,na=/^true\/(.*)/,oa=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function pa(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function qa(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function ra(a){var b=na.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function sa(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(N.hasData(a)&&(f=N.access(a),g=N.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}O.hasData(a)&&(h=O.access(a),i=n.extend({},h),O.set(b,i))}}function ta(a,b){var c=b.nodeName.toLowerCase();"input"===c&&X.test(a.type)?b.checked=a.checked:"input"!==c&&"textarea"!==c||(b.defaultValue=a.defaultValue)}function ua(a,b,c,d){b=f.apply([],b);var e,g,h,i,j,k,m=0,o=a.length,p=o-1,q=b[0],r=n.isFunction(q);if(r||o>1&&"string"==typeof q&&!l.checkClone&&ma.test(q))return a.each(function(e){var f=a.eq(e);r&&(b[0]=q.call(this,e,f.html())),ua(f,b,c,d)});if(o&&(e=ca(b,a[0].ownerDocument,!1,a,d),g=e.firstChild,1===e.childNodes.length&&(e=g),g||d)){for(h=n.map(_(e,"script"),qa),i=h.length;o>m;m++)j=e,m!==p&&(j=n.clone(j,!0,!0),i&&n.merge(h,_(j,"script"))),c.call(a[m],j,m);if(i)for(k=h[h.length-1].ownerDocument,n.map(h,ra),m=0;i>m;m++)j=h[m],Z.test(j.type||"")&&!N.access(j,"globalEval")&&n.contains(k,j)&&(j.src?n._evalUrl&&n._evalUrl(j.src):n.globalEval(j.textContent.replace(oa,"")))}return a}function va(a,b,c){for(var d,e=b?n.filter(b,a):a,f=0;null!=(d=e[f]);f++)c||1!==d.nodeType||n.cleanData(_(d)),d.parentNode&&(c&&n.contains(d.ownerDocument,d)&&aa(_(d,"script")),d.parentNode.removeChild(d));return a}n.extend({htmlPrefilter:function(a){return a.replace(ka,"<$1></$2>")},clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=_(h),f=_(a),d=0,e=f.length;e>d;d++)ta(f[d],g[d]);if(b)if(c)for(f=f||_(a),g=g||_(h),d=0,e=f.length;e>d;d++)sa(f[d],g[d]);else sa(a,h);return g=_(h,"script"),g.length>0&&aa(g,!i&&_(a,"script")),h},cleanData:function(a){for(var b,c,d,e=n.event.special,f=0;void 0!==(c=a[f]);f++)if(L(c)){if(b=c[N.expando]){if(b.events)for(d in b.events)e[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);c[N.expando]=void 0}c[O.expando]&&(c[O.expando]=void 0)}}}),n.fn.extend({domManip:ua,detach:function(a){return va(this,a,!0)},remove:function(a){return va(this,a)},text:function(a){return K(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){1!==this.nodeType&&11!==this.nodeType&&9!==this.nodeType||(this.textContent=a)})},null,a,arguments.length)},append:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.appendChild(a)}})},prepend:function(){return ua(this,arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=pa(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return ua(this,arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(_(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return K(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!la.test(a)&&!$[(Y.exec(a)||["",""])[1].toLowerCase()]){a=n.htmlPrefilter(a);try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(_(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=[];return ua(this,arguments,function(b){var c=this.parentNode;n.inArray(this,a)<0&&(n.cleanData(_(this)),c&&c.replaceChild(b,this))},a)}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),f=e.length-1,h=0;f>=h;h++)c=h===f?this:this.clone(!0),n(e[h])[b](c),g.apply(d,c.get());return this.pushStack(d)}});var wa,xa={HTML:"block",BODY:"block"};function ya(a,b){var c=n(b.createElement(a)).appendTo(b.body),d=n.css(c[0],"display");return c.detach(),d}function za(a){var b=d,c=xa[a];return c||(c=ya(a,b),"none"!==c&&c||(wa=(wa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=wa[0].contentDocument,b.write(),b.close(),c=ya(a,b),wa.detach()),xa[a]=c),c}var Aa=/^margin/,Ba=new RegExp("^("+S+")(?!px)[a-z%]+$","i"),Ca=function(b){var c=b.ownerDocument.defaultView;return c&&c.opener||(c=a),c.getComputedStyle(b)},Da=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},Ea=d.documentElement;!function(){var b,c,e,f,g=d.createElement("div"),h=d.createElement("div");if(h.style){h.style.backgroundClip="content-box",h.cloneNode(!0).style.backgroundClip="",l.clearCloneStyle="content-box"===h.style.backgroundClip,g.style.cssText="border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",g.appendChild(h);function i(){h.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",h.innerHTML="",Ea.appendChild(g);var d=a.getComputedStyle(h);b="1%"!==d.top,f="2px"===d.marginLeft,c="4px"===d.width,h.style.marginRight="50%",e="4px"===d.marginRight,Ea.removeChild(g)}n.extend(l,{pixelPosition:function(){return i(),b},boxSizingReliable:function(){return null==c&&i(),c},pixelMarginRight:function(){return null==c&&i(),e},reliableMarginLeft:function(){return null==c&&i(),f},reliableMarginRight:function(){var b,c=h.appendChild(d.createElement("div"));return c.style.cssText=h.style.cssText="-webkit-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",h.style.width="1px",Ea.appendChild(g),b=!parseFloat(a.getComputedStyle(c).marginRight),Ea.removeChild(g),h.removeChild(c),b}})}}();function Fa(a,b,c){var d,e,f,g,h=a.style;return c=c||Ca(a),g=c?c.getPropertyValue(b)||c[b]:void 0,""!==g&&void 0!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),c&&!l.pixelMarginRight()&&Ba.test(g)&&Aa.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f),void 0!==g?g+"":g}function Ga(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}var Ha=/^(none|table(?!-c[ea]).+)/,Ia={position:"absolute",visibility:"hidden",display:"block"},Ja={letterSpacing:"0",fontWeight:"400"},Ka=["Webkit","O","Moz","ms"],La=d.createElement("div").style;function Ma(a){if(a in La)return a;var b=a[0].toUpperCase()+a.slice(1),c=Ka.length;while(c--)if(a=Ka[c]+b,a in La)return a}function Na(a,b,c){var d=T.exec(b);return d?Math.max(0,d[2]-(c||0))+(d[3]||"px"):b}function Oa(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+U[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+U[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+U[f]+"Width",!0,e))):(g+=n.css(a,"padding"+U[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+U[f]+"Width",!0,e)));return g}function Pa(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=Ca(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=Fa(a,b,f),(0>e||null==e)&&(e=a.style[b]),Ba.test(e))return e;d=g&&(l.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Oa(a,b,c||(g?"border":"content"),d,f)+"px"}function Qa(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=N.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&V(d)&&(f[g]=N.access(d,"olddisplay",za(d.nodeName)))):(e=V(d),"none"===c&&e||N.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=Fa(a,"opacity");return""===c?"1":c}}}},cssNumber:{animationIterationCount:!0,columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=T.exec(c))&&e[1]&&(c=W(a,b,e),f="number"),null!=c&&c===c&&("number"===f&&(c+=e&&e[3]||(n.cssNumber[h]?"":"px")),l.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Ma(h)||h),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=Fa(a,b,d)),"normal"===e&&b in Ja&&(e=Ja[b]),""===c||c?(f=parseFloat(e),c===!0||isFinite(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?Ha.test(n.css(a,"display"))&&0===a.offsetWidth?Da(a,Ia,function(){return Pa(a,b,d)}):Pa(a,b,d):void 0},set:function(a,c,d){var e,f=d&&Ca(a),g=d&&Oa(a,b,d,"border-box"===n.css(a,"boxSizing",!1,f),f);return g&&(e=T.exec(c))&&"px"!==(e[3]||"px")&&(a.style[b]=c,c=n.css(a,b)),Na(a,c,g)}}}),n.cssHooks.marginLeft=Ga(l.reliableMarginLeft,function(a,b){return b?(parseFloat(Fa(a,"marginLeft"))||a.getBoundingClientRect().left-Da(a,{marginLeft:0},function(){return a.getBoundingClientRect().left}))+"px":void 0}),n.cssHooks.marginRight=Ga(l.reliableMarginRight,function(a,b){return b?Da(a,{display:"inline-block"},Fa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+U[d]+b]=f[d]||f[d-2]||f[0];return e}},Aa.test(a)||(n.cssHooks[a+b].set=Na)}),n.fn.extend({css:function(a,b){return K(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=Ca(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Qa(this,!0)},hide:function(){return Qa(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){V(this)?n(this).show():n(this).hide()})}});function Ra(a,b,c,d,e){return new Ra.prototype.init(a,b,c,d,e)}n.Tween=Ra,Ra.prototype={constructor:Ra,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||n.easing._default,this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ra.propHooks[this.prop];return a&&a.get?a.get(this):Ra.propHooks._default.get(this)},run:function(a){var b,c=Ra.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ra.propHooks._default.set(this),this}},Ra.prototype.init.prototype=Ra.prototype,Ra.propHooks={_default:{get:function(a){var b;return 1!==a.elem.nodeType||null!=a.elem[a.prop]&&null==a.elem.style[a.prop]?a.elem[a.prop]:(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0)},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):1!==a.elem.nodeType||null==a.elem.style[n.cssProps[a.prop]]&&!n.cssHooks[a.prop]?a.elem[a.prop]=a.now:n.style(a.elem,a.prop,a.now+a.unit)}}},Ra.propHooks.scrollTop=Ra.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2},_default:"swing"},n.fx=Ra.prototype.init,n.fx.step={};var Sa,Ta,Ua=/^(?:toggle|show|hide)$/,Va=/queueHooks$/;function Wa(){return a.setTimeout(function(){Sa=void 0}),Sa=n.now()}function Xa(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=U[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ya(a,b,c){for(var d,e=(_a.tweeners[b]||[]).concat(_a.tweeners["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Za(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&V(a),q=N.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?N.get(a,"olddisplay")||za(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Ua.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?za(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=N.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;N.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ya(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function $a(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function _a(a,b,c){var d,e,f=0,g=_a.prefilters.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=Sa||Wa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{},easing:n.easing._default},c),originalProperties:b,originalOptions:c,startTime:Sa||Wa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?(h.notifyWith(a,[j,1,0]),h.resolveWith(a,[j,b])):h.rejectWith(a,[j,b]),this}}),k=j.props;for($a(k,j.opts.specialEasing);g>f;f++)if(d=_a.prefilters[f].call(j,a,k,j.opts))return n.isFunction(d.stop)&&(n._queueHooks(j.elem,j.opts.queue).stop=n.proxy(d.stop,d)),d;return n.map(k,Ya,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(_a,{tweeners:{"*":[function(a,b){var c=this.createTween(a,b);return W(c.elem,a,T.exec(b),c),c}]},tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.match(G);for(var c,d=0,e=a.length;e>d;d++)c=a[d],_a.tweeners[c]=_a.tweeners[c]||[],_a.tweeners[c].unshift(b)},prefilters:[Za],prefilter:function(a,b){b?_a.prefilters.unshift(a):_a.prefilters.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,null!=d.queue&&d.queue!==!0||(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(V).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=_a(this,n.extend({},a),f);(e||N.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=N.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Va.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));!b&&c||n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=N.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Xa(b,!0),a,d,e)}}),n.each({slideDown:Xa("show"),slideUp:Xa("hide"),slideToggle:Xa("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(Sa=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),Sa=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ta||(Ta=a.setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){a.clearInterval(Ta),Ta=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(b,c){return b=n.fx?n.fx.speeds[b]||b:b,c=c||"fx",this.queue(c,function(c,d){var e=a.setTimeout(c,b);d.stop=function(){a.clearTimeout(e)}})},function(){var a=d.createElement("input"),b=d.createElement("select"),c=b.appendChild(d.createElement("option"));a.type="checkbox",l.checkOn=""!==a.value,l.optSelected=c.selected,b.disabled=!0,l.optDisabled=!c.disabled,a=d.createElement("input"),a.value="t",a.type="radio",l.radioValue="t"===a.value}();var ab,bb=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return K(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return"undefined"==typeof a.getAttribute?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),e=n.attrHooks[b]||(n.expr.match.bool.test(b)?ab:void 0)),void 0!==c?null===c?void n.removeAttr(a,b):e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:(a.setAttribute(b,c+""),c):e&&"get"in e&&null!==(d=e.get(a,b))?d:(d=n.find.attr(a,b),null==d?void 0:d))},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(G);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)}}),ab={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=bb[b]||n.find.attr;bb[b]=function(a,b,d){var e,f;return d||(f=bb[b],bb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,bb[b]=f),e}});var cb=/^(?:input|select|textarea|button)$/i,db=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return K(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({prop:function(a,b,c){var d,e,f=a.nodeType;if(3!==f&&8!==f&&2!==f)return 1===f&&n.isXMLDoc(a)||(b=n.propFix[b]||b,e=n.propHooks[b]),
void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):cb.test(a.nodeName)||db.test(a.nodeName)&&a.href?0:-1}}},propFix:{"for":"htmlFor","class":"className"}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null},set:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex)}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var eb=/[\t\r\n\f]/g;function fb(a){return a.getAttribute&&a.getAttribute("class")||""}n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,fb(this)))});if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])d.indexOf(" "+f+" ")<0&&(d+=f+" ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},removeClass:function(a){var b,c,d,e,f,g,h,i=0;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,fb(this)))});if(!arguments.length)return this.attr("class","");if("string"==typeof a&&a){b=a.match(G)||[];while(c=this[i++])if(e=fb(c),d=1===c.nodeType&&(" "+e+" ").replace(eb," ")){g=0;while(f=b[g++])while(d.indexOf(" "+f+" ")>-1)d=d.replace(" "+f+" "," ");h=n.trim(d),e!==h&&c.setAttribute("class",h)}}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):n.isFunction(a)?this.each(function(c){n(this).toggleClass(a.call(this,c,fb(this),b),b)}):this.each(function(){var b,d,e,f;if("string"===c){d=0,e=n(this),f=a.match(G)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else void 0!==a&&"boolean"!==c||(b=fb(this),b&&N.set(this,"__className__",b),this.setAttribute&&this.setAttribute("class",b||a===!1?"":N.get(this,"__className__")||""))})},hasClass:function(a){var b,c,d=0;b=" "+a+" ";while(c=this[d++])if(1===c.nodeType&&(" "+fb(c)+" ").replace(eb," ").indexOf(b)>-1)return!0;return!1}});var gb=/\r/g,hb=/[\x20\t\r\n\f]+/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(gb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a)).replace(hb," ")}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],(c.selected||i===e)&&(l.optDisabled?!c.disabled:null===c.getAttribute("disabled"))&&(!c.parentNode.disabled||!n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(n.valHooks.option.get(d),f)>-1)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>-1:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var ib=/^(?:focusinfocus|focusoutblur)$/;n.extend(n.event,{trigger:function(b,c,e,f){var g,h,i,j,l,m,o,p=[e||d],q=k.call(b,"type")?b.type:b,r=k.call(b,"namespace")?b.namespace.split("."):[];if(h=i=e=e||d,3!==e.nodeType&&8!==e.nodeType&&!ib.test(q+n.event.triggered)&&(q.indexOf(".")>-1&&(r=q.split("."),q=r.shift(),r.sort()),l=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=f?2:3,b.namespace=r.join("."),b.rnamespace=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=e),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},f||!o.trigger||o.trigger.apply(e,c)!==!1)){if(!f&&!o.noBubble&&!n.isWindow(e)){for(j=o.delegateType||q,ib.test(j+q)||(h=h.parentNode);h;h=h.parentNode)p.push(h),i=h;i===(e.ownerDocument||d)&&p.push(i.defaultView||i.parentWindow||a)}g=0;while((h=p[g++])&&!b.isPropagationStopped())b.type=g>1?j:o.bindType||q,m=(N.get(h,"events")||{})[b.type]&&N.get(h,"handle"),m&&m.apply(h,c),m=l&&h[l],m&&m.apply&&L(h)&&(b.result=m.apply(h,c),b.result===!1&&b.preventDefault());return b.type=q,f||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!L(e)||l&&n.isFunction(e[q])&&!n.isWindow(e)&&(i=e[l],i&&(e[l]=null),n.event.triggered=q,e[q](),n.event.triggered=void 0,i&&(e[l]=i)),b.result}},simulate:function(a,b,c){var d=n.extend(new n.Event,c,{type:a,isSimulated:!0});n.event.trigger(d,null,b)}}),n.fn.extend({trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}}),l.focusin="onfocusin"in a,l.focusin||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a))};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=N.access(d,b);e||d.addEventListener(a,c,!0),N.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=N.access(d,b)-1;e?N.access(d,b,e):(d.removeEventListener(a,c,!0),N.remove(d,b))}}});var jb=a.location,kb=n.now(),lb=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(b){var c;if(!b||"string"!=typeof b)return null;try{c=(new a.DOMParser).parseFromString(b,"text/xml")}catch(d){c=void 0}return c&&!c.getElementsByTagName("parsererror").length||n.error("Invalid XML: "+b),c};var mb=/#.*$/,nb=/([?&])_=[^&]*/,ob=/^(.*?):[ \t]*([^\r\n]*)$/gm,pb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,qb=/^(?:GET|HEAD)$/,rb=/^\/\//,sb={},tb={},ub="*/".concat("*"),vb=d.createElement("a");vb.href=jb.href;function wb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(G)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function xb(a,b,c,d){var e={},f=a===tb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function yb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function zb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function Ab(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:jb.href,type:"GET",isLocal:pb.test(jb.protocol),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":ub,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/\bxml\b/,html:/\bhtml/,json:/\bjson\b/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?yb(yb(a,n.ajaxSettings),b):yb(n.ajaxSettings,a)},ajaxPrefilter:wb(sb),ajaxTransport:wb(tb),ajax:function(b,c){"object"==typeof b&&(c=b,b=void 0),c=c||{};var e,f,g,h,i,j,k,l,m=n.ajaxSetup({},c),o=m.context||m,p=m.context&&(o.nodeType||o.jquery)?n(o):n.event,q=n.Deferred(),r=n.Callbacks("once memory"),s=m.statusCode||{},t={},u={},v=0,w="canceled",x={readyState:0,getResponseHeader:function(a){var b;if(2===v){if(!h){h={};while(b=ob.exec(g))h[b[1].toLowerCase()]=b[2]}b=h[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===v?g:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return v||(a=u[c]=u[c]||a,t[a]=b),this},overrideMimeType:function(a){return v||(m.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>v)for(b in a)s[b]=[s[b],a[b]];else x.always(a[x.status]);return this},abort:function(a){var b=a||w;return e&&e.abort(b),z(0,b),this}};if(q.promise(x).complete=r.add,x.success=x.done,x.error=x.fail,m.url=((b||m.url||jb.href)+"").replace(mb,"").replace(rb,jb.protocol+"//"),m.type=c.method||c.type||m.method||m.type,m.dataTypes=n.trim(m.dataType||"*").toLowerCase().match(G)||[""],null==m.crossDomain){j=d.createElement("a");try{j.href=m.url,j.href=j.href,m.crossDomain=vb.protocol+"//"+vb.host!=j.protocol+"//"+j.host}catch(y){m.crossDomain=!0}}if(m.data&&m.processData&&"string"!=typeof m.data&&(m.data=n.param(m.data,m.traditional)),xb(sb,m,c,x),2===v)return x;k=n.event&&m.global,k&&0===n.active++&&n.event.trigger("ajaxStart"),m.type=m.type.toUpperCase(),m.hasContent=!qb.test(m.type),f=m.url,m.hasContent||(m.data&&(f=m.url+=(lb.test(f)?"&":"?")+m.data,delete m.data),m.cache===!1&&(m.url=nb.test(f)?f.replace(nb,"$1_="+kb++):f+(lb.test(f)?"&":"?")+"_="+kb++)),m.ifModified&&(n.lastModified[f]&&x.setRequestHeader("If-Modified-Since",n.lastModified[f]),n.etag[f]&&x.setRequestHeader("If-None-Match",n.etag[f])),(m.data&&m.hasContent&&m.contentType!==!1||c.contentType)&&x.setRequestHeader("Content-Type",m.contentType),x.setRequestHeader("Accept",m.dataTypes[0]&&m.accepts[m.dataTypes[0]]?m.accepts[m.dataTypes[0]]+("*"!==m.dataTypes[0]?", "+ub+"; q=0.01":""):m.accepts["*"]);for(l in m.headers)x.setRequestHeader(l,m.headers[l]);if(m.beforeSend&&(m.beforeSend.call(o,x,m)===!1||2===v))return x.abort();w="abort";for(l in{success:1,error:1,complete:1})x[l](m[l]);if(e=xb(tb,m,c,x)){if(x.readyState=1,k&&p.trigger("ajaxSend",[x,m]),2===v)return x;m.async&&m.timeout>0&&(i=a.setTimeout(function(){x.abort("timeout")},m.timeout));try{v=1,e.send(t,z)}catch(y){if(!(2>v))throw y;z(-1,y)}}else z(-1,"No Transport");function z(b,c,d,h){var j,l,t,u,w,y=c;2!==v&&(v=2,i&&a.clearTimeout(i),e=void 0,g=h||"",x.readyState=b>0?4:0,j=b>=200&&300>b||304===b,d&&(u=zb(m,x,d)),u=Ab(m,u,x,j),j?(m.ifModified&&(w=x.getResponseHeader("Last-Modified"),w&&(n.lastModified[f]=w),w=x.getResponseHeader("etag"),w&&(n.etag[f]=w)),204===b||"HEAD"===m.type?y="nocontent":304===b?y="notmodified":(y=u.state,l=u.data,t=u.error,j=!t)):(t=y,!b&&y||(y="error",0>b&&(b=0))),x.status=b,x.statusText=(c||y)+"",j?q.resolveWith(o,[l,y,x]):q.rejectWith(o,[x,y,t]),x.statusCode(s),s=void 0,k&&p.trigger(j?"ajaxSuccess":"ajaxError",[x,m,j?l:t]),r.fireWith(o,[x,y]),k&&(p.trigger("ajaxComplete",[x,m]),--n.active||n.event.trigger("ajaxStop")))}return x},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax(n.extend({url:a,type:b,dataType:e,data:c,success:d},n.isPlainObject(a)&&a))}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return n.isFunction(a)?this.each(function(b){n(this).wrapInner(a.call(this,b))}):this.each(function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return!n.expr.filters.visible(a)},n.expr.filters.visible=function(a){return a.offsetWidth>0||a.offsetHeight>0||a.getClientRects().length>0};var Bb=/%20/g,Cb=/\[\]$/,Db=/\r?\n/g,Eb=/^(?:submit|button|image|reset|file)$/i,Fb=/^(?:input|select|textarea|keygen)/i;function Gb(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||Cb.test(a)?d(a,e):Gb(a+"["+("object"==typeof e&&null!=e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Gb(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Gb(c,a[c],b,e);return d.join("&").replace(Bb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&Fb.test(this.nodeName)&&!Eb.test(a)&&(this.checked||!X.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(Db,"\r\n")}}):{name:b.name,value:c.replace(Db,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new a.XMLHttpRequest}catch(b){}};var Hb={0:200,1223:204},Ib=n.ajaxSettings.xhr();l.cors=!!Ib&&"withCredentials"in Ib,l.ajax=Ib=!!Ib,n.ajaxTransport(function(b){var c,d;return l.cors||Ib&&!b.crossDomain?{send:function(e,f){var g,h=b.xhr();if(h.open(b.type,b.url,b.async,b.username,b.password),b.xhrFields)for(g in b.xhrFields)h[g]=b.xhrFields[g];b.mimeType&&h.overrideMimeType&&h.overrideMimeType(b.mimeType),b.crossDomain||e["X-Requested-With"]||(e["X-Requested-With"]="XMLHttpRequest");for(g in e)h.setRequestHeader(g,e[g]);c=function(a){return function(){c&&(c=d=h.onload=h.onerror=h.onabort=h.onreadystatechange=null,"abort"===a?h.abort():"error"===a?"number"!=typeof h.status?f(0,"error"):f(h.status,h.statusText):f(Hb[h.status]||h.status,h.statusText,"text"!==(h.responseType||"text")||"string"!=typeof h.responseText?{binary:h.response}:{text:h.responseText},h.getAllResponseHeaders()))}},h.onload=c(),d=h.onerror=c("error"),void 0!==h.onabort?h.onabort=d:h.onreadystatechange=function(){4===h.readyState&&a.setTimeout(function(){c&&d()})},c=c("abort");try{h.send(b.hasContent&&b.data||null)}catch(i){if(c)throw i}},abort:function(){c&&c()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/\b(?:java|ecma)script\b/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(e,f){b=n("<script>").prop({charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&f("error"===a.type?404:200,a.type)}),d.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Jb=[],Kb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Jb.pop()||n.expando+"_"+kb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Kb.test(b.url)?"url":"string"==typeof b.data&&0===(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Kb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Kb,"$1"+e):b.jsonp!==!1&&(b.url+=(lb.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){void 0===f?n(a).removeProp(e):a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Jb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||d;var e=x.exec(a),f=!c&&[];return e?[b.createElement(e[1])]:(e=ca([a],b,f),f&&f.length&&n(f).remove(),n.merge([],e.childNodes))};var Lb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Lb)return Lb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>-1&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e||"GET",dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).always(c&&function(a,b){g.each(function(){c.apply(this,f||[a.responseText,b,a])})}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};function Mb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,n.extend({},h))),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(e=d.getBoundingClientRect(),c=Mb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent;while(a&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ea})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(a,b){var c="pageYOffset"===b;n.fn[a]=function(d){return K(this,function(a,d,e){var f=Mb(a);return void 0===e?f?f[b]:a[d]:void(f?f.scrollTo(c?f.pageXOffset:e,c?e:f.pageYOffset):a[d]=e)},a,d,arguments.length)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=Ga(l.pixelPosition,function(a,c){return c?(c=Fa(a,b),Ba.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return K(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.extend({bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)},size:function(){return this.length}}),n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Nb=a.jQuery,Ob=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Ob),b&&a.jQuery===n&&(a.jQuery=Nb),n},b||(a.jQuery=a.$=n),n});

/*!
 * Bootstrap v3.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");!function(t){"use strict";var e=jQuery.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||3<e[0])throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(),function(n){"use strict";n.fn.emulateTransitionEnd=function(t){var e=!1,i=this;n(this).one("bsTransitionEnd",function(){e=!0});return setTimeout(function(){e||n(i).trigger(n.support.transition.end)},t),this},n(function(){n.support.transition=function o(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(t.style[i]!==undefined)return{end:e[i]};return!1}(),n.support.transition&&(n.event.special.bsTransitionEnd={bindType:n.support.transition.end,delegateType:n.support.transition.end,handle:function(t){if(n(t.target).is(this))return t.handleObj.handler.apply(this,arguments)}})})}(jQuery),function(s){"use strict";var e='[data-dismiss="alert"]',a=function(t){s(t).on("click",e,this.close)};a.VERSION="3.4.1",a.TRANSITION_DURATION=150,a.prototype.close=function(t){var e=s(this),i=e.attr("data-target");i||(i=(i=e.attr("href"))&&i.replace(/.*(?=#[^\s]*$)/,"")),i="#"===i?[]:i;var o=s(document).find(i);function n(){o.detach().trigger("closed.bs.alert").remove()}t&&t.preventDefault(),o.length||(o=e.closest(".alert")),o.trigger(t=s.Event("close.bs.alert")),t.isDefaultPrevented()||(o.removeClass("in"),s.support.transition&&o.hasClass("fade")?o.one("bsTransitionEnd",n).emulateTransitionEnd(a.TRANSITION_DURATION):n())};var t=s.fn.alert;s.fn.alert=function o(i){return this.each(function(){var t=s(this),e=t.data("bs.alert");e||t.data("bs.alert",e=new a(this)),"string"==typeof i&&e[i].call(t)})},s.fn.alert.Constructor=a,s.fn.alert.noConflict=function(){return s.fn.alert=t,this},s(document).on("click.bs.alert.data-api",e,a.prototype.close)}(jQuery),function(s){"use strict";var n=function(t,e){this.$element=s(t),this.options=s.extend({},n.DEFAULTS,e),this.isLoading=!1};function i(o){return this.each(function(){var t=s(this),e=t.data("bs.button"),i="object"==typeof o&&o;e||t.data("bs.button",e=new n(this,i)),"toggle"==o?e.toggle():o&&e.setState(o)})}n.VERSION="3.4.1",n.DEFAULTS={loadingText:"loading..."},n.prototype.setState=function(t){var e="disabled",i=this.$element,o=i.is("input")?"val":"html",n=i.data();t+="Text",null==n.resetText&&i.data("resetText",i[o]()),setTimeout(s.proxy(function(){i[o](null==n[t]?this.options[t]:n[t]),"loadingText"==t?(this.isLoading=!0,i.addClass(e).attr(e,e).prop(e,!0)):this.isLoading&&(this.isLoading=!1,i.removeClass(e).removeAttr(e).prop(e,!1))},this),0)},n.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var i=this.$element.find("input");"radio"==i.prop("type")?(i.prop("checked")&&(t=!1),e.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==i.prop("type")&&(i.prop("checked")!==this.$element.hasClass("active")&&(t=!1),this.$element.toggleClass("active")),i.prop("checked",this.$element.hasClass("active")),t&&i.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var t=s.fn.button;s.fn.button=i,s.fn.button.Constructor=n,s.fn.button.noConflict=function(){return s.fn.button=t,this},s(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(t){var e=s(t.target).closest(".btn");i.call(e,"toggle"),s(t.target).is('input[type="radio"], input[type="checkbox"]')||(t.preventDefault(),e.is("input,button")?e.trigger("focus"):e.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(t){s(t.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(t.type))})}(jQuery),function(p){"use strict";var c=function(t,e){this.$element=p(t),this.$indicators=this.$element.find(".carousel-indicators"),this.options=e,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",p.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",p.proxy(this.pause,this)).on("mouseleave.bs.carousel",p.proxy(this.cycle,this))};function r(n){return this.each(function(){var t=p(this),e=t.data("bs.carousel"),i=p.extend({},c.DEFAULTS,t.data(),"object"==typeof n&&n),o="string"==typeof n?n:i.slide;e||t.data("bs.carousel",e=new c(this,i)),"number"==typeof n?e.to(n):o?e[o]():i.interval&&e.pause().cycle()})}c.VERSION="3.4.1",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},c.prototype.cycle=function(t){return t||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(p.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},c.prototype.getItemForDirection=function(t,e){var i=this.getItemIndex(e);if(("prev"==t&&0===i||"next"==t&&i==this.$items.length-1)&&!this.options.wrap)return e;var o=(i+("prev"==t?-1:1))%this.$items.length;return this.$items.eq(o)},c.prototype.to=function(t){var e=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(t>this.$items.length-1||t<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):i==t?this.pause().cycle():this.slide(i<t?"next":"prev",this.$items.eq(t))},c.prototype.pause=function(t){return t||(this.paused=!0),this.$element.find(".next, .prev").length&&p.support.transition&&(this.$element.trigger(p.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(t,e){var i=this.$element.find(".item.active"),o=e||this.getItemForDirection(t,i),n=this.interval,s="next"==t?"left":"right",a=this;if(o.hasClass("active"))return this.sliding=!1;var r=o[0],l=p.Event("slide.bs.carousel",{relatedTarget:r,direction:s});if(this.$element.trigger(l),!l.isDefaultPrevented()){if(this.sliding=!0,n&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var h=p(this.$indicators.children()[this.getItemIndex(o)]);h&&h.addClass("active")}var d=p.Event("slid.bs.carousel",{relatedTarget:r,direction:s});return p.support.transition&&this.$element.hasClass("slide")?(o.addClass(t),"object"==typeof o&&o.length&&o[0].offsetWidth,i.addClass(s),o.addClass(s),i.one("bsTransitionEnd",function(){o.removeClass([t,s].join(" ")).addClass("active"),i.removeClass(["active",s].join(" ")),a.sliding=!1,setTimeout(function(){a.$element.trigger(d)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(i.removeClass("active"),o.addClass("active"),this.sliding=!1,this.$element.trigger(d)),n&&this.cycle(),this}};var t=p.fn.carousel;p.fn.carousel=r,p.fn.carousel.Constructor=c,p.fn.carousel.noConflict=function(){return p.fn.carousel=t,this};var e=function(t){var e=p(this),i=e.attr("href");i&&(i=i.replace(/.*(?=#[^\s]+$)/,""));var o=e.attr("data-target")||i,n=p(document).find(o);if(n.hasClass("carousel")){var s=p.extend({},n.data(),e.data()),a=e.attr("data-slide-to");a&&(s.interval=!1),r.call(n,s),a&&n.data("bs.carousel").to(a),t.preventDefault()}};p(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),p(window).on("load",function(){p('[data-ride="carousel"]').each(function(){var t=p(this);r.call(t,t.data())})})}(jQuery),function(a){"use strict";var r=function(t,e){this.$element=a(t),this.options=a.extend({},r.DEFAULTS,e),this.$trigger=a('[data-toggle="collapse"][href="#'+t.id+'"],[data-toggle="collapse"][data-target="#'+t.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};function n(t){var e,i=t.attr("data-target")||(e=t.attr("href"))&&e.replace(/.*(?=#[^\s]+$)/,"");return a(document).find(i)}function l(o){return this.each(function(){var t=a(this),e=t.data("bs.collapse"),i=a.extend({},r.DEFAULTS,t.data(),"object"==typeof o&&o);!e&&i.toggle&&/show|hide/.test(o)&&(i.toggle=!1),e||t.data("bs.collapse",e=new r(this,i)),"string"==typeof o&&e[o]()})}r.VERSION="3.4.1",r.TRANSITION_DURATION=350,r.DEFAULTS={toggle:!0},r.prototype.dimension=function(){return this.$element.hasClass("width")?"width":"height"},r.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var t,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(t=e.data("bs.collapse"))&&t.transitioning)){var i=a.Event("show.bs.collapse");if(this.$element.trigger(i),!i.isDefaultPrevented()){e&&e.length&&(l.call(e,"hide"),t||e.data("bs.collapse",null));var o=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[o](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var n=function(){this.$element.removeClass("collapsing").addClass("collapse in")[o](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return n.call(this);var s=a.camelCase(["scroll",o].join("-"));this.$element.one("bsTransitionEnd",a.proxy(n,this)).emulateTransitionEnd(r.TRANSITION_DURATION)[o](this.$element[0][s])}}}},r.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var t=a.Event("hide.bs.collapse");if(this.$element.trigger(t),!t.isDefaultPrevented()){var e=this.dimension();this.$element[e](this.$element[e]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var i=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};if(!a.support.transition)return i.call(this);this.$element[e](0).one("bsTransitionEnd",a.proxy(i,this)).emulateTransitionEnd(r.TRANSITION_DURATION)}}},r.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},r.prototype.getParent=function(){return a(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(t,e){var i=a(e);this.addAriaAndCollapsedClass(n(i),i)},this)).end()},r.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in");t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)};var t=a.fn.collapse;a.fn.collapse=l,a.fn.collapse.Constructor=r,a.fn.collapse.noConflict=function(){return a.fn.collapse=t,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(t){var e=a(this);e.attr("data-target")||t.preventDefault();var i=n(e),o=i.data("bs.collapse")?"toggle":e.data();l.call(i,o)})}(jQuery),function(a){"use strict";var r='[data-toggle="dropdown"]',o=function(t){a(t).on("click.bs.dropdown",this.toggle)};function l(t){var e=t.attr("data-target");e||(e=(e=t.attr("href"))&&/#[A-Za-z]/.test(e)&&e.replace(/.*(?=#[^\s]*$)/,""));var i="#"!==e?a(document).find(e):null;return i&&i.length?i:t.parent()}function s(o){o&&3===o.which||(a(".dropdown-backdrop").remove(),a(r).each(function(){var t=a(this),e=l(t),i={relatedTarget:this};e.hasClass("open")&&(o&&"click"==o.type&&/input|textarea/i.test(o.target.tagName)&&a.contains(e[0],o.target)||(e.trigger(o=a.Event("hide.bs.dropdown",i)),o.isDefaultPrevented()||(t.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",i)))))}))}o.VERSION="3.4.1",o.prototype.toggle=function(t){var e=a(this);if(!e.is(".disabled, :disabled")){var i=l(e),o=i.hasClass("open");if(s(),!o){"ontouchstart"in document.documentElement&&!i.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",s);var n={relatedTarget:this};if(i.trigger(t=a.Event("show.bs.dropdown",n)),t.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),i.toggleClass("open").trigger(a.Event("shown.bs.dropdown",n))}return!1}},o.prototype.keydown=function(t){if(/(38|40|27|32)/.test(t.which)&&!/input|textarea/i.test(t.target.tagName)){var e=a(this);if(t.preventDefault(),t.stopPropagation(),!e.is(".disabled, :disabled")){var i=l(e),o=i.hasClass("open");if(!o&&27!=t.which||o&&27==t.which)return 27==t.which&&i.find(r).trigger("focus"),e.trigger("click");var n=i.find(".dropdown-menu li:not(.disabled):visible a");if(n.length){var s=n.index(t.target);38==t.which&&0<s&&s--,40==t.which&&s<n.length-1&&s++,~s||(s=0),n.eq(s).trigger("focus")}}}};var t=a.fn.dropdown;a.fn.dropdown=function e(i){return this.each(function(){var t=a(this),e=t.data("bs.dropdown");e||t.data("bs.dropdown",e=new o(this)),"string"==typeof i&&e[i].call(t)})},a.fn.dropdown.Constructor=o,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=t,this},a(document).on("click.bs.dropdown.data-api",s).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",r,o.prototype.toggle).on("keydown.bs.dropdown.data-api",r,o.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",o.prototype.keydown)}(jQuery),function(a){"use strict";var s=function(t,e){this.options=e,this.$body=a(document.body),this.$element=a(t),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.fixedContent=".navbar-fixed-top, .navbar-fixed-bottom",this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};function r(o,n){return this.each(function(){var t=a(this),e=t.data("bs.modal"),i=a.extend({},s.DEFAULTS,t.data(),"object"==typeof o&&o);e||t.data("bs.modal",e=new s(this,i)),"string"==typeof o?e[o](n):i.show&&e.show(n)})}s.VERSION="3.4.1",s.TRANSITION_DURATION=300,s.BACKDROP_TRANSITION_DURATION=150,s.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},s.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},s.prototype.show=function(i){var o=this,t=a.Event("show.bs.modal",{relatedTarget:i});this.$element.trigger(t),this.isShown||t.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){o.$element.one("mouseup.dismiss.bs.modal",function(t){a(t.target).is(o.$element)&&(o.ignoreBackdropClick=!0)})}),this.backdrop(function(){var t=a.support.transition&&o.$element.hasClass("fade");o.$element.parent().length||o.$element.appendTo(o.$body),o.$element.show().scrollTop(0),o.adjustDialog(),t&&o.$element[0].offsetWidth,o.$element.addClass("in"),o.enforceFocus();var e=a.Event("shown.bs.modal",{relatedTarget:i});t?o.$dialog.one("bsTransitionEnd",function(){o.$element.trigger("focus").trigger(e)}).emulateTransitionEnd(s.TRANSITION_DURATION):o.$element.trigger("focus").trigger(e)}))},s.prototype.hide=function(t){t&&t.preventDefault(),t=a.Event("hide.bs.modal"),this.$element.trigger(t),this.isShown&&!t.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(s.TRANSITION_DURATION):this.hideModal())},s.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},s.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},s.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},s.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},s.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},s.prototype.backdrop=function(t){var e=this,i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var o=a.support.transition&&i;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+i).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(t){this.ignoreBackdropClick?this.ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide())},this)),o&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!t)return;o?this.$backdrop.one("bsTransitionEnd",t).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION):t()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var n=function(){e.removeBackdrop(),t&&t()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",n).emulateTransitionEnd(s.BACKDROP_TRANSITION_DURATION):n()}else t&&t()},s.prototype.handleUpdate=function(){this.adjustDialog()},s.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},s.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},s.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},s.prototype.setScrollbar=function(){var t=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"";var n=this.scrollbarWidth;this.bodyIsOverflowing&&(this.$body.css("padding-right",t+n),a(this.fixedContent).each(function(t,e){var i=e.style.paddingRight,o=a(e).css("padding-right");a(e).data("padding-right",i).css("padding-right",parseFloat(o)+n+"px")}))},s.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad),a(this.fixedContent).each(function(t,e){var i=a(e).data("padding-right");a(e).removeData("padding-right"),e.style.paddingRight=i||""})},s.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var t=a.fn.modal;a.fn.modal=r,a.fn.modal.Constructor=s,a.fn.modal.noConflict=function(){return a.fn.modal=t,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(t){var e=a(this),i=e.attr("href"),o=e.attr("data-target")||i&&i.replace(/.*(?=#[^\s]+$)/,""),n=a(document).find(o),s=n.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(i)&&i},n.data(),e.data());e.is("a")&&t.preventDefault(),n.one("show.bs.modal",function(t){t.isDefaultPrevented()||n.one("hidden.bs.modal",function(){e.is(":visible")&&e.trigger("focus")})}),r.call(n,s,this)})}(jQuery),function(g){"use strict";var o=["sanitize","whiteList","sanitizeFn"],a=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],t={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},r=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,l=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;function u(t,e){var i=t.nodeName.toLowerCase();if(-1!==g.inArray(i,e))return-1===g.inArray(i,a)||Boolean(t.nodeValue.match(r)||t.nodeValue.match(l));for(var o=g(e).filter(function(t,e){return e instanceof RegExp}),n=0,s=o.length;n<s;n++)if(i.match(o[n]))return!0;return!1}function n(t,e,i){if(0===t.length)return t;if(i&&"function"==typeof i)return i(t);if(!document.implementation||!document.implementation.createHTMLDocument)return t;var o=document.implementation.createHTMLDocument("sanitization");o.body.innerHTML=t;for(var n=g.map(e,function(t,e){return e}),s=g(o.body).find("*"),a=0,r=s.length;a<r;a++){var l=s[a],h=l.nodeName.toLowerCase();if(-1!==g.inArray(h,n))for(var d=g.map(l.attributes,function(t){return t}),p=[].concat(e["*"]||[],e[h]||[]),c=0,f=d.length;c<f;c++)u(d[c],p)||l.removeAttribute(d[c].nodeName);else l.parentNode.removeChild(l)}return o.body.innerHTML}var m=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};m.VERSION="3.4.1",m.TRANSITION_DURATION=150,m.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0},sanitize:!0,sanitizeFn:null,whiteList:t},m.prototype.init=function(t,e,i){if(this.enabled=!0,this.type=t,this.$element=g(e),this.options=this.getOptions(i),this.$viewport=this.options.viewport&&g(document).find(g.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var o=this.options.trigger.split(" "),n=o.length;n--;){var s=o[n];if("click"==s)this.$element.on("click."+this.type,this.options.selector,g.proxy(this.toggle,this));else if("manual"!=s){var a="hover"==s?"mouseenter":"focusin",r="hover"==s?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,g.proxy(this.enter,this)),this.$element.on(r+"."+this.type,this.options.selector,g.proxy(this.leave,this))}}this.options.selector?this._options=g.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},m.prototype.getDefaults=function(){return m.DEFAULTS},m.prototype.getOptions=function(t){var e=this.$element.data();for(var i in e)e.hasOwnProperty(i)&&-1!==g.inArray(i,o)&&delete e[i];return(t=g.extend({},this.getDefaults(),e,t)).delay&&"number"==typeof t.delay&&(t.delay={show:t.delay,hide:t.delay}),t.sanitize&&(t.template=n(t.template,t.whiteList,t.sanitizeFn)),t},m.prototype.getDelegateOptions=function(){var i={},o=this.getDefaults();return this._options&&g.each(this._options,function(t,e){o[t]!=e&&(i[t]=e)}),i},m.prototype.enter=function(t){var e=t instanceof this.constructor?t:g(t.currentTarget).data("bs."+this.type);if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e)),t instanceof g.Event&&(e.inState["focusin"==t.type?"focus":"hover"]=!0),e.tip().hasClass("in")||"in"==e.hoverState)e.hoverState="in";else{if(clearTimeout(e.timeout),e.hoverState="in",!e.options.delay||!e.options.delay.show)return e.show();e.timeout=setTimeout(function(){"in"==e.hoverState&&e.show()},e.options.delay.show)}},m.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},m.prototype.leave=function(t){var e=t instanceof this.constructor?t:g(t.currentTarget).data("bs."+this.type);if(e||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e)),t instanceof g.Event&&(e.inState["focusout"==t.type?"focus":"hover"]=!1),!e.isInStateTrue()){if(clearTimeout(e.timeout),e.hoverState="out",!e.options.delay||!e.options.delay.hide)return e.hide();e.timeout=setTimeout(function(){"out"==e.hoverState&&e.hide()},e.options.delay.hide)}},m.prototype.show=function(){var t=g.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(t);var e=g.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(t.isDefaultPrevented()||!e)return;var i=this,o=this.tip(),n=this.getUID(this.type);this.setContent(),o.attr("id",n),this.$element.attr("aria-describedby",n),this.options.animation&&o.addClass("fade");var s="function"==typeof this.options.placement?this.options.placement.call(this,o[0],this.$element[0]):this.options.placement,a=/\s?auto?\s?/i,r=a.test(s);r&&(s=s.replace(a,"")||"top"),o.detach().css({top:0,left:0,display:"block"}).addClass(s).data("bs."+this.type,this),this.options.container?o.appendTo(g(document).find(this.options.container)):o.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var l=this.getPosition(),h=o[0].offsetWidth,d=o[0].offsetHeight;if(r){var p=s,c=this.getPosition(this.$viewport);s="bottom"==s&&l.bottom+d>c.bottom?"top":"top"==s&&l.top-d<c.top?"bottom":"right"==s&&l.right+h>c.width?"left":"left"==s&&l.left-h<c.left?"right":s,o.removeClass(p).addClass(s)}var f=this.getCalculatedOffset(s,l,h,d);this.applyPlacement(f,s);var u=function(){var t=i.hoverState;i.$element.trigger("shown.bs."+i.type),i.hoverState=null,"out"==t&&i.leave(i)};g.support.transition&&this.$tip.hasClass("fade")?o.one("bsTransitionEnd",u).emulateTransitionEnd(m.TRANSITION_DURATION):u()}},m.prototype.applyPlacement=function(t,e){var i=this.tip(),o=i[0].offsetWidth,n=i[0].offsetHeight,s=parseInt(i.css("margin-top"),10),a=parseInt(i.css("margin-left"),10);isNaN(s)&&(s=0),isNaN(a)&&(a=0),t.top+=s,t.left+=a,g.offset.setOffset(i[0],g.extend({using:function(t){i.css({top:Math.round(t.top),left:Math.round(t.left)})}},t),0),i.addClass("in");var r=i[0].offsetWidth,l=i[0].offsetHeight;"top"==e&&l!=n&&(t.top=t.top+n-l);var h=this.getViewportAdjustedDelta(e,t,r,l);h.left?t.left+=h.left:t.top+=h.top;var d=/top|bottom/.test(e),p=d?2*h.left-o+r:2*h.top-n+l,c=d?"offsetWidth":"offsetHeight";i.offset(t),this.replaceArrow(p,i[0][c],d)},m.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},m.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();this.options.html?(this.options.sanitize&&(e=n(e,this.options.whiteList,this.options.sanitizeFn)),t.find(".tooltip-inner").html(e)):t.find(".tooltip-inner").text(e),t.removeClass("fade in top bottom left right")},m.prototype.hide=function(t){var e=this,i=g(this.$tip),o=g.Event("hide.bs."+this.type);function n(){"in"!=e.hoverState&&i.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),t&&t()}if(this.$element.trigger(o),!o.isDefaultPrevented())return i.removeClass("in"),g.support.transition&&i.hasClass("fade")?i.one("bsTransitionEnd",n).emulateTransitionEnd(m.TRANSITION_DURATION):n(),this.hoverState=null,this},m.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},m.prototype.hasContent=function(){return this.getTitle()},m.prototype.getPosition=function(t){var e=(t=t||this.$element)[0],i="BODY"==e.tagName,o=e.getBoundingClientRect();null==o.width&&(o=g.extend({},o,{width:o.right-o.left,height:o.bottom-o.top}));var n=window.SVGElement&&e instanceof window.SVGElement,s=i?{top:0,left:0}:n?null:t.offset(),a={scroll:i?document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop()},r=i?{width:g(window).width(),height:g(window).height()}:null;return g.extend({},o,a,r,s)},m.prototype.getCalculatedOffset=function(t,e,i,o){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-o,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-o/2,left:e.left-i}:{top:e.top+e.height/2-o/2,left:e.left+e.width}},m.prototype.getViewportAdjustedDelta=function(t,e,i,o){var n={top:0,left:0};if(!this.$viewport)return n;var s=this.options.viewport&&this.options.viewport.padding||0,a=this.getPosition(this.$viewport);if(/right|left/.test(t)){var r=e.top-s-a.scroll,l=e.top+s-a.scroll+o;r<a.top?n.top=a.top-r:l>a.top+a.height&&(n.top=a.top+a.height-l)}else{var h=e.left-s,d=e.left+s+i;h<a.left?n.left=a.left-h:d>a.right&&(n.left=a.left+a.width-d)}return n},m.prototype.getTitle=function(){var t=this.$element,e=this.options;return t.attr("data-original-title")||("function"==typeof e.title?e.title.call(t[0]):e.title)},m.prototype.getUID=function(t){for(;t+=~~(1e6*Math.random()),document.getElementById(t););return t},m.prototype.tip=function(){if(!this.$tip&&(this.$tip=g(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},m.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},m.prototype.enable=function(){this.enabled=!0},m.prototype.disable=function(){this.enabled=!1},m.prototype.toggleEnabled=function(){this.enabled=!this.enabled},m.prototype.toggle=function(t){var e=this;t&&((e=g(t.currentTarget).data("bs."+this.type))||(e=new this.constructor(t.currentTarget,this.getDelegateOptions()),g(t.currentTarget).data("bs."+this.type,e))),t?(e.inState.click=!e.inState.click,e.isInStateTrue()?e.enter(e):e.leave(e)):e.tip().hasClass("in")?e.leave(e):e.enter(e)},m.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null,t.$element=null})},m.prototype.sanitizeHtml=function(t){return n(t,this.options.whiteList,this.options.sanitizeFn)};var e=g.fn.tooltip;g.fn.tooltip=function i(o){return this.each(function(){var t=g(this),e=t.data("bs.tooltip"),i="object"==typeof o&&o;!e&&/destroy|hide/.test(o)||(e||t.data("bs.tooltip",e=new m(this,i)),"string"==typeof o&&e[o]())})},g.fn.tooltip.Constructor=m,g.fn.tooltip.noConflict=function(){return g.fn.tooltip=e,this}}(jQuery),function(n){"use strict";var s=function(t,e){this.init("popover",t,e)};if(!n.fn.tooltip)throw new Error("Popover requires tooltip.js");s.VERSION="3.4.1",s.DEFAULTS=n.extend({},n.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),((s.prototype=n.extend({},n.fn.tooltip.Constructor.prototype)).constructor=s).prototype.getDefaults=function(){return s.DEFAULTS},s.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();if(this.options.html){var o=typeof i;this.options.sanitize&&(e=this.sanitizeHtml(e),"string"===o&&(i=this.sanitizeHtml(i))),t.find(".popover-title").html(e),t.find(".popover-content").children().detach().end()["string"===o?"html":"append"](i)}else t.find(".popover-title").text(e),t.find(".popover-content").children().detach().end().text(i);t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},s.prototype.hasContent=function(){return this.getTitle()||this.getContent()},s.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},s.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var t=n.fn.popover;n.fn.popover=function e(o){return this.each(function(){var t=n(this),e=t.data("bs.popover"),i="object"==typeof o&&o;!e&&/destroy|hide/.test(o)||(e||t.data("bs.popover",e=new s(this,i)),"string"==typeof o&&e[o]())})},n.fn.popover.Constructor=s,n.fn.popover.noConflict=function(){return n.fn.popover=t,this}}(jQuery),function(s){"use strict";function n(t,e){this.$body=s(document.body),this.$scrollElement=s(t).is(document.body)?s(window):s(t),this.options=s.extend({},n.DEFAULTS,e),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",s.proxy(this.process,this)),this.refresh(),this.process()}function e(o){return this.each(function(){var t=s(this),e=t.data("bs.scrollspy"),i="object"==typeof o&&o;e||t.data("bs.scrollspy",e=new n(this,i)),"string"==typeof o&&e[o]()})}n.VERSION="3.4.1",n.DEFAULTS={offset:10},n.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},n.prototype.refresh=function(){var t=this,o="offset",n=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),s.isWindow(this.$scrollElement[0])||(o="position",n=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var t=s(this),e=t.data("target")||t.attr("href"),i=/^#./.test(e)&&s(e);return i&&i.length&&i.is(":visible")&&[[i[o]().top+n,e]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){t.offsets.push(this[0]),t.targets.push(this[1])})},n.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),o=this.options.offset+i-this.$scrollElement.height(),n=this.offsets,s=this.targets,a=this.activeTarget;if(this.scrollHeight!=i&&this.refresh(),o<=e)return a!=(t=s[s.length-1])&&this.activate(t);if(a&&e<n[0])return this.activeTarget=null,this.clear();for(t=n.length;t--;)a!=s[t]&&e>=n[t]&&(n[t+1]===undefined||e<n[t+1])&&this.activate(s[t])},n.prototype.activate=function(t){this.activeTarget=t,this.clear();var e=this.selector+'[data-target="'+t+'"],'+this.selector+'[href="'+t+'"]',i=s(e).parents("li").addClass("active");i.parent(".dropdown-menu").length&&(i=i.closest("li.dropdown").addClass("active")),i.trigger("activate.bs.scrollspy")},n.prototype.clear=function(){s(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var t=s.fn.scrollspy;s.fn.scrollspy=e,s.fn.scrollspy.Constructor=n,s.fn.scrollspy.noConflict=function(){return s.fn.scrollspy=t,this},s(window).on("load.bs.scrollspy.data-api",function(){s('[data-spy="scroll"]').each(function(){var t=s(this);e.call(t,t.data())})})}(jQuery),function(r){"use strict";var a=function(t){this.element=r(t)};function e(i){return this.each(function(){var t=r(this),e=t.data("bs.tab");e||t.data("bs.tab",e=new a(this)),"string"==typeof i&&e[i]()})}a.VERSION="3.4.1",a.TRANSITION_DURATION=150,a.prototype.show=function(){var t=this.element,e=t.closest("ul:not(.dropdown-menu)"),i=t.data("target");if(i||(i=(i=t.attr("href"))&&i.replace(/.*(?=#[^\s]*$)/,"")),!t.parent("li").hasClass("active")){var o=e.find(".active:last a"),n=r.Event("hide.bs.tab",{relatedTarget:t[0]}),s=r.Event("show.bs.tab",{relatedTarget:o[0]});if(o.trigger(n),t.trigger(s),!s.isDefaultPrevented()&&!n.isDefaultPrevented()){var a=r(document).find(i);this.activate(t.closest("li"),e),this.activate(a,a.parent(),function(){o.trigger({type:"hidden.bs.tab",relatedTarget:t[0]}),t.trigger({type:"shown.bs.tab",relatedTarget:o[0]})})}}},a.prototype.activate=function(t,e,i){var o=e.find("> .active"),n=i&&r.support.transition&&(o.length&&o.hasClass("fade")||!!e.find("> .fade").length);function s(){o.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),n?(t[0].offsetWidth,t.addClass("in")):t.removeClass("fade"),t.parent(".dropdown-menu").length&&t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),i&&i()}o.length&&n?o.one("bsTransitionEnd",s).emulateTransitionEnd(a.TRANSITION_DURATION):s(),o.removeClass("in")};var t=r.fn.tab;r.fn.tab=e,r.fn.tab.Constructor=a,r.fn.tab.noConflict=function(){return r.fn.tab=t,this};var i=function(t){t.preventDefault(),e.call(r(this),"show")};r(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',i).on("click.bs.tab.data-api",'[data-toggle="pill"]',i)}(jQuery),function(l){"use strict";var h=function(t,e){this.options=l.extend({},h.DEFAULTS,e);var i=this.options.target===h.DEFAULTS.target?l(this.options.target):l(document).find(this.options.target);this.$target=i.on("scroll.bs.affix.data-api",l.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",l.proxy(this.checkPositionWithEventLoop,this)),this.$element=l(t),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};function i(o){return this.each(function(){var t=l(this),e=t.data("bs.affix"),i="object"==typeof o&&o;e||t.data("bs.affix",e=new h(this,i)),"string"==typeof o&&e[o]()})}h.VERSION="3.4.1",h.RESET="affix affix-top affix-bottom",h.DEFAULTS={offset:0,target:window},h.prototype.getState=function(t,e,i,o){var n=this.$target.scrollTop(),s=this.$element.offset(),a=this.$target.height();if(null!=i&&"top"==this.affixed)return n<i&&"top";if("bottom"==this.affixed)return null!=i?!(n+this.unpin<=s.top)&&"bottom":!(n+a<=t-o)&&"bottom";var r=null==this.affixed,l=r?n:s.top;return null!=i&&n<=i?"top":null!=o&&t-o<=l+(r?a:e)&&"bottom"},h.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(h.RESET).addClass("affix");var t=this.$target.scrollTop(),e=this.$element.offset();return this.pinnedOffset=e.top-t},h.prototype.checkPositionWithEventLoop=function(){setTimeout(l.proxy(this.checkPosition,this),1)},h.prototype.checkPosition=function(){if(this.$element.is(":visible")){var t=this.$element.height(),e=this.options.offset,i=e.top,o=e.bottom,n=Math.max(l(document).height(),l(document.body).height());"object"!=typeof e&&(o=i=e),"function"==typeof i&&(i=e.top(this.$element)),"function"==typeof o&&(o=e.bottom(this.$element));var s=this.getState(n,t,i,o);if(this.affixed!=s){null!=this.unpin&&this.$element.css("top","");var a="affix"+(s?"-"+s:""),r=l.Event(a+".bs.affix");if(this.$element.trigger(r),r.isDefaultPrevented())return;this.affixed=s,this.unpin="bottom"==s?this.getPinnedOffset():null,this.$element.removeClass(h.RESET).addClass(a).trigger(a.replace("affix","affixed")+".bs.affix")}"bottom"==s&&this.$element.offset({top:n-t-o})}};var t=l.fn.affix;l.fn.affix=i,l.fn.affix.Constructor=h,l.fn.affix.noConflict=function(){return l.fn.affix=t,this},l(window).on("load",function(){l('[data-spy="affix"]').each(function(){var t=l(this),e=t.data();e.offset=e.offset||{},null!=e.offsetBottom&&(e.offset.bottom=e.offsetBottom),null!=e.offsetTop&&(e.offset.top=e.offsetTop),i.call(t,e)})})}(jQuery);
define("bootstrap", ["jquery"], function(){});

require.config({
    urlArgs: "v=" + requirejs.s.contexts._.config.config.site.version,
    packages: [{
        name: 'moment',
        location: '../libs/moment',
        main: 'moment'
    }],
    //在打包压缩时将会把include中的模块合并到主文件中
    include: ['css', 'layer', 'toastr', 'fast', 'frontend', 'frontend-init', 'table', 'form', 'dragsort', 'drag', 'drop', 'selectpage'],
    paths: {
        'lang': "empty:",
        'form': 'require-form',
        'table': 'require-table',
        'upload': 'require-upload',
        'drag': 'jquery.drag.min',
        'drop': 'jquery.drop.min',
        'dropzone': 'dropzone.min',
        'echarts': 'echarts.min',
        'echarts-theme': 'echarts-theme',
        'adminlte': 'adminlte',
        'bootstrap-table-commonsearch': 'bootstrap-table-commonsearch',
        'bootstrap-table-template': 'bootstrap-table-template',
        //
        // 以下的包从bower的libs目录加载
        'jquery': '../libs/jquery/dist/jquery.min',
        'bootstrap': '../libs/bootstrap/dist/js/bootstrap.min',
        'bootstrap-datetimepicker': '../libs/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min',
        'bootstrap-daterangepicker': '../libs/bootstrap-daterangepicker/daterangepicker',
        'bootstrap-select': '../libs/bootstrap-select/dist/js/bootstrap-select.min',
        'bootstrap-select-lang': '../libs/bootstrap-select/dist/js/i18n/defaults-zh_CN',
        'bootstrap-table': '../libs/bootstrap-table/dist/bootstrap-table.min',
        'bootstrap-table-export': '../libs/bootstrap-table/dist/extensions/export/bootstrap-table-export.min',
        'bootstrap-table-fixed-columns': '../libs/bootstrap-table/dist/extensions/fixed-columns/bootstrap-table-fixed-columns',
        'bootstrap-table-mobile': '../libs/bootstrap-table/dist/extensions/mobile/bootstrap-table-mobile',
        'bootstrap-table-lang': '../libs/bootstrap-table/dist/locale/bootstrap-table-zh-CN',
        'bootstrap-table-jumpto': '../libs/bootstrap-table/dist/extensions/page-jumpto/bootstrap-table-jumpto',
        'tableexport': '../libs/tableExport.jquery.plugin/tableExport.min',
        'dragsort': '../libs/fastadmin-dragsort/jquery.dragsort',
        'sortable': '../libs/Sortable/Sortable.min',
        'addtabs': '../libs/fastadmin-addtabs/jquery.addtabs',
        'slimscroll': '../libs/jquery-slimscroll/jquery.slimscroll',
        'validator': '../libs/nice-validator/dist/jquery.validator',
        'validator-lang': '../libs/nice-validator/dist/local/zh-CN',
        'toastr': '../libs/toastr/toastr',
        'jstree': '../libs/jstree/dist/jstree.min',
        'layer': '../libs/fastadmin-layer/dist/layer',
        'cookie': '../libs/jquery.cookie/jquery.cookie',
        'cxselect': '../libs/fastadmin-cxselect/js/jquery.cxselect',
        'template': '../libs/art-template/dist/template-native',
        'selectpage': '../libs/fastadmin-selectpage/selectpage',
        'citypicker': '../libs/fastadmin-citypicker/dist/js/city-picker.min',
        'citypicker-data': '../libs/fastadmin-citypicker/dist/js/city-picker.data'
    },
    // shim依赖配置
    shim: {
        'addons': ['frontend'],
        'bootstrap': ['jquery'],
        'bootstrap-table': {
            deps: ['bootstrap'],
            exports: '$.fn.bootstrapTable'
        },
        'bootstrap-table-lang': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-export': {
            deps: ['bootstrap-table', 'tableexport'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-fixed-columns': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-mobile': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-advancedsearch': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-commonsearch': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-template': {
            deps: ['bootstrap-table', 'template'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'bootstrap-table-jumpto': {
            deps: ['bootstrap-table'],
            exports: '$.fn.bootstrapTable.defaults'
        },
        'tableexport': {
            deps: ['jquery'],
            exports: '$.fn.extend'
        },
        'slimscroll': {
            deps: ['jquery'],
            exports: '$.fn.extend'
        },
        'adminlte': {
            deps: ['bootstrap', 'slimscroll'],
            exports: '$.AdminLTE'
        },
        'bootstrap-daterangepicker': [
            'moment/locale/zh-cn'
        ],
        'bootstrap-datetimepicker': [
            'moment/locale/zh-cn',
        ],
        'bootstrap-select-lang': ['bootstrap-select'],
        'jstree': ['css!../libs/jstree/dist/themes/default/style.css'],
        'validator-lang': ['validator'],
        'citypicker': ['citypicker-data', 'css!../libs/fastadmin-citypicker/dist/css/city-picker.css']
    },
    baseUrl: requirejs.s.contexts._.config.config.site.cdnurl + '/assets/js/', //资源基础路径
    map: {
        '*': {
            'css': '../libs/require-css/css.min'
        }
    },
    waitSeconds: 60,
    charset: 'utf-8' // 文件编码
});

require(['jquery', 'bootstrap'], function ($, undefined) {
    //初始配置
    var Config = requirejs.s.contexts._.config.config;
    //将Config渲染到全局
    window.Config = Config;
    // 配置语言包的路径
    var paths = {};
    paths['lang'] = Config.moduleurl + '/ajax/lang?callback=define&controllername=' + Config.controllername + '&lang=' + Config.language + '&v=' + Config.site.version;
    // 避免目录冲突
    paths['frontend/'] = 'frontend/';
    require.config({paths: paths});

    // 初始化
    $(function () {
        require(['fast'], function (Fast) {
            require(['frontend', 'frontend-init', 'addons'], function (Frontend, Addons) {
                //加载相应模块
                if (Config.jsname) {
                    require([Config.jsname], function (Controller) {
                        Controller[Config.actionname] != undefined && Controller[Config.actionname]();
                    }, function (e) {
                        console.error(e);
                        // 这里可捕获模块加载的错误
                    });
                }
            });
        });
    });
});

define("require-frontend", function(){});

define('../libs/require-css/css.min',[],function(){if("undefined"==typeof window)return{load:function(a,b,c){c()}};var a=document.getElementsByTagName("head")[0],b=window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/)||0,c=!1,d=!0;b[1]||b[7]?c=parseInt(b[1])<6||parseInt(b[7])<=9:b[2]||b[8]?d=!1:b[4]&&(c=parseInt(b[4])<18);var e={};e.pluginBuilder="./css-builder";var f,g,h,i=function(){f=document.createElement("style"),a.appendChild(f),g=f.styleSheet||f.sheet},j=0,k=[],l=function(a){g.addImport(a),f.onload=function(){m()},j++,31==j&&(i(),j=0)},m=function(){h();var a=k.shift();return a?(h=a[1],void l(a[0])):void(h=null)},n=function(a,b){if(g&&g.addImport||i(),g&&g.addImport)h?k.push([a,b]):(l(a),h=b);else{f.textContent='@import "'+a+'";';var c=setInterval(function(){try{f.sheet.cssRules,clearInterval(c),b()}catch(a){}},10)}},o=function(b,c){var e=document.createElement("link");if(e.type="text/css",e.rel="stylesheet",d)e.onload=function(){e.onload=function(){},setTimeout(c,7)};else var f=setInterval(function(){for(var a=0;a<document.styleSheets.length;a++){var b=document.styleSheets[a];if(b.href==e.href)return clearInterval(f),c()}},10);e.href=b,a.appendChild(e)};return e.normalize=function(a,b){return".css"==a.substr(a.length-4,4)&&(a=a.substr(0,a.length-4)),b(a)},e.load=function(a,b,d,e){(c?n:o)(b.toUrl(a+".css"),d)},e});
/*! layer-v3.1.5 Web弹层组件 MIT License  http://layer.layui.com/  By 贤心 */
 ;!function(e,t){"use strict";var i,n,a=e.layui&&layui.define,o={getPath:function(){var e=document.currentScript?document.currentScript.src:function(){for(var e,t=document.scripts,i=t.length-1,n=i;n>0;n--)if("interactive"===t[n].readyState){e=t[n].src;break}return e||t[i].src}();return e.substring(0,e.lastIndexOf("/")+1)}(),config:{},end:{},minIndex:0,minLeft:[],btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],type:["dialog","page","iframe","loading","tips"],getStyle:function(t,i){var n=t.currentStyle?t.currentStyle:e.getComputedStyle(t,null);return n[n.getPropertyValue?"getPropertyValue":"getAttribute"](i)},link:function(t,i,n){if(r.path){var a=document.getElementsByTagName("head")[0],s=document.createElement("link");"string"==typeof i&&(n=i);var l=(n||t).replace(/\.|\//g,""),f="layuicss-"+l,c=0;s.rel="stylesheet",s.href=r.path+t,s.id=f,document.getElementById(f)||a.appendChild(s),"function"==typeof i&&!function u(){return++c>80?e.console&&console.error("layer.css: Invalid"):void(1989===parseInt(o.getStyle(document.getElementById(f),"width"))?i():setTimeout(u,100))}()}}},r={v:"3.1.5",ie:function(){var t=navigator.userAgent.toLowerCase();return!!(e.ActiveXObject||"ActiveXObject"in e)&&((t.match(/msie\s(\d+)/)||[])[1]||"11")}(),index:e.layer&&e.layer.v?1e5:0,path:o.getPath,config:function(e,t){return e=e||{},f=r.cache=o.config=i.extend({},o.config,e),r.path=o.config.path||r.path,"string"==typeof e.extend&&(e.extend=[e.extend]),o.config.path&&r.ready(),e.extend?(a?layui.addcss("modules/layer/"+e.extend):o.link("theme/"+e.extend),this):this},ready:function(e){var t="layer",i="",n=(a?"modules/layer/":"theme/")+"default/layer.css?v="+r.v+i;return a?layui.addcss(n,e,t):o.link(n,e,t),this},alert:function(e,t,n){var a="function"==typeof t;return a&&(n=t),r.open(i.extend({content:e,yes:n},a?{}:t))},confirm:function(e,t,n,a){var s="function"==typeof t;return s&&(a=n,n=t),r.open(i.extend({content:e,btn:o.btn,yes:n,btn2:a},s?{}:t))},msg:function(e,n,a){var s="function"==typeof n,f=o.config.skin,c=(f?f+" "+f+"-msg":"")||"layui-layer-msg",u=l.anim.length-1;return s&&(a=n),r.open(i.extend({content:e,time:3e3,shade:!1,skin:c,title:!1,closeBtn:!1,btn:!1,resize:!1,end:a},s&&!o.config.skin?{skin:c+" layui-layer-hui",anim:u}:function(){return n=n||{},n.icon!==-1&&n.icon!==t||(n.skin=c+" "+(n.skin||"layui-layer-hui")),n}()))},load:function(e,t){return r.open(i.extend({type:3,icon:e||0,resize:!1,shade:.01},t))},tips:function(e,t,n){return r.open(i.extend({type:4,content:[e,t],closeBtn:!1,time:3e3,shade:!1,resize:!1,fixed:!1,maxWidth:210},n))}},s=function(e){var t=this;t.index=++r.index,t.config=i.extend({},t.config,o.config,e),document.body?t.creat():setTimeout(function(){t.creat()},30)};s.pt=s.prototype;var l=["layui-layer",".layui-layer-title",".layui-layer-main",".layui-layer-dialog","layui-layer-iframe","layui-layer-content","layui-layer-btn","layui-layer-close"];l.anim=["layer-anim-00","layer-anim-01","layer-anim-02","layer-anim-03","layer-anim-04","layer-anim-05","layer-anim-06"],s.pt.config={type:0,shade:.3,fixed:!0,move:l[1],title:"&#x4FE1;&#x606F;",offset:"auto",area:"auto",closeBtn:1,time:0,zIndex:19891014,maxWidth:360,anim:0,isOutAnim:!0,focusBtn:0,icon:-1,moveType:1,resize:!0,scrollbar:!0,tips:2},s.pt.vessel=function(e,t){var n=this,a=n.index,r=n.config,s=r.zIndex+a,f="object"==typeof r.title,c=r.maxmin&&(1===r.type||2===r.type),u=r.title?'<div class="layui-layer-title" style="'+(f?r.title[1]:"")+'">'+(f?r.title[0]:r.title)+"</div>":"";return r.zIndex=s,t([r.shade?'<div class="layui-layer-shade" id="layui-layer-shade'+a+'" times="'+a+'" style="'+("z-index:"+(s-1)+"; ")+'"></div>':"",'<div class="'+l[0]+(" layui-layer-"+o.type[r.type])+(0!=r.type&&2!=r.type||r.shade?"":" layui-layer-border")+" "+(r.skin||"")+'" id="'+l[0]+a+'" type="'+o.type[r.type]+'" times="'+a+'" showtime="'+r.time+'" conType="'+(e?"object":"string")+'" style="z-index: '+s+"; width:"+r.area[0]+";height:"+r.area[1]+(r.fixed?"":";position:absolute;")+'">'+(e&&2!=r.type?"":u)+'<div id="'+(r.id||"")+'" class="layui-layer-content'+(0==r.type&&r.icon!==-1?" layui-layer-padding":"")+(3==r.type?" layui-layer-loading"+r.icon:"")+'">'+(0==r.type&&r.icon!==-1?'<i class="layui-layer-ico layui-layer-ico'+r.icon+'"></i>':"")+(1==r.type&&e?"":r.content||"")+'</div><span class="layui-layer-setwin">'+function(){var e=c?'<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>':"";return r.closeBtn&&(e+='<a class="layui-layer-ico '+l[7]+" "+l[7]+(r.title?r.closeBtn:4==r.type?"1":"2")+'" href="javascript:;"></a>'),e}()+"</span>"+(r.btn?function(){var e="";"string"==typeof r.btn&&(r.btn=[r.btn]);for(var t=0,i=r.btn.length;t<i;t++)e+='<a class="'+l[6]+t+'" href="javascript:;">'+r.btn[t]+"</a>";return'<div class="'+l[6]+" layui-layer-btn-"+(r.btnAlign||"")+'">'+e+"</div>"}():"")+(r.resize?'<span class="layui-layer-resize"></span>':"")+"</div>"],u,i('<div class="layui-layer-move"></div>')),n},s.pt.creat=function(){var e=this,t=e.config,a=e.index,s=t.content,f="object"==typeof s,c=i("body");if(!t.id||!i("#"+t.id)[0]){switch("string"==typeof t.area&&(t.area="auto"===t.area?["",""]:[t.area,""]),t.shift&&(t.anim=t.shift),6==r.ie&&(t.fixed=!1),t.type){case 0:t.btn="btn"in t?t.btn:o.btn[0],r.closeAll("dialog");break;case 2:var s=t.content=f?t.content:[t.content||"http://layer.layui.com","auto"];t.content='<iframe scrolling="'+(t.content[1]||"auto")+'" allowtransparency="true" id="'+l[4]+a+'" name="'+l[4]+a+'" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="'+t.content[0]+'"></iframe>';break;case 3:delete t.title,delete t.closeBtn,t.icon===-1&&0===t.icon,r.closeAll("loading");break;case 4:f||(t.content=[t.content,"body"]),t.follow=t.content[1],t.content=t.content[0]+'<i class="layui-layer-TipsG"></i>',delete t.title,t.tips="object"==typeof t.tips?t.tips:[t.tips,!0],t.tipsMore||r.closeAll("tips")}if(e.vessel(f,function(n,r,u){c.append(n[0]),f?function(){2==t.type||4==t.type?function(){i("body").append(n[1])}():function(){s.parents("."+l[0])[0]||(s.data("display",s.css("display")).show().addClass("layui-layer-wrap").wrap(n[1]),i("#"+l[0]+a).find("."+l[5]).before(r))}()}():c.append(n[1]),i(".layui-layer-move")[0]||c.append(o.moveElem=u),e.layero=i("#"+l[0]+a),t.scrollbar||l.html.css("overflow","hidden").attr("layer-full",a)}).auto(a),i("#layui-layer-shade"+e.index).css({"background-color":t.shade[1]||"#000",opacity:t.shade[0]||t.shade}),2==t.type&&6==r.ie&&e.layero.find("iframe").attr("src",s[0]),4==t.type?e.tips():e.offset(),t.fixed&&n.on("resize",function(){e.offset(),(/^\d+%$/.test(t.area[0])||/^\d+%$/.test(t.area[1]))&&e.auto(a),4==t.type&&e.tips()}),t.time<=0||setTimeout(function(){r.close(e.index)},t.time),e.move().callback(),l.anim[t.anim]){var u="layer-anim "+l.anim[t.anim];e.layero.addClass(u).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){i(this).removeClass(u)})}t.isOutAnim&&e.layero.data("isOutAnim",!0)}},s.pt.auto=function(e){var t=this,a=t.config,o=i("#"+l[0]+e);""===a.area[0]&&a.maxWidth>0&&(r.ie&&r.ie<8&&a.btn&&o.width(o.innerWidth()),o.outerWidth()>a.maxWidth&&o.width(a.maxWidth));var s=[o.innerWidth(),o.innerHeight()],f=o.find(l[1]).outerHeight()||0,c=o.find("."+l[6]).outerHeight()||0,u=function(e){e=o.find(e),e.height(s[1]-f-c-2*(0|parseFloat(e.css("padding-top"))))};switch(a.type){case 2:u("iframe");break;default:""===a.area[1]?a.maxHeight>0&&o.outerHeight()>a.maxHeight?(s[1]=a.maxHeight,u("."+l[5])):a.fixed&&s[1]>=n.height()&&(s[1]=n.height(),u("."+l[5])):u("."+l[5])}return t},s.pt.offset=function(){var e=this,t=e.config,i=e.layero,a=[i.outerWidth(),i.outerHeight()],o="object"==typeof t.offset;e.offsetTop=(n.height()-a[1])/2,e.offsetLeft=(n.width()-a[0])/2,o?(e.offsetTop=t.offset[0],e.offsetLeft=t.offset[1]||e.offsetLeft):"auto"!==t.offset&&("t"===t.offset?e.offsetTop=0:"r"===t.offset?e.offsetLeft=n.width()-a[0]:"b"===t.offset?e.offsetTop=n.height()-a[1]:"l"===t.offset?e.offsetLeft=0:"lt"===t.offset?(e.offsetTop=0,e.offsetLeft=0):"lb"===t.offset?(e.offsetTop=n.height()-a[1],e.offsetLeft=0):"rt"===t.offset?(e.offsetTop=0,e.offsetLeft=n.width()-a[0]):"rb"===t.offset?(e.offsetTop=n.height()-a[1],e.offsetLeft=n.width()-a[0]):e.offsetTop=t.offset),t.fixed||(e.offsetTop=/%$/.test(e.offsetTop)?n.height()*parseFloat(e.offsetTop)/100:parseFloat(e.offsetTop),e.offsetLeft=/%$/.test(e.offsetLeft)?n.width()*parseFloat(e.offsetLeft)/100:parseFloat(e.offsetLeft),e.offsetTop+=n.scrollTop(),e.offsetLeft+=n.scrollLeft()),i.attr("minLeft")&&(e.offsetTop=n.height()-(i.find(l[1]).outerHeight()||0),e.offsetLeft=i.css("left")),i.css({top:e.offsetTop,left:e.offsetLeft})},s.pt.tips=function(){var e=this,t=e.config,a=e.layero,o=[a.outerWidth(),a.outerHeight()],r=i(t.follow);r[0]||(r=i("body"));var s={width:r.outerWidth(),height:r.outerHeight(),top:r.offset().top,left:r.offset().left},f=a.find(".layui-layer-TipsG"),c=t.tips[0];t.tips[1]||f.remove(),s.autoLeft=function(){s.left+o[0]-n.width()>0?(s.tipLeft=s.left+s.width-o[0],f.css({right:12,left:"auto"})):s.tipLeft=s.left},s.where=[function(){s.autoLeft(),s.tipTop=s.top-o[1]-10,f.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color",t.tips[1])},function(){s.tipLeft=s.left+s.width+10,s.tipTop=s.top,f.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color",t.tips[1])},function(){s.autoLeft(),s.tipTop=s.top+s.height+10,f.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color",t.tips[1])},function(){s.tipLeft=s.left-o[0]-10,s.tipTop=s.top,f.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color",t.tips[1])}],s.where[c-1](),1===c?s.top-(n.scrollTop()+o[1]+16)<0&&s.where[2]():2===c?n.width()-(s.left+s.width+o[0]+16)>0||s.where[3]():3===c?s.top-n.scrollTop()+s.height+o[1]+16-n.height()>0&&s.where[0]():4===c&&o[0]+16-s.left>0&&s.where[1](),a.find("."+l[5]).css({"background-color":t.tips[1],"padding-right":t.closeBtn?"30px":""}),a.css({left:s.tipLeft-(t.fixed?n.scrollLeft():0),top:s.tipTop-(t.fixed?n.scrollTop():0)})},s.pt.move=function(){var e=this,t=e.config,a=i(document),s=e.layero,l=s.find(t.move),f=s.find(".layui-layer-resize"),c={};return t.move&&l.css("cursor","move"),l.on("mousedown",function(e){e.preventDefault(),t.move&&(c.moveStart=!0,c.offset=[e.clientX-parseFloat(s.css("left")),e.clientY-parseFloat(s.css("top"))],o.moveElem.css("cursor","move").show())}),f.on("mousedown",function(e){e.preventDefault(),c.resizeStart=!0,c.offset=[e.clientX,e.clientY],c.area=[s.outerWidth(),s.outerHeight()],o.moveElem.css("cursor","se-resize").show()}),a.on("mousemove",function(i){if(c.moveStart){var a=i.clientX-c.offset[0],o=i.clientY-c.offset[1],l="fixed"===s.css("position");if(i.preventDefault(),c.stX=l?0:n.scrollLeft(),c.stY=l?0:n.scrollTop(),!t.moveOut){var f=n.width()-s.outerWidth()+c.stX,u=n.height()-s.outerHeight()+c.stY;a<c.stX&&(a=c.stX),a>f&&(a=f),o<c.stY&&(o=c.stY),o>u&&(o=u)}s.css({left:a,top:o})}if(t.resize&&c.resizeStart){var a=i.clientX-c.offset[0],o=i.clientY-c.offset[1];i.preventDefault(),r.style(e.index,{width:c.area[0]+a,height:c.area[1]+o}),c.isResize=!0,t.resizing&&t.resizing(s)}}).on("mouseup",function(e){c.moveStart&&(delete c.moveStart,o.moveElem.hide(),t.moveEnd&&t.moveEnd(s)),c.resizeStart&&(delete c.resizeStart,o.moveElem.hide())}),e},s.pt.callback=function(){function e(){var e=a.cancel&&a.cancel(t.index,n);e===!1||r.close(t.index)}var t=this,n=t.layero,a=t.config;if(t.openLayer(),a.success&&(2==a.type?n.find("iframe").on("load",function(){a.success(n,t.index)}):a.success(n,t.index)),6==r.ie&&t.IE6(n),n.find("."+l[6]).children("a").on("click",function(){var e=i(this).index();if(0===e)a.yes?a.yes(t.index,n):a.btn1?a.btn1(t.index,n):r.close(t.index);else{var o=a["btn"+(e+1)]&&a["btn"+(e+1)](t.index,n);o===!1||r.close(t.index)}}),"number"==typeof a.focusBtn){var s=n.find("."+l[6]).children("a").eq(a.focusBtn);if(s.size()>0){n.find("."+l[6]).css("position","relative");var f=s.position(),c={width:s.outerWidth(),height:s.outerHeight(),left:f.left,top:f.top,marginTop:s.css("marginTop"),marginLeft:s.css("marginLeft")},u=i("<button class='layui-layer-confirm'></button>").css(c);if(a.resize){var d=a.resizing;a.resizing=function(e){d&&d(e);var t=s.position();u.size()>0&&u.css({left:t.left,top:t.top})}}n.find("."+l[6]).append(u),u.focus().click(function(){return s.trigger("click"),!1}).on("focus blur",function(e){s.toggleClass("focus","focus"===e.type),"blur"===e.type&&u.remove()})}}n.find("."+l[7]).on("click",e),a.shadeClose&&i("#layui-layer-shade"+t.index).on("click",function(){r.close(t.index)}),n.find(".layui-layer-min").on("click",function(){var e=a.min&&a.min(n);e===!1||r.min(t.index,a)}),n.find(".layui-layer-max").on("click",function(){i(this).hasClass("layui-layer-maxmin")?(r.restore(t.index),a.restore&&a.restore(n)):(r.full(t.index,a),setTimeout(function(){a.full&&a.full(n)},100))}),a.end&&(o.end[t.index]=a.end)},o.reselect=function(){i.each(i("select"),function(e,t){var n=i(this);n.parents("."+l[0])[0]||1==n.attr("layer")&&i("."+l[0]).length<1&&n.removeAttr("layer").show(),n=null})},s.pt.IE6=function(e){i("select").each(function(e,t){var n=i(this);n.parents("."+l[0])[0]||"none"===n.css("display")||n.attr({layer:"1"}).hide(),n=null})},s.pt.openLayer=function(){var e=this;r.zIndex=e.config.zIndex,r.setTop=function(e){var t=function(){r.zIndex++,e.css("z-index",r.zIndex+1)};return r.zIndex=parseInt(e[0].style.zIndex),e.on("mousedown",t),r.zIndex}},o.record=function(e){var t=[e.width(),e.height(),e.position().top,e.position().left+parseFloat(e.css("margin-left"))];e.find(".layui-layer-max").addClass("layui-layer-maxmin"),e.attr({area:t})},o.rescollbar=function(e){l.html.attr("layer-full")==e&&(l.html[0].style.removeProperty?l.html[0].style.removeProperty("overflow"):l.html[0].style.removeAttribute("overflow"),l.html.removeAttr("layer-full"))},e.layer=r,r.getChildFrame=function(e,t){return t=t||i("."+l[4]).attr("times"),i("#"+l[0]+t).find("iframe").contents().find(e)},r.getFrameIndex=function(e){return i("#"+e).parents("."+l[4]).attr("times")},r.iframeAuto=function(e){if(e){var t=r.getChildFrame("html",e).outerHeight(),n=i("#"+l[0]+e),a=n.find(l[1]).outerHeight()||0,o=n.find("."+l[6]).outerHeight()||0;n.css({height:t+a+o}),n.find("iframe").css({height:t})}},r.iframeSrc=function(e,t){i("#"+l[0]+e).find("iframe").attr("src",t)},r.style=function(e,t,n){var a=i("#"+l[0]+e),r=a.find(".layui-layer-content"),s=a.attr("type"),f=a.find(l[1]).outerHeight()||0,c=a.find("."+l[6]).outerHeight()||0;a.attr("minLeft");s!==o.type[3]&&s!==o.type[4]&&(n||(parseFloat(t.width)<=260&&(t.width=260),parseFloat(t.height)-f-c<=64&&(t.height=64+f+c)),a.css(t),c=a.find("."+l[6]).outerHeight(),s===o.type[2]?a.find("iframe").css({height:parseFloat(t.height)-f-c}):r.css({height:parseFloat(t.height)-f-c}))},r.min=function(e,t){var a=i("#"+l[0]+e),s=a.find(l[1]).outerHeight()||0,f=a.attr("minLeft")||181*o.minIndex+"px",c=a.css("position");o.record(a),o.minLeft[0]&&(f=o.minLeft[0],o.minLeft.shift()),a.attr("position",c),r.style(e,{width:180,height:s,left:f,top:n.height()-s,position:"fixed",overflow:"hidden"},!0),a.find(".layui-layer-min").hide(),"page"===a.attr("type")&&a.find(l[4]).hide(),o.rescollbar(e),a.attr("minLeft")||o.minIndex++,a.attr("minLeft",f)},r.restore=function(e){var t=i("#"+l[0]+e),n=t.attr("area").split(",");t.attr("type");r.style(e,{width:parseFloat(n[0]),height:parseFloat(n[1]),top:parseFloat(n[2]),left:parseFloat(n[3]),position:t.attr("position"),overflow:"visible"},!0),t.find(".layui-layer-max").removeClass("layui-layer-maxmin"),t.find(".layui-layer-min").show(),"page"===t.attr("type")&&t.find(l[4]).show(),o.rescollbar(e)},r.full=function(e){var t,a=i("#"+l[0]+e);o.record(a),l.html.attr("layer-full")||l.html.css("overflow","hidden").attr("layer-full",e),clearTimeout(t),t=setTimeout(function(){var t="fixed"===a.css("position");r.style(e,{top:t?0:n.scrollTop(),left:t?0:n.scrollLeft(),width:n.width(),height:n.height()},!0),a.find(".layui-layer-min").hide()},100)},r.title=function(e,t){var n=i("#"+l[0]+(t||r.index)).find(l[1]);n.html(e)},r.close=function(e){var t=i("#"+l[0]+e),n=t.attr("type"),a="layer-anim-close";if(t[0]){var s="layui-layer-wrap",f=function(){if(n===o.type[1]&&"object"===t.attr("conType")){t.children(":not(."+l[5]+")").remove();for(var a=t.find("."+s),r=0;r<2;r++)a.unwrap();a.css("display",a.data("display")).removeClass(s)}else{if(n===o.type[2])try{var f=i("#"+l[4]+e)[0];f.contentWindow.document.write(""),f.contentWindow.close(),t.find("."+l[5])[0].removeChild(f)}catch(c){}t[0].innerHTML="",t.remove()}"function"==typeof o.end[e]&&o.end[e](),delete o.end[e]};t.data("isOutAnim")&&t.addClass("layer-anim "+a),i("#layui-layer-moves, #layui-layer-shade"+e).remove(),6==r.ie&&o.reselect(),o.rescollbar(e),t.attr("minLeft")&&(o.minIndex--,o.minLeft.push(t.attr("minLeft"))),r.ie&&r.ie<10||!t.data("isOutAnim")?f():setTimeout(function(){f()},200)}},r.closeAll=function(e){i.each(i("."+l[0]),function(){var t=i(this),n=e?t.attr("type")===e:1;n&&r.close(t.attr("times")),n=null})};var f=r.cache||{},c=function(e){return f.skin?" "+f.skin+" "+f.skin+"-"+e:""};r.prompt=function(e,t){var a="";if(e=e||{},"function"==typeof e&&(t=e),e.area){var o=e.area;a='style="width: '+o[0]+"; height: "+o[1]+';"',delete e.area}var s,l=2==e.formType?'<textarea class="layui-layer-input"'+a+">"+(e.value||"")+"</textarea>":function(){return'<input type="'+(1==e.formType?"password":"text")+'" class="layui-layer-input" value="'+(e.value||"")+'">'}(),f=e.success;return delete e.success,r.open(i.extend({type:1,btn:["&#x786E;&#x5B9A;","&#x53D6;&#x6D88;"],content:l,skin:"layui-layer-prompt"+c("prompt"),maxWidth:n.width(),success:function(e){s=e.find(".layui-layer-input"),s.focus(),"function"==typeof f&&f(e)},resize:!1,yes:function(i){var n=s.val();""===n?s.focus():n.length>(e.maxlength||500)?r.tips("&#x6700;&#x591A;&#x8F93;&#x5165;"+(e.maxlength||500)+"&#x4E2A;&#x5B57;&#x6570;",s,{tips:1}):t&&t(n,i,s)}},e))},r.tab=function(e){e=e||{};var t=e.tab||{},n="layui-this",a=e.success;return delete e.success,r.open(i.extend({type:1,skin:"layui-layer-tab"+c("tab"),resize:!1,title:function(){var e=t.length,i=1,a="";if(e>0)for(a='<span class="'+n+'">'+t[0].title+"</span>";i<e;i++)a+="<span>"+t[i].title+"</span>";return a}(),content:'<ul class="layui-layer-tabmain">'+function(){var e=t.length,i=1,a="";if(e>0)for(a='<li class="layui-layer-tabli '+n+'">'+(t[0].content||"no content")+"</li>";i<e;i++)a+='<li class="layui-layer-tabli">'+(t[i].content||"no  content")+"</li>";return a}()+"</ul>",success:function(t){var o=t.find(".layui-layer-title").children(),r=t.find(".layui-layer-tabmain").children();o.on("mousedown",function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0;var a=i(this),o=a.index();a.addClass(n).siblings().removeClass(n),r.eq(o).show().siblings().hide(),"function"==typeof e.change&&e.change(o)}),"function"==typeof a&&a(t)}},e))},r.photos=function(t,n,a){function o(e,t,i){var n=new Image;return n.src=e,n.complete?t(n):(n.onload=function(){n.onload=null,t(n)},void(n.onerror=function(e){n.onerror=null,i(e)}))}var s={};if(t=t||{},t.photos){var l=t.photos.constructor===Object,f=l?t.photos:{},u=f.data||[],d=f.start||0;s.imgIndex=(0|d)+1,t.img=t.img||"img";var y=t.success;if(delete t.success,l){if(0===u.length)return r.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")}else{var p=i(t.photos),h=function(){u=[],p.find(t.img).each(function(e){var t=i(this);t.attr("layer-index",e),u.push({alt:t.attr("alt"),pid:t.attr("layer-pid"),src:t.attr("layer-src")||t.attr("src"),thumb:t.attr("src")})})};if(h(),0===u.length)return;if(n||p.on("click",t.img,function(){var e=i(this),n=e.attr("layer-index");r.photos(i.extend(t,{photos:{start:n,data:u,tab:t.tab},full:t.full}),!0),h()}),!n)return}s.imgprev=function(e){s.imgIndex--,s.imgIndex<1&&(s.imgIndex=u.length),s.tabimg(e)},s.imgnext=function(e,t){s.imgIndex++,s.imgIndex>u.length&&(s.imgIndex=1,t)||s.tabimg(e)},s.keyup=function(e){if(!s.end){var t=e.keyCode;e.preventDefault(),37===t?s.imgprev(!0):39===t?s.imgnext(!0):27===t&&r.close(s.index)}},s.tabimg=function(e){if(!(u.length<=1))return f.start=s.imgIndex-1,r.close(s.index),r.photos(t,!0,e)},s.event=function(){s.bigimg.hover(function(){s.imgsee.show()},function(){s.imgsee.hide()}),s.bigimg.find(".layui-layer-imgprev").on("click",function(e){e.preventDefault(),s.imgprev()}),s.bigimg.find(".layui-layer-imgnext").on("click",function(e){e.preventDefault(),s.imgnext()}),i(document).on("keyup",s.keyup)},s.loadi=r.load(1,{shade:"shade"in t?t.shade:.9,scrollbar:"scrollbar"in t&&t.scrollbar}),o(u[d].src,function(n){r.close(s.loadi),s.index=r.open(i.extend({type:1,id:"layui-layer-photos",area:function(){var a=[n.width,n.height],o=[i(e).width()-100,i(e).height()-100];if(!t.full&&(a[0]>o[0]||a[1]>o[1])){var r=[a[0]/o[0],a[1]/o[1]];r[0]>r[1]?(a[0]=a[0]/r[0],a[1]=a[1]/r[0]):r[0]<r[1]&&(a[0]=a[0]/r[1],a[1]=a[1]/r[1])}return[a[0]+"px",a[1]+"px"]}(),title:!1,shade:.9,shadeClose:!0,closeBtn:!1,move:".layui-layer-phimg img",moveType:1,scrollbar:!1,moveOut:!0,isOutAnim:!1,skin:"layui-layer-photos"+c("photos"),content:'<div class="layui-layer-phimg"><img src="'+u[d].src+'" alt="'+(u[d].alt||"")+'" layer-pid="'+u[d].pid+'"><div class="layui-layer-imgsee">'+(u.length>1?'<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>':"")+'<div class="layui-layer-imgbar" style="display:'+(a?"block":"")+'"><span class="layui-layer-imgtit"><a href="javascript:;">'+(u[d].alt||"")+"</a><em>"+s.imgIndex+"/"+u.length+"</em></span></div></div></div>",success:function(e,i){s.bigimg=e.find(".layui-layer-phimg"),s.imgsee=e.find(".layui-layer-imguide,.layui-layer-imgbar"),s.event(e),t.tab&&t.tab(u[d],e),"function"==typeof y&&y(e)},end:function(){s.end=!0,i(document).off("keyup",s.keyup)}},t))},function(){r.close(s.loadi),r.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;",{time:3e4,btn:["&#x4E0B;&#x4E00;&#x5F20;","&#x4E0D;&#x770B;&#x4E86;"],yes:function(){u.length>1&&s.imgnext(!0,!0)}})})}},o.run=function(t){i=t,n=i(e),l.html=i("html"),r.open=function(e){var t=new s(e);return t.index}},e.layui&&layui.define?(r.ready(),layui.define("jquery",function(t){r.path=layui.cache.dir,o.run(layui.$),e.layer=r,t("layer",r)})):"function"==typeof define&&define.amd?define('layer',["jquery"],function(){return o.run(e.jQuery),r}):function(){o.run(e.jQuery),r.ready()}()}(window);
/*
 * Toastr
 * Copyright 2012-2015
 * Authors: John Papa, Hans Fjällemark, and Tim Ferrell.
 * All Rights Reserved.
 * Use, reproduction, distribution, and modification of this code is subject to the terms and
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * ARIA Support: Greta Krafsig
 *
 * Project: https://github.com/CodeSeven/toastr
 */
/* global define */
(function (define) {
    define('toastr',['jquery'], function ($) {
        return (function () {
            var $container;
            var listener;
            var toastId = 0;
            var toastType = {
                error: 'error',
                info: 'info',
                success: 'success',
                warning: 'warning'
            };

            var toastr = {
                clear: clear,
                remove: remove,
                error: error,
                getContainer: getContainer,
                info: info,
                options: {},
                subscribe: subscribe,
                success: success,
                version: '2.1.3',
                warning: warning
            };

            var previousToast;

            return toastr;

            ////////////////

            function error(message, title, optionsOverride) {
                return notify({
                    type: toastType.error,
                    iconClass: getOptions().iconClasses.error,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function getContainer(options, create) {
                if (!options) { options = getOptions(); }
                $container = $('#' + options.containerId);
                if ($container.length) {
                    return $container;
                }
                if (create) {
                    $container = createContainer(options);
                }
                return $container;
            }

            function info(message, title, optionsOverride) {
                return notify({
                    type: toastType.info,
                    iconClass: getOptions().iconClasses.info,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function subscribe(callback) {
                listener = callback;
            }

            function success(message, title, optionsOverride) {
                return notify({
                    type: toastType.success,
                    iconClass: getOptions().iconClasses.success,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function warning(message, title, optionsOverride) {
                return notify({
                    type: toastType.warning,
                    iconClass: getOptions().iconClasses.warning,
                    message: message,
                    optionsOverride: optionsOverride,
                    title: title
                });
            }

            function clear($toastElement, clearOptions) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if (!clearToast($toastElement, options, clearOptions)) {
                    clearContainer(options);
                }
            }

            function remove($toastElement) {
                var options = getOptions();
                if (!$container) { getContainer(options); }
                if ($toastElement && $(':focus', $toastElement).length === 0) {
                    removeToast($toastElement);
                    return;
                }
                if ($container.children().length) {
                    $container.remove();
                }
            }

            // internal functions

            function clearContainer (options) {
                var toastsToClear = $container.children();
                for (var i = toastsToClear.length - 1; i >= 0; i--) {
                    clearToast($(toastsToClear[i]), options);
                }
            }

            function clearToast ($toastElement, options, clearOptions) {
                var force = clearOptions && clearOptions.force ? clearOptions.force : false;
                if ($toastElement && (force || $(':focus', $toastElement).length === 0)) {
                    $toastElement[options.hideMethod]({
                        duration: options.hideDuration,
                        easing: options.hideEasing,
                        complete: function () { removeToast($toastElement); }
                    });
                    return true;
                }
                return false;
            }

            function createContainer(options) {
                $container = $('<div/>')
                    .attr('id', options.containerId)
                    .addClass(options.positionClass);

                $container.appendTo($(options.target));
                return $container;
            }

            function getDefaults() {
                return {
                    tapToDismiss: true,
                    toastClass: 'toast',
                    containerId: 'toast-container',
                    debug: false,

                    showMethod: 'fadeIn', //fadeIn, slideDown, and show are built into jQuery
                    showDuration: 300,
                    showEasing: 'swing', //swing and linear are built into jQuery
                    onShown: undefined,
                    hideMethod: 'fadeOut',
                    hideDuration: 1000,
                    hideEasing: 'swing',
                    onHidden: undefined,
                    closeMethod: false,
                    closeDuration: false,
                    closeEasing: false,
                    closeOnHover: true,

                    extendedTimeOut: 1000,
                    iconClasses: {
                        error: 'toast-error',
                        info: 'toast-info',
                        success: 'toast-success',
                        warning: 'toast-warning'
                    },
                    iconClass: 'toast-info',
                    positionClass: 'toast-top-right',
                    timeOut: 5000, // Set timeOut and extendedTimeOut to 0 to make it sticky
                    titleClass: 'toast-title',
                    messageClass: 'toast-message',
                    escapeHtml: false,
                    target: 'body',
                    closeHtml: '<button type="button">&times;</button>',
                    closeClass: 'toast-close-button',
                    newestOnTop: true,
                    preventDuplicates: false,
                    progressBar: false,
                    progressClass: 'toast-progress',
                    rtl: false
                };
            }

            function publish(args) {
                if (!listener) { return; }
                listener(args);
            }

            function notify(map) {
                var options = getOptions();
                var iconClass = map.iconClass || options.iconClass;

                if (typeof (map.optionsOverride) !== 'undefined') {
                    options = $.extend(options, map.optionsOverride);
                    iconClass = map.optionsOverride.iconClass || iconClass;
                }

                if (shouldExit(options, map)) { return; }

                toastId++;

                $container = getContainer(options, true);

                var intervalId = null;
                var $toastElement = $('<div/>');
                var $titleElement = $('<div/>');
                var $messageElement = $('<div/>');
                var $progressElement = $('<div/>');
                var $closeElement = $(options.closeHtml);
                var progressBar = {
                    intervalId: null,
                    hideEta: null,
                    maxHideTime: null
                };
                var response = {
                    toastId: toastId,
                    state: 'visible',
                    startTime: new Date(),
                    options: options,
                    map: map
                };

                personalizeToast();

                displayToast();

                handleEvents();

                publish(response);

                if (options.debug && console) {
                    console.log(response);
                }

                return $toastElement;

                function escapeHtml(source) {
                    if (source == null) {
                        source = '';
                    }

                    return source
                        .replace(/&/g, '&amp;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                }

                function personalizeToast() {
                    setIcon();
                    setTitle();
                    setMessage();
                    setCloseButton();
                    setProgressBar();
                    setRTL();
                    setSequence();
                    setAria();
                }

                function setAria() {
                    var ariaValue = '';
                    switch (map.iconClass) {
                        case 'toast-success':
                        case 'toast-info':
                            ariaValue =  'polite';
                            break;
                        default:
                            ariaValue = 'assertive';
                    }
                    $toastElement.attr('aria-live', ariaValue);
                }

                function handleEvents() {
                    if (options.closeOnHover) {
                        $toastElement.hover(stickAround, delayedHideToast);
                    }

                    if (!options.onclick && options.tapToDismiss) {
                        $toastElement.click(hideToast);
                    }

                    if (options.closeButton && $closeElement) {
                        $closeElement.click(function (event) {
                            if (event.stopPropagation) {
                                event.stopPropagation();
                            } else if (event.cancelBubble !== undefined && event.cancelBubble !== true) {
                                event.cancelBubble = true;
                            }

                            if (options.onCloseClick) {
                                options.onCloseClick(event);
                            }

                            hideToast(true);
                        });
                    }

                    if (options.onclick) {
                        $toastElement.click(function (event) {
                            options.onclick(event);
                            hideToast();
                        });
                    }
                }

                function displayToast() {
                    $toastElement.hide();

                    $toastElement[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing, complete: options.onShown}
                    );

                    if (options.timeOut > 0) {
                        intervalId = setTimeout(hideToast, options.timeOut);
                        progressBar.maxHideTime = parseFloat(options.timeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                        if (options.progressBar) {
                            progressBar.intervalId = setInterval(updateProgress, 10);
                        }
                    }
                }

                function setIcon() {
                    if (map.iconClass) {
                        $toastElement.addClass(options.toastClass).addClass(iconClass);
                    }
                }

                function setSequence() {
                    if (options.newestOnTop) {
                        $container.prepend($toastElement);
                    } else {
                        $container.append($toastElement);
                    }
                }

                function setTitle() {
                    if (map.title) {
                        var suffix = map.title;
                        if (options.escapeHtml) {
                            suffix = escapeHtml(map.title);
                        }
                        $titleElement.append(suffix).addClass(options.titleClass);
                        $toastElement.append($titleElement);
                    }
                }

                function setMessage() {
                    if (map.message) {
                        var suffix = map.message;
                        if (options.escapeHtml) {
                            suffix = escapeHtml(map.message);
                        }
                        $messageElement.append(suffix).addClass(options.messageClass);
                        $toastElement.append($messageElement);
                    }
                }

                function setCloseButton() {
                    if (options.closeButton) {
                        $closeElement.addClass(options.closeClass).attr('role', 'button');
                        $toastElement.prepend($closeElement);
                    }
                }

                function setProgressBar() {
                    if (options.progressBar) {
                        $progressElement.addClass(options.progressClass);
                        $toastElement.prepend($progressElement);
                    }
                }

                function setRTL() {
                    if (options.rtl) {
                        $toastElement.addClass('rtl');
                    }
                }

                function shouldExit(options, map) {
                    if (options.preventDuplicates) {
                        if (map.message === previousToast) {
                            return true;
                        } else {
                            previousToast = map.message;
                        }
                    }
                    return false;
                }

                function hideToast(override) {
                    var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
                    var duration = override && options.closeDuration !== false ?
                        options.closeDuration : options.hideDuration;
                    var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
                    if ($(':focus', $toastElement).length && !override) {
                        return;
                    }
                    clearTimeout(progressBar.intervalId);
                    return $toastElement[method]({
                        duration: duration,
                        easing: easing,
                        complete: function () {
                            removeToast($toastElement);
                            clearTimeout(intervalId);
                            if (options.onHidden && response.state !== 'hidden') {
                                options.onHidden();
                            }
                            response.state = 'hidden';
                            response.endTime = new Date();
                            publish(response);
                        }
                    });
                }

                function delayedHideToast() {
                    if (options.timeOut > 0 || options.extendedTimeOut > 0) {
                        intervalId = setTimeout(hideToast, options.extendedTimeOut);
                        progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
                        progressBar.hideEta = new Date().getTime() + progressBar.maxHideTime;
                    }
                }

                function stickAround() {
                    clearTimeout(intervalId);
                    progressBar.hideEta = 0;
                    $toastElement.stop(true, true)[options.showMethod](
                        {duration: options.showDuration, easing: options.showEasing}
                    );
                }

                function updateProgress() {
                    var percentage = ((progressBar.hideEta - (new Date().getTime())) / progressBar.maxHideTime) * 100;
                    $progressElement.width(percentage + '%');
                }
            }

            function getOptions() {
                return $.extend({}, getDefaults(), toastr.options);
            }

            function removeToast($toastElement) {
                if (!$container) { $container = getContainer(); }
                if ($toastElement.is(':visible')) {
                    return;
                }
                $toastElement.remove();
                $toastElement = null;
                if ($container.children().length === 0) {
                    $container.remove();
                    previousToast = undefined;
                }
            }

        })();
    });
}(typeof define === 'function' && define.amd ? define : function (deps, factory) {
    if (typeof module !== 'undefined' && module.exports) { //Node
        module.exports = factory(require('jquery'));
    } else {
        window.toastr = factory(window.jQuery);
    }
}));

define('fast',['jquery', 'bootstrap', 'toastr', 'layer', 'lang'], function ($, undefined, Toastr, Layer, Lang) {
    var Fast = {
        config: {
            //toastr默认配置
            toastr: {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-center",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
        },
        events: {
            //请求成功的回调
            onAjaxSuccess: function (ret, onAjaxSuccess) {
                var data = typeof ret.data !== 'undefined' ? ret.data : null;
                var msg = typeof ret.msg !== 'undefined' && ret.msg ? ret.msg : __('Operation completed');

                if (typeof onAjaxSuccess === 'function') {
                    var result = onAjaxSuccess.call(this, data, ret);
                    if (result === false)
                        return;
                }
                Toastr.success(msg);
            },
            //请求错误的回调
            onAjaxError: function (ret, onAjaxError) {
                var data = typeof ret.data !== 'undefined' ? ret.data : null;
                if (typeof onAjaxError === 'function') {
                    var result = onAjaxError.call(this, data, ret);
                    if (result === false) {
                        return;
                    }
                }
                Toastr.error(ret.msg);
            },
            //服务器响应数据后
            onAjaxResponse: function (response) {
                try {
                    var ret = typeof response === 'object' ? response : JSON.parse(response);
                    if (!ret.hasOwnProperty('code')) {
                        $.extend(ret, {code: -2, msg: response, data: null});
                    }
                } catch (e) {
                    var ret = {code: -1, msg: e.message, data: null};
                }
                return ret;
            }
        },
        api: {
            //发送Ajax请求
            ajax: function (options, success, error) {
                options = typeof options === 'string' ? {url: options} : options;
                var index;
                if (typeof options.loading === 'undefined' || options.loading) {
                    index = Layer.load(options.loading || 0);
                }
                options = $.extend({
                    type: "POST",
                    dataType: "json",
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (ret) {
                        index && Layer.close(index);
                        ret = Fast.events.onAjaxResponse(ret);
                        if (ret.code === 1) {
                            Fast.events.onAjaxSuccess(ret, success);
                        } else {
                            Fast.events.onAjaxError(ret, error);
                        }
                    },
                    error: function (xhr) {
                        index && Layer.close(index);
                        var ret = {code: xhr.status, msg: xhr.statusText, data: null};
                        Fast.events.onAjaxError(ret, error);
                    }
                }, options);
                return $.ajax(options);
            },
            //修复URL
            fixurl: function (url) {
                if (url.substr(0, 1) !== "/") {
                    var r = new RegExp('^(?:[a-z]+:)?//', 'i');
                    if (!r.test(url)) {
                        url = Config.moduleurl + "/" + url;
                    }
                } else if (url.substr(0, 8) === "/addons/") {
                    url = Config.__PUBLIC__.replace(/(\/*$)/g, "") + url;
                }
                return url;
            },
            //获取修复后可访问的cdn链接
            cdnurl: function (url, domain) {
                var rule = new RegExp("^((?:[a-z]+:)?\\/\\/|data:image\\/)", "i");
                var cdnurl = Config.upload.cdnurl;
                url = rule.test(url) || (cdnurl && url.indexOf(cdnurl) === 0) ? url : cdnurl + url;
                if (domain && !rule.test(url)) {
                    domain = typeof domain === 'string' ? domain : location.origin;
                    url = domain + url;
                }
                return url;
            },
            //查询Url参数
            query: function (name, url) {
                if (!url) {
                    url = window.location.href;
                }
                name = name.replace(/[\[\]]/g, "\\$&");
                var regex = new RegExp("[?&/]" + name + "([=/]([^&#/?]*)|&|#|$)"),
                    results = regex.exec(url);
                if (!results)
                    return null;
                if (!results[2])
                    return '';
                return decodeURIComponent(results[2].replace(/\+/g, " "));
            },
            //打开一个弹出窗口
            open: function (url, title, options) {
                title = options && options.title ? options.title : (title ? title : "");
                url = Fast.api.fixurl(url);
                url = url + (url.indexOf("?") > -1 ? "&" : "?") + "dialog=1";
                var area = Fast.config.openArea != undefined ? Fast.config.openArea : [$(window).width() > 800 ? '800px' : '95%', $(window).height() > 600 ? '600px' : '95%'];
                options = $.extend({
                    type: 2,
                    title: title,
                    shadeClose: true,
                    shade: false,
                    maxmin: true,
                    moveOut: true,
                    area: area,
                    content: url,
                    zIndex: Layer.zIndex,
                    success: function (layero, index) {
                        var that = this;
                        //存储callback事件
                        $(layero).data("callback", that.callback);
                        //$(layero).removeClass("layui-layer-border");
                        Layer.setTop(layero);
                        try {
                            var frame = Layer.getChildFrame('html', index);
                            var layerfooter = frame.find(".layer-footer");
                            Fast.api.layerfooter(layero, index, that);

                            //绑定事件
                            if (layerfooter.size() > 0) {
                                // 监听窗口内的元素及属性变化
                                // Firefox和Chrome早期版本中带有前缀
                                var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
                                if (MutationObserver) {
                                    // 选择目标节点
                                    var target = layerfooter[0];
                                    // 创建观察者对象
                                    var observer = new MutationObserver(function (mutations) {
                                        Fast.api.layerfooter(layero, index, that);
                                        mutations.forEach(function (mutation) {
                                        });
                                    });
                                    // 配置观察选项:
                                    var config = {attributes: true, childList: true, characterData: true, subtree: true}
                                    // 传入目标节点和观察选项
                                    observer.observe(target, config);
                                    // 随后,你还可以停止观察
                                    // observer.disconnect();
                                }
                            }
                        } catch (e) {

                        }
                        if ($(layero).height() > $(window).height()) {
                            //当弹出窗口大于浏览器可视高度时,重定位
                            Layer.style(index, {
                                top: 0,
                                height: $(window).height()
                            });
                        }
                    }
                }, options ? options : {});
                if ($(window).width() < 480 || (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && top.$(".tab-pane.active").size() > 0)) {
                    options.area = [top.$(".tab-pane.active").width() + "px", top.$(".tab-pane.active").height() + "px"];
                    options.offset = [top.$(".tab-pane.active").scrollTop() + "px", "0px"];
                }
                return Layer.open(options);
            },
            //关闭窗口并回传数据
            close: function (data) {
                var index = parent.Layer.getFrameIndex(window.name);
                var callback = parent.$("#layui-layer" + index).data("callback");
                //再执行关闭
                parent.Layer.close(index);
                //再调用回传函数
                if (typeof callback === 'function') {
                    callback.call(undefined, data);
                }
            },
            layerfooter: function (layero, index, that) {
                var frame = Layer.getChildFrame('html', index);
                var layerfooter = frame.find(".layer-footer");
                if (layerfooter.size() > 0) {
                    $(".layui-layer-footer", layero).remove();
                    var footer = $("<div />").addClass('layui-layer-btn layui-layer-footer');
                    footer.html(layerfooter.html());
                    if ($(".row", footer).size() === 0) {
                        $(">", footer).wrapAll("<div class='row'></div>");
                    }
                    footer.insertAfter(layero.find('.layui-layer-content'));
                    //绑定事件
                    footer.on("click", ".btn", function () {
                        if ($(this).hasClass("disabled") || $(this).parent().hasClass("disabled")) {
                            return;
                        }
                        var index = footer.find('.btn').index(this);
                        $(".btn:eq(" + index + ")", layerfooter).trigger("click");
                    });

                    var titHeight = layero.find('.layui-layer-title').outerHeight() || 0;
                    var btnHeight = layero.find('.layui-layer-btn').outerHeight() || 0;
                    //重设iframe高度
                    $("iframe", layero).height(layero.height() - titHeight - btnHeight);
                }
                //修复iOS下弹出窗口的高度和iOS下iframe无法滚动的BUG
                if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                    var titHeight = layero.find('.layui-layer-title').outerHeight() || 0;
                    var btnHeight = layero.find('.layui-layer-btn').outerHeight() || 0;
                    $("iframe", layero).parent().css("height", layero.height() - titHeight - btnHeight);
                    $("iframe", layero).css("height", "100%");
                }
            },
            success: function (options, callback) {
                var type = typeof options === 'function';
                if (type) {
                    callback = options;
                }
                return Layer.msg(__('Operation completed'), $.extend({
                    offset: 0, icon: 1
                }, type ? {} : options), callback);
            },
            error: function (options, callback) {
                var type = typeof options === 'function';
                if (type) {
                    callback = options;
                }
                return Layer.msg(__('Operation failed'), $.extend({
                    offset: 0, icon: 2
                }, type ? {} : options), callback);
            },
            msg: function (message, url) {
                var callback = typeof url === 'function' ? url : function () {
                    if (typeof url !== 'undefined' && url) {
                        location.href = url;
                    }
                };
                Layer.msg(message, {
                    time: 2000
                }, callback);
            },
            toastr: Toastr,
            layer: Layer
        },
        lang: function () {
            var args = arguments,
                string = args[0],
                i = 1;
            string = string.toLowerCase();
            //string = typeof Lang[string] != 'undefined' ? Lang[string] : string;
            if (typeof Lang !== 'undefined' && typeof Lang[string] !== 'undefined') {
                if (typeof Lang[string] == 'object')
                    return Lang[string];
                string = Lang[string];
            } else if (string.indexOf('.') !== -1 && false) {
                var arr = string.split('.');
                var current = Lang[arr[0]];
                for (var i = 1; i < arr.length; i++) {
                    current = typeof current[arr[i]] != 'undefined' ? current[arr[i]] : '';
                    if (typeof current != 'object')
                        break;
                }
                if (typeof current == 'object')
                    return current;
                string = current;
            } else {
                string = args[0];
            }
            return string.replace(/%((%)|s|d)/g, function (m) {
                // m is the matched format, e.g. %s, %d
                var val = null;
                if (m[2]) {
                    val = m[2];
                } else {
                    val = args[i];
                    // A switch statement so that the formatter can be extended. Default is %s
                    switch (m) {
                        case '%d':
                            val = parseFloat(val);
                            if (isNaN(val)) {
                                val = 0;
                            }
                            break;
                    }
                    i++;
                }
                return val;
            });
        },
        init: function () {
            // 对相对地址进行处理
            $.ajaxSetup({
                beforeSend: function (xhr, setting) {
                    setting.url = Fast.api.fixurl(setting.url);
                }
            });
            Layer.config({
                skin: 'layui-layer-fast'
            });
            // 绑定ESC关闭窗口事件
            $(window).keyup(function (e) {
                if (e.keyCode == 27) {
                    if ($(".layui-layer").size() > 0) {
                        var index = 0;
                        $(".layui-layer").each(function () {
                            index = Math.max(index, parseInt($(this).attr("times")));
                        });
                        if (index) {
                            Layer.close(index);
                        }
                    }
                }
            });

            //公共代码
            //配置Toastr的参数
            Toastr.options = Fast.config.toastr;
        }
    };
    //将Layer暴露到全局中去
    window.Layer = Layer;
    //将Toastr暴露到全局中去
    window.Toastr = Toastr;
    //将语言方法暴露到全局中去
    window.__ = Fast.lang;
    //将Fast渲染至全局
    window.Fast = Fast;

    //默认初始化执行的代码
    Fast.init();
    return Fast;
});

/*!art-template - Template Engine | http://aui.github.com/artTemplate/*/
!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(a){throw a.temp="function anonymous($data,$filename) {"+z+"}",a}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a)(b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;c<d;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(a){return a.filename=h||"anonymous",a.name="Syntax Error",p(a)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;"object"==typeof exports&&"undefined"!=typeof module?module.exports=d:"function"==typeof define?define('template',[],function(){return d}):this.template=d}();
//! moment.js
//! version : 2.29.1
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('moment/moment',factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks() {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback(callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return (
            input instanceof Array ||
            Object.prototype.toString.call(input) === '[object Array]'
        );
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return (
            input != null &&
            Object.prototype.toString.call(input) === '[object Object]'
        );
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return Object.getOwnPropertyNames(obj).length === 0;
        } else {
            var k;
            for (k in obj) {
                if (hasOwnProp(obj, k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return (
            typeof input === 'number' ||
            Object.prototype.toString.call(input) === '[object Number]'
        );
    }

    function isDate(input) {
        return (
            input instanceof Date ||
            Object.prototype.toString.call(input) === '[object Date]'
        );
    }

    function map(arr, fn) {
        var res = [],
            i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty: false,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: false,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: false,
            userInvalidated: false,
            iso: false,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: false,
            weekdayMismatch: false,
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this),
                len = t.length >>> 0,
                i;

            for (i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m),
                parsedParts = some.call(flags.parsedDateParts, function (i) {
                    return i != null;
                }),
                isNowValid =
                    !isNaN(m._d.getTime()) &&
                    flags.overflow < 0 &&
                    !flags.empty &&
                    !flags.invalidEra &&
                    !flags.invalidMonth &&
                    !flags.invalidWeekday &&
                    !flags.weekdayMismatch &&
                    !flags.nullInput &&
                    !flags.invalidFormat &&
                    !flags.userInvalidated &&
                    (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid =
                    isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            } else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid(flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        } else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = (hooks.momentProperties = []),
        updateInProgress = false;

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment(obj) {
        return (
            obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
        );
    }

    function warn(msg) {
        if (
            hooks.suppressDeprecationWarnings === false &&
            typeof console !== 'undefined' &&
            console.warn
        ) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [],
                    arg,
                    i,
                    key;
                for (i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (key in arguments[0]) {
                            if (hasOwnProp(arguments[0], key)) {
                                arg += key + ': ' + arguments[0][key] + ', ';
                            }
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(
                    msg +
                        '\nArguments: ' +
                        Array.prototype.slice.call(args).join('') +
                        '\n' +
                        new Error().stack
                );
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return (
            (typeof Function !== 'undefined' && input instanceof Function) ||
            Object.prototype.toString.call(input) === '[object Function]'
        );
    }

    function set(config) {
        var prop, i;
        for (i in config) {
            if (hasOwnProp(config, i)) {
                prop = config[i];
                if (isFunction(prop)) {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' +
                /\d{1,2}/.source
        );
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig),
            prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (
                hasOwnProp(parentConfig, prop) &&
                !hasOwnProp(childConfig, prop) &&
                isObject(parentConfig[prop])
            ) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i,
                res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L',
    };

    function calendar(key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (
            (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
            absNumber
        );
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        formatFunctions = {},
        formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken(token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(
                    func.apply(this, arguments),
                    token
                );
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens),
            i,
            length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '',
                i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i])
                    ? array[i].call(mom, format)
                    : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] =
            formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(
                localFormattingTokens,
                replaceLongDateFormatTokens
            );
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var defaultLongDateFormat = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A',
    };

    function longDateFormat(key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper
            .match(formattingTokens)
            .map(function (tok) {
                if (
                    tok === 'MMMM' ||
                    tok === 'MM' ||
                    tok === 'DD' ||
                    tok === 'dddd'
                ) {
                    return tok.slice(1);
                }
                return tok;
            })
            .join('');

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate() {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d',
        defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal(number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        ss: '%d seconds',
        m: 'a minute',
        mm: '%d minutes',
        h: 'an hour',
        hh: '%d hours',
        d: 'a day',
        dd: '%d days',
        w: 'a week',
        ww: '%d weeks',
        M: 'a month',
        MM: '%d months',
        y: 'a year',
        yy: '%d years',
    };

    function relativeTime(number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return isFunction(output)
            ? output(number, withoutSuffix, string, isFuture)
            : output.replace(/%d/i, number);
    }

    function pastFuture(diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias(unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string'
            ? aliases[units] || aliases[units.toLowerCase()]
            : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [],
            u;
        for (u in unitsObj) {
            if (hasOwnProp(unitsObj, u)) {
                units.push({ unit: u, priority: priorities[u] });
            }
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function absFloor(number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    function makeGetSet(unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get(mom, unit) {
        return mom.isValid()
            ? mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]()
            : NaN;
    }

    function set$1(mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (
                unit === 'FullYear' &&
                isLeapYear(mom.year()) &&
                mom.month() === 1 &&
                mom.date() === 29
            ) {
                value = toInt(value);
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](
                    value,
                    mom.month(),
                    daysInMonth(value, mom.month())
                );
            } else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet(units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }

    function stringSet(units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units),
                i;
            for (i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    var match1 = /\d/, //       0 - 9
        match2 = /\d\d/, //      00 - 99
        match3 = /\d{3}/, //     000 - 999
        match4 = /\d{4}/, //    0000 - 9999
        match6 = /[+-]?\d{6}/, // -999999 - 999999
        match1to2 = /\d\d?/, //       0 - 99
        match3to4 = /\d\d\d\d?/, //     999 - 9999
        match5to6 = /\d\d\d\d\d\d?/, //   99999 - 999999
        match1to3 = /\d{1,3}/, //       0 - 999
        match1to4 = /\d{1,4}/, //       0 - 9999
        match1to6 = /[+-]?\d{1,6}/, // -999999 - 999999
        matchUnsigned = /\d+/, //       0 - inf
        matchSigned = /[+-]?\d+/, //    -inf - inf
        matchOffset = /Z|[+-]\d\d:?\d\d/gi, // +00:00 -00:00 +0000 -0000 or Z
        matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, // +00 -00 +00:00 -00:00 +0000 -0000 or Z
        matchTimestamp = /[+-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123
        // any word (or two) characters or numbers including two/three word month in arabic.
        // includes scottish gaelic two word and hyphenated months
        matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
        regexes;

    regexes = {};

    function addRegexToken(token, regex, strictRegex) {
        regexes[token] = isFunction(regex)
            ? regex
            : function (isStrict, localeData) {
                  return isStrict && strictRegex ? strictRegex : regex;
              };
    }

    function getParseRegexForToken(token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(
            s
                .replace('\\', '')
                .replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (
                    matched,
                    p1,
                    p2,
                    p3,
                    p4
                ) {
                    return p1 || p2 || p3 || p4;
                })
        );
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken(token, callback) {
        var i,
            func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken(token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,
        WEEK = 7,
        WEEKDAY = 8;

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1
            ? isLeapYear(year)
                ? 29
                : 28
            : 31 - ((modMonth % 7) % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M', match1to2);
    addRegexToken('MM', match1to2, match2);
    addRegexToken('MMM', function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split(
            '_'
        ),
        defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split(
            '_'
        ),
        MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        defaultMonthsShortRegex = matchWord,
        defaultMonthsRegex = matchWord;

    function localeMonths(m, format) {
        if (!m) {
            return isArray(this._months)
                ? this._months
                : this._months['standalone'];
        }
        return isArray(this._months)
            ? this._months[m.month()]
            : this._months[
                  (this._months.isFormat || MONTHS_IN_FORMAT).test(format)
                      ? 'format'
                      : 'standalone'
              ][m.month()];
    }

    function localeMonthsShort(m, format) {
        if (!m) {
            return isArray(this._monthsShort)
                ? this._monthsShort
                : this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort)
            ? this._monthsShort[m.month()]
            : this._monthsShort[
                  MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'
              ][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i,
            ii,
            mom,
            llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse(monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp(
                    '^' + this.months(mom, '').replace('.', '') + '$',
                    'i'
                );
                this._shortMonthsParse[i] = new RegExp(
                    '^' + this.monthsShort(mom, '').replace('.', '') + '$',
                    'i'
                );
            }
            if (!strict && !this._monthsParse[i]) {
                regex =
                    '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'MMMM' &&
                this._longMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'MMM' &&
                this._shortMonthsParse[i].test(monthName)
            ) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth(mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth(value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth() {
        return daysInMonth(this.year(), this.month());
    }

    function monthsShortRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict
                ? this._monthsShortStrictRegex
                : this._monthsShortRegex;
        }
    }

    function monthsRegex(isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict
                ? this._monthsStrictRegex
                : this._monthsRegex;
        }
    }

    function computeMonthsParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._monthsShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? zeroFill(y, 4) : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY', 4], 0, 'year');
    addFormatToken(0, ['YYYYY', 5], 0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y', matchSigned);
    addRegexToken('YY', match1to2, match2);
    addRegexToken('YYYY', match1to4, match4);
    addRegexToken('YYYYY', match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] =
            input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear() {
        return isLeapYear(this.year());
    }

    function createDate(y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate(y) {
        var date, args;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear,
            resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear,
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek,
            resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear,
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w', match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W', match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek(mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow: 0, // Sunday is the first day of the week.
        doy: 6, // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek() {
        return this._week.dow;
    }

    function localeFirstDayOfYear() {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek(input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek(input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d', match1to2);
    addRegexToken('e', match1to2);
    addRegexToken('E', match1to2);
    addRegexToken('dd', function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd', function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd', function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays(ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split(
            '_'
        ),
        defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
        defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
        defaultWeekdaysRegex = matchWord,
        defaultWeekdaysShortRegex = matchWord,
        defaultWeekdaysMinRegex = matchWord;

    function localeWeekdays(m, format) {
        var weekdays = isArray(this._weekdays)
            ? this._weekdays
            : this._weekdays[
                  m && m !== true && this._weekdays.isFormat.test(format)
                      ? 'format'
                      : 'standalone'
              ];
        return m === true
            ? shiftWeekdays(weekdays, this._week.dow)
            : m
            ? weekdays[m.day()]
            : weekdays;
    }

    function localeWeekdaysShort(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : m
            ? this._weekdaysShort[m.day()]
            : this._weekdaysShort;
    }

    function localeWeekdaysMin(m) {
        return m === true
            ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : m
            ? this._weekdaysMin[m.day()]
            : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i,
            ii,
            mom,
            llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(
                    mom,
                    ''
                ).toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse(weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdays(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._shortWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
                this._minWeekdaysParse[i] = new RegExp(
                    '^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$',
                    'i'
                );
            }
            if (!this._weekdaysParse[i]) {
                regex =
                    '^' +
                    this.weekdays(mom, '') +
                    '|^' +
                    this.weekdaysShort(mom, '') +
                    '|^' +
                    this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (
                strict &&
                format === 'dddd' &&
                this._fullWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'ddd' &&
                this._shortWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (
                strict &&
                format === 'dd' &&
                this._minWeekdaysParse[i].test(weekdayName)
            ) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek(input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    function weekdaysRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict
                ? this._weekdaysStrictRegex
                : this._weekdaysRegex;
        }
    }

    function weekdaysShortRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict
                ? this._weekdaysShortStrictRegex
                : this._weekdaysShortRegex;
        }
    }

    function weekdaysMinRegex(isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict
                ? this._weekdaysMinStrictRegex
                : this._weekdaysMinRegex;
        }
    }

    function computeWeekdaysParse() {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [],
            shortPieces = [],
            longPieces = [],
            mixedPieces = [],
            i,
            mom,
            minp,
            shortp,
            longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = regexEscape(this.weekdaysMin(mom, ''));
            shortp = regexEscape(this.weekdaysShort(mom, ''));
            longp = regexEscape(this.weekdays(mom, ''));
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp(
            '^(' + longPieces.join('|') + ')',
            'i'
        );
        this._weekdaysShortStrictRegex = new RegExp(
            '^(' + shortPieces.join('|') + ')',
            'i'
        );
        this._weekdaysMinStrictRegex = new RegExp(
            '^(' + minPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return (
            '' +
            hFormat.apply(this) +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return (
            '' +
            this.hours() +
            zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2)
        );
    });

    function meridiem(token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(
                this.hours(),
                this.minutes(),
                lowercase
            );
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem(isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a', matchMeridiem);
    addRegexToken('A', matchMeridiem);
    addRegexToken('H', match1to2);
    addRegexToken('h', match1to2);
    addRegexToken('k', match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4,
            pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM(input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return (input + '').toLowerCase().charAt(0) === 'p';
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
        // Setting the hour should keep the time, because the user explicitly
        // specified which hour they want. So trying to maintain the same hour (in
        // a new timezone) makes sense. Adding/subtracting hours does not follow
        // this rule.
        getSetHour = makeGetSet('Hours', true);

    function localeMeridiem(hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse,
    };

    // internal storage for locale config files
    var locales = {},
        localeFamilies = {},
        globalLocale;

    function commonPrefix(arr1, arr2) {
        var i,
            minl = Math.min(arr1.length, arr2.length);
        for (i = 0; i < minl; i += 1) {
            if (arr1[i] !== arr2[i]) {
                return i;
            }
        }
        return minl;
    }

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0,
            j,
            next,
            locale,
            split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (
                    next &&
                    next.length >= j &&
                    commonPrefix(split, next) >= j - 1
                ) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null,
            aliasedRequire;
        // TODO: Find a better way to register and load all the locales in Node
        if (
            locales[name] === undefined &&
            typeof module !== 'undefined' &&
            module &&
            module.exports
        ) {
            try {
                oldLocale = globalLocale._abbr;
                aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {
                // mark as not found to avoid repeating expensive file require call causing high CPU
                // when trying to find en-US, en_US, en-us for every format call
                locales[name] = null; // null means not found
            }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale(key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            } else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            } else {
                if (typeof console !== 'undefined' && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn(
                        'Locale ' + key + ' not found. Did you forget to load it?'
                    );
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale(name, config) {
        if (config !== null) {
            var locale,
                parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple(
                    'defineLocaleOverride',
                    'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.'
                );
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config,
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale,
                tmpLocale,
                parentConfig = baseConfig;

            if (locales[name] != null && locales[name].parentLocale != null) {
                // Update existing child locale in-place to avoid memory-leaks
                locales[name].set(mergeConfigs(locales[name]._config, config));
            } else {
                // MERGE
                tmpLocale = loadLocale(name);
                if (tmpLocale != null) {
                    parentConfig = tmpLocale._config;
                }
                config = mergeConfigs(parentConfig, config);
                if (tmpLocale == null) {
                    // updateLocale is called for creating a new locale
                    // Set abbr so it will have a name (getters return
                    // undefined otherwise).
                    config.abbr = name;
                }
                locale = new Locale(config);
                locale.parentLocale = locales[name];
                locales[name] = locale;
            }

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                    if (name === getSetGlobalLocale()) {
                        getSetGlobalLocale(name);
                    }
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale(key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow(m) {
        var overflow,
            a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH] < 0 || a[MONTH] > 11
                    ? MONTH
                    : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
                    ? DATE
                    : a[HOUR] < 0 ||
                      a[HOUR] > 24 ||
                      (a[HOUR] === 24 &&
                          (a[MINUTE] !== 0 ||
                              a[SECOND] !== 0 ||
                              a[MILLISECOND] !== 0))
                    ? HOUR
                    : a[MINUTE] < 0 || a[MINUTE] > 59
                    ? MINUTE
                    : a[SECOND] < 0 || a[SECOND] > 59
                    ? SECOND
                    : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                    ? MILLISECOND
                    : -1;

            if (
                getParsingFlags(m)._overflowDayOfYear &&
                (overflow < YEAR || overflow > DATE)
            ) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
        isoDates = [
            ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
            ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
            ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
            ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
            ['YYYY-DDD', /\d{4}-\d{3}/],
            ['YYYY-MM', /\d{4}-\d\d/, false],
            ['YYYYYYMMDD', /[+-]\d{10}/],
            ['YYYYMMDD', /\d{8}/],
            ['GGGG[W]WWE', /\d{4}W\d{3}/],
            ['GGGG[W]WW', /\d{4}W\d{2}/, false],
            ['YYYYDDD', /\d{7}/],
            ['YYYYMM', /\d{6}/, false],
            ['YYYY', /\d{4}/, false],
        ],
        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
            ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
            ['HH:mm:ss', /\d\d:\d\d:\d\d/],
            ['HH:mm', /\d\d:\d\d/],
            ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
            ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
            ['HHmmss', /\d\d\d\d\d\d/],
            ['HHmm', /\d\d\d\d/],
            ['HH', /\d\d/],
        ],
        aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
        // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
        rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
        obsOffsets = {
            UT: 0,
            GMT: 0,
            EDT: -4 * 60,
            EST: -5 * 60,
            CDT: -5 * 60,
            CST: -6 * 60,
            MDT: -6 * 60,
            MST: -7 * 60,
            PDT: -7 * 60,
            PST: -8 * 60,
        };

    // date from iso format
    function configFromISO(config) {
        var i,
            l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime,
            dateFormat,
            timeFormat,
            tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    function extractFromRFC2822Strings(
        yearStr,
        monthStr,
        dayStr,
        hourStr,
        minuteStr,
        secondStr
    ) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10),
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s
            .replace(/\([^)]*\)|[\n\t]/g, ' ')
            .replace(/(\s\s+)/g, ' ')
            .replace(/^\s\s*/, '')
            .replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an independent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(
                    parsedInput[0],
                    parsedInput[1],
                    parsedInput[2]
                ).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10),
                m = hm % 100,
                h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i)),
            parsedArray;
        if (match) {
            parsedArray = extractFromRFC2822Strings(
                match[4],
                match[3],
                match[2],
                match[5],
                match[6],
                match[7]
            );
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from 1) ASP.NET, 2) ISO, 3) RFC 2822 formats, or 4) optional fallback if parsing isn't strict
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);
        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        if (config._strict) {
            config._isValid = false;
        } else {
            // Final attempt, use Input Fallback
            hooks.createFromInputFallback(config);
        }
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
            'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
            'discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [
                nowValue.getUTCFullYear(),
                nowValue.getUTCMonth(),
                nowValue.getUTCDate(),
            ];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray(config) {
        var i,
            date,
            input = [],
            currentDate,
            expectedWeekday,
            yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (
                config._dayOfYear > daysInYear(yearToUse) ||
                config._dayOfYear === 0
            ) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] =
                config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (
            config._a[HOUR] === 24 &&
            config._a[MINUTE] === 0 &&
            config._a[SECOND] === 0 &&
            config._a[MILLISECOND] === 0
        ) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(
            null,
            input
        );
        expectedWeekday = config._useUTC
            ? config._d.getUTCDay()
            : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (
            config._w &&
            typeof config._w.d !== 'undefined' &&
            config._w.d !== expectedWeekday
        ) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(
                w.GG,
                config._a[YEAR],
                weekOfYear(createLocal(), 1, 4).year
            );
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i,
            parsedInput,
            tokens,
            token,
            skipped,
            stringLength = string.length,
            totalParsedInputLength = 0,
            era;

        tokens =
            expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) ||
                [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(
                    string.indexOf(parsedInput) + parsedInput.length
                );
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                } else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            } else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver =
            stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (
            config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0
        ) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(
            config._locale,
            config._a[HOUR],
            config._meridiem
        );

        // handle era
        era = getParsingFlags(config).era;
        if (era !== null) {
            config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
        }

        configFromArray(config);
        checkOverflow(config);
    }

    function meridiemFixWrap(locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,
            scoreToBeat,
            i,
            currentScore,
            validFormatFound,
            bestFormatIsValid = false;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            validFormatFound = false;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (isValid(tempConfig)) {
                validFormatFound = true;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (!bestFormatIsValid) {
                if (
                    scoreToBeat == null ||
                    currentScore < scoreToBeat ||
                    validFormatFound
                ) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                    if (validFormatFound) {
                        bestFormatIsValid = true;
                    }
                }
            } else {
                if (currentScore < scoreToBeat) {
                    scoreToBeat = currentScore;
                    bestMoment = tempConfig;
                }
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i),
            dayOrDate = i.day === undefined ? i.date : i.day;
        config._a = map(
            [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
            function (obj) {
                return obj && parseInt(obj, 10);
            }
        );

        configFromArray(config);
    }

    function createFromConfig(config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig(config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({ nullInput: true });
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC(input, format, locale, strict, isUTC) {
        var c = {};

        if (format === true || format === false) {
            strict = format;
            format = undefined;
        }

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if (
            (isObject(input) && isObjectEmpty(input)) ||
            (isArray(input) && input.length === 0)
        ) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal(input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
            'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other < this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        ),
        prototypeMax = deprecate(
            'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
            function () {
                var other = createLocal.apply(null, arguments);
                if (this.isValid() && other.isValid()) {
                    return other > this ? this : other;
                } else {
                    return createInvalid();
                }
            }
        );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max() {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +new Date();
    };

    var ordering = [
        'year',
        'quarter',
        'month',
        'week',
        'day',
        'hour',
        'minute',
        'second',
        'millisecond',
    ];

    function isDurationValid(m) {
        var key,
            unitHasDecimal = false,
            i;
        for (key in m) {
            if (
                hasOwnProp(m, key) &&
                !(
                    indexOf.call(ordering, key) !== -1 &&
                    (m[key] == null || !isNaN(m[key]))
                )
            ) {
                return false;
            }
        }

        for (i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds =
            +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days + weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months + quarters * 3 + years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration(obj) {
        return obj instanceof Duration;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if (
                (dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
            ) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    // FORMATTING

    function offset(token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset(),
                sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return (
                sign +
                zeroFill(~~(offset / 60), 2) +
                separator +
                zeroFill(~~offset % 60, 2)
            );
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z', matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher),
            chunk,
            parts,
            minutes;

        if (matches === null) {
            return null;
        }

        chunk = matches[matches.length - 1] || [];
        parts = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ? 0 : parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff =
                (isMoment(input) || isDate(input)
                    ? input.valueOf()
                    : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset(m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset());
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset(input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(
                        this,
                        createDuration(input - offset, 'm'),
                        1,
                        false
                    );
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone(input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC(keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal(keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset() {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            } else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset(input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime() {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted() {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {},
            other;

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted =
                this.isValid() && compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal() {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset() {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc() {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        // and further modified to allow for strings containing both week and day
        isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration(input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms: input._milliseconds,
                d: input._days,
                M: input._months,
            };
        } else if (isNumber(input) || !isNaN(+input)) {
            duration = {};
            if (key) {
                duration[key] = +input;
            } else {
                duration.milliseconds = +input;
            }
        } else if ((match = aspNetRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(absRound(match[MILLISECOND] * 1000)) * sign, // the millisecond decimal point is included in the match
            };
        } else if ((match = isoRegex.exec(input))) {
            sign = match[1] === '-' ? -1 : 1;
            duration = {
                y: parseIso(match[2], sign),
                M: parseIso(match[3], sign),
                w: parseIso(match[4], sign),
                d: parseIso(match[5], sign),
                h: parseIso(match[6], sign),
                m: parseIso(match[7], sign),
                s: parseIso(match[8], sign),
            };
        } else if (duration == null) {
            // checks for null or undefined
            duration = {};
        } else if (
            typeof duration === 'object' &&
            ('from' in duration || 'to' in duration)
        ) {
            diffRes = momentsDifference(
                createLocal(duration.from),
                createLocal(duration.to)
            );

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        if (isDuration(input) && hasOwnProp(input, '_isValid')) {
            ret._isValid = input._isValid;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso(inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months =
            other.month() - base.month() + (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +base.clone().add(res.months, 'M');

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return { milliseconds: 0, months: 0 };
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(
                    name,
                    'moment().' +
                        name +
                        '(period, number) is deprecated. Please use moment().' +
                        name +
                        '(number, period). ' +
                        'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.'
                );
                tmp = val;
                val = period;
                period = tmp;
            }

            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract(mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add = createAdder(1, 'add'),
        subtract = createAdder(-1, 'subtract');

    function isString(input) {
        return typeof input === 'string' || input instanceof String;
    }

    // type MomentInput = Moment | Date | string | number | (number | string)[] | MomentInputObject | void; // null | undefined
    function isMomentInput(input) {
        return (
            isMoment(input) ||
            isDate(input) ||
            isString(input) ||
            isNumber(input) ||
            isNumberOrStringArray(input) ||
            isMomentInputObject(input) ||
            input === null ||
            input === undefined
        );
    }

    function isMomentInputObject(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'years',
                'year',
                'y',
                'months',
                'month',
                'M',
                'days',
                'day',
                'd',
                'dates',
                'date',
                'D',
                'hours',
                'hour',
                'h',
                'minutes',
                'minute',
                'm',
                'seconds',
                'second',
                's',
                'milliseconds',
                'millisecond',
                'ms',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function isNumberOrStringArray(input) {
        var arrayTest = isArray(input),
            dataTypeTest = false;
        if (arrayTest) {
            dataTypeTest =
                input.filter(function (item) {
                    return !isNumber(item) && isString(input);
                }).length === 0;
        }
        return arrayTest && dataTypeTest;
    }

    function isCalendarSpec(input) {
        var objectTest = isObject(input) && !isObjectEmpty(input),
            propertyTest = false,
            properties = [
                'sameDay',
                'nextDay',
                'lastDay',
                'nextWeek',
                'lastWeek',
                'sameElse',
            ],
            i,
            property;

        for (i = 0; i < properties.length; i += 1) {
            property = properties[i];
            propertyTest = propertyTest || hasOwnProp(input, property);
        }

        return objectTest && propertyTest;
    }

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6
            ? 'sameElse'
            : diff < -1
            ? 'lastWeek'
            : diff < 0
            ? 'lastDay'
            : diff < 1
            ? 'sameDay'
            : diff < 2
            ? 'nextDay'
            : diff < 7
            ? 'nextWeek'
            : 'sameElse';
    }

    function calendar$1(time, formats) {
        // Support for single parameter, formats only overload to the calendar function
        if (arguments.length === 1) {
            if (!arguments[0]) {
                time = undefined;
                formats = undefined;
            } else if (isMomentInput(arguments[0])) {
                time = arguments[0];
                formats = undefined;
            } else if (isCalendarSpec(arguments[0])) {
                formats = arguments[0];
                time = undefined;
            }
        }
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse',
            output =
                formats &&
                (isFunction(formats[format])
                    ? formats[format].call(this, now)
                    : formats[format]);

        return this.format(
            output || this.localeData().calendar(format, this, createLocal(now))
        );
    }

    function clone() {
        return new Moment(this);
    }

    function isAfter(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween(from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (
            (inclusivity[0] === '('
                ? this.isAfter(localFrom, units)
                : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')'
                ? this.isBefore(localTo, units)
                : !this.isAfter(localTo, units))
        );
    }

    function isSame(input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return (
                this.clone().startOf(units).valueOf() <= inputMs &&
                inputMs <= this.clone().endOf(units).valueOf()
            );
        }
    }

    function isSameOrAfter(input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore(input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff(input, units, asFloat) {
        var that, zoneDelta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year':
                output = monthDiff(this, that) / 12;
                break;
            case 'month':
                output = monthDiff(this, that);
                break;
            case 'quarter':
                output = monthDiff(this, that) / 3;
                break;
            case 'second':
                output = (this - that) / 1e3;
                break; // 1000
            case 'minute':
                output = (this - that) / 6e4;
                break; // 1000 * 60
            case 'hour':
                output = (this - that) / 36e5;
                break; // 1000 * 60 * 60
            case 'day':
                output = (this - that - zoneDelta) / 864e5;
                break; // 1000 * 60 * 60 * 24, negate dst
            case 'week':
                output = (this - that - zoneDelta) / 6048e5;
                break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default:
                output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff(a, b) {
        if (a.date() < b.date()) {
            // end-of-month calculations work correct when the start month has more
            // days than the end month.
            return -monthDiff(b, a);
        }
        // difference in months
        var wholeMonthDiff = (b.year() - a.year()) * 12 + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2,
            adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString() {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true,
            m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(
                m,
                utc
                    ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]'
                    : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ'
            );
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000)
                    .toISOString()
                    .replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(
            m,
            utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ'
        );
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect() {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment',
            zone = '',
            prefix,
            year,
            datetime,
            suffix;
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        prefix = '[' + func + '("]';
        year = 0 <= this.year() && this.year() <= 9999 ? 'YYYY' : 'YYYYYY';
        datetime = '-MM-DD[T]HH:mm:ss.SSS';
        suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format(inputString) {
        if (!inputString) {
            inputString = this.isUtc()
                ? hooks.defaultFormatUtc
                : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ to: this, from: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow(withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to(time, withoutSuffix) {
        if (
            this.isValid() &&
            ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
        ) {
            return createDuration({ from: this, to: time })
                .locale(this.locale())
                .humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow(withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale(key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData() {
        return this._locale;
    }

    var MS_PER_SECOND = 1000,
        MS_PER_MINUTE = 60 * MS_PER_SECOND,
        MS_PER_HOUR = 60 * MS_PER_MINUTE,
        MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return ((dividend % divisor) + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(
                    this.year(),
                    this.month() - (this.month() % 3),
                    1
                );
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - this.weekday()
                );
                break;
            case 'isoWeek':
                time = startOfDate(
                    this.year(),
                    this.month(),
                    this.date() - (this.isoWeekday() - 1)
                );
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(
                    time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                    MS_PER_HOUR
                );
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf(units) {
        var time, startOfDate;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time =
                    startOfDate(
                        this.year(),
                        this.month() - (this.month() % 3) + 3,
                        1
                    ) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - this.weekday() + 7
                    ) - 1;
                break;
            case 'isoWeek':
                time =
                    startOfDate(
                        this.year(),
                        this.month(),
                        this.date() - (this.isoWeekday() - 1) + 7
                    ) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time +=
                    MS_PER_HOUR -
                    mod$1(
                        time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
                        MS_PER_HOUR
                    ) -
                    1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf() {
        return this._d.valueOf() - (this._offset || 0) * 60000;
    }

    function unix() {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate() {
        return new Date(this.valueOf());
    }

    function toArray() {
        var m = this;
        return [
            m.year(),
            m.month(),
            m.date(),
            m.hour(),
            m.minute(),
            m.second(),
            m.millisecond(),
        ];
    }

    function toObject() {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds(),
        };
    }

    function toJSON() {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2() {
        return isValid(this);
    }

    function parsingFlags() {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt() {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict,
        };
    }

    addFormatToken('N', 0, 0, 'eraAbbr');
    addFormatToken('NN', 0, 0, 'eraAbbr');
    addFormatToken('NNN', 0, 0, 'eraAbbr');
    addFormatToken('NNNN', 0, 0, 'eraName');
    addFormatToken('NNNNN', 0, 0, 'eraNarrow');

    addFormatToken('y', ['y', 1], 'yo', 'eraYear');
    addFormatToken('y', ['yy', 2], 0, 'eraYear');
    addFormatToken('y', ['yyy', 3], 0, 'eraYear');
    addFormatToken('y', ['yyyy', 4], 0, 'eraYear');

    addRegexToken('N', matchEraAbbr);
    addRegexToken('NN', matchEraAbbr);
    addRegexToken('NNN', matchEraAbbr);
    addRegexToken('NNNN', matchEraName);
    addRegexToken('NNNNN', matchEraNarrow);

    addParseToken(['N', 'NN', 'NNN', 'NNNN', 'NNNNN'], function (
        input,
        array,
        config,
        token
    ) {
        var era = config._locale.erasParse(input, token, config._strict);
        if (era) {
            getParsingFlags(config).era = era;
        } else {
            getParsingFlags(config).invalidEra = input;
        }
    });

    addRegexToken('y', matchUnsigned);
    addRegexToken('yy', matchUnsigned);
    addRegexToken('yyy', matchUnsigned);
    addRegexToken('yyyy', matchUnsigned);
    addRegexToken('yo', matchEraYearOrdinal);

    addParseToken(['y', 'yy', 'yyy', 'yyyy'], YEAR);
    addParseToken(['yo'], function (input, array, config, token) {
        var match;
        if (config._locale._eraYearOrdinalRegex) {
            match = input.match(config._locale._eraYearOrdinalRegex);
        }

        if (config._locale.eraYearOrdinalParse) {
            array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
        } else {
            array[YEAR] = parseInt(input, 10);
        }
    });

    function localeEras(m, format) {
        var i,
            l,
            date,
            eras = this._eras || getLocale('en')._eras;
        for (i = 0, l = eras.length; i < l; ++i) {
            switch (typeof eras[i].since) {
                case 'string':
                    // truncate time
                    date = hooks(eras[i].since).startOf('day');
                    eras[i].since = date.valueOf();
                    break;
            }

            switch (typeof eras[i].until) {
                case 'undefined':
                    eras[i].until = +Infinity;
                    break;
                case 'string':
                    // truncate time
                    date = hooks(eras[i].until).startOf('day').valueOf();
                    eras[i].until = date.valueOf();
                    break;
            }
        }
        return eras;
    }

    function localeErasParse(eraName, format, strict) {
        var i,
            l,
            eras = this.eras(),
            name,
            abbr,
            narrow;
        eraName = eraName.toUpperCase();

        for (i = 0, l = eras.length; i < l; ++i) {
            name = eras[i].name.toUpperCase();
            abbr = eras[i].abbr.toUpperCase();
            narrow = eras[i].narrow.toUpperCase();

            if (strict) {
                switch (format) {
                    case 'N':
                    case 'NN':
                    case 'NNN':
                        if (abbr === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNN':
                        if (name === eraName) {
                            return eras[i];
                        }
                        break;

                    case 'NNNNN':
                        if (narrow === eraName) {
                            return eras[i];
                        }
                        break;
                }
            } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
                return eras[i];
            }
        }
    }

    function localeErasConvertYear(era, year) {
        var dir = era.since <= era.until ? +1 : -1;
        if (year === undefined) {
            return hooks(era.since).year();
        } else {
            return hooks(era.since).year() + (year - era.offset) * dir;
        }
    }

    function getEraName() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].name;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].name;
            }
        }

        return '';
    }

    function getEraNarrow() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].narrow;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].narrow;
            }
        }

        return '';
    }

    function getEraAbbr() {
        var i,
            l,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (eras[i].since <= val && val <= eras[i].until) {
                return eras[i].abbr;
            }
            if (eras[i].until <= val && val <= eras[i].since) {
                return eras[i].abbr;
            }
        }

        return '';
    }

    function getEraYear() {
        var i,
            l,
            dir,
            val,
            eras = this.localeData().eras();
        for (i = 0, l = eras.length; i < l; ++i) {
            dir = eras[i].since <= eras[i].until ? +1 : -1;

            // truncate time
            val = this.clone().startOf('day').valueOf();

            if (
                (eras[i].since <= val && val <= eras[i].until) ||
                (eras[i].until <= val && val <= eras[i].since)
            ) {
                return (
                    (this.year() - hooks(eras[i].since).year()) * dir +
                    eras[i].offset
                );
            }
        }

        return this.year();
    }

    function erasNameRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNameRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNameRegex : this._erasRegex;
    }

    function erasAbbrRegex(isStrict) {
        if (!hasOwnProp(this, '_erasAbbrRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }

    function erasNarrowRegex(isStrict) {
        if (!hasOwnProp(this, '_erasNarrowRegex')) {
            computeErasParse.call(this);
        }
        return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }

    function matchEraAbbr(isStrict, locale) {
        return locale.erasAbbrRegex(isStrict);
    }

    function matchEraName(isStrict, locale) {
        return locale.erasNameRegex(isStrict);
    }

    function matchEraNarrow(isStrict, locale) {
        return locale.erasNarrowRegex(isStrict);
    }

    function matchEraYearOrdinal(isStrict, locale) {
        return locale._eraYearOrdinalRegex || matchUnsigned;
    }

    function computeErasParse() {
        var abbrPieces = [],
            namePieces = [],
            narrowPieces = [],
            mixedPieces = [],
            i,
            l,
            eras = this.eras();

        for (i = 0, l = eras.length; i < l; ++i) {
            namePieces.push(regexEscape(eras[i].name));
            abbrPieces.push(regexEscape(eras[i].abbr));
            narrowPieces.push(regexEscape(eras[i].narrow));

            mixedPieces.push(regexEscape(eras[i].name));
            mixedPieces.push(regexEscape(eras[i].abbr));
            mixedPieces.push(regexEscape(eras[i].narrow));
        }

        this._erasRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._erasNameRegex = new RegExp('^(' + namePieces.join('|') + ')', 'i');
        this._erasAbbrRegex = new RegExp('^(' + abbrPieces.join('|') + ')', 'i');
        this._erasNarrowRegex = new RegExp(
            '^(' + narrowPieces.join('|') + ')',
            'i'
        );
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken(token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg', 'weekYear');
    addWeekYearFormatToken('ggggg', 'weekYear');
    addWeekYearFormatToken('GGGG', 'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);

    // PARSING

    addRegexToken('G', matchSigned);
    addRegexToken('g', matchSigned);
    addRegexToken('GG', match1to2, match2);
    addRegexToken('gg', match1to2, match2);
    addRegexToken('GGGG', match1to4, match4);
    addRegexToken('gggg', match1to4, match4);
    addRegexToken('GGGGG', match1to6, match6);
    addRegexToken('ggggg', match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (
        input,
        week,
        config,
        token
    ) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy
        );
    }

    function getSetISOWeekYear(input) {
        return getSetWeekYearHelper.call(
            this,
            input,
            this.isoWeek(),
            this.isoWeekday(),
            1,
            4
        );
    }

    function getISOWeeksInYear() {
        return weeksInYear(this.year(), 1, 4);
    }

    function getISOWeeksInISOWeekYear() {
        return weeksInYear(this.isoWeekYear(), 1, 4);
    }

    function getWeeksInYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getWeeksInWeekYear() {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter(input) {
        return input == null
            ? Math.ceil((this.month() + 1) / 3)
            : this.month((input - 1) * 3 + (this.month() % 3));
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D', match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict
            ? locale._dayOfMonthOrdinalParse || locale._ordinalParse
            : locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD', match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear(input) {
        var dayOfYear =
            Math.round(
                (this.clone().startOf('day') - this.clone().startOf('year')) / 864e5
            ) + 1;
        return input == null ? dayOfYear : this.add(input - dayOfYear, 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m', match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s', match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });

    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S', match1to3, match1);
    addRegexToken('SS', match1to3, match2);
    addRegexToken('SSS', match1to3, match3);

    var token, getSetMillisecond;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }

    getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z', 0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr() {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName() {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== 'undefined' && Symbol.for != null) {
        proto[Symbol.for('nodejs.util.inspect.custom')] = function () {
            return 'Moment<' + this.format() + '>';
        };
    }
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate(
        'dates accessor is deprecated. Use date instead.',
        getSetDayOfMonth
    );
    proto.months = deprecate(
        'months accessor is deprecated. Use month instead',
        getSetMonth
    );
    proto.years = deprecate(
        'years accessor is deprecated. Use year instead',
        getSetYear
    );
    proto.zone = deprecate(
        'moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/',
        getSetZone
    );
    proto.isDSTShifted = deprecate(
        'isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information',
        isDaylightSavingTimeShifted
    );

    function createUnix(input) {
        return createLocal(input * 1000);
    }

    function createInZone() {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat(string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;

    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;

    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1(format, index, field, setter) {
        var locale = getLocale(),
            utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl(format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i,
            out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl(localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0,
            i,
            out = [];

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths(format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort(format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin(localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        eras: [
            {
                since: '0001-01-01',
                until: +Infinity,
                offset: 1,
                name: 'Anno Domini',
                narrow: 'AD',
                abbr: 'AD',
            },
            {
                since: '0000-12-31',
                until: -Infinity,
                offset: 1,
                name: 'Before Christ',
                narrow: 'BC',
                abbr: 'BC',
            },
        ],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function (number) {
            var b = number % 10,
                output =
                    toInt((number % 100) / 10) === 1
                        ? 'th'
                        : b === 1
                        ? 'st'
                        : b === 2
                        ? 'nd'
                        : b === 3
                        ? 'rd'
                        : 'th';
            return number + output;
        },
    });

    // Side effect imports

    hooks.lang = deprecate(
        'moment.lang is deprecated. Use moment.locale instead.',
        getSetGlobalLocale
    );
    hooks.langData = deprecate(
        'moment.langData is deprecated. Use moment.localeData instead.',
        getLocale
    );

    var mathAbs = Math.abs;

    function abs() {
        var data = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days = mathAbs(this._days);
        this._months = mathAbs(this._months);

        data.milliseconds = mathAbs(data.milliseconds);
        data.seconds = mathAbs(data.seconds);
        data.minutes = mathAbs(data.minutes);
        data.hours = mathAbs(data.hours);
        data.months = mathAbs(data.months);
        data.years = mathAbs(data.years);

        return this;
    }

    function addSubtract$1(duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days += direction * other._days;
        duration._months += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1(input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1(input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil(number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble() {
        var milliseconds = this._milliseconds,
            days = this._days,
            months = this._months,
            data = this._data,
            seconds,
            minutes,
            hours,
            years,
            monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (
            !(
                (milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0)
            )
        ) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds = absFloor(milliseconds / 1000);
        data.seconds = seconds % 60;

        minutes = absFloor(seconds / 60);
        data.minutes = minutes % 60;

        hours = absFloor(minutes / 60);
        data.hours = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days = days;
        data.months = months;
        data.years = years;

        return this;
    }

    function daysToMonths(days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return (days * 4800) / 146097;
    }

    function monthsToDays(months) {
        // the reverse of daysToMonths
        return (months * 146097) / 4800;
    }

    function as(units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days,
            months,
            milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':
                    return months;
                case 'quarter':
                    return months / 3;
                case 'year':
                    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week':
                    return days / 7 + milliseconds / 6048e5;
                case 'day':
                    return days + milliseconds / 864e5;
                case 'hour':
                    return days * 24 + milliseconds / 36e5;
                case 'minute':
                    return days * 1440 + milliseconds / 6e4;
                case 'second':
                    return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond':
                    return Math.floor(days * 864e5) + milliseconds;
                default:
                    throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1() {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs(alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms'),
        asSeconds = makeAs('s'),
        asMinutes = makeAs('m'),
        asHours = makeAs('h'),
        asDays = makeAs('d'),
        asWeeks = makeAs('w'),
        asMonths = makeAs('M'),
        asQuarters = makeAs('Q'),
        asYears = makeAs('y');

    function clone$1() {
        return createDuration(this);
    }

    function get$2(units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds'),
        seconds = makeGetter('seconds'),
        minutes = makeGetter('minutes'),
        hours = makeGetter('hours'),
        days = makeGetter('days'),
        months = makeGetter('months'),
        years = makeGetter('years');

    function weeks() {
        return absFloor(this.days() / 7);
    }

    var round = Math.round,
        thresholds = {
            ss: 44, // a few seconds to seconds
            s: 45, // seconds to minute
            m: 45, // minutes to hour
            h: 22, // hours to day
            d: 26, // days to month/week
            w: null, // weeks to month
            M: 11, // months to year
        };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1(posNegDuration, withoutSuffix, thresholds, locale) {
        var duration = createDuration(posNegDuration).abs(),
            seconds = round(duration.as('s')),
            minutes = round(duration.as('m')),
            hours = round(duration.as('h')),
            days = round(duration.as('d')),
            months = round(duration.as('M')),
            weeks = round(duration.as('w')),
            years = round(duration.as('y')),
            a =
                (seconds <= thresholds.ss && ['s', seconds]) ||
                (seconds < thresholds.s && ['ss', seconds]) ||
                (minutes <= 1 && ['m']) ||
                (minutes < thresholds.m && ['mm', minutes]) ||
                (hours <= 1 && ['h']) ||
                (hours < thresholds.h && ['hh', hours]) ||
                (days <= 1 && ['d']) ||
                (days < thresholds.d && ['dd', days]);

        if (thresholds.w != null) {
            a =
                a ||
                (weeks <= 1 && ['w']) ||
                (weeks < thresholds.w && ['ww', weeks]);
        }
        a = a ||
            (months <= 1 && ['M']) ||
            (months < thresholds.M && ['MM', months]) ||
            (years <= 1 && ['y']) || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding(roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof roundingFunction === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold(threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize(argWithSuffix, argThresholds) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var withSuffix = false,
            th = thresholds,
            locale,
            output;

        if (typeof argWithSuffix === 'object') {
            argThresholds = argWithSuffix;
            argWithSuffix = false;
        }
        if (typeof argWithSuffix === 'boolean') {
            withSuffix = argWithSuffix;
        }
        if (typeof argThresholds === 'object') {
            th = Object.assign({}, thresholds, argThresholds);
            if (argThresholds.s != null && argThresholds.ss == null) {
                th.ss = argThresholds.s - 1;
            }
        }

        locale = this.localeData();
        output = relativeTime$1(this, !withSuffix, th, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return (x > 0) - (x < 0) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000,
            days = abs$1(this._days),
            months = abs$1(this._months),
            minutes,
            hours,
            years,
            s,
            total = this.asSeconds(),
            totalSign,
            ymSign,
            daysSign,
            hmsSign;

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes = absFloor(seconds / 60);
        hours = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';

        totalSign = total < 0 ? '-' : '';
        ymSign = sign(this._months) !== sign(total) ? '-' : '';
        daysSign = sign(this._days) !== sign(total) ? '-' : '';
        hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return (
            totalSign +
            'P' +
            (years ? ymSign + years + 'Y' : '') +
            (months ? ymSign + months + 'M' : '') +
            (days ? daysSign + days + 'D' : '') +
            (hours || minutes || seconds ? 'T' : '') +
            (hours ? hmsSign + hours + 'H' : '') +
            (minutes ? hmsSign + minutes + 'M' : '') +
            (seconds ? hmsSign + s + 'S' : '')
        );
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;

    proto$2.toIsoString = deprecate(
        'toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)',
        toISOString$1
    );
    proto$2.lang = lang;

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    //! moment.js

    hooks.version = '2.29.1';

    setHookCallback(createLocal);

    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm', // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss', // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS', // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD', // <input type="date" />
        TIME: 'HH:mm', // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss', // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS', // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW', // <input type="week" />
        MONTH: 'YYYY-MM', // <input type="month" />
    };

    return hooks;

})));

define('moment', ['moment/moment'], function (main) { return main; });

define('frontend',['fast', 'template', 'moment'], function (Fast, Template, Moment) {
    var Frontend = {
        api: Fast.api,
        init: function () {
            var si = {};
            //发送验证码
            $(document).on("click", ".btn-captcha", function (e) {
                var type = $(this).data("type") ? $(this).data("type") : 'mobile';
                var btn = this;
                Frontend.api.sendcaptcha = function (btn, type, data, callback) {
                    $(btn).addClass("disabled", true).text("发送中...");

                    Frontend.api.ajax({url: $(btn).data("url"), data: data}, function (data, ret) {
                        clearInterval(si[type]);
                        var seconds = 60;
                        si[type] = setInterval(function () {
                            seconds--;
                            if (seconds <= 0) {
                                clearInterval(si);
                                $(btn).removeClass("disabled").text("发送验证码");
                            } else {
                                $(btn).addClass("disabled").text(seconds + "秒后可再次发送");
                            }
                        }, 1000);
                        if (typeof callback == 'function') {
                            callback.call(this, data, ret);
                        }
                    }, function () {
                        $(btn).removeClass("disabled").text('发送验证码');
                    });
                };
                if (['mobile', 'email'].indexOf(type) > -1) {
                    var element = $(this).data("input-id") ? $("#" + $(this).data("input-id")) : $("input[name='" + type + "']", $(this).closest("form"));
                    var text = type === 'email' ? '邮箱' : '手机号码';
                    if (element.val() === "") {
                        Layer.msg(text + "不能为空！");
                        element.focus();
                        return false;
                    } else if (type === 'mobile' && !element.val().match(/^1[3-9]\d{9}$/)) {
                        Layer.msg("请输入正确的" + text + "！");
                        element.focus();
                        return false;
                    } else if (type === 'email' && !element.val().match(/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/)) {
                        Layer.msg("请输入正确的" + text + "！");
                        element.focus();
                        return false;
                    }
                    element.isValid(function (v) {
                        if (v) {
                            var data = {event: $(btn).data("event")};
                            data[type] = element.val();
                            Frontend.api.sendcaptcha(btn, type, data);
                        } else {
                            Layer.msg("请确认已经输入了正确的" + text + "！");
                        }
                    });
                } else {
                    var data = {event: $(btn).data("event")};
                    Frontend.api.sendcaptcha(btn, type, data, function (data, ret) {
                        Layer.open({title: false, area: ["400px", "430px"], content: "<img src='" + data.image + "' width='400' height='400' /><div class='text-center panel-title'>扫一扫关注公众号获取验证码</div>", type: 1});
                    });
                }
                return false;
            });
            //tooltip和popover
            if (!('ontouchstart' in document.documentElement)) {
                $('body').tooltip({selector: '[data-toggle="tooltip"]'});
            }
            $('body').popover({selector: '[data-toggle="popover"]'});

            // 手机端左右滑动切换菜单栏
            if ('ontouchstart' in document.documentElement) {
                var startX, startY, moveEndX, moveEndY, relativeX, relativeY, element;
                element = $('body', document);
                element.on("touchstart", function (e) {
                    startX = e.originalEvent.changedTouches[0].pageX;
                    startY = e.originalEvent.changedTouches[0].pageY;
                });
                element.on("touchend", function (e) {
                    moveEndX = e.originalEvent.changedTouches[0].pageX;
                    moveEndY = e.originalEvent.changedTouches[0].pageY;
                    relativeX = moveEndX - startX;
                    relativeY = moveEndY - startY;

                    // 判断标准
                    //右滑
                    if (relativeX > 45) {
                        if ((Math.abs(relativeX) - Math.abs(relativeY)) > 50) {
                            element.addClass("sidebar-open");
                        }
                    }
                    //左滑
                    else if (relativeX < -45) {
                        if ((Math.abs(relativeX) - Math.abs(relativeY)) > 50) {
                            element.removeClass("sidebar-open");
                        }
                    }
                });
            }
            $(document).on("click", ".sidebar-toggle", function () {
                $("body").toggleClass("sidebar-open");
            });
        }
    };
    Frontend.api = $.extend(Fast.api, Frontend.api);
    //将Template渲染至全局,以便于在子框架中调用
    window.Template = Template;
    //将Moment渲染至全局,以便于在子框架中调用
    window.Moment = Moment;
    //将Frontend渲染至全局,以便于在子框架中调用
    window.Frontend = Frontend;

    Frontend.init();
    return Frontend;
});

define('frontend-init',['frontend'], function (Frontend) {

});
//! moment.js locale configuration
//! locale : Chinese (China) [zh-cn]
//! author : suupic : https://github.com/suupic
//! author : Zeno Zeng : https://github.com/zenozeng
//! author : uu109 : https://github.com/uu109

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define('moment/locale/zh-cn',['../moment'], factory) :
   factory(global.moment)
}(this, (function (moment) { 'use strict';

    //! moment.js locale configuration

    var zhCn = moment.defineLocale('zh-cn', {
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split(
            '_'
        ),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split(
            '_'
        ),
        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY/MM/DD',
            LL: 'YYYY年M月D日',
            LLL: 'YYYY年M月D日Ah点mm分',
            LLLL: 'YYYY年M月D日ddddAh点mm分',
            l: 'YYYY/M/D',
            ll: 'YYYY年M月D日',
            lll: 'YYYY年M月D日 HH:mm',
            llll: 'YYYY年M月D日dddd HH:mm',
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
                return hour;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            } else {
                // '中午'
                return hour >= 11 ? hour : hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar: {
            sameDay: '[今天]LT',
            nextDay: '[明天]LT',
            nextWeek: function (now) {
                if (now.week() !== this.week()) {
                    return '[下]dddLT';
                } else {
                    return '[本]dddLT';
                }
            },
            lastDay: '[昨天]LT',
            lastWeek: function (now) {
                if (this.week() !== now.week()) {
                    return '[上]dddLT';
                } else {
                    return '[本]dddLT';
                }
            },
            sameElse: 'L',
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '周';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '%s后',
            past: '%s前',
            s: '几秒',
            ss: '%d 秒',
            m: '1 分钟',
            mm: '%d 分钟',
            h: '1 小时',
            hh: '%d 小时',
            d: '1 天',
            dd: '%d 天',
            w: '1 周',
            ww: '%d 周',
            M: '1 个月',
            MM: '%d 个月',
            y: '1 年',
            yy: '%d 年',
        },
        week: {
            // GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
            dow: 1, // Monday is the first day of the week.
            doy: 4, // The week that contains Jan 4th is the first week of the year.
        },
    });

    return zhCn;

})));

(function($){"use strict";var cachedWidth=null;var sprintf=function(str){var args=arguments,flag=true,i=1;str=str.replace(/%s/g,function(){var arg=args[i++];if(typeof arg==="undefined"){flag=false;return""}return arg});return flag?str:""};var getPropertyFromOther=function(list,from,to,value){var result="";$.each(list,function(i,item){if(item[from]===value){result=item[to];return false}return true});return result};var getFieldIndex=function(columns,field){var index=-1;$.each(columns,function(i,column){if(column.field===field){index=i;return false}return true});return index};var setFieldIndex=function(columns){var i,j,k,totalCol=0,flag=[];for(i=0;i<columns[0].length;i++){totalCol+=columns[0][i].colspan||1}for(i=0;i<columns.length;i++){flag[i]=[];for(j=0;j<totalCol;j++){flag[i][j]=false}}for(i=0;i<columns.length;i++){for(j=0;j<columns[i].length;j++){var r=columns[i][j],rowspan=r.rowspan||1,colspan=r.colspan||1,index=$.inArray(false,flag[i]);if(colspan===1){r.fieldIndex=index;if(typeof r.field==="undefined"){r.field=index}}for(k=0;k<rowspan;k++){flag[i+k][index]=true}for(k=0;k<colspan;k++){flag[i][index+k]=true}}}};var getScrollBarWidth=function(){if(cachedWidth===null){var inner=$("<p/>").addClass("fixed-table-scroll-inner"),outer=$("<div/>").addClass("fixed-table-scroll-outer"),w1,w2;outer.append(inner);$("body").append(outer);w1=inner[0].offsetWidth;outer.css("overflow","scroll");w2=inner[0].offsetWidth;if(w1===w2){w2=outer[0].clientWidth}outer.remove();cachedWidth=w1-w2}return cachedWidth};var calculateObjectValue=function(self,name,args,defaultValue){var func=name;if(typeof name==="string"){var names=name.split(".");if(names.length>1){func=window;$.each(names,function(i,f){func=func[f]})}else{func=window[name]}}if(typeof func==="object"){return func}if(typeof func==="function"){return func.apply(self,args||[])}if(!func&&typeof name==="string"&&sprintf.apply(this,[name].concat(args))){return sprintf.apply(this,[name].concat(args))}return defaultValue};var compareObjects=function(objectA,objectB,compareLength){var objectAProperties=Object.getOwnPropertyNames(objectA),objectBProperties=Object.getOwnPropertyNames(objectB),propName="";if(compareLength){if(objectAProperties.length!==objectBProperties.length){return false}}for(var i=0;i<objectAProperties.length;i++){propName=objectAProperties[i];if($.inArray(propName,objectBProperties)>-1){if(objectA[propName]!==objectB[propName]){return false}}}return true};var escapeHTML=function(text){if(typeof text==="string"){return text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;").replace(/`/g,"&#x60;")}return text};var getRealDataAttr=function(dataAttr){for(var attr in dataAttr){var auxAttr=attr.split(/(?=[A-Z])/).join("-").toLowerCase();if(auxAttr!==attr){dataAttr[auxAttr]=dataAttr[attr];delete dataAttr[attr]}}return dataAttr};var getItemField=function(item,field,escape){var value=item;if(typeof field!=="string"||item.hasOwnProperty(field)){return escape?escapeHTML(item[field]):item[field]}var props=field.split(".");for(var p in props){if(props.hasOwnProperty(p)){value=value&&value[props[p]]}}return escape?escapeHTML(value):value};var isIEBrowser=function(){return!!(navigator.userAgent.indexOf("MSIE ")>0||!!navigator.userAgent.match(/Trident.*rv\:11\./))};var objectKeys=function(){if(!Object.keys){Object.keys=function(){var hasOwnProperty=Object.prototype.hasOwnProperty,hasDontEnumBug=!{toString:null}.propertyIsEnumerable("toString"),dontEnums=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],dontEnumsLength=dontEnums.length;return function(obj){if(typeof obj!=="object"&&(typeof obj!=="function"||obj===null)){throw new TypeError("Object.keys called on non-object")}var result=[],prop,i;for(prop in obj){if(hasOwnProperty.call(obj,prop)){result.push(prop)}}if(hasDontEnumBug){for(i=0;i<dontEnumsLength;i++){if(hasOwnProperty.call(obj,dontEnums[i])){result.push(dontEnums[i])}}}return result}}()}};var BootstrapTable=function(el,options){this.options=options;this.$el=$(el);this.$el_=this.$el.clone();this.timeoutId_=0;this.timeoutFooter_=0;this.init()};BootstrapTable.DEFAULTS={classes:"table table-hover",sortClass:undefined,locale:undefined,height:undefined,undefinedText:"-",sortName:undefined,sortOrder:"asc",sortStable:false,striped:false,columns:[[]],data:[],totalField:"total",dataField:"rows",method:"get",url:undefined,ajax:undefined,cache:true,contentType:"application/json",dataType:"json",ajaxOptions:{},queryParams:function(params){return params},queryParamsType:"limit",responseHandler:function(res){return res},pagination:false,onlyInfoPagination:false,paginationLoop:true,sidePagination:"client",totalRows:0,pageNumber:1,pageSize:10,pageList:[10,25,50,100],paginationHAlign:"right",paginationVAlign:"bottom",paginationDetailHAlign:"left",paginationPreText:"&lsaquo;",paginationNextText:"&rsaquo;",search:false,searchOnEnterKey:false,strictSearch:false,searchAlign:"right",selectItemName:"btSelectItem",showHeader:true,showFooter:false,showColumns:false,showPaginationSwitch:false,showRefresh:false,showToggle:false,buttonsAlign:"right",smartDisplay:true,escape:false,minimumCountColumns:1,idField:undefined,uniqueId:undefined,cardView:false,detailView:false,detailFormatter:function(index,row){return""},trimOnSearch:true,clickToSelect:false,singleSelect:false,toolbar:undefined,toolbarAlign:"left",checkboxHeader:true,sortable:true,silentSort:true,maintainSelected:false,searchTimeOut:500,searchText:"",iconSize:undefined,buttonsClass:"default",iconsPrefix:"glyphicon",icons:{paginationSwitchDown:"glyphicon-collapse-down icon-chevron-down",paginationSwitchUp:"glyphicon-collapse-up icon-chevron-up",refresh:"glyphicon-refresh icon-refresh",toggle:"glyphicon-list-alt icon-list-alt",columns:"glyphicon-th icon-th",detailOpen:"glyphicon-plus icon-plus",detailClose:"glyphicon-minus icon-minus"},customSearch:$.noop,customSort:$.noop,rowStyle:function(row,index){return{}},rowAttributes:function(row,index){return{}},footerStyle:function(row,index){return{}},onAll:function(name,args){return false},onClickCell:function(field,value,row,$element){return false},onDblClickCell:function(field,value,row,$element){return false},onClickRow:function(item,$element){return false},onDblClickRow:function(item,$element){return false},onSort:function(name,order){return false},onCheck:function(row){return false},onUncheck:function(row){return false},onCheckAll:function(rows){return false},onUncheckAll:function(rows){return false},onCheckSome:function(rows){return false},onUncheckSome:function(rows){return false},onLoadSuccess:function(data){return false},onLoadError:function(status){return false},onColumnSwitch:function(field,checked){return false},onPageChange:function(number,size){return false},onSearch:function(text){return false},onToggle:function(cardView){return false},onPreBody:function(data){return false},onPostBody:function(){return false},onPostHeader:function(){return false},onExpandRow:function(index,row,$detail){return false},onCollapseRow:function(index,row){return false},onRefreshOptions:function(options){return false},onRefresh:function(params){return false},onResetView:function(){return false}};BootstrapTable.LOCALES={};BootstrapTable.LOCALES["en-US"]=BootstrapTable.LOCALES.en={formatLoadingMessage:function(){return"Loading, please wait..."},formatRecordsPerPage:function(pageNumber){return sprintf("%s rows per page",pageNumber)},formatShowingRows:function(pageFrom,pageTo,totalRows){return sprintf("Showing %s to %s of %s rows",pageFrom,pageTo,totalRows)},formatDetailPagination:function(totalRows){return sprintf("Showing %s rows",totalRows)},formatSearch:function(){return"Search"},formatNoMatches:function(){return"No matching records found"},formatPaginationSwitch:function(){return"Hide/Show pagination"},formatRefresh:function(){return"Refresh"},formatToggle:function(){return"Toggle"},formatColumns:function(){return"Columns"},formatAllRows:function(){return"All"}};$.extend(BootstrapTable.DEFAULTS,BootstrapTable.LOCALES["en-US"]);BootstrapTable.COLUMN_DEFAULTS={radio:false,checkbox:false,checkboxEnabled:true,field:undefined,title:undefined,titleTooltip:undefined,class:undefined,align:undefined,halign:undefined,falign:undefined,valign:undefined,width:undefined,sortable:false,order:"asc",visible:true,switchable:true,clickToSelect:true,formatter:undefined,footerFormatter:undefined,events:undefined,sorter:undefined,sortName:undefined,cellStyle:undefined,searchable:true,searchFormatter:true,cardVisible:true,escape:false};BootstrapTable.EVENTS={"all.bs.table":"onAll","click-cell.bs.table":"onClickCell","dbl-click-cell.bs.table":"onDblClickCell","click-row.bs.table":"onClickRow","dbl-click-row.bs.table":"onDblClickRow","sort.bs.table":"onSort","check.bs.table":"onCheck","uncheck.bs.table":"onUncheck","check-all.bs.table":"onCheckAll","uncheck-all.bs.table":"onUncheckAll","check-some.bs.table":"onCheckSome","uncheck-some.bs.table":"onUncheckSome","load-success.bs.table":"onLoadSuccess","load-error.bs.table":"onLoadError","column-switch.bs.table":"onColumnSwitch","page-change.bs.table":"onPageChange","search.bs.table":"onSearch","toggle.bs.table":"onToggle","pre-body.bs.table":"onPreBody","post-body.bs.table":"onPostBody","post-header.bs.table":"onPostHeader","expand-row.bs.table":"onExpandRow","collapse-row.bs.table":"onCollapseRow","refresh-options.bs.table":"onRefreshOptions","reset-view.bs.table":"onResetView","refresh.bs.table":"onRefresh"};BootstrapTable.prototype.init=function(){this.initLocale();this.initContainer();this.initTable();this.initHeader();this.initData();this.initHiddenRows();this.initFooter();this.initToolbar();this.initPagination();this.initBody();this.initSearchText();this.initServer()};BootstrapTable.prototype.initLocale=function(){if(this.options.locale){var parts=this.options.locale.split(/-|_/);parts[0].toLowerCase();if(parts[1])parts[1].toUpperCase();if($.fn.bootstrapTable.locales[this.options.locale]){$.extend(this.options,$.fn.bootstrapTable.locales[this.options.locale])}else if($.fn.bootstrapTable.locales[parts.join("-")]){$.extend(this.options,$.fn.bootstrapTable.locales[parts.join("-")])}else if($.fn.bootstrapTable.locales[parts[0]]){$.extend(this.options,$.fn.bootstrapTable.locales[parts[0]])}}};BootstrapTable.prototype.initContainer=function(){this.$container=$(['<div class="bootstrap-table">','<div class="fixed-table-toolbar"></div>',this.options.paginationVAlign==="top"||this.options.paginationVAlign==="both"?'<div class="fixed-table-pagination" style="clear: both;"></div>':"",'<div class="fixed-table-container">','<div class="fixed-table-header"><table></table></div>','<div class="fixed-table-body">','<div class="fixed-table-loading">',this.options.formatLoadingMessage(),"</div>","</div>",'<div class="fixed-table-footer"><table><tr></tr></table></div>',this.options.paginationVAlign==="bottom"||this.options.paginationVAlign==="both"?'<div class="fixed-table-pagination"></div>':"","</div>","</div>"].join(""));this.$container.insertAfter(this.$el);this.$tableContainer=this.$container.find(".fixed-table-container");this.$tableHeader=this.$container.find(".fixed-table-header");this.$tableBody=this.$container.find(".fixed-table-body");this.$tableLoading=this.$container.find(".fixed-table-loading");this.$tableFooter=this.$container.find(".fixed-table-footer");this.$toolbar=this.$container.find(".fixed-table-toolbar");this.$pagination=this.$container.find(".fixed-table-pagination");this.$tableBody.append(this.$el);this.$container.after('<div class="clearfix"></div>');this.$el.addClass(this.options.classes);if(this.options.striped){this.$el.addClass("table-striped")}if($.inArray("table-no-bordered",this.options.classes.split(" "))!==-1){this.$tableContainer.addClass("table-no-bordered")}};BootstrapTable.prototype.initTable=function(){var that=this,columns=[],data=[];this.$header=this.$el.find(">thead");if(!this.$header.length){this.$header=$("<thead></thead>").appendTo(this.$el)}this.$header.find("tr").each(function(){var column=[];$(this).find("th").each(function(){if(typeof $(this).data("field")!=="undefined"){$(this).data("field",$(this).data("field")+"")}column.push($.extend({},{title:$(this).html(),class:$(this).attr("class"),titleTooltip:$(this).attr("title"),rowspan:$(this).attr("rowspan")?+$(this).attr("rowspan"):undefined,colspan:$(this).attr("colspan")?+$(this).attr("colspan"):undefined},$(this).data()))});columns.push(column)});if(!$.isArray(this.options.columns[0])){this.options.columns=[this.options.columns]}this.options.columns=$.extend(true,[],columns,this.options.columns);this.columns=[];setFieldIndex(this.options.columns);$.each(this.options.columns,function(i,columns){$.each(columns,function(j,column){column=$.extend({},BootstrapTable.COLUMN_DEFAULTS,column);if(typeof column.fieldIndex!=="undefined"){that.columns[column.fieldIndex]=column}that.options.columns[i][j]=column})});if(this.options.data.length){return}var m=[];this.$el.find(">tbody>tr").each(function(y){var row={};row._id=$(this).attr("id");row._class=$(this).attr("class");row._data=getRealDataAttr($(this).data());$(this).find(">td").each(function(x){var $this=$(this),cspan=+$this.attr("colspan")||1,rspan=+$this.attr("rowspan")||1,tx,ty;for(;m[y]&&m[y][x];x++);for(tx=x;tx<x+cspan;tx++){for(ty=y;ty<y+rspan;ty++){if(!m[ty]){m[ty]=[]}m[ty][tx]=true}}var field=that.columns[x].field;row[field]=$(this).html();row["_"+field+"_id"]=$(this).attr("id");row["_"+field+"_class"]=$(this).attr("class");row["_"+field+"_rowspan"]=$(this).attr("rowspan");row["_"+field+"_colspan"]=$(this).attr("colspan");row["_"+field+"_title"]=$(this).attr("title");row["_"+field+"_data"]=getRealDataAttr($(this).data())});data.push(row)});this.options.data=data;if(data.length)this.fromHtml=true};BootstrapTable.prototype.initHeader=function(){var that=this,visibleColumns={},html=[];this.header={fields:[],styles:[],classes:[],formatters:[],events:[],sorters:[],sortNames:[],cellStyles:[],searchables:[]};$.each(this.options.columns,function(i,columns){html.push("<tr>");if(i===0&&!that.options.cardView&&that.options.detailView){html.push(sprintf('<th class="detail" rowspan="%s"><div class="fht-cell"></div></th>',that.options.columns.length))}$.each(columns,function(j,column){var text="",halign="",align="",style="",class_=sprintf(' class="%s"',column["class"]),order=that.options.sortOrder||column.order,unitWidth="px",width=column.width;if(column.width!==undefined&&!that.options.cardView){if(typeof column.width==="string"){if(column.width.indexOf("%")!==-1){unitWidth="%"}}}if(column.width&&typeof column.width==="string"){width=column.width.replace("%","").replace("px","")}halign=sprintf("text-align: %s; ",column.halign?column.halign:column.align);align=sprintf("text-align: %s; ",column.align);style=sprintf("vertical-align: %s; ",column.valign);style+=sprintf("width: %s; ",(column.checkbox||column.radio)&&!width?"36px":width?width+unitWidth:undefined);if(typeof column.fieldIndex!=="undefined"){that.header.fields[column.fieldIndex]=column.field;that.header.styles[column.fieldIndex]=align+style;that.header.classes[column.fieldIndex]=class_;that.header.formatters[column.fieldIndex]=column.formatter;that.header.events[column.fieldIndex]=column.events;that.header.sorters[column.fieldIndex]=column.sorter;that.header.sortNames[column.fieldIndex]=column.sortName;that.header.cellStyles[column.fieldIndex]=column.cellStyle;that.header.searchables[column.fieldIndex]=column.searchable;if(!column.visible){return}if(that.options.cardView&&!column.cardVisible){return}visibleColumns[column.field]=column}html.push("<th"+sprintf(' title="%s"',column.titleTooltip),column.checkbox||column.radio?sprintf(' class="bs-checkbox %s"',column["class"]||""):class_,sprintf(' style="%s"',halign+style),sprintf(' rowspan="%s"',column.rowspan),sprintf(' colspan="%s"',column.colspan),sprintf(' data-field="%s"',column.field),">");html.push(sprintf('<div class="th-inner %s">',that.options.sortable&&column.sortable?"sortable both":""));text=that.options.escape?escapeHTML(column.title):column.title;if(column.checkbox){if(!that.options.singleSelect&&that.options.checkboxHeader){text='<input name="btSelectAll" type="checkbox" />'}that.header.stateField=column.field}if(column.radio){text="";that.header.stateField=column.field;that.options.singleSelect=true}html.push(text);html.push("</div>");html.push('<div class="fht-cell"></div>');html.push("</div>");html.push("</th>")});html.push("</tr>")});this.$header.html(html.join(""));this.$header.find("th[data-field]").each(function(i){$(this).data(visibleColumns[$(this).data("field")])});this.$container.off("click",".th-inner").on("click",".th-inner",function(event){var target=$(this);if(that.options.detailView){if(target.closest(".bootstrap-table")[0]!==that.$container[0])return false}if(that.options.sortable&&target.parent().data().sortable){that.onSort(event)}});this.$header.children().children().off("keypress").on("keypress",function(event){if(that.options.sortable&&$(this).data().sortable){var code=event.keyCode||event.which;if(code==13){that.onSort(event)}}});$(window).off("resize.bootstrap-table");if(!this.options.showHeader||this.options.cardView){this.$header.hide();this.$tableHeader.hide();this.$tableLoading.css("top",0)}else{this.$header.show();this.$tableHeader.show();this.$tableLoading.css("top",this.$header.outerHeight()+1);this.getCaret();$(window).on("resize.bootstrap-table",$.proxy(this.resetWidth,this))}this.$selectAll=this.$header.find('[name="btSelectAll"]');this.$selectAll.off("click").on("click",function(){var checked=$(this).prop("checked");that[checked?"checkAll":"uncheckAll"]();that.updateSelected()})};BootstrapTable.prototype.initFooter=function(){if(!this.options.showFooter||this.options.cardView){this.$tableFooter.hide()}else{this.$tableFooter.show()}};BootstrapTable.prototype.initData=function(data,type){if(type==="append"){this.data=this.data.concat(data)}else if(type==="prepend"){this.data=[].concat(data).concat(this.data)}else{this.data=data||this.options.data}if(type==="append"){this.options.data=this.options.data.concat(data)}else if(type==="prepend"){this.options.data=[].concat(data).concat(this.options.data)}else{this.options.data=this.data}if(this.options.sidePagination==="server"){return}this.initSort()};BootstrapTable.prototype.initSort=function(){var that=this,name=this.options.sortName,order=this.options.sortOrder==="desc"?-1:1,index=$.inArray(this.options.sortName,this.header.fields),timeoutId=0;if(this.options.customSort!==$.noop){this.options.customSort.apply(this,[this.options.sortName,this.options.sortOrder]);return}if(index!==-1){if(this.options.sortStable){$.each(this.data,function(i,row){if(!row.hasOwnProperty("_position"))row._position=i})}this.data.sort(function(a,b){if(that.header.sortNames[index]){name=that.header.sortNames[index]}var aa=getItemField(a,name,that.options.escape),bb=getItemField(b,name,that.options.escape),value=calculateObjectValue(that.header,that.header.sorters[index],[aa,bb]);if(value!==undefined){return order*value}if(aa===undefined||aa===null){aa=""}if(bb===undefined||bb===null){bb=""}if(that.options.sortStable&&aa===bb){aa=a._position;bb=b._position}if($.isNumeric(aa)&&$.isNumeric(bb)){aa=parseFloat(aa);bb=parseFloat(bb);if(aa<bb){return order*-1}return order}if(aa===bb){return 0}if(typeof aa!=="string"){aa=aa.toString()}if(aa.localeCompare(bb)===-1){return order*-1}return order});if(this.options.sortClass!==undefined){clearTimeout(timeoutId);timeoutId=setTimeout(function(){that.$el.removeClass(that.options.sortClass);var index=that.$header.find(sprintf('[data-field="%s"]',that.options.sortName).index()+1);that.$el.find(sprintf("tr td:nth-child(%s)",index)).addClass(that.options.sortClass)},250)}}};BootstrapTable.prototype.onSort=function(event){var $this=event.type==="keypress"?$(event.currentTarget):$(event.currentTarget).parent(),$this_=this.$header.find("th").eq($this.index());this.$header.add(this.$header_).find("span.order").remove();if(this.options.sortName===$this.data("field")){this.options.sortOrder=this.options.sortOrder==="asc"?"desc":"asc"}else{this.options.sortName=$this.data("field");this.options.sortOrder=$this.data("order")==="asc"?"desc":"asc"}this.trigger("sort",this.options.sortName,this.options.sortOrder);$this.add($this_).data("order",this.options.sortOrder);this.getCaret();if(this.options.sidePagination==="server"){this.initServer(this.options.silentSort);return}this.initSort();this.initBody()};BootstrapTable.prototype.initToolbar=function(){var that=this,html=[],timeoutId=0,$keepOpen,$search,switchableCount=0;if(this.$toolbar.find(".bs-bars").children().length){$("body").append($(this.options.toolbar))}this.$toolbar.html("");if(typeof this.options.toolbar==="string"||typeof this.options.toolbar==="object"){$(sprintf('<div class="bs-bars pull-%s"></div>',this.options.toolbarAlign)).appendTo(this.$toolbar).append($(this.options.toolbar))}html=[sprintf('<div class="columns columns-%s btn-group pull-%s">',this.options.buttonsAlign,this.options.buttonsAlign)];if(typeof this.options.icons==="string"){this.options.icons=calculateObjectValue(null,this.options.icons)}if(this.options.showPaginationSwitch){html.push(sprintf('<button class="btn'+sprintf(" btn-%s",this.options.buttonsClass)+sprintf(" btn-%s",this.options.iconSize)+'" type="button" name="paginationSwitch" aria-label="pagination Switch" title="%s">',this.options.formatPaginationSwitch()),sprintf('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.paginationSwitchDown),"</button>")}if(this.options.showRefresh){html.push(sprintf('<button class="btn'+sprintf(" btn-%s",this.options.buttonsClass)+sprintf(" btn-%s",this.options.iconSize)+'" type="button" name="refresh" aria-label="refresh" title="%s">',this.options.formatRefresh()),sprintf('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.refresh),"</button>")}if(this.options.showToggle){html.push(sprintf('<button class="btn'+sprintf(" btn-%s",this.options.buttonsClass)+sprintf(" btn-%s",this.options.iconSize)+'" type="button" name="toggle" aria-label="toggle" title="%s">',this.options.formatToggle()),sprintf('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.toggle),"</button>")}if(this.options.showColumns){html.push(sprintf('<div class="keep-open btn-group" title="%s">',this.options.formatColumns()),'<button type="button" aria-label="columns" class="btn'+sprintf(" btn-%s",this.options.buttonsClass)+sprintf(" btn-%s",this.options.iconSize)+' dropdown-toggle" data-toggle="dropdown">',sprintf('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.columns),' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">');$.each(this.columns,function(i,column){if(column.radio||column.checkbox){return}if(that.options.cardView&&!column.cardVisible){return}var checked=column.visible?' checked="checked"':"";if(column.switchable){html.push(sprintf('<li role="menuitem">'+'<label><input type="checkbox" data-field="%s" value="%s"%s> %s</label>'+"</li>",column.field,i,checked,column.title));switchableCount++}});html.push("</ul>","</div>")}html.push("</div>");if(this.showToolbar||html.length>2){this.$toolbar.append(html.join(""))}if(this.options.showPaginationSwitch){this.$toolbar.find('button[name="paginationSwitch"]').off("click").on("click",$.proxy(this.togglePagination,this))}if(this.options.showRefresh){this.$toolbar.find('button[name="refresh"]').off("click").on("click",$.proxy(this.refresh,this))}if(this.options.showToggle){this.$toolbar.find('button[name="toggle"]').off("click").on("click",function(){that.toggleView()})}if(this.options.showColumns){$keepOpen=this.$toolbar.find(".keep-open");if(switchableCount<=this.options.minimumCountColumns){$keepOpen.find("input").prop("disabled",true)}$keepOpen.find("li").off("click").on("click",function(event){event.stopImmediatePropagation()});$keepOpen.find("input").off("click").on("click",function(){var $this=$(this);that.toggleColumn($(this).val(),$this.prop("checked"),false);that.trigger("column-switch",$(this).data("field"),$this.prop("checked"))})}if(this.options.search){html=[];html.push('<div class="pull-'+this.options.searchAlign+' search">',sprintf('<input class="form-control'+sprintf(" input-%s",this.options.iconSize)+'" type="text" placeholder="%s">',this.options.formatSearch()),"</div>");this.$toolbar.append(html.join(""));$search=this.$toolbar.find(".search input");$search.off("keyup drop blur").on("keyup drop blur",function(event){if(that.options.searchOnEnterKey&&event.keyCode!==13){return}if($.inArray(event.keyCode,[37,38,39,40])>-1){return}clearTimeout(timeoutId);timeoutId=setTimeout(function(){that.onSearch(event)},that.options.searchTimeOut)});if(isIEBrowser()){$search.off("mouseup").on("mouseup",function(event){clearTimeout(timeoutId);timeoutId=setTimeout(function(){that.onSearch(event)},that.options.searchTimeOut)})}}};BootstrapTable.prototype.onSearch=function(event){var text=$.trim($(event.currentTarget).val());if(this.options.trimOnSearch&&$(event.currentTarget).val()!==text){$(event.currentTarget).val(text)}if(text===this.searchText){return}this.searchText=text;this.options.searchText=text;this.options.pageNumber=1;this.initSearch();this.updatePagination();this.trigger("search",text)};BootstrapTable.prototype.initSearch=function(){var that=this;if(this.options.sidePagination!=="server"){if(this.options.customSearch!==$.noop){this.options.customSearch.apply(this,[this.searchText]);return}var s=this.searchText&&(this.options.escape?escapeHTML(this.searchText):this.searchText).toLowerCase();var f=$.isEmptyObject(this.filterColumns)?null:this.filterColumns;this.data=f?$.grep(this.options.data,function(item,i){for(var key in f){if($.isArray(f[key])&&$.inArray(item[key],f[key])===-1||!$.isArray(f[key])&&item[key]!==f[key]){return false}}return true}):this.options.data;this.data=s?$.grep(this.data,function(item,i){for(var j=0;j<that.header.fields.length;j++){if(!that.header.searchables[j]){continue}var key=$.isNumeric(that.header.fields[j])?parseInt(that.header.fields[j],10):that.header.fields[j];var column=that.columns[getFieldIndex(that.columns,key)];var value;if(typeof key==="string"){value=item;var props=key.split(".");for(var prop_index=0;prop_index<props.length;prop_index++){value=value[props[prop_index]]}if(column&&column.searchFormatter){value=calculateObjectValue(column,that.header.formatters[j],[value,item,i],value)}}else{value=item[key]}if(typeof value==="string"||typeof value==="number"){if(that.options.strictSearch){if((value+"").toLowerCase()===s){return true}}else{if((value+"").toLowerCase().indexOf(s)!==-1){return true}}}}return false}):this.data}};BootstrapTable.prototype.initPagination=function(){if(!this.options.pagination){this.$pagination.hide();return}else{this.$pagination.show()}var that=this,html=[],$allSelected=false,i,from,to,$pageList,$first,$pre,$next,$last,$number,data=this.getData(),pageList=this.options.pageList;if(this.options.sidePagination!=="server"){this.options.totalRows=data.length}this.totalPages=0;if(this.options.totalRows){if(this.options.pageSize===this.options.formatAllRows()){this.options.pageSize=this.options.totalRows;$allSelected=true}else if(this.options.pageSize===this.options.totalRows){var pageLst=typeof this.options.pageList==="string"?this.options.pageList.replace("[","").replace("]","").replace(/ /g,"").toLowerCase().split(","):this.options.pageList;if($.inArray(this.options.formatAllRows().toLowerCase(),pageLst)>-1){$allSelected=true}}this.totalPages=~~((this.options.totalRows-1)/this.options.pageSize)+1;this.options.totalPages=this.totalPages}if(this.totalPages>0&&this.options.pageNumber>this.totalPages){this.options.pageNumber=this.totalPages}this.pageFrom=(this.options.pageNumber-1)*this.options.pageSize+1;this.pageTo=this.options.pageNumber*this.options.pageSize;if(this.pageTo>this.options.totalRows){this.pageTo=this.options.totalRows}html.push('<div class="pull-'+this.options.paginationDetailHAlign+' pagination-detail">','<span class="pagination-info">',this.options.onlyInfoPagination?this.options.formatDetailPagination(this.options.totalRows):this.options.formatShowingRows(this.pageFrom,this.pageTo,this.options.totalRows),"</span>");if(!this.options.onlyInfoPagination){html.push('<span class="page-list">');var pageNumber=[sprintf('<span class="btn-group %s">',this.options.paginationVAlign==="top"||this.options.paginationVAlign==="both"?"dropdown":"dropup"),'<button type="button" class="btn'+sprintf(" btn-%s",this.options.buttonsClass)+sprintf(" btn-%s",this.options.iconSize)+' dropdown-toggle" data-toggle="dropdown">','<span class="page-size">',$allSelected?this.options.formatAllRows():this.options.pageSize,"</span>",' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'];if(typeof this.options.pageList==="string"){var list=this.options.pageList.replace("[","").replace("]","").replace(/ /g,"").split(",");pageList=[];$.each(list,function(i,value){pageList.push(value.toUpperCase()===that.options.formatAllRows().toUpperCase()?that.options.formatAllRows():+value)})}$.each(pageList,function(i,page){if(!that.options.smartDisplay||i===0||pageList[i-1]<that.options.totalRows){var active;if($allSelected){active=page===that.options.formatAllRows()?' class="active"':""}else{active=page===that.options.pageSize?' class="active"':""}pageNumber.push(sprintf('<li role="menuitem"%s><a href="#">%s</a></li>',active,page))}});pageNumber.push("</ul></span>");html.push(this.options.formatRecordsPerPage(pageNumber.join("")));html.push("</span>");html.push("</div>",'<div class="pull-'+this.options.paginationHAlign+' pagination">','<ul class="pagination'+sprintf(" pagination-%s",this.options.iconSize)+'">','<li class="page-pre"><a href="#">'+this.options.paginationPreText+"</a></li>");if(this.totalPages<5){from=1;to=this.totalPages}else{from=this.options.pageNumber-2;to=from+4;if(from<1){from=1;to=5}if(to>this.totalPages){to=this.totalPages;from=to-4}}if(this.totalPages>=6){if(this.options.pageNumber>=3){html.push('<li class="page-first'+(1===this.options.pageNumber?" active":"")+'">','<a href="#">',1,"</a>","</li>");from++}if(this.options.pageNumber>=4){if(this.options.pageNumber==4||this.totalPages==6||this.totalPages==7){from--}else{html.push('<li class="page-first-separator disabled">','<a href="#">...</a>',"</li>")}to--}}if(this.totalPages>=7){if(this.options.pageNumber>=this.totalPages-2){from--}}if(this.totalPages==6){if(this.options.pageNumber>=this.totalPages-2){to++}}else if(this.totalPages>=7){if(this.totalPages==7||this.options.pageNumber>=this.totalPages-3){to++}}for(i=from;i<=to;i++){html.push('<li class="page-number'+(i===this.options.pageNumber?" active":"")+'">','<a href="#">',i,"</a>","</li>")}if(this.totalPages>=8){if(this.options.pageNumber<=this.totalPages-4){html.push('<li class="page-last-separator disabled">','<a href="#">...</a>',"</li>")}}if(this.totalPages>=6){if(this.options.pageNumber<=this.totalPages-3){html.push('<li class="page-last'+(this.totalPages===this.options.pageNumber?" active":"")+'">','<a href="#">',this.totalPages,"</a>","</li>")}}html.push('<li class="page-next"><a href="#">'+this.options.paginationNextText+"</a></li>","</ul>","</div>")}this.$pagination.html(html.join(""));if(!this.options.onlyInfoPagination){$pageList=this.$pagination.find(".page-list a");$first=this.$pagination.find(".page-first");$pre=this.$pagination.find(".page-pre");$next=this.$pagination.find(".page-next");$last=this.$pagination.find(".page-last");$number=this.$pagination.find(".page-number");if(this.options.smartDisplay){if(this.totalPages<=1){this.$pagination.find("div.pagination").hide()}if(pageList.length<2||this.options.totalRows<=pageList[0]){this.$pagination.find("span.page-list").hide()}this.$pagination[this.getData().length?"show":"hide"]()}if(!this.options.paginationLoop){if(this.options.pageNumber===1){$pre.addClass("disabled")}if(this.options.pageNumber===this.totalPages){$next.addClass("disabled")}}if($allSelected){this.options.pageSize=this.options.formatAllRows()}$pageList.off("click").on("click",$.proxy(this.onPageListChange,this));$first.off("click").on("click",$.proxy(this.onPageFirst,this));$pre.off("click").on("click",$.proxy(this.onPagePre,this));$next.off("click").on("click",$.proxy(this.onPageNext,this));$last.off("click").on("click",$.proxy(this.onPageLast,this));$number.off("click").on("click",$.proxy(this.onPageNumber,this))}};BootstrapTable.prototype.updatePagination=function(event){if(event&&$(event.currentTarget).hasClass("disabled")){return}if(!this.options.maintainSelected){this.resetRows()}this.initPagination();if(this.options.sidePagination==="server"){this.initServer()}else{this.initBody()}this.trigger("page-change",this.options.pageNumber,this.options.pageSize)};BootstrapTable.prototype.onPageListChange=function(event){var $this=$(event.currentTarget);$this.parent().addClass("active").siblings().removeClass("active");this.options.pageSize=$this.text().toUpperCase()===this.options.formatAllRows().toUpperCase()?this.options.formatAllRows():+$this.text();this.$toolbar.find(".page-size").text(this.options.pageSize);this.updatePagination(event);return false};BootstrapTable.prototype.onPageFirst=function(event){this.options.pageNumber=1;this.updatePagination(event);return false};BootstrapTable.prototype.onPagePre=function(event){if(this.options.pageNumber-1===0){this.options.pageNumber=this.options.totalPages}else{this.options.pageNumber--}this.updatePagination(event);return false};BootstrapTable.prototype.onPageNext=function(event){if(this.options.pageNumber+1>this.options.totalPages){this.options.pageNumber=1}else{this.options.pageNumber++}this.updatePagination(event);return false};BootstrapTable.prototype.onPageLast=function(event){this.options.pageNumber=this.totalPages;this.updatePagination(event);return false};BootstrapTable.prototype.onPageNumber=function(event){if(this.options.pageNumber===+$(event.currentTarget).text()){return}this.options.pageNumber=+$(event.currentTarget).text();this.updatePagination(event);return false};BootstrapTable.prototype.initRow=function(item,i,data,parentDom){var that=this,key,html=[],style={},csses=[],data_="",attributes={},htmlAttributes=[];if($.inArray(item,this.hiddenRows)>-1){return}style=calculateObjectValue(this.options,this.options.rowStyle,[item,i],style);if(style&&style.css){for(key in style.css){csses.push(key+": "+style.css[key])}}attributes=calculateObjectValue(this.options,this.options.rowAttributes,[item,i],attributes);if(attributes){for(key in attributes){htmlAttributes.push(sprintf('%s="%s"',key,escapeHTML(attributes[key])))}}if(item._data&&!$.isEmptyObject(item._data)){$.each(item._data,function(k,v){if(k==="index"){return}data_+=sprintf(' data-%s="%s"',k,v)})}html.push("<tr",sprintf(" %s",htmlAttributes.join(" ")),sprintf(' id="%s"',$.isArray(item)?undefined:item._id),sprintf(' class="%s"',style.classes||($.isArray(item)?undefined:item._class)),sprintf(' data-index="%s"',i),sprintf(' data-uniqueid="%s"',item[this.options.uniqueId]),sprintf("%s",data_),">");if(this.options.cardView){html.push(sprintf('<td colspan="%s"><div class="card-views">',this.header.fields.length))}if(!this.options.cardView&&this.options.detailView){html.push("<td>",'<a class="detail-icon" href="#">',sprintf('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.detailOpen),"</a>","</td>")}$.each(this.header.fields,function(j,field){var text="",value_=getItemField(item,field,that.options.escape),value="",type="",cellStyle={},id_="",class_=that.header.classes[j],data_="",rowspan_="",colspan_="",title_="",column=that.columns[j];if(that.fromHtml&&typeof value_==="undefined"){return}if(!column.visible){return}if(that.options.cardView&&!column.cardVisible){return}if(column.escape){value_=escapeHTML(value_)}style=sprintf('style="%s"',csses.concat(that.header.styles[j]).join("; "));if(item["_"+field+"_id"]){id_=sprintf(' id="%s"',item["_"+field+"_id"])}if(item["_"+field+"_class"]){class_=sprintf(' class="%s"',item["_"+field+"_class"])}if(item["_"+field+"_rowspan"]){rowspan_=sprintf(' rowspan="%s"',item["_"+field+"_rowspan"])}if(item["_"+field+"_colspan"]){colspan_=sprintf(' colspan="%s"',item["_"+field+"_colspan"])}if(item["_"+field+"_title"]){title_=sprintf(' title="%s"',item["_"+field+"_title"])}cellStyle=calculateObjectValue(that.header,that.header.cellStyles[j],[value_,item,i,field],cellStyle);if(cellStyle.classes){class_=sprintf(' class="%s"',cellStyle.classes)}if(cellStyle.css){var csses_=[];for(var key in cellStyle.css){csses_.push(key+": "+cellStyle.css[key])}style=sprintf('style="%s"',csses_.concat(that.header.styles[j]).join("; "))}value=calculateObjectValue(column,that.header.formatters[j],[value_,item,i],value_);if(item["_"+field+"_data"]&&!$.isEmptyObject(item["_"+field+"_data"])){$.each(item["_"+field+"_data"],function(k,v){if(k==="index"){return}data_+=sprintf(' data-%s="%s"',k,v)})}if(column.checkbox||column.radio){type=column.checkbox?"checkbox":type;type=column.radio?"radio":type;text=[sprintf(that.options.cardView?'<div class="card-view %s">':'<td class="bs-checkbox %s">',column["class"]||""),"<input"+sprintf(' data-index="%s"',i)+sprintf(' name="%s"',that.options.selectItemName)+sprintf(' type="%s"',type)+sprintf(' value="%s"',item[that.options.idField])+sprintf(' checked="%s"',value===true||(value_||value&&value.checked)?"checked":undefined)+sprintf(' disabled="%s"',!column.checkboxEnabled||value&&value.disabled?"disabled":undefined)+" />",that.header.formatters[j]&&typeof value==="string"?value:"",that.options.cardView?"</div>":"</td>"].join("");item[that.header.stateField]=value===true||value&&value.checked}else{value=typeof value==="undefined"||value===null?that.options.undefinedText:value;text=that.options.cardView?['<div class="card-view">',that.options.showHeader?sprintf('<span class="title" %s>%s</span>',style,getPropertyFromOther(that.columns,"field","title",field)):"",sprintf('<span class="value">%s</span>',value),"</div>"].join(""):[sprintf("<td%s %s %s %s %s %s %s>",id_,class_,style,data_,rowspan_,colspan_,title_),value,"</td>"].join("");if(that.options.cardView&&that.options.smartDisplay&&value===""){text='<div class="card-view"></div>'}}html.push(text)});if(this.options.cardView){html.push("</div></td>")}html.push("</tr>");return html.join(" ")};BootstrapTable.prototype.initBody=function(fixedScroll){var that=this,html=[],data=this.getData();this.trigger("pre-body",data);this.$body=this.$el.find(">tbody");if(!this.$body.length){this.$body=$("<tbody></tbody>").appendTo(this.$el)}if(!this.options.pagination||this.options.sidePagination==="server"){this.pageFrom=1;this.pageTo=data.length}var trFragments=$(document.createDocumentFragment());var hasTr;for(var i=this.pageFrom-1;i<this.pageTo;i++){var item=data[i];var tr=this.initRow(item,i,data,trFragments);hasTr=hasTr||!!tr;if(tr&&tr!==true){trFragments.append(tr)}}if(!hasTr){trFragments.append('<tr class="no-records-found">'+sprintf('<td colspan="%s">%s</td>',this.$header.find("th").length,this.options.formatNoMatches())+"</tr>")}this.$body.html(trFragments);if(!fixedScroll){this.scrollTo(0)}this.$body.find("> tr[data-index] > td").off("click dblclick").on("click dblclick",function(e){var $td=$(this),$tr=$td.parent(),item=that.data[$tr.data("index")],index=$td[0].cellIndex,fields=that.getVisibleFields(),field=fields[that.options.detailView&&!that.options.cardView?index-1:index],column=that.columns[getFieldIndex(that.columns,field)],value=getItemField(item,field,that.options.escape);if($td.find(".detail-icon").length){return}that.trigger(e.type==="click"?"click-cell":"dbl-click-cell",field,value,item,$td);that.trigger(e.type==="click"?"click-row":"dbl-click-row",item,$tr,field);if(e.type==="click"&&that.options.clickToSelect&&column.clickToSelect){var $selectItem=$tr.find(sprintf('[name="%s"]',that.options.selectItemName));if($selectItem.length){$selectItem[0].click()}}});this.$body.find("> tr[data-index] > td > .detail-icon").off("click").on("click",function(){var $this=$(this),$tr=$this.parent().parent(),index=$tr.data("index"),row=data[index];if($tr.next().is("tr.detail-view")){$this.find("i").attr("class",sprintf("%s %s",that.options.iconsPrefix,that.options.icons.detailOpen));that.trigger("collapse-row",index,row);$tr.next().remove()}else{$this.find("i").attr("class",sprintf("%s %s",that.options.iconsPrefix,that.options.icons.detailClose));$tr.after(sprintf('<tr class="detail-view"><td colspan="%s"></td></tr>',$tr.find("td").length));var $element=$tr.next().find("td");var content=calculateObjectValue(that.options,that.options.detailFormatter,[index,row,$element],"");if($element.length===1){$element.append(content)}that.trigger("expand-row",index,row,$element)}that.resetView();return false});this.$selectItem=this.$body.find(sprintf('[name="%s"]',this.options.selectItemName));this.$selectItem.off("click").on("click",function(event){event.stopImmediatePropagation();var $this=$(this),checked=$this.prop("checked"),row=that.data[$this.data("index")];if(that.options.maintainSelected&&$(this).is(":radio")){$.each(that.options.data,function(i,row){row[that.header.stateField]=false})}row[that.header.stateField]=checked;if(that.options.singleSelect){that.$selectItem.not(this).each(function(){that.data[$(this).data("index")][that.header.stateField]=false});that.$selectItem.filter(":checked").not(this).prop("checked",false)}that.updateSelected();that.trigger(checked?"check":"uncheck",row,$this)});$.each(this.header.events,function(i,events){if(!events){return}if(typeof events==="string"){events=calculateObjectValue(null,events)}var field=that.header.fields[i],fieldIndex=$.inArray(field,that.getVisibleFields());if(that.options.detailView&&!that.options.cardView){fieldIndex+=1}for(var key in events){that.$body.find(">tr:not(.no-records-found)").each(function(){var $tr=$(this),$td=$tr.find(that.options.cardView?".card-view":"td").eq(fieldIndex),index=key.indexOf(" "),name=key.substring(0,index),el=key.substring(index+1),func=events[key];$td.find(el).off(name).on(name,function(e){var index=$tr.data("index"),row=that.data[index],value=row[field];var props=field.split(".");if(props.length>1){value=row;for(var prop_index=0;prop_index<props.length;prop_index++){value=value[props[prop_index]]}}func.apply(this,[e,value,row,index])})})}});this.updateSelected();this.resetView();this.trigger("post-body",data)};BootstrapTable.prototype.initServer=function(silent,query,url){var that=this,data={},params={searchText:this.searchText,sortName:this.options.sortName,sortOrder:this.options.sortOrder},request;if(this.options.pagination){params.pageSize=this.options.pageSize===this.options.formatAllRows()?this.options.totalRows:this.options.pageSize;params.pageNumber=this.options.pageNumber}if(!(url||this.options.url)&&!this.options.ajax){return}if(this.options.queryParamsType==="limit"){params={search:params.searchText,sort:params.sortName,order:params.sortOrder};if(this.options.pagination){params.offset=this.options.pageSize===this.options.formatAllRows()?0:this.options.pageSize*(this.options.pageNumber-1);params.limit=this.options.pageSize===this.options.formatAllRows()?this.options.totalRows:this.options.pageSize}}if(!$.isEmptyObject(this.filterColumnsPartial)){params.filter=JSON.stringify(this.filterColumnsPartial,null)}data=calculateObjectValue(this.options,this.options.queryParams,[params],data);$.extend(data,query||{});if(data===false){return}if(!silent){this.$tableLoading.show()}request=$.extend({},calculateObjectValue(null,this.options.ajaxOptions),{type:this.options.method,url:url||this.options.url,data:this.options.contentType==="application/json"&&this.options.method==="post"?JSON.stringify(data):data,cache:this.options.cache,contentType:this.options.contentType,dataType:this.options.dataType,success:function(res){res=calculateObjectValue(that.options,that.options.responseHandler,[res],res);that.load(res);that.trigger("load-success",res);if(!silent)that.$tableLoading.hide()},error:function(res){that.trigger("load-error",res.status,res);if(!silent)that.$tableLoading.hide()}});if(this.options.ajax){calculateObjectValue(this,this.options.ajax,[request],null)}else{if(this._xhr&&this._xhr.readyState!==4){this._xhr.abort()}this._xhr=$.ajax(request)}};BootstrapTable.prototype.initSearchText=function(){if(this.options.search){if(this.options.searchText!==""){var $search=this.$toolbar.find(".search input");$search.val(this.options.searchText);this.onSearch({currentTarget:$search})}}};BootstrapTable.prototype.getCaret=function(){var that=this;$.each(this.$header.find("th"),function(i,th){$(th).find(".sortable").removeClass("desc asc").addClass($(th).data("field")===that.options.sortName?that.options.sortOrder:"both")})};BootstrapTable.prototype.updateSelected=function(){var checkAll=this.$selectItem.filter(":enabled").length&&this.$selectItem.filter(":enabled").length===this.$selectItem.filter(":enabled").filter(":checked").length;this.$selectAll.add(this.$selectAll_).prop("checked",checkAll);this.$selectItem.each(function(){$(this).closest("tr")[$(this).prop("checked")?"addClass":"removeClass"]("selected")})};BootstrapTable.prototype.updateRows=function(){var that=this;this.$selectItem.each(function(){that.data[$(this).data("index")][that.header.stateField]=$(this).prop("checked")})};BootstrapTable.prototype.resetRows=function(){var that=this;$.each(this.data,function(i,row){that.$selectAll.prop("checked",false);that.$selectItem.prop("checked",false);if(that.header.stateField){row[that.header.stateField]=false}});this.initHiddenRows()};BootstrapTable.prototype.trigger=function(name){var args=Array.prototype.slice.call(arguments,1);name+=".bs.table";this.options[BootstrapTable.EVENTS[name]].apply(this.options,args);this.$el.trigger($.Event(name),args);this.options.onAll(name,args);this.$el.trigger($.Event("all.bs.table"),[name,args])};BootstrapTable.prototype.resetHeader=function(){clearTimeout(this.timeoutId_);this.timeoutId_=setTimeout($.proxy(this.fitHeader,this),this.$el.is(":hidden")?100:0)};BootstrapTable.prototype.fitHeader=function(){var that=this,fixedBody,scrollWidth,focused,focusedTemp;if(that.$el.is(":hidden")){that.timeoutId_=setTimeout($.proxy(that.fitHeader,that),100);return}fixedBody=this.$tableBody.get(0);scrollWidth=fixedBody.scrollWidth>fixedBody.clientWidth&&fixedBody.scrollHeight>fixedBody.clientHeight+this.$header.outerHeight()?getScrollBarWidth():0;this.$el.css("margin-top",-this.$header.outerHeight());focused=$(":focus");if(focused.length>0){var $th=focused.parents("th");if($th.length>0){var dataField=$th.attr("data-field");if(dataField!==undefined){var $headerTh=this.$header.find("[data-field='"+dataField+"']");if($headerTh.length>0){$headerTh.find(":input").addClass("focus-temp")}}}}this.$header_=this.$header.clone(true,true);this.$selectAll_=this.$header_.find('[name="btSelectAll"]');this.$tableHeader.css({"margin-right":scrollWidth}).find("table").css("width",this.$el.outerWidth()).html("").attr("class",this.$el.attr("class")).append(this.$header_);focusedTemp=$(".focus-temp:visible:eq(0)");if(focusedTemp.length>0){focusedTemp.focus();this.$header.find(".focus-temp").removeClass("focus-temp")}this.$header.find("th[data-field]").each(function(i){that.$header_.find(sprintf('th[data-field="%s"]',$(this).data("field"))).data($(this).data())});var visibleFields=this.getVisibleFields(),$ths=this.$header_.find("th");this.$body.find(">tr:first-child:not(.no-records-found) > *").each(function(i){var $this=$(this),index=i;if(that.options.detailView&&!that.options.cardView){if(i===0){that.$header_.find("th.detail").find(".fht-cell").width($this.innerWidth())}index=i-1}var $th=that.$header_.find(sprintf('th[data-field="%s"]',visibleFields[index]));if($th.length>1){$th=$($ths[$this[0].cellIndex])}$th.find(".fht-cell").width($this.innerWidth())});this.$tableBody.off("scroll").on("scroll",function(){that.$tableHeader.scrollLeft($(this).scrollLeft());if(that.options.showFooter&&!that.options.cardView){that.$tableFooter.scrollLeft($(this).scrollLeft())}});that.trigger("post-header")};BootstrapTable.prototype.resetFooter=function(){var that=this,data=that.getData(),html=[];if(!this.options.showFooter||this.options.cardView){return}if(!this.options.cardView&&this.options.detailView){html.push('<td><div class="th-inner">&nbsp;</div><div class="fht-cell"></div></td>')}$.each(this.columns,function(i,column){var key,falign="",valign="",csses=[],style={},class_=sprintf(' class="%s"',column["class"]);if(!column.visible){return}if(that.options.cardView&&!column.cardVisible){return}falign=sprintf("text-align: %s; ",column.falign?column.falign:column.align);valign=sprintf("vertical-align: %s; ",column.valign);style=calculateObjectValue(null,that.options.footerStyle);if(style&&style.css){for(key in style.css){csses.push(key+": "+style.css[key])}}html.push("<td",class_,sprintf(' style="%s"',falign+valign+csses.concat().join("; ")),">");html.push('<div class="th-inner">');html.push(calculateObjectValue(column,column.footerFormatter,[data],"&nbsp;")||"&nbsp;");html.push("</div>");html.push('<div class="fht-cell"></div>');html.push("</div>");html.push("</td>")});this.$tableFooter.find("tr").html(html.join(""));this.$tableFooter.show();clearTimeout(this.timeoutFooter_);this.timeoutFooter_=setTimeout($.proxy(this.fitFooter,this),this.$el.is(":hidden")?100:0)};BootstrapTable.prototype.fitFooter=function(){var that=this,$footerTd,elWidth,scrollWidth;clearTimeout(this.timeoutFooter_);if(this.$el.is(":hidden")){this.timeoutFooter_=setTimeout($.proxy(this.fitFooter,this),100);return}elWidth=this.$el.css("width");scrollWidth=elWidth>this.$tableBody.width()?getScrollBarWidth():0;this.$tableFooter.css({"margin-right":scrollWidth}).find("table").css("width",elWidth).attr("class",this.$el.attr("class"));$footerTd=this.$tableFooter.find("td");this.$body.find(">tr:first-child:not(.no-records-found) > *").each(function(i){var $this=$(this);$footerTd.eq(i).find(".fht-cell").width($this.innerWidth())})};BootstrapTable.prototype.toggleColumn=function(index,checked,needUpdate){if(index===-1){return}this.columns[index].visible=checked;this.initHeader();this.initSearch();this.initPagination();this.initBody();if(this.options.showColumns){var $items=this.$toolbar.find(".keep-open input").prop("disabled",false);if(needUpdate){$items.filter(sprintf('[value="%s"]',index)).prop("checked",checked)}if($items.filter(":checked").length<=this.options.minimumCountColumns){$items.filter(":checked").prop("disabled",true)}}};BootstrapTable.prototype.getVisibleFields=function(){var that=this,visibleFields=[];$.each(this.header.fields,function(j,field){var column=that.columns[getFieldIndex(that.columns,field)];if(!column.visible){return}visibleFields.push(field)});return visibleFields};BootstrapTable.prototype.resetView=function(params){var padding=0;if(params&&params.height){this.options.height=params.height}this.$selectAll.prop("checked",this.$selectItem.length>0&&this.$selectItem.length===this.$selectItem.filter(":checked").length);if(this.options.height){var toolbarHeight=this.$toolbar.outerHeight(true),paginationHeight=this.$pagination.outerHeight(true),height=this.options.height-toolbarHeight-paginationHeight;this.$tableContainer.css("height",height+"px")}if(this.options.cardView){this.$el.css("margin-top","0");this.$tableContainer.css("padding-bottom","0");this.$tableFooter.hide();return}if(this.options.showHeader&&this.options.height){this.$tableHeader.show();this.resetHeader();padding+=this.$header.outerHeight()}else{this.$tableHeader.hide();this.trigger("post-header")}if(this.options.showFooter){this.resetFooter();if(this.options.height){padding+=this.$tableFooter.outerHeight()+1}}this.getCaret();this.$tableContainer.css("padding-bottom",padding+"px");this.trigger("reset-view")};BootstrapTable.prototype.getData=function(useCurrentPage){return this.searchText||!$.isEmptyObject(this.filterColumns)||!$.isEmptyObject(this.filterColumnsPartial)?useCurrentPage?this.data.slice(this.pageFrom-1,this.pageTo):this.data:useCurrentPage?this.options.data.slice(this.pageFrom-1,this.pageTo):this.options.data};BootstrapTable.prototype.load=function(data){var fixedScroll=false;if(this.options.sidePagination==="server"){this.options.totalRows=data[this.options.totalField];fixedScroll=data.fixedScroll;data=data[this.options.dataField]}else if(!$.isArray(data)){fixedScroll=data.fixedScroll;data=data.data}this.initData(data);this.initSearch();this.initPagination();this.initBody(fixedScroll)};BootstrapTable.prototype.append=function(data){this.initData(data,"append");this.initSearch();this.initPagination();this.initSort();this.initBody(true)};BootstrapTable.prototype.prepend=function(data){this.initData(data,"prepend");this.initSearch();this.initPagination();this.initSort();this.initBody(true)};BootstrapTable.prototype.remove=function(params){var len=this.options.data.length,i,row;if(!params.hasOwnProperty("field")||!params.hasOwnProperty("values")){return}for(i=len-1;i>=0;i--){row=this.options.data[i];if(!row.hasOwnProperty(params.field)){continue}if($.inArray(row[params.field],params.values)!==-1){this.options.data.splice(i,1);if(this.options.sidePagination==="server"){this.options.totalRows-=1}}}if(len===this.options.data.length){return}this.initSearch();this.initPagination();this.initSort();this.initBody(true)};BootstrapTable.prototype.removeAll=function(){if(this.options.data.length>0){this.options.data.splice(0,this.options.data.length);this.initSearch();this.initPagination();this.initBody(true)}};BootstrapTable.prototype.getRowByUniqueId=function(id){var uniqueId=this.options.uniqueId,len=this.options.data.length,dataRow=null,i,row,rowUniqueId;for(i=len-1;i>=0;i--){row=this.options.data[i];if(row.hasOwnProperty(uniqueId)){rowUniqueId=row[uniqueId]}else if(row._data.hasOwnProperty(uniqueId)){rowUniqueId=row._data[uniqueId]}else{continue}if(typeof rowUniqueId==="string"){id=id.toString()}else if(typeof rowUniqueId==="number"){if(Number(rowUniqueId)===rowUniqueId&&rowUniqueId%1===0){id=parseInt(id)}else if(rowUniqueId===Number(rowUniqueId)&&rowUniqueId!==0){id=parseFloat(id)}}if(rowUniqueId===id){dataRow=row;break}}return dataRow};BootstrapTable.prototype.removeByUniqueId=function(id){var len=this.options.data.length,row=this.getRowByUniqueId(id);if(row){this.options.data.splice(this.options.data.indexOf(row),1)}if(len===this.options.data.length){return}this.initSearch();this.initPagination();this.initBody(true)};BootstrapTable.prototype.updateByUniqueId=function(params){var that=this;var allParams=$.isArray(params)?params:[params];$.each(allParams,function(i,params){var rowId;if(!params.hasOwnProperty("id")||!params.hasOwnProperty("row")){return}rowId=$.inArray(that.getRowByUniqueId(params.id),that.options.data);if(rowId===-1){return}$.extend(that.options.data[rowId],params.row)});this.initSearch();this.initPagination();this.initSort();this.initBody(true)};BootstrapTable.prototype.insertRow=function(params){if(!params.hasOwnProperty("index")||!params.hasOwnProperty("row")){return}this.data.splice(params.index,0,params.row);this.initSearch();this.initPagination();this.initSort();this.initBody(true)};BootstrapTable.prototype.updateRow=function(params){var that=this;var allParams=$.isArray(params)?params:[params];$.each(allParams,function(i,params){if(!params.hasOwnProperty("index")||!params.hasOwnProperty("row")){return}$.extend(that.options.data[params.index],params.row)});this.initSearch();this.initPagination();this.initSort();this.initBody(true)};BootstrapTable.prototype.initHiddenRows=function(){this.hiddenRows=[]};BootstrapTable.prototype.showRow=function(params){this.toggleRow(params,true)};BootstrapTable.prototype.hideRow=function(params){this.toggleRow(params,false)};BootstrapTable.prototype.toggleRow=function(params,visible){var row,index;if(params.hasOwnProperty("index")){row=this.getData()[params.index]}else if(params.hasOwnProperty("uniqueId")){row=this.getRowByUniqueId(params.uniqueId)}if(!row){return}index=$.inArray(row,this.hiddenRows);if(!visible&&index===-1){this.hiddenRows.push(row)}else if(visible&&index>-1){this.hiddenRows.splice(index,1)}this.initBody(true)};BootstrapTable.prototype.getHiddenRows=function(show){var that=this,data=this.getData(),rows=[];$.each(data,function(i,row){if($.inArray(row,that.hiddenRows)>-1){rows.push(row)}});this.hiddenRows=rows;return rows};BootstrapTable.prototype.mergeCells=function(options){var row=options.index,col=$.inArray(options.field,this.getVisibleFields()),rowspan=options.rowspan||1,colspan=options.colspan||1,i,j,$tr=this.$body.find(">tr"),$td;if(this.options.detailView&&!this.options.cardView){col+=1}$td=$tr.eq(row).find(">td").eq(col);if(row<0||col<0||row>=this.data.length){return}for(i=row;i<row+rowspan;i++){for(j=col;j<col+colspan;j++){$tr.eq(i).find(">td").eq(j).hide()}}$td.attr("rowspan",rowspan).attr("colspan",colspan).show()};BootstrapTable.prototype.updateCell=function(params){if(!params.hasOwnProperty("index")||!params.hasOwnProperty("field")||!params.hasOwnProperty("value")){return}this.data[params.index][params.field]=params.value;if(params.reinit===false){return}this.initSort();this.initBody(true)};BootstrapTable.prototype.getOptions=function(){return this.options};BootstrapTable.prototype.getSelections=function(){var that=this;return $.grep(this.options.data,function(row){return row[that.header.stateField]===true})};BootstrapTable.prototype.getAllSelections=function(){var that=this;return $.grep(this.options.data,function(row){return row[that.header.stateField]})};BootstrapTable.prototype.checkAll=function(){this.checkAll_(true)};BootstrapTable.prototype.uncheckAll=function(){this.checkAll_(false)};BootstrapTable.prototype.checkInvert=function(){var that=this;var rows=that.$selectItem.filter(":enabled");var checked=rows.filter(":checked");rows.each(function(){$(this).prop("checked",!$(this).prop("checked"))});that.updateRows();that.updateSelected();that.trigger("uncheck-some",checked);checked=that.getSelections();that.trigger("check-some",checked)};BootstrapTable.prototype.checkAll_=function(checked){var rows;if(!checked){rows=this.getSelections()}this.$selectAll.add(this.$selectAll_).prop("checked",checked);this.$selectItem.filter(":enabled").prop("checked",checked);this.updateRows();if(checked){rows=this.getSelections()}this.trigger(checked?"check-all":"uncheck-all",rows)};BootstrapTable.prototype.check=function(index){this.check_(true,index)};BootstrapTable.prototype.uncheck=function(index){this.check_(false,index)};BootstrapTable.prototype.check_=function(checked,index){var $el=this.$selectItem.filter(sprintf('[data-index="%s"]',index)).prop("checked",checked);this.data[index][this.header.stateField]=checked;this.updateSelected();this.trigger(checked?"check":"uncheck",this.data[index],$el)};BootstrapTable.prototype.checkBy=function(obj){this.checkBy_(true,obj)};BootstrapTable.prototype.uncheckBy=function(obj){this.checkBy_(false,obj)};BootstrapTable.prototype.checkBy_=function(checked,obj){if(!obj.hasOwnProperty("field")||!obj.hasOwnProperty("values")){return}var that=this,rows=[];$.each(this.options.data,function(index,row){if(!row.hasOwnProperty(obj.field)){return false}if($.inArray(row[obj.field],obj.values)!==-1){var $el=that.$selectItem.filter(":enabled").filter(sprintf('[data-index="%s"]',index)).prop("checked",checked);row[that.header.stateField]=checked;rows.push(row);that.trigger(checked?"check":"uncheck",row,$el)}});this.updateSelected();this.trigger(checked?"check-some":"uncheck-some",rows)};BootstrapTable.prototype.destroy=function(){this.$el.insertBefore(this.$container);$(this.options.toolbar).insertBefore(this.$el);this.$container.next().remove();this.$container.remove();this.$el.html(this.$el_.html()).css("margin-top","0").attr("class",this.$el_.attr("class")||"")};BootstrapTable.prototype.showLoading=function(){this.$tableLoading.show()};BootstrapTable.prototype.hideLoading=function(){this.$tableLoading.hide()};BootstrapTable.prototype.togglePagination=function(){this.options.pagination=!this.options.pagination;var button=this.$toolbar.find('button[name="paginationSwitch"] i');if(this.options.pagination){button.attr("class",this.options.iconsPrefix+" "+this.options.icons.paginationSwitchDown)}else{button.attr("class",this.options.iconsPrefix+" "+this.options.icons.paginationSwitchUp)}this.updatePagination()};BootstrapTable.prototype.refresh=function(params){if(params&&params.url){this.options.url=params.url}if(params&&params.pageNumber){this.options.pageNumber=params.pageNumber}if(params&&params.pageSize){this.options.pageSize=params.pageSize}this.initServer(params&&params.silent,params&&params.query,params&&params.url);this.trigger("refresh",params)};BootstrapTable.prototype.resetWidth=function(){if(this.options.showHeader&&this.options.height){this.fitHeader()}if(this.options.showFooter){this.fitFooter()}};BootstrapTable.prototype.showColumn=function(field){this.toggleColumn(getFieldIndex(this.columns,field),true,true)};BootstrapTable.prototype.hideColumn=function(field){this.toggleColumn(getFieldIndex(this.columns,field),false,true)};BootstrapTable.prototype.getHiddenColumns=function(){return $.grep(this.columns,function(column){return!column.visible})};BootstrapTable.prototype.getVisibleColumns=function(){return $.grep(this.columns,function(column){return column.visible})};BootstrapTable.prototype.toggleAllColumns=function(visible){$.each(this.columns,function(i,column){this.columns[i].visible=visible});this.initHeader();this.initSearch();this.initPagination();this.initBody();if(this.options.showColumns){var $items=this.$toolbar.find(".keep-open input").prop("disabled",false);if($items.filter(":checked").length<=this.options.minimumCountColumns){$items.filter(":checked").prop("disabled",true)}}};BootstrapTable.prototype.showAllColumns=function(){this.toggleAllColumns(true)};BootstrapTable.prototype.hideAllColumns=function(){this.toggleAllColumns(false)};BootstrapTable.prototype.filterBy=function(columns){this.filterColumns=$.isEmptyObject(columns)?{}:columns;this.options.pageNumber=1;this.initSearch();this.updatePagination()};BootstrapTable.prototype.scrollTo=function(value){if(typeof value==="string"){value=value==="bottom"?this.$tableBody[0].scrollHeight:0}if(typeof value==="number"){this.$tableBody.scrollTop(value)}if(typeof value==="undefined"){return this.$tableBody.scrollTop()}};BootstrapTable.prototype.getScrollPosition=function(){return this.scrollTo()};BootstrapTable.prototype.selectPage=function(page){if(page>0&&page<=this.options.totalPages){this.options.pageNumber=page;this.updatePagination()}};BootstrapTable.prototype.prevPage=function(){if(this.options.pageNumber>1){this.options.pageNumber--;this.updatePagination()}};BootstrapTable.prototype.nextPage=function(){if(this.options.pageNumber<this.options.totalPages){this.options.pageNumber++;this.updatePagination()}};BootstrapTable.prototype.toggleView=function(){this.options.cardView=!this.options.cardView;this.initHeader();this.initBody();this.trigger("toggle",this.options.cardView)};BootstrapTable.prototype.refreshOptions=function(options){if(compareObjects(this.options,options,true)){return}this.options=$.extend(this.options,options);this.trigger("refresh-options",this.options);this.destroy();this.init()};BootstrapTable.prototype.resetSearch=function(text){var $search=this.$toolbar.find(".search input");$search.val(text||"");this.onSearch({currentTarget:$search})};BootstrapTable.prototype.expandRow_=function(expand,index){var $tr=this.$body.find(sprintf('> tr[data-index="%s"]',index));if($tr.next().is("tr.detail-view")===(expand?false:true)){$tr.find("> td > .detail-icon").click()}};BootstrapTable.prototype.expandRow=function(index){this.expandRow_(true,index)};BootstrapTable.prototype.collapseRow=function(index){this.expandRow_(false,index)};BootstrapTable.prototype.expandAllRows=function(isSubTable){if(isSubTable){var $tr=this.$body.find(sprintf('> tr[data-index="%s"]',0)),that=this,detailIcon=null,executeInterval=false,idInterval=-1;if(!$tr.next().is("tr.detail-view")){$tr.find("> td > .detail-icon").click();executeInterval=true}else if(!$tr.next().next().is("tr.detail-view")){$tr.next().find(".detail-icon").click();executeInterval=true}if(executeInterval){try{idInterval=setInterval(function(){detailIcon=that.$body.find("tr.detail-view").last().find(".detail-icon");if(detailIcon.length>0){detailIcon.click()}else{clearInterval(idInterval)}},1)}catch(ex){clearInterval(idInterval)}}}else{var trs=this.$body.children();for(var i=0;i<trs.length;i++){this.expandRow_(true,$(trs[i]).data("index"))}}};BootstrapTable.prototype.collapseAllRows=function(isSubTable){if(isSubTable){this.expandRow_(false,0)}else{var trs=this.$body.children();for(var i=0;i<trs.length;i++){this.expandRow_(false,$(trs[i]).data("index"))}}};BootstrapTable.prototype.updateFormatText=function(name,text){if(this.options[sprintf("format%s",name)]){if(typeof text==="string"){this.options[sprintf("format%s",name)]=function(){return text}}else if(typeof text==="function"){this.options[sprintf("format%s",name)]=text}}this.initToolbar();this.initPagination();this.initBody()};var allowedMethods=["getOptions","getSelections","getAllSelections","getData","load","append","prepend","remove","removeAll","insertRow","updateRow","updateCell","updateByUniqueId","removeByUniqueId","getRowByUniqueId","showRow","hideRow","getHiddenRows","mergeCells","checkAll","uncheckAll","checkInvert","check","uncheck","checkBy","uncheckBy","refresh","resetView","resetWidth","destroy","showLoading","hideLoading","showColumn","hideColumn","getHiddenColumns","getVisibleColumns","showAllColumns","hideAllColumns","filterBy","scrollTo","getScrollPosition","selectPage","prevPage","nextPage","togglePagination","toggleView","refreshOptions","resetSearch","expandRow","collapseRow","expandAllRows","collapseAllRows","updateFormatText"];$.fn.bootstrapTable=function(option){var value,args=Array.prototype.slice.call(arguments,1);this.each(function(){var $this=$(this),data=$this.data("bootstrap.table"),options=$.extend({},BootstrapTable.DEFAULTS,$this.data(),typeof option==="object"&&option);if(typeof option==="string"){if($.inArray(option,allowedMethods)<0){throw new Error("Unknown method: "+option)}if(!data){return}value=data[option].apply(data,args);if(option==="destroy"){$this.removeData("bootstrap.table")}}if(!data){$this.data("bootstrap.table",data=new BootstrapTable(this,options))}});return typeof value==="undefined"?this:value};$.fn.bootstrapTable.Constructor=BootstrapTable;$.fn.bootstrapTable.defaults=BootstrapTable.DEFAULTS;$.fn.bootstrapTable.columnDefaults=BootstrapTable.COLUMN_DEFAULTS;$.fn.bootstrapTable.locales=BootstrapTable.LOCALES;$.fn.bootstrapTable.methods=allowedMethods;$.fn.bootstrapTable.utils={sprintf:sprintf,getFieldIndex:getFieldIndex,compareObjects:compareObjects,calculateObjectValue:calculateObjectValue,getItemField:getItemField,objectKeys:objectKeys,isIEBrowser:isIEBrowser};$(function(){$('[data-toggle="table"]').bootstrapTable()})})(jQuery);

define("bootstrap-table", ["bootstrap"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.$.fn.bootstrapTable;
    };
}(this)));

/**
 * Bootstrap Table Chinese translation
 * Author: Zhixin Wen<wenzhixin2010@gmail.com>
 */
(function ($) {
    'use strict';

    $.fn.bootstrapTable.locales['zh-CN'] = {
        formatLoadingMessage: function () {
            return '正在努力地加载数据中，请稍候……';
        },
        formatRecordsPerPage: function (pageNumber) {
            return '每页显示 ' + pageNumber + ' 条记录';
        },
        formatShowingRows: function (pageFrom, pageTo, totalRows) {
            return '显示第 ' + pageFrom + ' 到第 ' + pageTo + ' 条记录，总共 ' + totalRows + ' 条记录';
        },
        formatSearch: function () {
            return '搜索';
        },
        formatNoMatches: function () {
            return '没有找到匹配的记录';
        },
        formatPaginationSwitch: function () {
            return '隐藏/显示分页';
        },
        formatRefresh: function () {
            return '刷新';
        },
        formatToggle: function () {
            return '切换';
        },
        formatColumns: function () {
            return '列';
        },
        formatExport: function () {
            return '导出数据';
        },
        formatClearFilters: function () {
            return '清空过滤';
        }
    };

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales['zh-CN']);

})(jQuery);

define("bootstrap-table-lang", ["bootstrap-table"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.$.fn.bootstrapTable.defaults;
    };
}(this)));

/*
 tableExport.jquery.plugin

 Version 1.10.22

 Copyright (c) 2015-2021 hhurz, https://github.com/hhurz/tableExport.jquery.plugin

 Based on https://github.com/kayalshri/tableExport.jquery.plugin

 Licensed under the MIT License
*/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(d,k,y){d instanceof String&&(d=String(d));for(var C=d.length,v=0;v<C;v++){var R=d[v];if(k.call(y,R,v,d))return{i:v,v:R}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(d,k,y){d!=Array.prototype&&d!=Object.prototype&&(d[k]=y.value)};
$jscomp.getGlobal=function(d){return"undefined"!=typeof window&&window===d?d:"undefined"!=typeof global&&null!=global?global:d};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(d,k,y,C){if(k){y=$jscomp.global;d=d.split(".");for(C=0;C<d.length-1;C++){var v=d[C];v in y||(y[v]={});y=y[v]}d=d[d.length-1];C=y[d];k=k(C);k!=C&&null!=k&&$jscomp.defineProperty(y,d,{configurable:!0,writable:!0,value:k})}};
$jscomp.polyfill("Array.prototype.find",function(d){return d?d:function(d,y){return $jscomp.findInternal(this,d,y).v}},"es6","es3");
(function(d){d.fn.tableExport=function(k){function y(b){var c=[];v(b,"thead").each(function(){c.push.apply(c,v(d(this),a.theadSelector).toArray())});return c}function C(b){var c=[];v(b,"tbody").each(function(){c.push.apply(c,v(d(this),a.tbodySelector).toArray())});a.tfootSelector.length&&v(b,"tfoot").each(function(){c.push.apply(c,v(d(this),a.tfootSelector).toArray())});return c}function v(b,a){var c=b[0].tagName,q=b.parents(c).length;return b.find(a).filter(function(){return q===d(this).closest(c).parents(c).length})}
function R(b){var a=[],e=0,q=0,f=0;d(b).find("thead").first().find("th").each(function(b,c){b=void 0!==d(c).attr("data-field");"undefined"!==typeof c.parentNode.rowIndex&&q!==c.parentNode.rowIndex&&(q=c.parentNode.rowIndex,e=f=0);var h=J(c);for(e+=h?h:1;f<e;)a[f]=b?d(c).attr("data-field"):f.toString(),f++});return a}function I(b){var a="undefined"!==typeof b[0].rowIndex,e=!1===a&&"undefined"!==typeof b[0].cellIndex,q=e||a?Ja(b):b.is(":visible"),f=b.attr("data-tableexport-display");e&&"none"!==f&&
"always"!==f&&(b=d(b[0].parentNode),a="undefined"!==typeof b[0].rowIndex,f=b.attr("data-tableexport-display"));a&&"none"!==f&&"always"!==f&&(f=b.closest("table").attr("data-tableexport-display"));return"none"!==f&&(!0===q||"always"===f)}function Ja(b){var a=[];V&&(a=K.filter(function(){var a=!1;this.nodeType===b[0].nodeType&&("undefined"!==typeof this.rowIndex&&this.rowIndex===b[0].rowIndex?a=!0:"undefined"!==typeof this.cellIndex&&this.cellIndex===b[0].cellIndex&&"undefined"!==typeof this.parentNode.rowIndex&&
"undefined"!==typeof b[0].parentNode.rowIndex&&this.parentNode.rowIndex===b[0].parentNode.rowIndex&&(a=!0));return a}));return!1===V||0===a.length}function ta(b,c,e){var q=!1;I(b)?0<a.ignoreColumn.length&&(-1!==d.inArray(e,a.ignoreColumn)||-1!==d.inArray(e-c,a.ignoreColumn)||S.length>e&&"undefined"!==typeof S[e]&&-1!==d.inArray(S[e],a.ignoreColumn))&&(q=!0):q=!0;return q}function E(b,c,e,q,f){if("function"===typeof f){var h=!1;"function"===typeof a.onIgnoreRow&&(h=a.onIgnoreRow(d(b),e));if(!1===h&&
(0===a.ignoreRow.length||-1===d.inArray(e,a.ignoreRow)&&-1===d.inArray(e-q,a.ignoreRow))&&I(d(b))){b=v(d(b),c);var n=b.length,l=0,u=0;b.each(function(){var b=d(this),a=J(this),c=T(this),h;d.each(G,function(){if(e>this.s.r&&e<=this.e.r&&l>=this.s.c&&l<=this.e.c)for(h=0;h<=this.e.c-this.s.c;++h)n++,u++,f(null,e,l++)});if(c||a)a=a||1,G.push({s:{r:e,c:l},e:{r:e+(c||1)-1,c:l+a-1}});!1===ta(b,n,u++)&&f(this,e,l++);if(1<a)for(h=0;h<a-1;++h)u++,f(null,e,l++)});d.each(G,function(){if(e>=this.s.r&&e<=this.e.r&&
l>=this.s.c&&l<=this.e.c)for(ea=0;ea<=this.e.c-this.s.c;++ea)f(null,e,l++)})}}}function ua(b,a,e,d){if("undefined"!==typeof d.images&&(e=d.images[e],"undefined"!==typeof e)){a=a.getBoundingClientRect();var c=b.width/b.height,h=a.width/a.height,q=b.width,l=b.height,u=19.049976/25.4,g=0;h<=c?(l=Math.min(b.height,a.height),q=a.width*l/a.height):h>c&&(q=Math.min(b.width,a.width),l=a.height*q/a.width);q*=u;l*=u;l<b.height&&(g=(b.height-l)/2);try{d.doc.addImage(e.src,b.textPos.x,b.y+g,q,l)}catch(Pa){}b.textPos.x+=
q}}function va(b,c){if("string"===a.outputMode)return b.output();if("base64"===a.outputMode)return L(b.output());if("window"===a.outputMode)window.URL=window.URL||window.webkitURL,window.open(window.URL.createObjectURL(b.output("blob")));else try{var e=b.output("blob");saveAs(e,a.fileName+".pdf")}catch(q){ka(a.fileName+".pdf","data:application/pdf"+(c?"":";base64")+",",c?b.output("blob"):b.output())}}function wa(b,a,e){var c=0;"undefined"!==typeof e&&(c=e.colspan);if(0<=c){for(var f=b.width,d=b.textPos.x,
n=a.table.columns.indexOf(a.column),l=1;l<c;l++)f+=a.table.columns[n+l].width;1<c&&("right"===b.styles.halign?d=b.textPos.x+f-b.width:"center"===b.styles.halign&&(d=b.textPos.x+(f-b.width)/2));b.width=f;b.textPos.x=d;"undefined"!==typeof e&&1<e.rowspan&&(b.height*=e.rowspan);if("middle"===b.styles.valign||"bottom"===b.styles.valign)e=("string"===typeof b.text?b.text.split(/\r\n|\r|\n/g):b.text).length||1,2<e&&(b.textPos.y-=(2-1.15)/2*a.row.styles.fontSize*(e-2)/3);return!0}return!1}function xa(b,
a,e){"undefined"!==typeof b&&null!==b&&(b.hasAttribute("data-tableexport-canvas")?(a=(new Date).getTime(),d(b).attr("data-tableexport-canvas",a),e.images[a]={url:'[data-tableexport-canvas="'+a+'"]',src:null}):"undefined"!==a&&null!=a&&a.each(function(){if(d(this).is("img")){var a=ya(this.src);e.images[a]={url:this.src,src:this.src}}xa(b,d(this).children(),e)}))}function Ka(b,a){function c(b){if(b.url)if(b.src){var c=new Image;q=++f;c.crossOrigin="Anonymous";c.onerror=c.onload=function(){if(c.complete&&
(0===c.src.indexOf("data:image/")&&(c.width=b.width||c.width||0,c.height=b.height||c.height||0),c.width+c.height)){var e=document.createElement("canvas"),d=e.getContext("2d");e.width=c.width;e.height=c.height;d.drawImage(c,0,0);b.src=e.toDataURL("image/png")}--f||a(q)};c.src=b.url}else{var e=d(b.url);e.length&&(q=++f,html2canvas(e[0]).then(function(c){b.src=c.toDataURL("image/png");--f||a(q)}))}}var q=0,f=0;if("undefined"!==typeof b.images)for(var h in b.images)b.images.hasOwnProperty(h)&&c(b.images[h]);
(b=f)||(a(q),b=void 0);return b}function za(b,c,e){c.each(function(){if(d(this).is("div")){var c=fa(M(this,"background-color"),[255,255,255]),f=fa(M(this,"border-top-color"),[0,0,0]),h=ha(this,"border-top-width",a.jspdf.unit),n=this.getBoundingClientRect(),l=this.offsetLeft*e.wScaleFactor,u=this.offsetTop*e.hScaleFactor,g=n.width*e.wScaleFactor;n=n.height*e.hScaleFactor;e.doc.setDrawColor.apply(void 0,f);e.doc.setFillColor.apply(void 0,c);e.doc.setLineWidth(h);e.doc.rect(b.x+l,b.y+u,g,n,h?"FD":"F")}else d(this).is("img")&&
(c=ya(this.src),ua(b,this,c,e));za(b,d(this).children(),e)})}function Aa(b,c,e){if("function"===typeof e.onAutotableText)e.onAutotableText(e.doc,b,c);else{var q=b.textPos.x,f=b.textPos.y,h={halign:b.styles.halign,valign:b.styles.valign};if(c.length){for(c=c[0];c.previousSibling;)c=c.previousSibling;for(var n=!1,l=!1;c;){var u=c.innerText||c.textContent||"",g=u.length&&" "===u[0]?" ":"",k=1<u.length&&" "===u[u.length-1]?" ":"";!0!==a.preserve.leadingWS&&(u=g+la(u));!0!==a.preserve.trailingWS&&(u=ma(u)+
k);d(c).is("br")&&(q=b.textPos.x,f+=e.doc.internal.getFontSize());d(c).is("b")?n=!0:d(c).is("i")&&(l=!0);(n||l)&&e.doc.setFontType(n&&l?"bolditalic":n?"bold":"italic");if(g=e.doc.getStringUnitWidth(u)*e.doc.internal.getFontSize()){"linebreak"===b.styles.overflow&&q>b.textPos.x&&q+g>b.textPos.x+b.width&&(0<=".,!%*;:=-".indexOf(u.charAt(0))&&(k=u.charAt(0),g=e.doc.getStringUnitWidth(k)*e.doc.internal.getFontSize(),q+g<=b.textPos.x+b.width&&(e.doc.autoTableText(k,q,f,h),u=u.substring(1,u.length)),g=
e.doc.getStringUnitWidth(u)*e.doc.internal.getFontSize()),q=b.textPos.x,f+=e.doc.internal.getFontSize());if("visible"!==b.styles.overflow)for(;u.length&&q+g>b.textPos.x+b.width;)u=u.substring(0,u.length-1),g=e.doc.getStringUnitWidth(u)*e.doc.internal.getFontSize();e.doc.autoTableText(u,q,f,h);q+=g}if(n||l)d(c).is("b")?n=!1:d(c).is("i")&&(l=!1),e.doc.setFontType(n||l?n?"bold":"italic":"normal");c=c.nextSibling}b.textPos.x=q;b.textPos.y=f}else e.doc.autoTableText(b.text,b.textPos.x,b.textPos.y,h)}}
function W(b,a,e){return null==b?"":b.toString().replace(new RegExp(null==a?"":a.toString().replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1"),"g"),e)}function la(b){return null==b?"":b.toString().replace(/^\s+/,"")}function ma(b){return null==b?"":b.toString().replace(/\s+$/,"")}function La(b){if(0===a.date.html.length)return!1;a.date.pattern.lastIndex=0;var c=a.date.pattern.exec(b);if(null==c)return!1;b=+c[a.date.match_y];if(0>b||8099<b)return!1;var e=1*c[a.date.match_m];c=1*c[a.date.match_d];if(!isFinite(c))return!1;
var d=new Date(b,e-1,c,0,0,0);return d.getFullYear()===b&&d.getMonth()===e-1&&d.getDate()===c?new Date(Date.UTC(b,e-1,c,0,0,0)):!1}function na(b){b=b||"0";""!==a.numbers.html.thousandsSeparator&&(b=W(b,a.numbers.html.thousandsSeparator,""));"."!==a.numbers.html.decimalMark&&(b=W(b,a.numbers.html.decimalMark,"."));return"number"===typeof b||!1!==jQuery.isNumeric(b)?b:!1}function Ma(b){-1<b.indexOf("%")?(b=na(b.replace(/%/g,"")),!1!==b&&(b/=100)):b=!1;return b}function D(b,c,e,q){var f="",h="text";
if(null!==b){var n=d(b);n.removeData("teUserDefText");if(n[0].hasAttribute("data-tableexport-canvas"))var l="";else if(n[0].hasAttribute("data-tableexport-value"))l=(l=n.attr("data-tableexport-value"))?l+"":"",n.data("teUserDefText",1);else if(l=n.html(),"function"===typeof a.onCellHtmlData)l=a.onCellHtmlData(n,c,e,l),n.data("teUserDefText",1);else if(""!==l){b=d.parseHTML(l);var g=0,k=0;l="";d.each(b,function(){if(d(this).is("input"))l+=n.find("input").eq(g++).val();else if(d(this).is("select"))l+=
n.find("select option:selected").eq(k++).text();else if(d(this).is("br"))l+="<br>";else{if("undefined"===typeof d(this).html())l+=d(this).text();else if(void 0===jQuery().bootstrapTable||!1===d(this).hasClass("fht-cell")&&!1===d(this).hasClass("filterControl")&&0===n.parents(".detail-view").length)l+=d(this).html();if(d(this).is("a")){var b=n.find("a").attr("href")||"";f="function"===typeof a.onCellHtmlHyperlink?f+a.onCellHtmlHyperlink(n,c,e,b,l):"href"===a.htmlHyperlink?f+b:f+l;l=""}}})}if(l&&""!==
l&&!0===a.htmlContent)f=d.trim(l);else if(l&&""!==l)if(""!==n.attr("data-tableexport-cellformat")){var m=l.replace(/\n/g,"\u2028").replace(/(<\s*br([^>]*)>)/gi,"\u2060"),p=d("<div/>").html(m).contents();b=!1;m="";d.each(p.text().split("\u2028"),function(b,c){0<b&&(m+=" ");!0!==a.preserve.leadingWS&&(c=la(c));m+=!0!==a.preserve.trailingWS?ma(c):c});d.each(m.split("\u2060"),function(b,c){0<b&&(f+="\n");!0!==a.preserve.leadingWS&&(c=la(c));!0!==a.preserve.trailingWS&&(c=ma(c));f+=c.replace(/\u00AD/g,
"")});f=f.replace(/\u00A0/g," ");if("json"===a.type||"excel"===a.type&&"xmlss"===a.mso.fileFormat||!1===a.numbers.output)b=na(f),!1!==b&&(h="number",f=Number(b));else if(a.numbers.html.decimalMark!==a.numbers.output.decimalMark||a.numbers.html.thousandsSeparator!==a.numbers.output.thousandsSeparator)if(b=na(f),!1!==b){p=(""+b.substr(0>b?1:0)).split(".");1===p.length&&(p[1]="");var t=3<p[0].length?p[0].length%3:0;h="number";f=(0>b?"-":"")+(a.numbers.output.thousandsSeparator?(t?p[0].substr(0,t)+a.numbers.output.thousandsSeparator:
"")+p[0].substr(t).replace(/(\d{3})(?=\d)/g,"$1"+a.numbers.output.thousandsSeparator):p[0])+(p[1].length?a.numbers.output.decimalMark+p[1]:"")}}else f=l;!0===a.escape&&(f=escape(f));"function"===typeof a.onCellData&&(f=a.onCellData(n,c,e,f,h),n.data("teUserDefText",1))}void 0!==q&&(q.type=h);return f}function Ba(b){return 0<b.length&&!0===a.preventInjection&&0<="=+-@".indexOf(b.charAt(0))?"'"+b:b}function Na(b,a,e){return a+"-"+e.toLowerCase()}function fa(b,a){(b=/^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/.exec(b))&&
(a=[parseInt(b[1]),parseInt(b[2]),parseInt(b[3])]);return a}function Ca(b){var a=M(b,"text-align"),e=M(b,"font-weight"),d=M(b,"font-style"),f="";"start"===a&&(a="rtl"===M(b,"direction")?"right":"left");700<=e&&(f="bold");"italic"===d&&(f+=d);""===f&&(f="normal");a={style:{align:a,bcolor:fa(M(b,"background-color"),[255,255,255]),color:fa(M(b,"color"),[0,0,0]),fstyle:f},colspan:J(b),rowspan:T(b)};null!==b&&(b=b.getBoundingClientRect(),a.rect={width:b.width,height:b.height});return a}function J(b){var a=
d(b).attr("data-tableexport-colspan");"undefined"===typeof a&&d(b).is("[colspan]")&&(a=d(b).attr("colspan"));return parseInt(a)||0}function T(b){var a=d(b).attr("data-tableexport-rowspan");"undefined"===typeof a&&d(b).is("[rowspan]")&&(a=d(b).attr("rowspan"));return parseInt(a)||0}function M(a,c){try{return window.getComputedStyle?(c=c.replace(/([a-z])([A-Z])/,Na),window.getComputedStyle(a,null).getPropertyValue(c)):a.currentStyle?a.currentStyle[c]:a.style[c]}catch(e){}return""}function ha(a,c,e){c=
M(a,c).match(/\d+/);if(null!==c){c=c[0];a=a.parentElement;var b=document.createElement("div");b.style.overflow="hidden";b.style.visibility="hidden";a.appendChild(b);b.style.width=100+e;e=100/b.offsetWidth;a.removeChild(b);return c*e}return 0}function Oa(a){for(var b=new ArrayBuffer(a.length),e=new Uint8Array(b),d=0;d!==a.length;++d)e[d]=a.charCodeAt(d)&255;return b}function oa(a){var b=a.c,e="";for(++b;b;b=Math.floor((b-1)/26))e=String.fromCharCode((b-1)%26+65)+e;return e+(""+(a.r+1))}function pa(a,
c){if("undefined"===typeof c||"number"===typeof c)return pa(a.s,a.e);"string"!==typeof a&&(a=oa(a));"string"!==typeof c&&(c=oa(c));return a===c?a:a+":"+c}function Da(a,c){var b=Number(a);if(isFinite(b))return b;var d=1;""!==c.thousandsSeparator&&(a=a.replace(new RegExp("([\\d])"+c.thousandsSeparator+"([\\d])","g"),"$1$2"));"."!==c.decimalMark&&(a=a.replace(new RegExp("([\\d])"+c.decimalMark+"([\\d])","g"),"$1.$2"));a=a.replace(/[$]/g,"").replace(/[%]/g,function(){d*=100;return""});if(isFinite(b=Number(a)))return b/
d;a=a.replace(/[(](.*)[)]/,function(a,b){d=-d;return b});return isFinite(b=Number(a))?b/d:b}function ya(a){var b=0,d;if(0===a.length)return b;var q=0;for(d=a.length;q<d;q++){var f=a.charCodeAt(q);b=(b<<5)-b+f;b|=0}return b}function N(b,c,d,q,f,h){var e=!0;"function"===typeof a.onBeforeSaveToFile&&(e=a.onBeforeSaveToFile(b,c,d,q,f),"boolean"!==typeof e&&(e=!0));if(e)try{if(Ea=new Blob([b],{type:d+";charset="+q}),saveAs(Ea,c,!1===h),"function"===typeof a.onAfterSaveToFile)a.onAfterSaveToFile(b,c)}catch(l){ka(c,
"data:"+d+(q.length?";charset="+q:"")+(f.length?";"+f:"")+",",h?"\ufeff"+b:b)}}function ka(b,c,d){var e=window.navigator.userAgent;if(!1!==b&&window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(new Blob([d]),b);else if(!1!==b&&(0<e.indexOf("MSIE ")||e.match(/Trident.*rv\:11\./))){if(c=document.createElement("iframe")){document.body.appendChild(c);c.setAttribute("style","display:none");c.contentDocument.open("txt/plain","replace");c.contentDocument.write(d);c.contentDocument.close();
c.contentWindow.focus();switch(b.substr(b.lastIndexOf(".")+1)){case "doc":case "json":case "png":case "pdf":case "xls":case "xlsx":b+=".txt"}c.contentDocument.execCommand("SaveAs",!0,b);document.body.removeChild(c)}}else{var f=document.createElement("a");if(f){var h=null;f.style.display="none";!1!==b?f.download=b:f.target="_blank";"object"===typeof d?(window.URL=window.URL||window.webkitURL,e=[],e.push(d),h=window.URL.createObjectURL(new Blob(e,{type:c})),f.href=h):0<=c.toLowerCase().indexOf("base64,")?
f.href=c+L(d):f.href=c+encodeURIComponent(d);document.body.appendChild(f);if(document.createEvent)null===ia&&(ia=document.createEvent("MouseEvents")),ia.initEvent("click",!0,!1),f.dispatchEvent(ia);else if(document.createEventObject)f.fireEvent("onclick");else if("function"===typeof f.onclick)f.onclick();setTimeout(function(){h&&window.URL.revokeObjectURL(h);document.body.removeChild(f);if("function"===typeof a.onAfterSaveToFile)a.onAfterSaveToFile(d,b)},100)}}}function L(a){var b,d="",q=0;if("string"===
typeof a){a=a.replace(/\x0d\x0a/g,"\n");var f="";for(b=0;b<a.length;b++){var h=a.charCodeAt(b);128>h?f+=String.fromCharCode(h):(127<h&&2048>h?f+=String.fromCharCode(h>>6|192):(f+=String.fromCharCode(h>>12|224),f+=String.fromCharCode(h>>6&63|128)),f+=String.fromCharCode(h&63|128))}a=f}for(;q<a.length;){var n=a.charCodeAt(q++);f=a.charCodeAt(q++);b=a.charCodeAt(q++);h=n>>2;n=(n&3)<<4|f>>4;var l=(f&15)<<2|b>>6;var g=b&63;isNaN(f)?l=g=64:isNaN(b)&&(g=64);d=d+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h)+
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(n)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g)}return d}var a={csvEnclosure:'"',csvSeparator:",",csvUseBOM:!0,date:{html:"dd/mm/yyyy"},displayTableName:!1,escape:!1,exportHiddenCells:!1,fileName:"tableExport",htmlContent:!1,htmlHyperlink:"content",ignoreColumn:[],ignoreRow:[],jsonScope:"all",jspdf:{orientation:"p",
unit:"pt",format:"a4",margins:{left:20,right:10,top:10,bottom:10},onDocCreated:null,autotable:{styles:{cellPadding:2,rowHeight:12,fontSize:8,fillColor:255,textColor:50,fontStyle:"normal",overflow:"ellipsize",halign:"inherit",valign:"middle"},headerStyles:{fillColor:[52,73,94],textColor:255,fontStyle:"bold",halign:"inherit",valign:"middle"},alternateRowStyles:{fillColor:245},tableExport:{doc:null,onAfterAutotable:null,onBeforeAutotable:null,onAutotableText:null,onTable:null,outputImages:!0}}},mso:{fileFormat:"xlshtml",
onMsoNumberFormat:null,pageFormat:"a4",pageOrientation:"portrait",rtl:!1,styles:[],worksheetName:"",xslx:{formatId:{date:14,numbers:2}}},numbers:{html:{decimalMark:".",thousandsSeparator:","},output:{decimalMark:".",thousandsSeparator:","}},onAfterSaveToFile:null,onBeforeSaveToFile:null,onCellData:null,onCellHtmlData:null,onCellHtmlHyperlink:null,onIgnoreRow:null,onTableExportBegin:null,onTableExportEnd:null,outputMode:"file",pdfmake:{enabled:!1,docDefinition:{pageSize:"A4",pageOrientation:"portrait",
styles:{header:{background:"#34495E",color:"#FFFFFF",bold:!0,alignment:"center",fillColor:"#34495E"},alternateRow:{fillColor:"#f5f5f5"}},defaultStyle:{color:"#000000",fontSize:8,font:"Roboto"}},fonts:{}},preserve:{leadingWS:!1,trailingWS:!1},preventInjection:!0,sql:{tableEnclosure:"`",columnEnclosure:"`"},tbodySelector:"tr",tfootSelector:"tr",theadSelector:"tr",tableName:"Table",type:"csv"},O={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,
595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,
161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]},B=this,ia=null,r=[],w=[],p=0,t="",S=[],G=[],Ea,K=[],V=!1;d.extend(!0,a,k);"xlsx"===a.type&&(a.mso.fileFormat=a.type,a.type="excel");"undefined"!==typeof a.excelFileFormat&&"undefined"===a.mso.fileFormat&&(a.mso.fileFormat=a.excelFileFormat);"undefined"!==typeof a.excelPageFormat&&"undefined"===a.mso.pageFormat&&
(a.mso.pageFormat=a.excelPageFormat);"undefined"!==typeof a.excelPageOrientation&&"undefined"===a.mso.pageOrientation&&(a.mso.pageOrientation=a.excelPageOrientation);"undefined"!==typeof a.excelRTL&&"undefined"===a.mso.rtl&&(a.mso.rtl=a.excelRTL);"undefined"!==typeof a.excelstyles&&"undefined"===a.mso.styles&&(a.mso.styles=a.excelstyles);"undefined"!==typeof a.onMsoNumberFormat&&"undefined"===a.mso.onMsoNumberFormat&&(a.mso.onMsoNumberFormat=a.onMsoNumberFormat);"undefined"!==typeof a.worksheetName&&
"undefined"===a.mso.worksheetName&&(a.mso.worksheetName=a.worksheetName);a.mso.pageOrientation="l"===a.mso.pageOrientation.substr(0,1)?"landscape":"portrait";a.date.html=a.date.html||"";if(a.date.html.length){k=[];k.dd="(3[01]|[12][0-9]|0?[1-9])";k.mm="(1[012]|0?[1-9])";k.yyyy="((?:1[6-9]|2[0-2])\\d{2})";k.yy="(\\d{2})";var z=a.date.html.match(/[^a-zA-Z0-9]/)[0];z=a.date.html.toLowerCase().split(z);a.date.regex="^\\s*";a.date.regex+=k[z[0]];a.date.regex+="(.)";a.date.regex+=k[z[1]];a.date.regex+=
"\\2";a.date.regex+=k[z[2]];a.date.regex+="\\s*$";a.date.pattern=new RegExp(a.date.regex,"g");k=z.indexOf("dd")+1;a.date.match_d=k+(1<k?1:0);k=z.indexOf("mm")+1;a.date.match_m=k+(1<k?1:0);k=(0<=z.indexOf("yyyy")?z.indexOf("yyyy"):z.indexOf("yy"))+1;a.date.match_y=k+(1<k?1:0)}S=R(B);if("function"===typeof a.onTableExportBegin)a.onTableExportBegin();if("csv"===a.type||"tsv"===a.type||"txt"===a.type){var P="",Z=0;G=[];p=0;var qa=function(b,c,e){b.each(function(){t="";E(this,c,p,e+b.length,function(b,
c,d){var e=t,f="";if(null!==b)if(b=D(b,c,d),c=null===b||""===b?"":b.toString(),"tsv"===a.type)b instanceof Date&&b.toLocaleString(),f=W(c,"\t"," ");else if(b instanceof Date)f=a.csvEnclosure+b.toLocaleString()+a.csvEnclosure;else if(f=Ba(c),f=W(f,a.csvEnclosure,a.csvEnclosure+a.csvEnclosure),0<=f.indexOf(a.csvSeparator)||/[\r\n ]/g.test(f))f=a.csvEnclosure+f+a.csvEnclosure;t=e+(f+("tsv"===a.type?"\t":a.csvSeparator))});t=d.trim(t).substring(0,t.length-1);0<t.length&&(0<P.length&&(P+="\n"),P+=t);p++});
return b.length};Z+=qa(d(B).find("thead").first().find(a.theadSelector),"th,td",Z);v(d(B),"tbody").each(function(){Z+=qa(v(d(this),a.tbodySelector),"td,th",Z)});a.tfootSelector.length&&qa(d(B).find("tfoot").first().find(a.tfootSelector),"td,th",Z);P+="\n";if("string"===a.outputMode)return P;if("base64"===a.outputMode)return L(P);if("window"===a.outputMode){ka(!1,"data:text/"+("csv"===a.type?"csv":"plain")+";charset=utf-8,",P);return}N(P,a.fileName+"."+a.type,"text/"+("csv"===a.type?"csv":"plain"),
"utf-8","","csv"===a.type&&a.csvUseBOM)}else if("sql"===a.type){p=0;G=[];var A="INSERT INTO "+a.sql.tableEnclosure+a.tableName+a.sql.tableEnclosure+" (";r=y(d(B));d(r).each(function(){E(this,"th,td",p,r.length,function(b,c,d){b=D(b,c,d)||"";-1<b.indexOf(a.sql.columnEnclosure)&&(b=W(b.toString(),a.sql.columnEnclosure,a.sql.columnEnclosure+a.sql.columnEnclosure));A+=a.sql.columnEnclosure+b+a.sql.columnEnclosure+","});p++;A=d.trim(A).substring(0,A.length-1)});A+=") VALUES ";w=C(d(B));d(w).each(function(){t=
"";E(this,"td,th",p,r.length+w.length,function(a,c,d){a=D(a,c,d)||"";-1<a.indexOf("'")&&(a=W(a.toString(),"'","''"));t+="'"+a+"',"});3<t.length&&(A+="("+t,A=d.trim(A).substring(0,A.length-1),A+="),");p++});A=d.trim(A).substring(0,A.length-1);A+=";";if("string"===a.outputMode)return A;if("base64"===a.outputMode)return L(A);N(A,a.fileName+".sql","application/sql","utf-8","",!1)}else if("json"===a.type){var X=[];G=[];r=y(d(B));d(r).each(function(){var a=[];E(this,"th,td",p,r.length,function(b,d,g){a.push(D(b,
d,g))});X.push(a)});var ra=[];w=C(d(B));d(w).each(function(){var a={},c=0;E(this,"td,th",p,r.length+w.length,function(b,d,f){X.length?a[X[X.length-1][c]]=D(b,d,f):a[c]=D(b,d,f);c++});!1===d.isEmptyObject(a)&&ra.push(a);p++});k="head"===a.jsonScope?JSON.stringify(X):"data"===a.jsonScope?JSON.stringify(ra):JSON.stringify({header:X,data:ra});if("string"===a.outputMode)return k;if("base64"===a.outputMode)return L(k);N(k,a.fileName+".json","application/json","utf-8","base64",!1)}else if("xml"===a.type){p=
0;G=[];var Q='<?xml version="1.0" encoding="utf-8"?>';Q+="<tabledata><fields>";r=y(d(B));d(r).each(function(){E(this,"th,td",p,r.length,function(a,d,e){Q+="<field>"+D(a,d,e)+"</field>"});p++});Q+="</fields><data>";var Fa=1;w=C(d(B));d(w).each(function(){var a=1;t="";E(this,"td,th",p,r.length+w.length,function(b,d,g){t+="<column-"+a+">"+D(b,d,g)+"</column-"+a+">";a++});0<t.length&&"<column-1></column-1>"!==t&&(Q+='<row id="'+Fa+'">'+t+"</row>",Fa++);p++});Q+="</data></tabledata>";if("string"===a.outputMode)return Q;
if("base64"===a.outputMode)return L(Q);N(Q,a.fileName+".xml","application/xml","utf-8","base64",!1)}else if("excel"===a.type&&"xmlss"===a.mso.fileFormat){var sa=[],F=[];d(B).filter(function(){return I(d(this))}).each(function(){function b(a,b,c){var f=[];d(a).each(function(){var b=0,e=0;t="";E(this,"td,th",p,c+a.length,function(a,c,h){if(null!==a){var l="";c=D(a,c,h);h="String";if(!1!==jQuery.isNumeric(c))h="Number";else{var n=Ma(c);!1!==n&&(c=n,h="Number",l+=' ss:StyleID="pct1"')}"Number"!==h&&(c=
c.replace(/\n/g,"<br>"));n=J(a);a=T(a);d.each(f,function(){if(p>=this.s.r&&p<=this.e.r&&e>=this.s.c&&e<=this.e.c)for(var a=0;a<=this.e.c-this.s.c;++a)e++,b++});if(a||n)a=a||1,n=n||1,f.push({s:{r:p,c:e},e:{r:p+a-1,c:e+n-1}});1<n&&(l+=' ss:MergeAcross="'+(n-1)+'"',e+=n-1);1<a&&(l+=' ss:MergeDown="'+(a-1)+'" ss:StyleID="rsp1"');0<b&&(l+=' ss:Index="'+(e+1)+'"',b=0);t+="<Cell"+l+'><Data ss:Type="'+h+'">'+d("<div />").text(c).html()+"</Data></Cell>\r";e++}});0<t.length&&(H+='<Row ss:AutoFitHeight="0">\r'+
t+"</Row>\r");p++});return a.length}var c=d(this),e="";"string"===typeof a.mso.worksheetName&&a.mso.worksheetName.length?e=a.mso.worksheetName+" "+(F.length+1):"undefined"!==typeof a.mso.worksheetName[F.length]&&(e=a.mso.worksheetName[F.length]);e.length||(e=c.find("caption").text()||"");e.length||(e="Table "+(F.length+1));e=d.trim(e.replace(/[\\\/[\]*:?'"]/g,"").substring(0,31));F.push(d("<div />").text(e).html());!1===a.exportHiddenCells&&(K=c.find("tr, th, td").filter(":hidden"),V=0<K.length);
p=0;S=R(this);H="<Table>\r";e=b(y(c),"th,td",0);b(C(c),"td,th",e);H+="</Table>\r";sa.push(H)});k={};z={};for(var m,aa,Y=0,ea=F.length;Y<ea;Y++)m=F[Y],aa=k[m],aa=k[m]=null==aa?1:aa+1,2===aa&&(F[z[m]]=F[z[m]].substring(0,29)+"-1"),1<k[m]?F[Y]=F[Y].substring(0,29)+"-"+k[m]:z[m]=Y;k='<?xml version="1.0" encoding="UTF-8"?>\r<?mso-application progid="Excel.Sheet"?>\r<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\r xmlns:o="urn:schemas-microsoft-com:office:office"\r xmlns:x="urn:schemas-microsoft-com:office:excel"\r xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\r xmlns:html="http://www.w3.org/TR/REC-html40">\r<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">\r  <Created>'+
(new Date).toISOString()+'</Created>\r</DocumentProperties>\r<OfficeDocumentSettings xmlns="urn:schemas-microsoft-com:office:office">\r  <AllowPNG/>\r</OfficeDocumentSettings>\r<ExcelWorkbook xmlns="urn:schemas-microsoft-com:office:excel">\r  <WindowHeight>9000</WindowHeight>\r  <WindowWidth>13860</WindowWidth>\r  <WindowTopX>0</WindowTopX>\r  <WindowTopY>0</WindowTopY>\r  <ProtectStructure>False</ProtectStructure>\r  <ProtectWindows>False</ProtectWindows>\r</ExcelWorkbook>\r<Styles>\r  <Style ss:ID="Default" ss:Name="Normal">\r    <Alignment ss:Vertical="Bottom"/>\r    <Borders/>\r    <Font/>\r    <Interior/>\r    <NumberFormat/>\r    <Protection/>\r  </Style>\r  <Style ss:ID="rsp1">\r    <Alignment ss:Vertical="Center"/>\r  </Style>\r  <Style ss:ID="pct1">\r    <NumberFormat ss:Format="Percent"/>\r  </Style>\r</Styles>\r';
for(z=0;z<sa.length;z++)k+='<Worksheet ss:Name="'+F[z]+'" ss:RightToLeft="'+(a.mso.rtl?"1":"0")+'">\r'+sa[z],k=a.mso.rtl?k+'<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel">\r<DisplayRightToLeft/>\r</WorksheetOptions>\r':k+'<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"/>\r',k+="</Worksheet>\r";k+="</Workbook>\r";if("string"===a.outputMode)return k;if("base64"===a.outputMode)return L(k);N(k,a.fileName+".xml","application/xml","utf-8","base64",!1)}else if("excel"===
a.type&&"xlsx"===a.mso.fileFormat){var ba=[],Ga=XLSX.utils.book_new();d(B).filter(function(){return I(d(this))}).each(function(){for(var b=d(this),c={},e=this.getElementsByTagName("tr"),g={s:{r:0,c:0},e:{r:0,c:0}},f=[],h,n=[],l=0,u=0,k,m,p,t,r,w=XLSX.SSF.get_table();l<e.length&&1E7>u;++l)if(k=e[l],m=!1,"function"===typeof a.onIgnoreRow&&(m=a.onIgnoreRow(d(k),l)),!0!==m&&(0===a.ignoreRow.length||-1===d.inArray(l,a.ignoreRow)&&-1===d.inArray(l-e.length,a.ignoreRow))&&!1!==I(d(k))){var y=k.children,
B=0;for(k=0;k<y.length;++k)r=y[k],t=+J(r)||1,B+=t;var z=0;for(k=m=0;k<y.length;++k)if(r=y[k],t=+J(r)||1,h=k+z,!ta(d(r),B,h+(h<m?m-h:0))){z+=t-1;for(h=0;h<f.length;++h){var v=f[h];v.s.c==m&&v.s.r<=u&&u<=v.e.r&&(m=v.e.c+1,h=-1)}(0<(p=+T(r))||1<t)&&f.push({s:{r:u,c:m},e:{r:u+(p||1)-1,c:m+t-1}});var C={type:""};h=D(r,l,k+z,C);v={t:"s",v:h};var A="";if(""!==(d(r).attr("data-tableexport-cellformat")||"")){var x=parseInt(d(r).attr("data-tableexport-xlsxformatid")||0);0===x&&"function"===typeof a.mso.xslx.formatId.numbers&&
(x=a.mso.xslx.formatId.numbers(d(r),l,k+z));0===x&&"function"===typeof a.mso.xslx.formatId.date&&(x=a.mso.xslx.formatId.date(d(r),l,k+z));if(49===x||"@"===x)A="s";else if("number"===C.type||0<x&&14>x||36<x&&41>x||48===x)A="n";else if("date"===C.type||13<x&&37>x||44<x&&48>x||56===x)A="d"}else A="s";if(null!=h)if(0===h.length)v.t="z";else if(0!==h.trim().length)if("s"===A)d(r).find("a").length&&(h="href"!==a.htmlHyperlink?h:"",v={f:'=HYPERLINK("'+d(r).find("a").attr("href")+(h.length?'","'+h:"")+'")'});
else if("function"===C.type)v={f:h};else if("TRUE"===h)v={t:"b",v:!0};else if("FALSE"===h)v={t:"b",v:!1};else if("n"===A||isFinite(Da(h,a.numbers.output))){if(r=Da(h,a.numbers.output),0===x&&"function"!==typeof a.mso.xslx.formatId.numbers&&(x=a.mso.xslx.formatId.numbers),isFinite(r)||isFinite(h))v={t:"n",v:isFinite(r)?r:h,z:"string"===typeof x?x:x in w?w[x]:"0.00"}}else if(!1!==(r=La(h))||"d"===A)0===x&&"function"!==typeof a.mso.xslx.formatId.date&&(x=a.mso.xslx.formatId.date),v={t:"d",v:!1!==r?r:
h,z:"string"===typeof x?x:x in w?w[x]:"m/d/yy"};c[oa({c:m,r:u})]=v;g.e.c<m&&(g.e.c=m);m+=t}++u}f.length&&(c["!merges"]=f);n.length&&(c["!rows"]=n);g.e.r=u-1;c["!ref"]=pa(g);1E7<=u&&(c["!fullref"]=pa((g.e.r=e.length-l+u-1,g)));e="";"string"===typeof a.mso.worksheetName&&a.mso.worksheetName.length?e=a.mso.worksheetName+" "+(ba.length+1):"undefined"!==typeof a.mso.worksheetName[ba.length]&&(e=a.mso.worksheetName[ba.length]);e.length||(e=b.find("caption").text()||"");e.length||(e="Table "+(ba.length+
1));e=d.trim(e.replace(/[\\\/[\]*:?'"]/g,"").substring(0,31));ba.push(e);XLSX.utils.book_append_sheet(Ga,c,e)});k=XLSX.write(Ga,{type:"binary",bookType:a.mso.fileFormat,bookSST:!1});N(Oa(k),a.fileName+"."+a.mso.fileFormat,"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","UTF-8","",!1)}else if("excel"===a.type||"xls"===a.type||"word"===a.type||"doc"===a.type){k="excel"===a.type||"xls"===a.type?"excel":"word";z="excel"===k?"xls":"doc";m='xmlns:x="urn:schemas-microsoft-com:office:'+
k+'"';var H="",ca="";d(B).filter(function(){return I(d(this))}).each(function(){var b=d(this);""===ca&&(ca=a.mso.worksheetName||b.find("caption").text()||"Table",ca=d.trim(ca.replace(/[\\\/[\]*:?'"]/g,"").substring(0,31)));!1===a.exportHiddenCells&&(K=b.find("tr, th, td").filter(":hidden"),V=0<K.length);p=0;G=[];S=R(this);H+="<table><thead>";r=y(b);d(r).each(function(){var b=d(this);t="";E(this,"th,td",p,r.length,function(d,c,f){if(null!==d){var e="";t+="<th";if(a.mso.styles.length){var n=document.defaultView.getComputedStyle(d,
null),l=document.defaultView.getComputedStyle(b[0],null),g;for(g in a.mso.styles){var k=n[a.mso.styles[g]];""===k&&(k=l[a.mso.styles[g]]);""!==k&&"0px none rgb(0, 0, 0)"!==k&&"rgba(0, 0, 0, 0)"!==k&&(e+=""===e?'style="':";",e+=a.mso.styles[g]+":"+k)}}""!==e&&(t+=" "+e+'"');e=J(d);0<e&&(t+=' colspan="'+e+'"');e=T(d);0<e&&(t+=' rowspan="'+e+'"');t+=">"+D(d,c,f)+"</th>"}});0<t.length&&(H+="<tr>"+t+"</tr>");p++});H+="</thead><tbody>";w=C(b);d(w).each(function(){var b=d(this);t="";E(this,"td,th",p,r.length+
w.length,function(c,g,f){if(null!==c){var e=D(c,g,f),n="",l=d(c).attr("data-tableexport-msonumberformat");"undefined"===typeof l&&"function"===typeof a.mso.onMsoNumberFormat&&(l=a.mso.onMsoNumberFormat(c,g,f));"undefined"!==typeof l&&""!==l&&(n="style=\"mso-number-format:'"+l+"'");if(a.mso.styles.length){g=document.defaultView.getComputedStyle(c,null);f=document.defaultView.getComputedStyle(b[0],null);for(var k in a.mso.styles)l=g[a.mso.styles[k]],""===l&&(l=f[a.mso.styles[k]]),""!==l&&"0px none rgb(0, 0, 0)"!==
l&&"rgba(0, 0, 0, 0)"!==l&&(n+=""===n?'style="':";",n+=a.mso.styles[k]+":"+l)}t+="<td";""!==n&&(t+=" "+n+'"');n=J(c);0<n&&(t+=' colspan="'+n+'"');c=T(c);0<c&&(t+=' rowspan="'+c+'"');"string"===typeof e&&""!==e&&(e=Ba(e),e=e.replace(/\n/g,"<br>"));t+=">"+e+"</td>"}});0<t.length&&(H+="<tr>"+t+"</tr>");p++});a.displayTableName&&(H+="<tr><td></td></tr><tr><td></td></tr><tr><td>"+D(d("<p>"+a.tableName+"</p>"))+"</td></tr>");H+="</tbody></table>"});m='<html xmlns:o="urn:schemas-microsoft-com:office:office" '+
m+' xmlns="http://www.w3.org/TR/REC-html40">'+('<meta http-equiv="content-type" content="application/vnd.ms-'+k+'; charset=UTF-8">')+"<head>";"excel"===k&&(m+="\x3c!--[if gte mso 9]>",m+="<xml>",m+="<x:ExcelWorkbook>",m+="<x:ExcelWorksheets>",m+="<x:ExcelWorksheet>",m+="<x:Name>",m+=ca,m+="</x:Name>",m+="<x:WorksheetOptions>",m+="<x:DisplayGridlines/>",a.mso.rtl&&(m+="<x:DisplayRightToLeft/>"),m+="</x:WorksheetOptions>",m+="</x:ExcelWorksheet>",m+="</x:ExcelWorksheets>",m+="</x:ExcelWorkbook>",m+=
"</xml>",m+="<![endif]--\x3e");m+="<style>";m+="@page { size:"+a.mso.pageOrientation+"; mso-page-orientation:"+a.mso.pageOrientation+"; }";m+="@page Section1 {size:"+O[a.mso.pageFormat][0]+"pt "+O[a.mso.pageFormat][1]+"pt";m+="; margin:1.0in 1.25in 1.0in 1.25in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}";m+="div.Section1 {page:Section1;}";m+="@page Section2 {size:"+O[a.mso.pageFormat][1]+"pt "+O[a.mso.pageFormat][0]+"pt";m+=";mso-page-orientation:"+a.mso.pageOrientation+";margin:1.25in 1.0in 1.25in 1.0in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;}";
m+="div.Section2 {page:Section2;}";m+="br {mso-data-placement:same-cell;}";m+="</style>";m+="</head>";m+="<body>";m+='<div class="Section'+("landscape"===a.mso.pageOrientation?"2":"1")+'">';m+=H;m+="</div>";m+="</body>";m+="</html>";if("string"===a.outputMode)return m;if("base64"===a.outputMode)return L(m);N(m,a.fileName+"."+z,"application/vnd.ms-"+k,"","base64",!1)}else if("png"===a.type)html2canvas(d(B)[0]).then(function(b){b=b.toDataURL();for(var c=atob(b.substring(22)),d=new ArrayBuffer(c.length),
g=new Uint8Array(d),f=0;f<c.length;f++)g[f]=c.charCodeAt(f);if("string"===a.outputMode)return c;if("base64"===a.outputMode)return L(b);"window"===a.outputMode?window.open(b):N(d,a.fileName+".png","image/png","","",!1)});else if("pdf"===a.type)if(!0===a.pdfmake.enabled){var U={content:[]};d.extend(!0,U,a.pdfmake.docDefinition);G=[];d(B).filter(function(){return I(d(this))}).each(function(){var b=d(this),c=[],e=[];p=0;var g=function(a,b,c){var f=0;d(a).each(function(){var a=[];E(this,b,p,c,function(c,
d,f){if("undefined"!==typeof c&&null!==c){var e=J(c),h=T(c);c={text:D(c,d,f)||" "};if(1<e||1<h)c.colSpan=e||1,c.rowSpan=h||1}else c={text:" "};0<=b.indexOf("th")&&(c.style="header");a.push(c)});for(var d=a.length;d<c;d++)a.push("");a.length&&e.push(a);f<a.length&&(f=a.length);p++});return f};r=y(b);for(var f=g(r,"th,td",r.length),h=c.length;h<f;h++)c.push("*");w=C(b);f=g(w,"td",r.length+w.length);for(h=c.length;h<f;h++)c.push("*");U.content.push({table:{headerRows:r.length?r.length:null,widths:c,
body:e},layout:{layout:"noBorders",hLineStyle:function(a,b){return 0},vLineWidth:function(a,b){return 0},hLineColor:function(b,c){return b<c.table.headerRows?a.pdfmake.docDefinition.styles.header.background:a.pdfmake.docDefinition.styles.alternateRow.fillColor},vLineColor:function(b,c){return b<c.table.headerRows?a.pdfmake.docDefinition.styles.header.background:a.pdfmake.docDefinition.styles.alternateRow.fillColor},fillColor:function(b,c,d){return 0===b%2?a.pdfmake.docDefinition.styles.alternateRow.fillColor:
null}},pageBreak:U.content.length?"before":void 0})});"undefined"!==typeof pdfMake&&"undefined"!==typeof pdfMake.createPdf&&(pdfMake.fonts={Roboto:{normal:"Roboto-Regular.ttf",bold:"Roboto-Medium.ttf",italics:"Roboto-Italic.ttf",bolditalics:"Roboto-MediumItalic.ttf"}},pdfMake.vfs.hasOwnProperty("Mirza-Regular.ttf")?(U.defaultStyle.font="Mirza",d.extend(!0,pdfMake.fonts,{Mirza:{normal:"Mirza-Regular.ttf",bold:"Mirza-Bold.ttf",italics:"Mirza-Medium.ttf",bolditalics:"Mirza-SemiBold.ttf"}})):pdfMake.vfs.hasOwnProperty("gbsn00lp.ttf")?
(U.defaultStyle.font="gbsn00lp",d.extend(!0,pdfMake.fonts,{gbsn00lp:{normal:"gbsn00lp.ttf",bold:"gbsn00lp.ttf",italics:"gbsn00lp.ttf",bolditalics:"gbsn00lp.ttf"}})):pdfMake.vfs.hasOwnProperty("ZCOOLXiaoWei-Regular.ttf")&&(U.defaultStyle.font="ZCOOLXiaoWei",d.extend(!0,pdfMake.fonts,{ZCOOLXiaoWei:{normal:"ZCOOLXiaoWei-Regular.ttf",bold:"ZCOOLXiaoWei-Regular.ttf",italics:"ZCOOLXiaoWei-Regular.ttf",bolditalics:"ZCOOLXiaoWei-Regular.ttf"}})),d.extend(!0,pdfMake.fonts,a.pdfmake.fonts),pdfMake.createPdf(U).getBuffer(function(b){N(b,
a.fileName+".pdf","application/pdf","","",!1)}))}else if(!1===a.jspdf.autotable){k={dim:{w:ha(d(B).first().get(0),"width","mm"),h:ha(d(B).first().get(0),"height","mm")},pagesplit:!1};var Ha=new jsPDF(a.jspdf.orientation,a.jspdf.unit,a.jspdf.format);Ha.addHTML(d(B).first(),a.jspdf.margins.left,a.jspdf.margins.top,k,function(){va(Ha,!1)})}else{var g=a.jspdf.autotable.tableExport;if("string"===typeof a.jspdf.format&&"bestfit"===a.jspdf.format.toLowerCase()){var ja="",da="",Ia=0;d(B).each(function(){if(I(d(this))){var a=
ha(d(this).get(0),"width","pt");if(a>Ia){a>O.a0[0]&&(ja="a0",da="l");for(var c in O)O.hasOwnProperty(c)&&O[c][1]>a&&(ja=c,da="l",O[c][0]>a&&(da="p"));Ia=a}}});a.jspdf.format=""===ja?"a4":ja;a.jspdf.orientation=""===da?"w":da}if(null==g.doc&&(g.doc=new jsPDF(a.jspdf.orientation,a.jspdf.unit,a.jspdf.format),g.wScaleFactor=1,g.hScaleFactor=1,"function"===typeof a.jspdf.onDocCreated))a.jspdf.onDocCreated(g.doc);!0===g.outputImages&&(g.images={});"undefined"!==typeof g.images&&(d(B).filter(function(){return I(d(this))}).each(function(){var b=
0;G=[];!1===a.exportHiddenCells&&(K=d(this).find("tr, th, td").filter(":hidden"),V=0<K.length);r=y(d(this));w=C(d(this));d(w).each(function(){E(this,"td,th",r.length+b,r.length+w.length,function(a){xa(a,d(a).children(),g)});b++})}),r=[],w=[]);Ka(g,function(){d(B).filter(function(){return I(d(this))}).each(function(){var b;p=0;G=[];!1===a.exportHiddenCells&&(K=d(this).find("tr, th, td").filter(":hidden"),V=0<K.length);S=R(this);g.columns=[];g.rows=[];g.teCells={};if("function"===typeof g.onTable&&
!1===g.onTable(d(this),a))return!0;a.jspdf.autotable.tableExport=null;var c=d.extend(!0,{},a.jspdf.autotable);a.jspdf.autotable.tableExport=g;c.margin={};d.extend(!0,c.margin,a.jspdf.margins);c.tableExport=g;"function"!==typeof c.beforePageContent&&(c.beforePageContent=function(a){if(1===a.pageCount){var b=a.table.rows.concat(a.table.headerRow);d.each(b,function(){0<this.height&&(this.height+=(2-1.15)/2*this.styles.fontSize,a.table.height+=(2-1.15)/2*this.styles.fontSize)})}});"function"!==typeof c.createdHeaderCell&&
(c.createdHeaderCell=function(a,b){a.styles=d.extend({},b.row.styles);if("undefined"!==typeof g.columns[b.column.dataKey]){var e=g.columns[b.column.dataKey];if("undefined"!==typeof e.rect){a.contentWidth=e.rect.width;if("undefined"===typeof g.heightRatio||0===g.heightRatio){var f=b.row.raw[b.column.dataKey].rowspan?b.row.raw[b.column.dataKey].rect.height/b.row.raw[b.column.dataKey].rowspan:b.row.raw[b.column.dataKey].rect.height;g.heightRatio=a.styles.rowHeight/f}f=b.row.raw[b.column.dataKey].rect.height*
g.heightRatio;f>a.styles.rowHeight&&(a.styles.rowHeight=f)}a.styles.halign="inherit"===c.headerStyles.halign?"center":c.headerStyles.halign;a.styles.valign=c.headerStyles.valign;"undefined"!==typeof e.style&&!0!==e.style.hidden&&("inherit"===c.headerStyles.halign&&(a.styles.halign=e.style.align),"inherit"===c.styles.fillColor&&(a.styles.fillColor=e.style.bcolor),"inherit"===c.styles.textColor&&(a.styles.textColor=e.style.color),"inherit"===c.styles.fontStyle&&(a.styles.fontStyle=e.style.fstyle))}});
"function"!==typeof c.createdCell&&(c.createdCell=function(a,b){b=g.teCells[b.row.index+":"+b.column.dataKey];a.styles.halign="inherit"===c.styles.halign?"center":c.styles.halign;a.styles.valign=c.styles.valign;"undefined"!==typeof b&&"undefined"!==typeof b.style&&!0!==b.style.hidden&&("inherit"===c.styles.halign&&(a.styles.halign=b.style.align),"inherit"===c.styles.fillColor&&(a.styles.fillColor=b.style.bcolor),"inherit"===c.styles.textColor&&(a.styles.textColor=b.style.color),"inherit"===c.styles.fontStyle&&
(a.styles.fontStyle=b.style.fstyle))});"function"!==typeof c.drawHeaderCell&&(c.drawHeaderCell=function(a,b){var c=g.columns[b.column.dataKey];return(!0!==c.style.hasOwnProperty("hidden")||!0!==c.style.hidden)&&0<=c.rowIndex?wa(a,b,c):!1});"function"!==typeof c.drawCell&&(c.drawCell=function(a,b){var c=g.teCells[b.row.index+":"+b.column.dataKey];if(!0!==("undefined"!==typeof c&&c.isCanvas))wa(a,b,c)&&(g.doc.rect(a.x,a.y,a.width,a.height,a.styles.fillStyle),"undefined"===typeof c||"undefined"!==typeof c.hasUserDefText&&
!0===c.hasUserDefText||"undefined"===typeof c.elements||!c.elements.length?Aa(a,{},g):(b=a.height/c.rect.height,b>g.hScaleFactor&&(g.hScaleFactor=b),g.wScaleFactor=a.width/c.rect.width,b=a.textPos.y,za(a,c.elements,g),a.textPos.y=b,Aa(a,c.elements,g)));else{c=c.elements[0];var e=d(c).attr("data-tableexport-canvas"),f=c.getBoundingClientRect();a.width=f.width*g.wScaleFactor;a.height=f.height*g.hScaleFactor;b.row.height=a.height;ua(a,c,e,g)}return!1});g.headerrows=[];r=y(d(this));d(r).each(function(){b=
0;g.headerrows[p]=[];E(this,"th,td",p,r.length,function(a,c,d){var e=Ca(a);e.title=D(a,c,d);e.key=b++;e.rowIndex=p;g.headerrows[p].push(e)});p++});if(0<p)for(var e=p-1;0<=e;)d.each(g.headerrows[e],function(){var a=this;0<e&&null===this.rect&&(a=g.headerrows[e-1][this.key]);null!==a&&0<=a.rowIndex&&(!0!==a.style.hasOwnProperty("hidden")||!0!==a.style.hidden)&&g.columns.push(a)}),e=0<g.columns.length?-1:e-1;var k=0;w=[];w=C(d(this));d(w).each(function(){var a=[];b=0;E(this,"td,th",p,r.length+w.length,
function(c,e,f){if("undefined"===typeof g.columns[b]){var h={title:"",key:b,style:{hidden:!0}};g.columns.push(h)}a.push(D(c,e,f));"undefined"!==typeof c&&null!==c?(h=Ca(c),h.isCanvas=c.hasAttribute("data-tableexport-canvas"),h.elements=h.isCanvas?d(c):d(c).children(),"undefined"!==typeof d(c).data("teUserDefText")&&(h.hasUserDefText=!0)):(h=d.extend(!0,{},g.teCells[k+":"+(b-1)]),h.colspan=-1);g.teCells[k+":"+b++]=h});a.length&&(g.rows.push(a),k++);p++});if("function"===typeof g.onBeforeAutotable)g.onBeforeAutotable(d(this),
g.columns,g.rows,c);g.doc.autoTable(g.columns,g.rows,c);if("function"===typeof g.onAfterAutotable)g.onAfterAutotable(d(this),c);a.jspdf.autotable.startY=g.doc.autoTableEndPosY()+c.margin.top});va(g.doc,"undefined"!==typeof g.images&&!1===jQuery.isEmptyObject(g.images));"undefined"!==typeof g.headerrows&&(g.headerrows.length=0);"undefined"!==typeof g.columns&&(g.columns.length=0);"undefined"!==typeof g.rows&&(g.rows.length=0);delete g.doc;g.doc=null})}if("function"===typeof a.onTableExportEnd)a.onTableExportEnd();
return this}})(jQuery);

define("tableexport", ["jquery"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.$.fn.extend;
    };
}(this)));

!function(t){"use strict";var o=t.fn.bootstrapTable.utils.sprintf,e={json:"JSON",xml:"XML",png:"PNG",csv:"CSV",txt:"TXT",sql:"SQL",doc:"MS-Word",excel:"MS-Excel",xlsx:"MS-Excel (OpenXML)",powerpoint:"MS-Powerpoint",pdf:"PDF"};t.extend(t.fn.bootstrapTable.defaults,{showExport:!1,exportDataType:"basic",exportTypes:["json","xml","csv","txt","sql","excel"],exportOptions:{}}),t.extend(t.fn.bootstrapTable.defaults.icons,{export:"glyphicon-export icon-share"}),t.extend(t.fn.bootstrapTable.locales,{formatExport:function(){return"Export data"}}),t.extend(t.fn.bootstrapTable.defaults,t.fn.bootstrapTable.locales);var s=t.fn.bootstrapTable.Constructor,i=s.prototype.initToolbar;s.prototype.initToolbar=function(){if(this.showToolbar=this.options.showExport,i.apply(this,Array.prototype.slice.apply(arguments)),this.options.showExport){var s=this,n=this.$toolbar.find(">.btn-group"),a=n.find("div.export");if(!a.length){var p=(a=t(['<div class="export btn-group">','<button class="btn'+o(" btn-%s",this.options.buttonsClass)+o(" btn-%s",this.options.iconSize)+' dropdown-toggle" aria-label="export type" title="'+this.options.formatExport()+'" data-toggle="dropdown" type="button">',o('<i class="%s %s"></i> ',this.options.iconsPrefix,this.options.icons.export),'<span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">',"</ul>","</div>"].join("")).appendTo(n)).find(".dropdown-menu"),l=this.options.exportTypes;if("string"==typeof this.options.exportTypes){var r=this.options.exportTypes.slice(1,-1).replace(/ /g,"").split(",");l=[],t.each(r,function(t,o){l.push(o.slice(1,-1))})}t.each(l,function(t,o){e.hasOwnProperty(o)&&p.append(['<li role="menuitem" data-type="'+o+'">','<a href="javascript:void(0)">',e[o],"</a>","</li>"].join(""))}),p.find("li").click(function(){var o=t(this).data("type"),e=function(){s.$el.tableExport(t.extend({},s.options.exportOptions,{type:o,escape:!1}))};if("all"===s.options.exportDataType&&s.options.pagination)s.$el.one("server"===s.options.sidePagination?"post-body.bs.table":"page-change.bs.table",function(){e(),s.togglePagination()}),s.togglePagination();else if("selected"===s.options.exportDataType){var i=s.getData(),n=s.getAllSelections();if("server"===s.options.sidePagination){(i={total:s.options.totalRows})[s.options.dataField]=s.getData();var a="function"==typeof require?require("table"):null;(n={total:s.options.totalRows})[s.options.dataField]=a&&s.options.maintainSelected?a.api.selecteddata(s.$el):s.getAllSelections()}s.load(n),e(),s.load(i)}else e()})}}}}(jQuery);

define("bootstrap-table-export", ["bootstrap-table","tableexport"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.$.fn.bootstrapTable.defaults;
    };
}(this)));

(function(factory){if(typeof define==="function"&&define.amd){define('dropzone',["jquery"],factory)}else{factory(jQuery)}})(function(jQuery){var module={exports:{}};"use strict";function _typeof(obj){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(obj){return typeof obj}}else{_typeof=function _typeof(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj}}return _typeof(obj)}function _possibleConstructorReturn(self,call){if(call&&(_typeof(call)==="object"||typeof call==="function")){return call}return _assertThisInitialized(self)}function _getPrototypeOf(o){_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)};return _getPrototypeOf(o)}function _assertThisInitialized(self){if(self===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function")}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:true,configurable:true}});if(superClass)_setPrototypeOf(subClass,superClass)}function _setPrototypeOf(o,p){_setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){o.__proto__=p;return o};return _setPrototypeOf(o,p)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}function _createClass(Constructor,protoProps,staticProps){if(protoProps)_defineProperties(Constructor.prototype,protoProps);if(staticProps)_defineProperties(Constructor,staticProps);return Constructor}var Emitter=function(){function Emitter(){_classCallCheck(this,Emitter)}_createClass(Emitter,[{key:"on",value:function on(event,fn){this._callbacks=this._callbacks||{};if(!this._callbacks[event]){this._callbacks[event]=[]}this._callbacks[event].push(fn);return this}},{key:"emit",value:function emit(event){this._callbacks=this._callbacks||{};var callbacks=this._callbacks[event];if(callbacks){for(var _len=arguments.length,args=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){args[_key-1]=arguments[_key]}var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=callbacks[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var callback=_step.value;callback.apply(this,args)}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator["return"]!=null){_iterator["return"]()}}finally{if(_didIteratorError){throw _iteratorError}}}}return this}},{key:"off",value:function off(event,fn){if(!this._callbacks||arguments.length===0){this._callbacks={};return this}var callbacks=this._callbacks[event];if(!callbacks){return this}if(arguments.length===1){delete this._callbacks[event];return this}for(var i=0;i<callbacks.length;i++){var callback=callbacks[i];if(callback===fn){callbacks.splice(i,1);break}}return this}}]);return Emitter}();var Dropzone=function(_Emitter){_inherits(Dropzone,_Emitter);_createClass(Dropzone,null,[{key:"initClass",value:function initClass(){this.prototype.Emitter=Emitter;this.prototype.events=["drop","dragstart","dragend","dragenter","dragover","dragleave","addedfile","addedfiles","removedfile","thumbnail","error","errormultiple","processing","processingmultiple","uploadprogress","totaluploadprogress","sending","sendingmultiple","success","successmultiple","canceled","canceledmultiple","complete","completemultiple","reset","maxfilesexceeded","maxfilesreached","queuecomplete"];this.prototype.defaultOptions={url:null,method:"post",withCredentials:false,timeout:3e4,parallelUploads:2,uploadMultiple:false,chunking:false,forceChunking:false,chunkSize:2e6,parallelChunkUploads:false,retryChunks:false,retryChunksLimit:3,maxFilesize:256,paramName:"file",createImageThumbnails:true,maxThumbnailFilesize:10,thumbnailWidth:120,thumbnailHeight:120,thumbnailMethod:"crop",resizeWidth:null,resizeHeight:null,resizeMimeType:null,resizeQuality:.8,resizeMethod:"contain",filesizeBase:1e3,maxFiles:null,headers:null,clickable:true,ignoreHiddenFiles:true,acceptedFiles:null,acceptedMimeTypes:null,autoProcessQueue:true,autoQueue:true,addRemoveLinks:false,previewsContainer:null,hiddenInputContainer:"body",capture:null,renameFilename:null,renameFile:null,forceFallback:false,dictDefaultMessage:"Drop files here to upload",dictFallbackMessage:"Your browser does not support drag'n'drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",dictInvalidFileType:"You can't upload files of this type.",dictResponseError:"Server responded with {{statusCode}} code.",dictCancelUpload:"Cancel upload",dictUploadCanceled:"Upload canceled.",dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",dictRemoveFile:"Remove file",dictRemoveFileConfirmation:null,dictMaxFilesExceeded:"You can not upload any more files.",dictFileSizeUnits:{tb:"TB",gb:"GB",mb:"MB",kb:"KB",b:"b"},init:function init(){},params:function params(files,xhr,chunk){if(chunk){return{dzuuid:chunk.file.upload.uuid,dzchunkindex:chunk.index,dztotalfilesize:chunk.file.size,dzchunksize:this.options.chunkSize,dztotalchunkcount:chunk.file.upload.totalChunkCount,dzchunkbyteoffset:chunk.index*this.options.chunkSize}}},accept:function accept(file,done){return done()},chunkSuccess:function(chunk,file,response){},chunksUploaded:function chunksUploaded(file,done){done()},fallback:function fallback(){var messageElement;this.element.className="".concat(this.element.className," dz-browser-not-supported");var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=this.element.getElementsByTagName("div")[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var child=_step2.value;if(/(^| )dz-message($| )/.test(child.className)){messageElement=child;child.className="dz-message";break}}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2["return"]!=null){_iterator2["return"]()}}finally{if(_didIteratorError2){throw _iteratorError2}}}if(!messageElement){messageElement=Dropzone.createElement('<div class="dz-message"><span></span></div>');this.element.appendChild(messageElement)}var span=messageElement.getElementsByTagName("span")[0];if(span){if(span.textContent!=null){span.textContent=this.options.dictFallbackMessage}else if(span.innerText!=null){span.innerText=this.options.dictFallbackMessage}}return this.element.appendChild(this.getFallbackForm())},resize:function resize(file,width,height,resizeMethod){var info={srcX:0,srcY:0,srcWidth:file.width,srcHeight:file.height};var srcRatio=file.width/file.height;if(width==null&&height==null){width=info.srcWidth;height=info.srcHeight}else if(width==null){width=height*srcRatio}else if(height==null){height=width/srcRatio}width=Math.min(width,info.srcWidth);height=Math.min(height,info.srcHeight);var trgRatio=width/height;if(info.srcWidth>width||info.srcHeight>height){if(resizeMethod==="crop"){if(srcRatio>trgRatio){info.srcHeight=file.height;info.srcWidth=info.srcHeight*trgRatio}else{info.srcWidth=file.width;info.srcHeight=info.srcWidth/trgRatio}}else if(resizeMethod==="contain"){if(srcRatio>trgRatio){height=width/srcRatio}else{width=height*srcRatio}}else{throw new Error("Unknown resizeMethod '".concat(resizeMethod,"'"))}}info.srcX=(file.width-info.srcWidth)/2;info.srcY=(file.height-info.srcHeight)/2;info.trgWidth=width;info.trgHeight=height;return info},transformFile:function transformFile(file,done){if((this.options.resizeWidth||this.options.resizeHeight)&&file.type.match(/image.*/)){return this.resizeImage(file,this.options.resizeWidth,this.options.resizeHeight,this.options.resizeMethod,done)}else{return done(file)}},previewTemplate:'<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <title>Check</title>\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n      <title>Error</title>\n      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n        <g stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>',drop:function drop(e){return this.element.classList.remove("dz-drag-hover")},dragstart:function dragstart(e){},dragend:function dragend(e){return this.element.classList.remove("dz-drag-hover")},dragenter:function dragenter(e){return this.element.classList.add("dz-drag-hover")},dragover:function dragover(e){return this.element.classList.add("dz-drag-hover")},dragleave:function dragleave(e){return this.element.classList.remove("dz-drag-hover")},paste:function paste(e){},reset:function reset(){return this.element.classList.remove("dz-started")},addedfile:function addedfile(file){var _this2=this;if(this.element===this.previewsContainer){this.element.classList.add("dz-started")}if(this.previewsContainer){file.previewElement=Dropzone.createElement(this.options.previewTemplate.trim());file.previewTemplate=file.previewElement;this.previewsContainer.appendChild(file.previewElement);var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=file.previewElement.querySelectorAll("[data-dz-name]")[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var node=_step3.value;node.textContent=file.name}}catch(err){_didIteratorError3=true;_iteratorError3=err}finally{try{if(!_iteratorNormalCompletion3&&_iterator3["return"]!=null){_iterator3["return"]()}}finally{if(_didIteratorError3){throw _iteratorError3}}}var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=file.previewElement.querySelectorAll("[data-dz-size]")[Symbol.iterator](),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){node=_step4.value;node.innerHTML=this.filesize(file.size)}}catch(err){_didIteratorError4=true;_iteratorError4=err}finally{try{if(!_iteratorNormalCompletion4&&_iterator4["return"]!=null){_iterator4["return"]()}}finally{if(_didIteratorError4){throw _iteratorError4}}}if(this.options.addRemoveLinks){file._removeLink=Dropzone.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>'.concat(this.options.dictRemoveFile,"</a>"));file.previewElement.appendChild(file._removeLink)}var removeFileEvent=function removeFileEvent(e){e.preventDefault();e.stopPropagation();if(file.status===Dropzone.UPLOADING){return Dropzone.confirm(_this2.options.dictCancelUploadConfirmation,function(){return _this2.removeFile(file)})}else{if(_this2.options.dictRemoveFileConfirmation){return Dropzone.confirm(_this2.options.dictRemoveFileConfirmation,function(){return _this2.removeFile(file)})}else{return _this2.removeFile(file)}}};var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=file.previewElement.querySelectorAll("[data-dz-remove]")[Symbol.iterator](),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var removeLink=_step5.value;removeLink.addEventListener("click",removeFileEvent)}}catch(err){_didIteratorError5=true;_iteratorError5=err}finally{try{if(!_iteratorNormalCompletion5&&_iterator5["return"]!=null){_iterator5["return"]()}}finally{if(_didIteratorError5){throw _iteratorError5}}}}},removedfile:function removedfile(file){if(file.previewElement!=null&&file.previewElement.parentNode!=null){file.previewElement.parentNode.removeChild(file.previewElement)}return this._updateMaxFilesReachedClass()},thumbnail:function thumbnail(file,dataUrl){if(file.previewElement){file.previewElement.classList.remove("dz-file-preview");var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=file.previewElement.querySelectorAll("[data-dz-thumbnail]")[Symbol.iterator](),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var thumbnailElement=_step6.value;thumbnailElement.alt=file.name;thumbnailElement.src=dataUrl}}catch(err){_didIteratorError6=true;_iteratorError6=err}finally{try{if(!_iteratorNormalCompletion6&&_iterator6["return"]!=null){_iterator6["return"]()}}finally{if(_didIteratorError6){throw _iteratorError6}}}return setTimeout(function(){return file.previewElement.classList.add("dz-image-preview")},1)}},error:function error(file,message){if(file.previewElement){file.previewElement.classList.add("dz-error");if(typeof message!=="String"&&message.error){message=message.error}var _iteratorNormalCompletion7=true;var _didIteratorError7=false;var _iteratorError7=undefined;try{for(var _iterator7=file.previewElement.querySelectorAll("[data-dz-errormessage]")[Symbol.iterator](),_step7;!(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done);_iteratorNormalCompletion7=true){var node=_step7.value;node.textContent=message}}catch(err){_didIteratorError7=true;_iteratorError7=err}finally{try{if(!_iteratorNormalCompletion7&&_iterator7["return"]!=null){_iterator7["return"]()}}finally{if(_didIteratorError7){throw _iteratorError7}}}}},errormultiple:function errormultiple(){},processing:function processing(file){if(file.previewElement){file.previewElement.classList.add("dz-processing");if(file._removeLink){return file._removeLink.innerHTML=this.options.dictCancelUpload}}},processingmultiple:function processingmultiple(){},uploadprogress:function uploadprogress(file,progress,bytesSent){if(file.previewElement){var _iteratorNormalCompletion8=true;var _didIteratorError8=false;var _iteratorError8=undefined;try{for(var _iterator8=file.previewElement.querySelectorAll("[data-dz-uploadprogress]")[Symbol.iterator](),_step8;!(_iteratorNormalCompletion8=(_step8=_iterator8.next()).done);_iteratorNormalCompletion8=true){var node=_step8.value;node.nodeName==="PROGRESS"?node.value=progress:node.style.width="".concat(progress,"%")}}catch(err){_didIteratorError8=true;_iteratorError8=err}finally{try{if(!_iteratorNormalCompletion8&&_iterator8["return"]!=null){_iterator8["return"]()}}finally{if(_didIteratorError8){throw _iteratorError8}}}}},totaluploadprogress:function totaluploadprogress(){},sending:function sending(){},sendingmultiple:function sendingmultiple(){},success:function success(file){if(file.previewElement){return file.previewElement.classList.add("dz-success")}},successmultiple:function successmultiple(){},canceled:function canceled(file){return this.emit("error",file,this.options.dictUploadCanceled)},canceledmultiple:function canceledmultiple(){},complete:function complete(file){if(file._removeLink){file._removeLink.innerHTML=this.options.dictRemoveFile}if(file.previewElement){return file.previewElement.classList.add("dz-complete")}},completemultiple:function completemultiple(){},maxfilesexceeded:function maxfilesexceeded(){},maxfilesreached:function maxfilesreached(){},queuecomplete:function queuecomplete(){},addedfiles:function addedfiles(){}};this.prototype._thumbnailQueue=[];this.prototype._processingThumbnail=false}},{key:"extend",value:function extend(target){for(var _len2=arguments.length,objects=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){objects[_key2-1]=arguments[_key2]}for(var _i=0,_objects=objects;_i<_objects.length;_i++){var object=_objects[_i];for(var key in object){var val=object[key];target[key]=val}}return target}}]);function Dropzone(el,options){var _this;_classCallCheck(this,Dropzone);_this=_possibleConstructorReturn(this,_getPrototypeOf(Dropzone).call(this));var fallback,left;_this.element=el;_this.version=Dropzone.version;_this.defaultOptions.previewTemplate=_this.defaultOptions.previewTemplate.replace(/\n*/g,"");_this.clickableElements=[];_this.listeners=[];_this.files=[];if(typeof _this.element==="string"){_this.element=document.querySelector(_this.element)}if(!_this.element||_this.element.nodeType==null){throw new Error("Invalid dropzone element.")}if(_this.element.dropzone){throw new Error("Dropzone already attached.")}Dropzone.instances.push(_assertThisInitialized(_this));_this.element.dropzone=_assertThisInitialized(_this);var elementOptions=(left=Dropzone.optionsForElement(_this.element))!=null?left:{};_this.options=Dropzone.extend({},_this.defaultOptions,elementOptions,options!=null?options:{});if(_this.options.forceFallback||!Dropzone.isBrowserSupported()){return _possibleConstructorReturn(_this,_this.options.fallback.call(_assertThisInitialized(_this)))}if(_this.options.url==null){_this.options.url=_this.element.getAttribute("action")}if(!_this.options.url){throw new Error("No URL provided.")}if(_this.options.acceptedFiles&&_this.options.acceptedMimeTypes){throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.")}if(_this.options.uploadMultiple&&_this.options.chunking){throw new Error("You cannot set both: uploadMultiple and chunking.")}if(_this.options.acceptedMimeTypes){_this.options.acceptedFiles=_this.options.acceptedMimeTypes;delete _this.options.acceptedMimeTypes}if(_this.options.renameFilename!=null){_this.options.renameFile=function(file){return _this.options.renameFilename.call(_assertThisInitialized(_this),file.name,file)}}_this.options.method=typeof _this.options.method!=="function"?_this.options.method.toUpperCase():_this.options.method;if((fallback=_this.getExistingFallback())&&fallback.parentNode){fallback.parentNode.removeChild(fallback)}if(_this.options.previewsContainer!==false){if(_this.options.previewsContainer){_this.previewsContainer=Dropzone.getElement(_this.options.previewsContainer,"previewsContainer")}else{_this.previewsContainer=_this.element}}if(_this.options.clickable){if(_this.options.clickable===true){_this.clickableElements=[_this.element]}else{_this.clickableElements=Dropzone.getElements(_this.options.clickable,"clickable")}}_this.init();return _this}_createClass(Dropzone,[{key:"getAcceptedFiles",value:function getAcceptedFiles(){return this.files.filter(function(file){return file.accepted}).map(function(file){return file})}},{key:"getRejectedFiles",value:function getRejectedFiles(){return this.files.filter(function(file){return!file.accepted}).map(function(file){return file})}},{key:"getFilesWithStatus",value:function getFilesWithStatus(status){return this.files.filter(function(file){return file.status===status}).map(function(file){return file})}},{key:"getQueuedFiles",value:function getQueuedFiles(){return this.getFilesWithStatus(Dropzone.QUEUED)}},{key:"getUploadingFiles",value:function getUploadingFiles(){return this.getFilesWithStatus(Dropzone.UPLOADING)}},{key:"getAddedFiles",value:function getAddedFiles(){return this.getFilesWithStatus(Dropzone.ADDED)}},{key:"getActiveFiles",value:function getActiveFiles(){return this.files.filter(function(file){return file.status===Dropzone.UPLOADING||file.status===Dropzone.QUEUED}).map(function(file){return file})}},{key:"init",value:function init(){var _this3=this;if(this.element.tagName==="form"){this.element.setAttribute("enctype","multipart/form-data")}if(this.element.classList.contains("dropzone")&&!this.element.querySelector(".dz-message")){this.element.appendChild(Dropzone.createElement('<div class="dz-default dz-message"><button class="dz-button" type="button">'.concat(this.options.dictDefaultMessage,"</button></div>")))}if(this.clickableElements.length){var setupHiddenFileInput=function setupHiddenFileInput(){if(_this3.hiddenFileInput){_this3.hiddenFileInput.parentNode.removeChild(_this3.hiddenFileInput)}_this3.hiddenFileInput=document.createElement("input");_this3.hiddenFileInput.setAttribute("type","file");if(_this3.options.maxFiles===null||_this3.options.maxFiles>1){_this3.hiddenFileInput.setAttribute("multiple","multiple")}_this3.hiddenFileInput.className="dz-hidden-input";if(_this3.options.acceptedFiles!==null){_this3.hiddenFileInput.setAttribute("accept",_this3.options.acceptedFiles)}if(_this3.options.capture!==null){_this3.hiddenFileInput.setAttribute("capture",_this3.options.capture)}_this3.hiddenFileInput.style.visibility="hidden";_this3.hiddenFileInput.style.position="absolute";_this3.hiddenFileInput.style.top="0";_this3.hiddenFileInput.style.left="0";_this3.hiddenFileInput.style.height="0";_this3.hiddenFileInput.style.width="0";Dropzone.getElement(_this3.options.hiddenInputContainer,"hiddenInputContainer").appendChild(_this3.hiddenFileInput);return _this3.hiddenFileInput.addEventListener("change",function(){var files=_this3.hiddenFileInput.files;if(files.length){var _iteratorNormalCompletion9=true;var _didIteratorError9=false;var _iteratorError9=undefined;try{for(var _iterator9=files[Symbol.iterator](),_step9;!(_iteratorNormalCompletion9=(_step9=_iterator9.next()).done);_iteratorNormalCompletion9=true){var file=_step9.value;_this3.addFile(file)}}catch(err){_didIteratorError9=true;_iteratorError9=err}finally{try{if(!_iteratorNormalCompletion9&&_iterator9["return"]!=null){_iterator9["return"]()}}finally{if(_didIteratorError9){throw _iteratorError9}}}}_this3.emit("addedfiles",files);return setupHiddenFileInput()})};setupHiddenFileInput()}this.URL=window.URL!==null?window.URL:window.webkitURL;var _iteratorNormalCompletion10=true;var _didIteratorError10=false;var _iteratorError10=undefined;try{for(var _iterator10=this.events[Symbol.iterator](),_step10;!(_iteratorNormalCompletion10=(_step10=_iterator10.next()).done);_iteratorNormalCompletion10=true){var eventName=_step10.value;this.on(eventName,this.options[eventName])}}catch(err){_didIteratorError10=true;_iteratorError10=err}finally{try{if(!_iteratorNormalCompletion10&&_iterator10["return"]!=null){_iterator10["return"]()}}finally{if(_didIteratorError10){throw _iteratorError10}}}this.on("uploadprogress",function(){return _this3.updateTotalUploadProgress()});this.on("removedfile",function(){return _this3.updateTotalUploadProgress()});this.on("canceled",function(file){return _this3.emit("complete",file)});this.on("complete",function(file){if(_this3.getAddedFiles().length===0&&_this3.getUploadingFiles().length===0&&_this3.getQueuedFiles().length===0){return setTimeout(function(){return _this3.emit("queuecomplete")},0)}});var containsFiles=function containsFiles(e){return e.dataTransfer.types&&e.dataTransfer.types.some(function(type){return type=="Files"})};var noPropagation=function noPropagation(e){if(!containsFiles(e))return;e.stopPropagation();if(e.preventDefault){return e.preventDefault()}else{return e.returnValue=false}};this.listeners=[{element:this.element,events:{dragstart:function dragstart(e){return _this3.emit("dragstart",e)},dragenter:function dragenter(e){noPropagation(e);return _this3.emit("dragenter",e)},dragover:function dragover(e){var efct;try{efct=e.dataTransfer.effectAllowed}catch(error){}e.dataTransfer.dropEffect="move"===efct||"linkMove"===efct?"move":"copy";noPropagation(e);return _this3.emit("dragover",e)},dragleave:function dragleave(e){return _this3.emit("dragleave",e)},drop:function drop(e){noPropagation(e);return _this3.drop(e)},dragend:function dragend(e){return _this3.emit("dragend",e)}}}];this.clickableElements.forEach(function(clickableElement){return _this3.listeners.push({element:clickableElement,events:{click:function click(evt){if(clickableElement!==_this3.element||evt.target===_this3.element||Dropzone.elementInside(evt.target,_this3.element.querySelector(".dz-message"))){_this3.hiddenFileInput.click()}return true}}})});this.enable();return this.options.init.call(this)}},{key:"destroy",value:function destroy(){this.disable();this.removeAllFiles(true);if(this.hiddenFileInput!=null?this.hiddenFileInput.parentNode:undefined){this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput);this.hiddenFileInput=null}delete this.element.dropzone;return Dropzone.instances.splice(Dropzone.instances.indexOf(this),1)}},{key:"updateTotalUploadProgress",value:function updateTotalUploadProgress(){var totalUploadProgress;var totalBytesSent=0;var totalBytes=0;var activeFiles=this.getActiveFiles();if(activeFiles.length){var _iteratorNormalCompletion11=true;var _didIteratorError11=false;var _iteratorError11=undefined;try{for(var _iterator11=this.getActiveFiles()[Symbol.iterator](),_step11;!(_iteratorNormalCompletion11=(_step11=_iterator11.next()).done);_iteratorNormalCompletion11=true){var file=_step11.value;totalBytesSent+=file.upload.bytesSent;totalBytes+=file.upload.total}}catch(err){_didIteratorError11=true;_iteratorError11=err}finally{try{if(!_iteratorNormalCompletion11&&_iterator11["return"]!=null){_iterator11["return"]()}}finally{if(_didIteratorError11){throw _iteratorError11}}}totalUploadProgress=100*totalBytesSent/totalBytes}else{totalUploadProgress=100}return this.emit("totaluploadprogress",totalUploadProgress,totalBytes,totalBytesSent)}},{key:"_getParamName",value:function _getParamName(n){if(typeof this.options.paramName==="function"){return this.options.paramName(n)}else{return"".concat(this.options.paramName).concat(this.options.uploadMultiple?"[".concat(n,"]"):"")}}},{key:"_renameFile",value:function _renameFile(file){if(typeof this.options.renameFile!=="function"){return file.name}return this.options.renameFile(file)}},{key:"getFallbackForm",value:function getFallbackForm(){var existingFallback,form;if(existingFallback=this.getExistingFallback()){return existingFallback}var fieldsString='<div class="dz-fallback">';if(this.options.dictFallbackText){fieldsString+="<p>".concat(this.options.dictFallbackText,"</p>")}fieldsString+='<input type="file" name="'.concat(this._getParamName(0),'" ').concat(this.options.uploadMultiple?'multiple="multiple"':undefined,' /><input type="submit" value="Upload!"></div>');var fields=Dropzone.createElement(fieldsString);if(this.element.tagName!=="FORM"){form=Dropzone.createElement('<form action="'.concat(this.options.url,'" enctype="multipart/form-data" method="').concat(this.options.method,'"></form>'));form.appendChild(fields)}else{this.element.setAttribute("enctype","multipart/form-data");this.element.setAttribute("method",this.options.method)}return form!=null?form:fields}},{key:"getExistingFallback",value:function getExistingFallback(){var getFallback=function getFallback(elements){var _iteratorNormalCompletion12=true;var _didIteratorError12=false;var _iteratorError12=undefined;try{for(var _iterator12=elements[Symbol.iterator](),_step12;!(_iteratorNormalCompletion12=(_step12=_iterator12.next()).done);_iteratorNormalCompletion12=true){var el=_step12.value;if(/(^| )fallback($| )/.test(el.className)){return el}}}catch(err){_didIteratorError12=true;_iteratorError12=err}finally{try{if(!_iteratorNormalCompletion12&&_iterator12["return"]!=null){_iterator12["return"]()}}finally{if(_didIteratorError12){throw _iteratorError12}}}};for(var _i2=0,_arr=["div","form"];_i2<_arr.length;_i2++){var tagName=_arr[_i2];var fallback;if(fallback=getFallback(this.element.getElementsByTagName(tagName))){return fallback}}}},{key:"setupEventListeners",value:function setupEventListeners(){return this.listeners.map(function(elementListeners){return function(){var result=[];for(var event in elementListeners.events){var listener=elementListeners.events[event];result.push(elementListeners.element.addEventListener(event,listener,false))}return result}()})}},{key:"removeEventListeners",value:function removeEventListeners(){return this.listeners.map(function(elementListeners){return function(){var result=[];for(var event in elementListeners.events){var listener=elementListeners.events[event];result.push(elementListeners.element.removeEventListener(event,listener,false))}return result}()})}},{key:"disable",value:function disable(){var _this4=this;this.clickableElements.forEach(function(element){return element.classList.remove("dz-clickable")});this.removeEventListeners();this.disabled=true;return this.files.map(function(file){return _this4.cancelUpload(file)})}},{key:"enable",value:function enable(){delete this.disabled;this.clickableElements.forEach(function(element){return element.classList.add("dz-clickable")});return this.setupEventListeners()}},{key:"filesize",value:function filesize(size){var selectedSize=0;var selectedUnit="b";if(size>0){var units=["tb","gb","mb","kb","b"];for(var i=0;i<units.length;i++){var unit=units[i];var cutoff=Math.pow(this.options.filesizeBase,4-i)/10;if(size>=cutoff){selectedSize=size/Math.pow(this.options.filesizeBase,4-i);selectedUnit=unit;break}}selectedSize=Math.round(10*selectedSize)/10}return"<strong>".concat(selectedSize,"</strong> ").concat(this.options.dictFileSizeUnits[selectedUnit])}},{key:"_updateMaxFilesReachedClass",value:function _updateMaxFilesReachedClass(){if(this.options.maxFiles!=null&&this.getAcceptedFiles().length>=this.options.maxFiles){if(this.getAcceptedFiles().length===this.options.maxFiles){this.emit("maxfilesreached",this.files)}return this.element.classList.add("dz-max-files-reached")}else{return this.element.classList.remove("dz-max-files-reached")}}},{key:"drop",value:function drop(e){if(!e.dataTransfer){return}this.emit("drop",e);var files=[];for(var i=0;i<e.dataTransfer.files.length;i++){files[i]=e.dataTransfer.files[i]}if(files.length){var items=e.dataTransfer.items;if(items&&items.length&&items[0].webkitGetAsEntry!=null){this._addFilesFromItems(items)}else{this.handleFiles(files)}}this.emit("addedfiles",files)}},{key:"paste",value:function paste(e){if(__guard__(e!=null?e.clipboardData:undefined,function(x){return x.items})==null){return}this.emit("paste",e);var items=e.clipboardData.items;if(items.length){return this._addFilesFromItems(items)}}},{key:"handleFiles",value:function handleFiles(files){var _iteratorNormalCompletion13=true;var _didIteratorError13=false;var _iteratorError13=undefined;try{for(var _iterator13=files[Symbol.iterator](),_step13;!(_iteratorNormalCompletion13=(_step13=_iterator13.next()).done);_iteratorNormalCompletion13=true){var file=_step13.value;this.addFile(file)}}catch(err){_didIteratorError13=true;_iteratorError13=err}finally{try{if(!_iteratorNormalCompletion13&&_iterator13["return"]!=null){_iterator13["return"]()}}finally{if(_didIteratorError13){throw _iteratorError13}}}}},{key:"_addFilesFromItems",value:function _addFilesFromItems(items){var _this5=this;return function(){var result=[];var _iteratorNormalCompletion14=true;var _didIteratorError14=false;var _iteratorError14=undefined;try{for(var _iterator14=items[Symbol.iterator](),_step14;!(_iteratorNormalCompletion14=(_step14=_iterator14.next()).done);_iteratorNormalCompletion14=true){var item=_step14.value;var entry;if(item.webkitGetAsEntry!=null&&(entry=item.webkitGetAsEntry())){if(entry.isFile){result.push(_this5.addFile(item.getAsFile()))}else if(entry.isDirectory){result.push(_this5._addFilesFromDirectory(entry,entry.name))}else{result.push(undefined)}}else if(item.getAsFile!=null){if(item.kind==null||item.kind==="file"){result.push(_this5.addFile(item.getAsFile()))}else{result.push(undefined)}}else{result.push(undefined)}}}catch(err){_didIteratorError14=true;_iteratorError14=err}finally{try{if(!_iteratorNormalCompletion14&&_iterator14["return"]!=null){_iterator14["return"]()}}finally{if(_didIteratorError14){throw _iteratorError14}}}return result}()}},{key:"_addFilesFromDirectory",value:function _addFilesFromDirectory(directory,path){var _this6=this;var dirReader=directory.createReader();var errorHandler=function errorHandler(error){return __guardMethod__(console,"log",function(o){return o.log(error)})};var readEntries=function readEntries(){return dirReader.readEntries(function(entries){if(entries.length>0){var _iteratorNormalCompletion15=true;var _didIteratorError15=false;var _iteratorError15=undefined;try{for(var _iterator15=entries[Symbol.iterator](),_step15;!(_iteratorNormalCompletion15=(_step15=_iterator15.next()).done);_iteratorNormalCompletion15=true){var entry=_step15.value;if(entry.isFile){entry.file(function(file){if(_this6.options.ignoreHiddenFiles&&file.name.substring(0,1)==="."){return}file.fullPath="".concat(path,"/").concat(file.name);return _this6.addFile(file)})}else if(entry.isDirectory){_this6._addFilesFromDirectory(entry,"".concat(path,"/").concat(entry.name))}}}catch(err){_didIteratorError15=true;_iteratorError15=err}finally{try{if(!_iteratorNormalCompletion15&&_iterator15["return"]!=null){_iterator15["return"]()}}finally{if(_didIteratorError15){throw _iteratorError15}}}readEntries()}return null},errorHandler)};return readEntries()}},{key:"accept",value:function accept(file,done){if(this.options.maxFilesize&&file.size>this.options.maxFilesize*1024*1024){done(this.options.dictFileTooBig.replace("{{filesize}}",Math.round(file.size/1024/10.24)/100).replace("{{maxFilesize}}",this.options.maxFilesize))}else if(!Dropzone.isValidFile(file,this.options.acceptedFiles)){done(this.options.dictInvalidFileType)}else if(this.options.maxFiles!=null&&this.getAcceptedFiles().length>=this.options.maxFiles){done(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}",this.options.maxFiles));this.emit("maxfilesexceeded",file)}else{this.options.accept.call(this,file,done)}}},{key:"addFile",value:function addFile(file){var _this7=this;file.upload={uuid:Dropzone.uuidv4(),progress:0,total:file.size,bytesSent:0,filename:this._renameFile(file)};this.files.push(file);file.status=Dropzone.ADDED;this.emit("addedfile",file);this._enqueueThumbnail(file);this.accept(file,function(error){if(error){file.accepted=false;_this7._errorProcessing([file],error)}else{file.accepted=true;if(_this7.options.autoQueue){_this7.enqueueFile(file)}}_this7._updateMaxFilesReachedClass()})}},{key:"enqueueFiles",value:function enqueueFiles(files){var _iteratorNormalCompletion16=true;var _didIteratorError16=false;var _iteratorError16=undefined;try{for(var _iterator16=files[Symbol.iterator](),_step16;!(_iteratorNormalCompletion16=(_step16=_iterator16.next()).done);_iteratorNormalCompletion16=true){var file=_step16.value;this.enqueueFile(file)}}catch(err){_didIteratorError16=true;_iteratorError16=err}finally{try{if(!_iteratorNormalCompletion16&&_iterator16["return"]!=null){_iterator16["return"]()}}finally{if(_didIteratorError16){throw _iteratorError16}}}return null}},{key:"enqueueFile",value:function enqueueFile(file){var _this8=this;if(file.status===Dropzone.ADDED&&file.accepted===true){file.status=Dropzone.QUEUED;if(this.options.autoProcessQueue){return setTimeout(function(){return _this8.processQueue()},0)}}else{throw new Error("This file can't be queued because it has already been processed or was rejected.")}}},{key:"_enqueueThumbnail",value:function _enqueueThumbnail(file){var _this9=this;if(this.options.createImageThumbnails&&file.type.match(/image.*/)&&file.size<=this.options.maxThumbnailFilesize*1024*1024){this._thumbnailQueue.push(file);return setTimeout(function(){return _this9._processThumbnailQueue()},0)}}},{key:"_processThumbnailQueue",value:function _processThumbnailQueue(){var _this10=this;if(this._processingThumbnail||this._thumbnailQueue.length===0){return}this._processingThumbnail=true;var file=this._thumbnailQueue.shift();return this.createThumbnail(file,this.options.thumbnailWidth,this.options.thumbnailHeight,this.options.thumbnailMethod,true,function(dataUrl){_this10.emit("thumbnail",file,dataUrl);_this10._processingThumbnail=false;return _this10._processThumbnailQueue()})}},{key:"removeFile",value:function removeFile(file){if(file.status===Dropzone.UPLOADING){this.cancelUpload(file)}this.files=without(this.files,file);this.emit("removedfile",file);if(this.files.length===0){return this.emit("reset")}}},{key:"removeAllFiles",value:function removeAllFiles(cancelIfNecessary){if(cancelIfNecessary==null){cancelIfNecessary=false}var _iteratorNormalCompletion17=true;var _didIteratorError17=false;var _iteratorError17=undefined;try{for(var _iterator17=this.files.slice()[Symbol.iterator](),_step17;!(_iteratorNormalCompletion17=(_step17=_iterator17.next()).done);_iteratorNormalCompletion17=true){var file=_step17.value;if(file.status!==Dropzone.UPLOADING||cancelIfNecessary){this.removeFile(file)}}}catch(err){_didIteratorError17=true;_iteratorError17=err}finally{try{if(!_iteratorNormalCompletion17&&_iterator17["return"]!=null){_iterator17["return"]()}}finally{if(_didIteratorError17){throw _iteratorError17}}}return null}},{key:"resizeImage",value:function resizeImage(file,width,height,resizeMethod,callback){var _this11=this;return this.createThumbnail(file,width,height,resizeMethod,true,function(dataUrl,canvas){if(canvas==null){return callback(file)}else{var resizeMimeType=_this11.options.resizeMimeType;if(resizeMimeType==null){resizeMimeType=file.type}var resizedDataURL=canvas.toDataURL(resizeMimeType,_this11.options.resizeQuality);if(resizeMimeType==="image/jpeg"||resizeMimeType==="image/jpg"){resizedDataURL=ExifRestore.restore(file.dataURL,resizedDataURL)}return callback(Dropzone.dataURItoBlob(resizedDataURL))}})}},{key:"createThumbnail",value:function createThumbnail(file,width,height,resizeMethod,fixOrientation,callback){var _this12=this;var fileReader=new FileReader;fileReader.onload=function(){file.dataURL=fileReader.result;if(file.type==="image/svg+xml"){if(callback!=null){callback(fileReader.result)}return}_this12.createThumbnailFromUrl(file,width,height,resizeMethod,fixOrientation,callback)};fileReader.readAsDataURL(file)}},{key:"displayExistingFile",value:function displayExistingFile(mockFile,imageUrl,callback,crossOrigin){var _this13=this;var resizeThumbnail=arguments.length>4&&arguments[4]!==undefined?arguments[4]:true;this.emit("addedfile",mockFile);this.emit("complete",mockFile);if(!resizeThumbnail){this.emit("thumbnail",mockFile,imageUrl);if(callback)callback()}else{var onDone=function onDone(thumbnail){_this13.emit("thumbnail",mockFile,thumbnail);if(callback)callback()};mockFile.dataURL=imageUrl;this.createThumbnailFromUrl(mockFile,this.options.thumbnailWidth,this.options.thumbnailHeight,this.options.resizeMethod,this.options.fixOrientation,onDone,crossOrigin)}}},{key:"createThumbnailFromUrl",value:function createThumbnailFromUrl(file,width,height,resizeMethod,fixOrientation,callback,crossOrigin){var _this14=this;var img=document.createElement("img");if(crossOrigin){img.crossOrigin=crossOrigin}img.onload=function(){var loadExif=function loadExif(callback){return callback(1)};if(typeof EXIF!=="undefined"&&EXIF!==null&&fixOrientation){loadExif=function loadExif(callback){return EXIF.getData(img,function(){return callback(EXIF.getTag(this,"Orientation"))})}}return loadExif(function(orientation){file.width=img.width;file.height=img.height;var resizeInfo=_this14.options.resize.call(_this14,file,width,height,resizeMethod);var canvas=document.createElement("canvas");var ctx=canvas.getContext("2d");canvas.width=resizeInfo.trgWidth;canvas.height=resizeInfo.trgHeight;if(orientation>4){canvas.width=resizeInfo.trgHeight;canvas.height=resizeInfo.trgWidth}switch(orientation){case 2:ctx.translate(canvas.width,0);ctx.scale(-1,1);break;case 3:ctx.translate(canvas.width,canvas.height);ctx.rotate(Math.PI);break;case 4:ctx.translate(0,canvas.height);ctx.scale(1,-1);break;case 5:ctx.rotate(.5*Math.PI);ctx.scale(1,-1);break;case 6:ctx.rotate(.5*Math.PI);ctx.translate(0,-canvas.width);break;case 7:ctx.rotate(.5*Math.PI);ctx.translate(canvas.height,-canvas.width);ctx.scale(-1,1);break;case 8:ctx.rotate(-.5*Math.PI);ctx.translate(-canvas.height,0);break}drawImageIOSFix(ctx,img,resizeInfo.srcX!=null?resizeInfo.srcX:0,resizeInfo.srcY!=null?resizeInfo.srcY:0,resizeInfo.srcWidth,resizeInfo.srcHeight,resizeInfo.trgX!=null?resizeInfo.trgX:0,resizeInfo.trgY!=null?resizeInfo.trgY:0,resizeInfo.trgWidth,resizeInfo.trgHeight);var thumbnail=canvas.toDataURL("image/png");if(callback!=null){return callback(thumbnail,canvas)}})};if(callback!=null){img.onerror=callback}return img.src=file.dataURL}},{key:"processQueue",value:function processQueue(){var parallelUploads=this.options.parallelUploads;var processingLength=this.getUploadingFiles().length;var i=processingLength;if(processingLength>=parallelUploads){return}var queuedFiles=this.getQueuedFiles();if(!(queuedFiles.length>0)){return}if(this.options.uploadMultiple){return this.processFiles(queuedFiles.slice(0,parallelUploads-processingLength))}else{while(i<parallelUploads){if(!queuedFiles.length){return}this.processFile(queuedFiles.shift());i++}}}},{key:"processFile",value:function processFile(file){return this.processFiles([file])}},{key:"processFiles",value:function processFiles(files){var _iteratorNormalCompletion18=true;var _didIteratorError18=false;var _iteratorError18=undefined;try{for(var _iterator18=files[Symbol.iterator](),_step18;!(_iteratorNormalCompletion18=(_step18=_iterator18.next()).done);_iteratorNormalCompletion18=true){var file=_step18.value;file.processing=true;file.status=Dropzone.UPLOADING;this.emit("processing",file)}}catch(err){_didIteratorError18=true;_iteratorError18=err}finally{try{if(!_iteratorNormalCompletion18&&_iterator18["return"]!=null){_iterator18["return"]()}}finally{if(_didIteratorError18){throw _iteratorError18}}}if(this.options.uploadMultiple){this.emit("processingmultiple",files)}return this.uploadFiles(files)}},{key:"_getFilesWithXhr",value:function _getFilesWithXhr(xhr){var files;return files=this.files.filter(function(file){return file.xhr===xhr}).map(function(file){return file})}},{key:"cancelUpload",value:function cancelUpload(file){if(file.status===Dropzone.UPLOADING){var groupedFiles=this._getFilesWithXhr(file.xhr);var _iteratorNormalCompletion19=true;var _didIteratorError19=false;var _iteratorError19=undefined;try{for(var _iterator19=groupedFiles[Symbol.iterator](),_step19;!(_iteratorNormalCompletion19=(_step19=_iterator19.next()).done);_iteratorNormalCompletion19=true){var groupedFile=_step19.value;groupedFile.status=Dropzone.CANCELED}}catch(err){_didIteratorError19=true;_iteratorError19=err}finally{try{if(!_iteratorNormalCompletion19&&_iterator19["return"]!=null){_iterator19["return"]()}}finally{if(_didIteratorError19){throw _iteratorError19}}}if(typeof file.xhr!=="undefined"){file.xhr.abort()}var _iteratorNormalCompletion20=true;var _didIteratorError20=false;var _iteratorError20=undefined;try{for(var _iterator20=groupedFiles[Symbol.iterator](),_step20;!(_iteratorNormalCompletion20=(_step20=_iterator20.next()).done);_iteratorNormalCompletion20=true){var _groupedFile=_step20.value;this.emit("canceled",_groupedFile)}}catch(err){_didIteratorError20=true;_iteratorError20=err}finally{try{if(!_iteratorNormalCompletion20&&_iterator20["return"]!=null){_iterator20["return"]()}}finally{if(_didIteratorError20){throw _iteratorError20}}}if(this.options.uploadMultiple){this.emit("canceledmultiple",groupedFiles)}}else if(file.status===Dropzone.ADDED||file.status===Dropzone.QUEUED){file.status=Dropzone.CANCELED;this.emit("canceled",file);if(this.options.uploadMultiple){this.emit("canceledmultiple",[file])}}if(this.options.autoProcessQueue){return this.processQueue()}}},{key:"resolveOption",value:function resolveOption(option){if(typeof option==="function"){for(var _len3=arguments.length,args=new Array(_len3>1?_len3-1:0),_key3=1;_key3<_len3;_key3++){args[_key3-1]=arguments[_key3]}return option.apply(this,args)}return option}},{key:"uploadFile",value:function uploadFile(file){return this.uploadFiles([file])}},{key:"uploadFiles",value:function uploadFiles(files){var _this15=this;this._transformFiles(files,function(transformedFiles){if(_this15.options.chunking){var transformedFile=transformedFiles[0];files[0].upload.chunked=_this15.options.chunking&&(_this15.options.forceChunking||transformedFile.size>_this15.options.chunkSize);files[0].upload.totalChunkCount=Math.ceil(transformedFile.size/_this15.options.chunkSize)}if(files[0].upload.chunked){var file=files[0];var _transformedFile=transformedFiles[0];var startedChunkCount=0;file.upload.chunks=[];var handleNextChunk=function handleNextChunk(){var chunkIndex=0;while(file.upload.chunks[chunkIndex]!==undefined){chunkIndex++}if(chunkIndex>=file.upload.totalChunkCount)return;startedChunkCount++;var start=chunkIndex*_this15.options.chunkSize;var end=Math.min(start+_this15.options.chunkSize,file.size);var dataBlock={name:_this15._getParamName(0),data:_transformedFile.webkitSlice?_transformedFile.webkitSlice(start,end):_transformedFile.slice(start,end),filename:file.upload.filename,chunkIndex:chunkIndex};file.upload.chunks[chunkIndex]={file:file,index:chunkIndex,dataBlock:dataBlock,status:Dropzone.UPLOADING,progress:0,retries:0};_this15._uploadData(files,[dataBlock])};file.upload.finishedChunkUpload=function(chunk,response){var allFinished=true;chunk.status=Dropzone.SUCCESS;_this15.options.chunkSuccess.call(_this15,chunk,file,response);chunk.dataBlock=null;chunk.xhr=null;for(var i=0;i<file.upload.totalChunkCount;i++){if(file.upload.chunks[i]===undefined){return handleNextChunk()}if(file.upload.chunks[i].status!==Dropzone.SUCCESS){allFinished=false}}if(allFinished){_this15.options.chunksUploaded.call(_this15,file,function(response){_this15._finished(files,response||"",null)})}};if(_this15.options.parallelChunkUploads){for(var i=0;i<file.upload.totalChunkCount;i++){handleNextChunk()}}else{handleNextChunk()}}else{var dataBlocks=[];for(var _i3=0;_i3<files.length;_i3++){dataBlocks[_i3]={name:_this15._getParamName(_i3),data:transformedFiles[_i3],filename:files[_i3].upload.filename}}_this15._uploadData(files,dataBlocks)}})}},{key:"_getChunk",value:function _getChunk(file,xhr){for(var i=0;i<file.upload.totalChunkCount;i++){if(file.upload.chunks[i]!==undefined&&file.upload.chunks[i].xhr===xhr){return file.upload.chunks[i]}}}},{key:"_uploadData",value:function _uploadData(files,dataBlocks){var _this16=this;var xhr=new XMLHttpRequest;var _iteratorNormalCompletion21=true;var _didIteratorError21=false;var _iteratorError21=undefined;try{for(var _iterator21=files[Symbol.iterator](),_step21;!(_iteratorNormalCompletion21=(_step21=_iterator21.next()).done);_iteratorNormalCompletion21=true){var file=_step21.value;file.xhr=xhr}}catch(err){_didIteratorError21=true;_iteratorError21=err}finally{try{if(!_iteratorNormalCompletion21&&_iterator21["return"]!=null){_iterator21["return"]()}}finally{if(_didIteratorError21){throw _iteratorError21}}}if(files[0].upload.chunked){files[0].upload.chunks[dataBlocks[0].chunkIndex].xhr=xhr}var method=this.resolveOption(this.options.method,files);var url=this.resolveOption(this.options.url,files);xhr.open(method,url,true);xhr.timeout=this.resolveOption(this.options.timeout,files);xhr.withCredentials=!!this.options.withCredentials;xhr.onload=function(e){_this16._finishedUploading(files,xhr,e)};xhr.ontimeout=function(){_this16._handleUploadError(files,xhr,"Request timedout after ".concat(_this16.options.timeout," seconds"))};xhr.onerror=function(){_this16._handleUploadError(files,xhr)};var progressObj=xhr.upload!=null?xhr.upload:xhr;progressObj.onprogress=function(e){return _this16._updateFilesUploadProgress(files,xhr,e)};var headers={Accept:"application/json","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"};if(this.options.headers){Dropzone.extend(headers,this.options.headers)}for(var headerName in headers){var headerValue=headers[headerName];if(headerValue){xhr.setRequestHeader(headerName,headerValue)}}var formData=new FormData;if(this.options.params){var additionalParams=this.options.params;if(typeof additionalParams==="function"){additionalParams=additionalParams.call(this,files,xhr,files[0].upload.chunked?this._getChunk(files[0],xhr):null)}for(var key in additionalParams){var value=additionalParams[key];formData.append(key,value)}}var _iteratorNormalCompletion22=true;var _didIteratorError22=false;var _iteratorError22=undefined;try{for(var _iterator22=files[Symbol.iterator](),_step22;!(_iteratorNormalCompletion22=(_step22=_iterator22.next()).done);_iteratorNormalCompletion22=true){var _file=_step22.value;this.emit("sending",_file,xhr,formData)}}catch(err){_didIteratorError22=true;_iteratorError22=err}finally{try{if(!_iteratorNormalCompletion22&&_iterator22["return"]!=null){_iterator22["return"]()}}finally{if(_didIteratorError22){throw _iteratorError22}}}if(this.options.uploadMultiple){this.emit("sendingmultiple",files,xhr,formData)}this._addFormElementData(formData);for(var i=0;i<dataBlocks.length;i++){var dataBlock=dataBlocks[i];formData.append(dataBlock.name,dataBlock.data,dataBlock.filename)}this.submitRequest(xhr,formData,files)}},{key:"_transformFiles",value:function _transformFiles(files,done){var _this17=this;var transformedFiles=[];var doneCounter=0;var _loop=function _loop(i){_this17.options.transformFile.call(_this17,files[i],function(transformedFile){transformedFiles[i]=transformedFile;if(++doneCounter===files.length){done(transformedFiles)}})};for(var i=0;i<files.length;i++){_loop(i)}}},{key:"_addFormElementData",value:function _addFormElementData(formData){if(this.element.tagName==="FORM"){var _iteratorNormalCompletion23=true;var _didIteratorError23=false;var _iteratorError23=undefined;try{for(var _iterator23=this.element.querySelectorAll("input, textarea, select, button")[Symbol.iterator](),_step23;!(_iteratorNormalCompletion23=(_step23=_iterator23.next()).done);_iteratorNormalCompletion23=true){var input=_step23.value;var inputName=input.getAttribute("name");var inputType=input.getAttribute("type");if(inputType)inputType=inputType.toLowerCase();if(typeof inputName==="undefined"||inputName===null)continue;if(input.tagName==="SELECT"&&input.hasAttribute("multiple")){var _iteratorNormalCompletion24=true;var _didIteratorError24=false;var _iteratorError24=undefined;try{for(var _iterator24=input.options[Symbol.iterator](),_step24;!(_iteratorNormalCompletion24=(_step24=_iterator24.next()).done);_iteratorNormalCompletion24=true){var option=_step24.value;if(option.selected){formData.append(inputName,option.value)}}}catch(err){_didIteratorError24=true;_iteratorError24=err}finally{try{if(!_iteratorNormalCompletion24&&_iterator24["return"]!=null){_iterator24["return"]()}}finally{if(_didIteratorError24){throw _iteratorError24}}}}else if(!inputType||inputType!=="checkbox"&&inputType!=="radio"||input.checked){formData.append(inputName,input.value)}}}catch(err){_didIteratorError23=true;_iteratorError23=err}finally{try{if(!_iteratorNormalCompletion23&&_iterator23["return"]!=null){_iterator23["return"]()}}finally{if(_didIteratorError23){throw _iteratorError23}}}}}},{key:"_updateFilesUploadProgress",value:function _updateFilesUploadProgress(files,xhr,e){var progress;if(typeof e!=="undefined"){progress=100*e.loaded/e.total;if(files[0].upload.chunked){var file=files[0];var chunk=this._getChunk(file,xhr);chunk.progress=progress;chunk.total=e.total;chunk.bytesSent=e.loaded;var fileProgress=0,fileTotal,fileBytesSent;file.upload.progress=0;file.upload.total=0;file.upload.bytesSent=0;for(var i=0;i<file.upload.totalChunkCount;i++){if(file.upload.chunks[i]!==undefined&&file.upload.chunks[i].progress!==undefined){file.upload.progress+=file.upload.chunks[i].progress;file.upload.total+=file.upload.chunks[i].total;file.upload.bytesSent+=file.upload.chunks[i].bytesSent}}file.upload.progress=file.upload.progress/file.upload.totalChunkCount}else{var _iteratorNormalCompletion25=true;var _didIteratorError25=false;var _iteratorError25=undefined;try{for(var _iterator25=files[Symbol.iterator](),_step25;!(_iteratorNormalCompletion25=(_step25=_iterator25.next()).done);_iteratorNormalCompletion25=true){var _file2=_step25.value;_file2.upload.progress=progress;_file2.upload.total=e.total;_file2.upload.bytesSent=e.loaded}}catch(err){_didIteratorError25=true;_iteratorError25=err}finally{try{if(!_iteratorNormalCompletion25&&_iterator25["return"]!=null){_iterator25["return"]()}}finally{if(_didIteratorError25){throw _iteratorError25}}}}var _iteratorNormalCompletion26=true;var _didIteratorError26=false;var _iteratorError26=undefined;try{for(var _iterator26=files[Symbol.iterator](),_step26;!(_iteratorNormalCompletion26=(_step26=_iterator26.next()).done);_iteratorNormalCompletion26=true){var _file3=_step26.value;this.emit("uploadprogress",_file3,_file3.upload.progress,_file3.upload.bytesSent)}}catch(err){_didIteratorError26=true;_iteratorError26=err}finally{try{if(!_iteratorNormalCompletion26&&_iterator26["return"]!=null){_iterator26["return"]()}}finally{if(_didIteratorError26){throw _iteratorError26}}}}else{var allFilesFinished=true;progress=100;var _iteratorNormalCompletion27=true;var _didIteratorError27=false;var _iteratorError27=undefined;try{for(var _iterator27=files[Symbol.iterator](),_step27;!(_iteratorNormalCompletion27=(_step27=_iterator27.next()).done);_iteratorNormalCompletion27=true){var _file4=_step27.value;if(_file4.upload.progress!==100||_file4.upload.bytesSent!==_file4.upload.total){allFilesFinished=false}_file4.upload.progress=progress;_file4.upload.bytesSent=_file4.upload.total}}catch(err){_didIteratorError27=true;_iteratorError27=err}finally{try{if(!_iteratorNormalCompletion27&&_iterator27["return"]!=null){_iterator27["return"]()}}finally{if(_didIteratorError27){throw _iteratorError27}}}if(allFilesFinished){return}var _iteratorNormalCompletion28=true;var _didIteratorError28=false;var _iteratorError28=undefined;try{for(var _iterator28=files[Symbol.iterator](),_step28;!(_iteratorNormalCompletion28=(_step28=_iterator28.next()).done);_iteratorNormalCompletion28=true){var _file5=_step28.value;this.emit("uploadprogress",_file5,progress,_file5.upload.bytesSent)}}catch(err){_didIteratorError28=true;_iteratorError28=err}finally{try{if(!_iteratorNormalCompletion28&&_iterator28["return"]!=null){_iterator28["return"]()}}finally{if(_didIteratorError28){throw _iteratorError28}}}}}},{key:"_finishedUploading",value:function _finishedUploading(files,xhr,e){var response;if(files[0].status===Dropzone.CANCELED){return}if(xhr.readyState!==4){return}if(xhr.responseType!=="arraybuffer"&&xhr.responseType!=="blob"){response=xhr.responseText;if(xhr.getResponseHeader("content-type")&&~xhr.getResponseHeader("content-type").indexOf("application/json")){try{response=JSON.parse(response)}catch(error){e=error;response="Invalid JSON response from server."}}}this._updateFilesUploadProgress(files);if(!(200<=xhr.status&&xhr.status<300)){this._handleUploadError(files,xhr,response)}else{if(files[0].upload.chunked){files[0].upload.finishedChunkUpload(this._getChunk(files[0],xhr),response)}else{this._finished(files,response,e)}}}},{key:"_handleUploadError",value:function _handleUploadError(files,xhr,response){if(files[0].status===Dropzone.CANCELED){return}if(files[0].upload.chunked&&this.options.retryChunks){var chunk=this._getChunk(files[0],xhr);if(chunk.retries++<this.options.retryChunksLimit){this._uploadData(files,[chunk.dataBlock]);return}else{console.warn("Retried this chunk too often. Giving up.")}}this._errorProcessing(files,response||this.options.dictResponseError.replace("{{statusCode}}",xhr.status),xhr)}},{key:"submitRequest",value:function submitRequest(xhr,formData,files){xhr.send(formData)}},{key:"_finished",value:function _finished(files,responseText,e){var _iteratorNormalCompletion29=true;var _didIteratorError29=false;var _iteratorError29=undefined;try{for(var _iterator29=files[Symbol.iterator](),_step29;!(_iteratorNormalCompletion29=(_step29=_iterator29.next()).done);_iteratorNormalCompletion29=true){var file=_step29.value;file.status=Dropzone.SUCCESS;this.emit("success",file,responseText,e);this.emit("complete",file)}}catch(err){_didIteratorError29=true;_iteratorError29=err}finally{try{if(!_iteratorNormalCompletion29&&_iterator29["return"]!=null){_iterator29["return"]()}}finally{if(_didIteratorError29){throw _iteratorError29}}}if(this.options.uploadMultiple){this.emit("successmultiple",files,responseText,e);this.emit("completemultiple",files)}if(this.options.autoProcessQueue){return this.processQueue()}}},{key:"_errorProcessing",value:function _errorProcessing(files,message,xhr){var _iteratorNormalCompletion30=true;var _didIteratorError30=false;var _iteratorError30=undefined;try{for(var _iterator30=files[Symbol.iterator](),_step30;!(_iteratorNormalCompletion30=(_step30=_iterator30.next()).done);_iteratorNormalCompletion30=true){var file=_step30.value;file.status=Dropzone.ERROR;this.emit("error",file,message,xhr);this.emit("complete",file)}}catch(err){_didIteratorError30=true;_iteratorError30=err}finally{try{if(!_iteratorNormalCompletion30&&_iterator30["return"]!=null){_iterator30["return"]()}}finally{if(_didIteratorError30){throw _iteratorError30}}}if(this.options.uploadMultiple){this.emit("errormultiple",files,message,xhr);this.emit("completemultiple",files)}if(this.options.autoProcessQueue){return this.processQueue()}}}],[{key:"uuidv4",value:function uuidv4(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(c){var r=Math.random()*16|0,v=c==="x"?r:r&3|8;return v.toString(16)})}}]);return Dropzone}(Emitter);Dropzone.initClass();Dropzone.version="5.7.0";Dropzone.options={};Dropzone.optionsForElement=function(element){if(element.getAttribute("id")){return Dropzone.options[camelize(element.getAttribute("id"))]}else{return undefined}};Dropzone.instances=[];Dropzone.forElement=function(element){if(typeof element==="string"){element=document.querySelector(element)}if((element!=null?element.dropzone:undefined)==null){throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.")}return element.dropzone};Dropzone.autoDiscover=true;Dropzone.discover=function(){var dropzones;if(document.querySelectorAll){dropzones=document.querySelectorAll(".dropzone")}else{dropzones=[];var checkElements=function checkElements(elements){return function(){var result=[];var _iteratorNormalCompletion31=true;var _didIteratorError31=false;var _iteratorError31=undefined;try{for(var _iterator31=elements[Symbol.iterator](),_step31;!(_iteratorNormalCompletion31=(_step31=_iterator31.next()).done);_iteratorNormalCompletion31=true){var el=_step31.value;if(/(^| )dropzone($| )/.test(el.className)){result.push(dropzones.push(el))}else{result.push(undefined)}}}catch(err){_didIteratorError31=true;_iteratorError31=err}finally{try{if(!_iteratorNormalCompletion31&&_iterator31["return"]!=null){_iterator31["return"]()}}finally{if(_didIteratorError31){throw _iteratorError31}}}return result}()};checkElements(document.getElementsByTagName("div"));checkElements(document.getElementsByTagName("form"))}return function(){var result=[];var _iteratorNormalCompletion32=true;var _didIteratorError32=false;var _iteratorError32=undefined;try{for(var _iterator32=dropzones[Symbol.iterator](),_step32;!(_iteratorNormalCompletion32=(_step32=_iterator32.next()).done);_iteratorNormalCompletion32=true){var dropzone=_step32.value;if(Dropzone.optionsForElement(dropzone)!==false){result.push(new Dropzone(dropzone))}else{result.push(undefined)}}}catch(err){_didIteratorError32=true;_iteratorError32=err}finally{try{if(!_iteratorNormalCompletion32&&_iterator32["return"]!=null){_iterator32["return"]()}}finally{if(_didIteratorError32){throw _iteratorError32}}}return result}()};Dropzone.blacklistedBrowsers=[/opera.*(Macintosh|Windows Phone).*version\/12/i];Dropzone.isBrowserSupported=function(){var capableBrowser=true;if(window.File&&window.FileReader&&window.FileList&&window.Blob&&window.FormData&&document.querySelector){if(!("classList"in document.createElement("a"))){capableBrowser=false}else{var _iteratorNormalCompletion33=true;var _didIteratorError33=false;var _iteratorError33=undefined;try{for(var _iterator33=Dropzone.blacklistedBrowsers[Symbol.iterator](),_step33;!(_iteratorNormalCompletion33=(_step33=_iterator33.next()).done);_iteratorNormalCompletion33=true){var regex=_step33.value;if(regex.test(navigator.userAgent)){capableBrowser=false;continue}}}catch(err){_didIteratorError33=true;_iteratorError33=err}finally{try{if(!_iteratorNormalCompletion33&&_iterator33["return"]!=null){_iterator33["return"]()}}finally{if(_didIteratorError33){throw _iteratorError33}}}}}else{capableBrowser=false}return capableBrowser};Dropzone.dataURItoBlob=function(dataURI){var byteString=atob(dataURI.split(",")[1]);var mimeString=dataURI.split(",")[0].split(":")[1].split(";")[0];var ab=new ArrayBuffer(byteString.length);var ia=new Uint8Array(ab);for(var i=0,end=byteString.length,asc=0<=end;asc?i<=end:i>=end;asc?i++:i--){ia[i]=byteString.charCodeAt(i)}return new Blob([ab],{type:mimeString})};var without=function without(list,rejectedItem){return list.filter(function(item){return item!==rejectedItem}).map(function(item){return item})};var camelize=function camelize(str){return str.replace(/[\-_](\w)/g,function(match){return match.charAt(1).toUpperCase()})};Dropzone.createElement=function(string){var div=document.createElement("div");div.innerHTML=string;return div.childNodes[0]};Dropzone.elementInside=function(element,container){if(element===container){return true}while(element=element.parentNode){if(element===container){return true}}return false};Dropzone.getElement=function(el,name){var element;if(typeof el==="string"){element=document.querySelector(el)}else if(el.nodeType!=null){element=el}if(element==null){throw new Error("Invalid `".concat(name,"` option provided. Please provide a CSS selector or a plain HTML element."))}return element};Dropzone.getElements=function(els,name){var el,elements;if(els instanceof Array){elements=[];try{var _iteratorNormalCompletion34=true;var _didIteratorError34=false;var _iteratorError34=undefined;try{for(var _iterator34=els[Symbol.iterator](),_step34;!(_iteratorNormalCompletion34=(_step34=_iterator34.next()).done);_iteratorNormalCompletion34=true){el=_step34.value;elements.push(this.getElement(el,name))}}catch(err){_didIteratorError34=true;_iteratorError34=err}finally{try{if(!_iteratorNormalCompletion34&&_iterator34["return"]!=null){_iterator34["return"]()}}finally{if(_didIteratorError34){throw _iteratorError34}}}}catch(e){elements=null}}else if(typeof els==="string"){elements=[];var _iteratorNormalCompletion35=true;var _didIteratorError35=false;var _iteratorError35=undefined;try{for(var _iterator35=document.querySelectorAll(els)[Symbol.iterator](),_step35;!(_iteratorNormalCompletion35=(_step35=_iterator35.next()).done);_iteratorNormalCompletion35=true){el=_step35.value;elements.push(el)}}catch(err){_didIteratorError35=true;_iteratorError35=err}finally{try{if(!_iteratorNormalCompletion35&&_iterator35["return"]!=null){_iterator35["return"]()}}finally{if(_didIteratorError35){throw _iteratorError35}}}}else if(els.nodeType!=null){elements=[els]}if(elements==null||!elements.length){throw new Error("Invalid `".concat(name,"` option provided. Please provide a CSS selector, a plain HTML element or a list of those."))}return elements};Dropzone.confirm=function(question,accepted,rejected){if(window.confirm(question)){return accepted()}else if(rejected!=null){return rejected()}};Dropzone.isValidFile=function(file,acceptedFiles){if(!acceptedFiles){return true}acceptedFiles=acceptedFiles.split(",");var mimeType=file.type;var baseMimeType=mimeType.replace(/\/.*$/,"");var _iteratorNormalCompletion36=true;var _didIteratorError36=false;var _iteratorError36=undefined;try{for(var _iterator36=acceptedFiles[Symbol.iterator](),_step36;!(_iteratorNormalCompletion36=(_step36=_iterator36.next()).done);_iteratorNormalCompletion36=true){var validType=_step36.value;validType=validType.trim();if(validType.charAt(0)==="."){if(file.name.toLowerCase().indexOf(validType.toLowerCase(),file.name.length-validType.length)!==-1){return true}}else if(/\/\*$/.test(validType)){if(baseMimeType===validType.replace(/\/.*$/,"")){return true}}else{if(mimeType===validType){return true}}}}catch(err){_didIteratorError36=true;_iteratorError36=err}finally{try{if(!_iteratorNormalCompletion36&&_iterator36["return"]!=null){_iterator36["return"]()}}finally{if(_didIteratorError36){throw _iteratorError36}}}return false};if(typeof jQuery!=="undefined"&&jQuery!==null){jQuery.fn.dropzone=function(options){return this.each(function(){return new Dropzone(this,options)})}}if(typeof module!=="undefined"&&module!==null){module.exports=Dropzone}else{window.Dropzone=Dropzone}Dropzone.ADDED="added";Dropzone.QUEUED="queued";Dropzone.ACCEPTED=Dropzone.QUEUED;Dropzone.UPLOADING="uploading";Dropzone.PROCESSING=Dropzone.UPLOADING;Dropzone.CANCELED="canceled";Dropzone.ERROR="error";Dropzone.SUCCESS="success";var detectVerticalSquash=function detectVerticalSquash(img){var iw=img.naturalWidth;var ih=img.naturalHeight;var canvas=document.createElement("canvas");canvas.width=1;canvas.height=ih;var ctx=canvas.getContext("2d");ctx.drawImage(img,0,0);var _ctx$getImageData=ctx.getImageData(1,0,1,ih),data=_ctx$getImageData.data;var sy=0;var ey=ih;var py=ih;while(py>sy){var alpha=data[(py-1)*4+3];if(alpha===0){ey=py}else{sy=py}py=ey+sy>>1}var ratio=py/ih;if(ratio===0){return 1}else{return ratio}};var drawImageIOSFix=function drawImageIOSFix(ctx,img,sx,sy,sw,sh,dx,dy,dw,dh){var vertSquashRatio=detectVerticalSquash(img);return ctx.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh/vertSquashRatio)};var ExifRestore=function(){function ExifRestore(){_classCallCheck(this,ExifRestore)}_createClass(ExifRestore,null,[{key:"initClass",value:function initClass(){this.KEY_STR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}},{key:"encode64",value:function encode64(input){var output="";var chr1=undefined;var chr2=undefined;var chr3="";var enc1=undefined;var enc2=undefined;var enc3=undefined;var enc4="";var i=0;while(true){chr1=input[i++];chr2=input[i++];chr3=input[i++];enc1=chr1>>2;enc2=(chr1&3)<<4|chr2>>4;enc3=(chr2&15)<<2|chr3>>6;enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64}else if(isNaN(chr3)){enc4=64}output=output+this.KEY_STR.charAt(enc1)+this.KEY_STR.charAt(enc2)+this.KEY_STR.charAt(enc3)+this.KEY_STR.charAt(enc4);chr1=chr2=chr3="";enc1=enc2=enc3=enc4="";if(!(i<input.length)){break}}return output}},{key:"restore",value:function restore(origFileBase64,resizedFileBase64){if(!origFileBase64.match("data:image/jpeg;base64,")){return resizedFileBase64}var rawImage=this.decode64(origFileBase64.replace("data:image/jpeg;base64,",""));var segments=this.slice2Segments(rawImage);var image=this.exifManipulation(resizedFileBase64,segments);return"data:image/jpeg;base64,".concat(this.encode64(image))}},{key:"exifManipulation",value:function exifManipulation(resizedFileBase64,segments){var exifArray=this.getExifArray(segments);var newImageArray=this.insertExif(resizedFileBase64,exifArray);var aBuffer=new Uint8Array(newImageArray);return aBuffer}},{key:"getExifArray",value:function getExifArray(segments){var seg=undefined;var x=0;while(x<segments.length){seg=segments[x];if(seg[0]===255&seg[1]===225){return seg}x++}return[]}},{key:"insertExif",value:function insertExif(resizedFileBase64,exifArray){var imageData=resizedFileBase64.replace("data:image/jpeg;base64,","");var buf=this.decode64(imageData);var separatePoint=buf.indexOf(255,3);var mae=buf.slice(0,separatePoint);var ato=buf.slice(separatePoint);var array=mae;array=array.concat(exifArray);array=array.concat(ato);return array}},{key:"slice2Segments",value:function slice2Segments(rawImageArray){var head=0;var segments=[];while(true){var length;if(rawImageArray[head]===255&rawImageArray[head+1]===218){break}if(rawImageArray[head]===255&rawImageArray[head+1]===216){head+=2}else{length=rawImageArray[head+2]*256+rawImageArray[head+3];var endPoint=head+length+2;var seg=rawImageArray.slice(head,endPoint);segments.push(seg);head=endPoint}if(head>rawImageArray.length){break}}return segments}},{key:"decode64",value:function decode64(input){var output="";var chr1=undefined;var chr2=undefined;var chr3="";var enc1=undefined;var enc2=undefined;var enc3=undefined;var enc4="";var i=0;var buf=[];var base64test=/[^A-Za-z0-9\+\/\=]/g;if(base64test.exec(input)){console.warn("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding.")}input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(true){enc1=this.KEY_STR.indexOf(input.charAt(i++));enc2=this.KEY_STR.indexOf(input.charAt(i++));enc3=this.KEY_STR.indexOf(input.charAt(i++));enc4=this.KEY_STR.indexOf(input.charAt(i++));chr1=enc1<<2|enc2>>4;chr2=(enc2&15)<<4|enc3>>2;chr3=(enc3&3)<<6|enc4;buf.push(chr1);if(enc3!==64){buf.push(chr2)}if(enc4!==64){buf.push(chr3)}chr1=chr2=chr3="";enc1=enc2=enc3=enc4="";if(!(i<input.length)){break}}return buf}}]);return ExifRestore}();ExifRestore.initClass();var contentLoaded=function contentLoaded(win,fn){var done=false;var top=true;var doc=win.document;var root=doc.documentElement;var add=doc.addEventListener?"addEventListener":"attachEvent";var rem=doc.addEventListener?"removeEventListener":"detachEvent";var pre=doc.addEventListener?"":"on";var init=function init(e){if(e.type==="readystatechange"&&doc.readyState!=="complete"){return}(e.type==="load"?win:doc)[rem](pre+e.type,init,false);if(!done&&(done=true)){return fn.call(win,e.type||e)}};var poll=function poll(){try{root.doScroll("left")}catch(e){setTimeout(poll,50);return}return init("poll")};if(doc.readyState!=="complete"){if(doc.createEventObject&&root.doScroll){try{top=!win.frameElement}catch(error){}if(top){poll()}}doc[add](pre+"DOMContentLoaded",init,false);doc[add](pre+"readystatechange",init,false);return win[add](pre+"load",init,false)}};Dropzone._autoDiscoverFunction=function(){if(Dropzone.autoDiscover){return Dropzone.discover()}};contentLoaded(window,Dropzone._autoDiscoverFunction);function __guard__(value,transform){return typeof value!=="undefined"&&value!==null?transform(value):undefined}function __guardMethod__(obj,methodName,transform){if(typeof obj!=="undefined"&&obj!==null&&typeof obj[methodName]==="function"){return transform(obj,methodName)}else{return undefined}}return module.exports});

define('upload',['jquery', 'bootstrap', 'dropzone', 'template'], function ($, undefined, Dropzone, Template) {
    var Upload = {
            list: {},
            options: {},
            config: {
                container: document.body,
                classname: '.plupload:not([initialized]),.faupload:not([initialized])',
                previewtpl: '<li class="col-xs-3"><a href="<%=fullurl%>" data-url="<%=url%>" target="_blank" class="thumbnail"><img src="<%=fullurl%>" onerror="this.src=\'' + Fast.api.fixurl("ajax/icon") + '?suffix=<%=suffix%>\';this.onerror=null;" class="img-responsive"></a><a href="javascript:;" class="btn btn-danger btn-xs btn-trash"><i class="fa fa-trash"></i></a></li>',
            },
            events: {
                //初始化
                onInit: function () {

                },
                //上传成功的回调
                onUploadSuccess: function (up, ret, file) {
                    var button = up.element;
                    var onUploadSuccess = up.options.onUploadSuccess;
                    var data = typeof ret.data !== 'undefined' ? ret.data : null;
                    //上传成功后回调
                    if (button) {
                        //如果有文本框则填充
                        var input_id = $(button).data("input-id") ? $(button).data("input-id") : "";
                        if (input_id) {
                            var urlArr = [];
                            var inputObj = $("#" + input_id);
                            if ($(button).data("multiple") && inputObj.val() !== "") {
                                urlArr.push(inputObj.val());
                            }
                            urlArr.push(data.url);
                            inputObj.val(urlArr.join(",")).trigger("change").trigger("validate");
                        }
                        //如果有回调函数
                        var onDomUploadSuccess = $(button).data("upload-success");
                        if (onDomUploadSuccess) {
                            if (typeof onDomUploadSuccess !== 'function' && typeof Upload.api.custom[onDomUploadSuccess] === 'function') {
                                onDomUploadSuccess = Upload.api.custom[onDomUploadSuccess];
                            }
                            if (typeof onDomUploadSuccess === 'function') {
                                var result = onDomUploadSuccess.call(button, data, ret);
                                if (result === false)
                                    return;
                            }
                        }
                    }

                    if (typeof onUploadSuccess === 'function') {
                        var result = onUploadSuccess.call(button, data, ret);
                        if (result === false)
                            return;
                    }
                },
                //上传错误的回调
                onUploadError: function (up, ret, file) {
                    var button = up.element;
                    var onUploadError = up.options.onUploadError;
                    var data = typeof ret.data !== 'undefined' ? ret.data : null;
                    if (button) {
                        var onDomUploadError = $(button).data("upload-error");
                        if (onDomUploadError) {
                            if (typeof onDomUploadError !== 'function' && typeof Upload.api.custom[onDomUploadError] === 'function') {
                                onDomUploadError = Upload.api.custom[onDomUploadError];
                            }
                            if (typeof onDomUploadError === 'function') {
                                var result = onDomUploadError.call(button, data, ret);
                                if (result === false)
                                    return;
                            }
                        }
                    }

                    if (typeof onUploadError === 'function') {
                        var result = onUploadError.call(button, data, ret);
                        if (result === false) {
                            return;
                        }
                    }
                    Toastr.error(ret.msg.toString().replace(/(<([^>]+)>)/gi, "") + "(code:" + ret.code + ")");
                },
                //服务器响应数据后
                onUploadResponse: function (response, up, file) {
                    try {
                        var ret = typeof response === 'object' ? response : JSON.parse(response);
                        if (!ret.hasOwnProperty('code')) {
                            $.extend(ret, {code: -2, msg: response, data: null});
                        }
                    } catch (e) {
                        var ret = {code: -1, msg: e.message, data: null};
                    }
                    return ret;
                },
                //上传全部结束后
                onUploadComplete: function (up, files) {
                    var button = up.element;
                    var onUploadComplete = up.options.onUploadComplete;
                    if (button) {
                        var onDomUploadComplete = $(button).data("upload-complete");
                        if (onDomUploadComplete) {
                            if (typeof onDomUploadComplete !== 'function' && typeof Upload.api.custom[onDomUploadComplete] === 'function') {
                                onDomUploadComplete = Upload.api.custom[onDomUploadComplete];
                            }
                            if (typeof onDomUploadComplete === 'function') {
                                var result = onDomUploadComplete.call(button, files);
                                if (result === false)
                                    return;
                            }
                        }
                    }

                    if (typeof onUploadComplete === 'function') {
                        var result = onUploadComplete.call(button, files);
                        if (result === false) {
                            return;
                        }
                    }
                }
            },
            api: {
                //上传接口
                upload: function (element, onUploadSuccess, onUploadError, onUploadComplete) {
                    element = typeof element === 'undefined' ? Upload.config.classname : element;
                    $(element, Upload.config.container).each(function () {
                        if ($(this).attr("initialized")) {
                            return true;
                        }
                        $(this).attr("initialized", true);
                        var that = this;
                        var id = $(this).prop("id") || $(this).prop("name") || Dropzone.uuidv4();
                        var url = $(this).data("url");
                        var maxsize = $(this).data("maxsize");
                        var maxcount = $(this).data("maxcount");
                        var mimetype = $(this).data("mimetype");
                        var multipart = $(this).data("multipart");
                        var multiple = $(this).data("multiple");

                        //填充ID
                        var input_id = $(that).data("input-id") ? $(that).data("input-id") : "";
                        //预览ID
                        var preview_id = $(that).data("preview-id") ? $(that).data("preview-id") : "";

                        //上传URL
                        url = url ? url : Config.upload.uploadurl;
                        url = Fast.api.fixurl(url);
                        var chunking = false, chunkSize = Config.upload.chunksize || 2097152, timeout = Config.upload.timeout || 600000;

                        //最大可上传文件大小
                        maxsize = typeof maxsize !== "undefined" ? maxsize : Config.upload.maxsize;
                        //文件类型
                        mimetype = typeof mimetype !== "undefined" ? mimetype : Config.upload.mimetype;
                        //请求的表单参数
                        multipart = typeof multipart !== "undefined" ? multipart : Config.upload.multipart;
                        //是否支持批量上传
                        multiple = typeof multiple !== "undefined" ? multiple : Config.upload.multiple;
                        //后缀特殊处理
                        mimetype = mimetype.split(",").map(function (k) {
                            return k.indexOf("/") > -1 ? k : (!k || k === "*" || k.charAt(0) === "." ? k : "." + k);
                        }).join(",");
                        mimetype = mimetype === '*' ? null : mimetype;

                        //最大文件限制转换成mb
                        var maxFilesize = (function (maxsize) {
                            var matches = maxsize.toString().match(/^([0-9\.]+)(\w+)$/);
                            var size = matches ? parseFloat(matches[1]) : parseFloat(maxsize),
                                unit = matches ? matches[2].toLowerCase() : 'b';
                            var unitDict = {'b': 0, 'k': 1, 'kb': 1, 'm': 2, 'mb': 2, 'gb': 3, 'g': 3, 'tb': 4, 't': 4};
                            var y = typeof unitDict[unit] !== 'undefined' ? unitDict[unit] : 0;
                            var bytes = size * Math.pow(1024, y);
                            return bytes / Math.pow(1024, 2);
                        }(maxsize));

                        var options = $(this).data() || {};
                        delete options.success;
                        delete options.url;
                        multipart = $.isArray(multipart) ? {} : multipart;

                        Upload.list[id] = new Dropzone(this, $.extend({
                            url: url,
                            params: function (files, xhr, chunk) {
                                var params = multipart;
                                if (chunk) {
                                    return $.extend({}, params, {
                                        filesize: chunk.file.size,
                                        filename: chunk.file.name,
                                        chunkid: chunk.file.upload.uuid,
                                        chunkindex: chunk.index,
                                        chunkcount: chunk.file.upload.totalChunkCount,
                                        chunksize: this.options.chunkSize,
                                        chunkfilesize: chunk.dataBlock.data.size,
                                        width: chunk.file.width || 0,
                                        height: chunk.file.height || 0,
                                        type: chunk.file.type,
                                    });
                                }
                                return params;
                            },
                            chunking: chunking,
                            chunkSize: chunkSize,
                            maxFilesize: maxFilesize,
                            acceptedFiles: mimetype,
                            maxFiles: (maxcount && parseInt(maxcount) > 1 ? maxcount : (multiple ? null : 1)),
                            timeout: timeout,
                            parallelUploads: 1,
                            previewsContainer: false,
                            dictDefaultMessage: __("Drop files here to upload"),
                            dictFallbackMessage: __("Your browser does not support drag'n'drop file uploads"),
                            dictFallbackText: __("Please use the fallback form below to upload your files like in the olden days"),
                            dictFileTooBig: __("File is too big (%sMiB), Max filesize: %sMiB", "{{filesize}}", "{{maxFilesize}}"),
                            dictInvalidFileType: __("You can't upload files of this type"),
                            dictResponseError: __("Server responded with %s code.", "{{statusCode}}"),
                            dictCancelUpload: __("Cancel upload"),
                            dictUploadCanceled: __("Upload canceled"),
                            dictCancelUploadConfirmation: __("Are you sure you want to cancel this upload?"),
                            dictRemoveFile: __("Remove file"),
                            dictMaxFilesExceeded: __("You can only upload a maximum of %s files", "{{maxFiles}}"),
                            init: function () {
                                Upload.events.onInit.call(this);
                                //必须添加dz-message，否则点击icon无法唤起上传窗口
                                $(">i", this.element).addClass("dz-message");
                                this.options.elementHtml = $(this.element).html();
                            },
                            addedfiles: function (files) {
                                if (this.options.maxFiles && (!this.options.maxFiles || this.options.maxFiles > 1) && this.options.inputId) {
                                    var inputObj = $("#" + this.options.inputId);
                                    if (inputObj.size() > 0) {
                                        var value = $.trim(inputObj.val());
                                        var nums = value === '' ? 0 : value.split(/\,/).length;
                                        var remain = this.options.maxFiles - nums;
                                        if (remain === 0 || files.length > remain) {
                                            files = Array.prototype.slice.call(files, remain);
                                            for (var i = 0; i < files.length; i++) {
                                                this.removeFile(files[i]);
                                            }
                                            Toastr.error(__("You can only upload a maximum of %s files", this.options.maxFiles));
                                        }
                                    }
                                }
                            },
                            success: function (file, response) {
                                var ret = Upload.events.onUploadResponse(response, this, file);
                                file.ret = ret;
                                if (ret.code === 1) {
                                    Upload.events.onUploadSuccess(this, ret, file);
                                } else {
                                    Upload.events.onUploadError(this, ret, file);
                                }
                            },
                            error: function (file, response, xhr) {
                                var responseObj = $("<div>" + (xhr && typeof xhr.responseText !== 'undefined' ? xhr.responseText : response) + "</div>");
                                responseObj.find("style, title, script").remove();
                                var ret = {code: 0, data: null, msg: responseObj.text()};
                                Upload.events.onUploadError(this, ret, file);
                            },
                            uploadprogress: function (file, progress, bytesSent) {

                            },
                            totaluploadprogress: function (progress, bytesSent) {
                                if (this.getActiveFiles().length > 0) {
                                    $(this.element).prop("disabled", true).html("<i class='fa fa-upload'></i> " + __('Upload') + Math.floor(progress) + "%");
                                }
                            },
                            queuecomplete: function () {
                                Upload.events.onUploadComplete(this, this.files);
                                this.removeAllFiles(true);
                                $(this.element).prop("disabled", false).html(this.options.elementHtml);
                            },
                            chunkSuccess: function (chunk, file, response) {
                            },
                            chunksUploaded: function (file, done) {
                                var that = this;
                                Fast.api.ajax({
                                    url: this.options.url,
                                    data: {
                                        action: 'merge',
                                        filesize: file.size,
                                        filename: file.name,
                                        chunkid: file.upload.uuid,
                                        chunkcount: file.upload.totalChunkCount,
                                    }
                                }, function (data, ret) {
                                    done(JSON.stringify(ret));
                                    return false;
                                }, function (data, ret) {
                                    file.accepted = false;
                                    that._errorProcessing([file], ret.msg);
                                });
                            },
                            onUploadSuccess: onUploadSuccess,
                            onUploadError: onUploadError,
                            onUploadComplete: onUploadComplete,
                        }, Upload.options, options));

                        //拖动排序
                        if (preview_id && multiple) {
                            require(['dragsort'], function () {
                                $("#" + preview_id).dragsort({
                                    dragSelector: "li a:not(.btn-trash)",
                                    dragEnd: function () {
                                        $("#" + preview_id).trigger("fa.preview.change");
                                    },
                                    placeHolderTemplate: '<li class="col-xs-3"></li>'
                                });
                            });
                        }
                        //刷新隐藏textarea的值
                        var refresh = function (name) {
                            var data = {};
                            var textarea = $("textarea[name='" + name + "']");
                            var container = textarea.prev("ul");
                            $.each($("input,select,textarea", container).serializeArray(), function (i, j) {
                                var reg = /\[?(\w+)\]?\[(\w+)\]$/g;
                                var match = reg.exec(j.name);
                                if (!match)
                                    return true;
                                if (!isNaN(match[2])) {
                                    data[i] = j.value;
                                } else {
                                    match[1] = "x" + parseInt(match[1]);
                                    if (typeof data[match[1]] === 'undefined') {
                                        data[match[1]] = {};
                                    }
                                    data[match[1]][match[2]] = j.value;
                                }
                            });
                            var result = [];
                            $.each(data, function (i, j) {
                                result.push(j);
                            });
                            textarea.val(JSON.stringify(result));
                        };
                        if (preview_id && input_id) {
                            $(document.body).on("keyup change", "#" + input_id, function (e) {
                                var inputStr = $("#" + input_id).val();
                                var inputArr = inputStr.split(/\,/);
                                $("#" + preview_id).empty();
                                var tpl = $("#" + preview_id).data("template") ? $("#" + preview_id).data("template") : "";
                                var extend = $("#" + preview_id).next().is("textarea") ? $("#" + preview_id).next("textarea").val() : "{}";
                                var json = {};
                                try {
                                    json = JSON.parse(extend);
                                } catch (e) {
                                }
                                $.each(inputArr, function (i, j) {
                                    if (!j) {
                                        return true;
                                    }
                                    var suffix = /[\.]?([a-zA-Z0-9]+)$/.exec(j);
                                    suffix = suffix ? suffix[1] : 'file';
                                    var value = (json && typeof json[i] !== 'undefined' ? json[i] : null);
                                    var data = {url: j, fullurl: Fast.api.cdnurl(j), data: $(that).data(), key: i, index: i, value: value, row: value, suffix: suffix};
                                    var html = tpl ? Template(tpl, data) : Template.render(Upload.config.previewtpl, data);
                                    $("#" + preview_id).append(html);
                                });
                                refresh($("#" + preview_id).data("name"));
                            });
                            $("#" + input_id).trigger("change");
                        }
                        if (preview_id) {
                            //监听文本框改变事件
                            $("#" + preview_id).on('change keyup', "input,textarea,select", function () {
                                refresh($(this).closest("ul").data("name"));
                            });
                            // 监听事件
                            $(document.body).on("fa.preview.change", "#" + preview_id, function () {
                                var urlArr = [];
                                $("#" + preview_id + " [data-url]").each(function (i, j) {
                                    urlArr.push($(this).data("url"));
                                });
                                if (input_id) {
                                    $("#" + input_id).val(urlArr.join(","));
                                }
                                refresh($("#" + preview_id).data("name"));
                            });
                            // 移除按钮事件
                            $(document.body).on("click", "#" + preview_id + " .btn-trash", function () {
                                $(this).closest("li").remove();
                                $("#" + preview_id).trigger("fa.preview.change");
                            });
                        }
                        if (input_id) {
                            //粘贴上传、拖拽上传
                            $("body").on('paste drop', "#" + input_id, function (event) {
                                var originEvent = event.originalEvent;
                                var button = $(".plupload[data-input-id='" + $(this).attr("id") + "'],.faupload[data-input-id='" + $(this).attr("id") + "']");
                                if (event.type === 'paste' && originEvent.clipboardData && originEvent.clipboardData.items) {
                                    var items = originEvent.clipboardData.items;
                                    if ((items.length === 1 && items[0].type.indexOf("text") > -1) || (items.length === 2 && items[1].type.indexOf("text") > -1)) {

                                    } else {
                                        Upload.list[button.attr("id")].paste(originEvent);
                                        return false;
                                    }
                                }
                                if (event.type === 'drop' && originEvent.dataTransfer && originEvent.dataTransfer.files) {
                                    Upload.list[button.attr("id")].drop(originEvent);
                                    return false;
                                }
                            });
                        }
                    });
                },
                /**
                 * @deprecated Use upload instead.
                 */
                plupload: function (element, onUploadSuccess, onUploadError, onUploadComplete) {
                    return Upload.api.upload(element, onUploadSuccess, onUploadError, onUploadComplete);
                },
                /**
                 * @deprecated Use upload instead.
                 */
                faupload: function (element, onUploadSuccess, onUploadError, onUploadComplete) {
                    return Upload.api.upload(element, onUploadSuccess, onUploadError, onUploadComplete);
                },
                // AJAX异步上传
                send: function (file, onUploadSuccess, onUploadError, onUploadComplete) {
                    var index = Layer.msg(__('Uploading'), {offset: 't', time: 0});
                    var id = "dropzone-" + Dropzone.uuidv4();
                    $('<button type="button" id="' + id + '" class="btn btn-danger hidden faupload" />').appendTo("body");
                    $("#" + id).data("upload-complete", function (files) {
                        Layer.close(index);
                        Upload.list[id].removeAllFiles(true);
                    });
                    Upload.api.upload("#" + id, onUploadSuccess, onUploadError, onUploadComplete);
                    setTimeout(function () {
                        Upload.list[id].addFile(file);
                    }, 1);
                },
                custom: {
                    //自定义上传完成回调
                    afteruploadcallback: function (response) {
                        console.log(this, response);
                        alert("Custom Callback,Response URL:" + response.url);
                    },
                }
            }
        }
    ;

    return Upload;
});

/*! nice-validator 1.1.5
 * (c) 2012-2020 Jony Zhang <niceue@live.com>, MIT Licensed
 * https://github.com/niceue/nice-validator
 */
;(function(factory) {
    typeof module === 'object' && module.exports ? module.exports = factory( require( 'jquery' ) ) :
    typeof define === 'function' && define.amd ? define('validator',['jquery'], factory) :
    factory(jQuery);
}(function($, undefined) {
    'use strict';

    var NS = 'validator',
        CLS_NS = '.' + NS,
        CLS_NS_RULE = '.rule',
        CLS_NS_FIELD = '.field',
        CLS_NS_FORM = '.form',
        CLS_WRAPPER = 'nice-' + NS,
        CLS_MSG_BOX = 'msg-box',
        ARIA_INVALID = 'aria-invalid',
        DATA_RULE = 'data-rule',
        DATA_MSG = 'data-msg',
        DATA_TIP = 'data-tip',
        DATA_OK = 'data-ok',
        DATA_TIMELY = 'data-timely',
        DATA_TARGET = 'data-target',
        DATA_DISPLAY = 'data-display',
        DATA_MUST = 'data-must',
        NOVALIDATE = 'novalidate',
        INPUT_SELECTOR = ':verifiable',

        rRules = /(&)?(!)?\b(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?\s*(;|\|)?/g,
        rRule = /(\w+)(?:\[\s*(.*?\]?)\s*\]|\(\s*(.*?\)?)\s*\))?/,
        rDisplay = /(?:([^:;\(\[]*):)?(.*)/,
        rDoubleBytes = /[^\x00-\xff]/g,
        rPos = /top|right|bottom|left/,
        rAjaxType = /(?:(cors|jsonp):)?(?:(post|get):)?(.+)/i,
        rUnsafe = /[<>'"`\\]|&#x?\d+[A-F]?;?|%3[A-F]/gmi,

        noop = $.noop,
        proxy = $.proxy,
        trim = $.trim,
        isFunction = $.isFunction,
        isString = function(s) {
            return typeof s === 'string';
        },
        isObject = function(o) {
            return o && Object.prototype.toString.call(o) === '[object Object]';
        },
        isIE = document.documentMode || +(navigator.userAgent.match(/MSIE (\d+)/) && RegExp.$1),
        attr = function(el, key, value) {
            if (!el || !el.tagName) return null;
            if (value !== undefined) {
                if (value === null) el.removeAttribute(key);
                else el.setAttribute(key, '' + value);
            } else {
                return el.getAttribute(key);
            }
        },
        novalidateonce,
        preinitialized = {},

        defaults = {
            debug: 0,
            theme: 'default',
            ignore: '',
            focusInvalid: true,
            focusCleanup: false,
            stopOnError: false,
            beforeSubmit: null,
            valid: null,
            invalid: null,
            validation: null,
            formClass: 'n-default',
            validClass: 'n-valid',
            invalidClass: 'n-invalid',
            bindClassTo: null
        },
        fieldDefaults = {
            timely: 1,
            display: null,
            target: null,
            ignoreBlank: false,
            showOk: true,
            // Translate ajax response to validation result
            dataFilter: function (data) {
                if ( isString(data) || ( isObject(data) && ('error' in data || 'ok' in data) ) ) {
                    return data;
                }
            },
            msgMaker: function(opt) {
                var html;
                html = '<span role="alert" class="msg-wrap n-'+ opt.type + '">' + opt.arrow;
                if (opt.result) {
                    $.each(opt.result, function(i, obj){
                        html += '<span class="n-'+ obj.type +'">' + opt.icon + '<span class="n-msg">' + obj.msg + '</span></span>';
                    });
                } else {
                    html += opt.icon + '<span class="n-msg">' + opt.msg + '</span>';
                }
                html += '</span>';
                return html;
            },
            msgWrapper: 'span',
            msgArrow: '',
            msgIcon: '<span class="n-icon"></span>',
            msgClass: 'n-right',
            msgStyle: '',
            msgShow: null,
            msgHide: null
        },
        themes = {};

    /** jQuery Plugin
     * @param {Object} options
        debug         {Boolean}     0               Whether to enable debug mode
        timely        {Number}      1               Whether to enable timely validation
        theme         {String}     'default'        Theme name
        stopOnError   {Boolean}     false           Whether to stop validate when found an error input
        focusCleanup  {Boolean}     false           Whether to clean up the field message when focus the field
        focusInvalid  {Boolean}     true            Whether to focus the field that is invalid
        ignoreBlank   {Boolean}     false           When the field has no value, whether to ignore validation
        ignore        {jqSelector}    ''            Ignored fields (Using jQuery selector)

        beforeSubmit  {Function}                    Do something before submit form
        dataFilter    {Function}                    Convert ajax results
        valid         {Function}                    Triggered when the form is valid
        invalid       {Function}                    Triggered when the form is invalid
        validClass    {String}      'n-valid'       Add this class name to a valid field
        invalidClass  {String}      'n-invalid'     Add this class name to a invalid field
        bindClassTo   {jqSelector}  ':verifiable'   Which element should the className binding to

        display       {Function}                    Callback function to get dynamic display
        target        {Function}                    Callback function to get dynamic target
        msgShow       {Function}                    Trigger this callback when show message
        msgHide       {Function}                    Trigger this callback when hide message
        msgWrapper    {String}      'span'          Message wrapper tag name
        msgMaker      {Function}                    Callback function to make message HTML
        msgArrow      {String}                      Message arrow template
        msgIcon       {String}                      Message icon template
        msgStyle      {String}                      Custom message css style
        msgClass      {String}                      Additional added to the message class names
        formClass     {String}                      Additional added to the form class names

        messages      {Object}                      Custom messages for the current instance
        rules         {Object}                      Custom rules for the current instance
        fields        {Object}                      Field validation configuration
        {String}        key    name|#id
        {String|Object} value                       Rule string or an object which can pass more arguments

        fields[key][rule]       {String}            Rule string
        fields[key][display]    {String|Function}
        fields[key][tip]        {String}            Custom tip message
        fields[key][ok]         {String}            Custom success message
        fields[key][msg]        {Object}            Custom error message
        fields[key][msgStyle]   {String}            Custom message style
        fields[key][msgClass]   {String}            A className which added to message placeholder element
        fields[key][msgWrapper] {String}            Tag name of the message placeholder element
        fields[key][msgMaker]   {Function}          A function to custom message HTML
        fields[key][dataFilter] {Function}          A function to convert ajax results
        fields[key][valid]      {Function}          A function triggered when field is valid
        fields[key][invalid]    {Function}          A function triggered when field is invalid
        fields[key][must]       {Boolean}           If set true, we always check the field even has remote checking
        fields[key][timely]     {Boolean}           Whether to enable timely validation
        fields[key][target]     {jqSelector}        Define placement of a message
     */
    $.fn.validator = function(options) {
        var that = this,
            args = arguments;

        if (that.is(INPUT_SELECTOR)) return that;
        if (!that.is('form')) that = this.find('form');
        if (!that.length) that = this;

        that.each(function() {
            var instance = $(this).data(NS);

            if (instance) {
                if ( isString(options) ) {
                    if ( options.charAt(0) === '_' ) return;
                    instance[options].apply(instance, [].slice.call(args, 1));
                }
                else if (options) {
                    instance._reset(true);
                    instance._init(this, options);
                }
            } else {
                new Validator(this, options);
            }
        });

        return this;
    };


    // Validate a field, or an area
    $.fn.isValid = function(callback, hideMsg) {
        var me = _getInstance(this[0]),
            hasCallback = isFunction(callback),
            ret, opt;

        if (!me) return true;
        if (!hasCallback && hideMsg === undefined) hideMsg = callback;
        me.checkOnly = !!hideMsg;
        opt = me.options;

        ret = me._multiValidate(
            this.is(INPUT_SELECTOR) ? this : this.find(INPUT_SELECTOR),
            function(isValid){
                if (!isValid && opt.focusInvalid && !me.checkOnly) {
                    // navigate to the error element
                    me.$el.find('[' + ARIA_INVALID + ']:first').focus();
                }
                if (hasCallback) {
                    if (callback.length) {
                        callback(isValid);
                    } else if (isValid) {
                        callback();
                    }
                }
                me.checkOnly = false;
            }
        );

        // If you pass a callback, we maintain the jQuery object chain
        return hasCallback ? this : ret;
    };

    $.extend($.expr.pseudos || $.expr[':'], {
        // A faster selector than ":input:not(:submit,:button,:reset,:image,:disabled,[contenteditable])"
        verifiable: function(elem) {
            var name = elem.nodeName.toLowerCase();

            return ( name === 'input' && !({submit: 1, button: 1, reset: 1, image: 1})[elem.type] ||
                     name === 'select' ||
                     name === 'textarea' ||
                     elem.contentEditable === 'true'
                    ) && !elem.disabled;
        },
        // any value, but not only whitespace
        filled: function(elem) {
            return !!trim($(elem).val());
        }
    });

    /**
     * Creates a new Validator
     *
     * @class
     * @param {Element} element - form element
     * @param {Object}  options - options for validator
     */
    function Validator(element, options) {
        var me = this;

        if ( !(me instanceof Validator) ) {
            return new Validator(element, options);
        }

        if (Validator.pending) {
            $(window).on('validatorready', init);
        } else {
            init();
        }

        function init() {
            me.$el = $(element);
            if (me.$el.length) {
                me._init(me.$el[0], options);
            }
            else if (isString(element)) {
                preinitialized[element] = options;
            }
        }
    }

    Validator.prototype = {
        _init: function(element, options) {
            var me = this,
                opt, themeOpt, dataOpt;

            // Initialization options
            if ( isFunction(options) ) {
                options = {
                    valid: options
                };
            }
            options = me._opt = options || {};
            dataOpt = attr(element, 'data-'+ NS +'-option');
            dataOpt = me._dataOpt = dataOpt && dataOpt.charAt(0) === '{' ? (new Function('return ' + dataOpt))() : {};
            themeOpt = me._themeOpt = themes[ options.theme || dataOpt.theme || defaults.theme ];
            opt = me.options = $.extend({}, defaults, fieldDefaults, themeOpt, me.options, options, dataOpt);

            me.rules = new Rules(opt.rules, true);
            me.messages = new Messages(opt.messages, true);
            me.Field = _createFieldFactory(me);
            me.elements = me.elements || {};
            me.deferred = {};
            me.errors = {};
            me.fields = {};
            // Initialization fields
            me._initFields(opt.fields);

            // Initialization events and make a cache
            if ( !me.$el.data(NS) ) {
                me.$el.data(NS, me).addClass(CLS_WRAPPER +' '+ opt.formClass)
                    .on('form-submit-validate', function(e, a, $form, opts, veto) {
                        me.vetoed = veto.veto = !me.isValid;
                        me.ajaxFormOptions = opts;
                    })
                    .on('submit'+ CLS_NS +' validate'+ CLS_NS, proxy(me, '_submit'))
                    .on('reset'+ CLS_NS, proxy(me, '_reset'))
                    .on('showmsg'+ CLS_NS, proxy(me, '_showmsg'))
                    .on('hidemsg'+ CLS_NS, proxy(me, '_hidemsg'))
                    .on('focusin'+ CLS_NS + ' click'+ CLS_NS, INPUT_SELECTOR, proxy(me, '_focusin'))
                    .on('focusout'+ CLS_NS +' validate'+ CLS_NS, INPUT_SELECTOR, proxy(me, '_focusout'))
                    .on('keyup'+ CLS_NS +' input'+ CLS_NS + ' compositionstart compositionend', INPUT_SELECTOR, proxy(me, '_focusout'))
                    .on('click'+ CLS_NS, ':radio,:checkbox', 'click', proxy(me, '_focusout'))
                    .on('change'+ CLS_NS, 'select,input[type="file"]', 'change', proxy(me, '_focusout'));

                // cache the novalidate attribute value
                me._NOVALIDATE = attr(element, NOVALIDATE);
                // Initialization is complete, stop off default HTML5 form validation
                // If use "jQuery.attr('novalidate')" in IE7 will complain: "SCRIPT3: Member not found."
                attr(element, NOVALIDATE, NOVALIDATE);
            }

            // Display all messages in target container
            if ( isString(opt.target) ) {
                me.$el.find(opt.target).addClass('msg-container');
            }
        },

        // Guess whether the form use ajax submit
        _guessAjax: function(form) {
            var me = this;

            if ( !(me.isAjaxSubmit = !!me.options.valid) ) {
                // if there is a "valid.form" event
                var events = ($._data || $.data)(form, 'events');
                me.isAjaxSubmit = issetEvent(events, 'valid', 'form') || issetEvent(events, 'submit', 'form-plugin');
            }

            function issetEvent(events, name, namespace) {
                return !!(
                    events && events[name]
                    && $.map(events[name], function(e){
                        return ~e.namespace.indexOf(namespace) ? 1 : null;
                    }).length )
            }
        },

        _initFields: function(fields) {
            var me = this, k, arr, i,
                clear = fields === null;

            // Processing field information
            if (clear) fields = me.fields;

            if ( isObject(fields) ) {
                for (k in fields) {
                    if (~k.indexOf(',')) {
                        arr = k.split(',');
                        i = arr.length;
                        while (i--) {
                            initField(trim(arr[i]), fields[k]);
                        }
                    } else {
                        initField(k, fields[k]);
                    }
                }
            }

            // Parsing DOM rules
            me.$el.find(INPUT_SELECTOR).each(function() {
                me._parse(this);
            });

            function initField(k, v) {
                // delete a field from settings
                if ( v === null || clear ) {
                    var el = me.elements[k];
                    if (el) me._resetElement(el, true);
                    delete me.fields[k];
                } else {
                    me.fields[k] = new me.Field(k, isString(v) ? {rule: v} : v, me.fields[k]);
                }
            }
        },

        // Parsing a field
        _parse: function(el) {
            var me = this,
                field,
                key = el.name,
                display,
                timely,
                dataRule = attr(el, DATA_RULE);

            dataRule && attr(el, DATA_RULE, null);

            // If the field has passed the key as id mode, or it doesn't has a name
            if ( el.id && (
                ('#' + el.id in me.fields) ||
                !key ||
                // If dataRule and element are diffrent from old's, we use ID mode.
                (dataRule !== null && (field = me.fields[key]) && dataRule !== field.rule && el.id !== field.key)
                )
            ) {
                key = '#' + el.id;
            }
            // Generate id
            if (!key) {
                key = '#' + (el.id = 'N' + String(Math.random()).slice(-12));
            }

            field = me.getField(key, true);
            // The priority of passing parameter by DOM is higher than by JS.
            field.rule = dataRule || field.rule;

            if (display = attr(el, DATA_DISPLAY)) {
                field.display = display;
            }
            if (field.rule) {
                if ( attr(el, DATA_MUST) !== null || /\b(?:match|checked)\b/.test(field.rule) ) {
                    field.must = true;
                }
                if ( /\brequired\b/.test(field.rule) ) {
                    field.required = true;
                }
                if (timely = attr(el, DATA_TIMELY)) {
                    field.timely = +timely;
                } else if (field.timely > 3) {
                    attr(el, DATA_TIMELY, field.timely);
                }
                me._parseRule(field);
                field.old = {};
            }
            if ( isString(field.target) ) {
                attr(el, DATA_TARGET, field.target);
            }
            if ( isString(field.tip) ) {
                attr(el, DATA_TIP, field.tip);
            }

            return me.fields[key] = field;
        },

        // Parsing field rules
        _parseRule: function(field) {
            var arr = rDisplay.exec(field.rule);

            if (!arr) return;
            // current rule index
            field._i = 0;
            if (arr[1]) {
                field.display = arr[1];
            }
            if (arr[2]) {
                field._rules = [];
                arr[2].replace(rRules, function(){
                    var args = arguments;
                    args[4] = args[4] || args[5];
                    field._rules.push({
                        and: args[1] === '&',
                        not: args[2] === '!',
                        or:  args[6] === '|',
                        method: args[3],
                        params: args[4] ? $.map( args[4].split(', '), trim ) : undefined
                    });
                });
            }
        },

        // Verify a zone
        _multiValidate: function($inputs, doneCallback){
            var me = this,
                opt = me.options;

            me.hasError = false;

            if (opt.ignore) {
                $inputs = $inputs.not(opt.ignore);
            }

            $inputs.each(function() {
                me._validate(this);
                if (me.hasError && opt.stopOnError) {
                    // stop the validation
                    return false;
                }
            });

            // Need to wait for all fields validation complete, especially asynchronous validation
            if (doneCallback) {
                me.validating = true;
                $.when.apply(
                    null,
                    $.map(me.deferred, function(v){return v;})
                ).done(function(){
                    doneCallback.call(me, !me.hasError);
                    me.validating = false;
                });
            }

            // If the form does not contain asynchronous validation, the return value is correct.
            // Otherwise, you should detect form validation result through "doneCallback".
            return !$.isEmptyObject(me.deferred) ? undefined : !me.hasError;
        },

        // Validate the whole form
        _submit: function(e) {
            var me = this,
                opt = me.options,
                form = e.target,
                canSubmit = e.type === 'submit' && form.tagName === 'FORM' && !e.isDefaultPrevented();

            e.preventDefault();

            if (
                novalidateonce && ~(novalidateonce = false) ||
                // Prevent duplicate submission
                me.submiting ||
                // Receive the "validate" event only from the form.
                e.type === 'validate' && me.$el[0] !== form ||
                // trigger the beforeSubmit callback.
                isFunction(opt.beforeSubmit) && opt.beforeSubmit.call(me, form) === false
            ) {
                return;
            }

            if (me.isAjaxSubmit === undefined) {
                me._guessAjax(form);
            }

            me._debug('log', '\n<<< event: ' + e.type);

            me._reset();
            me.submiting = true;

            me._multiValidate(
                me.$el.find(INPUT_SELECTOR),
                function(isValid){
                    var ret = (isValid || opt.debug === 2) ? 'valid' : 'invalid',
                        errors;

                    if (!isValid) {
                        if (opt.focusInvalid) {
                            // navigate to the error element
                            me.$el.find('[' + ARIA_INVALID + ']:first').focus();
                        }
                        errors = $.map(me.errors, function(err){return err;});
                    }

                    // releasing submit
                    me.submiting = false;
                    me.isValid = isValid;

                    // trigger callback and event
                    isFunction(opt[ret]) && opt[ret].call(me, form, errors);
                    me.$el.trigger(ret + CLS_NS_FORM, [form, errors]);

                    me._debug('log', '>>> ' + ret);

                    if (!isValid) return;
                    // For jquery.form plugin
                    if (me.vetoed) {
                        $(form).ajaxSubmit(me.ajaxFormOptions);
                    }
                    else if (canSubmit && !me.isAjaxSubmit) {
                        document.createElement('form').submit.call(form);
                    }
                }
            );
        },

        _reset: function(e) {
            var me = this;

            me.errors = {};
            if (e) {
                me.reseting = true;
                me.$el.find(INPUT_SELECTOR).each( function(){
                    me._resetElement(this);
                });
                delete me.reseting;
            }
        },

        _resetElement: function(el, all) {
            this._setClass(el, null);
            this.hideMsg(el);
        },

        // Handle events: "focusin/click"
        _focusin: function(e) {
            var me = this,
                opt = me.options,
                el = e.target,
                timely,
                msg;

            if ( me.validating || ( e.type==='click' && document.activeElement === el ) ) {
                return;
            }

            if (opt.focusCleanup) {
                if ( attr(el, ARIA_INVALID) === 'true' ) {
                    me._setClass(el, null);
                    me.hideMsg(el);
                }
            }

            msg = attr(el, DATA_TIP);

            if (msg) {
                me.showMsg(el, {
                    type: 'tip',
                    msg: msg
                });
            } else {
                if (attr(el, DATA_RULE)) {
                    me._parse(el);
                }
                if (timely = attr(el, DATA_TIMELY)) {
                    if ( timely === 8 || timely === 9 ) {
                        me._focusout(e);
                    }
                }
            }
        },

        // Handle events: "focusout/validate/keyup/click/change/input/compositionstart/compositionend"
        _focusout: function(e) {
            var me = this,
                opt = me.options,
                el = e.target,
                etype = e.type,
                etype0,
                focusin = etype === 'focusin',
                special = etype === 'validate',
                elem,
                field,
                old,
                value,
                timestamp,
                key, specialKey,
                timely,
                timer = 0;

            if (etype === 'compositionstart') {
                me.pauseValidate = true;
            }
            if (etype === 'compositionend') {
                me.pauseValidate = false;
            }
            if (me.pauseValidate) {
                return;
            }

            // For checkbox and radio
            elem = el.name && _checkable(el) ? me.$el.find('input[name="'+ el.name +'"]').get(0) : el;
            // Get field
            if (!(field = me.getField(elem)) || !field.rule) {
                return;
            }
            // Cache event type
            etype0 = field._e;
            field._e = etype;
            timely = field.timely;

            if (!special) {
                if (!timely || (_checkable(el) && etype !== 'click')) {
                    return;
                }

                value = field.getValue();

                // not validate field unless fill a value
                if ( field.ignoreBlank && !value && !focusin ) {
                    me.hideMsg(el);
                    return;
                }

                if ( etype === 'focusout' ) {
                    if (etype0 === 'change') {
                        return;
                    }
                    if ( timely === 2 || timely === 8 ) {
                        old = field.old;
                        if (value && old) {
                            if (field.isValid && !old.showOk) {
                                me.hideMsg(el);
                            } else {
                                me._makeMsg(el, field, old);
                            }
                        } else {
                            return;
                        }
                    }
                }
                else {
                    if ( timely < 2 && !e.data ) {
                        return;
                    }

                    // mark timestamp to reduce the frequency of the received event
                    timestamp = +new Date();
                    if ( timestamp - (el._ts || 0) < 100 ) {
                        return;
                    }
                    el._ts = timestamp;

                    // handle keyup
                    if ( etype === 'keyup' ) {
                        if (etype0 === 'input') {
                            return;
                        }
                        key = e.keyCode;
                        specialKey = {
                            8: 1,  // Backspace
                            9: 1,  // Tab
                            16: 1, // Shift
                            32: 1, // Space
                            46: 1  // Delete
                        };

                        // only gets focus, no validation
                        if ( key === 9 && !value ) {
                            return;
                        }

                        // do not validate, if triggered by these keys
                        if ( key < 48 && !specialKey[key] ) {
                            return;
                        }
                    }
                    if ( !focusin ) {
                        // keyboard events, reducing the frequency of validation
                        timer = timely <100 ?  (etype === 'click' || el.tagName === 'SELECT') ? 0 : 400 : timely;
                    }
                }
            }

            // if the current field is ignored
            if ( opt.ignore && $(el).is(opt.ignore) ) {
                return;
            }

            clearTimeout(field._t);

            if (timer) {
                field._t = setTimeout(function() {
                    me._validate(el, field);
                }, timer);
            } else {
                if (special) field.old = {};
                me._validate(el, field);
            }
        },

        _setClass: function(el, isValid) {
            var $el = $(el), opt = this.options;
            if (opt.bindClassTo) {
                $el = $el.closest(opt.bindClassTo);
            }
            $el.removeClass( opt.invalidClass + ' ' + opt.validClass );
            if (isValid !== null) {
                $el.addClass( isValid ? opt.validClass : opt.invalidClass );
            }
        },

        _showmsg: function(e, type, msg) {
            var me = this,
                el = e.target;

            if ( me.$el.is(el) ) {
                if (isObject(type)) {
                    me.showMsg(type)
                }
                else if ( type === 'tip' ) {
                    me.$el.find(INPUT_SELECTOR +'['+ DATA_TIP +']', el).each(function(){
                        me.showMsg(this, {type: type, msg: msg});
                    });
                }
            }
            else {
                me.showMsg(el, {type: type, msg: msg});
            }
        },

        _hidemsg: function(e) {
            var $el = $(e.target);

            if ( $el.is(INPUT_SELECTOR) ) {
                this.hideMsg($el);
            }
        },

        // Validated a field
        _validatedField: function(el, field, ret) {
            var me = this,
                opt = me.options,
                isValid = field.isValid = ret.isValid = !!ret.isValid,
                callback = isValid ? 'valid' : 'invalid';

            ret.key = field.key;
            ret.ruleName = field._r;
            ret.id = el.id;
            ret.value = field.value;

            me.elements[field.key] = ret.element = el;
            me.isValid = me.$el[0].isValid = isValid ? me.isFormValid() : isValid;

            if (isValid) {
                ret.type = 'ok';
            } else {
                if (me.submiting) {
                    me.errors[field.key] = ret.msg;
                }
                me.hasError = true;
            }

            // cache result
            field.old = ret;

            // trigger callback
            isFunction(field[callback]) && field[callback].call(me, el, ret);
            isFunction(opt.validation) && opt.validation.call(me, el, ret);

            // trigger event
            $(el).attr( ARIA_INVALID, isValid ? null : true )
                 .trigger( callback + CLS_NS_FIELD, [ret, me] );
            me.$el.triggerHandler('validation', [ret, me]);

            if (me.checkOnly) return;
            // set className
            me._setClass(el, ret.skip || ret.type === 'tip' ? null : isValid);
            me._makeMsg.apply(me, arguments);
        },

        _makeMsg: function(el, field, ret) {
            // show or hide the message
            if (field.msgMaker) {
                ret = $.extend({}, ret);
                if (field._e === 'focusin') {
                    ret.type = 'tip';
                }
                this[ ret.showOk || ret.msg || ret.type === 'tip' ? 'showMsg' : 'hideMsg' ](el, ret, field);
            }
        },

        // Validated a rule
        _validatedRule: function(el, field, ret, msgOpt) {
            field = field || me.getField(el);
            msgOpt = msgOpt || {};

            var me = this,
                msg,
                rule,
                method = field._r,
                timely = field.timely,
                special = timely === 9 || timely === 8,
                transfer,
                temp,
                isValid = false;

            // use null to break validation from a field
            if (ret === null) {
                me._validatedField(el, field, {isValid: true, skip: true});
                field._i = 0;
                return;
            }
            else if (ret === undefined) {
                transfer = true;
            }
            else if (ret === true || ret === '') {
                isValid = true;
            }
            else if (isString(ret)) {
                msg = ret;
            }
            else if (isObject(ret)) {
                if (ret.error) {
                    msg = ret.error;
                } else {
                    msg = ret.ok;
                    isValid = true;
                }
            }
            else {
                isValid = !!ret
            }

            rule = field._rules[field._i];
            if (rule.not) {
                msg = undefined;
                isValid = method === 'required' || !isValid;
            }
            if (rule.or) {
                if (isValid) {
                    while ( field._i < field._rules.length && field._rules[field._i].or ) {
                        field._i++;
                    }
                } else {
                    transfer = true;
                }
            }
            else if (rule.and) {
                if (!field.isValid) transfer = true;
            }

            if (transfer) {
                isValid = true;
            }
            // message analysis, and throw rule level event
            else {
                if (isValid) {
                    if (field.showOk !== false) {
                        temp = attr(el, DATA_OK);
                        msg = temp === null ? isString(field.ok) ? field.ok : msg : temp;
                        if (!isString(msg) && isString(field.showOk)) {
                            msg = field.showOk;
                        }
                        if (isString(msg)) {
                            msgOpt.showOk = isValid;
                        }
                    }
                }
                if (!isValid || special) {
                    /* rule message priority:
                        1. custom DOM message
                        2. custom field message;
                        3. global defined message;
                        4. rule returned message;
                        5. default message;
                    */
                    msg = (_getDataMsg(el, field, msg || rule.msg || me.messages[method]) || me.messages.fallback).replace(/\{0\|?([^\}]*)\}/, function(m, defaultDisplay){
                        return me._getDisplay(el, field.display) || defaultDisplay || me.messages[0];
                    });
                }
                if (!isValid) field.isValid = isValid;
                msgOpt.msg = msg;
                $(el).trigger( (isValid ? 'valid' : 'invalid') + CLS_NS_RULE, [method, msg]);
            }

            if (special && (!transfer || rule.and)) {
                if (!isValid && !field._m) field._m = msg;
                field._v = field._v || [];
                field._v.push({
                    type: isValid ? !transfer ? 'ok' : 'tip' : 'error',
                    msg: msg || rule.msg
                });
            }

            me._debug('log', '   ' + field._i + ': ' + method + ' => ' + (isValid || msg));

            // the current rule has passed, continue to validate
            if ( (isValid || special) && field._i < field._rules.length - 1) {
                field._i++;
                me._checkRule(el, field);
            }
            // field was invalid, or all fields was valid
            else {
                field._i = 0;

                if (special) {
                    msgOpt.isValid = field.isValid;
                    msgOpt.result = field._v;
                    msgOpt.msg = field._m || '';
                    if (!field.value && (field._e === 'focusin')) {
                        msgOpt.type = 'tip';
                    }
                } else {
                    msgOpt.isValid = isValid;
                }

                me._validatedField(el, field, msgOpt);
                delete field._m;
                delete field._v;
            }
        },

        // Verify a rule form a field
        _checkRule: function(el, field) {
            var me = this,
                ret,
                fn,
                old,
                key = field.key,
                rule = field._rules[field._i],
                method = rule.method,
                params = rule.params;

            // request has been sent, wait it
            if (me.submiting && me.deferred[key]) {
                return;
            }
            old = field.old;
            field._r = method;

            if (old && !field.must && !rule.must && rule.result !== undefined &&
                old.ruleName === method && old.id === el.id &&
                field.value && old.value === field.value )
            {
                // get result from cache
                ret = rule.result;
            }
            else {
                // get result from current rule
                fn = _getDataRule(el, method) || me.rules[method] || noop;
                ret = fn.call(field, el, params, field);
                if (fn.msg) rule.msg = fn.msg;
            }

            // asynchronous validation
            if (isObject(ret) && isFunction(ret.then)) {
                me.deferred[key] = ret;

                // whether the field valid is unknown
                field.isValid = undefined;

                // show loading message
                !me.checkOnly && me.showMsg(el, {
                    type: 'loading',
                    msg: me.messages.loading
                }, field);

                // waiting to parse the response data
                ret.then(
                    function(d, textStatus, jqXHR) {
                        var data = trim(jqXHR.responseText),
                            result,
                            dataFilter = field.dataFilter;

                        // detect if data is json or jsonp format
                        if (/jsonp?/.test(this.dataType)) {
                            data = d;
                        } else if (data.charAt(0) === '{') {
                            data = $.parseJSON(data);
                        }

                        // filter data
                        result = dataFilter.call(this, data, field);
                        if (result === undefined) result = dataFilter.call(this, data.data, field);

                        rule.data = this.data;
                        rule.result = field.old ? result : undefined;
                        me._validatedRule(el, field, result);
                    },
                    function(jqXHR, textStatus){
                        me._validatedRule(el, field, me.messages[textStatus] || textStatus);
                    }
                ).always(function(){
                    delete me.deferred[key];
                });
            }
            // other result
            else {
                me._validatedRule(el, field, ret);
            }
        },

        // Processing the validation
        _validate: function(el, field) {
            var me = this;

            // doesn't validate the element that has "disabled" or "novalidate" attribute
            if ( el.disabled || attr(el, NOVALIDATE) !== null ) {
                return;
            }

            field = field || me.getField(el);
            if (!field) return;
            if (!field._rules) me._parse(el);
            if (!field._rules) return;

            me._debug('info', field.key);

            field.isValid = true;
            field.element = el;
            // Cache the value
            field.value = field.getValue();

            // if the field is not required, and that has a blank value
            if (!field.required && !field.must && !field.value) {
                if (!_checkable(el)) {
                    me._validatedField(el, field, {isValid: true});
                    return true;
                }
            }

            me._checkRule(el, field);
            return field.isValid;
        },

        _debug: function(type, messages) {
            if (window.console && this.options.debug) {
                console[type](messages);
            }
        },

        /**
         * Detecting whether the value of an element that matches a rule
         *
         * @method test
         * @param {Element} el - input element
         * @param {String} rule - rule name
         */
        test: function(el, rule) {
            var me = this,
                ret,
                parts = rRule.exec(rule),
                field,
                method,
                params;

            if (parts) {
                method = parts[1];
                if (method in me.rules) {
                    params = parts[2] || parts[3];
                    params = params ? params.split(', ') : undefined;
                    field = me.getField(el, true);
                    field._r = method;
                    field.value = field.getValue();
                    ret = me.rules[method].call(field, el, params);
                }
            }

            return ret === true || ret === undefined || ret === null;
        },

        _getDisplay: function(el, str) {
            return !isString(str) ? isFunction(str) ? str.call(this, el) : '' : str;
        },

        _getMsgOpt: function(obj, field) {
            var opt = field ? field : this.options;
            return $.extend({
                type: 'error',
                pos: _getPos(opt.msgClass),
                target: opt.target,
                wrapper: opt.msgWrapper,
                style: opt.msgStyle,
                cls: opt.msgClass,
                arrow: opt.msgArrow,
                icon: opt.msgIcon
            }, isString(obj) ? {msg: obj} : obj);
        },

        _getMsgDOM: function(el, msgOpt) {
            var $el = $(el), $msgbox, datafor, tgt, container;

            if ( $el.is(INPUT_SELECTOR) ) {
                tgt = msgOpt.target || attr(el, DATA_TARGET);
                if (tgt) {
                    tgt = !isFunction(tgt) ? tgt.charAt(0) === '#' ? $(tgt) : this.$el.find(tgt) : tgt.call(this, el);
                    if (tgt.length) {
                        if ( tgt.is(INPUT_SELECTOR) ) {
                            $el = tgt
                            el = tgt.get(0);
                        } else if ( tgt.hasClass(CLS_MSG_BOX) ) {
                            $msgbox = tgt;
                        } else {
                            container = tgt;
                        }
                    }
                }
                if (!$msgbox) {
                    datafor = (!_checkable(el) || !el.name) && el.id ? el.id : el.name;
                    $msgbox = (container || this.$el).find(msgOpt.wrapper + '.' + CLS_MSG_BOX + '[for="' + datafor + '"]');
                }
            } else {
                $msgbox = $el;
            }

            // Create new message box
            if (!msgOpt.hide && !$msgbox.length) {
                $msgbox = $('<'+ msgOpt.wrapper + '>').attr({
                    'class': CLS_MSG_BOX + (msgOpt.cls ? ' ' + msgOpt.cls : ''),
                    'style': msgOpt.style || undefined,
                    'for': datafor
                });

                if (container) {
                    $msgbox.appendTo(container);
                } else {
                    if ( _checkable(el) ) {
                        var $parent = $el.parent();
                        $msgbox.appendTo( $parent.is('label') ? $parent.parent() : $parent );
                    } else {
                        $msgbox[!msgOpt.pos || msgOpt.pos === 'right' ? 'insertAfter' : 'insertBefore']($el);
                    }
                }
            }

            return $msgbox;
        },

        /**
         * Show validation message
         *
         * @method showMsg
         * @param {Element} el - input element
         * @param {Object} msgOpt
         */
        showMsg: function(el, msgOpt, /*INTERNAL*/ field) {
            if (!el) return;
            var me = this,
                opt = me.options,
                msgShow,
                msgMaker,
                temp,
                $msgbox;

            if (isObject(el) && !el.jquery && !msgOpt) {
                $.each(el, function(key, msg) {
                    var el = me.elements[key] || me.$el.find(_key2selector(key))[0];
                    me.showMsg(el, msg);
                });
                return;
            }

            if ($(el).is(INPUT_SELECTOR)) {
                field = field || me.getField(el);
            }

            if (!(msgMaker = (field || opt).msgMaker)) {
                return;
            }

            msgOpt = me._getMsgOpt(msgOpt, field);
            el = (el.name && _checkable(el) ? me.$el.find('input[name="'+ el.name +'"]') : $(el)).get(0);

            // ok or tip
            if (!msgOpt.msg && msgOpt.type !== 'error') {
                temp = attr(el, 'data-' + msgOpt.type);
                if (temp !== null) msgOpt.msg = temp;
            }

            if ( !isString(msgOpt.msg) ) {
                return;
            }

            $msgbox = me._getMsgDOM(el, msgOpt);

            !rPos.test($msgbox[0].className) && $msgbox.addClass(msgOpt.cls);
            if ( isIE === 6 && msgOpt.pos === 'bottom' ) {
                $msgbox[0].style.marginTop = $(el).outerHeight() + 'px';
            }
            $msgbox.html( msgMaker.call(me, msgOpt) )[0].style.display = '';

            if (isFunction(msgShow = field && field.msgShow || opt.msgShow)) {
                msgShow.call(me, $msgbox, msgOpt.type);
            }
        },

        /**
         * Hide validation message
         *
         * @method hideMsg
         * @param {Element} el - input element
         * @param {Object} msgOpt optional
         */
        hideMsg: function(el, msgOpt, /*INTERNAL*/ field) {
            var me = this,
                opt = me.options,
                msgHide,
                $msgbox;

            el = $(el).get(0);
            if ($(el).is(INPUT_SELECTOR)) {
                field = field || me.getField(el);
                if (field) {
                    if (field.isValid || me.reseting) attr(el, ARIA_INVALID, null);
                }
            }

            msgOpt = me._getMsgOpt(msgOpt, field);
            msgOpt.hide = true;

            $msgbox = me._getMsgDOM(el, msgOpt);
            if (!$msgbox.length) return;

            if ( isFunction(msgHide = field && field.msgHide || opt.msgHide) ) {
                msgHide.call(me, $msgbox, msgOpt.type);
            } else {
                $msgbox[0].style.display = 'none';
                $msgbox[0].innerHTML = '';
            }
        },

        /**
         * Get field information
         *
         * @method getField
         * @param {Element} - input element
         * @return {Object} field
         */
        getField: function(el, must) {
            var me = this,
                key,
                field;

            if (isString(el)) {
                key = el;
                el = undefined;
            } else {
                if (attr(el, DATA_RULE)) {
                    return me._parse(el);
                }
                if (el.id && '#' + el.id in me.fields || !el.name) {
                    key = '#' + el.id;
                } else {
                    key = el.name;
                }
            }

            if ( (field = me.fields[key]) || must && (field = new me.Field(key)) ) {
                field.element = el;
            }

            return field;
        },

        /**
         * Config a field
         *
         * @method: setField
         * @param {String} key
         * @param {Object} obj
         */
        setField: function(key, obj) {
            var fields = {};

            if (!key) return;

            // update this field
            if (isString(key)) {
                fields[key] = obj;
            }
            // update fields
            else {
                fields = key;
            }

            this._initFields(fields);
        },

        /**
         * Detecting whether the form is valid
         *
         * @method isFormValid
         * @return {Boolean}
         */
        isFormValid: function() {
            var fields = this.fields, k, field;
            for (k in fields) {
                field = fields[k];
                if (!field._rules || !field.required && !field.must && !field.value) continue;
                if (!field.isValid) return false;
            }
            return true;
        },

        /**
         * Prevent submission form
         *
         * @method holdSubmit
         * @param {Boolean} hold - If set to false, will release the hold
         */
        holdSubmit: function(hold) {
            this.submiting = hold === undefined || hold;
        },

        /**
         * Clean validation messages
         *
         * @method cleanUp
         */
        cleanUp: function() {
            this._reset(1);
        },

        /**
         * Destroy the validation
         *
         * @method destroy
         */
        destroy: function() {
            this._reset(1);
            this.$el.off(CLS_NS).removeData(NS);
            attr(this.$el[0], NOVALIDATE, this._NOVALIDATE);
        }
    };

    /**
     * Create Field Factory
     *
     * @class
     * @param  {Object}     context
     * @return {Function}   Factory
     */
    function _createFieldFactory(context) {
        function FieldFactory() {
            var options = this.options;
            for (var i in options) {
                if (i in fieldDefaults) this[i] = options[i];
            }
            $.extend(this, {
                _valHook: function() {
                    return this.element.contentEditable === 'true' ? 'text' : 'val';
                },
                getValue: function() {
                    var elem = this.element;
                    if (elem.type === 'number' && elem.validity && elem.validity.badInput) {
                        return 'NaN';
                    }
                    return  $(elem)[this._valHook()]();
                },
                setValue: function(value) {
                    $(this.element)[this._valHook()](this.value = value);
                },
                // Get a range of validation messages
                getRangeMsg: function(value, params, suffix) {
                    if (!params) return;

                    var me = this,
                        msg = me.messages[me._r] || '',
                        result,
                        p = params[0].split('~'),
                        e = params[1] === 'false',
                        a = p[0],
                        b = p[1],
                        c = 'rg',
                        args = [''],
                        isNumber = trim(value) && +value === +value;

                    function compare(large, small) {
                        return !e ? large >= small : large > small;
                    }

                    if (p.length === 2) {
                        if (a && b) {
                            if (isNumber && compare(value, +a) && compare(+b, value)) {
                                result = true;
                            }
                            args = args.concat(p);
                            c = e ? 'gtlt' : 'rg';
                        }
                        else if (a && !b) {
                            if (isNumber && compare(value, +a)) {
                                result = true;
                            }
                            args.push(a);
                            c = e ? 'gt' : 'gte';
                        }
                        else if (!a && b) {
                            if (isNumber && compare(+b, value)) {
                                result = true;
                            }
                            args.push(b);
                            c = e ? 'lt' : 'lte';
                        }
                    }
                    else {
                        if (value === +a) {
                            result = true;
                        }
                        args.push(a);
                        c = 'eq';
                    }

                    if (msg) {
                        if (suffix && msg[c + suffix]) {
                            c += suffix;
                        }
                        args[0] = msg[c];
                    }

                    return result || me._rules && ( me._rules[me._i].msg = me.renderMsg.apply(null, args) );
                },
                // Render message template
                renderMsg: function() {
                    var args = arguments,
                        tpl = args[0],
                        i = args.length;

                    if (!tpl) return;

                    while (--i) {
                        tpl = tpl.replace('{' + i + '}', args[i]);
                    }

                    return tpl;
                }
            });
        }
        function Field(key, obj, oldField) {
            this.key = key;
            this.validator = context;
            $.extend(this, oldField, obj);
        }

        FieldFactory.prototype = context;
        Field.prototype = new FieldFactory();

        return Field;
    }

    /**
     * Create Rules
     *
     * @class
     * @param {Object} obj     rules
     * @param {Object} context context
     */
    function Rules(obj, context) {
        if (!isObject(obj)) return;

        var k, that = context ? context === true ? this : context : Rules.prototype;

        for (k in obj) {
            if (_checkRuleName(k)) {
                that[k] = _getRule(obj[k]);
            }
        }
    }

    /**
     * Create Messages
     *
     * @class
     * @param {Object} obj     rules
     * @param {Object} context context
     */
    function Messages(obj, context) {
        if (!isObject(obj)) return;

        var k, that = context ? context === true ? this : context : Messages.prototype;

        for (k in obj) {
            that[k] = obj[k];
        }
    }

    // Rule converted factory
    function _getRule(fn) {
        switch ($.type(fn)) {
            case 'function':
                return fn;
            case 'array':
                var f = function() {
                    return fn[0].test(this.value) || fn[1] || false;
                };
                f.msg = fn[1];
                return f;
            case 'regexp':
                return function() {
                    return fn.test(this.value);
                };
        }
    }

    // Get instance by an element
    function _getInstance(el) {
        var wrap, k, options;

        if (!el || !el.tagName) return;

        switch (el.tagName) {
            case 'INPUT':
            case 'SELECT':
            case 'TEXTAREA':
            case 'BUTTON':
            case 'FIELDSET':
                wrap = el.form || $(el).closest('.' + CLS_WRAPPER);
                break;
            case 'FORM':
                wrap = el;
                break;
            default:
                wrap = $(el).closest('.' + CLS_WRAPPER);
        }

        for (k in preinitialized) {
            if ($(wrap).is(k)) {
                options = preinitialized[k];
                break;
            }
        }

        return $(wrap).data(NS) || $(wrap)[NS](options).data(NS);
    }

    // Get custom rules on the node
    function _getDataRule(el, method) {
        var fn = trim(attr(el, DATA_RULE + '-' + method));

        if ( fn && (fn = new Function('return ' + fn)()) ) {
            return _getRule(fn);
        }
    }

    // Get custom messages on the node
    function _getDataMsg(el, field, m) {
        var msg = field.msg,
            item = field._r;

        if ( isObject(msg) ) msg = msg[item];
        if ( !isString(msg) ) {
            msg = attr(el, DATA_MSG + '-' + item) || attr(el, DATA_MSG) || ( m ? isString(m) ? m : m[item] : '');
        }

        return msg;
    }

    // Get message position
    function _getPos(str) {
        var pos;

        if (str) pos = rPos.exec(str);
        return pos && pos[0];
    }

    // Check whether the element is checkbox or radio
    function _checkable(el) {
        return el.tagName === 'INPUT' && el.type === 'checkbox' || el.type === 'radio';
    }

    // Parse date string to timestamp
    function _parseDate(str) {
        return Date.parse(str.replace(/\.|\-/g, '/'));
    }

    // Rule name only allows alphanumeric characters and underscores
    function _checkRuleName(name) {
        return /^\w+$/.test(name);
    }

    // Translate field key to jQuery selector.
    function _key2selector(key) {
        var isID = key.charAt(0) === '#';
        key = key.replace(/([:.{(|)}/\[\]])/g, '\\$1');
        return isID ? key : '[name="'+ key +'"]:first';
    }


    // Fixed a issue cause by refresh page in IE.
    $(window).on('beforeunload', function(){
        this.focus();
    });

    $(document)
    .on('click', ':submit', function(){
        var input = this, attrNode;
        if (!input.form) return;
        // Shim for "formnovalidate"
        attrNode = input.getAttributeNode('formnovalidate');
        if (attrNode && attrNode.nodeValue !== null || attr(input, NOVALIDATE)!== null) {
            novalidateonce = true;
        }
    })
    // Automatic initializing form validation
    .on('focusin submit validate', 'form,.'+CLS_WRAPPER, function(e) {
        if ( attr(this, NOVALIDATE) !== null ) return;
        var $form = $(this), me;

        if ( !$form.data(NS) && (me = _getInstance(this)) ) {
            if ( !$.isEmptyObject(me.fields) ) {
                // Execute event handler
                if (e.type === 'focusin') {
                    me._focusin(e);
                } else {
                    me._submit(e);
                }
            } else {
                attr(this, NOVALIDATE, NOVALIDATE);
                $form.off(CLS_NS).removeData(NS);
            }
        }
    });

    new Messages({
        fallback: 'This field is not valid.',
        loading: 'Validating...'
    });


    // Built-in rules (global)
    new Rules({

        /**
         * required
         *
         * @example:
            required
            required(jqSelector)
            required(anotherRule)
            required(not, -1)
            required(from, .contact)
         */
        required: function(element, params) {
            var me = this,
                val = trim(me.value),
                isValid = true;

            if (params) {
                if ( params.length === 1 ) {
                    if ( !_checkRuleName(params[0]) ) {
                        if (!val && !$(params[0], me.$el).length ) {
                            return null;
                        }
                    }
                    else if ( me.rules[params[0]] ) {
                        if ( !val && !me.test(element, params[0]) ) {
                            return null;
                        }
                        me._r = 'required'
                    }
                }
                else if ( params[0] === 'not' ) {
                    $.each(params.slice(1), function() {
                        return (isValid = val !== trim(this));
                    });
                }
                else if ( params[0] === 'from' ) {
                    var $elements = me.$el.find(params[1]),
                        VALIDATED = '_validated_',
                        ret;

                    isValid = $elements.filter(function(){
                        var field = me.getField(this);
                        return field && !!trim(field.getValue());
                    }).length >= (params[2] || 1);

                    if (isValid) {
                        if (!val) ret = null;
                    } else {
                        ret = _getDataMsg($elements[0], me) || false;
                    }

                    if ( !$(element).data(VALIDATED) ) {
                        $elements.data(VALIDATED, 1).each(function(){
                            if (element !== this) {
                                me._validate(this);
                            }
                        }).removeData(VALIDATED);
                    }

                    return ret;
                }
            }

            return isValid && !!val;
        },

        /**
         * integer
         *
         * @example:
            integer
            integer[+]
            integer[+0]
            integer[-]
            integer[-0]
         */
        integer: function(element, params) {
            var re, z = '0|',
                p = '[1-9]\\d*',
                key = params ? params[0] : '*';

            switch (key) {
                case '+':
                    re = p;
                    break;
                case '-':
                    re = '-' + p;
                    break;
                case '+0':
                    re = z + p;
                    break;
                case '-0':
                    re = z + '-' + p;
                    break;
                default:
                    re = z + '-?' + p;
            }
            re = '^(?:' + re + ')$';

            return new RegExp(re).test(this.value) || (this.messages.integer && this.messages.integer[key]);
        },

        /**
         * match another field
         *
         * @example:
            match[password]    Match the password field (two values ​​must be the same)
            match[eq, password]  Ditto
            match[neq, count]  The value must be not equal to the value of the count field
            match[lt, count]   The value must be less than the value of the count field
            match[lte, count]  The value must be less than or equal to the value of the count field
            match[gt, count]   The value must be greater than the value of the count field
            match[gte, count]  The value must be greater than or equal to the value of the count field
            match[gte, startDate, date]
            match[gte, startTime, time]
         **/
        match: function(element, params) {
            if (!params) return;

            var me = this,
                isValid = true,
                a, b,
                key, msg, type = 'eq', parser,
                selector2, elem2, field2;

            if (params.length === 1) {
                key = params[0];
            } else {
                type = params[0];
                key = params[1];
            }

            selector2 = _key2selector(key);
            elem2 = me.$el.find(selector2)[0];
            // If the compared field is not exist
            if (!elem2) return;
            field2 = me.getField(elem2);
            a = me.value;
            b = field2.getValue();

            if (!me._match) {
                me.$el.on('valid'+CLS_NS_FIELD+CLS_NS, selector2, function(){
                    $(element).trigger('validate');
                });
                me._match = field2._match = 1;
            }

            // If both fields are blank
            if (!me.required && a === '' && b === '') {
                return null;
            }

            parser = params[2];
            if (parser) {
                if (/^date(time)?$/i.test(parser)) {
                    a = _parseDate(a);
                    b = _parseDate(b);
                } else if (parser === 'time') {
                    a = +a.replace(/:/g, '');
                    b = +b.replace(/:/g, '');
                }
            }

            // If the compared field is incorrect, we only ensure that this field is correct.
            if (type !== 'eq' && !isNaN(+a) && isNaN(+b)) {
                return true;
            }

            switch (type) {
                case 'lt':
                    isValid = +a < +b; break;
                case 'lte':
                    isValid = +a <= +b; break;
                case 'gte':
                    isValid = +a >= +b; break;
                case 'gt':
                    isValid = +a > +b; break;
                case 'neq':
                    isValid = a !== b; break;
                default:
                    isValid = a === b;
            }

            return isValid || (
                isObject(me.messages.match)
                && me.messages.match[type].replace( '{1}', me._getDisplay( elem2, field2.display || key ) )
            );
        },

        /**
         * range numbers
         *
         * @example:
            range[0~99]    Number 0-99
            range[0~]      Number greater than or equal to 0
            range[~100]    Number less than or equal to 100
         **/
        range: function(element, params) {
            return this.getRangeMsg(this.value, params);
        },

        /**
         * how many checkbox or radio inputs that checked
         *
         * @example:
            checked;       no empty, same to required
            checked[1~3]   1-3 items
            checked[1~]    greater than 1 item
            checked[~3]    less than 3 items
            checked[3]     3 items
         **/
        checked: function(element, params) {
            if ( !_checkable(element) ) return;

            var me = this,
                elem, count;

            if (element.name) {
                count = me.$el.find('input[name="' + element.name + '"]').filter(function() {
                    var el = this;
                    if (!elem && _checkable(el)) elem = el;
                    return !el.disabled && el.checked;
                }).length;
            } else {
                elem = element;
                count = elem.checked;
            }

            if (params) {
                return me.getRangeMsg(count, params);
            } else {
                return !!count || _getDataMsg(elem, me, '') || me.messages.required || false;
            }
        },

        /**
         * length of a characters (You can pass the second parameter "true", will calculate the length in bytes)
         *
         * @example:
            length[6~16]        6-16 characters
            length[6~]          Greater than 6 characters
            length[~16]         Less than 16 characters
            length[~16, true]   Less than 16 characters, non-ASCII characters calculating two-character
         **/
        length: function(element, params) {
            var value = this.value,
                len = (params[1] === 'true' ? value.replace(rDoubleBytes, 'xx') : value).length;

            return this.getRangeMsg(len, params, (params[1] ? '_2' : ''));
        },

        /**
         * remote validation
         *
         * @description
         *  remote([get:]url [, name1, [name2 ...]]);
         *  Adaptation three kinds of results (Front for the successful, followed by a failure):
                1. text:
                    ''  'Error Message'
                2. json:
                    {"ok": ""}  {"error": "Error Message"}
                3. json wrapper:
                    {"status": 1, "data": {"ok": ""}}  {"status": 1, "data": {"error": "Error Message"}}
         * @example
            The simplest:       remote(path/to/server);
            With parameters:    remote(path/to/server, name1, name2, ...);
            By GET:             remote(get:path/to/server, name1, name2, ...);
            Name proxy:         remote(path/to/server, name1, proxyname2:name2, proxyname3:#id3, ...)
            Query String        remote(path/to/server, foo=1&bar=2, name1, name2, ...)
            CORS                remote(cors:path/to/server)
            JSONP               remote(jsonp:path/to/server)
         */
        remote: function(element, params) {
            if (!params) return;

            var me = this,
                arr = rAjaxType.exec(params[0]),
                rule = me._rules[me._i],
                data = {},
                queryString = '',
                url = arr[3],
                type = arr[2] || 'POST',            // GET / POST
                rType = (arr[1]||'').toLowerCase(), // CORS / JSONP
                dataType;

            rule.must = true;
            data[element.name] = me.value;

            // There are extra fields
            if (params[1]) {
                $.map(params.slice(1), function(name) {
                    var arr, key;
                    if (~name.indexOf('=')) {
                        queryString += '&' + name;
                    } else {
                        arr = name.split(':');
                        name = trim(arr[0]);
                        key = trim(arr[1]) || name;
                        data[ name ] = me.$el.find( _key2selector(key) ).val();
                    }
                });
            }

            data = $.param(data) + queryString;
            if (!me.must && rule.data && rule.data === data) {
                return rule.result;
            }

            // Cross-domain request, force jsonp dataType
            if (rType !== 'cors' && /^https?:/.test(url) && !~url.indexOf(location.host)) {
                dataType = 'jsonp';
            }

            // Asynchronous validation need return jqXHR objects
            return $.ajax({
                url: url,
                type: type,
                data: data,
                dataType: dataType
            });
        },

        /**
         * filter characters, direct filtration without prompting error (support custom regular expressions)
         *
         * @example
         *  filter          filtering unsafe characters
         *  filter(regexp)  filtering the "regexp" matched characters
         */
        filter: function(element, params) {
            var value = this.value,
                temp = value.replace( params ? (new RegExp('[' + params[0] + ']', 'gm')) : rUnsafe, '' );
            if (temp !== value) this.setValue(temp);
        }
    });


    /**
     * Config global options
     *
     * @static  config
     * @param {Object} options
     */
    Validator.config = function(key, value) {
        if (isObject(key)) {
            $.each(key, _config);
        }
        else if (isString(key)) {
            _config(key, value);
        }

        function _config(k, o) {
            if (k === 'rules') {
                new Rules(o);
            }
            else if (k === 'messages') {
                new Messages(o);
            }
            else if (k in fieldDefaults) {
                fieldDefaults[k] = o;
            }
            else {
                defaults[k] = o;
            }
        }
    };

    /**
     * Config themes
     *
     * @static setTheme
     * @param {String|Object} name
     * @param {Object} obj
     * @example
        .setTheme( themeName, themeOptions )
        .setTheme( multiThemes )
     */
    Validator.setTheme = function(name, obj) {
        if ( isObject(name) ) {
            $.extend(true, themes, name);
        }
        else if ( isString(name) && isObject(obj) ) {
            themes[name] = $.extend(themes[name], obj);
        }
    };

    /**
     * Resource loader
     *
     * @static load
     * @param {String} str
     * @example
        .load('local=zh-CN')        // load: local/zh-CN.js and jquery.validator.css
        .load('local=zh-CN&css=')   // load: local/zh-CN.js
        .load('local&css')          // load: local/en.js (set <html lang="en">) and jquery.validator.css
        .load('local')              // dito
     */
    Validator.load = function(str) {
        if (!str) return;
        var doc = document,
            params = {},
            node = doc.scripts[0],
            dir, el, ONLOAD;

        str.replace(/([^?=&]+)=([^&#]*)/g, function(m, key, value){
            params[key] = value;
        });

        dir = params.dir || Validator.dir;

        if (!Validator.css && params.css !== '') {
            el = doc.createElement('link');
            el.rel = 'stylesheet';
            el.href = Validator.css = dir + 'jquery.validator.css';
            node.parentNode.insertBefore(el, node);
        }
        if (!Validator.local && ~str.indexOf('local') && params.local !== '') {
            Validator.local = (params.local || doc.documentElement.lang || 'en').replace('_','-');
            Validator.pending = 1;
            el = doc.createElement('script');
            el.src = dir + 'local/' + Validator.local + '.js';
            ONLOAD = 'onload' in el ? 'onload' : 'onreadystatechange';
            el[ONLOAD] = function() {
                if (!el.readyState || /loaded|complete/.test(el.readyState)) {
                    el = el[ONLOAD] = null;
                    delete Validator.pending;
                    $(window).triggerHandler('validatorready');
                }
            };
            node.parentNode.insertBefore(el, node);
        }
    };

    // Auto loading resources
    (function(){
        var scripts = document.scripts,
            i = scripts.length, node, arr,
            re = /(.*validator(?:\.min)?.js)(\?.*(?:local|css|dir)(?:=[\w\-]*)?)?/;

        while (i-- && !arr) {
            node = scripts[i];
            arr = (node.hasAttribute ? node.src : node.getAttribute('src',4)||'').match(re);
        }

        if (!arr) return;
        Validator.dir = arr[1].split('/').slice(0, -1).join('/')+'/';
        Validator.load(arr[2]);
    })();

    return $[NS] = Validator;
}));

/*********************************
 * Themes, rules, and i18n support
 * Locale: Chinese; 中文
 *********************************/
(function(factory) {
    typeof module === "object" && module.exports ? module.exports = factory( require( "jquery" ) ) :
    typeof define === 'function' && define.amd ? define('validator-lang',['jquery'], factory) :
    factory(jQuery);
}(function($) {

    /* Global configuration
     */
    $.validator.config({
        //stopOnError: true,
        //focusCleanup: true,
        //theme: 'yellow_right',
        //timely: 2,

        // Custom rules
        rules: {
            digits: [/^\d+$/, "请填写数字"]
            ,letters: [/^[a-z]+$/i, "请填写字母"]
            ,date: [/^\d{4}-\d{2}-\d{2}$/, "请填写有效的日期，格式:yyyy-mm-dd"]
            ,time: [/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "请填写有效的时间，00:00到23:59之间"]
            ,email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "请填写有效的邮箱"]
            ,url: [/^(https?|s?ftp):\/\/\S+$/i, "请填写有效的网址"]
            ,qq: [/^[1-9]\d{4,}$/, "请填写有效的QQ号"]
            ,IDcard: [/^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/, "请填写正确的身份证号码"]
            ,tel: [/^(?:(?:0\d{2,3}[\- ]?[1-9]\d{6,7})|(?:[48]00[\- ]?[1-9]\d{6}))$/, "请填写有效的电话号码"]
            ,mobile: [/^1[3-9]\d{9}$/, "请填写有效的手机号"]
            ,zipcode: [/^\d{6}$/, "请检查邮政编码格式"]
            ,chinese: [/^[\u0391-\uFFE5]+$/, "请填写中文字符"]
            ,username: [/^\w{3,12}$/, "请填写3-12位数字、字母、下划线"]
            ,password: [/^[\S]{6,16}$/, "请填写6-16位字符，不能包含空格"]
            ,accept: function (element, params){
                if (!params) return true;
                var ext = params[0],
                    value = $(element).val();
                return (ext === '*') ||
                       (new RegExp(".(?:" + ext + ")$", "i")).test(value) ||
                       this.renderMsg("只接受{1}后缀的文件", ext.replace(/\|/g, ','));
            }
            
        },

        // Default error messages
        messages: {
            0: "此处",
            fallback: "{0}格式不正确",
            loading: "正在验证...",
            error: "网络异常",
            timeout: "请求超时",
            required: "{0}不能为空",
            remote: "{0}已被使用",
            integer: {
                '*': "请填写整数",
                '+': "请填写正整数",
                '+0': "请填写正整数或0",
                '-': "请填写负整数",
                '-0': "请填写负整数或0"
            },
            match: {
                eq: "{0}与{1}不一致",
                neq: "{0}与{1}不能相同",
                lt: "{0}必须小于{1}",
                gt: "{0}必须大于{1}",
                lte: "{0}不能大于{1}",
                gte: "{0}不能小于{1}"
            },
            range: {
                rg: "请填写{1}到{2}的数",
                gte: "请填写不小于{1}的数",
                lte: "请填写最大{1}的数",
                gtlt: "请填写{1}到{2}之间的数",
                gt: "请填写大于{1}的数",
                lt: "请填写小于{1}的数"
            },
            checked: {
                eq: "请选择{1}项",
                rg: "请选择{1}到{2}项",
                gte: "请至少选择{1}项",
                lte: "请最多选择{1}项"
            },
            length: {
                eq: "请填写{1}个字符",
                rg: "请填写{1}到{2}个字符",
                gte: "请至少填写{1}个字符",
                lte: "请最多填写{1}个字符",
                eq_2: "",
                rg_2: "",
                gte_2: "",
                lte_2: ""
            }
        }
    });

    /* Themes
     */
    var TPL_ARROW = '<span class="n-arrow"><b>◆</b><i>◆</i></span>';
    $.validator.setTheme({
        'simple_right': {
            formClass: 'n-simple',
            msgClass: 'n-right'
        },
        'simple_bottom': {
            formClass: 'n-simple',
            msgClass: 'n-bottom'
        },
        'yellow_top': {
            formClass: 'n-yellow',
            msgClass: 'n-top',
            msgArrow: TPL_ARROW
        },
        'yellow_right': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW
        },
        'yellow_right_effect': {
            formClass: 'n-yellow',
            msgClass: 'n-right',
            msgArrow: TPL_ARROW,
            msgShow: function($msgbox, type){
                var $el = $msgbox.children();
                if ($el.is(':animated')) return;
                if (type === 'error') {
                    $el.css({left: '20px', opacity: 0})
                        .delay(100).show().stop()
                        .animate({left: '-4px', opacity: 1}, 150)
                        .animate({left: '3px'}, 80)
                        .animate({left: 0}, 80);
                } else {
                    $el.css({left: 0, opacity: 1}).fadeIn(200);
                }
            },
            msgHide: function($msgbox, type){
                var $el = $msgbox.children();
                $el.stop().delay(100).show()
                    .animate({left: '20px', opacity: 0}, 300, function(){
                        $msgbox.hide();
                    });
            }
        }
    });
}));

define('form',['jquery', 'bootstrap', 'upload', 'validator', 'validator-lang'], function ($, undefined, Upload, Validator, undefined) {
    var Form = {
        config: {
            fieldlisttpl: '<dd class="form-inline"><input type="text" name="<%=name%>[<%=index%>][key]" class="form-control" value="<%=row.key%>" size="10" /> <input type="text" name="<%=name%>[<%=index%>][value]" class="form-control" value="<%=row.value%>" /> <span class="btn btn-sm btn-danger btn-remove"><i class="fa fa-times"></i></span> <span class="btn btn-sm btn-primary btn-dragsort"><i class="fa fa-arrows"></i></span></dd>'
        },
        events: {
            validator: function (form, success, error, submit) {
                if (!form.is("form"))
                    return;
                //绑定表单事件
                form.validator($.extend({
                    validClass: 'has-success',
                    invalidClass: 'has-error',
                    bindClassTo: '.form-group',
                    formClass: 'n-default n-bootstrap',
                    msgClass: 'n-right',
                    stopOnError: true,
                    display: function (elem) {
                        return $(elem).closest('.form-group').find(".control-label").text().replace(/\:/, '');
                    },
                    dataFilter: function (data) {
                        if (data.code === 1) {
                            return data.msg ? {"ok": data.msg} : '';
                        } else {
                            return data.msg;
                        }
                    },
                    target: function (input) {
                        var target = $(input).data("target");
                        if (target && $(target).size() > 0) {
                            return $(target);
                        }
                        var $formitem = $(input).closest('.form-group'),
                            $msgbox = $formitem.find('span.msg-box');
                        if (!$msgbox.length) {
                            return [];
                        }
                        return $msgbox;
                    },
                    valid: function (ret) {
                        var that = this, submitBtn = $(".layer-footer [type=submit]", form);
                        that.holdSubmit(true);
                        submitBtn.addClass("disabled");
                        //验证通过提交表单
                        var submitResult = Form.api.submit($(ret), function (data, ret) {
                            that.holdSubmit(false);
                            submitBtn.removeClass("disabled");
                            if (false === $(this).triggerHandler("success.form", [data, ret])) {
                                return false;
                            }
                            if (typeof success === 'function') {
                                if (false === success.call($(this), data, ret)) {
                                    return false;
                                }
                            }
                            //提示及关闭当前窗口
                            var msg = ret.hasOwnProperty("msg") && ret.msg !== "" ? ret.msg : __('Operation completed');
                            parent.Toastr.success(msg);
                            parent.$(".btn-refresh").trigger("click");
                            var index = parent.Layer.getFrameIndex(window.name);
                            parent.Layer.close(index);
                            return false;
                        }, function (data, ret) {
                            that.holdSubmit(false);
                            if (false === $(this).triggerHandler("error.form", [data, ret])) {
                                return false;
                            }
                            submitBtn.removeClass("disabled");
                            if (typeof error === 'function') {
                                if (false === error.call($(this), data, ret)) {
                                    return false;
                                }
                            }
                        }, submit);
                        //如果提交失败则释放锁定
                        if (!submitResult) {
                            that.holdSubmit(false);
                            submitBtn.removeClass("disabled");
                        }
                        return false;
                    }
                }, form.data("validator-options") || {}));

                //移除提交按钮的disabled类
                $(".layer-footer [type=submit],.fixed-footer [type=submit],.normal-footer [type=submit]", form).removeClass("disabled");
                //自定义关闭按钮事件
                form.on("click", ".layer-close", function () {
                    var index = parent.Layer.getFrameIndex(window.name);
                    parent.Layer.close(index);
                    return false;
                });
            },
            selectpicker: function (form) {
                //绑定select元素事件
                if ($(".selectpicker", form).size() > 0) {
                    require(['bootstrap-select', 'bootstrap-select-lang'], function () {
                        $('.selectpicker', form).selectpicker();
                        $(form).on("reset", function () {
                            setTimeout(function () {
                                $('.selectpicker').selectpicker('refresh').trigger("change");
                            }, 1);
                        });
                    });
                }
            },
            selectpage: function (form) {
                //绑定selectpage元素事件
                if ($(".selectpage", form).size() > 0) {
                    require(['selectpage'], function () {
                        $('.selectpage', form).selectPage({
                            eAjaxSuccess: function (data) {
                                data.list = typeof data.rows !== 'undefined' ? data.rows : (typeof data.list !== 'undefined' ? data.list : []);
                                data.totalRow = typeof data.total !== 'undefined' ? data.total : (typeof data.totalRow !== 'undefined' ? data.totalRow : data.list.length);
                                return data;
                            }
                        });
                    });
                    //给隐藏的元素添加上validate验证触发事件
                    $(document).on("change", ".sp_hidden", function () {
                        $(this).trigger("validate");
                    });
                    $(document).on("change", ".sp_input", function () {
                        $(this).closest(".sp_container").find(".sp_hidden").trigger("change");
                    });
                    $(form).on("reset", function () {
                        setTimeout(function () {
                            $('.selectpage', form).selectPageClear();
                        }, 1);
                    });
                }
            },
            cxselect: function (form) {
                //绑定cxselect元素事件
                if ($("[data-toggle='cxselect']", form).size() > 0) {
                    require(['cxselect'], function () {
                        $.cxSelect.defaults.jsonName = 'name';
                        $.cxSelect.defaults.jsonValue = 'value';
                        $.cxSelect.defaults.jsonSpace = 'data';
                        $("[data-toggle='cxselect']", form).cxSelect();
                    });
                }
            },
            citypicker: function (form) {
                //绑定城市远程插件
                if ($("[data-toggle='city-picker']", form).size() > 0) {
                    require(['citypicker'], function () {
                        $(form).on("reset", function () {
                            setTimeout(function () {
                                $("[data-toggle='city-picker']").citypicker('refresh');
                            }, 1);
                        });
                    });
                }
            },
            datetimepicker: function (form) {
                //绑定日期时间元素事件
                if ($(".datetimepicker", form).size() > 0) {
                    require(['bootstrap-datetimepicker'], function () {
                        var options = {
                            format: 'YYYY-MM-DD HH:mm:ss',
                            icons: {
                                time: 'fa fa-clock-o',
                                date: 'fa fa-calendar',
                                up: 'fa fa-chevron-up',
                                down: 'fa fa-chevron-down',
                                previous: 'fa fa-chevron-left',
                                next: 'fa fa-chevron-right',
                                today: 'fa fa-history',
                                clear: 'fa fa-trash',
                                close: 'fa fa-remove'
                            },
                            showTodayButton: true,
                            showClose: true
                        };
                        $('.datetimepicker', form).parent().css('position', 'relative');
                        $('.datetimepicker', form).datetimepicker(options).on('dp.change', function (e) {
                            $(this, document).trigger("changed");
                        });
                    });
                }
            },
            daterangepicker: function (form) {
                //绑定日期时间元素事件
                if ($(".datetimerange", form).size() > 0) {
                    require(['bootstrap-daterangepicker'], function () {
                        var ranges = {};
                        ranges[__('Today')] = [Moment().startOf('day'), Moment().endOf('day')];
                        ranges[__('Yesterday')] = [Moment().subtract(1, 'days').startOf('day'), Moment().subtract(1, 'days').endOf('day')];
                        ranges[__('Last 7 Days')] = [Moment().subtract(6, 'days').startOf('day'), Moment().endOf('day')];
                        ranges[__('Last 30 Days')] = [Moment().subtract(29, 'days').startOf('day'), Moment().endOf('day')];
                        ranges[__('This Month')] = [Moment().startOf('month'), Moment().endOf('month')];
                        ranges[__('Last Month')] = [Moment().subtract(1, 'month').startOf('month'), Moment().subtract(1, 'month').endOf('month')];
                        var options = {
                            timePicker: false,
                            autoUpdateInput: false,
                            timePickerSeconds: true,
                            timePicker24Hour: true,
                            autoApply: true,
                            locale: {
                                format: 'YYYY-MM-DD HH:mm:ss',
                                customRangeLabel: __("Custom Range"),
                                applyLabel: __("Apply"),
                                cancelLabel: __("Clear"),
                            },
                            ranges: ranges,
                        };
                        var origincallback = function (start, end) {
                            $(this.element).val(start.format(this.locale.format) + " - " + end.format(this.locale.format));
                            $(this.element).trigger('blur');
                        };
                        $(".datetimerange", form).each(function () {
                            var callback = typeof $(this).data('callback') == 'function' ? $(this).data('callback') : origincallback;
                            $(this).on('apply.daterangepicker', function (ev, picker) {
                                callback.call(picker, picker.startDate, picker.endDate);
                            });
                            $(this).on('cancel.daterangepicker', function (ev, picker) {
                                $(this).val('').trigger('blur');
                            });
                            $(this).daterangepicker($.extend(true, options, $(this).data()), callback);
                        });
                    });
                }
            },
            /**
             * 绑定上传事件
             * @param form
             * @deprecated Use faupload instead.
             */
            plupload: function (form) {
                Form.events.faupload(form);
            },
            /**
             * 绑定上传事件
             * @param form
             */
            faupload: function (form) {
                //绑定上传元素事件
                if ($(".plupload,.faupload", form).size() > 0) {
                    Upload.api.upload($(".plupload,.faupload", form));
                }
            },
            faselect: function (form) {
                //绑定fachoose选择附件事件
                if ($(".faselect,.fachoose", form).size() > 0) {
                    $(".faselect,.fachoose", form).on('click', function () {
                        var that = this;
                        var multiple = $(this).data("multiple") ? $(this).data("multiple") : false;
                        var mimetype = $(this).data("mimetype") ? $(this).data("mimetype") : '';
                        var admin_id = $(this).data("admin-id") ? $(this).data("admin-id") : '';
                        var user_id = $(this).data("user-id") ? $(this).data("user-id") : '';
                        var url = $(this).data("url") ? $(this).data("url") : (typeof Backend !== 'undefined' ? "general/attachment/select" : "user/attachment");
                        parent.Fast.api.open(url + "?element_id=" + $(this).attr("id") + "&multiple=" + multiple + "&mimetype=" + mimetype + "&admin_id=" + admin_id + "&user_id=" + user_id, __('Choose'), {
                            callback: function (data) {
                                var button = $("#" + $(that).attr("id"));
                                var maxcount = $(button).data("maxcount");
                                var input_id = $(button).data("input-id") ? $(button).data("input-id") : "";
                                maxcount = typeof maxcount !== "undefined" ? maxcount : 0;
                                if (input_id && data.multiple) {
                                    var urlArr = [];
                                    var inputObj = $("#" + input_id);
                                    var value = $.trim(inputObj.val());
                                    if (value !== "") {
                                        urlArr.push(inputObj.val());
                                    }
                                    urlArr.push(data.url)
                                    var result = urlArr.join(",");
                                    if (maxcount > 0) {
                                        var nums = value === '' ? 0 : value.split(/\,/).length;
                                        var files = data.url !== "" ? data.url.split(/\,/) : [];
                                        var remains = maxcount - nums;
                                        if (files.length > remains) {
                                            Toastr.error(__('You can choose up to %d file%s', remains));
                                            return false;
                                        }
                                    }
                                    inputObj.val(result).trigger("change").trigger("validate");
                                } else {
                                    $("#" + input_id).val(data.url).trigger("change").trigger("validate");
                                }
                            }
                        });
                        return false;
                    });
                }
            },
            fieldlist: function (form) {
                //绑定fieldlist
                if ($(".fieldlist", form).size() > 0) {
                    require(['dragsort', 'template'], function (undefined, Template) {
                        //刷新隐藏textarea的值
                        var refresh = function (name) {
                            var data = {};
                            var textarea = $("textarea[name='" + name + "']", form);
                            var container = $(".fieldlist[data-name='" + name + "']");
                            var template = container.data("template");
                            $.each($("input,select,textarea", container).serializeArray(), function (i, j) {
                                var reg = /\[(\w+)\]\[(\w+)\]$/g;
                                var match = reg.exec(j.name);
                                if (!match)
                                    return true;
                                match[1] = "x" + parseInt(match[1]);
                                if (typeof data[match[1]] == 'undefined') {
                                    data[match[1]] = {};
                                }
                                data[match[1]][match[2]] = j.value;
                            });
                            var result = template ? [] : {};
                            $.each(data, function (i, j) {
                                if (j) {
                                    if (!template) {
                                        if (j.key != '') {
                                            result[j.key] = j.value;
                                        }
                                    } else {
                                        result.push(j);
                                    }
                                }
                            });
                            textarea.val(JSON.stringify(result));
                        };
                        //监听文本框改变事件
                        $(document).on('change keyup changed', ".fieldlist input,.fieldlist textarea,.fieldlist select", function () {
                            refresh($(this).closest(".fieldlist").data("name"));
                        });
                        //追加控制
                        $(".fieldlist", form).on("click", ".btn-append,.append", function (e, row) {
                            var container = $(this).closest(".fieldlist");
                            var tagName = container.data("tag") || (container.is("table") ? "tr" : "dd");
                            var index = container.data("index");
                            var name = container.data("name");
                            var template = container.data("template");
                            var data = container.data();
                            index = index ? parseInt(index) : 0;
                            container.data("index", index + 1);
                            row = row ? row : {};
                            var vars = {index: index, name: name, data: data, row: row};
                            var html = template ? Template(template, vars) : Template.render(Form.config.fieldlisttpl, vars);
                            $(html).attr("fieldlist-item", true).insertBefore($(tagName + ":last", container));
                            $(this).trigger("fa.event.appendfieldlist", $(this).closest(tagName).prev());
                        });
                        //移除控制
                        $(".fieldlist", form).on("click", ".btn-remove", function () {
                            var container = $(this).closest(".fieldlist");
                            var tagName = container.data("tag") || (container.is("table") ? "tr" : "dd");
                            $(this).closest(tagName).remove();
                            refresh(container.data("name"));
                        });
                        //渲染数据&拖拽排序
                        $(".fieldlist", form).each(function () {
                            var container = this;
                            var tagName = $(this).data("tag") || ($(this).is("table") ? "tr" : "dd");
                            $(this).dragsort({
                                itemSelector: tagName,
                                dragSelector: ".btn-dragsort",
                                dragEnd: function () {
                                    refresh($(this).closest(".fieldlist").data("name"));
                                },
                                placeHolderTemplate: $("<" + tagName + "/>")
                            });
                            var textarea = $("textarea[name='" + $(this).data("name") + "']", form);
                            if (textarea.val() == '') {
                                return true;
                            }
                            var template = $(this).data("template");
                            textarea.on("fa.event.refreshfieldlist", function () {
                                $("[fieldlist-item]", container).remove();
                                var json = {};
                                try {
                                    json = JSON.parse($(this).val());
                                } catch (e) {
                                }
                                $.each(json, function (i, j) {
                                    $(".btn-append,.append", container).trigger('click', template ? j : {
                                        key: i, value: j
                                    });
                                });
                            });
                            textarea.trigger("fa.event.refreshfieldlist");
                        });
                    });
                }
            },
            switcher: function (form) {
                form.on("click", "[data-toggle='switcher']", function () {
                    if ($(this).hasClass("disabled")) {
                        return false;
                    }
                    var switcher = $.proxy(function () {
                        var input = $(this).prev("input");
                        input = $(this).data("input-id") ? $("#" + $(this).data("input-id")) : input;
                        if (input.size() > 0) {
                            var yes = $(this).data("yes");
                            var no = $(this).data("no");
                            if (input.val() == yes) {
                                input.val(no);
                                $("i", this).addClass("fa-flip-horizontal text-gray");
                            } else {
                                input.val(yes);
                                $("i", this).removeClass("fa-flip-horizontal text-gray");
                            }
                            input.trigger('change');
                        }
                    }, this);
                    if (typeof $(this).data("confirm") !== 'undefined') {
                        Layer.confirm($(this).data("confirm"), function (index) {
                            switcher();
                            Layer.close(index);
                        });
                    } else {
                        switcher();
                    }

                    return false;
                });
            },
            bindevent: function (form) {

            },
            slider: function (form) {
                if ($(".slider", form).size() > 0) {
                    require(['bootstrap-slider'], function () {
                        $('.slider').removeClass('hidden').css('width', function (index, value) {
                            return $(this).parents('.form-control').width();
                        }).slider().on('slide', function (ev) {
                            var data = $(this).data();
                            if (typeof data.unit !== 'undefined') {
                                $(this).parents('.form-control').siblings('.value').text(ev.value + data.unit);
                            }
                        });
                    });
                }
            }
        },
        api: {
            submit: function (form, success, error, submit) {
                if (form.size() === 0) {
                    Toastr.error("表单未初始化完成,无法提交");
                    return false;
                }
                if (typeof submit === 'function') {
                    if (false === submit.call(form, success, error)) {
                        return false;
                    }
                }
                var type = form.attr("method") ? form.attr("method").toUpperCase() : 'GET';
                type = type && (type === 'GET' || type === 'POST') ? type : 'GET';
                url = form.attr("action");
                url = url ? url : location.href;
                //修复当存在多选项元素时提交的BUG
                var params = {};
                var multipleList = $("[name$='[]']", form);
                if (multipleList.size() > 0) {
                    var postFields = form.serializeArray().map(function (obj) {
                        return $(obj).prop("name");
                    });
                    $.each(multipleList, function (i, j) {
                        if (postFields.indexOf($(this).prop("name")) < 0) {
                            params[$(this).prop("name")] = '';
                        }
                    });
                }
                //调用Ajax请求方法
                Fast.api.ajax({
                    type: type,
                    url: url,
                    data: form.serialize() + (Object.keys(params).length > 0 ? '&' + $.param(params) : ''),
                    dataType: 'json',
                    complete: function (xhr) {
                        var token = xhr.getResponseHeader('__token__');
                        if (token) {
                            $("input[name='__token__']").val(token);
                        }
                    }
                }, function (data, ret) {
                    $('.form-group', form).removeClass('has-feedback has-success has-error');
                    if (data && typeof data === 'object') {
                        //刷新客户端token
                        if (typeof data.token !== 'undefined') {
                            $("input[name='__token__']").val(data.token);
                        }
                        //调用客户端事件
                        if (typeof data.callback !== 'undefined' && typeof data.callback === 'function') {
                            data.callback.call(form, data);
                        }
                    }
                    if (typeof success === 'function') {
                        if (false === success.call(form, data, ret)) {
                            return false;
                        }
                    }
                }, function (data, ret) {
                    if (data && typeof data === 'object' && typeof data.token !== 'undefined') {
                        $("input[name='__token__']").val(data.token);
                    }
                    if (typeof error === 'function') {
                        if (false === error.call(form, data, ret)) {
                            return false;
                        }
                    }
                });
                return true;
            },
            bindevent: function (form, success, error, submit) {

                form = typeof form === 'object' ? form : $(form);

                var events = Form.events;

                events.bindevent(form);

                events.validator(form, success, error, submit);

                events.selectpicker(form);

                events.daterangepicker(form);

                events.selectpage(form);

                events.cxselect(form);

                events.citypicker(form);

                events.datetimepicker(form);

                events.faupload(form);

                events.faselect(form);

                events.fieldlist(form);

                events.slider(form);

                events.switcher(form);
            },
            custom: {}
        },
    };
    return Form;
});

/**
 * FastAdmin通用搜索
 *
 * @author: pppscn <35696959@qq.com>
 * @update 2017-05-07 <https://gitee.com/pp/fastadmin>
 *
 * @author: Karson <karsonzhang@163.com>
 * @update 2018-04-05 <https://gitee.com/karson/fastadmin>
 */

!function ($) {
    'use strict';

    var ColumnsForSearch = [];

    var sprintf = $.fn.bootstrapTable.utils.sprintf;

    var initCommonSearch = function (pColumns, that) {
        var vFormCommon = createFormCommon(pColumns, that);

        var vModal = sprintf("<div class=\"commonsearch-table %s\">", that.options.searchFormVisible ? "" : "hidden");
        vModal += vFormCommon;
        vModal += "</div>";
        that.$container.prepend($(vModal));
        that.$commonsearch = $(".commonsearch-table", that.$container);
        var form = $("form.form-commonsearch", that.$commonsearch);

        require(['form'], function (Form) {
            Form.api.bindevent(form);
            form.validator("destroy");
        });

        // 表单提交
        form.on("submit", function (event) {
            event.preventDefault();
            that.onCommonSearch();
            return false;
        });

        // 重置搜索
        form.on("click", "button[type=reset]", function (event) {
            form[0].reset();
            setTimeout(function () {
                that.onCommonSearch();
            }, 0);
        });

    };

    var createFormCommon = function (pColumns, that) {
        // 如果有使用模板则直接返回模板的内容
        if (that.options.searchFormTemplate) {
            return Template(that.options.searchFormTemplate, {columns: pColumns, table: that});
        }
        var htmlForm = [];
        htmlForm.push(sprintf('<form class="form-horizontal form-commonsearch" novalidate method="post" action="%s" >', that.options.actionForm));
        htmlForm.push('<fieldset>');
        if (that.options.titleForm.length > 0)
            htmlForm.push(sprintf("<legend>%s</legend>", that.options.titleForm));
        htmlForm.push('<div class="row">');
        for (var i in pColumns) {
            var vObjCol = pColumns[i];
            if (!vObjCol.checkbox && vObjCol.field !== 'operate' && vObjCol.searchable && vObjCol.operate !== false) {
                var query = Fast.api.query(vObjCol.field);
                var operate = Fast.api.query(vObjCol.field + "-operate");

                var renderDefault = that.options.renderDefault && (typeof vObjCol.renderDefault == 'undefined' || vObjCol.renderDefault);
                vObjCol.defaultValue = renderDefault && query ? query : (typeof vObjCol.defaultValue === 'undefined' ? '' : vObjCol.defaultValue);
                vObjCol.operate = renderDefault && operate ? operate : (typeof vObjCol.operate === 'undefined' ? '=' : vObjCol.operate);
                ColumnsForSearch.push(vObjCol);

                htmlForm.push('<div class="form-group col-xs-12 col-sm-6 col-md-4 col-lg-3">');
                htmlForm.push(sprintf('<label for="%s" class="control-label col-xs-4">%s</label>', vObjCol.field, vObjCol.title));
                htmlForm.push('<div class="col-xs-8">');

                vObjCol.operate = vObjCol.operate ? vObjCol.operate.toUpperCase() : '=';
                htmlForm.push(sprintf('<input type="hidden" class="form-control operate" name="%s-operate" data-name="%s" value="%s" readonly>', vObjCol.field, vObjCol.field, vObjCol.operate));

                var addClass = typeof vObjCol.addClass === 'undefined' ? (typeof vObjCol.addclass === 'undefined' ? 'form-control' : 'form-control ' + vObjCol.addclass) : 'form-control ' + vObjCol.addClass;
                var extend = typeof vObjCol.extend === 'undefined' ? '' : vObjCol.extend;
                var style = typeof vObjCol.style === 'undefined' ? '' : sprintf('style="%s"', vObjCol.style);
                extend = typeof vObjCol.data !== 'undefined' && extend == '' ? vObjCol.data : extend;
                extend = typeof vObjCol.autocomplete !== 'undefined' ? extend + ' autocomplete="' + (vObjCol.autocomplete === false || vObjCol.autocomplete === 'off' ? 'off' : 'on') + '"' : extend;
                if (vObjCol.searchList) {
                    if (typeof vObjCol.searchList === 'function') {
                        htmlForm.push(vObjCol.searchList.call(this, vObjCol));
                    } else {
                        var optionList = [sprintf('<option value="">%s</option>', that.options.formatCommonChoose())];
                        if (typeof vObjCol.searchList === 'object' && typeof vObjCol.searchList.then === 'function') {
                            (function (vObjCol, that) {
                                $.when(vObjCol.searchList).done(function (ret) {
                                    var searchList = [];
                                    if (ret.data && ret.data.searchlist && $.isArray(ret.data.searchlist)) {
                                        searchList = ret.data.searchlist;
                                    } else if (ret.constructor === Array || ret.constructor === Object) {
                                        searchList = ret;
                                    }
                                    var optionList = createOptionList(searchList, vObjCol, that);
                                    $("form.form-commonsearch select[name='" + vObjCol.field + "']", that.$container).html(optionList.join('')).trigger("change");
                                });
                            })(vObjCol, that);
                        } else {
                            optionList = createOptionList(vObjCol.searchList, vObjCol, that);
                        }
                        htmlForm.push(sprintf('<select class="%s" name="%s" %s %s>%s</select>', addClass, vObjCol.field, style, extend, optionList.join('')));
                    }
                } else {
                    var placeholder = typeof vObjCol.placeholder === 'undefined' ? vObjCol.title : vObjCol.placeholder;
                    var type = typeof vObjCol.type === 'undefined' ? 'text' : vObjCol.type;
                    var defaultValue = typeof vObjCol.defaultValue === 'undefined' ? '' : vObjCol.defaultValue;
                    if (/BETWEEN$/.test(vObjCol.operate)) {
                        var defaultValueArr = defaultValue.toString().match(/\|/) ? defaultValue.split('|') : ['', ''];
                        var placeholderArr = placeholder.toString().match(/\|/) ? placeholder.split('|') : [placeholder, placeholder];
                        htmlForm.push('<div class="row row-between">');
                        htmlForm.push(sprintf('<div class="col-xs-6"><input type="%s" class="%s" name="%s" value="%s" placeholder="%s" id="%s-min" data-index="%s" %s %s></div>', type, addClass, vObjCol.field, defaultValueArr[0], placeholderArr[0], vObjCol.field, i, style, extend));
                        htmlForm.push(sprintf('<div class="col-xs-6"><input type="%s" class="%s" name="%s" value="%s" placeholder="%s" id="%s-max" data-index="%s" %s %s></div>', type, addClass, vObjCol.field, defaultValueArr[1], placeholderArr[1], vObjCol.field, i, style, extend));
                        htmlForm.push('</div>');
                    } else {
                        htmlForm.push(sprintf('<input type="%s" class="%s" name="%s" value="%s" placeholder="%s" id="%s" data-index="%s" %s %s>', type, addClass, vObjCol.field, defaultValue, placeholder, vObjCol.field, i, style, extend));
                    }
                }

                htmlForm.push('</div>');
                htmlForm.push('</div>');
            }
        }
        htmlForm.push('<div class="form-group col-xs-12 col-sm-6 col-md-4 col-lg-3">');
        htmlForm.push(createFormBtn(that).join(''));
        htmlForm.push('</div>');
        htmlForm.push('</div>');
        htmlForm.push('</fieldset>');
        htmlForm.push('</form>');

        return htmlForm.join('');
    };

    var createFormBtn = function (that) {
        var htmlBtn = [];
        var searchSubmit = that.options.formatCommonSubmitButton();
        var searchReset = that.options.formatCommonResetButton();
        htmlBtn.push('<div class="col-sm-8 col-xs-offset-4">');
        htmlBtn.push(sprintf('<button type="submit" class="btn btn-success" formnovalidate>%s</button> ', searchSubmit));
        htmlBtn.push(sprintf('<button type="reset" class="btn btn-default" >%s</button> ', searchReset));
        htmlBtn.push('</div>');
        return htmlBtn;
    };

    var createOptionList = function (searchList, vObjCol, that) {
        var isArray = searchList.constructor === Array;
        var optionList = [];
        optionList.push(sprintf('<option value="">%s</option>', that.options.formatCommonChoose()));
        $.each(searchList, function (key, value) {
            if (value.constructor === Object) {
                key = value.id;
                value = value.name;
            } else {
                key = isArray ? value : key;
            }
            optionList.push(sprintf("<option value='" + key + "' %s>" + value + "</option>", key == vObjCol.defaultValue ? 'selected' : ''));
        });
        return optionList;
    };

    var isSearchAvailble = function (that) {

        //只支持服务端搜索
        if (!that.options.commonSearch || that.options.sidePagination != 'server' || !that.options.url) {
            return false;
        }

        return true;
    };

    var getSearchQuery = function (that, removeempty) {
        var op = {};
        var filter = {};
        var value = '';
        $("form.form-commonsearch .operate", that.$commonsearch).each(function (i) {
            var name = $(this).data("name");
            var sym = $(this).is("select") ? $("option:selected", this).val() : $(this).val().toUpperCase();
            var obj = $("[name='" + name + "']", that.$commonsearch);
            if (obj.size() == 0)
                return true;
            var vObjCol = ColumnsForSearch[i];
            var process = !that.options.searchFormTemplate && vObjCol && typeof vObjCol.process == 'function' ? vObjCol.process : null;
            if (obj.size() > 1) {
                if (/BETWEEN$/.test(sym)) {
                    var value_begin = $.trim($("[name='" + name + "']:first", that.$commonsearch).val()),
                        value_end = $.trim($("[name='" + name + "']:last", that.$commonsearch).val());
                    if (value_begin.length || value_end.length) {
                        if (process) {
                            value_begin = process(value_begin, 'begin');
                            value_end = process(value_end, 'end');
                        }
                        value = value_begin + ',' + value_end;
                    } else {
                        value = '';
                    }
                    //如果是时间筛选，将operate置为RANGE
                    if ($("[name='" + name + "']:first", that.$commonsearch).hasClass("datetimepicker")) {
                        sym = 'RANGE';
                    }
                } else {
                    value = $("[name='" + name + "']:checked", that.$commonsearch).val();
                    value = process ? process(value) : value;
                }
            } else {
                value = process ? process(obj.val()) : obj.val();
            }
            if (removeempty && (value == '' || value == null || ($.isArray(value) && value.length == 0)) && !sym.match(/null/i)) {
                return true;
            }

            op[name] = sym;
            filter[name] = value;
        });
        return {op: op, filter: filter};
    };

    var getQueryParams = function (params, searchQuery, removeempty) {
        params.filter = typeof params.filter === 'Object' ? params.filter : (params.filter ? JSON.parse(params.filter) : {});
        params.op = typeof params.op === 'Object' ? params.op : (params.op ? JSON.parse(params.op) : {});

        params.filter = $.extend({}, params.filter, searchQuery.filter);
        params.op = $.extend({}, params.op, searchQuery.op);
        //移除empty的值
        if (removeempty) {
            $.each(params.filter, function (i, j) {
                if ((j == '' || j == null || ($.isArray(j) && j.length == 0)) && !params.op[i].match(/null/i)) {
                    delete params.filter[i];
                    delete params.op[i];
                }
            });
        }
        params.filter = JSON.stringify(params.filter);
        params.op = JSON.stringify(params.op);
        return params;
    };

    $.extend($.fn.bootstrapTable.defaults, {
        commonSearch: false,
        titleForm: "Common search",
        actionForm: "",
        searchFormTemplate: "",
        searchFormVisible: true,
        searchClass: 'searchit',
        showSearch: true,
        renderDefault: true,
        onCommonSearch: function (field, text) {
            return false;
        },
        onPostCommonSearch: function (table) {
            return false;
        }
    });

    $.extend($.fn.bootstrapTable.defaults.icons, {
        commonSearchIcon: 'glyphicon-search'
    });

    $.extend($.fn.bootstrapTable.Constructor.EVENTS, {
        'common-search.bs.table': 'onCommonSearch',
        'post-common-search.bs.table': 'onPostCommonSearch'
    });
    $.extend($.fn.bootstrapTable.locales[$.fn.bootstrapTable.defaults.locale], {
        formatCommonSearch: function () {
            return "Common search";
        },
        formatCommonSubmitButton: function () {
            return "Submit";
        },
        formatCommonResetButton: function () {
            return "Reset";
        },
        formatCommonCloseButton: function () {
            return "Close";
        },
        formatCommonChoose: function () {
            return "Choose";
        }
    });

    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales);

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initHeader = BootstrapTable.prototype.initHeader,
        _initToolbar = BootstrapTable.prototype.initToolbar,
        _load = BootstrapTable.prototype.load,
        _initSearch = BootstrapTable.prototype.initSearch;

    BootstrapTable.prototype.initHeader = function () {
        _initHeader.apply(this, Array.prototype.slice.apply(arguments));
        this.$header.find('th[data-field]').each(function (i) {
            var column = $(this).data();
            if (typeof column['width'] !== 'undefined' && column['width'].toString().indexOf("%") === -1) {
                $(".th-inner", this).outerWidth(column['width']);
                $(this).css("max-width", column['width']);
            }
        });
        this.options.stateField = this.header.stateField;
    };
    BootstrapTable.prototype.initToolbar = function () {
        _initToolbar.apply(this, Array.prototype.slice.apply(arguments));

        if (!isSearchAvailble(this)) {
            return;
        }

        var that = this,
            html = [];
        if (that.options.showSearch) {
            html.push(sprintf('<div class="columns-%s pull-%s" style="margin-top:10px;margin-bottom:10px;">', this.options.buttonsAlign, this.options.buttonsAlign));
            html.push(sprintf('<button class="btn btn-default%s' + '" type="button" name="commonSearch" title="%s">', that.options.iconSize === undefined ? '' : ' btn-' + that.options.iconSize, that.options.formatCommonSearch()));
            html.push(sprintf('<i class="%s %s"></i>', that.options.iconsPrefix, that.options.icons.commonSearchIcon))
            html.push('</button></div>');
        }
        if (that.$toolbar.find(".pull-right").size() > 0) {
            $(html.join('')).insertBefore(that.$toolbar.find(".pull-right:first"));
        } else {
            that.$toolbar.append(html.join(''));
        }

        initCommonSearch(that.columns, that);

        that.$toolbar.find('button[name="commonSearch"]')
            .off('click').on('click', function () {
            that.$commonsearch.toggleClass("hidden");
            return;
        });

        that.$container.on("click", "." + that.options.searchClass, function () {
            var obj = $("form [name='" + $(this).data("field") + "']", that.$commonsearch);
            if (obj.size() > 0) {
                var value = $(this).data("value");
                if (obj.is("select")) {
                    $("option[value='" + value + "']", obj).prop("selected", true);
                } else if (obj.size() > 1) {
                    $("form [name='" + $(this).data("field") + "'][value='" + value + "']", that.$commonsearch).prop("checked", true);
                } else {
                    obj.val(value + "");
                }
                obj.trigger("change");
                $("form", that.$commonsearch).trigger("submit");
            }
        });
        var queryParams = that.options.queryParams;
        //匹配默认搜索值
        this.options.queryParams = function (params) {
            return queryParams(getQueryParams(params, getSearchQuery(that, true)));
        };
        this.trigger('post-common-search', that);

    };

    BootstrapTable.prototype.onCommonSearch = function () {
        var searchQuery = getSearchQuery(this);
        this.trigger('common-search', this, searchQuery);
        this.options.pageNumber = 1;
        //this.options.pageSize = $.fn.bootstrapTable.defaults.pageSize;
        this.refresh({});
    };

    BootstrapTable.prototype.load = function (data) {
        _load.apply(this, Array.prototype.slice.apply(arguments));

        if (!isSearchAvailble(this)) {
            return;
        }
    };

    BootstrapTable.prototype.initSearch = function () {
        _initSearch.apply(this, Array.prototype.slice.apply(arguments));

        if (!isSearchAvailble(this)) {
            return;
        }

        var that = this;
        var fp = $.isEmptyObject(this.filterColumnsPartial) ? null : this.filterColumnsPartial;
        this.data = fp ? $.grep(this.data, function (item, i) {
            for (var key in fp) {
                var fval = fp[key].toLowerCase();
                var value = item[key];
                value = $.fn.bootstrapTable.utils.calculateObjectValue(that.header,
                    that.header.formatters[$.inArray(key, that.header.fields)],
                    [value, item, i], value);

                if (!($.inArray(key, that.header.fields) !== -1 &&
                    (typeof value === 'string' || typeof value === 'number') &&
                    (value + '').toLowerCase().indexOf(fval) !== -1)) {
                    return false;
                }
            }
            return true;
        }) : this.data;
    };
}(jQuery);

define("bootstrap-table-commonsearch", ["bootstrap-table"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.$.fn.bootstrapTable.defaults;
    };
}(this)));

/**
 * 将BootstrapTable的行使用自定义的模板来渲染
 * 
 * @author: karson
 * @version: v0.0.1
 *
 * @update 2017-06-24 <http://github.com/karsonzhang/fastadmin>
 */

!function ($) {
    'use strict';

    $.extend($.fn.bootstrapTable.defaults, {
        //是否启用模板渲染
        templateView: false,
        //数据格式化的模板ID或格式函数
        templateFormatter: "itemtpl",
        //添加的父类的class
        templateParentClass: "row row-flex",
        //向table添加的class
        templateTableClass: "table-template",

    });

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
            _initContainer = BootstrapTable.prototype.initContainer,
            _initBody = BootstrapTable.prototype.initBody,
            _initRow = BootstrapTable.prototype.initRow;

    BootstrapTable.prototype.initContainer = function () {
        _initContainer.apply(this, Array.prototype.slice.apply(arguments));
        var that = this;
        if (!that.options.templateView) {
            return;
        }
        that.options.cardView = true;

    };

    BootstrapTable.prototype.initBody = function () {
        var that = this;
        $.extend(that.options, {
            showHeader: !that.options.templateView ? $.fn.bootstrapTable.defaults.showHeader : false,
            showFooter: !that.options.templateView ? $.fn.bootstrapTable.defaults.showFooter : false,
        });
        $(that.$el).toggleClass(that.options.templateTableClass, that.options.templateView);

        _initBody.apply(this, Array.prototype.slice.apply(arguments));

        if (!that.options.templateView) {
            return;
        } else {
            //由于Bootstrap是基于Table的，添加一个父类容器
            $("> *:not(.no-records-found)", that.$body).wrapAll($("<div />").addClass(that.options.templateParentClass));
        }
    };

    BootstrapTable.prototype.initRow = function (item, i, data, parentDom) {
        var that = this;
        //如果未启用则使用原生的initRow方法
        if (!that.options.templateView) {
            return _initRow.apply(that, Array.prototype.slice.apply(arguments));
        }
        var $content = '';
        if (typeof that.options.templateFormatter === 'function') {
            $content = that.options.templateFormatter.call(that, item, i, data);
        } else {
            var Template = require('template');
            $content = Template(that.options.templateFormatter, {item: item, i: i, data: data});
        }
        return $content;
    };

}(jQuery);

define("bootstrap-table-template", ["bootstrap-table","template"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.$.fn.bootstrapTable.defaults;
    };
}(this)));

/**
 * @author Jay <jwang@dizsoft.com>
 */

(function ($) {
    'use strict';
    var sprintf = $.fn.bootstrapTable.utils.sprintf;

    $.extend($.fn.bootstrapTable.defaults, {
        showJumpto: false,
        exportOptions: {}
    });

    $.extend($.fn.bootstrapTable.locales, {
        formatJumpto: function () {
            return 'GO';
        }
    });
    $.extend($.fn.bootstrapTable.defaults, $.fn.bootstrapTable.locales);

    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initPagination = BootstrapTable.prototype.initPagination;

    BootstrapTable.prototype.initPagination = function () {
        this.showToolbar = this.options.showExport;

        _initPagination.apply(this, Array.prototype.slice.apply(arguments));

        if (this.options.showJumpto) {
            var that = this,
                $pageGroup = this.$pagination.find('ul.pagination'),
                $jumpto = $pageGroup.find('li.jumpto');

            if (!$jumpto.length) {
                $jumpto = $([
                    '<li class="jumpto">',
                    '<input type="text" class="form-control">',
                    '<button class="btn' +
                    sprintf(' btn-%s', this.options.buttonsClass) +
                    sprintf(' btn-%s', this.options.iconSize) +
                    '" title="' + this.options.formatJumpto() + '" ' +
                    ' type="button">'+this.options.formatJumpto(),
                    '</button>',
                    '</li>'].join('')).appendTo($pageGroup);

                $jumpto.find('button').click(function () {
                    that.selectPage(parseInt($jumpto.find('input').val()));
                });
            }
        }
    };
})(jQuery);
define("bootstrap-table-jumpto", ["bootstrap-table"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.$.fn.bootstrapTable.defaults;
    };
}(this)));



(function ($) {
    'use strict';
    // Reasonable defaults

    var PIXEL_STEP = 10;
    var LINE_HEIGHT = 40;
    var PAGE_HEIGHT = 800;

    function normalizeWheel(event) {
        var sX = 0; // spinX
        var sY = 0; // spinY
        var pX = 0; // pixelX
        var pY = 0; // pixelY

        // Legacy
        if ('detail' in event) {
            sY = event.detail;
        }
        if ('wheelDelta' in event) {
            sY = -event.wheelDelta / 120;
        }
        if ('wheelDeltaY' in event) {
            sY = -event.wheelDeltaY / 120;
        }
        if ('wheelDeltaX' in event) {
            sX = -event.wheelDeltaX / 120;
        }

        // side scrolling on FF with DOMMouseScroll
        if ('axis' in event && event.axis === event.HORIZONTAL_AXIS) {
            sX = sY;
            sY = 0;
        }

        pX = sX * PIXEL_STEP;
        pY = sY * PIXEL_STEP;

        if ('deltaY' in event) {
            pY = event.deltaY;
        }
        if ('deltaX' in event) {
            pX = event.deltaX;
        }

        if ((pX || pY) && event.deltaMode) {
            if (event.deltaMode === 1) {
                // delta in LINE units
                pX *= LINE_HEIGHT;
                pY *= LINE_HEIGHT;
            } else {
                // delta in PAGE units
                pX *= PAGE_HEIGHT;
                pY *= PAGE_HEIGHT;
            }
        }

        // Fall-back if spin cannot be determined
        if (pX && !sX) {
            sX = pX < 1 ? -1 : 1;
        }
        if (pY && !sY) {
            sY = pY < 1 ? -1 : 1;
        }

        return {
            spinX: sX,
            spinY: sY,
            pixelX: pX,
            pixelY: pY
        };
    }

    var cachedWidth = null;
    var getScrollBarWidth = function getScrollBarWidth() {
        if (cachedWidth === null) {
            var inner = $('<p/>').addClass('fixed-table-scroll-inner'),
                outer = $('<div/>').addClass('fixed-table-scroll-outer'),
                w1 = void 0,
                w2 = void 0;
            outer.append(inner);
            $('body').append(outer);
            w1 = inner[0].offsetWidth;
            outer.css('overflow', 'scroll');
            w2 = inner[0].offsetWidth;

            if (w1 === w2) {
                w2 = outer[0].clientWidth;
            }

            outer.remove();
            cachedWidth = w1 - w2;
        }
        return cachedWidth;
    };
    //获取原本表格体的滑块宽度
    var getTableBodyScrollBarWidth = function getTableBodyScrollBarWidth(tableBody) {
        return tableBody[0].scrollHeight > tableBody[0].clientHeight ? 15 : 0;
    };
    $.extend($.fn.bootstrapTable.defaults, {
        fixedColumns: false,
        fixedNumber: 0,
        fixedRightNumber: 0
    });
    var BootstrapTable = $.fn.bootstrapTable.Constructor,
        _initBody = BootstrapTable.prototype.initBody,
        _initContainer = BootstrapTable.prototype.initContainer,
        _trigger = BootstrapTable.prototype.trigger,
        _hideLoading = BootstrapTable.prototype.hideLoading,
        _updateSelected = BootstrapTable.prototype.updateSelected;

    BootstrapTable.prototype.fixedColumnsSupported = function () {
        var that = this;
        return that.options.fixedColumns && !that.options.detailView && !that.options.cardView;
    };
    BootstrapTable.prototype.initFixedContainer = function () {
        if (!this.fixedColumnsSupported()) {
            return;
        }

        if (this.options.fixedNumber) {
            this.$tableContainer.find('.fixed-columns').size() == 0 && this.$tableContainer.append('<div class="fixed-columns"></div>');
            this.$fixedColumns = this.$tableContainer.find('.fixed-columns');
        }

        if (this.options.fixedRightNumber) {
            this.$tableContainer.find('.fixed-columns-right').size() == 0 && this.$tableContainer.append('<div class="fixed-columns-right"></div>');
            this.$fixedColumnsRight = this.$tableContainer.find('.fixed-columns-right');
        }
    };

    BootstrapTable.prototype.initContainer = function () {
        _initContainer.apply(this, Array.prototype.slice.apply(arguments));
        this.initFixedContainer();
    };

    BootstrapTable.prototype.initBody = function () {
        _initBody.apply(this, Array.prototype.slice.apply(arguments));
        if (!this.fixedColumnsSupported()) {
            return;
        }

        if (this.options.showHeader && this.options.height) {
            return;
        }

        this.initFixedColumnsBody();
        this.initFixedColumnsEvents();
    };

    BootstrapTable.prototype.trigger = function () {
        var that = this;

        _trigger.apply(this, Array.prototype.slice.apply(arguments));
        if (arguments[0] === 'pre-body') {
            //如果上来就是cardView 设置表格高度为auto
            if (this.options.cardView) {
                this.$tableBody.css("height", "auto");
            }
        }
        //监听cardView 显示/隐藏fixed部分
        if (arguments[0] === 'toggle') {
            if (arguments[1]) {
                this.$tableBody.css("height", "auto");
                this.$fixedColumns && this.$fixedColumns.hide();
                this.$fixedColumnsRight && this.$fixedColumnsRight.hide();
            } else {
                this.$tableBody.css("height", "100%");
                this.$fixedColumns && this.$fixedColumns.show();
                this.$fixedColumnsRight && this.$fixedColumnsRight.show();
                this.$fixedHeaderRight.scrollLeft(this.$tableBody.find('table').width());
                this.$fixedBodyRight.scrollLeft(this.$tableBody.find('table').width());
            }
        }
        if (!that.fixedColumnsSupported()) {
            return;
        }
        if (arguments[0] === 'post-header') {
            this.initFixedColumnsHeader();
        } else if (arguments[0] === 'scroll-body') {
            if (this.needFixedColumns && this.options.fixedNumber) {
                this.$fixedBody.scrollTop(this.$tableBody.scrollTop());
            }

            if (this.needFixedColumns && this.options.fixedRightNumber) {
                this.$fixedBodyRight.scrollTop(this.$tableBody.scrollTop());
            }
        } else if (arguments[0] === 'load-success') {
            this.hideLoading();
        }
    };

    BootstrapTable.prototype.updateSelected = function () {
        var that = this;

        _updateSelected.apply(this, Array.prototype.slice.apply(arguments));
        if (!this.fixedColumnsSupported()) {
            return;
        }
        this.$tableBody.find('tr').each(function (i, el) {
            var $el = $(el);
            var index = $el.data('index');
            var classes = $el.attr('class');
            var inputSelector = '[name="' + that.options.selectItemName + '"]';
            var $input = $el.find(inputSelector);
            if (typeof index === 'undefined') {
                return;
            }

            var updateFixedBody = function updateFixedBody($fixedHeader, $fixedBody) {
                var $tr = $fixedBody.find('tr[data-index="' + index + '"]');
                $tr.attr('class', classes);

                if ($input.length) {
                    $tr.find(inputSelector).prop('checked', $input.prop('checked'));
                }
                if (that.$selectAll.length) {
                    $fixedHeader.add($fixedBody).find('[name="btSelectAll"]').prop('checked', that.$selectAll.prop('checked'));
                }
            };
            if (that.$fixedBody && that.options.fixedNumber) {
                updateFixedBody(that.$fixedHeader, that.$fixedBody);
            }

            if (that.$fixedBodyRight && that.options.fixedRightNumber) {
                updateFixedBody(that.$fixedHeaderRight, that.$fixedBodyRight);
            }
        });
    };

    BootstrapTable.prototype.hideLoading = function () {
        _hideLoading.apply(this, Array.prototype.slice.apply(arguments));
        if (this.needFixedColumns && this.options.fixedNumber) {
            this.$fixedColumns.find('.fixed-table-loading').hide();
        }

        if (this.needFixedColumns && this.options.fixedRightNumber) {
            this.$fixedColumnsRight.find('.fixed-table-loading').hide();
        }
    };

    BootstrapTable.prototype.initFixedColumnsHeader = function () {
        var that = this;

        if (this.options.height) {
            this.needFixedColumns = this.$tableHeader.outerWidth(true) < this.$tableHeader.find('table').outerWidth(true);
        } else {
            this.needFixedColumns = this.$tableBody.outerWidth(true) < this.$tableBody.find('table').outerWidth(true);
        }

        var initFixedHeader = function initFixedHeader($fixedColumns, isRight) {
            $fixedColumns.find('.fixed-table-header').remove();
            $fixedColumns.append(that.$tableHeader.clone(true));
            $fixedColumns.find('.fixed-table-header').css('margin-right', "");
            $fixedColumns.css({
                width: that.getFixedColumnsWidth(isRight)
            });
            return $fixedColumns.find('.fixed-table-header');
        };

        if (this.needFixedColumns && this.options.fixedNumber) {
            this.$fixedHeader = initFixedHeader(this.$fixedColumns);
            this.$fixedHeader.css('margin-right', '');
        } else if (this.$fixedColumns) {
            this.$fixedColumns.html('').css('width', '');
        }

        if (this.needFixedColumns && this.options.fixedRightNumber) {
            this.$fixedHeaderRight = initFixedHeader(this.$fixedColumnsRight, true);
            this.$fixedHeaderRight.scrollLeft(this.$fixedHeaderRight.find('table').width());
        } else if (this.$fixedColumnsRight) {
            this.$fixedColumnsRight.html('').css('width', '');
        }

        this.initFixedColumnsBody();
        this.initFixedColumnsEvents();
    };

    BootstrapTable.prototype.initFixedColumnsBody = function () {
        var that = this;

        var initFixedBody = function initFixedBody($fixedColumns, $fixedHeader) {
            $fixedColumns.find('.fixed-table-body').remove();
            $fixedColumns.append(that.$tableBody.clone(true));

            var $fixedBody = $fixedColumns.find('.fixed-table-body');

            var tableBody = that.$tableBody.get(0);
            var scrollHeight = tableBody.scrollWidth > tableBody.clientWidth ? getScrollBarWidth() : 0;
            var paginationHeight = $(".fixed-table-pagination").height();
            if (typeof that.options.height !== 'undefined') paginationHeight = 0;
            var height = that.$tableContainer.outerHeight(true) - scrollHeight - paginationHeight + 1;
            $fixedColumns.css({
                height: height
            });

            $fixedBody.css({
                height: height - $fixedHeader.height()
            });

            return $fixedBody;
        };

        if (this.needFixedColumns && this.options.fixedNumber) {
            this.$fixedBody = initFixedBody(this.$fixedColumns, this.$fixedHeader);
        }
        if (this.needFixedColumns && this.options.fixedRightNumber) {
            this.$fixedBodyRight = initFixedBody(this.$fixedColumnsRight, this.$fixedHeaderRight);
            this.$fixedBodyRight.scrollLeft(this.$fixedBodyRight.find('table').width());
            this.$fixedBodyRight.css('overflow-y', 'hidden');
        }
    };

    BootstrapTable.prototype.getFixedColumnsWidth = function (isRight) {

        var visibleFields = this.getVisibleFields();
        var width = 0;
        var fixedNumber = this.options.fixedNumber;
        var marginRight = 0;

        if (isRight) {
            visibleFields = visibleFields.reverse();
            fixedNumber = this.options.fixedRightNumber;
            //右侧固定列距离
            this.$fixedColumnsRight.css('right', getTableBodyScrollBarWidth(this.$tableBody));
        }

        for (var i = 0; i < fixedNumber; i++) {
            width += this.$header.find('th[data-field="' + visibleFields[i] + '"]').outerWidth();
        }

        return width + 1;
    };

    BootstrapTable.prototype.initFixedColumnsEvents = function () {
        var that = this;

        var toggleHover = function toggleHover(e, toggle) {
            var tr = 'tr[data-index="' + $(e.currentTarget).data('index') + '"]';
            var $trs = that.$tableBody.find(tr);

            if (that.$fixedBody) {
                $trs = $trs.add(that.$fixedBody.find(tr));
            }
            if (that.$fixedBodyRight) {
                $trs = $trs.add(that.$fixedBodyRight.find(tr));
            }

            $trs.css('background-color', toggle ? $(e.currentTarget).css('background-color') : '');
        };
        this.$tableBody.find('tr').hover(function (e) {
            toggleHover(e, true);
        }, function (e) {
            toggleHover(e, false);
        });
        var isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        var mousewheel = isFirefox ? 'DOMMouseScroll' : 'mousewheel';
        var updateScroll = function updateScroll(e, fixedBody) {
            var normalized = normalizeWheel(e);
            var deltaY = Math.ceil(normalized.pixelY);
            var top = that.$tableBody.scrollTop() + deltaY;
            if (deltaY < 0 && top > 0 || deltaY > 0 && top < fixedBody.scrollHeight - fixedBody.clientHeight) {
                e.preventDefault();
            }

            that.$tableBody.scrollTop(top);
            if (that.$fixedBody) {
                that.$fixedBody.scrollTop(top);
            }
            if (that.$fixedBodyRight) {
                that.$fixedBodyRight.scrollTop(top);
            }
        };
        if (this.needFixedColumns && this.options.fixedNumber) {
            this.$fixedBody.find('tr').hover(function (e) {
                toggleHover(e, true);
            }, function (e) {
                toggleHover(e, false);
            });
            this.$fixedBody[0].addEventListener(mousewheel, function (e) {
                //给鼠标滑轮绑定事件
                updateScroll(e, that.$fixedBody[0]);
            });
        }
        //给原本表格绑定scroll事件
        $('div.fixed-table-body').off('scroll'); //给所有的body解绑 scroll
        this.$tableBody.off('scroll').on('scroll', function (e) {
            that.$tableHeader.scrollLeft(0);
            if (that.$tableBody.scrollLeft() > 0) {
                that.$tableHeader.scrollLeft(that.$tableBody.scrollLeft());
                if (that.options.showFooter && !that.options.cardView) {
                    that.$tableFooter.scrollLeft(that.$tableBody.scrollLeft());
                }
            }
            var top = that.$tableBody.scrollTop();
            if (that.$fixedBody) {
                that.$fixedBody.scrollTop(top);
            }
            if (that.$fixedBodyRight) {
                that.$fixedBodyRight.scrollTop(top);
            }
        });

        if (this.needFixedColumns && this.options.fixedRightNumber) {
            this.$fixedBodyRight.find('tr').hover(function (e) {
                toggleHover(e, true);
            }, function (e) {
                toggleHover(e, false);
            });
            this.$fixedBodyRight[0].addEventListener(mousewheel, function (e) {
                //给鼠标滑轮绑定事件
                updateScroll(e, that.$fixedBodyRight[0]);
            });
            //给固定表格的checkbox绑定事件
            this.$fixedBody && this.$fixedBody.find('input[name="' + this.options.selectItemName + '"]').off("click").on('click', function (e) {
                e.stopImmediatePropagation();
                var index = $(e.target).data("index");
                $(that.$selectItem[index]).trigger("click");
            });
        }

        if (this.options.filterControl) {
            $(this.$fixedColumns).off('keyup change').on('keyup change', function (e) {
                var $target = $(e.target);
                var value = $target.val();
                var field = $target.parents('th').data('field');
                var $coreTh = that.$header.find('th[data-field="' + field + '"]');

                if ($target.is('input')) {
                    $coreTh.find('input').val(value);
                } else if ($target.is('select')) {
                    var $select = $coreTh.find('select');
                    $select.find('option[selected]').removeAttr('selected');
                    $select.find('option[value="' + value + '"]').attr('selected', true);
                }

                that.triggerSearch();
            });
        }
    };
})(jQuery);

define("bootstrap-table-fixed-columns", ["bootstrap-table"], (function (global) {
    return function () {
        var ret, fn;
        return ret || global.$.fn.bootstrapTable.defaults;
    };
}(this)));

define('table',['jquery', 'bootstrap', 'moment', 'moment/locale/zh-cn', 'bootstrap-table', 'bootstrap-table-lang', 'bootstrap-table-export', 'bootstrap-table-commonsearch', 'bootstrap-table-template', 'bootstrap-table-jumpto', 'bootstrap-table-fixed-columns'], function ($, undefined, Moment) {
    var Table = {
        list: {},
        // Bootstrap-table 基础配置
        defaults: {
            url: '',
            sidePagination: 'server',
            method: 'get', //请求方法
            toolbar: ".toolbar", //工具栏
            search: true, //是否启用快速搜索
            cache: false,
            commonSearch: true, //是否启用通用搜索
            searchFormVisible: false, //是否始终显示搜索表单
            titleForm: '', //为空则不显示标题，不定义默认显示：普通搜索
            idTable: 'commonTable',
            showExport: true,
            exportDataType: "auto",
            exportTypes: ['json', 'xml', 'csv', 'txt', 'doc', 'excel'],
            exportOptions: {
                fileName: 'export_' + Moment().format("YYYY-MM-DD"),
                preventInjection: false,
                mso: {
                    onMsoNumberFormat: function (cell, row, col) {
                        return !isNaN($(cell).text()) ? '\\@' : '';
                    },
                },
                ignoreColumn: [0, 'operate'] //默认不导出第一列(checkbox)与操作(operate)列
            },
            pageSize: localStorage.getItem("pagesize") || 10,
            pageList: [10, 15, 20, 25, 50, 'All'],
            pagination: true,
            clickToSelect: true, //是否启用点击选中
            dblClickToEdit: true, //是否启用双击编辑
            singleSelect: false, //是否启用单选
            showRefresh: false,
            showJumpto: true,
            locale: Config.language == 'zh-cn' ? 'zh-CN' : 'en-US',
            showToggle: true,
            showColumns: true,
            pk: 'id',
            sortName: 'id',
            sortOrder: 'desc',
            paginationFirstText: __("First"),
            paginationPreText: __("Previous"),
            paginationNextText: __("Next"),
            paginationLastText: __("Last"),
            cardView: false, //卡片视图
            iosCardView: true, //ios卡片视图
            checkOnInit: true, //是否在初始化时判断
            escape: true, //是否对内容进行转义
            fixDropdownPosition: true, //是否修复下拉的定位
            selectedIds: [],
            selectedData: [],
            extend: {
                index_url: '',
                add_url: '',
                edit_url: '',
                del_url: '',
                import_url: '',
                multi_url: '',
                dragsort_url: 'ajax/weigh',
            }
        },
        // Bootstrap-table 列配置
        columnDefaults: {
            align: 'center',
            valign: 'middle',
        },
        config: {
            checkboxtd: 'tbody>tr>td.bs-checkbox',
            toolbar: '.toolbar',
            refreshbtn: '.btn-refresh',
            addbtn: '.btn-add',
            editbtn: '.btn-edit',
            delbtn: '.btn-del',
            importbtn: '.btn-import',
            multibtn: '.btn-multi',
            disabledbtn: '.btn-disabled',
            editonebtn: '.btn-editone',
            restoreonebtn: '.btn-restoreone',
            destroyonebtn: '.btn-destroyone',
            restoreallbtn: '.btn-restoreall',
            destroyallbtn: '.btn-destroyall',
            dragsortfield: 'weigh',
        },
        button: {
            edit: {
                name: 'edit',
                icon: 'fa fa-pencil',
                title: __('Edit'),
                extend: 'data-toggle="tooltip"',
                classname: 'btn btn-xs btn-success btn-editone'
            },
            del: {
                name: 'del',
                icon: 'fa fa-trash',
                title: __('Del'),
                extend: 'data-toggle="tooltip"',
                classname: 'btn btn-xs btn-danger btn-delone'
            },
            dragsort: {
                name: 'dragsort',
                icon: 'fa fa-arrows',
                title: __('Drag to sort'),
                extend: 'data-toggle="tooltip"',
                classname: 'btn btn-xs btn-primary btn-dragsort'
            }
        },
        api: {
            init: function (defaults, columnDefaults, locales) {
                defaults = defaults ? defaults : {};
                columnDefaults = columnDefaults ? columnDefaults : {};
                locales = locales ? locales : {};
                $.fn.bootstrapTable.Constructor.prototype.getSelectItem = function () {
                    return this.$selectItem;
                };
                // 写入bootstrap-table默认配置
                $.extend(true, $.fn.bootstrapTable.defaults, Table.defaults, defaults);
                // 写入bootstrap-table column配置
                $.extend($.fn.bootstrapTable.columnDefaults, Table.columnDefaults, columnDefaults);
                // 写入bootstrap-table locale配置
                $.extend($.fn.bootstrapTable.locales[Table.defaults.locale], {
                    formatCommonSearch: function () {
                        return __('Common search');
                    },
                    formatCommonSubmitButton: function () {
                        return __('Submit');
                    },
                    formatCommonResetButton: function () {
                        return __('Reset');
                    },
                    formatCommonCloseButton: function () {
                        return __('Close');
                    },
                    formatCommonChoose: function () {
                        return __('Choose');
                    },
                    formatJumpto: function () {
                        return __('Go');
                    }
                }, locales);
                // 如果是iOS设备则判断是否启用卡片视图
                if ($.fn.bootstrapTable.defaults.iosCardView && navigator.userAgent.match(/(iPod|iPhone|iPad)/)) {
                    Table.defaults.cardView = true;
                    $.fn.bootstrapTable.defaults.cardView = true;
                }
                if (typeof defaults.exportTypes != 'undefined') {
                    $.fn.bootstrapTable.defaults.exportTypes = defaults.exportTypes;
                }
            },
            // 绑定事件
            bindevent: function (table) {
                //Bootstrap-table的父元素,包含table,toolbar,pagnation
                var parenttable = table.closest('.bootstrap-table');
                //Bootstrap-table配置
                var options = table.bootstrapTable('getOptions');
                //Bootstrap操作区
                var toolbar = $(options.toolbar, parenttable);
                //跨页提示按钮
                var tipsBtn = $(".btn-selected-tips", parenttable);
                if (tipsBtn.size() === 0) {
                    tipsBtn = $('<a href="javascript:" class="btn btn-warning-light btn-selected-tips hide" data-animation="false" data-toggle="tooltip" data-title="' + __("Click to uncheck all") + '"><i class="fa fa-info-circle"></i> ' + __("Multiple selection mode: %s checked", "<b>0</b>") + '</a>').appendTo(toolbar);
                }
                //点击提示按钮
                tipsBtn.off("click").on("click", function (e) {
                    table.trigger("uncheckbox");
                    table.bootstrapTable("refresh");
                });
                //当刷新表格时
                table.on('uncheckbox', function (status, res, e) {
                    options.selectedIds = [];
                    options.selectedData = [];
                    tipsBtn.tooltip('hide');
                    tipsBtn.addClass('hide');
                });
                //表格加载出错时
                table.on('load-error.bs.table', function (status, res, e) {
                    if (e.status === 0) {
                        return;
                    }
                    Toastr.error(__('Unknown data format'));
                });
                //当加载数据成功时
                table.on('load-success.bs.table', function (e, data) {
                    if (typeof data.rows === 'undefined' && typeof data.code != 'undefined') {
                        Toastr.error(data.msg);
                    }
                });
                //当刷新表格时
                table.on('refresh.bs.table', function (e, settings, data) {
                    $(Table.config.refreshbtn, toolbar).find(".fa").addClass("fa-spin");
                });
                //当表格分页变更时
                table.on('page-change.bs.table', function (e, page, pagesize) {
                    if (!isNaN(pagesize)) {
                        localStorage.setItem("pagesize", pagesize);
                    }
                });
                //当执行搜索时
                table.on('search.bs.table common-search.bs.table', function (e, settings, data) {
                    table.trigger("uncheckbox");
                });
                if (options.dblClickToEdit) {
                    //当双击单元格时
                    table.on('dbl-click-row.bs.table', function (e, row, element, field) {
                        $(Table.config.editonebtn, element).trigger("click");
                    });
                }
                //渲染内容前
                table.on('pre-body.bs.table', function (e, data) {
                    if (options.maintainSelected) {
                        $.each(data, function (i, row) {
                            row[options.stateField] = $.inArray(row[options.pk], options.selectedIds) > -1;
                        });
                    }
                });
                //当内容渲染完成后
                table.on('post-body.bs.table', function (e, data) {
                    $(Table.config.refreshbtn, toolbar).find(".fa").removeClass("fa-spin");
                    if ($(Table.config.checkboxtd + ":first", table).find("input[type='checkbox'][data-index]").size() > 0) {
                        // 拖拽选择,需要重新绑定事件
                        require(['drag', 'drop'], function () {
                            var checkboxtd = $(Table.config.checkboxtd, table);
                            checkboxtd.drag("start", function (ev, dd) {
                                return $('<div class="selection" />').css('opacity', .65).appendTo(document.body);
                            }).drag(function (ev, dd) {
                                $(dd.proxy).css({
                                    top: Math.min(ev.pageY, dd.startY),
                                    left: Math.min(ev.pageX, dd.startX),
                                    height: Math.abs(ev.pageY - dd.startY),
                                    width: Math.abs(ev.pageX - dd.startX)
                                });
                            }).drag("end", function (ev, dd) {
                                $(dd.proxy).remove();
                            });
                            checkboxtd.drop("start", function () {
                                Table.api.toggleattr(this);
                            }).drop(function () {
                                // Table.api.toggleattr(this);
                            }).drop("end", function (e) {
                                var that = this;
                                setTimeout(function () {
                                    if (e.type === 'mousemove') {
                                        Table.api.toggleattr(that);
                                    }
                                }, 0);
                            });
                            $.drop({
                                multi: true
                            });
                        });
                    }
                });
                var exportDataType = options.exportDataType;
                // 处理选中筛选框后按钮的状态统一变更
                table.on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table post-body.bs.table', function (e) {
                    var allIds = [];
                    $.each(table.bootstrapTable("getData"), function (i, item) {
                        allIds.push(typeof item[options.pk] != 'undefined' ? item[options.pk] : '');
                    });
                    var selectedIds = Table.api.selectedids(table, true),
                        selectedData = Table.api.selecteddata(table, true);
                    //开启分页checkbox分页记忆
                    if (options.maintainSelected) {
                        options.selectedIds = options.selectedIds.filter(function (element, index, self) {
                            return $.inArray(element, allIds) === -1;
                        }).concat(selectedIds);
                        options.selectedData = options.selectedData.filter(function (element, index, self) {
                            return $.inArray(element[options.pk], allIds) === -1;
                        }).concat(selectedData);
                        if (options.selectedIds.length > selectedIds.length) {
                            $("b", tipsBtn).text(options.selectedIds.length);
                            tipsBtn.removeClass('hide');
                        } else {
                            tipsBtn.addClass('hide');
                        }
                    } else {
                        options.selectedIds = selectedIds;
                        options.selectedData = selectedData;
                    }
                    //如果导出类型为auto时则自动判断
                    if (exportDataType === 'auto') {
                        options.exportDataType = selectedIds.length > 0 ? 'selected' : 'all';
                    }
                    $(Table.config.disabledbtn, toolbar).toggleClass('disabled', !options.selectedIds.length);
                });
                // 绑定TAB事件
                $('.panel-heading [data-field] a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
                    var field = $(this).closest("[data-field]").data("field");
                    var value = $(this).data("value");
                    var object = $("[name='" + field + "']", table.closest(".bootstrap-table").find(".commonsearch-table"));
                    if (object.prop('tagName') == "SELECT") {
                        $("option[value='" + value + "']", object).prop("selected", true);
                    } else {
                        object.val(value);
                    }
                    table.trigger("uncheckbox");
                    table.bootstrapTable('refresh', {pageNumber: 1});
                    return false;
                });
                // 刷新按钮事件
                toolbar.on('click', Table.config.refreshbtn, function () {
                    table.bootstrapTable('refresh');
                });
                // 添加按钮事件
                toolbar.on('click', Table.config.addbtn, function () {
                    var ids = Table.api.selectedids(table);
                    var url = options.extend.add_url;
                    if (url.indexOf("{ids}") !== -1) {
                        url = Table.api.replaceurl(url, {ids: ids.length > 0 ? ids.join(",") : 0}, table);
                    }
                    Fast.api.open(url, $(this).data("original-title") || $(this).attr("title") || __('Add'), $(this).data() || {});
                });
                // 导入按钮事件
                if ($(Table.config.importbtn, toolbar).size() > 0) {
                    require(['upload'], function (Upload) {
                        Upload.api.upload($(Table.config.importbtn, toolbar), function (data, ret) {
                            Fast.api.ajax({
                                url: options.extend.import_url,
                                data: {file: data.url},
                            }, function (data, ret) {
                                table.trigger("uncheckbox");
                                table.bootstrapTable('refresh');
                            });
                        });
                    });
                }
                // 批量编辑按钮事件
                toolbar.on('click', Table.config.editbtn, function () {
                    var that = this;
                    var ids = Table.api.selectedids(table);
                    if (ids.length > 10) {
                        return;
                    }
                    var title = $(that).data('title') || $(that).attr("title") || __('Edit');
                    var data = $(that).data() || {};
                    delete data.title;
                    //循环弹出多个编辑框
                    $.each(Table.api.selecteddata(table), function (index, row) {
                        var url = options.extend.edit_url;
                        row = $.extend({}, row ? row : {}, {ids: row[options.pk]});
                        url = Table.api.replaceurl(url, row, table);
                        Fast.api.open(url, typeof title === 'function' ? title.call(table, row) : title, data);
                    });
                });
                //清空回收站
                $(document).on('click', Table.config.destroyallbtn, function () {
                    var that = this;
                    Layer.confirm(__('Are you sure you want to truncate?'), function () {
                        var url = $(that).data("url") ? $(that).data("url") : $(that).attr("href");
                        Fast.api.ajax(url, function () {
                            Layer.closeAll();
                            table.trigger("uncheckbox");
                            table.bootstrapTable('refresh');
                        }, function () {
                            Layer.closeAll();
                        });
                    });
                    return false;
                });
                //全部还原
                $(document).on('click', Table.config.restoreallbtn, function () {
                    var that = this;
                    var url = $(that).data("url") ? $(that).data("url") : $(that).attr("href");
                    Fast.api.ajax(url, function () {
                        Layer.closeAll();
                        table.trigger("uncheckbox");
                        table.bootstrapTable('refresh');
                    }, function () {
                        Layer.closeAll();
                    });
                    return false;
                });
                //销毁或删除
                $(document).on('click', Table.config.restoreonebtn + ',' + Table.config.destroyonebtn, function () {
                    var that = this;
                    var url = $(that).data("url") ? $(that).data("url") : $(that).attr("href");
                    var row = Fast.api.getrowbyindex(table, $(that).data("row-index"));
                    Fast.api.ajax({
                        url: url,
                        data: {ids: row[options.pk]}
                    }, function () {
                        table.trigger("uncheckbox");
                        table.bootstrapTable('refresh');
                    });
                    return false;
                });
                // 批量操作按钮事件
                toolbar.on('click', Table.config.multibtn, function () {
                    var ids = Table.api.selectedids(table);
                    Table.api.multi($(this).data("action"), ids, table, this);
                });
                // 批量删除按钮事件
                toolbar.on('click', Table.config.delbtn, function () {
                    var that = this;
                    var ids = Table.api.selectedids(table);
                    Layer.confirm(
                        __('Are you sure you want to delete the %s selected item?', ids.length),
                        {icon: 3, title: __('Warning'), offset: 0, shadeClose: true},
                        function (index) {
                            Table.api.multi("del", ids, table, that);
                            Layer.close(index);
                        }
                    );
                });
                // 拖拽排序
                require(['dragsort'], function () {
                    //绑定拖动排序
                    $("tbody", table).dragsort({
                        itemSelector: 'tr:visible',
                        dragSelector: "a.btn-dragsort",
                        dragEnd: function (a, b) {
                            var element = $("a.btn-dragsort", this);
                            var data = table.bootstrapTable('getData');
                            var current = data[parseInt($(this).data("index"))];
                            var options = table.bootstrapTable('getOptions');
                            //改变的值和改变的ID集合
                            var ids = $.map($("tbody tr:visible", table), function (tr) {
                                return data[parseInt($(tr).data("index"))][options.pk];
                            });
                            var changeid = current[options.pk];
                            var pid = typeof current.pid != 'undefined' ? current.pid : '';
                            var params = {
                                url: table.bootstrapTable('getOptions').extend.dragsort_url,
                                data: {
                                    ids: ids.join(','),
                                    changeid: changeid,
                                    pid: pid,
                                    field: Table.config.dragsortfield,
                                    orderway: options.sortOrder,
                                    table: options.extend.table,
                                    pk: options.pk
                                }
                            };
                            Fast.api.ajax(params, function (data, ret) {
                                var success = $(element).data("success") || $.noop;
                                if (typeof success === 'function') {
                                    if (false === success.call(element, data, ret)) {
                                        return false;
                                    }
                                }
                                table.bootstrapTable('refresh');
                            }, function (data, ret) {
                                var error = $(element).data("error") || $.noop;
                                if (typeof error === 'function') {
                                    if (false === error.call(element, data, ret)) {
                                        return false;
                                    }
                                }
                                table.bootstrapTable('refresh');
                            });
                        },
                        placeHolderTemplate: ""
                    });
                });
                table.on("click", "input[data-id][name='checkbox']", function (e) {
                    var ids = $(this).data("id");
                    table.bootstrapTable($(this).prop("checked") ? 'checkBy' : 'uncheckBy', {field: options.pk, values: [ids]});
                });
                table.on("click", "[data-id].btn-change", function (e) {
                    e.preventDefault();
                    var changer = $.proxy(function () {
                        Table.api.multi($(this).data("action") ? $(this).data("action") : '', [$(this).data("id")], table, this);
                    }, this);
                    if (typeof $(this).data("confirm") !== 'undefined') {
                        Layer.confirm($(this).data("confirm"), function (index) {
                            changer();
                            Layer.close(index);
                        });
                    } else {
                        changer();
                    }
                });
                table.on("click", "[data-id].btn-edit", function (e) {
                    e.preventDefault();
                    var ids = $(this).data("id");
                    var row = Table.api.getrowbyid(table, ids);
                    row.ids = ids;
                    var url = Table.api.replaceurl(options.extend.edit_url, row, table);
                    Fast.api.open(url, $(this).data("original-title") || $(this).attr("title") || __('Edit'), $(this).data() || {});
                });
                table.on("click", "[data-id].btn-del", function (e) {
                    e.preventDefault();
                    var id = $(this).data("id");
                    var that = this;
                    Layer.confirm(
                        __('Are you sure you want to delete this item?'),
                        {icon: 3, title: __('Warning'), shadeClose: true},
                        function (index) {
                            Table.api.multi("del", id, table, that);
                            Layer.close(index);
                        }
                    );
                });

                //修复dropdown定位溢出的情况
                if (options.fixDropdownPosition) {
                    var tableBody = table.closest(".fixed-table-body");
                    table.on('show.bs.dropdown fa.event.refreshdropdown', ".btn-group", function (e) {
                        var dropdownMenu = $(".dropdown-menu", this);
                        var btnGroup = $(this);
                        var isPullRight = dropdownMenu.hasClass("pull-right") || dropdownMenu.hasClass("dropdown-menu-right");
                        var left, top, position;
                        if (dropdownMenu.outerHeight() + btnGroup.outerHeight() > tableBody.outerHeight() - 41) {
                            position = 'fixed';
                            top = btnGroup.offset().top - $(window).scrollTop() + btnGroup.outerHeight();
                            left = isPullRight ? btnGroup.offset().left + btnGroup.outerWidth() - dropdownMenu.outerWidth() : btnGroup.offset().left;
                        } else {
                            if (btnGroup.offset().top + btnGroup.outerHeight() + dropdownMenu.outerHeight() > tableBody.offset().top + tableBody.outerHeight() - 30) {
                                position = 'absolute';
                                left = isPullRight ? -(dropdownMenu.outerWidth() - btnGroup.outerWidth()) : 0;
                                top = -(dropdownMenu.outerHeight() + 3);
                            }
                        }
                        if (left || top) {
                            dropdownMenu.css({
                                position: position, left: left, top: top, right: 'inherit'
                            });
                        }
                    });
                    var checkdropdown = function () {
                        if ($(".btn-group.open", table).length > 0 && $(".btn-group.open .dropdown-menu", table).css("position") == 'fixed') {
                            $(".btn-group.open", table).trigger("fa.event.refreshdropdown");
                        }
                    };
                    $(window).on("scroll", function () {
                        checkdropdown();
                    });
                    tableBody.on("scroll", function () {
                        checkdropdown();
                    });
                }

                var id = table.attr("id");
                Table.list[id] = table;
                return table;
            },
            // 批量操作请求
            multi: function (action, ids, table, element) {
                var options = table.bootstrapTable('getOptions');
                var data = element ? $(element).data() : {};
                ids = ($.isArray(ids) ? ids.join(",") : ids);
                var url = typeof data.url !== "undefined" ? data.url : (action == "del" ? options.extend.del_url : options.extend.multi_url);
                var params = typeof data.params !== "undefined" ? (typeof data.params == 'object' ? $.param(data.params) : data.params) : '';
                options = {url: url, data: {action: action, ids: ids, params: params}};
                Fast.api.ajax(options, function (data, ret) {
                    table.trigger("uncheckbox");
                    var success = $(element).data("success") || $.noop;
                    if (typeof success === 'function') {
                        if (false === success.call(element, data, ret)) {
                            return false;
                        }
                    }
                    table.bootstrapTable('refresh');
                }, function (data, ret) {
                    var error = $(element).data("error") || $.noop;
                    if (typeof error === 'function') {
                        if (false === error.call(element, data, ret)) {
                            return false;
                        }
                    }
                });
            },
            // 单元格元素事件
            events: {
                operate: {
                    'click .btn-editone': function (e, value, row, index) {
                        e.stopPropagation();
                        e.preventDefault();
                        var table = $(this).closest('table');
                        var options = table.bootstrapTable('getOptions');
                        var ids = row[options.pk];
                        row = $.extend({}, row ? row : {}, {ids: ids});
                        var url = options.extend.edit_url;
                        Fast.api.open(Table.api.replaceurl(url, row, table), $(this).data("original-title") || $(this).attr("title") || __('Edit'), $(this).data() || {});
                    },
                    'click .btn-delone': function (e, value, row, index) {
                        e.stopPropagation();
                        e.preventDefault();
                        var that = this;
                        var top = $(that).offset().top - $(window).scrollTop();
                        var left = $(that).offset().left - $(window).scrollLeft() - 260;
                        if (top + 154 > $(window).height()) {
                            top = top - 154;
                        }
                        if ($(window).width() < 480) {
                            top = left = undefined;
                        }
                        Layer.confirm(
                            __('Are you sure you want to delete this item?'),
                            {icon: 3, title: __('Warning'), offset: [top, left], shadeClose: true},
                            function (index) {
                                var table = $(that).closest('table');
                                var options = table.bootstrapTable('getOptions');
                                Table.api.multi("del", row[options.pk], table, that);
                                Layer.close(index);
                            }
                        );
                    }
                },//单元格图片预览
                image: {
                    'click .img-center': function (e, value, row, index) {
                        var data = [];
                        value = value === null ? '' : value.toString();
                        var arr = value != '' ? value.split(",") : [];
                        $.each(arr, function (index, value) {
                            data.push({
                                src: Fast.api.cdnurl(value),
                            });
                        });
                        Layer.photos({
                            photos: {
                                "start": $(this).parent().index(),
                                "data": data
                            },
                            anim: 5 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
                        });
                    },
                }
            },
            // 单元格数据格式化
            formatter: {
                icon: function (value, row, index) {
                    value = value === null ? '' : value.toString();
                    value = value.indexOf(" ") > -1 ? value : "fa fa-" + value;
                    //渲染fontawesome图标
                    return '<i class="' + value + '"></i> ' + value;
                },
                image: function (value, row, index) {
                    value = value == null || value.length === 0 ? '' : value.toString();
                    value = value ? value : '/assets/img/blank.gif';
                    var classname = typeof this.classname !== 'undefined' ? this.classname : 'img-sm img-center';
                    return '<a href="javascript:"><img class="' + classname + '" src="' + Fast.api.cdnurl(value) + '" /></a>';
                },
                images: function (value, row, index) {
                    value = value == null || value.length === 0 ? '' : value.toString();
                    var classname = typeof this.classname !== 'undefined' ? this.classname : 'img-sm img-center';
                    var arr = value != '' ? value.split(',') : [];
                    var html = [];
                    $.each(arr, function (i, value) {
                        value = value ? value : '/assets/img/blank.gif';
                        html.push('<a href="javascript:"><img class="' + classname + '" src="' + Fast.api.cdnurl(value) + '" /></a>');
                    });
                    return html.join(' ');
                },
                content: function (value, row, index) {
                    var width = this.width != undefined ? (this.width.match(/^\d+$/) ? this.width + "px" : this.width) : "250px";
                    return "<div style='white-space: nowrap; text-overflow:ellipsis; overflow: hidden; max-width:" + width + ";'>" + value + "</div>";
                },
                status: function (value, row, index) {
                    var custom = {normal: 'success', hidden: 'gray', deleted: 'danger', locked: 'info'};
                    if (typeof this.custom !== 'undefined') {
                        custom = $.extend(custom, this.custom);
                    }
                    this.custom = custom;
                    this.icon = 'fa fa-circle';
                    return Table.api.formatter.normal.call(this, value, row, index);
                },
                normal: function (value, row, index) {
                    var colorArr = ["primary", "success", "danger", "warning", "info", "gray", "red", "yellow", "aqua", "blue", "navy", "teal", "olive", "lime", "fuchsia", "purple", "maroon"];
                    var custom = {};
                    if (typeof this.custom !== 'undefined') {
                        custom = $.extend(custom, this.custom);
                    }
                    value = value == null || value.length === 0 ? '' : value.toString();
                    var keys = typeof this.searchList === 'object' ? Object.keys(this.searchList) : [];
                    var index = keys.indexOf(value);
                    var color = value && typeof custom[value] !== 'undefined' ? custom[value] : null;
                    var display = index > -1 ? this.searchList[value] : null;
                    var icon = typeof this.icon !== 'undefined' ? this.icon : null;
                    if (!color) {
                        color = index > -1 && typeof colorArr[index] !== 'undefined' ? colorArr[index] : 'primary';
                    }
                    if (!display) {
                        display = __(value.charAt(0).toUpperCase() + value.slice(1));
                    }
                    var html = '<span class="text-' + color + '">' + (icon ? '<i class="' + icon + '"></i> ' : '') + display + '</span>';
                    if (this.operate != false) {
                        html = '<a href="javascript:;" class="searchit" data-toggle="tooltip" title="' + __('Click to search %s', display) + '" data-field="' + this.field + '" data-value="' + value + '">' + html + '</a>';
                    }
                    return html;
                },
                toggle: function (value, row, index) {
                    var table = this.table;
                    var options = table ? table.bootstrapTable('getOptions') : {};
                    var pk = options.pk || "id";
                    var color = typeof this.color !== 'undefined' ? this.color : 'success';
                    var yes = typeof this.yes !== 'undefined' ? this.yes : 1;
                    var no = typeof this.no !== 'undefined' ? this.no : 0;
                    var url = typeof this.url !== 'undefined' ? this.url : '';
                    var confirm = '';
                    var disable = false;
                    if (typeof this.confirm !== "undefined") {
                        confirm = typeof this.confirm === "function" ? this.confirm.call(this, value, row, index) : this.confirm;
                    }
                    if (typeof this.disable !== "undefined") {
                        disable = typeof this.disable === "function" ? this.disable.call(this, value, row, index) : this.disable;
                    }
                    return "<a href='javascript:;' data-toggle='tooltip' title='" + __('Click to toggle') + "' class='btn-change " + (disable ? 'btn disabled no-padding' : '') + "' data-index='" + index + "' data-id='"
                        + row[pk] + "' " + (url ? "data-url='" + url + "'" : "") + (confirm ? "data-confirm='" + confirm + "'" : "") + " data-params='" + this.field + "=" + (value == yes ? no : yes) + "'><i class='fa fa-toggle-on text-success text-" + color + " " + (value == yes ? '' : 'fa-flip-horizontal text-gray') + " fa-2x'></i></a>";
                },
                url: function (value, row, index) {
                    value = value == null || value.length === 0 ? '' : value.toString();
                    return '<div class="input-group input-group-sm" style="width:250px;margin:0 auto;"><input type="text" class="form-control input-sm" value="' + value + '"><span class="input-group-btn input-group-sm"><a href="' + value + '" target="_blank" class="btn btn-default btn-sm"><i class="fa fa-link"></i></a></span></div>';
                },
                search: function (value, row, index) {
                    var field = this.field;
                    if (typeof this.customField !== 'undefined' && typeof row[this.customField] !== 'undefined') {
                        value = row[this.customField];
                        field = this.customField;
                    }
                    return '<a href="javascript:;" class="searchit" data-toggle="tooltip" title="' + __('Click to search %s', value) + '" data-field="' + field + '" data-value="' + value + '">' + value + '</a>';
                },
                addtabs: function (value, row, index) {
                    var url = Table.api.replaceurl(this.url || '', row, this.table);
                    var title = this.atitle ? this.atitle : __("Search %s", value);
                    return '<a href="' + Fast.api.fixurl(url) + '" class="addtabsit" data-value="' + value + '" title="' + title + '">' + value + '</a>';
                },
                dialog: function (value, row, index) {
                    var url = Table.api.replaceurl(this.url || '', row, this.table);
                    var title = this.atitle ? this.atitle : __("View %s", value);
                    return '<a href="' + Fast.api.fixurl(url) + '" class="dialogit" data-value="' + value + '" title="' + title + '">' + value + '</a>';
                },
                flag: function (value, row, index) {
                    var that = this;
                    value = value == null || value.length === 0 ? '' : value.toString();
                    var colorArr = {index: 'success', hot: 'warning', recommend: 'danger', 'new': 'info'};
                    //如果字段列有定义custom
                    if (typeof this.custom !== 'undefined') {
                        colorArr = $.extend(colorArr, this.custom);
                    }
                    var field = this.field;
                    if (typeof this.customField !== 'undefined' && typeof row[this.customField] !== 'undefined') {
                        value = row[this.customField];
                        field = this.customField;
                    }

                    //渲染Flag
                    var html = [];
                    var arr = value != '' ? value.split(',') : [];
                    var color, display, label;
                    $.each(arr, function (i, value) {
                        value = value == null || value.length === 0 ? '' : value.toString();
                        if (value == '')
                            return true;
                        color = value && typeof colorArr[value] !== 'undefined' ? colorArr[value] : 'primary';
                        display = typeof that.searchList !== 'undefined' && typeof that.searchList[value] !== 'undefined' ? that.searchList[value] : __(value.charAt(0).toUpperCase() + value.slice(1));
                        label = '<span class="label label-' + color + '">' + display + '</span>';
                        if (that.operate) {
                            html.push('<a href="javascript:;" class="searchit" data-toggle="tooltip" title="' + __('Click to search %s', display) + '" data-field="' + field + '" data-value="' + value + '">' + label + '</a>');
                        } else {
                            html.push(label);
                        }
                    });
                    return html.join(' ');
                },
                label: function (value, row, index) {
                    return Table.api.formatter.flag.call(this, value, row, index);
                },
                datetime: function (value, row, index) {
                    var datetimeFormat = typeof this.datetimeFormat === 'undefined' ? 'YYYY-MM-DD HH:mm:ss' : this.datetimeFormat;
                    if (isNaN(value)) {
                        return value ? Moment(value).format(datetimeFormat) : __('None');
                    } else {
                        return value ? Moment(parseInt(value) * 1000).format(datetimeFormat) : __('None');
                    }
                },
                operate: function (value, row, index) {
                    var table = this.table;
                    // 操作配置
                    var options = table ? table.bootstrapTable('getOptions') : {};
                    // 默认按钮组
                    var buttons = $.extend([], this.buttons || []);
                    // 所有按钮名称
                    var names = [];
                    buttons.forEach(function (item) {
                        names.push(item.name);
                    });
                    if (options.extend.dragsort_url !== '' && names.indexOf('dragsort') === -1) {
                        buttons.push(Table.button.dragsort);
                    }
                    if (options.extend.edit_url !== '' && names.indexOf('edit') === -1) {
                        Table.button.edit.url = options.extend.edit_url;
                        buttons.push(Table.button.edit);
                    }
                    if (options.extend.del_url !== '' && names.indexOf('del') === -1) {
                        buttons.push(Table.button.del);
                    }
                    return Table.api.buttonlink(this, buttons, value, row, index, 'operate');
                }
                ,
                buttons: function (value, row, index) {
                    // 默认按钮组
                    var buttons = $.extend([], this.buttons || []);
                    return Table.api.buttonlink(this, buttons, value, row, index, 'buttons');
                }
            },
            buttonlink: function (column, buttons, value, row, index, type) {
                var table = column.table;
                type = typeof type === 'undefined' ? 'buttons' : type;
                var options = table ? table.bootstrapTable('getOptions') : {};
                var html = [];
                var hidden, visible, disable, url, classname, icon, text, title, refresh, confirm, extend,
                    dropdown, link;
                var fieldIndex = column.fieldIndex;
                var dropdowns = {};

                $.each(buttons, function (i, j) {
                    if (type === 'operate') {
                        if (j.name === 'dragsort' && typeof row[Table.config.dragsortfield] === 'undefined') {
                            return true;
                        }
                        if (['add', 'edit', 'del', 'multi', 'dragsort'].indexOf(j.name) > -1 && !options.extend[j.name + "_url"]) {
                            return true;
                        }
                    }
                    var attr = table.data(type + "-" + j.name);
                    if (typeof attr === 'undefined' || attr) {
                        hidden = typeof j.hidden === 'function' ? j.hidden.call(table, row, j) : (typeof j.hidden !== 'undefined' ? j.hidden : false);
                        if (hidden) {
                            return true;
                        }
                        visible = typeof j.visible === 'function' ? j.visible.call(table, row, j) : (typeof j.visible !== 'undefined' ? j.visible : true);
                        if (!visible) {
                            return true;
                        }
                        dropdown = j.dropdown ? j.dropdown : '';
                        url = j.url ? j.url : '';
                        url = typeof url === 'function' ? url.call(table, row, j) : (url ? Fast.api.fixurl(Table.api.replaceurl(url, row, table)) : 'javascript:;');
                        classname = j.classname ? j.classname : 'btn-primary btn-' + name + 'one';
                        icon = j.icon ? j.icon : '';
                        text = typeof j.text === 'function' ? j.text.call(table, row, j) : j.text ? j.text : '';
                        title = typeof j.title === 'function' ? j.title.call(table, row, j) : j.title ? j.title : text;
                        refresh = j.refresh ? 'data-refresh="' + j.refresh + '"' : '';
                        confirm = typeof j.confirm === 'function' ? j.confirm.call(table, row, j) : (typeof j.confirm !== 'undefined' ? j.confirm : false);
                        confirm = confirm ? 'data-confirm="' + confirm + '"' : '';
                        extend = j.extend ? j.extend : '';
                        disable = typeof j.disable === 'function' ? j.disable.call(table, row, j) : (typeof j.disable !== 'undefined' ? j.disable : false);
                        if (disable) {
                            classname = classname + ' disabled';
                        }
                        link = '<a href="' + url + '" class="' + classname + '" ' + (confirm ? confirm + ' ' : '') + (refresh ? refresh + ' ' : '') + extend + ' title="' + title + '" data-table-id="' + (table ? table.attr("id") : '') + '" data-field-index="' + fieldIndex + '" data-row-index="' + index + '" data-button-index="' + i + '"><i class="' + icon + '"></i>' + (text ? ' ' + text : '') + '</a>';
                        if (dropdown) {
                            if (typeof dropdowns[dropdown] == 'undefined') {
                                dropdowns[dropdown] = [];
                            }
                            dropdowns[dropdown].push(link);
                        } else {
                            html.push(link);
                        }
                    }
                });
                if (!$.isEmptyObject(dropdowns)) {
                    var dropdownHtml = [];
                    $.each(dropdowns, function (i, j) {
                        dropdownHtml.push('<div class="btn-group"><button type="button" class="btn btn-primary dropdown-toggle btn-xs" data-toggle="dropdown">' + i + '</button><button type="button" class="btn btn-primary dropdown-toggle btn-xs" data-toggle="dropdown"><span class="caret"></span></button><ul class="dropdown-menu dropdown-menu-right"><li>' + j.join('</li><li>') + '</li></ul></div>');
                    });
                    html.unshift(dropdownHtml);
                }
                return html.join(' ');
            },
            //替换URL中的数据
            replaceurl: function (url, row, table) {
                var options = table ? table.bootstrapTable('getOptions') : null;
                var ids = options ? row[options.pk] : 0;
                row.ids = ids ? ids : (typeof row.ids !== 'undefined' ? row.ids : 0);
                url = url == null || url.length === 0 ? '' : url.toString();
                //自动添加ids参数
                url = !url.match(/\{ids\}/i) ? url + (url.match(/(\?|&)+/) ? "&ids=" : "/ids/") + '{ids}' : url;
                url = url.replace(/\{(.*?)\}/gi, function (matched) {
                    matched = matched.substring(1, matched.length - 1);
                    if (matched.indexOf(".") !== -1) {
                        var temp = row;
                        var arr = matched.split(/\./);
                        for (var i = 0; i < arr.length; i++) {
                            if (typeof temp[arr[i]] !== 'undefined') {
                                temp = temp[arr[i]];
                            }
                        }
                        return typeof temp === 'object' ? '' : temp;
                    }
                    return row[matched];
                });
                return url;
            },
            // 获取选中的条目ID集合
            selectedids: function (table, current) {
                var options = table.bootstrapTable('getOptions');
                //如果有设置翻页记忆模式
                if (!current && options.maintainSelected) {
                    return options.selectedIds;
                }
                return $.map(table.bootstrapTable('getSelections'), function (row) {
                    return row[options.pk];
                });
            },
            //获取选中的数据
            selecteddata: function (table, current) {
                var options = table.bootstrapTable('getOptions');
                //如果有设置翻页记忆模式
                if (!current && options.maintainSelected) {
                    return options.selectedData;
                }
                return table.bootstrapTable('getSelections');
            },
            // 切换复选框状态
            toggleattr: function (table) {
                $("input[type='checkbox']", table).trigger('click');
            },
            // 根据行索引获取行数据
            getrowdata: function (table, index) {
                index = parseInt(index);
                var data = table.bootstrapTable('getData');
                return typeof data[index] !== 'undefined' ? data[index] : null;
            },
            // 根据行索引获取行数据
            getrowbyindex: function (table, index) {
                return Table.api.getrowdata(table, index);
            },
            // 根据主键ID获取行数据
            getrowbyid: function (table, id) {
                var row = {};
                var options = table.bootstrapTable("getOptions");
                $.each(Table.api.selecteddata(table), function (i, j) {
                    if (j[options.pk] == id) {
                        row = j;
                        return false;
                    }
                });
                return row;
            }
        },
    };
    return Table;
});

// jQuery List DragSort v0.5.2
// Website: http://dragsort.codeplex.com/
// License: http://dragsort.codeplex.com/license

(function($) {

	$.fn.dragsort = function(options) {
		if (options == "destroy") {
			$(this.selector).trigger("dragsort-uninit");
			return;
		}

		var opts = $.extend({}, $.fn.dragsort.defaults, options);
		var lists = [];
		var list = null, lastPos = null;

		this.each(function(i, cont) {

			//if list container is table, the browser automatically wraps rows in tbody if not specified so change list container to tbody so that children returns rows as user expected
			if ($(cont).is("table") && $(cont).children().size() == 1 && $(cont).children().is("tbody"))
				cont = $(cont).children().get(0);

			var newList = {
				draggedItem: null,
				placeHolderItem: null,
				pos: null,
				offset: null,
				offsetLimit: null,
				scroll: null,
				container: cont,

				init: function() {
					//set options to default values if not set
					opts.tagName = opts.tagName == "" ? ($(this.container).children().size() == 0 ? "li" : $(this.container).children().get(0).tagName.toLowerCase()) : opts.tagName;
					if (opts.itemSelector == "")
						opts.itemSelector = opts.tagName;
					if (opts.dragSelector == "")
						opts.dragSelector = opts.tagName;
					if (opts.placeHolderTemplate == "")
						opts.placeHolderTemplate = "<" + opts.tagName + ">&nbsp;</" + opts.tagName + ">";

					//listidx allows reference back to correct list variable instance
					$(this.container).attr("data-listidx", i).mousedown(this.grabItem).bind("dragsort-uninit", this.uninit);
					this.styleDragHandlers(true);
				},

				uninit: function() {
					var list = lists[$(this).attr("data-listidx")];
					$(list.container).unbind("mousedown", list.grabItem).unbind("dragsort-uninit");
					list.styleDragHandlers(false);
				},

				getItems: function() {
					return $(this.container).children(opts.itemSelector);
				},

				styleDragHandlers: function(cursor) {
					this.getItems().map(function() { return $(this).is(opts.dragSelector) ? this : $(this).find(opts.dragSelector).get(); }).css("cursor", cursor ? "pointer" : "");
				},

				grabItem: function(e) {
					var list = lists[$(this).attr("data-listidx")];
					var item = $(e.target).closest("[data-listidx] > " + opts.tagName).get(0);
					var insideMoveableItem = list.getItems().filter(function() { return this == item; }).size() > 0;

					//if not left click or if clicked on excluded element (e.g. text box) or not a moveable list item return
					if (e.which != 1 || $(e.target).is(opts.dragSelectorExclude) || $(e.target).closest(opts.dragSelectorExclude).size() > 0 || !insideMoveableItem)
						return;

					//prevents selection, stops issue on Fx where dragging hyperlink doesn't work and on IE where it triggers mousemove even though mouse hasn't moved,
					//does also stop being able to click text boxes hence dragging on text boxes by default is disabled in dragSelectorExclude
					//e.preventDefault();

					//change cursor to move while dragging
					var dragHandle = e.target;
					while (!$(dragHandle).is(opts.dragSelector)) {
						if (dragHandle == this) return;
						dragHandle = dragHandle.parentNode;
					}
					$(dragHandle).attr("data-cursor", $(dragHandle).css("cursor"));
					$(dragHandle).css("cursor", "move");

					//on mousedown wait for movement of mouse before triggering dragsort script (dragStart) to allow clicking of hyperlinks to work
					var listElem = this;
					var trigger = function() {
						list.dragStart.call(listElem, e);
						$(list.container).unbind("mousemove", trigger);
					};
					$(list.container).mousemove(trigger).mouseup(function() { $(list.container).unbind("mousemove", trigger); $(dragHandle).css("cursor", $(dragHandle).attr("data-cursor")); });
				},

				dragStart: function(e) {
					if (list != null && list.draggedItem != null)
						list.dropItem();

					list = lists[$(this).attr("data-listidx")];
					list.draggedItem = $(e.target).closest("[data-listidx] > " + opts.tagName)

					//record current position so on dragend we know if the dragged item changed position or not, not using getItems to allow dragsort to restore dragged item to original location in relation to fixed items
					list.draggedItem.attr("data-origpos", $(this).attr("data-listidx") + "-" + $(list.container).children().index(list.draggedItem));

					//calculate mouse offset relative to draggedItem
					var mt = parseInt(list.draggedItem.css("marginTop"));
					var ml = parseInt(list.draggedItem.css("marginLeft"));
					list.offset = list.draggedItem.offset();
					list.offset.top = e.pageY - list.offset.top + (isNaN(mt) ? 0 : mt) - 1;
					list.offset.left = e.pageX - list.offset.left + (isNaN(ml) ? 0 : ml) - 1;

					//calculate box the dragged item can't be dragged outside of
					if (!opts.dragBetween) {
						var containerHeight = $(list.container).outerHeight() == 0 ? Math.max(1, Math.round(0.5 + list.getItems().size() * list.draggedItem.outerWidth() / $(list.container).outerWidth())) * list.draggedItem.outerHeight() : $(list.container).outerHeight();
						list.offsetLimit = $(list.container).offset();
						list.offsetLimit.right = list.offsetLimit.left + $(list.container).outerWidth() - list.draggedItem.outerWidth();
						list.offsetLimit.bottom = list.offsetLimit.top + containerHeight - list.draggedItem.outerHeight();
					}

					//create placeholder item
					var h = list.draggedItem.height();
					var w = list.draggedItem.width();
					if (opts.tagName == "tr") {
						list.draggedItem.children().each(function() { $(this).width($(this).width()); });
						list.placeHolderItem = list.draggedItem.clone().attr("data-placeholder", true);
						list.draggedItem.after(list.placeHolderItem);
						//list.placeHolderItem.children().each(function() { $(this).css({ borderWidth:0, width: $(this).width() + 1, height: $(this).height() + 1 }).html("&nbsp;"); });
						list.placeHolderItem.children().each(function() { $(this).html("&nbsp;"); });
					} else {
						list.draggedItem.after(opts.placeHolderTemplate);
						list.placeHolderItem = list.draggedItem.next().css({ height: h, width: w }).attr("data-placeholder", true);
					}

					if (opts.tagName == "td") {
						var listTable = list.draggedItem.closest("table").get(0);
						$("<table id='" + listTable.id + "' style='border-width: 0px;' class='dragSortItem " + listTable.className + "'><tr></tr></table>").appendTo("body").children().append(list.draggedItem);
					}

					//style draggedItem while dragging
					var orig = list.draggedItem.attr("style");
					list.draggedItem.attr("data-origstyle", orig ? orig : "");
					list.draggedItem.css({ position: "absolute", opacity: 0.8, "z-index": 999, height: h, width: w });

					//auto-scroll setup
					list.scroll = { moveX: 0, moveY: 0, maxX: $(document).width() - $(window).width(), maxY: $(document).height() - $(window).height() };
					list.scroll.scrollY = window.setInterval(function() {
						if (opts.scrollContainer != window) {
							$(opts.scrollContainer).scrollTop($(opts.scrollContainer).scrollTop() + list.scroll.moveY);
							return;
						}
						var t = $(opts.scrollContainer).scrollTop();
						if (list.scroll.moveY > 0 && t < list.scroll.maxY || list.scroll.moveY < 0 && t > 0) {
							$(opts.scrollContainer).scrollTop(t + list.scroll.moveY);
							list.draggedItem.css("top", list.draggedItem.offset().top + list.scroll.moveY + 1);
						}
					}, 10);
					list.scroll.scrollX = window.setInterval(function() {
						if (opts.scrollContainer != window) {
							$(opts.scrollContainer).scrollLeft($(opts.scrollContainer).scrollLeft() + list.scroll.moveX);
							return;
						}
						var l = $(opts.scrollContainer).scrollLeft();
						if (list.scroll.moveX > 0 && l < list.scroll.maxX || list.scroll.moveX < 0 && l > 0) {
							$(opts.scrollContainer).scrollLeft(l + list.scroll.moveX);
							list.draggedItem.css("left", list.draggedItem.offset().left + list.scroll.moveX + 1);
						}
					}, 10);

					//misc
					$(lists).each(function(i, l) { l.createDropTargets(); l.buildPositionTable(); });
					list.setPos(e.pageX, e.pageY);
					$(document).bind("mousemove", list.swapItems);
					$(document).bind("mouseup", list.dropItem);
					if (opts.scrollContainer != window)
						$(window).bind("wheel", list.wheel);
				},

				//set position of draggedItem
				setPos: function(x, y) { 
					//remove mouse offset so mouse cursor remains in same place on draggedItem instead of top left corner
					var top = y - this.offset.top;
					var left = x - this.offset.left;

					//limit top, left to within box draggedItem can't be dragged outside of
					if (!opts.dragBetween) {
						top = Math.min(this.offsetLimit.bottom, Math.max(top, this.offsetLimit.top));
						left = Math.min(this.offsetLimit.right, Math.max(left, this.offsetLimit.left));
					}

					//adjust top & left calculations to parent offset
					var parent = this.draggedItem.offsetParent().not("body").offset(); //offsetParent returns body even when it's static, if not static offset is only factoring margin
					if (parent != null) {
						top -= parent.top;
						left -= parent.left;
					}

					//set x or y auto-scroll amount
					if (opts.scrollContainer == window) {
						y -= $(window).scrollTop();
						x -= $(window).scrollLeft();
						y = Math.max(0, y - $(window).height() + 5) + Math.min(0, y - 5);
						x = Math.max(0, x - $(window).width() + 5) + Math.min(0, x - 5);
					} else {
						var cont = $(opts.scrollContainer);
						var offset = cont.offset();
						y = Math.max(0, y - cont.height() - offset.top) + Math.min(0, y - offset.top);
						x = Math.max(0, x - cont.width() - offset.left) + Math.min(0, x - offset.left);
					}
					
					list.scroll.moveX = x == 0 ? 0 : x * opts.scrollSpeed / Math.abs(x);
					list.scroll.moveY = y == 0 ? 0 : y * opts.scrollSpeed / Math.abs(y);

					//move draggedItem to new mouse cursor location
					this.draggedItem.css({ top: top, left: left });
				},

				//if scroll container is a div allow mouse wheel to scroll div instead of window when mouse is hovering over
				wheel: function(e) {
					if (list && opts.scrollContainer != window) {
						var cont = $(opts.scrollContainer);
						var offset = cont.offset();
						e = e.originalEvent;
						if (e.clientX > offset.left && e.clientX < offset.left + cont.width() && e.clientY > offset.top && e.clientY < offset.top + cont.height()) {
							var deltaY = (e.deltaMode == 0 ? 1 : 10) * e.deltaY;
							cont.scrollTop(cont.scrollTop() + deltaY);
							e.preventDefault();
						}
					}
				},

				//build a table recording all the positions of the moveable list items
				buildPositionTable: function() {
					var pos = [];
					this.getItems().not([list.draggedItem[0], list.placeHolderItem[0]]).each(function(i) {
						var loc = $(this).offset();
						loc.right = loc.left + $(this).outerWidth();
						loc.bottom = loc.top + $(this).outerHeight();
						loc.elm = this;
						pos[i] = loc;
					});
					this.pos = pos;
				},

				dropItem: function() {
					if (list.draggedItem == null)
						return;

					//list.draggedItem.attr("style", "") doesn't work on IE8 and jQuery 1.5 or lower
					//list.draggedItem.removeAttr("style") doesn't work on chrome and jQuery 1.6 (works jQuery 1.5 or lower)
					var orig = list.draggedItem.attr("data-origstyle");
					list.draggedItem.attr("style", orig);
					if (orig == "")
						list.draggedItem.removeAttr("style");
					list.draggedItem.removeAttr("data-origstyle");

					list.styleDragHandlers(true);

					list.placeHolderItem.before(list.draggedItem);
					list.placeHolderItem.remove();

					$("[data-droptarget], .dragSortItem").remove();

					window.clearInterval(list.scroll.scrollY);
					window.clearInterval(list.scroll.scrollX);

					//if position changed call dragEnd
					if (list.draggedItem.attr("data-origpos") != $(lists).index(list) + "-" + $(list.container).children().index(list.draggedItem))
						if (opts.dragEnd.apply(list.draggedItem) == false) { //if dragEnd returns false revert order
							var pos = list.draggedItem.attr("data-origpos").split('-');
							var nextItem = $(lists[pos[0]].container).children().not(list.draggedItem).eq(pos[1]);
							if (nextItem.size() > 0)
								nextItem.before(list.draggedItem);
							else if (pos[1] == 0) //was the only item in list
								$(lists[pos[0]].container).prepend(list.draggedItem);
							else //was the last item in list
								$(lists[pos[0]].container).append(list.draggedItem);
						}
					list.draggedItem.removeAttr("data-origpos");

					list.draggedItem = null;
					$(document).unbind("mousemove", list.swapItems);
					$(document).unbind("mouseup", list.dropItem);
					if (opts.scrollContainer != window)
						$(window).unbind("wheel", list.wheel);
					return false;
				},

				//swap the draggedItem (represented visually by placeholder) with the list item the it has been dragged on top of
				swapItems: function(e) {
					if (list.draggedItem == null)
						return false;

					//move draggedItem to mouse location
					list.setPos(e.pageX, e.pageY);

					//retrieve list and item position mouse cursor is over
					var ei = list.findPos(e.pageX, e.pageY);
					var nlist = list;
					for (var i = 0; ei == -1 && opts.dragBetween && i < lists.length; i++) {
						ei = lists[i].findPos(e.pageX, e.pageY);
						nlist = lists[i];
					}

					//if not over another moveable list item return
					if (ei == -1)
						return false;

					//save fixed items locations
					var children = function() { return $(nlist.container).children().not(nlist.draggedItem); };
					var fixed = children().not(opts.itemSelector).each(function(i) { this.idx = children().index(this); });

					//if moving draggedItem up or left place placeHolder before list item the dragged item is hovering over otherwise place it after
					if (lastPos == null || lastPos.top > list.draggedItem.offset().top || lastPos.left > list.draggedItem.offset().left)
						$(nlist.pos[ei].elm).before(list.placeHolderItem);
					else
						$(nlist.pos[ei].elm).after(list.placeHolderItem);

					//restore fixed items location
					fixed.each(function() {
						var elm = children().eq(this.idx).get(0);
						if (this != elm && children().index(this) < this.idx)
							$(this).insertAfter(elm);
						else if (this != elm)
							$(this).insertBefore(elm);
					});

					//misc
					$(lists).each(function(i, l) { l.createDropTargets(); l.buildPositionTable(); });
					lastPos = list.draggedItem.offset();
					return false;
				},

				//returns the index of the list item the mouse is over
				findPos: function(x, y) {
					for (var i = 0; i < this.pos.length; i++) {
						if (this.pos[i].left < x && this.pos[i].right > x && this.pos[i].top < y && this.pos[i].bottom > y)
							return i;
					}
					return -1;
				},

				//create drop targets which are placeholders at the end of other lists to allow dragging straight to the last position
				createDropTargets: function() {
					if (!opts.dragBetween)
						return;

					$(lists).each(function() {
						var ph = $(this.container).find("[data-placeholder]");
						var dt = $(this.container).find("[data-droptarget]");
						if (ph.size() > 0 && dt.size() > 0)
							dt.remove();
						else if (ph.size() == 0 && dt.size() == 0) {
							if (opts.tagName == "td")
								$(opts.placeHolderTemplate).attr("data-droptarget", true).appendTo(this.container);
							else
								//list.placeHolderItem.clone().removeAttr("data-placeholder") crashes in IE7 and jquery 1.5.1 (doesn't in jquery 1.4.2 or IE8)
								$(this.container).append(list.placeHolderItem.removeAttr("data-placeholder").clone().attr("data-droptarget", true));
							
							list.placeHolderItem.attr("data-placeholder", true);
						}
					});
				}
			};

			newList.init();
			lists.push(newList);
		});

		return this;
	};

	$.fn.dragsort.defaults = {
                tagName:"",
		itemSelector: "",
		dragSelector: "",
		dragSelectorExclude: "input, textarea",
		dragEnd: function() { },
		dragBetween: false,
		placeHolderTemplate: "",
		scrollContainer: window,
		scrollSpeed: 5
	};

})(jQuery);

define("dragsort", function(){});

/*! 
 * jquery.event.drag - v 2.2
 * Copyright (c) 2010 Three Dub Media - http://threedubmedia.com
 * Open Source MIT License - http://threedubmedia.com/code/license
 */
;(function(e){e.fn.drag=function(k,g,j){var i=typeof k=="string"?k:"",h=e.isFunction(k)?k:e.isFunction(g)?g:null;if(i.indexOf("drag")!==0){i="drag"+i}j=(k==h?g:j)||{};return h?this.bind(i,j,h):this.trigger(i)};var b=e.event,a=b.special,d=a.drag={defaults:{which:1,distance:0,not:":input",handle:null,relative:false,drop:true,click:false},datakey:"dragdata",noBubble:true,add:function(i){var h=e.data(this,d.datakey),g=i.data||{};h.related+=1;e.each(d.defaults,function(j,k){if(g[j]!==undefined){h[j]=g[j]}})},remove:function(){e.data(this,d.datakey).related-=1},setup:function(){if(e.data(this,d.datakey)){return}var g=e.extend({related:0},d.defaults);e.data(this,d.datakey,g);b.add(this,"touchstart mousedown",d.init,g);if(this.attachEvent){this.attachEvent("ondragstart",d.dontstart)}},teardown:function(){var g=e.data(this,d.datakey)||{};if(g.related){return}e.removeData(this,d.datakey);b.remove(this,"touchstart mousedown",d.init);d.textselect(true);if(this.detachEvent){this.detachEvent("ondragstart",d.dontstart)}},init:function(i){if(d.touched){return}var g=i.data,h;if(i.which!=0&&g.which>0&&i.which!=g.which){return}if(e(i.target).is(g.not)){return}if(g.handle&&!e(i.target).closest(g.handle,i.currentTarget).length){return}d.touched=i.type=="touchstart"?this:null;g.propagates=1;g.mousedown=this;g.interactions=[d.interaction(this,g)];g.target=i.target;g.pageX=i.pageX;g.pageY=i.pageY;g.dragging=null;h=d.hijack(i,"draginit",g);if(!g.propagates){return}h=d.flatten(h);if(h&&h.length){g.interactions=[];e.each(h,function(){g.interactions.push(d.interaction(this,g))})}g.propagates=g.interactions.length;if(g.drop!==false&&a.drop){a.drop.handler(i,g)}d.textselect(false);if(d.touched){b.add(d.touched,"touchmove touchend",d.handler,g)}else{b.add(document,"mousemove mouseup",d.handler,g)}if(!d.touched||g.live){return false}},interaction:function(h,g){var i=e(h)[g.relative?"position":"offset"]()||{top:0,left:0};return{drag:h,callback:new d.callback(),droppable:[],offset:i}},handler:function(h){var g=h.data;switch(h.type){case !g.dragging&&"touchmove":h.preventDefault();case !g.dragging&&"mousemove":if(Math.pow(h.pageX-g.pageX,2)+Math.pow(h.pageY-g.pageY,2)<Math.pow(g.distance,2)){break}h.target=g.target;d.hijack(h,"dragstart",g);if(g.propagates){g.dragging=true}case"touchmove":h.preventDefault();case"mousemove":if(g.dragging){d.hijack(h,"drag",g);if(g.propagates){if(g.drop!==false&&a.drop){a.drop.handler(h,g)}break}h.type="mouseup"}case"touchend":case"mouseup":default:if(d.touched){b.remove(d.touched,"touchmove touchend",d.handler)}else{b.remove(document,"mousemove mouseup",d.handler)}if(g.dragging){if(g.drop!==false&&a.drop){a.drop.handler(h,g)}d.hijack(h,"dragend",g)}d.textselect(true);if(g.click===false&&g.dragging){e.data(g.mousedown,"suppress.click",new Date().getTime()+5)}g.dragging=d.touched=false;break}},hijack:function(h,o,r,p,k){if(!r){return}var q={event:h.originalEvent,type:h.type},m=o.indexOf("drop")?"drag":"drop",t,l=p||0,j,g,s,n=!isNaN(p)?p:r.interactions.length;h.type=o;h.originalEvent=null;r.results=[];do{if(j=r.interactions[l]){if(o!=="dragend"&&j.cancelled){continue}s=d.properties(h,r,j);j.results=[];e(k||j[m]||r.droppable).each(function(u,i){s.target=i;h.isPropagationStopped=function(){return false};t=i?b.dispatch.call(i,h,s):null;if(t===false){if(m=="drag"){j.cancelled=true;r.propagates-=1}if(o=="drop"){j[m][u]=null}}else{if(o=="dropinit"){j.droppable.push(d.element(t)||i)}}if(o=="dragstart"){j.proxy=e(d.element(t)||j.drag)[0]}j.results.push(t);delete h.result;if(o!=="dropinit"){return t}});r.results[l]=d.flatten(j.results);if(o=="dropinit"){j.droppable=d.flatten(j.droppable)}if(o=="dragstart"&&!j.cancelled){s.update()}}}while(++l<n);h.type=q.type;h.originalEvent=q.event;return d.flatten(r.results)},properties:function(i,g,h){var j=h.callback;j.drag=h.drag;j.proxy=h.proxy||h.drag;j.startX=g.pageX;j.startY=g.pageY;j.deltaX=i.pageX-g.pageX;j.deltaY=i.pageY-g.pageY;j.originalX=h.offset.left;j.originalY=h.offset.top;j.offsetX=j.originalX+j.deltaX;j.offsetY=j.originalY+j.deltaY;j.drop=d.flatten((h.drop||[]).slice());j.available=d.flatten((h.droppable||[]).slice());return j},element:function(g){if(g&&(g.jquery||g.nodeType==1)){return g}},flatten:function(g){return e.map(g,function(h){return h&&h.jquery?e.makeArray(h):h&&h.length?d.flatten(h):h})},textselect:function(g){e(document)[g?"unbind":"bind"]("selectstart",d.dontstart).css("MozUserSelect",g?"":"none");document.unselectable=g?"off":"on"},dontstart:function(){return false},callback:function(){}};d.callback.prototype={update:function(){if(a.drop&&this.available.length){e.each(this.available,function(g){a.drop.locate(this,g)})}}};var f=b.dispatch;b.dispatch=function(g){if(e.data(this,"suppress."+g.type)-new Date().getTime()>0){e.removeData(this,"suppress."+g.type);return}return f.apply(this,arguments)};var c=b.fixHooks.touchstart=b.fixHooks.touchmove=b.fixHooks.touchend=b.fixHooks.touchcancel={props:"clientX clientY pageX pageY screenX screenY".split(" "),filter:function(h,i){if(i){var g=(i.touches&&i.touches[0])||(i.changedTouches&&i.changedTouches[0])||null;if(g){e.each(c.props,function(j,k){h[k]=g[k]})}}return h}};a.draginit=a.dragstart=a.dragend=d})(jQuery);
define("drag", function(){});

/*! 
 * jquery.event.drop - v 2.2
 * Copyright (c) 2010 Three Dub Media - http://threedubmedia.com
 * Open Source MIT License - http://threedubmedia.com/code/license
 */
;(function(d){d.fn.drop=function(i,e,h){var g=typeof i=="string"?i:"",f=d.isFunction(i)?i:d.isFunction(e)?e:null;if(g.indexOf("drop")!==0){g="drop"+g}h=(i==f?e:h)||{};return f?this.bind(g,h,f):this.trigger(g)};d.drop=function(e){e=e||{};b.multi=e.multi===true?Infinity:e.multi===false?1:!isNaN(e.multi)?e.multi:b.multi;b.delay=e.delay||b.delay;b.tolerance=d.isFunction(e.tolerance)?e.tolerance:e.tolerance===null?null:b.tolerance;b.mode=e.mode||b.mode||"intersect"};var c=d.event,a=c.special,b=d.event.special.drop={multi:1,delay:20,mode:"overlap",targets:[],datakey:"dropdata",noBubble:true,add:function(f){var e=d.data(this,b.datakey);e.related+=1},remove:function(){d.data(this,b.datakey).related-=1},setup:function(){if(d.data(this,b.datakey)){return}var e={related:0,active:[],anyactive:0,winner:0,location:{}};d.data(this,b.datakey,e);b.targets.push(this);return false},teardown:function(){var f=d.data(this,b.datakey)||{};if(f.related){return}d.removeData(this,b.datakey);var e=this;b.targets=d.grep(b.targets,function(g){return(g!==e)})},handler:function(g,e){var f,h;if(!e){return}switch(g.type){case"mousedown":case"touchstart":h=d(b.targets);if(typeof e.drop=="string"){h=h.filter(e.drop)}h.each(function(){var i=d.data(this,b.datakey);i.active=[];i.anyactive=0;i.winner=0});e.droppable=h;a.drag.hijack(g,"dropinit",e);break;case"mousemove":case"touchmove":b.event=g;if(!b.timer){b.tolerate(e)}break;case"mouseup":case"touchend":b.timer=clearTimeout(b.timer);if(e.propagates){a.drag.hijack(g,"drop",e);a.drag.hijack(g,"dropend",e)}break}},locate:function(k,h){var l=d.data(k,b.datakey),g=d(k),i=g.offset()||{},e=g.outerHeight(),j=g.outerWidth(),f={elem:k,width:j,height:e,top:i.top,left:i.left,right:i.left+j,bottom:i.top+e};if(l){l.location=f;l.index=h;l.elem=k}return f},contains:function(e,f){return((f[0]||f.left)>=e.left&&(f[0]||f.right)<=e.right&&(f[1]||f.top)>=e.top&&(f[1]||f.bottom)<=e.bottom)},modes:{intersect:function(f,e,g){return this.contains(g,[f.pageX,f.pageY])?1000000000:this.modes.overlap.apply(this,arguments)},overlap:function(f,e,g){return Math.max(0,Math.min(g.bottom,e.bottom)-Math.max(g.top,e.top))*Math.max(0,Math.min(g.right,e.right)-Math.max(g.left,e.left))},fit:function(f,e,g){return this.contains(g,e)?1:0},middle:function(f,e,g){return this.contains(g,[e.left+e.width*0.5,e.top+e.height*0.5])?1:0}},sort:function(f,e){return(e.winner-f.winner)||(f.index-e.index)},tolerate:function(q){var k,e,n,j,l,m,g,p=0,f,h=q.interactions.length,r=[b.event.pageX,b.event.pageY],o=b.tolerance||b.modes[b.mode];do{if(f=q.interactions[p]){if(!f){return}f.drop=[];l=[];m=f.droppable.length;if(o){n=b.locate(f.proxy)}k=0;do{if(g=f.droppable[k]){j=d.data(g,b.datakey);e=j.location;if(!e){continue}j.winner=o?o.call(b,b.event,n,e):b.contains(e,r)?1:0;l.push(j)}}while(++k<m);l.sort(b.sort);k=0;do{if(j=l[k]){if(j.winner&&f.drop.length<b.multi){if(!j.active[p]&&!j.anyactive){if(a.drag.hijack(b.event,"dropstart",q,p,j.elem)[0]!==false){j.active[p]=1;j.anyactive+=1}else{j.winner=0}}if(j.winner){f.drop.push(j.elem)}}else{if(j.active[p]&&j.anyactive==1){a.drag.hijack(b.event,"dropend",q,p,j.elem);j.active[p]=0;j.anyactive-=1}}}}while(++k<m)}}while(++p<h);if(b.last&&r[0]==b.last.pageX&&r[1]==b.last.pageY){delete b.timer}else{b.timer=setTimeout(function(){b.tolerate(q)},b.delay)}b.last=b.event}};a.dropinit=a.dropstart=a.dropend=b})(jQuery);
define("drop", function(){});

/**
 * @summary     SelectPage
 * @desc        Simple and powerful selection plugin
 * @file        selectpage.js
 * @version     2.19
 * @author      TerryZeng
 * @contact     https://terryz.github.io/
 * @license     MIT License
 *
 */
;(function ($) {
    "use strict";
    /**
     * Default options
     */
    var defaults = {
        /**
         * Data source
         * @type {string|Object}
         *
         * string：server side request url address
         * Object：JSON array，format：[{a:1,b:2,c:3},{...}]
         */
        data: undefined,
        /**
         * Language ('cn', 'en')
         * @type string
         * @default 'cn'
         */
        lang: 'cn',
        /**
         * Multiple select mode(tags)
         * @type boolean
         * @default false
         */
        multiple: false,
        /**
         * pagination or not
         * @type boolean
         * @default true
         */
        pagination: true,
        /**
         * Show up menu button
         * @type boolean
         * @default true
         */
        dropButton: true,
        /**
         * Result list visible size in pagination bar close
         * @type number
         * @default 10
         */
        listSize: 10,
        /**
         * Show control bar in multiple select mode
         * @type boolean
         * @default true
         */
        multipleControlbar: true,
        /**
         * Max selected item limited in multiple select mode
         * @type number
         * @default 0(unlimited)
         */
        maxSelectLimit: 0,
        /**
         * Select result item to close list, work on multiple select mode
         * @type boolean
         * @default false
         */
        selectToCloseList: false,
        /**
         * Init selected item key, the result will match to option.keyField option
         * @type string
         */
        initRecord: undefined,
        /**
         * The table parameter in server side mode
         * @type string
         */
        dbTable: 'tbl',
        /**
         * The value field, the value will fill to hidden element
         * @type string
         * @default 'id'
         */
        keyField: 'id',
        /**
         * The show text field, the text will show to input element or tags(multiple mode)
         * @type string
         * @default 'name'
         */
        showField: 'name',
        /**
         * Actually used to search field
         * @type string
         */
        searchField: undefined,
        /**
         * Search type ('AND' or 'OR')
         * @type string
         * @default 'AND'
         */
        andOr: 'OR',
        /**
         * Result sort type
         * @type array|boolean - if not set, will default used showField field
         * @example
         * orderBy : ['id desc']
         */
        orderBy: undefined,
        /**
         * Page size
         * @type number
         * @default 10
         */
        pageSize: 10,
        /**
         * Server side request parameters
         * @type function
         * @return object
         * @example params : function(){return {'name':'aa','sex':1};}
         */
        params: undefined,
        /**
         * Custom result list item show text
         * @type function
         * @param data {object} row data
         * @return string
         */
        formatItem: undefined,
        /**
         * Have some highlight item and lost focus, auto select the highlight item
         * @type boolean
         * @default false
         */
        autoFillResult: false,
        /**
         * Auto select first item in show up result list or search result
         * depend on `autoFillResult` option set to true
         * @type boolean
         * @default false
         */
        autoSelectFirst: false,
        /**
         * Whether clear input element text when enter some keywords to search and no result return
         * @type boolean
         * @default true
         */
        noResultClean: true,
        /**
         * Select only mode
         * @type boolean
         */
        selectOnly: false,
        /**
         * Input to search delay time, work on ajax data source
         * @type number
         * @default 0.5
         */
        inputDelay: 0.5,
        /**
         * -----------------------------------------Callback--------------------------------------------
         */
        /**
         * Result list item selected callback
         * @type function
         * @param object - selected item json data
         * @param self   - plugin object
         */
        eSelect: undefined,
        /**
         * Before result list show up callback, you can do anything prepared
         * @param self - plugin object
         */
        eOpen: undefined,
        /**
         * Server side return data convert callback
         * @type function
         * @param data {object} server side return data
         * @param self {object} plugin object
         * @return {object} return data format：
         * @example
         * {
         *   list : [{name:'aa',sex:1},{name:'bb',sex:1}...],
         *   totalRow : 100
         * }
         */
        eAjaxSuccess: undefined,
        /**
         * Close selected item tag callback (multiple mode)
         * @type function
         * @param removeCount {number} remove item count
         * @param self {object} plugin object
         */
        eTagRemove: undefined,
        /**
         * Clear selected item callback(single select mode)
         * @type function
         * @param self {object} plugin object
         */
        eClear: undefined
    };


    /**
     * SelectPage class definition
     * @constructor
     * @param {Object} input - input element
     * @param {Object} option
     */
    var SelectPage = function (input, option) {
        //特殊字段处理
        $.each({data: 'source', keyField: 'primaryKey', showField: 'field', pageSize: 'perPage'}, function (i, j) {
            if (typeof option[j] !== 'undefined') {
                option[i] = option[j];
                delete option[j];
            }
        });
        this.setOption(option);
        this.setLanguage();
        this.setCssClass();
        this.setProp();
        this.setElem(input);

        this.setButtonAttrDefault();
        this.setInitRecord();

        this.eDropdownButton();
        this.eInput();
        this.eWhole();
    };
    /**
     * Plugin version number
     */
    SelectPage.version = '2.19';
    /**
     * Plugin object cache key
     */
    SelectPage.dataKey = 'selectPageObject';
    /**
     * Options set
     * @param {Object} option
     */
    SelectPage.prototype.setOption = function (option) {
        //use showField to default
        option.searchField = option.searchField || option.showField;

        option.andOr = option.andOr.toUpperCase();
        if (option.andOr !== 'AND' && option.andOr !== 'OR') option.andOr = 'AND';

        //support multiple field set
        var arr = ['searchField'];
        for (var i = 0; i < arr.length; i++) {
            option[arr[i]] = this.strToArray(option[arr[i]]);
        }

        //set default order field
        option.orderBy = option.orderBy || option.showField;

        //set multiple order field
        //example:  [ ['id', 'ASC'], ['name', 'DESC'] ]
        if (option.orderBy !== false) option.orderBy = this.setOrderbyOption(option.orderBy, option.showField);
        //close auto fill result and auto select first in multiple mode and select item not close list
        if (option.multiple && !option.selectToCloseList) {
            option.autoFillResult = false;
            option.autoSelectFirst = false;
        }
        //show all item when pagination bar close, limited 200
        if (!option.pagination) option.pageSize = 200;

        if ($.type(option.listSize) !== 'number' || option.listSize < 0) option.listSize = 10;
        if (typeof option.formatItem === 'string') {
            var _formatItem = option.formatItem;
            option.formatItem = function (row) {
                if (typeof Template === 'function' && _formatItem.match(/\#([a-zA-Z0-9_\-]+)$/)) {
                    return Template(_formatItem.substring(1), row);
                } else {
                    return _formatItem.replace(/\{(.*?)\}/gi, function (matched) {
                        matched = matched.substring(1, matched.length - 1);
                        return typeof row[matched] !== 'undefined' ? row[matched] : '';
                    });
                }
            };
        }
        this.option = option;
    };

    /**
     * String convert to array
     * @param str {string}
     * @return {Array}
     */
    SelectPage.prototype.strToArray = function (str) {
        return str ? str.replace(/[\s　]+/g, '').split(',') : '';
    };

    /**
     * Set order field
     * @param {Array} arg_order
     * @param {string} arg_field - default sort field
     * @return {Array}
     */
    SelectPage.prototype.setOrderbyOption = function (arg_order, arg_field) {
        var arr = [], orders = [];
        if (typeof arg_order === 'object') {
            for (var i = 0; i < arg_order.length; i++) {
                orders = $.trim(arg_order[i]).split(' ');
                if (orders.length)
                    arr.push((orders.length === 2) ? orders.concat() : [orders[0], 'ASC']);
            }
        } else {
            orders = $.trim(arg_order).split(' ');
            arr[0] = (orders.length === 2) ? orders.concat() : (orders[0].toUpperCase().match(/^(ASC|DESC)$/i)) ? [arg_field, orders[0].toUpperCase()] : [orders[0], 'ASC'];
        }
        return arr;
    };

    /**
     * i18n
     */
    SelectPage.prototype.setLanguage = function () {
        var message, p = this.option;
        switch (p.lang) {
            // English
            case 'en':
                message = {
                    add_btn: 'Add button',
                    add_title: 'add a box',
                    del_btn: 'Del button',
                    del_title: 'delete a box',
                    next: 'Next',
                    next_title: 'Next' + p.pageSize + ' (Right key)',
                    prev: 'Prev',
                    prev_title: 'Prev' + p.pageSize + ' (Left key)',
                    first_title: 'First (Shift + Left key)',
                    last_title: 'Last (Shift + Right key)',
                    get_all_btn: 'Get All (Down key)',
                    get_all_alt: '(button)',
                    close_btn: 'Close (Tab key)',
                    close_alt: '(button)',
                    loading: 'loading...',
                    loading_alt: '(loading)',
                    page_info: 'page_num of page_count',
                    select_ng: 'Attention : Please choose from among the list.',
                    select_ok: 'OK : Correctly selected.',
                    not_found: 'not found',
                    ajax_error: 'An error occurred while connecting to server.',
                    clear: 'Clear content',
                    select_all: 'Select current page',
                    unselect_all: 'Clear current page',
                    clear_all: 'Clear all selected',
                    max_selected: 'You can only select up to max_selected_limit items'
                };
                break;
            // 中文
            case 'cn':
            default:
                message = {
                    add_btn: '添加按钮',
                    add_title: '添加区域',
                    del_btn: '删除按钮',
                    del_title: '删除区域',
                    next: '下一页',
                    next_title: '下' + p.pageSize + ' (→)',
                    prev: '上一页',
                    prev_title: '上' + p.pageSize + ' (←)',
                    first_title: '首页 (Shift + ←)',
                    last_title: '尾页 (Shift + →)',
                    get_all_btn: '获得全部 (↓)',
                    get_all_alt: '(按钮)',
                    close_btn: '关闭 (Tab键)',
                    close_alt: '(按钮)',
                    loading: '读取中...',
                    loading_alt: '(读取中)',
                    page_info: '第 page_num 页(共page_count页)',
                    select_ng: '请注意：请从列表中选择.',
                    select_ok: 'OK : 已经选择.',
                    not_found: '无查询结果',
                    ajax_error: '连接到服务器时发生错误！',
                    clear: '清除内容',
                    select_all: '选择当前页项目',
                    unselect_all: '取消选择当前页项目',
                    clear_all: '清除全部已选择项目',
                    max_selected: '最多只能选择 max_selected_limit 个项目'
                };
                break;
        }
        this.message = message;
    };

    /**
     * Css classname defined
     */
    SelectPage.prototype.setCssClass = function () {
        var css_class = {
            container: 'sp_container',
            container_open: 'sp_container_open',
            re_area: 'sp_result_area',
            result_open: 'sp_result_area_open',
            control_box: 'sp_control_box',
            //multiple select mode
            element_box: 'sp_element_box',
            navi: 'sp_navi',
            //result list
            results: 'sp_results',
            re_off: 'sp_results_off',
            select: 'sp_over',
            select_ok: 'sp_select_ok',
            select_ng: 'sp_select_ng',
            selected: 'sp_selected',
            input_off: 'sp_input_off',
            message_box: 'sp_message_box',
            disabled: 'sp_disabled',

            button: 'sp_button',
            caret_open: 'sp_caret_open',
            btn_on: 'sp_btn_on',
            btn_out: 'sp_btn_out',
            input: 'sp_input',
            clear_btn: 'sp_clear_btn',
            align_right: 'sp_align_right'
        };
        this.css_class = css_class;
    };

    /**
     * Plugin inner properties
     */
    SelectPage.prototype.setProp = function () {
        this.prop = {
            //input disabled status
            disabled: false,
            current_page: 1,
            //total page
            max_page: 1,
            //ajax data loading status
            is_loading: false,
            xhr: false,
            key_paging: false,
            key_select: false,
            //last selected item value
            prev_value: '',
            //last selected item text
            selected_text: '',
            last_input_time: undefined,
            init_set: false
        };
        this.template = {
            tag: {
                content: '<li class="selected_tag" itemvalue="#item_value#">#item_text#<span class="tag_close"><i class="spfont sp-close"></i></span></li>',
                textKey: '#item_text#',
                valueKey: '#item_value#'
            },
            page: {
                current: 'page_num',
                total: 'page_count'
            },
            msg: {
                maxSelectLimit: 'max_selected_limit'
            }
        };
    };

    /**
     * Get the actual width/height of invisible DOM elements with jQuery.
     * Source code come from dreamerslab/jquery.actual
     * @param element
     * @param method
     * @returns {*}
     */
    SelectPage.prototype.elementRealSize = function (element, method) {
        var defaults = {
            absolute: false,
            clone: false,
            includeMargin: false,
            display: 'block'
        };
        var configs = defaults, $target = element.eq(0), fix, restore, tmp = [], style = '', $hidden;

        fix = function () {
            // get all hidden parents
            $hidden = $target.parents().addBack().filter(':hidden');
            style += 'visibility: hidden !important; display: ' + configs.display + ' !important; ';

            if (configs.absolute === true) style += 'position: absolute !important;';

            // save the origin style props
            // set the hidden el css to be got the actual value later
            $hidden.each(function () {
                // Save original style. If no style was set, attr() returns undefined
                var $this = $(this), thisStyle = $this.attr('style');
                tmp.push(thisStyle);
                // Retain as much of the original style as possible, if there is one
                $this.attr('style', thisStyle ? thisStyle + ';' + style : style);
            });
        };

        restore = function () {
            // restore origin style values
            $hidden.each(function (i) {
                var $this = $(this), _tmp = tmp[i];

                if (_tmp === undefined) $this.removeAttr('style');
                else $this.attr('style', _tmp);
            });
        };

        fix();
        // get the actual value with user specific methed
        // it can be 'width', 'height', 'outerWidth', 'innerWidth'... etc
        // configs.includeMargin only works for 'outerWidth' and 'outerHeight'
        var actual = /(outer)/.test(method) ?
            $target[method](configs.includeMargin) :
            $target[method]();

        restore();
        // IMPORTANT, this plugin only return the value of the first element
        return actual;
    };

    /**
     * Dom building
     * @param {Object} combo_input - original input element
     */
    SelectPage.prototype.setElem = function (combo_input) {
        // 1. build Dom object
        var elem = {}, p = this.option, css = this.css_class, msg = this.message, input = $(combo_input);
        var cssWidth = input.css("width");
        var orgWidth = input.outerWidth();
        if (cssWidth.indexOf("%") > -1 || input.parent().size() > 0 && input.parent().width() == orgWidth) {
            orgWidth = "100%";
        } else {
            // fix input width in hidden situation
            if (orgWidth <= 0) orgWidth = this.elementRealSize(input, 'outerWidth');
            if (orgWidth < 150) orgWidth = 150;

        }
        elem.combo_input = input.attr({'autocomplete': 'off'}).addClass(css.input).wrap('<div>');
        if (p.selectOnly) elem.combo_input.prop('readonly', true);
        elem.container = elem.combo_input.parent().addClass(css.container);
        if (elem.combo_input.prop('disabled')) {
            if (p.multiple) elem.container.addClass(css.disabled);
            else elem.combo_input.addClass(css.input_off);
        }

        // set outer box width
        elem.container.width(orgWidth);

        elem.button = $('<div>').addClass(css.button);
        //drop down button
        elem.dropdown = $('<span class="sp_caret"></span>');
        //clear button 'X' in single mode
        elem.clear_btn = $('<div>').html($('<i>').addClass('spfont sp-close')).addClass(css.clear_btn).attr('title', msg.clear);
        if (!p.dropButton) elem.clear_btn.addClass(css.align_right);

        //main box in multiple mode
        elem.element_box = $('<ul>').addClass(css.element_box);
        if (p.multiple && p.multipleControlbar)
            elem.control = $('<div>').addClass(css.control_box);
        //result list box
        elem.result_area = $('<div>').addClass(css.re_area);
        //pagination bar
        if (p.pagination) elem.navi = $('<div>').addClass('sp_pagination').append('<ul>');
        elem.results = $('<ul>').addClass(css.results);

        var namePrefix = '_text',
            input_id = elem.combo_input.attr('id') || elem.combo_input.attr('name'),
            input_name = elem.combo_input.attr('name') || 'selectPage',
            hidden_name = input_name,
            hidden_id = input_id;

        //switch the id and name attributes of input/hidden element
        elem.hidden = $('<input type="hidden" class="sp_hidden" />').attr({
            name: hidden_name,
            id: hidden_id
        }).val('');
        elem.combo_input.attr({
            name: typeof input.data('name') !== 'undefined' ? input.data('name') : input_name + namePrefix,
            id: input_id + namePrefix
        });

        // 2. DOM element put
        elem.container.append(elem.hidden);
        if (p.dropButton) {
            elem.container.append(elem.button)
            elem.button.append(elem.dropdown);
        }
        $(document.body).append(elem.result_area);
        elem.result_area.append(elem.results);
        if (p.pagination) elem.result_area.append(elem.navi);

        //Multiple select mode
        if (p.multiple) {
            if (p.multipleControlbar) {
                elem.control.append('<button type="button" class="btn btn-default sp_clear_all" ><i class="spfont sp-clear"></i></button>');
                elem.control.append('<button type="button" class="btn btn-default sp_unselect_all" ><i class="spfont sp-unselect-all"></i></button>');
                elem.control.append('<button type="button" class="btn btn-default sp_select_all" ><i class="spfont sp-select-all"></i></button>');
                elem.control_text = $('<p>');
                elem.control.append(elem.control_text);
                elem.result_area.prepend(elem.control);
            }
            elem.container.addClass('sp_container_combo');
            elem.combo_input.addClass('sp_combo_input').before(elem.element_box);
            var li = $('<li>').addClass('input_box');
            li.append(elem.combo_input);
            elem.element_box.append(li);
            if (elem.combo_input.attr('placeholder')) elem.combo_input.attr('placeholder_bak', elem.combo_input.attr('placeholder'));
        }

        this.elem = elem;
    };

    /**
     * Drop down button set to default
     */
    SelectPage.prototype.setButtonAttrDefault = function () {
        /*
        if (this.option.selectOnly) {
            if ($(this.elem.combo_input).val() !== '') {
                if ($(this.elem.hidden).val() !== '') {
                    //选择条件
                    $(this.elem.combo_input).attr('title', this.message.select_ok).removeClass(this.css_class.select_ng).addClass(this.css_class.select_ok);
                } else {
                    //输入方式
                    $(this.elem.combo_input).attr('title', this.message.select_ng).removeClass(this.css_class.select_ok).addClass(this.css_class.select_ng);
                }
            } else {
                $(this.elem.hidden).val('');
                $(this.elem.combo_input).removeAttr('title').removeClass(this.css_class.select_ng);
            }
        }
        */
        //this.elem.button.attr('title', this.message.get_all_btn);
        if (this.option.dropButton)
            this.elem.button.attr('title', this.message.close_btn);
    };

    /**
     * Set item need selected after init
     * set selected item ways:
     * <input value="key">
     * <input data-init="key">
     */
    SelectPage.prototype.setInitRecord = function (refresh) {
        var self = this, p = self.option, el = self.elem, key = '';
        if ($.type(el.combo_input.data('init')) != 'undefined')
            p.initRecord = String(el.combo_input.data('init'));
        //data-init and value attribute can be init plugin selected item
        //but, if set data-init and value attribute in the same time, plugin will choose data-init attribute first
        if (!refresh && !p.initRecord && el.combo_input.val())
            p.initRecord = el.combo_input.val();
        el.combo_input.val('');
        if (!refresh) el.hidden.val(p.initRecord);
        key = refresh && el.hidden.val() ? el.hidden.val() : p.initRecord;
        if (key) {
            if (typeof p.data === 'object') {
                var data = new Array();
                var keyarr = key.split(',');
                $.each(keyarr, function (index, row) {
                    for (var i = 0; i < p.data.length; i++) {
                        if (p.data[i][p.keyField] == row) {
                            data.push(p.data[i]);
                            break;
                        }
                    }
                });
                if (!p.multiple && data.length > 1) data = [data[0]];
                self.afterInit(self, data);
            } else {//ajax data source mode to init selected item
                var _paramsFunc = p.params, _params = {}, searchKey = p.searchField;
                var _orgParams = {
                    searchTable: p.dbTable,
                    searchKey: p.keyField,
                    searchValue: key,
                    orderBy: p.orderBy,
                    showField: p.showField,
                    keyField: p.keyField,
                    keyValue: key,
                    searchField: p.searchField
                };
                if (_paramsFunc) {
                    var result = $.isFunction(_paramsFunc) ? _paramsFunc(self) : _paramsFunc;
                    if (result && $.isPlainObject(result)) {
                        _params = $.extend({}, _orgParams, result);
                    } else {
                        _params = _orgParams;
                    }
                } else {
                    _params = _orgParams;
                }
                $.ajax({
                    dataType: 'json',
                    type: 'POST',
                    url: p.data,
                    data: _params,
                    success: function (json) {
                        var d = null;
                        if (p.eAjaxSuccess && $.isFunction(p.eAjaxSuccess))
                            d = p.eAjaxSuccess(json);
                        self.afterInit(self, d.list);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        self.ajaxErrorNotify(self, errorThrown);
                    }
                });
            }
        }
    };

    /**
     * Selected item set to plugin
     * @param {Object} self
     * @param {Object} data - selected item data
     */
    SelectPage.prototype.afterInit = function (self, data) {
        if (!data || ($.isArray(data) && data.length === 0)) return;
        if (!$.isArray(data)) data = [data];
        var p = self.option, css = self.css_class;

        self.data = data;

        if (p.multiple) {
            self.prop.init_set = true;
            self.clearAll(self);
            $.each(data, function (i, row) {
                var value = row[p.keyField];
                var text = row[p.showField];
                var item = {text: text, value: value};
                if (!self.isAlreadySelected(self, item)) self.addNewTag(self, row, item);
            });
            self.tagValuesSet(self);
            self.inputResize(self);
            self.elem.hidden.blur();
            self.prop.init_set = false;
        } else {
            var row = data[0];
            var value = row[p.keyField];
            var text = row[p.showField];
            self.elem.combo_input.val(text);
            self.elem.hidden.val(value);
            self.prop.prev_value = text;
            self.prop.selected_text = text;
            if (p.selectOnly) {
                self.elem.combo_input.attr('title', self.message.select_ok).removeClass(css.select_ng).addClass(css.select_ok);
            }
            self.putClearButton();
        }
    };

    /**
     * Drop down button event bind
     */
    SelectPage.prototype.eDropdownButton = function () {
        var self = this;
        if (self.option.dropButton) {
            self.elem.button.mouseup(function (ev) {
                ev.stopPropagation();
                if (self.elem.result_area.is(':hidden') && !self.elem.combo_input.prop('disabled')) {
                    self.elem.combo_input.focus();
                } else self.hideResults(self);
            });
        }
    };

    /**
     * Events bind
     */
    SelectPage.prototype.eInput = function () {
        var self = this, p = self.option, el = self.elem, msg = self.message;
        var showList = function () {
            self.prop.page_move = false;
            self.suggest(self);
            self.setCssFocusedInput(self);
        };
        el.combo_input.keyup(function (e) {
            self.processKey(self, e);
        }).keydown(function (e) {
            self.processControl(self, e);
        }).focus(function (e) {
            //When focus on input, show the result list
            if (el.result_area.is(':hidden')) {
                e.stopPropagation();
                self.prop.first_show = true;
                showList();
            }
        });
        el.container.on('click.SelectPage', 'div.' + self.css_class.clear_btn, function (e) {
            e.stopPropagation();
            if (!self.disabled(self)) {
                self.clearAll(self, true);
                self.elem.hidden.change();
                if (p.eClear && $.isFunction(p.eClear)) p.eClear(self);
            }
        });
        el.result_area.on('mousedown.SelectPage', function (e) {
            e.stopPropagation();
        });
        if (p.multiple) {
            if (p.multipleControlbar) {
                //Select all item of current page
                el.control.find('.sp_select_all').on('click.SelectPage', function (e) {
                    self.selectAllLine(self);
                }).hover(function () {
                    el.control_text.html(msg.select_all);
                }, function () {
                    el.control_text.html('');
                });
                //Cancel select all item of current page
                el.control.find('.sp_unselect_all').on('click.SelectPage', function (e) {
                    self.unSelectAllLine(self);
                }).hover(function () {
                    el.control_text.html(msg.unselect_all);
                }, function () {
                    el.control_text.html('');
                });
                //Clear all selected item
                el.control.find('.sp_clear_all').on('click.SelectPage', function (e) {
                    self.clearAll(self, true);
                }).hover(function () {
                    el.control_text.html(msg.clear_all);
                }, function () {
                    el.control_text.html('');
                });
            }
            el.element_box.on('click.SelectPage', function (e) {
                var srcEl = e.target || e.srcElement;
                if ($(srcEl).is('ul')) el.combo_input.focus();
            });
            //Tag close
            el.element_box.on('click.SelectPage', 'span.tag_close', function () {
                var li = $(this).closest('li'), data = li.data('dataObj');
                self.removeTag(self, li);
                showList();
                if (p.eTagRemove && $.isFunction(p.eTagRemove)) p.eTagRemove([data]);
            });
            self.inputResize(self);
        }
    };

    /**
     * Out of plugin area click event handler
     */
    SelectPage.prototype.eWhole = function () {
        var self = this, css = self.css_class;
        var cleanContent = function (obj) {
            obj.elem.combo_input.val('');
            if (!obj.option.multiple) obj.elem.hidden.val('');
            obj.prop.selected_text = '';
        };

        //Out of plugin area
        $(document.body).off('mousedown.selectPage').on('mousedown.selectPage', function (e) {
            var ele = e.target || e.srcElement;
            var sp = $(ele).closest('div.' + css.container);
            //Open status result list
            $('div.' + css.container + '.' + css.container_open).each(function () {
                if (this == sp[0]) return;
                var $this = $(this), d = $this.find('input.' + css.input).data(SelectPage.dataKey);

                if (!d.elem.combo_input.val() && d.elem.hidden.val() && !d.option.multiple) {
                    d.prop.current_page = 1;//reset page to 1
                    cleanContent(d);
                    d.hideResults(d);
                    return true;
                }
                if (d.elem.results.find('li').not('.' + css.message_box).length) {
                    if (d.option.autoFillResult) {
                        //have selected item, then hide result list
                        if (d.elem.hidden.val()) d.hideResults(d);
                        else if (d.elem.results.find('li.sp_over').length) {
                            //no one selected and have highlight item, select the highlight item
                            d.selectCurrentLine(d, true);
                        } else if (d.option.autoSelectFirst) {
                            //no one selected, no one highlight, select the first item
                            d.nextLine(d);
                            d.selectCurrentLine(d, true);
                        } else d.hideResults(d);
                    } else d.hideResults(d);
                } else {
                    //when no one item match, clear search keywords
                    if (d.option.noResultClean) cleanContent(d);
                    else {
                        if (!d.option.multiple) d.elem.hidden.val('');
                    }
                    d.hideResults(d);
                }
            });
        });
    };

    /**
     * Result list event bind
     */
    SelectPage.prototype.eResultList = function () {
        var self = this, css = this.css_class;
        self.elem.results.children('li').hover(function () {
            if (self.prop.key_select) {
                self.prop.key_select = false;
                return;
            }
            if (!$(this).hasClass(css.selected) && !$(this).hasClass(css.message_box)) {
                $(this).addClass(css.select);
                self.setCssFocusedResults(self);
            }
        }, function () {
            $(this).removeClass(css.select);
        }).click(function (e) {
            if (self.prop.key_select) {
                self.prop.key_select = false;
                return;
            }
            e.preventDefault();
            e.stopPropagation();

            if (!$(this).hasClass(css.selected)) self.selectCurrentLine(self, false);
        });
    };

    /**
     * Reposition result list when list beyond the visible area
     */
    SelectPage.prototype.eScroll = function () {
        var self = this, css = this.css_class;
        $(window).on('scroll.SelectPage', function (e) {
            $('div.' + css.container + '.' + css.container_open).each(function () {
                var $this = $(this), d = $this.find('input.' + css.input).data(SelectPage.dataKey),
                    offset = d.elem.result_area.offset(),
                    screenScrollTop = $(window).scrollTop(),
                    docHeight = $(document).height(),
                    viewHeight = $(window).height(),
                    listHeight = d.elem.result_area.outerHeight(),
                    listBottom = offset.top + listHeight,
                    hasOverflow = docHeight > viewHeight,
                    down = d.elem.result_area.hasClass('shadowDown');
                if (hasOverflow) {
                    if (down) {//open down
                        if (listBottom > (viewHeight + screenScrollTop)) d.calcResultsSize(d);
                    } else {//open up
                        if (offset.top < screenScrollTop) d.calcResultsSize(d);
                    }
                }
            });
        });
    };

    /**
     * Page bar button event bind
     */
    SelectPage.prototype.ePaging = function () {
        var self = this;
        if (!self.option.pagination) return;
        self.elem.navi.find('li.csFirstPage').off('click').on('click', function (ev) {
            //$(self.elem.combo_input).focus();
            ev.preventDefault();
            self.firstPage(self);
        });

        self.elem.navi.find('li.csPreviousPage').off('click').on('click', function (ev) {
            //$(self.elem.combo_input).focus();
            ev.preventDefault();
            self.prevPage(self);
        });

        self.elem.navi.find('li.csNextPage').off('click').on('click', function (ev) {
            //$(self.elem.combo_input).focus();
            ev.preventDefault();
            self.nextPage(self);
        });

        self.elem.navi.find('li.csLastPage').off('click').on('click', function (ev) {
            //$(self.elem.combo_input).focus();
            ev.preventDefault();
            self.lastPage(self);
        });
    };

    /**
     * Ajax request fail
     * @param {Object} self
     * @param {string} errorThrown
     */
    SelectPage.prototype.ajaxErrorNotify = function (self, errorThrown) {
        self.showMessage(self.message.ajax_error);
    };

    /**
     * Message box
     * @param {Object} self
     * @param msg {string} the text need to show
     */
    SelectPage.prototype.showMessage = function (self, msg) {
        if (!msg) return;
        var msgLi = '<li class="' + self.css_class.message_box + '"><i class="spfont sp-warning"></i> ' + msg + '</li>';
        self.elem.results.empty().append(msgLi).show();
        self.calcResultsSize(self);
        self.setOpenStatus(self, true);
        self.elem.control.hide();
        if (self.option.pagination) self.elem.navi.hide();
    };

    /**
     * @desc Scroll
     * @param {Object} self
     * @param {boolean} enforce
     */
    SelectPage.prototype.scrollWindow = function (self, enforce) {
        var current_result = self.getCurrentLine(self),
            target_top = (current_result && !enforce) ? current_result.offset().top : self.elem.container.offset().top,
            target_size;

        self.prop.size_li = self.elem.results.children('li:first').outerHeight();
        target_size = self.prop.size_li;

        var gap, client_height = $(window).height(),
            scroll_top = $(window).scrollTop(),
            scroll_bottom = scroll_top + client_height - target_size;
        if (current_result.length) {
            if (target_top < scroll_top || target_size > client_height) {
                //scroll to top
                gap = target_top - scroll_top;
            } else if (target_top > scroll_bottom) {
                //scroll down
                gap = target_top - scroll_bottom;
            } else return; //do not scroll
        } else if (target_top < scroll_top) gap = target_top - scroll_top;
        window.scrollBy(0, gap);
    };
    /**
     * change css class by status
     * @param self
     * @param status {boolean} true: open, false: close
     */
    SelectPage.prototype.setOpenStatus = function (self, status) {
        var el = self.elem, css = self.css_class;
        if (status) {
            el.container.addClass(css.container_open);
            el.result_area.addClass(css.result_open);
        } else {
            el.container.removeClass(css.container_open);
            el.result_area.removeClass(css.result_open);
        }
    };

    /**
     * input element in focus css class set
     * @param {Object} self
     */
    SelectPage.prototype.setCssFocusedInput = function (self) {
        //$(self.elem.results).addClass(self.css_class.re_off);
        //$(self.elem.combo_input).removeClass(self.css_class.input_off);
    };

    /**
     * set result list get focus and input element lost focus
     * @param {Object} self
     */
    SelectPage.prototype.setCssFocusedResults = function (self) {
        //$(self.elem.results).removeClass(self.css_class.re_off);
        //$(self.elem.combo_input).addClass(self.css_class.input_off);
    };

    /**
     * Quick search input keywords listener
     * @param {Object} self
     */
    SelectPage.prototype.checkValue = function (self) {
        var now_value = self.elem.combo_input.val();
        if (now_value != self.prop.prev_value) {
            self.prop.prev_value = now_value;
            self.prop.first_show = false;

            if (self.option.selectOnly) self.setButtonAttrDefault();
            if (!self.option.multiple && !now_value) {
                self.elem.combo_input.val('');
                self.elem.hidden.val('');
                self.elem.clear_btn.remove();
            }

            self.suggest(self);
        }
    };

    /**
     * Input handle（regular input）
     * @param {Object} self
     * @param {Object} e - event object
     */
    SelectPage.prototype.processKey = function (self, e) {
        if ($.inArray(e.keyCode, [37, 38, 39, 40, 27, 9, 13]) === -1) {
            if (e.keyCode != 16) self.setCssFocusedInput(self); // except Shift(16)
            self.inputResize(self);
            if ($.type(self.option.data) === 'string') {
                self.prop.last_input_time = e.timeStamp;
                setTimeout(function () {
                    if ((e.timeStamp - self.prop.last_input_time) === 0)
                        self.checkValue(self);
                }, self.option.inputDelay * 1000);
            } else {
                self.checkValue(self);
            }
        }
    }

    /**
     * Input handle（control key）
     * @param {Object} self
     * @param {Object} e - event object
     */
    SelectPage.prototype.processControl = function (self, e) {
        if (($.inArray(e.keyCode, [37, 38, 39, 40, 27, 9]) > -1 && self.elem.result_area.is(':visible')) ||
            ($.inArray(e.keyCode, [13, 9]) > -1 && self.getCurrentLine(self))) {
            e.preventDefault();
            e.stopPropagation();
            e.cancelBubble = true;
            e.returnValue = false;
            switch (e.keyCode) {
                case 37:// left
                    if (e.shiftKey) self.firstPage(self);
                    else self.prevPage(self);
                    break;
                case 38:// up
                    self.prop.key_select = true;
                    self.prevLine(self);
                    break;
                case 39:// right
                    if (e.shiftKey) self.lastPage(self);
                    else self.nextPage(self);
                    break;
                case 40:// down
                    if (self.elem.results.children('li').length) {
                        self.prop.key_select = true;
                        self.nextLine(self);
                    } else self.suggest(self);
                    break;
                case 9:// tab
                    self.prop.key_paging = true;
                    self.selectCurrentLine(self, true);
                    //self.hideResults(self);
                    break;
                case 13:// return
                    self.selectCurrentLine(self, true);
                    break;
                case 27://  escape
                    self.prop.key_paging = true;
                    self.hideResults(self);
                    break;
            }
        }
    };

    /**
     * Abort Ajax request
     * @param {Object} self
     */
    SelectPage.prototype.abortAjax = function (self) {
        if (self.prop.xhr) {
            self.prop.xhr.abort();
            self.prop.xhr = false;
        }
    };

    /**
     * Suggest result of search keywords
     * @param {Object} self
     */
    SelectPage.prototype.suggest = function (self) {
        var q_word, val = $.trim(self.elem.combo_input.val());
        if (self.option.multiple) q_word = val;
        else {
            if (val && val === self.prop.selected_text) q_word = '';
            else q_word = val;
        }
        q_word = q_word.split(/[\s　]+/);

        //Before show up result list callback
        if (self.option.eOpen && $.isFunction(self.option.eOpen))
            self.option.eOpen.call(self);

        self.abortAjax(self);
        //self.setLoading(self);
        var which_page_num = self.prop.current_page || 1;

        if (typeof self.option.data == 'object') self.searchForJson(self, q_word, which_page_num);
        else self.searchForDb(self, q_word, which_page_num);
    };

    /**
     * Loading
     * @param {Object} self
     */
    SelectPage.prototype.setLoading = function (self) {
        if (self.elem.results.html() === '') {
            //self.calcResultsSize(self);
            self.setOpenStatus(self, true);
        }
    };

    /**
     * Search for ajax
     * @param {Object} self
     * @param {Array} q_word - query keyword
     * @param {number} which_page_num - target page number
     */
    SelectPage.prototype.searchForDb = function (self, q_word, which_page_num) {
        var p = self.option;
        if (!p.eAjaxSuccess || !$.isFunction(p.eAjaxSuccess)) self.hideResults(self);
        var _paramsFunc = p.params, _params = {}, searchKey = p.searchField;
        //when have new query keyword, then reset page number to 1.
        if (q_word.length && q_word[0] && q_word[0] !== self.prop.prev_value) which_page_num = 1;
        var _orgParams = {
            q_word: q_word,
            pageNumber: which_page_num,
            pageSize: p.pageSize,
            andOr: p.andOr,
            orderBy: p.orderBy,
            searchTable: p.dbTable,
            showField: self.option.showField,
            keyField: self.option.keyField,
            searchField: self.option.searchField
        };
        if (p.orderBy !== false) _orgParams.orderBy = p.orderBy;
        _orgParams[searchKey] = q_word[0];

        if (_paramsFunc) {
            var result = $.isFunction(_paramsFunc) ? _paramsFunc(self) : _paramsFunc;
            if (result && $.isPlainObject(result)) {
                _params = $.extend({}, _orgParams, result);
            } else {
                _params = _orgParams;
            }
        } else {
            _params = _orgParams;
        }
        self.prop.xhr = $.ajax({
            dataType: 'json',
            url: p.data,
            type: 'POST',
            data: _params,
            success: function (returnData) {
                if (!returnData || !$.isPlainObject(returnData)) {
                    self.hideResults(self);
                    self.ajaxErrorNotify(self, errorThrown);
                    return;
                }
                var data = {}, json = {};
                try {
                    data = p.eAjaxSuccess(returnData);
                    json.originalResult = data.list;
                    json.cnt_whole = data.totalRow;
                } catch (e) {
                    self.showMessage(self, self.message.ajax_error);
                    return;
                }
                if (self.elem.navi) {
                    $(self.elem.navi).toggleClass("hide", json.cnt_whole <= json.originalResult.length);
                }

                json.candidate = [];
                json.keyField = [];
                if (typeof json.originalResult != 'object') {
                    self.prop.xhr = null;
                    self.notFoundSearch(self);
                    return;
                }
                json.cnt_page = json.originalResult.length;
                for (var i = 0; i < json.cnt_page; i++) {
                    for (var key in json.originalResult[i]) {
                        if (key == p.keyField) {
                            json.keyField.push(json.originalResult[i][key]);
                        }
                        if (key == p.showField) {
                            json.candidate.push(json.originalResult[i][key]);
                        }
                    }
                }
                self.prepareResults(self, json, q_word, which_page_num);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (textStatus != 'abort') {
                    self.hideResults(self);
                    self.ajaxErrorNotify(self, errorThrown);
                }
            },
            complete: function () {
                self.prop.xhr = null;
            }
        });
    };

    /**
     * Search for json data source
     * @param {Object} self
     * @param {Array} q_word
     * @param {number} which_page_num
     */
    SelectPage.prototype.searchForJson = function (self, q_word, which_page_num) {
        var p = self.option, matched = [], esc_q = [], sorted = [], json = {}, i = 0, arr_reg = [];

        //query keyword filter
        do {
            //'/\W/g'正则代表全部不是字母，数字，下划线，汉字的字符
            //将非法字符进行转义
            esc_q[i] = q_word[i].replace(/\W/g, '\\$&').toString();
            arr_reg[i] = new RegExp(esc_q[i], 'gi');
            i++;
        } while (i < q_word.length);

        // SELECT * FROM data WHERE field LIKE q_word;
        for (var i = 0; i < p.data.length; i++) {
            var flag = false, row = p.data[i], itemText;
            for (var j = 0; j < arr_reg.length; j++) {
                itemText = row[p.searchField];
                if (p.formatItem && $.isFunction(p.formatItem))
                    itemText = p.formatItem(row);
                if (itemText.match(arr_reg[j])) {
                    flag = true;
                    if (p.andOr == 'OR') break;
                } else {
                    flag = false;
                    if (p.andOr == 'AND') break;
                }
            }
            if (flag) matched.push(row);
        }

        // (CASE WHEN ...) then く order some column
        if (p.orderBy === false) sorted = matched.concat();
        else {
            var reg1 = new RegExp('^' + esc_q[0] + '$', 'gi'),
                reg2 = new RegExp('^' + esc_q[0], 'gi'),
                matched1 = [], matched2 = [], matched3 = [];
            for (var i = 0; i < matched.length; i++) {
                var orderField = p.orderBy[0][0];
                var orderValue = String(matched[i][orderField]);
                if (orderValue.match(reg1)) {
                    matched1.push(matched[i]);
                } else if (orderValue.match(reg2)) {
                    matched2.push(matched[i]);
                } else {
                    matched3.push(matched[i]);
                }
            }

            if (p.orderBy[0][1].match(/^asc$/i)) {
                matched1 = self.sortAsc(self, matched1);
                matched2 = self.sortAsc(self, matched2);
                matched3 = self.sortAsc(self, matched3);
            } else {
                matched1 = self.sortDesc(self, matched1);
                matched2 = self.sortDesc(self, matched2);
                matched3 = self.sortDesc(self, matched3);
            }
            sorted = sorted.concat(matched1).concat(matched2).concat(matched3);
        }

        /*
         if (sorted.length === undefined || sorted.length === 0 ) {
         self.notFoundSearch(self);
         return;
         }
         */
        json.cnt_whole = sorted.length;
        //page_move used to distinguish between init plugin or page moving
        if (!self.prop.page_move) {
            //only single mode can be used page number relocation
            if (!p.multiple) {
                //get selected item belong page number
                var currentValue = self.elem.hidden.val();
                if ($.type(currentValue) !== 'undefined' && $.trim(currentValue) !== '') {
                    var index = 0;
                    $.each(sorted, function (i, row) {
                        if (row[p.keyField] == currentValue) {
                            index = i + 1;
                            return false;
                        }
                    });
                    which_page_num = Math.ceil(index / p.pageSize);
                    if (which_page_num < 1) which_page_num = 1;
                    self.prop.current_page = which_page_num;
                }
            }
        } else {
            //set page number to 1 when result number less then page size
            if (sorted.length <= ((which_page_num - 1) * p.pageSize)) {
                which_page_num = 1;
                self.prop.current_page = 1;
            }
        }

        //LIMIT xx OFFSET xx
        var start = (which_page_num - 1) * p.pageSize, end = start + p.pageSize;
        //save original data
        json.originalResult = [];
        //after data filter handle
        for (var i = start; i < end; i++) {
            if (sorted[i] === undefined) break;
            json.originalResult.push(sorted[i]);
            for (var key in sorted[i]) {
                if (key == p.keyField) {
                    if (json.keyField === undefined) json.keyField = [];
                    json.keyField.push(sorted[i][key]);
                }
                if (key == p.showField) {
                    if (json.candidate === undefined) json.candidate = [];
                    json.candidate.push(sorted[i][key]);
                }
            }
        }

        if (json.candidate === undefined) json.candidate = [];
        json.cnt_page = json.candidate.length;
        self.prepareResults(self, json, q_word, which_page_num);
    };

    /**
     * Set order asc
     * @param {Object} self
     * @param {Array} arr - result array
     */
    SelectPage.prototype.sortAsc = function (self, arr) {
        arr.sort(function (a, b) {
            var valA = a[self.option.orderBy[0][0]], valB = b[self.option.orderBy[0][0]];
            return $.type(valA) === 'number' ? valA - valB : String(valA).localeCompare(String(valB));
        });
        return arr;
    };

    /**
     * Set order desc
     * @param {Object} self
     * @param {Array} arr - result array
     */
    SelectPage.prototype.sortDesc = function (self, arr) {
        arr.sort(function (a, b) {
            var valA = a[self.option.orderBy[0][0]], valB = b[self.option.orderBy[0][0]];
            return $.type(valA) === 'number' ? valB - valA : String(valB).localeCompare(String(valA));
        });
        return arr;
    };

    /**
     * Not result found handle
     * @param {Object} self
     */
    SelectPage.prototype.notFoundSearch = function (self) {
        self.elem.results.empty();
        self.calcResultsSize(self);
        self.setOpenStatus(self, true);
        self.setCssFocusedInput(self);
    };

    /**
     * Prepare data to show
     * @param {Object} self
     * @param {Object} json - data result
     * @param {Array} q_word - query keyword
     * @param {number} which_page_num - target page number
     */
    SelectPage.prototype.prepareResults = function (self, json, q_word, which_page_num) {
        self.data = json.originalResult;
        if (self.option.pagination) self.setNavi(self, json.cnt_whole, json.cnt_page, which_page_num);

        if (!json.keyField) json.keyField = false;

        if (self.option.selectOnly && json.candidate.length === 1 && json.candidate[0] == q_word[0]) {
            self.elem.hidden.val(json.keyField[0]);
            this.setButtonAttrDefault();
        }
        var is_query = false;
        if (q_word && q_word.length && q_word[0]) is_query = true;
        self.displayResults(self, json, is_query);
    };

    /**
     * Build page bar
     * @param {Object} self
     * @param {number} cnt_whole - total record count
     * @param {number} cnt_page
     * @param {number} page_num - current page number
     */
    SelectPage.prototype.setNavi = function (self, cnt_whole, cnt_page, page_num) {
        var msg = self.message;
        /**
         * build pagination bar
         */
        var buildPageNav = function (self, pagebar, page_num, last_page) {
            var updatePageInfo = function () {
                var pageInfo = msg.page_info;
                return pageInfo.replace(self.template.page.current, page_num).replace(self.template.page.total, last_page);
            };
            if (pagebar.find('li').length === 0) {
                pagebar.hide().empty();
                var iconFist = 'spfont sp-first',
                    iconPrev = 'spfont sp-previous',
                    iconNext = 'spfont sp-next',
                    iconLast = 'spfont sp-last';

                pagebar.append('<li class="csFirstPage" title="' + msg.first_title + '" ><a href="javascript:void(0);"> <i class="' + iconFist + '"></i> </a></li>');
                pagebar.append('<li class="csPreviousPage" title="' + msg.prev_title + '" ><a href="javascript:void(0);"><i class="' + iconPrev + '"></i></a></li>');
                //pagination information
                pagebar.append('<li class="pageInfoBox"><a href="javascript:void(0);"> ' + updatePageInfo() + ' </a></li>');

                pagebar.append('<li class="csNextPage" title="' + msg.next_title + '" ><a href="javascript:void(0);"><i class="' + iconNext + '"></i></a></li>');
                pagebar.append('<li class="csLastPage" title="' + msg.last_title + '" ><a href="javascript:void(0);"> <i class="' + iconLast + '"></i> </a></li>');
                pagebar.show();
            } else {
                pagebar.find('li.pageInfoBox a').html(updatePageInfo());
            }
        };

        var pagebar = self.elem.navi.find('ul'),
            last_page = Math.ceil(cnt_whole / self.option.pageSize); //calculate total page
        if (last_page === 0) page_num = 0;
        else {
            if (last_page < page_num) page_num = last_page;
            else if (page_num === 0) page_num = 1;
        }
        self.prop.current_page = page_num;//update current page number
        self.prop.max_page = last_page;//update page count
        buildPageNav(self, pagebar, page_num, last_page);

        //update paging status
        var dClass = 'disabled',
            first = pagebar.find('li.csFirstPage'),
            previous = pagebar.find('li.csPreviousPage'),
            next = pagebar.find('li.csNextPage'),
            last = pagebar.find('li.csLastPage');
        //first and previous
        if (page_num === 1 || page_num === 0) {
            if (!first.hasClass(dClass)) first.addClass(dClass);
            if (!previous.hasClass(dClass)) previous.addClass(dClass);
        } else {
            if (first.hasClass(dClass)) first.removeClass(dClass);
            if (previous.hasClass(dClass)) previous.removeClass(dClass);
        }
        //next and last
        if (page_num === last_page || last_page === 0) {
            if (!next.hasClass(dClass)) next.addClass(dClass);
            if (!last.hasClass(dClass)) last.addClass(dClass);
        } else {
            if (next.hasClass(dClass)) next.removeClass(dClass);
            if (last.hasClass(dClass)) last.removeClass(dClass);
        }

        if (last_page > 1) self.ePaging(); //pagination event bind
    };

    /**
     * Render result list
     * @param {Object} self
     * @param {Object} json - result data
     * @param {boolean} is_query - used to different from search to open and just click to open
     */
    SelectPage.prototype.displayResults = function (self, json, is_query) {
        var p = self.option, el = self.elem;
        el.results.hide().empty();
        if (p.multiple && $.type(p.maxSelectLimit) === 'number' && p.maxSelectLimit > 0) {
            var selectedSize = el.element_box.find('li.selected_tag').length;
            if (selectedSize > 0 && selectedSize >= p.maxSelectLimit) {
                var msg = self.message.max_selected;
                self.showMessage(self, msg.replace(self.template.msg.maxSelectLimit, p.maxSelectLimit));
                return;
            }
        }

        if (json.candidate.length) {
            var arr_candidate = json.candidate,
                arr_primary_key = json.keyField,
                keystr = el.hidden.val(),
                keyArr = keystr ? keystr.split(',') : new Array(),
                itemText = '';
            for (var i = 0; i < arr_candidate.length; i++) {
                if (p.formatItem && $.isFunction(p.formatItem)) {
                    try {
                        itemText = p.formatItem(json.originalResult[i]);
                    } catch (e) {
                        console.error('formatItem内容格式化函数内容设置不正确！');
                        itemText = arr_candidate[i];
                    }
                } else itemText = arr_candidate[i];
                var list = $('<li>').html(itemText).attr({
                    pkey: arr_primary_key[i],
                    index: i
                });
                if (!p.formatItem) list.attr('title', itemText);

                //Set selected item highlight
                if ($.inArray(arr_primary_key[i].toString(), keyArr) !== -1) {
                    list.addClass(self.css_class.selected);
                }
                //cache item data
                list.data('dataObj', json.originalResult[i]);
                el.results.append(list);
            }
        } else {
            var li = '<li class="' + self.css_class.message_box + '"><i class="spfont sp-warning"></i> ' +
                self.message.not_found + '</li>';
            el.results.append(li);
        }
        el.results.show();

        if (p.multiple && p.multipleControlbar) el.control.show();
        if (p.pagination) el.navi.show();
        self.calcResultsSize(self);
        self.setOpenStatus(self, true);

        //Result item event bind
        self.eResultList();
        //scrolling listen
        self.eScroll();
        //auto highlight first item in search, have result and set autoSelectFirst to true situation
        if (is_query && json.candidate.length && p.autoSelectFirst) self.nextLine(self);
    };

    /**
     * Calculate result list size and position
     * @param {Object} self
     */
    SelectPage.prototype.calcResultsSize = function (self) {
        var p = self.option, el = self.elem;
        var rePosition = function () {
            if (el.container.css('position') === 'static') {
                // position: static
                var offset = el.combo_input.offset();
                el.result_area.css({
                    top: offset.top + el.combo_input.outerHeight() + 'px',
                    left: offset.left + 'px'
                });
            } else {
                if (!p.pagination) {
                    var itemHeight = el.results.find('li:first').outerHeight(true),
                        listHeight = itemHeight * p.listSize;
                    el.results.css({
                        'max-height': listHeight,
                        'overflow-y': 'auto'
                    });
                }

                //handle result list show up side(left, right, up or down)
                var docWidth = $(document).width(),
                    docHeight = $(document).height(), //the document full height
                    viewHeight = $(window).height(), //browser visible area height
                    offset = el.container.offset(),
                    screenScrollTop = $(window).scrollTop(),
                    listWidth = el.result_area.outerWidth(),
                    //result list height
                    listHeight = el.result_area.outerHeight(),
                    //default left used input element left
                    defaultLeft = offset.left, //p.multiple ? -1 : 0;
                    //input element height
                    inputHeight = el.container.outerHeight(),
                    left = (offset.left + listWidth) > docWidth ?
                        defaultLeft - (listWidth - el.container.outerWidth()) :
                        defaultLeft,
                    //the actual top coordinate of input element(outer div)
                    screenTop = offset.top, //$(el.container).scrollTop();//offset.top - screenScrollTop;
                    top = 0, dist = 5, //set distance between input element and result list
                    //the actual top coordinate of result list
                    listBottom = screenTop + inputHeight + listHeight + dist,
                    listTop = screenTop + listHeight + dist,
                    hasOverflow = docHeight > viewHeight;

                if ((screenTop - screenScrollTop - dist > listHeight) &&
                    (hasOverflow && listBottom > (viewHeight + screenScrollTop)) ||
                    (!hasOverflow && listBottom > viewHeight && screenTop >= listTop)) {
                    //open up
                    top = offset.top - listHeight - dist;
                    el.result_area.removeClass('shadowUp shadowDown').addClass('shadowUp');
                } else {
                    //open down
                    top = offset.top + (p.multiple ? el.container.outerHeight() : inputHeight);
                    el.result_area.removeClass('shadowUp shadowDown').addClass('shadowDown');
                    top += dist;
                }
                return {
                    top: top + 'px', left: left + 'px'
                };
            }
        };
        if (el.result_area.is(':visible')) {
            el.result_area.css(rePosition());
        } else {
            var pss = rePosition();
            el.result_area.css(pss).show(1, function () {
                var repss = rePosition();
                if (pss.top !== repss.top || pss.left !== repss.left) el.result_area.css(repss);
            });
        }
    };

    /**
     * hide result list
     * @param {Object} self
     */
    SelectPage.prototype.hideResults = function (self) {
        if (self.prop.key_paging) {
            self.scrollWindow(self, true);
            self.prop.key_paging = false;
        }
        self.setCssFocusedInput(self);

        if (self.option.autoFillResult) {
            //self.selectCurrentLine(self, true);
        }

        self.elem.results.empty();
        self.elem.result_area.hide();
        self.setOpenStatus(self, false);
        //unbind window scroll listen
        $(window).off('scroll.SelectPage');

        self.abortAjax(self);
        self.setButtonAttrDefault();
    };

    /**
     * set plugin to disabled / enabled
     * @param self
     * @param disabled
     */
    SelectPage.prototype.disabled = function (self, disabled) {
        var p = self.option, el = self.elem;
        if ($.type(disabled) === 'undefined') return el.combo_input.prop('disabled');
        if ($.type(disabled) === 'boolean') {
            el.combo_input.prop('disabled', disabled);
            if (disabled) el.container.addClass(self.css_class.disabled);
            else el.container.removeClass(self.css_class.disabled);
        }
    };

    /**
     * Go fist page
     * @param {Object} self
     */
    SelectPage.prototype.firstPage = function (self) {
        if (self.prop.current_page > 1) {
            self.prop.current_page = 1;
            self.prop.page_move = true;
            self.suggest(self);
        }
    };

    /**
     * Go previous page
     * @param {Object} self
     */
    SelectPage.prototype.prevPage = function (self) {
        if (self.prop.current_page > 1) {
            self.prop.current_page--;
            self.prop.page_move = true;
            self.suggest(self);
        }
    };

    /**
     * Go next page
     * @param {Object} self
     */
    SelectPage.prototype.nextPage = function (self) {
        if (self.prop.current_page < self.prop.max_page) {
            self.prop.current_page++;
            self.prop.page_move = true;
            self.suggest(self);
        }
    };

    /**
     * Go last page
     * @param {Object} self
     */
    SelectPage.prototype.lastPage = function (self) {
        if (self.prop.current_page < self.prop.max_page) {
            self.prop.current_page = self.prop.max_page;
            self.prop.page_move = true;
            self.suggest(self);
        }
    };
    /**
     * do something after select/unSelect action
     * @param {Object} self
     * @param {boolean} reOpen
     */
    SelectPage.prototype.afterAction = function (self, reOpen) {
        self.inputResize(self);
        self.elem.combo_input.change();
        self.setCssFocusedInput(self);
        if (self.prop.init_set) return;
        if (self.option.multiple) {
            if (self.option.selectToCloseList) {
                self.hideResults(self);
                self.elem.combo_input.blur();
            }
            if (!self.option.selectToCloseList && reOpen) {
                self.suggest(self);
                self.elem.combo_input.focus();
            }
        } else {
            self.hideResults(self);
            self.elem.combo_input.blur();
        }
    };

    /**
     * Select current list item
     * @param {Object} self
     * @param {boolean} is_enter_key
     */
    SelectPage.prototype.selectCurrentLine = function (self, is_enter_key) {
        self.scrollWindow(self, true);

        var p = self.option, current = self.getCurrentLine(self);
        if (current) {
            var data = current.data('dataObj');
            var text = data[p.showField] || current.text();
            var value = current.attr('pkey');
            if (!p.multiple) {
                self.elem.combo_input.val(text);
                self.elem.hidden.val(value);
            } else {
                //build tags in multiple selection mode
                self.elem.combo_input.val('');
                var item = {text: text, value: value};
                if (!self.isAlreadySelected(self, item)) {
                    self.addNewTag(self, data, item);
                    self.tagValuesSet(self);
                }
            }

            if (p.selectOnly) self.setButtonAttrDefault();

            //Select item callback
            if (p.eSelect && $.isFunction(p.eSelect)) p.eSelect(data, self);

            self.prop.prev_value = self.elem.combo_input.val();
            self.prop.selected_text = self.elem.combo_input.val();

            self.putClearButton();
        }
        self.afterAction(self, true);
    };
    /**
     * Show clear button when item selected in single selection mode
     */
    SelectPage.prototype.putClearButton = function () {
        if (!this.option.multiple && !this.elem.combo_input.prop('disabled')) this.elem.container.append(this.elem.clear_btn);
    };
    /**
     * Select all list item
     * @param {Object} self
     */
    SelectPage.prototype.selectAllLine = function (self) {
        var p = self.option, jsonarr = new Array();
        self.elem.results.find('li').each(function (i, row) {
            var $row = $(row), data = $row.data('dataObj');
            var text = data[p.showField] || $row.text();
            var value = $row.attr('pkey');
            var item = {text: text, value: value};
            if (!self.isAlreadySelected(self, item)) {
                self.addNewTag(self, data, item);
                self.tagValuesSet(self);
            }
            jsonarr.push(data);
            //limited max selected items
            if ($.type(p.maxSelectLimit) === 'number' &&
                p.maxSelectLimit > 0 &&
                p.maxSelectLimit === self.elem.element_box.find('li.selected_tag').length) {
                return false;
            }
        });
        if (p.eSelect && $.isFunction(p.eSelect)) p.eSelect(jsonarr, self);
        self.afterAction(self, true);
    };
    /**
     * Cancel select all item in current page
     * @param {Object} self
     */
    SelectPage.prototype.unSelectAllLine = function (self) {
        var p = self.option, size = self.elem.results.find('li').length, ds = [];
        self.elem.results.find('li').each(function (i, row) {
            var key = $(row).attr('pkey');
            var tag = self.elem.element_box.find('li.selected_tag[itemvalue="' + key + '"]');
            if (tag.length) ds.push(tag.data('dataObj'));
            self.removeTag(self, tag);
        });
        self.afterAction(self, true);
        if (p.eTagRemove && $.isFunction(p.eTagRemove)) p.eTagRemove(ds);
    };
    /**
     * Clear all selected items
     * @param {Object} self
     * @param {boolean} open - open list after clear selected item
     */
    SelectPage.prototype.clearAll = function (self, open) {
        var p = self.option, ds = [];
        if (p.multiple) {
            self.elem.element_box.find('li.selected_tag').each(function (i, row) {
                ds.push($(row).data('dataObj'));
                row.remove();
            });
            self.elem.element_box.find('li.selected_tag').remove();
        }
        self.reset(self);
        self.afterAction(self, open);

        if (p.multiple) {
            if (p.eTagRemove && $.isFunction(p.eTagRemove)) p.eTagRemove(ds);
        } else self.elem.clear_btn.remove();
    };

    /**
     * reset
     */
    SelectPage.prototype.reset = function (self) {
        self.elem.combo_input.val('');
        self.elem.hidden.val('');
        self.prop.prev_value = '';
        self.prop.selected_text = '';
        self.prop.current_page = 1;
    };

    /**
     * Get current highlight item
     * @param {Object} self
     */
    SelectPage.prototype.getCurrentLine = function (self) {
        if (self.elem.result_area.is(':hidden')) return false;
        var obj = self.elem.results.find('li.' + self.css_class.select);
        if (obj.length) return obj;
        else return false;
    };

    /**
     * Check the result item is already selected or not
     * @param {Object} self
     * @param {Object} item - item info
     */
    SelectPage.prototype.isAlreadySelected = function (self, item) {
        var isExist = false;
        if (item.value) {
            var keys = self.elem.hidden.val();
            if (keys) {
                var karr = keys.split(',');
                if (karr && karr.length && $.inArray(item.value, karr) != -1) isExist = true;
            }
        }
        return isExist;
    };

    /**
     * Add a new tag in multiple selection mode
     * @param {Object} self
     * @param {object} data - raw row data
     * @param {Object} item
     */
    SelectPage.prototype.addNewTag = function (self, data, item) {
        if (!self.option.multiple || !data || !item) return;
        var tmp = self.template.tag.content, tag;
        tmp = tmp.replace(self.template.tag.textKey, item.text);
        tmp = tmp.replace(self.template.tag.valueKey, item.value);
        tag = $(tmp);
        tag.data('dataObj', data);
        if (self.elem.combo_input.prop('disabled')) tag.find('span.tag_close').hide();
        self.elem.combo_input.closest('li').before(tag);
    };
    /**
     * Remove a tag in multiple selection mode
     * @param {Object} self
     * @param {Object} item
     */
    SelectPage.prototype.removeTag = function (self, item) {
        var key = $(item).attr('itemvalue');
        var keys = self.elem.hidden.val();
        if ($.type(key) != 'undefined' && keys) {
            var keyarr = keys.split(','),
                index = $.inArray(key.toString(), keyarr);
            if (index != -1) {
                keyarr.splice(index, 1);
                self.elem.hidden.val(keyarr.toString()).trigger("change");
            }
        }
        $(item).remove();
        self.inputResize(self);
    };

    /**
     * Selected item value(keyField) put in to hidden element
     * @param {Object} self
     */
    SelectPage.prototype.tagValuesSet = function (self) {
        if (!self.option.multiple) return;
        var tags = self.elem.element_box.find('li.selected_tag');
        if (tags && tags.length) {
            var result = new Array();
            $.each(tags, function (i, li) {
                var v = $(li).attr('itemvalue');
                if ($.type(v) !== 'undefined') result.push(v);
            });
            if (result.length) {
                self.elem.hidden.val(result.join(',')).trigger("change");
            }
        }
    };

    /**
     * auto resize input element width in multiple select mode
     * @param {Object} self
     */
    SelectPage.prototype.inputResize = function (self) {
        if (!self.option.multiple) return;
        var width = '',
            inputLi = self.elem.combo_input.closest('li');
        var setDefaultSize = function (self, inputLi) {
            inputLi.removeClass('full_width');
            var minimumWidth = self.elem.combo_input.val().length + 1,
                width = (minimumWidth * 0.75) + 'em';
            self.elem.combo_input.css('width', width).removeAttr('placeholder');
        };
        if (self.elem.element_box.find('li.selected_tag').length === 0) {
            if (!inputLi.hasClass('full_width')) inputLi.addClass('full_width');
            if (self.elem.combo_input.attr('placeholder_bak')) {
                self.elem.combo_input.attr('placeholder', self.elem.combo_input.attr('placeholder_bak')).removeAttr('style');
            }
        } else setDefaultSize(self, inputLi);
    };

    /**
     * Move to next line
     * @param {Object} self
     */
    SelectPage.prototype.nextLine = function (self) {
        var obj = self.getCurrentLine(self), idx;
        if (!obj) idx = -1;
        else {
            idx = self.elem.results.children('li').index(obj);
            obj.removeClass(self.css_class.select);
        }
        idx++;
        if (idx < self.elem.results.children('li').length) {
            var next = self.elem.results.children('li').eq(idx);
            next.addClass(self.css_class.select);
            self.setCssFocusedResults(self);
        } else self.setCssFocusedInput(self);
        self.scrollWindow(self, false);
    };

    /**
     * Move to previous line
     * @param {Object} self
     */
    SelectPage.prototype.prevLine = function (self) {
        var obj = self.getCurrentLine(self), idx;
        if (!obj) idx = self.elem.results.children('li').length;
        else {
            idx = self.elem.results.children('li').index(obj);
            obj.removeClass(self.css_class.select);
        }
        idx--;
        if (idx > -1) {
            var prev = self.elem.results.children('li').eq(idx);
            prev.addClass(self.css_class.select);
            self.setCssFocusedResults(self);
        } else self.setCssFocusedInput(self);
        self.scrollWindow(self, false);
    };


    /**
     * SelectPage plugin definition
     * @global
     * @param option {Object} init plugin option
     */
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data(SelectPage.dataKey),
                params = $.extend({}, defaults, $this.data(), data && data.option, typeof option === 'object' && option);
            if (!data) $this.data(SelectPage.dataKey, (data = new SelectPage(this, params)));
        });
    }

    /**
     * Get plugin object
     * @param {object} obj
     * @returns
     */
    function getPlugin(obj) {
        return $(obj).closest('div.sp_container').find('input.sp_input');
    }

    /**
     * Clear all selected item
     */
    function ClearSelected() {
        return this.each(function () {
            var $this = getPlugin(this),
                data = $this.data(SelectPage.dataKey);
            if (data) {
                data.prop.init_set = true;
                data.clearAll(data);
                data.prop.init_set = false;
            }
        });
    }

    /**
     * Refresh result list
     * use case:
     * 1.use $(obj).val('xxx') to modify selectpage selected item key
     * 2.refresh selected item show content/tag text
     */
    function SelectedRefresh() {
        return this.each(function () {
            var $this = getPlugin(this),
                data = $this.data(SelectPage.dataKey);
            if (data && data.elem.hidden.val())
                data.setInitRecord(true);
        });
    }

    /**
     * Modify plugin datasource, only work on json datasource mode
     * @param {array} data - new datasource
     * @example
     * [{name:'aa',sex:1},{name:'bb',sex:0},{...}]
     */
    function ModifyDataSource(data) {
        return this.each(function () {
            if (data && $.isArray(data)) {
                var $this = getPlugin(this),
                    plugin = $this.data(SelectPage.dataKey);
                if (plugin) {
                    plugin.clearAll(plugin);
                    plugin.option.data = data;
                }
            }
        });
    }

    /**
     * Get plugin disabled status or Modify plugin disabled status
     * @param disabled {boolean} set disabled status
     */
    function PluginDisabled(disabled) {
        var status = false;
        this.each(function () {
            var $this = getPlugin(this),
                plugin = $this.data(SelectPage.dataKey);
            if (plugin) {
                if ($.type(disabled) !== 'undefined')
                    plugin.disabled(plugin, disabled);
                else
                    status = plugin.disabled(plugin);
            }
        });
        return status;
    }

    /**
     * Get selected item text
     * @returns {string}
     */
    function GetInputText() {
        var str = '';
        this.each(function () {
            var $this = getPlugin(this), data = $this.data(SelectPage.dataKey);
            if (data) {
                if (data.option.multiple) {
                    var tags = [];
                    data.elem.element_box.find('li.selected_tag').each(function (i, tag) {
                        tags.push($(tag).text());
                    });
                    str += tags.toString();
                } else {
                    str += data.elem.combo_input.val();
                }
            }
        });
        return str;
    }

    var old = $.fn.selectPage;

    $.fn.selectPage = Plugin;
    $.fn.selectPage.Constructor = SelectPage;
    $.fn.selectPageClear = ClearSelected;
    $.fn.selectPageRefresh = SelectedRefresh;
    $.fn.selectPageData = ModifyDataSource;
    $.fn.selectPageDisabled = PluginDisabled;
    $.fn.selectPageText = GetInputText;

    // SelectPage no conflict
    // =================
    $.fn.selectPage.noConflict = function () {
        $.fn.selectPage = old;
        return this;
    };
})(window.jQuery);

define("selectpage", function(){});

