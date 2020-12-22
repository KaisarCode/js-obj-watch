# OBJWatch
[js] Watch object data changes.

### Install
```
npm install kc-obj-watch
```

### Use
```js
var obw = require('kc-obj-watch');

// Lets set an object
var obj = {
    a: 1,
    b: 2,
    c: { d: 3 }
};

// Bind it some callbacks to react to changes
obw(obj).bind('handler1', function(k, v){
    console.log(k, v, 'Hello');
});
obw(obj).bind('handler2', function(k, v){
    console.log(k, v, 'Bye');
});
obw(obj).bind('handler3', function(k, v){
    console.log(k, v, 'World');
});

// We can unbind certain callbacks too
obw(obj).unbind('handler2');

// Changing the value of a property
// will trigger the assigned callbacks
obj.b = 4;

// But, if we change a subproperty, nothing happens
// because "d" is not direct children of "obj"
// and has no setters defined to it yet
obj.c.d = 5;

// To watch "obj.c.d"
// we need to bind a callback to "c" aswell
obw(obj.c).bind('handler4', function(k, v){
    console.log(k, v, 'Bye World');
});

// Now, let's change it again
// and voila!
obj.c.d = 6;

```
