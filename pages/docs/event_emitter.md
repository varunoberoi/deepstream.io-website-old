EventEmitter
-----------------------
The deepstream-client uses [component-emitter](https://www.npmjs.com/package/component-emitter) as an event-emitter which in turn implements a subset of the [NodeJS EventEmitter API](https://nodejs.org/api/events.html).

on(event, callback)
-----------------------
argument: event
type: String
optional: false
desc: an eventname

argument: callback
type: Function
optional: false
desc: The function that will be invoked when the event is emitted

Subscribe to an event

once(event, callback)
-----------------------
argument: event
type: String
optional: false
desc: an eventname

argument: callback
type: Function
optional: false
desc: The function that will be invoked when the event is emitted

Register an one-of listener for an event. The listener will be removed immediatly after it has been invoked for the first time.

off(event, callback)
-----------------------
argument: event
type: String
optional: true
desc: an eventname

argument: callback
type: Function
optional: true
desc: The previously registered function

Unsubscribes from an event

* removes a specific callback when called with both arguments
* removes all listeners for an event when only called with an event
* removes all listeners for all events if called without arguments

emit(event, ...)
-----------------------
argument: event
type: String
optional: false
desc: an eventname

argument: arguments
type: Mixed
optional: true
desc: arguments that should be passed to the listeners

Emits an event

listeners( event )
-----------------------
argument: event
type: String
optional: false
desc: an eventname

Returns an array of listeners that are registered for the event

hasListeners( event )
-----------------------
argument: event
type: String
optional: false
desc: an eventname

Returns true if there are listeners registered for that event.

</div>
