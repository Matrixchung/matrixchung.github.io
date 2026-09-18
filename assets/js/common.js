// aHR0cHM6Ly9naXRodWIuY29tL2x1b3N0MjYvYWNhZGVtaWMtaG9tZXBhZ2U=
$(function () {
    lazyLoadOptions = {
        scrollDirection: 'vertical',
        effect: 'fadeIn',
        effectTime: 300,
        placeholder: "",
        onError: function(element) {
            console.log('[lazyload] Error loading ' + element.data('src'));
        },
        afterLoad: function(element) {
            if (element.is('img')) {
                // remove background-image style
                element.css('background-image', 'none');
                element.css('min-height', '0');
            } else if (element.is('div')) {
                // set the style to background-size: cover; 
                element.css('background-size', 'cover');
                element.css('background-position', 'center');
            }
        }
    }

    $('img.lazy, div.lazy:not(.always-load)').Lazy({visibleOnly: true, ...lazyLoadOptions});
    $('div.lazy.always-load').Lazy({visibleOnly: false, ...lazyLoadOptions});

    $('[data-toggle="tooltip"]').tooltip()

});

// Show a larger cover beside the pointer without changing the publication layout.
(function () {
    var covers = document.querySelectorAll('.publication-cover');
    if (!covers.length) return;

    var hoverDevice = window.matchMedia('(hover: hover) and (pointer: fine)');
    var preview = document.createElement('img');
    preview.className = 'publication-cover-preview';
    preview.alt = '';
    preview.setAttribute('aria-hidden', 'true');
    preview.hidden = true;
    document.body.appendChild(preview);

    var activeCover = null;
    var pointerX = 0;
    var pointerY = 0;

    function positionPreview() {
        var bounds = preview.getBoundingClientRect();
        var left = pointerX + 20;
        if (left + bounds.width > window.innerWidth - 8) {
            left = pointerX - bounds.width - 20;
        }
        preview.style.left = Math.max(8, Math.min(left, window.innerWidth - bounds.width - 8)) + 'px';
        preview.style.top = Math.max(8, Math.min(pointerY - bounds.height / 2, window.innerHeight - bounds.height - 8)) + 'px';
    }

    function showPreview() {
        if (!activeCover || !hoverDevice.matches || !preview.naturalWidth) return;
        preview.hidden = false;
        positionPreview();
    }

    function hidePreview() {
        activeCover = null;
        preview.hidden = true;
    }

    preview.addEventListener('load', showPreview);
    preview.addEventListener('error', hidePreview);
    covers.forEach(function (cover) {
        cover.addEventListener('mouseenter', function (event) {
            if (!hoverDevice.matches) return;
            activeCover = cover;
            pointerX = event.clientX;
            pointerY = event.clientY;
            preview.hidden = true;
            // data-src points to the real image even before lazy loading finishes.
            preview.src = cover.getAttribute('data-src') || cover.currentSrc || cover.src;
            if (preview.complete) showPreview();
        });
        cover.addEventListener('mousemove', function (event) {
            pointerX = event.clientX;
            pointerY = event.clientY;
            if (!preview.hidden) positionPreview();
        });
        cover.addEventListener('mouseleave', hidePreview);
    });

    window.addEventListener('scroll', hidePreview, { passive: true, capture: true });
    window.addEventListener('resize', hidePreview);
    window.addEventListener('blur', hidePreview);
})();
