import{j as z,a as U,F as Q,D as V,l as m,p as N,y as b,b as X,C as Y,c as Z,s as _,K as ee,S as te}from"./vendor.6c86f508.js";const ne=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}};ne();const B=(t,o)=>{switch(o){case"increment":return t+1;case"decrement":return t-1;case"reset":return 0;default:throw new Error("Unexpected action")}},F=(t,o)=>t+o,a=z,C=U,$=Q,D=V({}),j=()=>X(D),re=({children:t,encKey:o})=>{const[n,i]=m(0),[e,r]=N(B,0),[s,f]=N(B,0),[u,c]=N(F,0),[h,g]=N(F,0),[x,W]=N(B,0),[O,L]=m(!1),[M,G]=m([]),I=d=>G([...M,...d]),[P,w]=m(0),[S,l]=m(0);b(()=>{if(h>0&&s>0){const d=(2*h-x)/h,A=e/s,y=d*A*100;w(y),l(u/5*2*Math.min(y,1))}else w(0),l(0)},[s]);const p=()=>{var y;let d=Y.AES.encrypt(JSON.stringify({startTime:n,wordsCount:e,charCount:u,expectedWordsCount:s,expectedCharCount:h,strokeCount:x,inputs:M,accuracy:P}),o).toString(),A=Z.gzip(d);(y=window==null?void 0:window.top)==null||y.postMessage({score:Math.round(S*100),d:A},"*")};return a(D.Provider,{value:{startTime:n,wordsCount:e,charCount:u,expectedCharCount:h,strokeCount:x,gameStopped:O,inputs:M,wpm:S,accuracy:P,expectedWordsCount:s,mutateWordsCount:r,mutateCharCount:c,mutateExpectedCount:g,mutateStrokeCount:W,mutateExpectedWordsCount:f,stopGame:()=>L(!0),startGame:()=>i(Date.now()/1e3),appendInputs:I,uploadGameplay:p},children:t})},oe=()=>{const{wordsCount:t,charCount:o,expectedCharCount:n,strokeCount:i,wpm:e,accuracy:r}=j(),s=Math.min(1,e/100),f=Math.round(255-(255-76)*s),u=Math.round(255-(255-198)*s),c=Math.round(255-(255-103)*s);return a($,{children:C("span",{style:{color:`rgb(${f}, ${u}, ${c})`},children:["WPM: ",e.toFixed(2)," (",r.toFixed(2),"%)"]})})};function se(t,o){let n=0;for(let i=0;i<Math.min(t.length,o.length);i++)n+=Number(t[i]==o[i]);return n}const K=({divRef:t,word:o,wordProgress:n,isProcessing:i})=>C("div",{ref:t,children:[o.split("").map((e,r)=>a("span",{className:i&&n.length>r?o[r]==n.charAt(r)?"text-success":"text-danger":"",children:e})),n.slice(o.length).split("").map(e=>a("span",{className:"text-danger",children:e})),a("span",{children:"\xA0"})]}),ae=({words:t,removeWords:o})=>{const[n,i]=m(t[0]),[e,r]=m(""),[s,f]=m([]),[u,c]=m(0),h=14.35,g=_(null),{startTime:x,startGame:W,mutateWordsCount:O,mutateCharCount:L,mutateExpectedWordsCount:M,mutateExpectedCount:G,mutateStrokeCount:I,appendInputs:P,gameStopped:w,uploadGameplay:S}=j();return b(()=>{var l,p,d,A,y;if(x==0&&e.length>0&&W(),e[e.length-1]==" "&&e.length!=1){e.trim()==n&&O("increment"),L(se(n,e.trim())),G(n.length),M("increment");let H=t.indexOf(n)+1;i(t[H]),r("");const J=(p=(l=g.current)==null?void 0:l.getBoundingClientRect().left)!=null?p:-1,q=(y=(A=(d=g.current)==null?void 0:d.nextElementSibling)==null?void 0:A.getBoundingClientRect().left)!=null?y:0;if(J>q){let E=0,v=g.current;for(;v;)E++,v=v.previousElementSibling;P([...s,e.trim()]),f([]),c(0),o(E)}else{f(v=>[...v,e.trim()]);let E;e.trim().length>n.length?E=e.length-1:E=n.length,c(v=>v+E+1)}}},[e]),b(()=>{w&&S()},[w]),C($,{children:[a(ee,{isDisabled:w,handleKeys:["alphabetic","backspace","space"],onKeyEvent:(l,p)=>{if(p.preventDefault(),!!p.isTrusted)if(l=="space"&&(l=" "),l=="backspace")r(d=>d.slice(0,d.length-1));else{if(l!=" "){if(e.length-n.length+1>5)return;I("increment")}r(d=>d+l)}}}),C("div",{className:"relative w-full h-[128px]",children:[a("div",{className:"border-l-4 border-l-grey border-opacity-75 h-[2rem] absolute animate-pulse transition-all",style:{left:(e.length+u)*h+"px"}}),C("div",{className:"flex flex-row font-mono select-none flex-wrap max-h-[128px] overflow-hidden text-2xl absolute",children:[t.slice(0,s.length).map((l,p)=>a(K,{word:l,wordProgress:s[p],isProcessing:!0})),a(K,{divRef:g,word:t[s.length],wordProgress:e.trim(),isProcessing:!0}),t.slice(s.length+1,s.length+50).map((l,p)=>a(K,{word:l,wordProgress:"",isProcessing:!1}))]})]}),a("button",{onClick:()=>location.reload(),className:"bg-gray-600 text-white font-mono w-full p-2 rounded text-center cursor-pointer mt-4 "+(w?"":"hidden"),children:"Klik di sini untuk refresh dan memulai ulang."})]})},R=({children:t})=>a("p",{className:"py-[64px] font-retro w-full text-center text-xl text-white animate-pulse",children:t});var T;const ie=()=>{const[t,o]=m(30),{startTime:n,stopGame:i}=j();return b(()=>{n!=0&&(T=setInterval(()=>{o(e=>e-1)},1e3))},[n]),b(()=>{t>0||(i(),clearInterval(T))},[t]),a("div",{className:"font-retro text-lemon",children:t})};function ce(t){let o=Math.floor(Math.random()*t.length);return t[o]}const k={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)||navigator.userAgent.match(/WPDesktop/i)},any:function(){return k.Android()||k.BlackBerry()||k.iOS()||k.Opera()||k.Windows()}};function le(){const[t,o]=m(!0),[n,i]=m("default-key"),[e,r]=m([]),s=k.any();b(()=>{var u;window.addEventListener("message",c=>{console.log("New message: "+c.data),c.data.startsWith("k:")&&(i(c.data.split("k:")[1]),console.log("Received key: "+n)),c.data=="reload"&&window.location.reload()}),(u=window==null?void 0:window.top)==null||u.postMessage("ready","*")},[]),b(()=>{async function u(){let c=await fetch("./words.txt");if(c.ok){let g=(await c.text()).split(`
`),x=[];for(let W=0;W<500;W++)x.push(ce(g));r(x),o(!1)}}u()},[]);const f=u=>{console.log("Remove"),r(c=>c.slice(u,c.length))};return a("div",{className:"flex flex-col items-center justify-center\r min-h-screen min-w-screen bg-black-900 text-white",children:a(re,{encKey:n,children:C("div",{className:"w-full px-8 sm:px-16 md:px-32 2xl:px-64 py-16 mx-auto",children:[C("div",{className:"flex flex-row w-full justify-between font-retro",children:[a(ie,{}),a(oe,{})]}),s?a(R,{children:"Game ini hanya dapat dimainkan pada Desktop."}):!t&&e.length>1?a(ae,{words:e,removeWords:f}):a(R,{children:"Loading..."})]})})})}te(a(le,{}),document.getElementById("app"));
