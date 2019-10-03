class t{constructor(t,s,e,i,r){this.id=s,this.name=e,this.disableScroll=r,this.priority=1e6*i+s,this.ctrl=t}canStart(){return!!this.ctrl&&this.ctrl.canStart(this.name)}start(){return!!this.ctrl&&this.ctrl.start(this.name,this.id,this.priority)}capture(){if(!this.ctrl)return!1;const t=this.ctrl.capture(this.name,this.id,this.priority);return t&&this.disableScroll&&this.ctrl.disableScroll(this.id),t}release(){this.ctrl&&(this.ctrl.release(this.id),this.disableScroll&&this.ctrl.enableScroll(this.id))}destroy(){this.release(),this.ctrl=void 0}}class s{constructor(t,s,e,i){this.id=s,this.disable=e,this.disableScroll=i,this.ctrl=t}block(){if(this.ctrl){if(this.disable)for(const t of this.disable)this.ctrl.disableGesture(t,this.id);this.disableScroll&&this.ctrl.disableScroll(this.id)}}unblock(){if(this.ctrl){if(this.disable)for(const t of this.disable)this.ctrl.enableGesture(t,this.id);this.disableScroll&&this.ctrl.enableScroll(this.id)}}destroy(){this.unblock(),this.ctrl=void 0}}const e=new class{constructor(){this.gestureId=0,this.requestedStart=new Map,this.disabledGestures=new Map,this.disabledScroll=new Set}createGesture(s){return new t(this,this.newID(),s.name,s.priority||0,!!s.disableScroll)}createBlocker(t={}){return new s(this,this.newID(),t.disable,!!t.disableScroll)}start(t,s,e){return this.canStart(t)?(this.requestedStart.set(s,e),!0):(this.requestedStart.delete(s),!1)}capture(t,s,e){if(!this.start(t,s,e))return!1;const i=this.requestedStart;let r=-1e4;if(i.forEach(t=>{r=Math.max(r,t)}),r===e){this.capturedId=s,i.clear();const e=new CustomEvent("ionGestureCaptured",{detail:{gestureName:t}});return document.dispatchEvent(e),!0}return i.delete(s),!1}release(t){this.requestedStart.delete(t),this.capturedId===t&&(this.capturedId=void 0)}disableGesture(t,s){let e=this.disabledGestures.get(t);void 0===e&&(e=new Set,this.disabledGestures.set(t,e)),e.add(s)}enableGesture(t,s){const e=this.disabledGestures.get(t);void 0!==e&&e.delete(s)}disableScroll(t){this.disabledScroll.add(t),1===this.disabledScroll.size&&document.body.classList.add("backdrop-no-scroll")}enableScroll(t){this.disabledScroll.delete(t),0===this.disabledScroll.size&&document.body.classList.remove("backdrop-no-scroll")}canStart(t){return void 0===this.capturedId&&!this.isDisabled(t)}isCaptured(){return void 0!==this.capturedId}isScrollDisabled(){return this.disabledScroll.size>0}isDisabled(t){const s=this.disabledGestures.get(t);return!!(s&&s.size>0)}newID(){return this.gestureId++,this.gestureId}},i=(t,s,e,i)=>{const o=r(t)?{capture:!!i.capture,passive:!!i.passive}:!!i.capture;let n,h;return t.__zone_symbol__addEventListener?(n="__zone_symbol__addEventListener",h="__zone_symbol__removeEventListener"):(n="addEventListener",h="removeEventListener"),t[n](s,e,o),()=>{t[h](s,e,o)}},r=t=>{if(void 0===o)try{const s=Object.defineProperty({},"passive",{get:()=>{o=!0}});t.addEventListener("optsTest",()=>{},s)}catch(t){o=!1}return!!o};let o;const n=t=>t instanceof Document?t:t.ownerDocument,h=t=>{let s=!1,r=!1,o=!0,h=!1;const l=Object.assign({disableScroll:!1,direction:"x",gesturePriority:0,passive:!0,maxAngle:40,threshold:10},t),d=l.canStart,v=l.onWillStart,m=l.onStart,p=l.onEnd,f=l.notCaptured,b=l.onMove,y=l.threshold,S={type:"pan",startX:0,startY:0,startTimeStamp:0,currentX:0,currentY:0,velocityX:0,velocityY:0,deltaX:0,deltaY:0,timeStamp:0,event:void 0,data:void 0},w=((t,s,e)=>{const i=e*(Math.PI/180),r="x"===t,o=Math.cos(i),n=s*s;let h=0,c=0,a=!1,u=0;return{start(t,s){h=t,c=s,u=0,a=!0},detect(t,s){if(!a)return!1;const e=t-h,i=s-c,l=e*e+i*i;if(l<n)return!1;const d=Math.sqrt(l),v=(r?e:i)/d;return u=v>o?1:v<-o?-1:0,a=!1,!0},isGesture:()=>0!==u,getDirection:()=>u}})(l.direction,l.threshold,l.maxAngle),D=e.createGesture({name:t.gestureName,priority:t.gesturePriority,disableScroll:t.disableScroll}),_=()=>{s&&(h=!1,b&&b(S))},M=()=>!(D&&!D.capture()||(s=!0,o=!1,S.startX=S.currentX,S.startY=S.currentY,S.startTimeStamp=S.timeStamp,v?v(S).then(g):g(),0)),g=()=>{m&&m(S),o=!0},k=()=>{s=!1,r=!1,h=!1,o=!0,D.release()},E=t=>{const e=s,i=o;k(),i&&(c(S,t),e?p&&p(S):f&&f(S))},G=((t,s,e,r,o)=>{let h,c,a,u,l,d,v,m=0;const p=r=>{m=Date.now()+2e3,s(r)&&(!c&&e&&(c=i(t,"touchmove",e,o)),a||(a=i(t,"touchend",b,o)),u||(u=i(t,"touchcancel",b,o)))},f=r=>{m>Date.now()||s(r)&&(!d&&e&&(d=i(n(t),"mousemove",e,o)),v||(v=i(n(t),"mouseup",y,o)))},b=t=>{S(),r&&r(t)},y=t=>{w(),r&&r(t)},S=()=>{c&&c(),a&&a(),u&&u(),c=a=u=void 0},w=()=>{d&&d(),v&&v(),d=v=void 0},D=()=>{S(),w()},_=s=>{s?(h&&h(),l&&l(),h=l=void 0,D()):(h||(h=i(t,"touchstart",p,o)),l||(l=i(t,"mousedown",f,o)))};return{setDisabled:_,stop:D,destroy:()=>{_(!0),r=e=s=void 0}}})(l.el,t=>{const s=u(t);return!(r||!o)&&(a(t,S),S.startX=S.currentX,S.startY=S.currentY,S.startTimeStamp=S.timeStamp=s,S.velocityX=S.velocityY=S.deltaX=S.deltaY=0,S.event=t,(!d||!1!==d(S))&&(D.release(),!!D.start()&&(r=!0,0===y?M():(w.start(S.startX,S.startY),!0))))},t=>{s?!h&&o&&(h=!0,c(S,t),requestAnimationFrame(_)):(c(S,t),w.detect(S.currentX,S.currentY)&&(w.isGesture()&&M()||x()))},E,{capture:!1}),x=()=>{k(),G.stop(),f&&f(S)};return{setDisabled(t){t&&s&&E(void 0),G.setDisabled(t)},destroy(){D.destroy(),G.destroy()}}},c=(t,s)=>{if(!s)return;const e=t.currentX,i=t.currentY,r=t.timeStamp;a(s,t);const o=t.currentX,n=t.currentY,h=(t.timeStamp=u(s))-r;if(h>0&&h<100){const s=(n-i)/h;t.velocityX=(o-e)/h*.7+.3*t.velocityX,t.velocityY=.7*s+.3*t.velocityY}t.deltaX=o-t.startX,t.deltaY=n-t.startY,t.event=s},a=(t,s)=>{let e=0,i=0;if(t){const s=t.changedTouches;if(s&&s.length>0){const t=s[0];e=t.clientX,i=t.clientY}else void 0!==t.pageX&&(e=t.pageX,i=t.pageY)}s.currentX=e,s.currentY=i},u=t=>t.timeStamp||Date.now();export{e as GESTURE_CONTROLLER,h as createGesture};