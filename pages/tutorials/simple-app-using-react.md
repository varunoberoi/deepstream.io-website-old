{
	"title": "Simple app using React",
	"description": "Learn how to build a simple address manager using deepstream and Facebook's ReactJS"
}
Building a simple app with deepstream and react
=====================================================

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

### Example App

<div class="img-container">
	<img class="tutorial" width="602" height="302" src="../assets/images/simple-app.png" alt="Simple App Screenshot" />
</div>

An example application using [React](https://facebook.github.io/react/) can be found at here:

<a class="mega" href="https://github.com/hoxton-one/ds-demo-simple-app-react"><i class="fa fa-github"></i>https://github.com/hoxton-one/ds-demo-simple-app-react</a>
