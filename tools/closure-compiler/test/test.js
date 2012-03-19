function doSomethingElse() {}
(function() {
	return;
	doSomethingElse(); // No Exception but Redundant: Unreachable code
})();