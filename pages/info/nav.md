<ul id="subnav">
	<li class="head first">Performance</li>
	<li {{#if fileIs_performance-overview}}class="active"{{/if}}>
		<a href="performance-overview.html">Overview</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>	
	<li {{#if fileIs_performance-single-node-vs-cluster}}class="active"{{/if}}>
		<a href="performance-single-node-vs-cluster.html">Single Node vs Cluster</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>

	<li class="head first">Release Notes</li>
	<li {{#if fileIs_server-release-notes}}class="active"{{/if}}>
		<a href="server-release-notes.html">Server</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>	
	<li {{#if fileIs_client-release-notes}}class="active"{{/if}}>
		<a href="client-release-notes.html">Client</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>	
	<li {{#if fileIs_other-release-notes}}class="active"{{/if}}>
		<a href="other-release-notes.html">Other</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>	
</ul>
