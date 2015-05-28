An example application using [React](https://facebook.github.io/react/) can be found at [demo-react](https://github.com/hoxton-one/ds-demo-simple-app-react).

Integration with react is done within the ***componentDidMount*** and
***componentWillUnmount*** methods.

Example:

	componentDidMount: function() {
		this.record = ds.record.getRecord( this.props.recordName );
		this.record.subscribe( function( data ) {
			this.setState( data );
		}.bind( this ));
	}

This allows it to subscribe to a subject and call ***setState*** whenever an
update is received.

	componentWillUnmount: function() {
		this.record.discard();
	}

This allows the subscription to be terminated to avoid any memory leaks after
the object is no longer in the dom.
