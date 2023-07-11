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

<div class="dense">

The concept of <em>micro frontends</em> was first mentioned circa 2016 as an extrapolation of <em>microservices</em> to the frontend realm. Since then it became a goto strategy for splitting a monolithic frontend codebase into smaller pieces that can be owned, worked on and deployed independently.

</div>

---

# What is Module Federation?

<div>

Module federation is one of the most popular approaches for implementing micro frontend architecture on either client or server side. With module federation, each micro frontend is treated as a standalone module that can be developed, deployed, and versioned independently, which allows those modules to share and consume each other's functionality, resources, and components, improving collaboration and reusability. Started as a Webpack Plugin, module federation has now evolved into a general concept adopted by other bundlers and frameworks.

</div>

---

# Other Approaches/1 — iFrames

<div>

Pretty self-explanatory, this approach is about rendering various micro frontends in separate iframes and composing those via a container application. The most obvious benefit of this approach is complete decoupling of the application components. However, this approach also has some substantial cons like composition complexity and high potential for performance issues.

</div>

---

# Other Approaches/2 — Edge-side Composition

<div>

Edge-side composition assumes that micro frontends are assembled by the edge using the Edge Side Include (ESI) specification. Biggest cons are the fact that support differs depending on the CDN, and each vendor (Akamai, CloudFlare, Fastly…) has its own features and limitations.

</div>

---

# Other Approaches/3 — Dedicated Frameworks for MFE Composition

<div>

One of the easiest ways to compose micro frontends is by using a dedicated framework. Those frameworks can provide composition either on the client or the server side. Some of the most prominent examples include:

-   client-side: SingleSPA, Qiankun (based on SingleSPA), Luigi
-   server-side: Ara, Bit, Open Components, Piral

</div>

---

# Glossary

<div>

-   a <em>host</em> is an application that includes the initial chunks of our code, the ones that will be used to bootstrap our container – as part of module federation, those are just referenced to a remote, which allows for smaller bundle sizes and shorter initial load times;
-   a <em>remote</em> is an module that is being consumed by the host, and it can be both shared components or common dependencies to be used by different hosts;
-   a <em>bidirectional host</em> can be either a host or a remote (or both), consuming other applications or providing some code to other hosts.
</div>

---

# Thanks For Having Us!

## 👏👏👏
