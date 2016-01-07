console.log("Testing PhantomJS...")

function add(a, b) {
    return a + b;
};

console.log("PhantomJS rocks and executes regular JS, see: " + add(1, 2));

phantom.exit();
