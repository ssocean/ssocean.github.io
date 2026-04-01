(function () {
	var body = document.body;
	if (!body || !body.classList.contains('homepage-redesign')) return;

	var revealTargets = document.querySelectorAll('.reveal-on-load');
	var heroPanel = document.querySelector('.hero-panel');

	function revealAll() {
		body.classList.add('is-ready');
		for (var i = 0; i < revealTargets.length; i++) {
			revealTargets[i].classList.add('is-visible');
		}
	}

	if ('IntersectionObserver' in window) {
		var observer = new IntersectionObserver(function (entries) {
			for (var i = 0; i < entries.length; i++) {
				if (entries[i].isIntersecting) {
					entries[i].target.classList.add('is-visible');
					observer.unobserve(entries[i].target);
				}
			}
		}, { threshold: 0.2 });

		for (var j = 0; j < revealTargets.length; j++) {
			observer.observe(revealTargets[j]);
		}
	}

	window.setTimeout(revealAll, 80);

	if (!heroPanel) return;

	heroPanel.addEventListener('mousemove', function (event) {
		var rect = heroPanel.getBoundingClientRect();
		var offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
		var offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
		heroPanel.style.setProperty('--mouse-x', offsetX.toFixed(2) + 'px');
		heroPanel.style.setProperty('--mouse-y', offsetY.toFixed(2) + 'px');
	});

	heroPanel.addEventListener('mouseleave', function () {
		heroPanel.style.setProperty('--mouse-x', '0px');
		heroPanel.style.setProperty('--mouse-y', '0px');
	});
})();
