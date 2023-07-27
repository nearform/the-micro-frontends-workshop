---
theme: slidev-theme-nearform
layout: default
highlighter: shiki
lineNumbers: false
---

<img class=logo src="/images/nearform.svg">

# The Micro Frontends Workshop

<div class="copyright">

<Copyright />

</div>

---

## What is Micro Frontend Architecture?

<div class="bigger">

The concept of <em>micro frontends</em> was first mentioned circa 2016 as an extrapolation of <em>microservices</em> to the frontend realm. Since then, it has become a go-to strategy for splitting a monolithic frontend codebase into smaller pieces that can be owned, worked on, and deployed independently.

</div>

---

## What is Module Federation?

<div class="bigger">

Module federation is one of the most popular approaches for implementing micro frontend architecture on either the client or server side. With module federation, each micro frontend is treated as a standalone module that can be developed, deployed, and versioned independently, which allows those modules to share and consume each other's functionality, resources, and components at runtime, improving collaboration and reusability.

Started as a Webpack Plugin, module federation has now evolved into a general concept adopted by other bundlers and frameworks.

</div>

---

## Other Approaches/1

<div class="dense">

-- **runtime Web Components**: each micro frontend is mounted at a custom HTML element, and the container performs instantiation;

-- **runtime Javascript integration**: somewhat similar to both the previous approach and module federation, this one includes each micro frontend onto the page using a `<script>` tag; the container application becomes an entry point, decides which micro frontend to be mounted, and calls the relevant function telling the micro frontend when and where to get rendered; each build file can be deployed independently;

-- **iFrames**: this approach is about rendering various micro frontends in separate iframes and composing those via a container application; the most obvious benefit of this approach is complete decoupling of the application components; however, this approach also has some substantial cons like composition complexity and high potential for performance issues;

</div>

---

## Other Approaches/2

-- **edge-side Composition**: edge-side composition assumes that micro frontends are assembled by the edge using the Edge Side Include (ESI) specification; the biggest cons are the fact that support differs depending on the CDN, and each vendor (Akamai, CloudFlare, Fastly, etc.) has its own features and limitations;

-- **dedicated Frameworks for MFE Composition**: one of the easiest ways to implement micro frontend architecture is to use a dedicated framework that takes care of all the ins and outs and lets you focus on the application code; some notable examples of such frameworks are listed below:

