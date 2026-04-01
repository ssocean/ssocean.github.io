(function () {
	function loadVisitorMap(img) {
		if (!img || img.dataset.loaded === 'true') return;
		var src = img.getAttribute('data-src');
		if (!src) return;

		img.dataset.loaded = 'true';
		img.setAttribute('src', src);
	}

	function handleImageError(event) {
		var img = event.target;
		if (!img || !img.classList.contains('clustrmaps-image')) return;

		var wrapper = img.closest('.inner');
		if (!wrapper) return;

		img.style.display = 'none';
		if (wrapper.querySelector('.visitor-fallback')) return;

		var note = document.createElement('p');
		note.className = 'visitor-fallback';
		note.textContent = 'Visitor map unavailable in the current network environment.';
		note.style.margin = '0';
		note.style.fontSize = '0.86rem';
		note.style.lineHeight = '1.7';
		note.style.color = 'rgba(255,255,255,0.62)';
		wrapper.appendChild(note);
	}

	function initVisitorMaps() {
		var images = document.querySelectorAll('.clustrmaps-image[data-src]');
		if (!images.length) return;

		for (var i = 0; i < images.length; i++) {
			images[i].addEventListener('error', handleImageError);
		}

		if ('IntersectionObserver' in window) {
			var observer = new IntersectionObserver(function (entries) {
				for (var j = 0; j < entries.length; j++) {
					if (entries[j].isIntersecting) {
						loadVisitorMap(entries[j].target);
						observer.unobserve(entries[j].target);
					}
				}
			}, { rootMargin: '160px 0px' });

			for (var k = 0; k < images.length; k++) {
				observer.observe(images[k]);
			}
			return;
		}

		for (var n = 0; n < images.length; n++) {
			loadVisitorMap(images[n]);
		}
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', initVisitorMaps);
	} else {
		initVisitorMaps();
	}
})();
