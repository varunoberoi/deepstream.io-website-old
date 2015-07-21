Deepstream Cluster
======================================
The goal of this test is to see how well deepstream scales when run against multiple instances

###Test Setup

An amazon c4.2xlarge instance was used to run a cluster of 3 deepstreams. 
Reddis was used as the message bus to allow communication between them.
750 client pairs were launched (via 6 amazon micro instances) with an average messaging rate of 25ms per message.
Each client was randomly assigned a deepstream node to connect to.

<table class="mini">
	<thead>
		<tr>
			<th>Option</th>
			<th>Value</th>
	</thead>
	<tbody>
		<tr>
			<td>deepstream node</td>
			<td>c4.2xlarge</td>
		</tr>
		<tr>
			<td>deepstream instances</td>
			<td>3</td>
		</tr>
		<tr>
			<td>client pairs</td>
			<td>750</td>
		</tr>
		<tr>
			<td>message frequency</td>
			<td>25ms</td>
		</tr>
	</tbody>
</table>

###Latency

Average latency ( calculated via nodes in the same data center ) was 1ms

<div class="img-container">
	<img class="tutorial" width="602" height="302" src="../assets/images/performance/three-ds-latency.png" alt="Cluster deepstream latency" />
</div>

###CPU

CPU reached an average of 70% on all three processes to deal with approximately 20,000 messages a second

<div class="img-container">
	<img class="tutorial" width="602" height="302" src="../assets/images/performance/three-ds-cpu.png" alt="Cluster deepstream cpu" />
</div>