<div class="sublist">

  -- client-side: [SingleSPA](https://single-spa.js.org/), [Qiankun](https://qiankun.umijs.org/) (based on SingleSPA), [Luigi](https://luigi-project.io/);

  -- server-side: [Ara](https://ara-framework.github.io/website/), [Bit](https://bit.dev/), [Open Components](https://opencomponents.github.io/), [Piral](https://piral.io/).
</div>

---

## Module Federation Glossary

<div class="dense">

-- a **host** is an application that includes the initial chunks of our code, the ones that will be used to bootstrap our container; the concept of module federation assumes that some components that container will render are just being referenced to a remote and not the initial bundle, which allows for smaller bundle sizes and shorter initial load times;

-- a **remote** is a module that is being consumed by the host, and it can be either shared components or common dependencies to be used by different hosts;

-- a **bidirectional host** is both a host and a remote, consuming other remotes and providing some code to other hosts.
</div>

---

## Module federation with Webpack

<div>
<p>As mentioned earlier, initially, module federation was implemented as a plugin introduced in Webpack 5.
To set up Module Federation in Webpack, you need to define the federated modules in your Webpack configuration files, specify the remote entry points and expose specific modules (aka “remotes”) that you want to share with other applications. The remote entry points represent the Webpack builds that expose modules for consumption.</p>

<p>In the consuming application's (aka “host”) Webpack configuration, you define which federated modules you want to consume. You specify the remote entry points and the modules you want to import from those remotes.
When you build and run your applications, Webpack dynamically loads the federated modules at runtime. It fetches the remote entry points, resolves the requested modules, and injects them into the consuming application. This process allows you to share code between applications without physically bundling everything together.</p>

<p>Note that as an application has multiple dependencies, a host can also have multiple remotes.</p>

</div>

---

## Getting started

<div class="dense">

### Requirements

-- Node LTS

-- yarn

### Setup

```bash
git clone https://github.com/nearform/the-micro-frontends-workshop
cd the-micro-frontends-workshop && yarn install
```

</div>

---

## Workshop structure

<div class="dense">

-- This workshop is made up of multiple, incremental modules (aka exercises);

-- Each module builds on top of the previous one;

-- At each step, you are asked to add features and solve problems;

-- You will find the solution to each step in the `src/step-{n}-{name}` folder.

</div>

---

## Running the modules

-- `cd src/step-{n}-{name}`

-- Check out README.md

### Example

```bash
cd src/step-01-setting-up-remote

yarn install

yarn run start
```

---

## Step 1: Setting up the Remote

<div class="dense">

-- There are a few key steps that need to be taken in order to expose a module for remote consumption (federation);

-- In this example, we are going to demonstrate these steps in a basic React app since any Webpack based application that supports MF will have a similar flow for enabling this feature.

-- This aplication on its own will work just as any other React application but it will have the ability to expose a specific part of it as a remote which we will be able to consume inside of another application in later steps of the workshop.

</div>

---

## Step 1: Setting up the Remote /2

<div class="dense">


## Configuring the `webpack.config.js` file


In order to enable module federation, we need to import `ModuleFederationPlugin` from Webpack on top of this file.

```js
const { ModuleFederationPlugin } = require('webpack').container
```

This plugin needs to be instantiated and configured inside the plugins section of the configuration file. The most basic configuration requires `name`, `fileName` and `exposes` key values.

```js
// ....
plugins: [
    new ModuleFederationPlugin({
      name: 'remoteAppName',
      filename: 'remoteEntry.js',
      exposes: { './ComponentName': './src/components/ComponentName' }
    }),
  ],
```

</div>

---

## Step 1: Setting up the Remote /3

<div class="dense">

```js
// ...
      name: 'remoteAppName',
      filename: 'remoteEntry.js',
      exposes: { './ComponentName': './src/components/ComponentName' }
// ...
```

-- `name` is where we define a name to distinguish modules. This value will be used by a consumer application when defining remotes inside of it;

-- `filename` can be any value, and it will be an entry point for exposed/shared modules. `remoteEntry.js` is most commonly/conventionally used for this purpose;

-- in the `exposes` object we define components for remote consumption. The key name should always be in form of `./ComponentName` in any application that relies on Webpack's ModuleFederationPlugin and the value should be the component's relative path to the webpack.config.js.


</div>

---

## Step 1: Setting up the Remote /4

<div class="dense">

### Adding an extra layer of indirection to the entire app

We need `index.js` to be the app's entry point but inside of it we need to import another file, `bootstrap.js` (named this way by convention) that renders the entire app. This file contains what `index.js` would normally contain in a React app including `createRoot()` method. To allow Module Federation we need to import it dynamically using `import()` inside of `index.js`. This extra layer is needed for Webpack to load all of the imports necessary to render the remote app (failure to provide it will result in an error saying something like `Shared module is not available for eager consumption`).

```js
//src/bootstrap.js
// ... React Code
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

```js
//src/index.js
import('bootstrap.js')
```

</div>

---

## Step 1: Exercise 💻

<div class="dense">

In `src` folder of the provided basic React application:

-- import the `Nav` component from `src/components` folder, dispaly it inside the `App.js` file under the title and pass some links as props to it; the links props should be an array of objects like this:
```js
  const links = [
    { url: "/", label: "Home Page" },
    { url: "https://example.com", label: "Example Page" }
  ]
```

-- render the entire application via the `createRoot()` method inside the `bootstrap.js ` file and import that file in the `index.js` file using the `import` statement.

</div>

---

## Step 1: Exercise/2 💻

<div class="dense">

In `webpack.config.js` file:

-- import `ModuleFederationPlugin` plugin from Webpack's `container` object;

-- in exported modules, instantiate `new ModuleFederationPlugin`;

-- pass a configuration object and define values for `name`, `filename`, and `exposes` keys. Remember that `filename` uses a naming convention, and `exposes` refers to the element that we want to expose.

</div>

---

## Step 1: Solution

```js
// src/App.js
import React from 'react'
import Nav from './components/Nav'

const links = [
  { url: '/', label: 'Home' },
  { url: 'https://react.dev/', label: 'Learn more about React.js' },
  { url: 'https://webpack.js.org/concepts/module-federation/', label: 'Learn more about Module Federation' }
]

const App = () => (
    <div>
        <h1>Basic Remote Application</h1>
        <Nav links={links}>
    </div>
)
export default App
```

---

## Step 1: Solution /2

```js
// src/bootstrap.js
import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));
root.render(<App />);

