{
	"title": "Simple app using KnockoutJs",
	"description": "Learn how to build a simple address manager using deepstream and KnockoutJs"
}
Building a simple app with deepstream and knockout js
=====================================================
[KnockoutJs](http://knockoutjs.com/) works well with deepstream. Its two way bindings, atomic updates and overall speed make it a great fit for realtime applications. So well in fact, that we developed a tool that makes using it even easier.

### KoTools
<table class="mini space">
	<thead>
		<tr>
			<th><i class="fa fa-github"></i>Github</th>
			<th><i class="fa fa-cube"></i>Bower / Npm</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>
				<a href="https://github.com/hoxton-one/deepstream.io-tools-ko">
					https://github.com/hoxton-one/deepstream.io-tools-ko
				</a>
			</td>
			<td><code>deepstream.io-tools-ko</code></td>
		</tr>
	</tbody>
</table>

Knockout has observable properties and observable arrays. Deepstream has observable lists and records with path bindings. Our tool maps the two together.

	// Create a list that's two-way bound to a ko.observableArray
	AppViewModel = function() {
		var userList = ds.record.getList( 'users' );
		this.users = koTools.getViewList(  UserViewModel, userList );
	};

	// Create a record and create two-way bound ko.observables
	UserViewModel = function( userRecordName, viewList ) {
		this.record = ds.record.getRecord( userRecordName );
		this.viewList = viewList;
		this.firstname = koTools.getObservable( this.record, 'firstname' );
		this.lastname = koTools.getObservable( this.record, 'lastname' );
		this.isActive = ko.observable( false );
	};


### Example App
<div class="img-container">
	<img class="tutorial" width="602" height="302" src="../assets/images/simple-app.png" alt="Simple App Screenshot" />
</div>

Please find an example application using deepstream, KnockoutJs and deepstream.io-ko-tools here:

<a class="mega" href="https://github.com/hoxton-one/ds-demo-simple-app-ko"><i class="fa fa-github"></i>Knockout.js example app</a>