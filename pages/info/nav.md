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

	<li class="head">Protocol</li>
	
	<li {{#activeSpecPage 'writing-a-client'}}class="active"{{/activeSpecPage}}>
		<a href="{{link 'page' 'info/messagestructure/writing-a-client.html'}}">Writing a Client</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>

	<li {{#activeSpecPage 'index'}}class="active"{{/activeSpecPage}}>
		<a href="{{link 'page' 'info/messagestructure/index.html'}}">Message Structure</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>

	<li {{#activeSpecPage 'spec'}}class="active"{{/activeSpecPage}}>
		<a href="{{link 'page' 'info/messagestructure/specs.html'}}">All Messages</a>
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

	<li class="head">Client Specs</li>
	{{#each messageSpecs.features}}	
		<li {{#activeSpecPage @key}}class="active"{{/activeSpecPage}}>
			{{#with @key}}
			<a href="{{link 'page' 'info/messagestructure/{{this}}.html'}}">
			{{/with}}
			{{capitalizeFirstLetter @key}}</a>
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
