<ul id="subnav">
	<li class="head first">General</li>
	<li {{#if fileIs_getting-started}}class="active"{{/if}}>
		<a href="getting-started.html">Getting started</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>
	<li {{#if fileIs_authentication-and-permissioning}}class="active"{{/if}}>
		<a href="authentication-and-permissioning.html">Authentication and Permissioning</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>

	<li class="head">Server</li>
	<li {{#if fileIs_connectors-and-deployment}}class="active"{{/if}}>
		<a href="connectors-and-deployment.html">Connectors and Deployment</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>
	<li {{#if fileIs_forex-price-provider}}class="active"{{/if}}>
		<a href="forex-price-provider.html">Building a Forex price provider</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>
	<li {{#if fileIs_adding-search}}class="active"{{/if}}>
		<a href="adding-search.html">Adding search</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>

	<li class="head">Client</li>
	<li {{#if fileIs_records-events-rpcs}}class="active"{{/if}}>
		<a href="records-events-rpcs.html">Records, Events and RPCs</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>

	<li {{#if fileIs_simple-app-using-ko}}class="active"{{/if}}>
		<a href="simple-app-using-ko.html">Simple App using Knockout</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>

	<li {{#if fileIs_simple-app-using-angular}}class="active"{{/if}}>
		<a href="simple-app-using-angular.html">Simple App using Angular</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>
</ul>