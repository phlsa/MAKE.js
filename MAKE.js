var MAKE = {

  // we need the jQuery Object
  $: $,

  // base object that can get passed along
  Base: function() {
    var self = this
    this.selector = ""
    this.element = function() {
      return MAKE.$( self.selector )
    }
    this.events = ""

    // this stuff needs to be done at the end of the chain
    this.finalActions = []
    _.defer( function() {
      _.each( self.finalActions, function( item ) {
        item()
      })
    })

    // animation-related things
    this.animation = {
      enabled: false,
      fromClasses: [],
      toClasses: []
    }
    this.addAnimationPropertiesTo = function( elem ) {
      MAKE.$( elem ).css({
        '-webkit-transition': 'all 0.5s ease',
        '-moz-transition': 'all 0.5s ease',
        '-ms-transition': 'all 0.5s ease',
        '-o-transition': 'all 0.5s ease',
        'transition': 'all 0.5s ease',
      })
    }
    this.removeAnimationPropertiesFrom = function( elem ) {
      MAKE.$( elem ).css({
        '-webkit-transition': 'none',
        '-moz-transition': 'none',
        '-ms-transition': 'none',
        '-o-transition': 'none',
        'transition': 'none',
      })
    }
    this.animateProperties = function( from, to ) {
      self.element().css( from )
      self.addAnimationPropertiesTo( self.element() )
      _.defer( function() {
        self.element().css( to )
        _.delay( function() {
          self.removeAnimationPropertiesFrom( self.element() )
        }, 500)
      })
    }

    this.animateClasses = function() {
      _.each( self.animation.fromClasses, function( item ) {
        self.element().addClass( item )
      })

      self.addAnimationPropertiesTo( self.element() )
      _.defer( function() {
        _.each( self.animation.toClasses, function( item ) {
          self.element().addClass( item )
        })
      })
    }

    // user-facing actions
    this.respondTo = function( events ) {
      self.events = self.events + " " + events
      return self
    }
    this.is = this.respondTo

    this.withThe = function( action ) {
      self.element().on( self.events, action )
      return self
    }
    this.perform = this.withThe

    this.appear = function() {
      self.finalActions.push( function() {
        self.element().show()
        if ( self.animation.enabled ) {
          self.animateProperties({ 'opacity':0 }, { 'opacity':1 })
        }
      })
      return self
    }

    this.withAnimation = function() {
      self.animation.enabled = true
      return self
    }
    this.animate = this.withAnimation

    this.to = function( selector ) {
      self.animation.toClasses.push( selector )
      self.finalActions.push( function() {
        if ( self.animation.enabled ) {
          self.animateClasses()
        } else {
          self.element().addClass( selector )
        }
      })
      return self
    }
  },

  init: function( selector ) {
    var base = new MAKE.Base()
    base.selector = selector
    return base
  }
}

// Globals
Make = MAKE.init
MakeThe = Make.init
The = MAKE.init
WhenThe = MAKE.init

