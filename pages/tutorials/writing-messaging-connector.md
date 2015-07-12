Writing a message connector
=====================================
Deepstream nodes can work together in clusters – which requires them to communicate with each other. This can happen directly [via TCP]() or  through a messaging system, e.g. an AMQP broker, Apache Kafka or Redis’ pub sub mechanism.
Messaging is based on a publish-subscribe pattern. Any node can broadcast a message to a topic that zero or more subscribers listen to.

<div class="hint-box fa fa-gears">
	<p>Before writing your own message connector, have a quick look at the <a href="../download/">download section</a>. Maybe there already is an off-the-shelf one you can just pick up and use. <em>If you're happy with how you're connector turned out, please consider contributing it. To do so, just <a href="https://github.com/hoxton-one/deepstream.io/issues">raise an issue against deepstream.io</a></em></p></div>

To write a message connector, just clone or fork the message-connector-template below and fill in the blanks. To see if it works, update the <a href="https://github.com/hoxton-one/deepstream.io-msg-connector-template/blob/master/test/connection-data.js">connection data file</a> and run the tests with `npm test`. Please note: The tests are fairly high level and only test the basic functionality. It might make sense to add additional tests that are specific for your connector.

<a class="mega" href="https://github.com/hoxton-one/deepstream.io-msg-connector-template"><i class="fa fa-github"></i>fork or copy the msg-connector-template</a>

Some things worth taking into account when building a new message connector
---------------------------------------

- Deepstream only uses four topics (RECORD, RPC, EVENT plus a private topic),
  but will send and receive large numbers of messages on each of them. If this leads to performance problems
  it might make sense for the message connector to do some custom sub-routing, e.g. based on record namespaces etc.

- Messages are passed to the `publish()` method as javascript objects and are expected to be returned
  by the receiver as such. So its up to the message connector to serialize and deserialize them, e.g. as JSON or MsgPack

- The message connector acts as both publisher and subscriber for each topic. It should however not receive its
  own messages. Some messaging middleware supports this, but for others it might be necessary to add an unique
  sender-id to outgoing messages and filter out incoming messages that have the same id

- Messaging is the backbone of deepstream's scaling / clustering capabilites. So this needs to be reliable... and fast!

</div>
