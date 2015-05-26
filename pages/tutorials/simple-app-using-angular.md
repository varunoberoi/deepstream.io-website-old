An example application using [angularjs](https://angularjs.org/) can be found at [demo-ng](https://github.com/hoxton-one/ds-demo-simple-app-ng).

deepstream can be created as a service to allow it to login before the controller
is created.

For example:

	angular.service( 'deepstream', function() {
		var client = deepstream( 'localhost:6020' )
		client.login({ username: 'ds-simple-input-' + client.getUid() });
		return client;
	})

Angulars powerful inline html bindings allow you to directly read data from your deepstream record.

For example:

	<span ng-bind="user.get('firstname')"></span>

Or if using ***Object.defineProperty()*** you can use define a property on
the controller to allow two way mappings with a field within your record.

For example:

	this.firstname = getField( this, 'firstname' );
	function getField( record, name ) {
		var self = this;
		Object.defineProperty( self, name, {
			get: function() {
				return self.record.get( name );
			},
			set: function( newValue ) {
				if( newValue === undefined ) {
					return;
				}
				self.record.set( name, newValue );
			}
		} );
		record.subscribe( name, function() {
			if( !$scope.$$phase ) {
				$scope.$apply();
			}
		} );
	}

<div class="info">
		Since subscribe callbacks are called as soon as the record is updated (to maximize performance)
		angular may already be in a digest cycle. If this case occurs the recommended solution is to use $timeout or to avoid triggering a new digest cycle if one is already in progress.
</div>
