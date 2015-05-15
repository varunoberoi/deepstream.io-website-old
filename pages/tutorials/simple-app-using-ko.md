


[knockout.js](http://knockoutjs.com/) goes incredibly well with deepstream. Its two way bindings, atomic updates and overall speed make it a great fit for realtime applications. So well in fact, that we developed a tool (bower/npm deepstream.io-tools-ko), that makes using it even easier.

Knockout has observable properties and observable arrays. Deepstream has observable lists and records with path bindings. Our tool maps the two together.

	var koTools = 
	.getObservable = function( record, path ) {
	return getObservable( this.ko, record, path );
};

KoTools.prototype.getViewList = function( viewmodel, list ) {
	return new ViewList( this.ko, viewmodel, list );
};



