// OBJWatch
function OBJWatch(obj) {
    var out = {};
    
    // Hidden property
    var owv = '__KCOBJWATCH__';
    var owp = obj[owv];
    if (typeof owp == 'undefined') {
    Object.defineProperty(obj, owv, {
        enumerable: false,
        writable: false,
        value: { listeners: {} }
    });}
    
    // Listeners
    var cbs = obj[owv].listeners;
    out.bind = function(nm, cb){
    cbs[nm] = cb; };
    out.unbind = function(nm){
    if (typeof cbs[nm] !== 'undefined')
    delete cbs[nm]; };
    
    // Setters
    Object.keys(obj).forEach(function(key){
        var val = obj[key];
        var prop = Object.
        getOwnPropertyDescriptor(obj, key);
        Object.defineProperty(obj, key, {
            get: function(){
                return val;
            },
            set: function(v) {
            if (val !== v) {
                val = v;
                for (var nm in cbs){
                cbs[nm](key, val); }
            }}
        });
    });
    
    // Return
    return out;
}