```

```js
// src/index.js
import('./bootstrap')
```

---

## Step 1: Solution /3

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
                './Nav': './src/components/Nav',
            },
        }),
        // .....
    ],
}
```

---

## Step 1: Trying it Out

### From your browser visit :

<div class="dense">

```js
http://localhost:3002

```

And

```js
http://localhost:3002/remoteEntry.js

```

For the first one, you should see a page that displays the `Basic Remote Application` title with your `Nav` component (a list of links).

For the second one, you should see a `script` that exposes our component for remote consumption.

</div>

---

## Step 1: Result


<img src="/images/step-01-results-1.png" class="rounded shadow" style="height: auto; width: 600px; margin: auto;" alt="React.js remote app">

---

## Step 1: Result /2

<img src="/images/step-01-results-2.png" class="rounded shadow" style="height: auto; width: 600px; margin: auto;" alt="React.js remote app">

---

## Step 2: Setting up the Host Application

<div class="dense">

-- In this step we are going to set up an application as the host application. We are going to use a Next.js application for this purpose which will demonstrate Module Federation's ability to work with different frameworks.

### General Steps:

-- In order to start consuming modules, we need to configure the plugin's `remotes` parameter which can take multiple remotes.


```js
remotes: {
    remoteApp1: 'someRemoteApp@http://localhost:3002/remoteEntry.js',
    remoteApp2: 'anotherRemoteApp@http://localhost:3003/remoteEntry.js',
},
```

-- The key names are going to be used later in the host application code when importing remote modules.

-- The value's prefix (the string before `@http...`) must match remote application's `name` parameter defined when instantiating its Module Federation plugin (see slide 13).
</div>

---

## Step 2: Setting up the Host Application /2

<div class="dense">

-- In order to import/consume a module into a plain webpack host applications such as any React.js based app, we need to use the import keyword (dynamic import) and refer to the remote component based on the `key` name from one of the prevoius steps where we set up remotes in the config file. We used `someRemoteApp` and `anotherRemoteApp` in our example.

-- Our example import statement could look something like this:

```js
import SomeRemoteComponent from "someRemoteApp/SomeRemoteComponent"
```

### Next.js specific steps:

-- In Next.js apps in CSR (client side rendering) scenario we have to rely on `dynamic()` method to dynamically import the remote component. We also need to set `ssr` to `false` because we will not be using server side rendering in our example.

```js
import dynamic from 'next/dynamic'

const SomeRemoteComponent = dynamic(() => import('someRemoteApp/SomeRemoteComponen'), { ssr: false })
```

</div>

---

## Step 2: Setting up the Host Application /3

<div class="dense">

-- To enable Module Federation in Next.js we need to import `NextFederationPlugin` in the `next.config.js` file since `ModuleFederationPlugin` and `webpack.config.js` are not used in Next.js apps.

-- Note that `NextFederationPlugin` has to be installed separately with `yarn add @module-federation/nextjs-mf`.

-- `filename` property needs to be set using the `static/chunks/{fileName}.js` pattern.

```js
// next.config.js
const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
// ...
config.plugins.push(
    new NextFederationPlugin({
        name: 'host',
        remotes: {
            remote: 'remote@http://localhost:3002/remoteEntry.js',
        },
    filename: 'static/chunks/remoteEntry.js'
    }),
);
// ...
```

