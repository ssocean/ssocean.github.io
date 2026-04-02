(function () {
	var PAGE_CONFIG = {
		publications: {
			url: 'data/publications.json',
			labels: {
				cn: {
					section: 'Publications',
					titleMain: 'Selected',
					titleAccent: 'Research Outputs',
					description: '\u9ed8\u8ba4\u5c55\u793a\u6838\u5fc3\u51fa\u7248\u4fe1\u606f\uff0c\u70b9\u51fb\u9898\u76ee\u53ef\u76f4\u63a5\u5c55\u5f00\u8be6\u60c5\u3002\u9875\u9762\u9ed8\u8ba4\u4e2d\u6587\uff0c\u53ef\u5728\u53f3\u4e0a\u89d2\u5207\u6362\u5230\u82f1\u6587\u3002',
					authors: '作者',
					published: '发表日期',
					venue: '收录于',
					paper: '论文',
					code: '代码'
				},
				eng: {
					section: 'Publications',
					titleMain: 'Selected',
					titleAccent: 'Research Outputs',
					description: 'Compact publication cards with direct bilingual switching. Click a title to reveal the summary, code link, and image.',
					authors: 'Authors',
					published: 'Published',
					venue: 'Venue',
					paper: 'Paper',
					code: 'Code'
				}
			},
			render: function (item, locale, labels) {
				return '' +
					'<article class="publication-card">' +
						'<button class="publication-toggle" type="button" aria-expanded="false">' +
							'<div class="publication-main">' +
								'<h2 class="publication-title">' + escapeHtml(item.title[locale]) + '</h2>' +
								'<div class="publication-meta">' +
									'<div class="meta-block">' +
										'<span class="meta-label">' + labels.authors + '</span>' +
										'<span class="meta-value">' + escapeHtml(item.authors[locale]) + '</span>' +
									'</div>' +
									'<div class="meta-block">' +
										'<span class="meta-label">' + labels.published + '</span>' +
										'<span class="meta-value">' + escapeHtml(item.published[locale]) + '</span>' +
									'</div>' +
									'<div class="meta-block">' +
										'<span class="meta-label">' + labels.venue + '</span>' +
										'<span class="meta-value">' + escapeHtml(item.venue[locale]) + '</span>' +
									'</div>' +
								'</div>' +
							'</div>' +
							'<div>' +
								'<span class="publication-year">' + escapeHtml(item.year) + '</span>' +
								'<span class="publication-chevron" aria-hidden="true"></span>' +
							'</div>' +
						'</button>' +
						'<div class="publication-panel">' +
							'<div class="publication-panel-inner">' +
								'<div class="publication-content">' +
									'<div class="publication-body">' +
										'<p>' + escapeHtml(item.summary[locale]) + '</p>' +
										'<div class="publication-links">' +
											'<a class="publication-link" href="' + escapeAttr(item.paperUrl) + '" target="_blank" rel="noopener noreferrer">' + labels.paper + '</a>' +
											'<a class="publication-link" href="' + escapeAttr(item.codeUrl) + '" target="_blank" rel="noopener noreferrer">' + labels.code + ': github.com</a>' +
										'</div>' +
									'</div>' +
									'<div class="publication-figure">' +
										'<img src="' + escapeAttr(item.image) + '" alt="' + escapeAttr(item.title.eng) + '" />' +
									'</div>' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</article>';
			},
			afterRender: function () {
				if (!window.jQuery) return;
				var $toggles = window.jQuery('.publication-toggle');
				window.jQuery('.publication-panel').hide();
				$toggles.off('click').on('click', function () {
					var $toggle = window.jQuery(this);
					var $card = $toggle.closest('.publication-card');
					var $panel = $toggle.next('.publication-panel');
					var expanded = $toggle.attr('aria-expanded') === 'true';
					if (expanded) {
						$toggle.attr('aria-expanded', 'false');
						$card.removeClass('is-open');
						$panel.hide();
					} else {
						$toggle.attr('aria-expanded', 'true');
						$card.addClass('is-open');
						$panel.show();
					}
				});
			}
		},
		projects: {
			url: 'data/projects.json',
			labels: {
				cn: {
					section: 'Projects',
					titleMain: 'Projects',
					titleAccent: '& Open Repos',
					description: '\u8fd9\u91cc\u4e0d\u518d\u53ea\u653e\u4f20\u7edf\u7814\u7a76\u9879\u76ee\uff0c\u4e5f\u53ef\u4ee5\u653e\u7cfb\u7edf\u3001\u5de5\u5177\u3001\u4ea7\u54c1\u5b9e\u9a8c\u548c\u5f00\u6e90\u4ed3\u5e93\u3002\u9ed8\u8ba4\u4e2d\u6587\u5c55\u793a\uff0c\u53ef\u5728\u53f3\u4e0a\u89d2\u5207\u6362\u8bed\u8a00\u3002',
					repo: '\u4ed3\u5e93'
				},
				eng: {
					section: 'Projects',
					titleMain: 'Projects',
					titleAccent: '& Open Repos',
					description: 'This page is not limited to formal research projects. It can host systems, tools, product experiments, and open repositories as well.',
					repo: 'Repository'
				}
			},
			render: function (item, locale, labels) {
				var chips = item.chips[locale] || [];
				var chipsHtml = '';
				for (var i = 0; i < chips.length; i++) {
					chipsHtml += '<span class="project-chip">' + escapeHtml(chips[i]) + '</span>';
				}
				return '' +
					'<article class="project-card">' +
						'<div class="project-top">' +
							'<span class="project-type">' + escapeHtml(item.type[locale]) + '</span>' +
							'<span class="project-time">' + escapeHtml(item.time[locale]) + '</span>' +
						'</div>' +
						'<h2 class="project-title">' + escapeHtml(item.title[locale]) + '</h2>' +
						'<p class="project-desc">' + escapeHtml(item.description[locale]) + '</p>' +
						'<div class="project-meta">' + chipsHtml + '</div>' +
						'<div class="project-links">' +
							'<a class="project-link" href="' + escapeAttr(item.repoUrl) + '" target="_blank" rel="noopener noreferrer">' + labels.repo + ': github.com</a>' +
						'</div>' +
					'</article>';
			}
		},
		awards: {
			url: 'data/awards.json',
			labels: {
				cn: {
					section: 'Awards & Honors',
					titleMain: 'Heroic',
					titleAccent: 'Milestones',
					description: '\u5956\u9879\u4fe1\u606f\u7edf\u4e00\u6536\u7eb3\u4e3a\u5361\u7247\u5c55\u793a\uff0c\u9ed8\u8ba4\u4e2d\u6587\u663e\u793a\uff0c\u53f3\u4e0a\u89d2\u53ef\u5207\u6362\u82f1\u6587\u3002'
				},
				eng: {
					section: 'Awards & Honors',
					titleMain: 'Heroic',
					titleAccent: 'Milestones',
					description: 'Awards are presented as hero-style cards with a bilingual switch available in the top-right corner.'
				}
			},
			render: function (item, locale) {
				return '' +
					'<article class="award-card">' +
						'<div class="award-top">' +
							'<div class="award-badge">&#10022;</div>' +
							'<div class="award-year">' + escapeHtml(item.year) + '</div>' +
						'</div>' +
						'<div>' +
							'<h2 class="award-title">' + escapeHtml(item.title[locale]) + '</h2>' +
						'</div>' +
						'<div class="award-tier">' + escapeHtml(item.tier[locale]) + '</div>' +
					'</article>';
			},
			afterRender: function () {
				if (!window.jQuery) return;
				var $cards = window.jQuery('.award-card');
				$cards.off('mousemove mouseleave');
				$cards.on('mousemove', function (event) {
					var $card = window.jQuery(this);
					var rect = this.getBoundingClientRect();
					var x = (event.clientX - rect.left) / rect.width;
					var y = (event.clientY - rect.top) / rect.height;
					var rotateY = (x - 0.5) * 10;
					var rotateX = (0.5 - y) * 10;
					$card.css('transform', 'perspective(1200px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-6px)');
				});
				$cards.on('mouseleave', function () {
					window.jQuery(this).css('transform', '');
				});
			}
		}
	};

	function escapeHtml(value) {
		return String(value)
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#39;');
	}

	function escapeAttr(value) {
		return escapeHtml(value);
	}

	function getLocale() {
		return localStorage.getItem('siteLocale') || 'cn';
	}

	function setLocale(locale) {
		localStorage.setItem('siteLocale', locale);
	}

	function updateSwitch(locale) {
		var buttons = document.querySelectorAll('.locale-switch button');
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].classList.toggle('is-active', buttons[i].getAttribute('data-locale') === locale);
		}
	}

	function updateHero(config, locale) {
		var labels = config.labels[locale];
		var section = document.querySelector('[data-i18n="section"]');
		var titleMain = document.querySelector('[data-i18n="title-main"]');
		var titleAccent = document.querySelector('[data-i18n="title-accent"]');
		var description = document.querySelector('[data-i18n="description"]');
		if (section) section.textContent = labels.section;
		if (titleMain) titleMain.textContent = labels.titleMain;
		if (titleAccent) titleAccent.textContent = labels.titleAccent;
		if (description) description.textContent = labels.description;
	}

	function renderPage(config, locale, data) {
		var container = document.querySelector('[data-render-list]');
		if (!container) return;
		var labels = config.labels[locale];
		var html = '';
		for (var i = 0; i < data.items.length; i++) {
			html += config.render(data.items[i], locale, labels);
		}
		container.innerHTML = html;
		updateHero(config, locale);
		updateSwitch(locale);
		if (config.afterRender) config.afterRender();
	}

	function initSwitch(onChange) {
		var buttons = document.querySelectorAll('.locale-switch button');
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', function () {
				var locale = this.getAttribute('data-locale');
				setLocale(locale);
				onChange(locale);
			});
		}
	}

	function init() {
		var page = document.body.getAttribute('data-page');
		if (!page || !PAGE_CONFIG[page]) return;
		var config = PAGE_CONFIG[page];
		fetch(config.url)
			.then(function (response) { return response.json(); })
			.then(function (data) {
				function rerender(locale) {
					renderPage(config, locale, data);
				}
				initSwitch(rerender);
				rerender(getLocale() === 'eng' ? 'eng' : 'cn');
			})
			.catch(function () {
				var container = document.querySelector('[data-render-list]');
				if (container) container.innerHTML = '<p style="padding:24px;">Content failed to load.</p>';
			});
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}
})();
