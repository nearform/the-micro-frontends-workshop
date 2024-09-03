import{_ as l}from"./slidev/CodeBlockWrapper.vue_vue_type_script_setup_true_lang-b1No9ozL.js";import{o as r,c as h,k as i,e as s,l as p,m as d,q as k,s as c,B as t,aa as e}from"./modules/vue-BzsTFDC4.js";import{I as m}from"./slidev/default-BfqauN9D.js";import{u as g,f as u}from"./slidev/context-uQNT-pvr.js";import"./modules/unplugin-icons-BexjIf9T.js";import"./index-BT2WEJ27.js";import"./modules/shiki-B0vpeCRJ.js";const _=s("h2",null,"Step 2: Setting up the Host Application",-1),f={class:"dense"},y=s("p",null,"– In this step we are going to set up an application as the host application. We are going to use a Next.js application for this purpose which will demonstrate Module Federation’s ability to work with different frameworks.",-1),A=s("h3",null,"General Steps:",-1),w=s("p",null,[e("– In order to start consuming modules, we need to configure the plugin’s "),s("code",null,"remotes"),e(" parameter which can take multiple remotes.")],-1),B=s("pre",{class:"shiki shiki-themes vitesse-dark vitesse-light slidev-code",style:{"--shiki-dark":"#dbd7caee","--shiki-light":"#393a34","--shiki-dark-bg":"#121212","--shiki-light-bg":"#ffffff"}},[s("code",{class:"language-js"},[s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#80A665","--shiki-light":"#59873A"}},"remotes"),s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},":"),s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}}," {")]),e(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#80A665","--shiki-light":"#59873A"}},"    remoteApp1"),s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},":"),s("span",{style:{"--shiki-dark":"#C98A7D77","--shiki-light":"#B5695977"}}," '"),s("span",{style:{"--shiki-dark":"#C98A7D","--shiki-light":"#B56959"}},"someRemoteApp@http://localhost:3002/remoteEntry.js"),s("span",{style:{"--shiki-dark":"#C98A7D77","--shiki-light":"#B5695977"}},"'"),s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},",")]),e(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#80A665","--shiki-light":"#59873A"}},"    remoteApp2"),s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},":"),s("span",{style:{"--shiki-dark":"#C98A7D77","--shiki-light":"#B5695977"}}," '"),s("span",{style:{"--shiki-dark":"#C98A7D","--shiki-light":"#B56959"}},"anotherRemoteApp@http://localhost:3003/remoteEntry.js"),s("span",{style:{"--shiki-dark":"#C98A7D77","--shiki-light":"#B5695977"}},"'"),s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},",")]),e(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-dark":"#666666","--shiki-light":"#999999"}},"},")])])],-1),C=s("p",null,"– The key names are going to be used later in the host application code when importing remote modules.",-1),v=s("p",null,[e("– The value’s prefix (the string before "),s("code",null,"@http..."),e(") must match remote application’s "),s("code",null,"name"),e(" parameter defined when instantiating its Module Federation plugin (see slide 13).")],-1),x={__name:"slides.md__slidev_23",setup($){const{$slidev:b,$nav:D,$clicksContext:a,$clicks:j,$page:I,$renderContext:N,$frontmatter:o}=g();return a.setup(),(P,S)=>{const n=l;return r(),h(m,k(c(t(u)(t(o),22))),{default:i(()=>[_,s("div",f,[y,A,w,p(n,d({},{ranges:[]}),{default:i(()=>[B]),_:1},16),C,v])]),_:1},16)}}},q=x;export{q as default};
