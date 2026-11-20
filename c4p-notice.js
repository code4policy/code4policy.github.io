/*
 * Code4Policy student project notice.
 * Covers the page with a translucent overlay until the visitor acknowledges
 * that this is a student project, not an official City of Boston website.
 *
 * Usage (one line in each page's <head> or end of <body>):
 *   <script src="https://code4policy.com/c4p-notice.js" data-year="2025" defer></script>
 * Optional: data-name="Food Truck Launch Guide"
 *
 * Acknowledgment lasts for the browser tab session and is stored per project
 * folder, so it shows again on a new visit or for a different project.
 */
(function () {
  var script = document.currentScript;
  var year = (script && script.getAttribute('data-year')) || '';
  var name = (script && script.getAttribute('data-name')) || 'This website';
  // code4policy.com hosts many projects under one domain, so key by first folder there;
  // anywhere else (e.g. a pages.dev site) the whole host is one project.
  var key = 'c4p-notice-ack:' + location.host +
    (/(^|\.)code4policy\.com$|^localhost/.test(location.hostname) ? '/' + location.pathname.split('/')[1] : '');

  try { if (sessionStorage.getItem(key)) return; } catch (e) {}

  function show() {
    if (document.getElementById('c4p-notice')) return;

    var css = document.createElement('style');
    css.textContent =
      '#c4p-notice,#c4p-notice *{box-sizing:border-box!important;font-family:Arial,Helvetica,sans-serif!important;text-transform:none!important;letter-spacing:normal!important;text-shadow:none!important;float:none!important;position:static;width:auto;max-width:none;height:auto;min-height:0;border:0;background:none;margin:0;padding:0;text-align:left!important;text-decoration:none;}' +
      '#c4p-notice h2::before,#c4p-notice h2::after,#c4p-notice p::before,#c4p-notice p::after{content:none!important;display:none!important;}' +
      '#c4p-notice{position:fixed!important;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;padding:20px;' +
      'background:rgba(15,23,42,.55);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);font-family:Arial,Helvetica,sans-serif;}' +
      '#c4p-notice .c4p-card{max-width:560px!important;width:100%!important;background:rgba(255,255,255,.96)!important;color:#1e293b!important;' +
      'border-radius:12px!important;border-top:8px solid #b45309!important;padding:28px 28px 24px!important;box-shadow:0 20px 50px rgba(0,0,0,.35);text-align:left;}' +
      '#c4p-notice .c4p-kicker{margin:0 0 6px!important;font-size:13px!important;font-weight:700!important;letter-spacing:.08em!important;text-transform:uppercase!important;color:#b45309!important;}' +
      '#c4p-notice h2{margin:0 0 14px!important;font-size:24px!important;line-height:1.25!important;color:#0f172a!important;font-weight:700!important;border:0!important;background:none!important;}' +
      '#c4p-notice p{margin:0 0 12px!important;font-size:16px!important;line-height:1.55!important;color:#1e293b!important;}' +
      '#c4p-notice a{color:#92400e!important;text-decoration:underline!important;}' +
      '#c4p-notice button{display:block!important;margin-top:10px!important;width:100%!important;padding:14px 18px!important;border:0!important;border-radius:8px!important;background:#0f172a!important;color:#fff!important;text-align:center!important;' +
      'font-size:16px!important;font-weight:700!important;cursor:pointer;line-height:1.3!important;}' +
      '#c4p-notice button:hover,#c4p-notice button:focus-visible{background:#b45309!important;outline:3px solid #fcd34d!important;outline-offset:2px!important;}';
    document.head.appendChild(css);

    var made = 'It was made by Harvard Kennedy School students in the Code4Policy course' +
      (year ? ' in January ' + year : '') + '.';

    var wrap = document.createElement('div');
    wrap.id = 'c4p-notice';
    wrap.setAttribute('role', 'dialog');
    wrap.setAttribute('aria-modal', 'true');
    wrap.setAttribute('aria-labelledby', 'c4p-notice-title');
    wrap.innerHTML =
      '<div class="c4p-card">' +
        '<p class="c4p-kicker">Student project</p>' +
        '<h2 id="c4p-notice-title">This is not an official City of Boston website</h2>' +
        '<p>' + name.replace(/[<>&"]/g, '') + ' is a class project. ' + made + '</p>' +
        '<p>It is not run or maintained by the City of Boston, and some information may be out of date. ' +
        'For official information, go to <a href="https://www.boston.gov">boston.gov</a>.</p>' +
        '<button type="button">I understand this is a student project</button>' +
      '</div>';

    var prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.appendChild(wrap);

    var btn = wrap.querySelector('button');
    btn.focus();

    function trapFocus(e) {
      if (e.key !== 'Tab') return;
      var f = wrap.querySelectorAll('a,button');
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    wrap.addEventListener('keydown', trapFocus);

    btn.addEventListener('click', function () {
      try { sessionStorage.setItem(key, '1'); } catch (e) {}
      wrap.remove();
      css.remove();
      document.documentElement.style.overflow = prevOverflow;
    });
  }

  if (document.body) show();
  else document.addEventListener('DOMContentLoaded', show);
})();