</div>


---

## Step 2: Exercise 💻

<div class="dense">


## Create a Next.js app, and inside of it:

-- Inside `nextApp/pages/index.js` file import a simple `LayoutBox` component from `nextApp/components/nextjs-layout-box.js` file. Notice that it takes `children` props.

-- Display the `LayoutBox` component below the `<Head>` section, place the remote component `Nav` inside of it and pass links props to it similar to Step 1.

-- Configure the application inside `next.config.js` file so it uses `NextFederationPlugin`.

-- We added a `reactApp` in this step and exposed the `Nav` component (similar to step 1). Configure `nextApp` so it consumes that component from port `8080`.

</div>

---

## Step 2: Solution

```javascript
// next.config.js
const NextFederationPlugin = require('@module-federation/nextjs-mf');
module.exports = {
  webpack(config) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'nextApp',
          remotes: {
            remote: 'reactApp@http://localhost:8080/remoteEntry.js',
          },
          filename: 'static/chunks/remoteEntry.js'
        })
      )
    return config
  },
  // your original next.config.js export
  reactStrictMode: true,
}
```

---

## Step 2: Solution /2

```js
//pages/index.js
import dynamic from 'next/dynamic'
import LayoutBox from '../components/nextjs-layout-box'

const Nav = dynamic(() => import('remote/Nav'), { ssr: false })

const links = [
  { url: '/', label: 'Home' },
  { url: 'https://nextjs.org/', label: 'Learn more about Next.js' },
]
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        {/* Head example code */}
      </Head>
      <LayoutBox>
        <Nav links={links} />
      </LayoutBox>
    </div>
  )
}


```

---

## Step 2: Trying it Out

<div class="dense">


In your terminal from the `src/step-02-setting-up-host` folder run:

```bash
yarn && yarn start
```

This will start both remote and host applications at the same time on ports 8081 and 8080 respectively.

### From your browser, visit:


```js
http://localhost:8080

```

You should see the `LayoutBox` component acting as a wrapper and the remote `Nav` component displayed inside of it (see the screenshot on the next slide).

</div>

---

## Step 2: Result

<img src="/images/step-02-results.png" class="rounded shadow" style="height: auto; width: 600px; margin: auto;" alt="Next.js host app">

---

# Step 3: Setting up a Bi-Directional Example

<div class="dense">

In this step we are going to demonstrate Module Federation's bi-directional ability to share modules between multiple apps that can act both as the host and the remote at the same time by putting together what we learned in the previous two steps.

</div>

---

## Step 3: Exercise

<div class="dense">


-- Set up a `Next.js application` (you can use the same application from step 2) on port `8080`.

-- Create a `LayoutBox` component that takes `children` in the `components/nextjs-layout-box.js` file.

-- Create a `Table` component that takes a `data` object as props and renders an HTML table in `components/nextjs-table.js`.

-- Expose both components as remotes.

</div>

---

## Step 3: Exercise /2

<div class="dense">


-- Set up a `React.js application` (you can use the same application from step 1) on port `8081`.

-- Create a `Nav` component that takes a `links` object as props and displays links as an unordered list in the `src/components/Nav.jsx` file.

-- Create a `Title` component that takes a `title` string as props and returns the title as an `h1` element in the `src/components/Title.jsx` file.

-- Expose both components and configure both applications so they can consume those components from each other.

</div>

---

## Step 3: Solution

```js
// nextjs-layout-box.js
import * as React from 'react';

const LayoutBox = ({ children }) => {
  return (
    <div
      style={{
        background: "#4C4556",
        width: "90%",
        height: "100vh",
        color: "white",
        textAlign: "center",
        fontSize: "24px",
        margin: "auto",
        overflow: "hidden"
      }}
    >
      { children }
    </div>
  );
};

export default LayoutBox;

```

---

## Step 3: Solution /2

