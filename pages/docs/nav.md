<ul id="subnav">
	<li class="head first">Server</li>
	<li {{#if fileIs_Deepstream}}class="active"{{/if}}>
		<a href="deepstream.html">Deepstream</a>
		<div class="isActiveIndicator orangeGradient"></div>
		{{#if fileIs_Deepstream}}
			<ul class="overview">
				{{#each subNav}}
				<li><a href="#{{this}}">{{this}}</a></li>
				{{/each}}
			</ul>
		{{/if}}
	</li>
	<li {{#if fileIs_constants}}class="active"{{/if}}>
		<a href="constants.html">Constants</a>
		<div class="isActiveIndicator orangeGradient"></div>
		{{#if fileIs_constants}}
			<ul class="overview">
				{{#each subNav}}
				<li><a href="#{{this}}">{{this}}</a></li>
				{{/each}}
			</ul>
		{{/if}}
	</li>


	<li class="head">JS Client</li>
	<li {{#if fileIs_Client}}class="active"{{/if}}>
		<a href="Client.html">Client</a>
		<div class="isActiveIndicator orangeGradient"></div>
		{{#if fileIs_Client}}
			<ul class="overview">
				{{#each subNav}}
				<li><a href="#{{this}}">{{this}}</a></li>
				{{/each}}
			</ul>
		{{/if}}
	</li>

	<li {{#if fileIs_client_options}}class="active"{{/if}}>
		<a href="client_options.html">options</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>

	<li {{#if fileIs_connection_states}}class="active"{{/if}}>
		<a href="connection_states.html">connectionStates</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>

	<li {{#if fileIs_client_errors}}class="active"{{/if}}>
		<a href="client_errors.html">errors</a>
		<div class="isActiveIndicator orangeGradient"></div>
	</li>

	<li {{#if fileIs_event_emitter}}class="active"{{/if}}>
		<a href="event_emitter.html">EventEmitter</a>
		<div class="isActiveIndicator orangeGradient"></div>
		{{#if fileIs_event_emitter}}
			<ul class="overview">
				{{#each subNav}}
				<li><a href="#{{this}}">{{this}}</a></li>
				{{/each}}
			</ul>
		{{/if}}
	</li>

	<li class="de-emphasized">Record</li>
	<li {{#if fileIs_client_record}}class="active"{{/if}}>
		<a href="client.record.html">client.record</a>
		<div class="isActiveIndicator orangeGradient"></div>
		{{#if fileIs_client_record}}
			<ul class="overview">
				{{#each subNav}}
				<li><a href="#{{this}}">{{this}}</a></li>
				{{/each}}
			</ul>
		{{/if}}
	</li>

	<li {{#if fileIs_record}}class="active"{{/if}}>
		<a href="record.html">Record</a>
		<div class="isActiveIndicator orangeGradient"></div>
		{{#if fileIs_record}}
			<ul class="overview">
				{{#each subNav}}
				<li><a href="#{{this}}">{{this}}</a></li>
				{{/each}}
			</ul>
		{{/if}}
	</li>

	<li {{#if fileIs_list}}class="active"{{/if}}>
		<a href="list.html">List</a>
		<div class="isActiveIndicator orangeGradient"></div>
		{{#if fileIs_list}}
			<ul class="overview">
				{{#each subNav}}
				<li><a href="#{{this}}">{{this}}</a></li>
				{{/each}}
			</ul>
		{{/if}}
	</li>

	<li {{#if fileIs_anonymous_record}}class="active"{{/if}}>
		<a href="anonymous_record.html">Anonymous Record</a>
		<div class="isActiveIndicator orangeGradient"></div>
		{{#if fileIs_anonymous_record}}
			<ul class="overview">
				{{#each subNav}}
				<li><a href="#{{this}}">{{this}}</a></li>
				{{/each}}
			</ul>
		{{/if}}
	</li>

	<li class="de-emphasized">RPC</li>
	<li {{#if fileIs_client_rpc}}class="active"{{/if}}>
		<a href="client.rpc.html">client.rpc</a>
		<div class="isActiveIndicator orangeGradient"></div>
		{{#if fileIs_client_rpc}}
			<ul class="overview">
				{{#each subNav}}
				<li><a href="#{{this}}">{{this}}</a></li>
				{{/each}}
			</ul>
		{{/if}}
	</li>

	<li {{#if fileIs_rpc_response}}class="active"{{/if}}>
		<a href="rpc_response.html">RpcResponse</a>
		<div class="isActiveIndicator orangeGradient"></div>
		{{#if fileIs_rpc_response}}
			<ul class="overview">
				{{#each subNav}}
				<li><a href="#{{this}}">{{this}}</a></li>
				{{/each}}
			</ul>
		{{/if}}
	</li>

	<li class="de-emphasized">Event</li>
	<li {{#if fileIs_client_event}}class="active"{{/if}}>
		<a href="client.event.html">client.event</a>
		<div class="isActiveIndicator orangeGradient"></div>
		{{#if fileIs_client_event}}
			<ul class="overview">
				{{#each subNav}}
				<li><a href="#{{this}}">{{this}}</a></li>
				{{/each}}
			</ul>
		{{/if}}
	</li>
</ul>
