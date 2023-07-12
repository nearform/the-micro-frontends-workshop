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

# Getting started

<div class="dense">

#### Requirements

-   Node LTS
-   npm >= 7

#### Setup

```bash
git clone https://github.com/nearform/the-micro-frontends-workshop
npm i
```

</div>

---

# Workshop structure

<div class="dense">

-   This workshop is made of multiple, incremental modules (aka exercises)
-   Each module builds on top of the previous one
-   At each step you are asked to add features and solve problems
-   You will find the solution to each step in the `src/step-{n}-{name}` folder
-   The 🏆 icon indicates bonus features
-   The 💡 icon indicates hints

</div>

---

# Running the modules

-   `cd src/step-{n}-{name}`

-   Check out README.md

#### Example

```bash
cd src/step-01-setting-up-remote

npm run start
```

---

# Step 1: Setting up the Remote

<div  class="dense">

-   There are a few key steps that need to be made in order to expose a module for remote consumption (federation).
-   In this example we are going to demonstrate these steps in a basic React app since any webpack based application that supports MF will have the similar flow for enabling this feature.

</div>

---

# Step 1: Setting up the Remote /2

<div  class="dense">

## Configuring `webpack.config.js` file

In order to enable Module Federation we need to import `ModuleFederationPlugin` from webpack on top of this file.

```js
const { ModuleFederationPlugin } = require('webpack').container
```

This plugin needs to be instantiated and configured inside the plugins section of the config file. The most basic configuration requires `name`, `fileName` and `exposes` key values.

```js
// ....
plugins: [
    new ModuleFederationPlugin({
      name: 'remoteAppName',
      filename: 'remoteEntry.js',
      exposes: { './Button': './src/Button' }
    }),
  ],
```

</div>

---

# Step 1: Setting up the Remote /3

<div  class="dense">

-   `name` is where we define a name to distinguish modules. This value will be used by a consumer application when defining remotes inside of it.
-   `filename` can be any value and it will be an entry point for exposed/shared modules. `remoteEntry.js` is most commonly/conventionally used for this purpose.
-   In `exposes` object we define components for remote consumption. Key name should always be in form of `./ComponentName` and the value should be its relative path to webpack config file.

</div>

---

# Step 1: Setting up the Remote /4

<div  class="dense">

## Adding an extra layer of indirection to the entire app

We need `index.js` to be app's entry point but inside of it we need to import another file `bootstrap.js` (named this way by convention) that renders the entire app. This file contains what `index.js` would normally contain in a React app including `ReactDOM.render()` method. To allow Module Federation we need to import it dynamically using `import()` inside of `index.js`.

```js
//src/bootstrap.js
// ... React Code
ReactDOM.render(<App />, document.getElementById('root'))
```

```js
//src/index.js
import('bootstrap.js')
```

Without this extra layer of indirection Webpack would throw the following error when trying to consume the remote module:

```js
Shared module is not available for eager consumption
```

</div>

---

# Step 1: Exercise 💻

<div  class="dense">

-   In `src` folder of the provided basic React application:

    -   Create a `Button.js` file with `<Button />` element that returns a basic HTML `button` with `Remote Button` text.
    -   Render that element inside `App.js`.
    -   Render the entire application via `ReactDOM.render()` method inside of `bootstrap.js ` file and import that file in `index.js` file using the `import` statement.

</div>

---

# Step 1: Exercise/2 💻

<div  class="dense">

-   In `webpack.config.js` file:

    -   Import `ModuleFederationPlugin` plugin from webpack's `container` object.
    -   In exported modules instantiate `new ModuleFederationPlugin`.
    -   Pass a configuration object and define values for `name`, `filename` and `exposes` keys. Remember that `filename` uses a naming convention and `exposes` refers to the element that we want to expose.

</div>

---

# Step 1: Solution

```js
// src/Button.js
import React from 'react'

const Button = () => <button>Remote Button</button>

export default Button
```

```js
// src/App.js
import Button from './Button'
import React from 'react'

const App = () => (
    <div>
        <h1>Basic Remote Application</h1>
        <Button />
    </div>
)

export default App
```

---

# Step 1: Solution /2

```js
// src/bootstrap.js
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<App />, document.getElementById('root'))
```

```js
// src/index.js
import('./bootstrap')
```

---

# Step 1: Solution /3

```js
// webpack.config.js
// .....
const { ModuleFederationPlugin } = require('webpack').container
// .....

module.exports = {
    // .....
    plugins: [
        new ModuleFederationPlugin({
            name: 'remote',
            filename: 'remoteEntry.js',
            exposes: {
                './Button': './src/Button',
            },
        }),
        // .....
    ],
}
```

---

# Step 1: Trying it Out

#### From your browser visit :

<div class="dense">

```js
http://localhost:3002

```

And

```js
http://localhost:3002/remoteEntry.js

```

For the first one you should see a page that displays `Basic Remote Application` title with a `Remote Button`.

For the second one you should see a `script` that exposes our button element for remote consuption.

</div>

---

# Step 2: Exercise 💻

<div class="dense">

Create a Next.js app that:

-   displays a simple layout (e.g. a distinctive background)
-   is configured as a host
-   consumes a remote from step 1

> 💡 use https://nextjs.org/docs/pages/api-reference/create-next-app

> 🏆 add a header and a footer

</div>

---

# Step 2: Solution

```bash
npx create-next-app@latest the-host
cd the-host && npm i
```

```javascript
// next.config.js
const NextFederationPlugin = require('@module-federation/nextjs-mf')

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
        if (!options.isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: 'host',
                    remotes: {
                        remote: 'remote@http://localhost:3001/remote.js',
                    },
                    filename: 'static/chunks/remoteEntry.js',
                })
            )
        }

        return config
    },
}

module.exports = nextConfig
```

```javascript
// app/page.js
export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Hello, I am your Host!
                </p>
            </div>
        </main>
    )
}
```

---

# Step 2: Result

...

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
