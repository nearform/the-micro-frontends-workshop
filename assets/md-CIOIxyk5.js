import{o as n,c as s,k as i,q as r,s as l,B as t,e}from"./modules/vue-BzsTFDC4.js";import{I as p}from"./slidev/default-BfqauN9D.js";import{u as c,f as u}from"./slidev/context-uQNT-pvr.js";import"./index-BT2WEJ27.js";import"./modules/shiki-B0vpeCRJ.js";const d=e("h2",null,"Module federation with Webpack",-1),m=e("div",null,[e("p",null,"As mentioned earlier, initially, module federation was implemented as a plugin introduced in Webpack 5. To set up Module Federation in Webpack, you need to define the federated modules in your Webpack configuration files, specify the remote entry points and expose specific modules (aka “remotes”) that you want to share with other applications. The remote entry points represent the Webpack builds that expose modules for consumption."),e("p",null,"In the consuming application's (aka “host”) Webpack configuration, you define which federated modules you want to consume. You specify the remote entry points and the modules you want to import from those remotes. When you build and run your applications, Webpack dynamically loads the federated modules at runtime. It fetches the remote entry points, resolves the requested modules, and injects them into the consuming application. This process allows you to share code between applications without physically bundling everything together."),e("p",null,"Note that as an application has multiple dependencies, a host can also have multiple remotes.")],-1),h={__name:"slides.md__slidev_7",setup(f){const{$slidev:y,$nav:_,$clicksContext:o,$clicks:k,$page:b,$renderContext:w,$frontmatter:a}=c();return o.setup(),(g,v)=>(n(),s(p,r(l(t(u)(t(a),6))),{default:i(()=>[d,m]),_:1},16))}},I=h;export{I as default};
