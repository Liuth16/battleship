(()=>{"use strict";var t={365:(t,e,n)=>{n.d(e,{A:()=>s});var r=n(601),o=n.n(r),a=n(314),i=n.n(a)()(o());i.push([t.id,'/* CSS RESET */\n*,\n*::before,\n*::after {\n  box-sizing: border-box;\n}\n\n* {\n  margin: 0;\n}\n\nbody {\n  line-height: 1.5;\n  -webkit-font-smoothing: antialiased;\n}\n\nimg,\npicture,\nvideo,\ncanvas,\nsvg {\n  display: block;\n  max-width: 100%;\n}\n\ninput,\nbutton,\ntextarea,\nselect {\n  font: inherit;\n}\n\np,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  overflow-wrap: break-word;\n}\n\n#root,\n#__next {\n  isolation: isolate;\n}\n\n/* End of reset */\n\n.container {\n  display: flex;\n  justify-content: center;\n  margin-bottom: 20px;\n}\n\n.grid1, .grid2 {\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n    width: 500px;\n    height: 500px;\n    border: 2px solid black;\n    margin: 1rem;\n    /* opacity: 0.7;\n    transition: opacity 0.3s ease; */\n}\n\n/* .grid1[data-active="true"],\n.grid2[data-active="true"] {\n  opacity: 1;\n} */\n\n.cell {\n    display: flex;\n    border: 1px solid gray;\n    align-items: center;\n    justify-content: center;\n}\n\n.ship {\n    background-color: lightblue;\n}\n\n.hit {\n  background-color: #ff6b6b !important;\n  color: white !important;\n}\n\n.miss {\n  background-color: #a8a8a8 !important;\n  color: white !important;\n}\n\n.ship-selection {\n  display: flex;\n  gap: 10px;\n  margin: 20px;\n  flex-wrap: wrap;\n}\n\n.ship-choice {\n  height: 40px;\n  background-color: #4a90e2;\n  cursor: move;\n}\n\n.ship-choice:hover {\n  background-color: #357abd;\n}\n\n.play-button {\n  padding: 10px 20px;\n  font-size: 16px;\n  background-color: #4caf50;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n  margin: 20px;\n}\n\n.play-button:hover {\n  background-color: #45a049;\n}\n\n.dragover {\n  background-color: purple;\n}\n\n.dragging{\n  opacity: 0.3;\n  background-color: white;\n}\n\n.invisible {\n  opacity: 0;\n  pointer-events: none;\n}\n\n#game-status {\n  font-family: Arial, sans-serif;\n  color: #333;\n  padding: 10px;\n  border-radius: 4px;\n  background-color: #f0f0f0;\n  box-shadow: 0 2px 4px rgba(0,0,0,0.1);\n  width: 100%;\n  text-align: center;\n  margin-top: 20px;\n}\n\n.invisible-ship {\n  background-color: transparent !important;\n  color: transparent !important;\n}',""]);const s=i},314:t=>{t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var n="",r=void 0!==e[5];return e[4]&&(n+="@supports (".concat(e[4],") {")),e[2]&&(n+="@media ".concat(e[2]," {")),r&&(n+="@layer".concat(e[5].length>0?" ".concat(e[5]):""," {")),n+=t(e),r&&(n+="}"),e[2]&&(n+="}"),e[4]&&(n+="}"),n})).join("")},e.i=function(t,n,r,o,a){"string"==typeof t&&(t=[[null,t,void 0]]);var i={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(i[c]=!0)}for(var d=0;d<t.length;d++){var l=[].concat(t[d]);r&&i[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),e.push(l))}},e}},601:t=>{t.exports=function(t){return t[1]}},72:t=>{var e=[];function n(t){for(var n=-1,r=0;r<e.length;r++)if(e[r].identifier===t){n=r;break}return n}function r(t,r){for(var a={},i=[],s=0;s<t.length;s++){var c=t[s],d=r.base?c[0]+r.base:c[0],l=a[d]||0,u="".concat(d," ").concat(l);a[d]=l+1;var p=n(u),h={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==p)e[p].references++,e[p].updater(h);else{var f=o(h,r);r.byIndex=s,e.splice(s,0,{identifier:u,updater:f,references:1})}i.push(u)}return i}function o(t,e){var n=e.domAPI(e);return n.update(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap&&e.supports===t.supports&&e.layer===t.layer)return;n.update(t=e)}else n.remove()}}t.exports=function(t,o){var a=r(t=t||[],o=o||{});return function(t){t=t||[];for(var i=0;i<a.length;i++){var s=n(a[i]);e[s].references--}for(var c=r(t,o),d=0;d<a.length;d++){var l=n(a[d]);0===e[l].references&&(e[l].updater(),e.splice(l,1))}a=c}}},659:t=>{var e={};t.exports=function(t,n){var r=function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(t){n=null}e[t]=n}return e[t]}(t);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},540:t=>{t.exports=function(t){var e=document.createElement("style");return t.setAttributes(e,t.attributes),t.insert(e,t.options),e}},56:(t,e,n)=>{t.exports=function(t){var e=n.nc;e&&t.setAttribute("nonce",e)}},825:t=>{t.exports=function(t){if("undefined"==typeof document)return{update:function(){},remove:function(){}};var e=t.insertStyleElement(t);return{update:function(n){!function(t,e,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleTagTransform(r,t,e.options)}(e,t,n)},remove:function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(e)}}}},113:t=>{t.exports=function(t,e){if(e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={id:r,exports:{}};return t[r](a,a.exports,n),a.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.nc=void 0;var r=n(72),o=n.n(r),a=n(825),i=n.n(a),s=n(659),c=n.n(s),d=n(56),l=n.n(d),u=n(540),p=n.n(u),h=n(113),f=n.n(h),m=n(365),g={};function v(t=1){const e=document.querySelector(`.grid${t}`);for(let t=0;t<100;t++){const n=document.createElement("div"),r=Math.floor(t/10),o=t%10;n.setAttribute("data-row",r),n.setAttribute("data-col",o),n.classList.add("cell"),e.appendChild(n)}}function y(){const t=document.createElement("div");t.classList.add("ship-selection"),[4,3,3,2,2,2,1,1,1,1].forEach((e=>{const n=document.createElement("div");n.classList.add("ship-choice"),n.setAttribute("data-length",e),n.setAttribute("data-horizontal","true"),n.draggable=!0,n.style.width=49*e+"px",n.style.height="49px",t.appendChild(n)})),document.body.appendChild(t)}function b(t){if("number"!=typeof t||t<=0)throw new Error("Enter a number greater than 0");let e=0,n=!1;return{length:t,get timesHit(){return e},get sunk(){return n},hit:function(){e+=1},isSunk:function(){return e>=t&&(n=!0),n}}}function x(){return function(){const t=Array.from({length:100},((t,e)=>[Math.floor(e/10),e%10])),e=[],n=[],r=[];function o(e){return t.some((t=>t[0]===e[0]&&t[1]===e[1]))}function a(t){return n.some((e=>e[0]===t[0]&&e[1]===t[1]))}function i(t){return e.some((({coordinates:e})=>e.some((e=>e[0]===t[0]&&e[1]===t[1]))))}return{coordinates:t,get addedShips(){return e},get shotCoordinates(){return r},get blockedTiles(){return n},addShip:function(t,r,s){if(!o(r))throw new Error("Invalid starting coordinate.");const c=[];for(let e=0;e<t;e++){const t=!1===s?[r[0]+e,r[1]]:[r[0],r[1]+e];if(!o(t)||a(t)||i(t))return!1;c.push(t)}return c.forEach((t=>{(function(t){const[e,n]=t;return[[e-1,n-1],[e-1,n],[e-1,n+1],[e,n-1],[e,n+1],[e+1,n-1],[e+1,n],[e+1,n+1]].filter(o)})(t).forEach((t=>{i(t)||a(t)||n.push(t)}))})),e.push({ship:b(t),coordinates:c}),!0},receiveAttack:function(t){if(r.some((e=>e[0]===t[0]&&e[1]===t[1])))return!1;r.push(t);const n=e.find((({coordinates:e})=>e.some((e=>e[0]===t[0]&&e[1]===t[1]))));return!!n&&(n.ship.hit(),!0)},allShipsSunk:function(){return e.every((({ship:t})=>t.isSunk()))},setupBoard:function(){const t=[4,3,3,2,2,2,1,1,1,1];let e=0;function n(t){let n=!1;for(;!n&&e<1e3;){e++;const r=Math.floor(100*Math.random()),o=this.coordinates[r],a=Math.random()<.5;n=this.addShip(t,o,a)}return!!n||(console.error(`Failed to place ship of size ${t} after 1000 attempts!`),!1)}for(const e of t)if(!n.call(this,e))return console.error("Board setup failed."),!1;return!0}}}()}function S(){let t=[...Array.from({length:100},((t,e)=>[Math.floor(e/10),e%10]))],e=[],n=null;return{shoot:function(r){let o;if(e.length>0){const t=Math.floor(Math.random()*e.length);o=e[t],e.splice(t,1)}else{const e=Math.floor(Math.random()*t.length);o=t[e]}if(!o)return;const a=r.receiveAttack(o);var i;i=[o],t=t.filter((([t,e])=>!i.some((([n,r])=>n===t&&r===e)))),a&&(function(n){e=[];const r=function([e,n]){return[[-1,0],[1,0],[0,-1],[0,1]].map((([t,r])=>[e+t,n+r])).filter((e=>function([t,e]){return t>=0&&t<10&&e>=0&&e<10}(e)&&t.some((([t,n])=>t===e[0]&&n===e[1]))))}(n);e.push(...r)}(o),n=o)}}}g.styleTagTransform=f(),g.setAttributes=l(),g.insert=c().bind(null,"head"),g.domAPI=i(),g.insertStyleElement=p(),o()(m.A,g),m.A&&m.A.locals&&m.A.locals;let E,A,w,L,k=1,C=1,q=!1,M=!1;function T(t,e){return t.allShipsSunk()?(q=!0,alert("Player 2 Wins!"),$(),!0):!!e.allShipsSunk()&&(q=!0,alert("Player 1 Wins!"),$(),!0)}function $(){document.querySelectorAll(".cell").forEach((t=>{t.style.pointerEvents="none"}))}function I(){1===C?(N(E.addedShips,1,!1),N(A.addedShips,2,!0)):2===C?(N(E.addedShips,1,!0),N(A.addedShips,2,!1)):M?(N(E.addedShips,1,!1),N(A.addedShips,2,!0)):(N(E.addedShips,1,!0),N(A.addedShips,2,!0))}function N(t,e,n=!1){document.querySelectorAll(`.grid${e} .cell`).forEach((e=>{if(e.classList.contains("hit")||e.classList.contains("miss"))return;const r=parseInt(e.getAttribute("data-row")),o=parseInt(e.getAttribute("data-col"));t.some((({coordinates:t})=>t.some((([t,e])=>t===r&&e===o))))&&(e.classList.add("ship"),n?(e.classList.add("invisible-ship"),e.textContent=""):(e.classList.remove("invisible-ship"),e.textContent="S"))}))}function z(){1===C?($(),P(1),E.addedShips.length>=10&&(M?(w=S(),A=x(),A.setupBoard(),I(),C=3,_()):(C=2,N(E.addedShips,1,!0),document.querySelectorAll(".grid1 .cell").forEach((t=>{t.style.pointerEvents="none"})),P(2),B(C),y(),j(),O()),L.updateText())):2!==C||M||A.addedShips.length>=10&&(C=3,N(A.addedShips,2,!0),_(),L.updateText())}function P(t){document.querySelectorAll(`.grid${t} .cell`).forEach((t=>{t.style.pointerEvents="auto"}))}function j(){document.querySelectorAll(".ship-choice").forEach((t=>{t.addEventListener("click",(()=>function(t){const e=parseInt(t.getAttribute("data-length"),10);"true"===t.getAttribute("data-horizontal")?(t.style.width="49px",t.style.height=49*e+"px",t.dataset.horizontal="false"):(t.style.width=49*e+"px",t.style.height="49px",t.dataset.horizontal="true")}(t)))}))}function O(){document.querySelectorAll(".ship-choice").forEach((t=>{t.addEventListener("dragstart",(e=>{t.classList.add("dragging")})),t.addEventListener("dragend",(e=>{t.classList.remove("dragging")}))}))}function B(t){3!==t&&document.querySelectorAll(`.grid${t} .cell`).forEach((e=>{e.addEventListener("dragover",(e=>{e.preventDefault();const n=document.querySelector(".dragging");if(!n)return;document.querySelectorAll(`.grid${t} .dragover`).forEach((t=>t.classList.remove("dragover")));const r=Number(n.dataset.length);let o=Number(e.target.dataset.col),a=Number(e.target.dataset.row);const i="true"===n.dataset.horizontal;i?o+r>10&&(o=10-r):a+r>10&&(a=10-r);for(let e=0;e<r;e++){const n=i?`.grid${t} [data-col="${o+e}"][data-row="${a}"]`:`.grid${t} [data-col="${o}"][data-row="${a+e}"]`;document.querySelectorAll(n).forEach((t=>t.classList.add("dragover")))}})),e.addEventListener("dragleave",(t=>{document.querySelectorAll(".dragover").forEach((t=>t.classList.remove("dragover")))})),e.addEventListener("drop",(t=>{t.preventDefault(),document.querySelectorAll(".dragover").forEach((t=>t.classList.remove("dragover")));const e=Number(t.target.dataset.col),n=Number(t.target.dataset.row),r=document.querySelector(".dragging");var o,a,i;o=Number(r.dataset.length),a=[n,e],i="true"===r.dataset.horizontal,(1===C?E.addShip(o,a,i):2!==C||A.addShip(o,a,i))&&(r.remove(),I(),z(),console.log(E.addedShips),console.log(A.addedShips))}))}))}function D(){q||(k=1===k?2:1,_(),L.updateText(),M&&2===k&&M&&2===k&&!q&&setTimeout((()=>{w.shoot(E);const t=E.shotCoordinates[E.shotCoordinates.length-1],e=document.querySelector(`.grid1 [data-row="${t[0]}"][data-col="${t[1]}"]`);E.addedShips.some((({coordinates:e})=>e.some((([e,n])=>e===t[0]&&n===t[1]))))?(e.classList.add("hit"),e.textContent="X"):(e.classList.add("miss"),e.textContent="O"),T(E,A)||D()}),500))}function _(){const t=document.querySelectorAll(".grid1 .cell"),e=document.querySelectorAll(".grid2 .cell");1===k?(t.forEach((t=>t.style.pointerEvents="none")),e.forEach((t=>{t.classList.contains("hit")||t.classList.contains("miss")||(t.style.pointerEvents="auto")}))):(e.forEach((t=>t.style.pointerEvents="none")),t.forEach((t=>{t.classList.contains("hit")||t.classList.contains("miss")||(t.style.pointerEvents="auto")})))}function F(t,e,n){if(C<3)return;const r=parseInt(t.getAttribute("data-row"),10),o=parseInt(t.getAttribute("data-col"),10),a=n.receiveAttack([r,o]);t.classList.remove("invisible-ship"),a?(t.classList.add("hit"),t.textContent="X"):(t.classList.add("miss"),t.textContent="O"),t.style.pointerEvents="none",T(E,A)||(D(),L.updateText())}v(1),v(2);const H=x(),R=x();y(),function(t,e){E=t,A=e,L=function(){const t=document.getElementById("game-status");t&&t.remove();const e=document.querySelector(".container"),n=document.createElement("div");return n.id="game-status",n.style.textAlign="center",n.style.margin="20px",n.style.fontSize="1.2em",e.nextSibling?e.parentNode.insertBefore(n,e.nextSibling):e.parentNode.appendChild(n),{updateText:function(){if(1===C)n.textContent="Player 1's turn to place ships";else if(2===C){n.textContent="Player 2's turn to place ships";const t=document.querySelector("#btn"),e=document.querySelector("form");t&&e&&e.remove()}else 3===C&&(n.textContent=M?1===k?"Your turn to attack Computer's grid":"Computer is thinking...":`Player ${k}'s turn to attack`)}}}(),L.updateText();const n=document.querySelectorAll(".grid1 .cell"),r=document.querySelectorAll(".grid2 .cell");n.forEach((t=>{t.addEventListener("click",(()=>F(t,0,E)))})),r.forEach((t=>{t.addEventListener("click",(()=>F(t,0,A)))})),j(),O(),document.querySelector("#btn").addEventListener("click",(t=>{t.preventDefault(),M=!0;const e=document.querySelector("form");e&&e.remove()})),z(),B(C)}(H,R)})();