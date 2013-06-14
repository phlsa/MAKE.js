var App = new MAKE();

// configure it
App.stateClass = ".state"
App.initialState = ".start"

// bind events to actions
Make( ".button1" ).respondTo( "click" ).withThe( function() {
  Make( App.currentState ).transitionTo( ".screen-2" )
})

// query data of elements
Make( ".toggle" ).respondTo( "click" ).withThe( function() {
  if ( The( ".toggled-screen" ).is( "hidden" ) ) {
    Make( ".toggled-screen" ).appear().withAnimation()
  } else {
    Make( ".toggled-screen" ).disappear().withAnimation()
  }
})

var names = Get().each( "name" ).fromAll( "users" )

When( ".toggled-screen" ).appears( "first-time" ).thenPerform( function() {
  Make( ".help-overlay" ).appear().withAnimation()
})
