import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as C,i as m}from"./assets/vendor-77e16229.js";const h=document.querySelector("#datetime-picker"),o=document.querySelector("[data-start]"),e=document.querySelectorAll(".timer.value");let r=null,p=null;const g={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){r=t[0],b()}};C(h,g);function b(){!r||r<=new Date?(m.error({title:"Error",message:"Please choose a date in the future",position:"topRight"}),o.disabled=!0):(o.disabled=!1,m.success({title:"Success",message:"It is correct date",position:"topRight"}))}function n(t){return t<10?"0"+t:t}function f(){const c=r-new Date;if(c<=0){clearInterval(p),e.forEach(i=>i.textContent="00");return}const{days:u,hours:l,minutes:d,seconds:a}=s(c);e[0].textContent=n(u),e[1].textContent=n(l),e[2].textContent=n(d),e[3].textContent=n(a)}o.addEventListener("click",t=>{o.disabled=!0,h.disabled=!0,f(),p=setInterval(f,1e3)});document.addEventListener("DOMContentLoaded",function(){o.disabled=!0});function s(t){const a=Math.floor(t/864e5),i=Math.floor(t%864e5/36e5),y=Math.floor(t%864e5%36e5/6e4),D=Math.floor(t%864e5%36e5%6e4/1e3);return{days:a,hours:i,minutes:y,seconds:D}}console.log(s(2e3));console.log(s(14e4));console.log(s(2414e4));
//# sourceMappingURL=commonHelpers.js.map