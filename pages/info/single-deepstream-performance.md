Single Deepstream
======================================
The goal of this test is to see how many messages deepstream can could process each second and if latency is affected under high traffic

###Test Setup

An amazon c4.large instance was used to run deepstream.
250 client pairs were launched via 2 amazon micro instances with an average messaging rate of 25ms.

<table class="mini">
	<thead>
		<tr>
			<th>Option</th>
			<th>Value</th>
	</thead>
	<tbody>
		<tr>
			<td>deepstream node</td>
			<td>c4.large</td>
		</tr>
		<tr>
			<td>deepstream instances</td>
			<td>1</td>
		</tr>
		<tr>
			<td>client pairs</td>
			<td>250</td>
		</tr>
		<tr>
			<td>message frequency</td>
			<td>25ms</td>
		</tr>
	</tbody>
</table>

###Latency

Average latency ( calculated via nodes in the same data center ) was 2ms

<div class="img-container">
	<img class="tutorial" width="602" height="302" src="../assets/images/performance/one-ds-latency.png" alt="Single deepstream latency" />
</div>

###CPU

CPU reached an average of 80% with approximately 6,000 messages a second

<div class="img-container">
	<img class="tutorial" width="602" height="302" src="../assets/images/performance/one-ds-cpu.png" alt="Single deepstream cpu" />
</div>


</div>