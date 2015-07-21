Performance Overview
============================

Performance tests are a vital part of quality assurance before deploying systems to production.

###It reduces risk by:

* understanding how the system reacts under an expected load 
* ensuring the system can sustain the expected load for long periods of time
* understanding how the system will react when reaching its full capacity
* understanding how the system will react  when put under extreme load for a short period of time

###What type of tests can take these into account?

* load tests
	Make sure that the system works as expected under a set conditions. This covers *CPU* and *message latency* and its output can be used to determine what kind of deployment structure would suit you best. 
* soak tests
	Run tests for a long period of time with slightly higher traffic. This covers *memory* and *message latency* and is used to ensure the system can run in production for long periods of time without reducing performance or crashing.
* stress tests
	Push the system into critical usage of CPU and/or network usage and/or Memory and determine how it reacts.
* spike tests
	Generating large amounts of clients or traffic in a very small amount of time and ensuring that the system does not fail.

###How can you improve results?

deepstream is designed to be a distributed system. This means you can run multiple instances to allow your system to scale horizontally. If you compare the results of [a single deepstream instance](./single-deepstream-performance.html) to [a cluster with three instances](./cluster-deepstream-performance.html) you can see that capacity has scaled accordingly.

###How can we run these scenarios?

deepstream has a [performance test harness](https://github.com/hoxton-one/deepstream.io-performance) that allows users to quickly spin up deepstream servers or client pairs.

Clients are created in pairs to allow them to send messages back and forth on a unique record in order to calculate latency and keep track of updates.
They are responsible of incrementing a count in turn ( even and odd ) until the desired number of messages for the test case is reached.

<a class="mega" href="https://github.com/hoxton-one/deepstream.io-performance"><i class="fa fa-github"></i>https://github.com/hoxton-one/deepstream.io-performance</a>

Using a combination of the following variables you can adjust the test harness to either run very high throughput, high concurrency or long duration tests.   

<table class="mini">
	<thead>
		<tr>
			<th>Enviroment Variable</th>
			<th>Example Value</th>
			<th>Description</th>
	</thead>
	<tbody>
		<tr>
			<td>DEEPSTREAMS</td>
			<td>6021,7021</td>
			<td>The deepstream ports to create or connect to ( via tcp )</td>
		</tr>
		<tr>
			<td>HOST</td>
			<td>localhost</td>
			<td>The deepstream host to connect to</td>
		</tr>
		<tr>
			<td>SERVER_SPAWNING_SPEED</td>
			<td>1000</td>
			<td>The speed to spawn servers ( in ms )</td>
		</tr>
		<tr>
			<td>TEST_TIME</td>
			<td>100000</td>
			<td>The time for server to run ( in ms )</td>
		</tr>
		<tr>
			<td>LOG_LEVEL</td>
			<td>3</td>
			<td>The server log level</td>
		</tr>
		<tr>
			<td>CLIENT_PAIRS</td>
			<td>125</td>
			<td>Amount of client pairs to create</td>
		</tr>
		<tr>
			<td>MESSAGE_FREQUENCY</td>
			<td>25</td>
			<td>How often to send messages ( in ms )</td>
		</tr>		
		<tr>
			<td>MESSAGE_LIMIT</td>
			<td>5000</td>
			<td>Limit of messages per pair</td>
		</tr>	
		<tr>
			<td>CLIENT_SPAWNING_SPEED</td>
			<td>100</td>
			<td>Speed of generating clients ( in ms )</td>
		</tr>		
		<tr>
			<td>LOG_LATENCY</td>
			<td>true</td>
			<td>Print client latency ( requires CALCULATE_LATENCY to be true ) </td>
		</tr>
		<tr>
			<td>CALCULATE_LATENCY</td>
			<td>true</td>
			<td>Store client latency during test</td>
		</tr>
	</tbody>
</table>
 
</div>