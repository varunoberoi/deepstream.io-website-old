{
    "title": "Realtime apps with deepstream-polymer",
    "description": "How to use polymer elements and behaviours with deepstream"
}
Using deepstream-polymer
=================================================

![deepstream-polymer](../assets/images/polymer/deepstream-polymer.png)

Polymer brings WebComponents to all current browsers, allowing  applications to be built using the proven approach of using DOM elements as the primary building blocks.

With deepstream-polymer its now easy to add data-sync directly to these DOM elements.

```html
<ds-record name="myRecordName" data="{{recordData}}"></ds-record>
```
or - if required - by extending existing elements with a minimal bit of javascript using [behaviours](//www.polymer-project.org/1.0/docs/devguide/behaviors.html):
```javascript
behaviours: [ Polymer.DSRecordBehaviour ]
```

You can find the documentation for all deepstream-polymer elements and behaviours here:

<a class="mega" href="//deepstreamio.github.io/deepstream.io-tools-polymer"><i class="fa fa-book"></i>Polymer Documentation</a>

### How to use deepstream-polymer

<div class="table-wrapper">
<table class="mini space">
    <thead>
        <tr>
            <th><i class="fa fa-github"></i>Github</th>
            <th><i class="fa fa-cube"></i>Bower</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <a href="https://github.com/deepstreamIO/deepstream.io-tools-polymer">
                    https://github.com/deepstreamIO/deepstream.io-tools-polymer
                </a>
            </td>
            <td><code>deepstream.io-tools-polymer</code></td>
        </tr>
    </tbody>
</table>
</div>

The beauty of using Polymer is that you can build an entire data-sync application without a single line of javascript! Let's look at the building blocks you can use to get deepstream working with Polymer.

Before we begin, you'll need to start a deepstream server to test across multiple browsers. You can look at the [getting started tutorial](getting-started.html) to get you up to date in no time.

#### Connectivity

The first thing you'll need to do is to create a connection to deepstream. This can be accomplished by simply adding a `ds-connection` element. This creates a connection to deepstream based on the `url` attribute you've specified and exposes the [connection state](../docs/connection_states.html) and deepstream instance.

```html
<ds-connection
    url="localhost:6020"
    state="{{connectionState}}"
    ds={{ds}}>
</ds-connection>
```

Once we have a connection it's time to login. This can be achieved via adding a `ds-login` element. You can also log in anonymously by having an `auto-login` attribute present.

```html
<ds-login
    auto-login
    logged-in="{{loggedIn}}"
    ds="[[ds]]">
</ds-login>
```

Want to login with an actual user-name or password? Just supply them via your `auth-params` and call `login` when you're ready. Note, this step does require a tiny bit of javascript!

```html
<ds-login
    auth-params="{{credentials}}"
    logged-in="{{loggedIn}}"
    ds="[[ds]]">
    <input type="text" value="{{credentials.username::input}}"/>
    <input type="password" value="{{credentials.username::password}}"/>
    <!--
        Note: login binding is on the current scope and will require
        to be proxied to the login method - or you could create your own
        element that uses the LoginBehaviour
    -->
    <button on-click="{{login}}" />
</ds-login>
```

#### Records

Now you that you've a connection you can enable your elements to auto-sync their data with all other clients simply by using a `ds-record` element. This requires three attributes, a `name` to know what record to use, `data` to allow reading and writing to the record and `ds` to expose the deepstream client to the element.

```html
<template>
    <ds-connection ds="{{ds}}"></ds-connection>
    <ds-record name="[[name]]" data="{{data}}" ds="[[ds]]">
        <input type="text" value="{{data.name::input}}">
    </ds-record>
</template>
```

Note how there is another `ds-connection` element present. This is to access the same deepstream connection using a [global variable](https://github.com/Polymer/docs/issues/334) across the application.

#### Lists

Finally, let's say you have a [list](https://deepstream.io/tutorials/lists.html) of records that are related to each other and would like to loop over them. This can be achieved by using a `ds-list` element. The attributes used are the same as `ds-record`, except the record names are exposed via an Array called entries.

```html
<template>
    <ds-connection ds="{{ds}}"></ds-connection>
    <ds-list name="[[name]]" entries="{{todos}}" ds="[[ds]]">
        <template is="dom-repeat" items="[[todos]]" as="recordId">
            <div>RecordId : {{recordId}}</div>
        </template>
    </ds-list>
</template>
```

And that's it, everything needed to create an application with data-sync!

#### Building a more complex app?

Here's an example of how to combine all these concepts to build a to-do list:

<img width="" src="../assets/images/polymer/example-app.gif" alt="basic todo app with deepstream-polymer" />

<a class="mega" href="//github.com/deepstreamIO/ds-tutorial-polymer"><i class="fa fa-github"></i>todo-list example</a>