```js
// nextjs-table.js
import * as React from 'react'

const Table = ({ data }) => {
  return (
    <table>
      <thead>
        <tr><th>Company</th><th>State</th><th>Country</th></tr>
      </thead>
      <tbody>
        {data.map((d, i) => <tr key={d.i}><td>{d.company}</td><td>{d.state}</td><td>{d.country}</td></tr>)}
      </tbody>
    </table>
  )
}

export default Table

```

---

## Step 3: Solution /2

```js
// next.config.js
//...
new NextFederationPlugin({
    name: 'nextApp',
    remotes: {
        remote: 'reactApp@http://localhost:8080/remoteEntry.js',
    },
    exposes: {
        './nextjs-layout-box': './components/nextjs-layout-box.js',
        './nextjs-table': './components/nextjs-table.js'
    },
// ...
})
```

---

## Step 3: Solution /3

```js
// Nav.jsx
import * as React from 'react';
const Nav = ({ links }) => {
  return (
    <nav
      style={{ background: "#872642", width: "100%", color: "white", textAlign: "center", display: "block"
      }}
    >
      <ul>
        { links.map((link, i) => (
          <li key={i} style={{display: "inline-block", padding: "10px 20px" }}>
            <a style={{color: "#F6C026"}} href={link.url}>{link.label}</a>
          </li> )
          )
        }
      </ul>
    </nav>
  );
};
export default Nav;
```

---

## Step 3: Solution /4

```js
// Title.jsx
import * as React from 'react';
const Title = ({title}) => <h1 style={{fontSize: "30px", paddingTop: "10px"}}>{title}</h1>;
export default Title
```

---

## Step 3: Solution /5

```js
// webpack.config.js
// ...
new ModuleFederationPlugin({
      name: 'reactApp',
      filename: 'remoteEntry.js',
      remotes: {
        remote: 'nextApp@http://localhost:8081/_next/static/chunks/remoteEntry.js',
      },
      exposes: {
        './Nav': './src/components/Nav',
        './Title': './src/components/Title'
      },
// ...
)}
```

---

# Step 3: Trying it Out

<div class="dense">

## From your browser, visit:

```js
http://localhost:8080

```

You should see the `React.js` app wrapped in `LayoutBox` consumed from `Next.js` app as well as the `Nav` and `Title` local components and another remote `Table` component.

## From your browser, visit:

```js
http://localhost:8081

```

You should see the `Next.js` app wrapped in its local `LayoutBox` as well the two remote `Nav` and `Title` components and another local `Table` component.

</div>

---

## Step 3: Result

<img src="/images/step-03-results-1.jpg" class="rounded shadow" style="height: auto; width: 600px; margin: auto;" alt="React.js app">

---

## Step 3: Result /2

<img src="/images/step-03-results-2.jpg" class="rounded shadow" style="height: auto; width: 600px; margin: auto;" alt="Next.js app">

---

# Shared dependencies

<div class="dense">

-- **shared dependencies** refer to the libraries, frameworks, or modules that are required by multiple federated modules to function properly. By sharing these dependencies, modules can avoid duplication and ensure consistency and compatibility;

-- shared dependencies typically include runtime libraries, such as **React** or **Angular**, along with any additional utility libraries or common components that are needed by the federated modules. They are typically declared and managed in a shared configuration file, allowing modules to access and utilize them seamlessly.

</div>

Please follow the guidelines from Zack Jackson (inventor & co-creator of module federation):

-- sharing should be done with care - since shared modules cannot be tree-shaken;

-- if you need a singleton (like things that depend on React context), then it must be shared;

-- sharing all dependencies can lead to larger bundles so its best to consider case by case.

---

## Shared dependencies: Shared API

-- **shared (object | [string])**: an object or an array containing a list of dependency names that can be shared across the federated modules;

-- **eager (boolean)**: specifies whether the dependency will be eagerly loaded and provided to other federated modules as soon as the host app starts (otherwise will be loaded lazily when first requested by the federated app);

-- **singleton (boolean)**: whether the dependency will be considered a singleton, which means that only a single instance of it is supposed to be shared across all the federated modules;

