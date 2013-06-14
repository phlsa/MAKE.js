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
      fromProperties: [],
      toProperties: [],
      duration: 500
    }
    this.addAnimationPropertiesTo = function( elem ) {
      MAKE.$( elem ).css({
        '-webkit-transition': 'all '+ (self.animation.duration/1000.0) +'s ease',
        '-moz-transition': 'all '+ (self.animation.duration/1000.0) +'s ease',
        '-ms-transition': 'all '+ (self.animation.duration/1000.0) +'s ease',
        '-o-transition': 'all '+ (self.animation.duration/1000.0) +'s ease',
        'transition': 'all '+ (self.animation.duration/1000.0) +'s ease',
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

    this.animateProperties = function() {
      _.each( self.animation.fromProperties, function( item ) {
        MAKE.helper.addProperties( self.element(), item )
      })

      self.addAnimationPropertiesTo( self.element() )
      _.defer( function() {
        _.each( self.animation.toProperties, function( item ) {
          MAKE.helper.addProperties( self.element(), item )
        })
      })
    }

    // user-facing actions
    this.respondTo = function( events ) {
      self.events = self.events + " " + events
      return self
    }
    this.is = this.respondTo
    this.becomes = this.respondTo
    this.does = this.respondTo
    this.did = this.respondTo

    this.withThe = function( action ) {
      self.element().on( self.events, action )
      return self
    }
    this.perform = this.withThe
    this.with = this.withThe

    this.appear = function() {
      self.finalActions.push( function() {
        self.element().show()
        if ( self.animation.enabled ) {
          self.animation.fromProperties.push({ 'opacity': 0 })
          self.animation.toProperties.push({ 'opacity': 1 })
          self.animateProperties()
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
      // can take either a string (class) or an object (css properties)
      self.animation.toProperties.push( selector )

      self.finalActions.push( function() {
        if ( self.animation.enabled ) {
          self.animateProperties()
        } else {
          MAKE.helper.addProperties( self.element(), selector )
        }
      })
      return self
    }

    this.andThen = function( action ) {
      self.finalActions.push( function() {
        if ( self.animation.enabled ) {
          _.delay( action, self.animation.duration )
        } else {
          action()
        }
      })
      return self
    }
  },

  init: function( selector ) {
    var base = new MAKE.Base()
    base.selector = selector
    return base
  },

  helper: {
    addProperties: function( elem, selector ) {
      if ( typeof selector === 'string' ) {
        elem.addClass( selector )
      } else if ( typeof selector === 'object' ) {
        elem.css( selector )
      }
    }
  }
}

// Globals
Make = MAKE.init
MakeThe = Make.init
The = MAKE.init
WhenThe = MAKE.init

