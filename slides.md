---
theme: slidev-theme-nearform
layout: default
highlighter: shiki
lineNumbers: false
---

<img class=logo src="/images/nearform.svg">

# The Micro Frontend Workshop

<div class="copyright">

<Copyright />

</div>

---

# What is Micro Frontend Architecture?

<div class="bigger">

The concept of <em>micro frontends</em> was first mentioned circa 2016 as an extrapolation of <em>microservices</em> to the frontend realm. Since then it became a goto strategy for splitting a monolithic frontend codebase into smaller pieces that can be owned, worked on and deployed independently.

</div>

---

# What is Module Federation?

<div class="bigger">

Module federation is one of the most popular approaches for implementing micro frontend architecture on either client or server side. With module federation, each micro frontend is treated as a standalone module that can be developed, deployed, and versioned independently, which allows those modules to share and consume each other's functionality, resources, and components, improving collaboration and reusability. Started as a Webpack Plugin, module federation has now evolved into a general concept adopted by other bundlers and frameworks.

</div>

---

# Other Approaches/1 — iFrames

<div class="bigger">

Pretty self-explanatory, this approach is about rendering various micro frontends in separate iframes and composing those via a container application. The most obvious benefit of this approach is complete decoupling of the application components. However, this approach also has some substantial cons like composition complexity and high potential for performance issues.

</div>

---

# Other Approaches/2 — Edge-side Composition

<div class="bigger">

Edge-side composition assumes that micro frontends are assembled by the edge using the Edge Side Include (ESI) specification. Biggest cons are the fact that support differs depending on the CDN, and each vendor (Akamai, CloudFlare, Fastly…) has its own features and limitations.

</div>

---

# Other Approaches/3 — Dedicated Frameworks for MFE Composition

<div>

<p class="bigger">
One of the easiest ways to compose micro frontends is by using a dedicated framework. Those frameworks can provide composition either on the client or the server side. Some of the most prominent examples include:
</p>

-   client-side: SingleSPA, Qiankun (based on SingleSPA), Luigi
-   server-side: Ara, Bit, Open Components, Piral

</div>

---

# Glossary

<div class="dense">

-   a <em>host</em> is an application that includes the initial chunks of our code, the ones that will be used to bootstrap our container – as part of module federation, those are just referenced to a remote, which allows for smaller bundle sizes and shorter initial load times;
-   a <em>remote</em> is an module that is being consumed by the host, and it can be both shared components or common dependencies to be used by different hosts;
-   a <em>bidirectional host</em> can be either a host or a remote (or both), consuming other applications or providing some code to other hosts.
</div>

---

# Module federation with Webpack

<div>
<p>As we mentioned earlier, initially module federation was implemented as a plugin introduced in Webpack 5.
To set up Module Federation in Webpack, you need to define the federated modules in your Webpack configuration files, specify the remote entry points and  expose specific modules (aka “remotes”) that you want to share with other applications. The remote entry points represent the Webpack builds that expose  modules for consumption.</p>

<p>In the consuming application's (aka “host”) Webpack configuration, you define which federated modules you want to consume. You specify the remote entry points and the modules you want to import from those remotes.
When you build and run your applications, Webpack dynamically loads the federated modules at runtime. It fetches the remote entry points, resolves the requested modules, and injects them into the consuming application. This process allows you to share code between applications without physically bundling everything together.</p>

<p>Note that as an application has multiple dependencies, a host can also have multiple remotes.</p>

</div>

---

# Federated Types

<div class="dense">
<p>
When it comes to TypeScript applications, the most common problem with using external libraries (which can be federated remote modules) is that not all of them provide TypeScript types with the original code. In the context of module federation, this problem is aggravated by the fact that Webpack only loads resources from the federated module at runtime, TypeScript, however, needs those during compilation. Long story short, there’s no obvious way to publish and fetch the compile-time types.</p>
<p>If you are facing this problem, you have following options:</p>

-   referencing types across monorepo (if possible)
-   packaging your types for distribution via a package registry (e.g. npm)
-   @module-federation/typescript

<p>
Something to keep in mind is that the host is becoming dependent on the remote types which means that each time remote changes its types, it can potentially break the host.
</p>

</div>

---

# References

<div class="dense">

-   https://martinfowler.com/articles/micro-frontends.html
-   https://www.nearform.com/blog/react-micro-frontends-module-federation/
-   https://github.com/module-federation/universe/tree/main/packages/native-federation-tests by NearForm
-   https://github.com/module-federation/universe/tree/main/packages/native-federation-typescript by NearForm

</div>

---

# Thanks For Having Us!

## 👏👏👏