-- **requiredVersion (string)**: specifies the required version of the dependency, which makes any incompatible version loaded separately (not shared); note that if the `singleton` property is set to `true`, setting `requiredVersion` will raise a warning in case of a conflict.

---

## Shared dependencies: Example

```javascript
// webpack.config.js

const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const packageJsonDependencies = require('./package.json').dependencies

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'MyApp',
      filename: 'remoteEntry.js',
      exposes: { './Button': './src/components/Button' },
      shared: {
        react: { singleton: true, requiredVersion: packageJsonDependencies.react },
        'react-dom': { singleton: true, requiredVersion: packageJsonDependencies['react-dom'] },
      },
    }),
  ],
};
```

---

## Step 4: Setting up Shared Modules Example

<div class="dense">

In this step, we are going to demonstrate sharing dependencies (React and React DOM) across federated modules.

</div>

---

## Step 4: Exercise

<div class="dense">

-- Take the applications you created as part of step 3 exercises;

-- Modify Webpack config of the React app to have React and React DOM as shared dependencies;

-- Modify Next.js config of the Next.js app to have React and React DOM as shared dependencies;

-- Set the versions of these shared dependencies to be read from the respective `package.json` files;

-- Make sure the dependencies are being shared as singletons;

-- Try changing the version of React and React DOM in the `package.json` file of the React app to a previous one, and make sure you get a warning about version mismatch in the console.

</div>

---

## Step 4: Solution

```js
// next.config.js
const packageJsonDependencies = require('./package.json').dependencies

// ...
    new NextFederationPlugin({
// ...
      shared: {
        react: {
          requiredVersion:
            packageJsonDependencies.react,
          singleton: true,
        },
        'react-dom': {
          requiredVersion:
            packageJsonDependencies['react-dom'],
          singleton: true,
        },
      },
      extraOptions: {
        skipSharingNextInternals: true,
      }
    })
// ...
```

---

## Step 4: Solution /2

```js
// webpack.config.js
const packageJsonDependencies = require('./package.json').dependencies

// ...
    new ModuleFederationPlugin({
// ...
      shared: {
        react: {
          requiredVersion:
            packageJsonDependencies.react,
          singleton: true,
        },
        'react-dom': {
          requiredVersion:
            packageJsonDependencies['react-dom'],
          singleton: true,
        },
      },
    }),
// ...
)}
```

---

## Step 4: Result

![Requests of the Next.js app](/images/step-04-results1.png "Requests of the Next.js app")

![Requests of the React app](/images/step-04-results2.png "Requests of the React app")

![Version mismatch warning](/images/step-04-results3.png "Version mismatch warning")

---

## Federated Types

<div class="dense">
<p>
When it comes to TypeScript applications, the most common problem with using external libraries (which can be federated remote modules) is that not all of them provide TypeScript types with the original code. In the context of module federation, this problem is aggravated by the fact that Webpack only loads resources from the federated module at runtime, TypeScript, however, needs those during compilation. In this case you have the following options:</p>

-- @module-federation/native-federation-typescript,

-- @module-federation/typescript,

-- packaging your types for distribution via a package registry (e.g., npm);

-- referencing types across monorepo (if possible).

<p>
Note that TypeScript plugins are the easiest way to handle federated types. They fetch the types at compile-time and store within the project in order to make them available to tsc whenever it’s needed.
</p>

</div>

---

## References

<div class="dense">

-- [React Micro Frontends with Module Federation](https://www.nearform.com/blog/react-micro-frontends-module-federation/)

-- [Micro Frontends by Cam Jackson](https://martinfowler.com/articles/micro-frontends.html)

-- [@module-federation/typescript](https://github.com/module-federation/typescript)

-- [Bundler-Agnostic Plugins to Share Federated Components for Testing Purposes](https://github.com/module-federation/universe/tree/main/packages/native-federation-tests) by NearForm

-- [Bundler-Agnostic Plugins to Share Federated Types](https://github.com/module-federation/universe/tree/main/packages/native-federation-typescript) by NearForm

</div>

---

## Thanks For Having Us!

### 👏👏👏
