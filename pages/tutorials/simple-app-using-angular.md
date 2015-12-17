{
	"title": "Simple app using AngularJS",
	"description": "Learn how to build a simple address manager using deepstream and AngularJS"
}
Building a simple app with deepstream and angular
=====================================================

Angulars services and powerful inline html bindings allows you to integrate easily
with deepstream.

To conenct to deepstream you can connect initialise it within a service:

	angular.service( 'deepstream', function() {
		var client = deepstream( 'localhost:6020' )
		client.login({ username: 'ds-simple-input-' + client.getUid() });
		return client;
	})

One way bindings on record data can be done purely via html:

	<span ng-bind="user.get('firstname')"></span>

Or if doing two way bindings you can use ***Object.defineProperty()*** to allow
value changes on the scope to directly update the associated record.

	service( 'bindFields', function(){
		return function getField( $scope, record, names ) {
			angular.forEach( names, function( name ){
				Object.defineProperty( $scope, name, {
					get: function() {
						return record.get( name );
					},
					set: function( newValue ) {
						if( newValue === undefined ) {
							return;
						}
						record.set( name, newValue );
					}
				});
			});

			record.subscribe(function() {
				if( !$scope.$$phase ) {
					$scope.$apply();
				}
			});
		};
	})

<div class="hint-box fa fa-gears">
	<p>		Since subscribe callbacks are called as soon as the record is updated (to maximize performance)
			angular may already be in a digest cycle. If this case occurs the recommended solution is to use $timeout or to avoid triggering a new digest cycle if one is already in progress.</p>
</div>

### Example App
<div class="img-container">
	<img class="tutorial" width="602" height="302" src="../assets/images/simple-app.png" alt="Simple App Screenshot" />
</div>

Please find an example application using deepstream and angular here:

<a class="mega" href="https://github.com/hoxton-one/ds-demo-simple-app-ng"><i class="fa fa-github"></i>https://github.com/hoxton-one/ds-demo-simple-app-ng</a>
