console.log("Start testing on my playground!");

var obj1 = {
    'p1': 0,
    'p2': 1,
    'p3': 2
};

var obj2 = {};

obj1.forEach(function(property) {
    obj2[property] = obj1.property;
});
console.log(Object.keys(obj1));
console.log(Object.keys(obj2));
