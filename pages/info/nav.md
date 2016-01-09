<ul id="subnav">
	<li class="head first">Performance</li>
	<li {{#if fileIs_performance-overview}}class="active"{{/if}}>
		<a href="{{link 'page' 'info/performance-overview.html'}}">Overview</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>	
	<li {{#if fileIs_performance-single-node-vs-cluster}}class="active"{{/if}}>
		<a href="{{link 'page' 'info/performance-single-node-vs-cluster.html'}}">Single Node vs Cluster</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>

	<li class="head first">Message Specification</li>
	<li {{#if fileIs_messagestructure}}class="active"{{/if}}>
		<a href="{{link 'page' 'info/messagestructure/index.html'}}">Overview</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>	
	
	{{#each messageSpecs.features}}	
		<li {{#activeSpecPage @key}}class="active"{{/activeSpecPage}}>
			{{#with @key}}
			<a href="{{link 'page' 'info/messagestructure/{{this}}.html'}}">
			{{/with}}
			{{capitalizeFirstLetter @key}} Features</a>
			<div class="isActiveIndicator orangeGradient"></div>
			{{#activeSpecPage @key}}
				<ul class="overview">
					{{#each ../subNav}}
					<li><a href="#{{this}}">{{this}}</a></li>
					{{/each}}
				</ul>
			{{/activeSpecPage}}
		</li>
	{{/each}}
	
	<li {{#activeSpecPage 'spec'}}class="active"{{/activeSpecPage}}>
		<a href="{{link 'page' 'info/messagestructure/specs.html'}}">Detailed Specs</a>
		<div class="isActiveIndicator orangeGradient"></div>
		{{#activeSpecPage 'spec'}}
			<ul class="overview">
				{{#each messageSpecs.specs}}
					<li class="de-emphasized">{{@key}}</li>
					{{#each structures}}
						<li><a href="#{{id}}">{{action}}</a></li>
					{{/each}}
				{{/each}}
			</ul>
		{{/activeSpecPage}}
	</li>

{{!--
	<li class="head first">Release Notes</li>
	<li {{#if fileIs_server-release-notes}}class="active"{{/if}}>
		<a href="{{link 'page' 'info/server-release-notes.html'}}">Server</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>	
	<li {{#if fileIs_client-release-notes}}class="active"{{/if}}>
		<a href="{{link 'page' 'info/client-release-notes.html'}}">Client</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>	
	<li {{#if fileIs_other-release-notes}}class="active"{{/if}}>
		<a href="{{link 'page' 'info/other-release-notes.html'}}">Other</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>	--}}
</ul>
