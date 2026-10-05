(function () {
  'use strict';
  var BASIS = 'https://www.zahnaerzte-edenkoben.de/';   // Canonical, vor Livegang prüfen
  var MATOMO_URL = '';      // z. B. 'https://matomo.ao-consult.de/' (mit Schrägstrich am Ende). Leer = kein Tracking.
  var MATOMO_SITE_ID = '';
  var EMAIL = 'info@zahnaerzte-edenkoben.de';

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function bild(name, alt) {
    return '<picture><source srcset="img/' + name + '.webp" type="image/webp"><img src="img/' + name + '.jpg" alt="' + esc(alt) + '" width="1800" height="1200" loading="lazy" decoding="async"></picture>';
  }

  /* ---------- Praxiseinblicke ---------- */
  var EINBLICKE = [
    ['zahnaerztin-edenkoben-beratung-tablet', 'Dr. Charlotte Zimmermann bespricht mit einer Patientin ein Röntgenbild auf dem Tablet'],
    ['prophylaxe-edenkoben-zahnreinigung', 'Prophylaxe-Mitarbeiterin bei der professionellen Zahnreinigung'],
    ['zfa-edenkoben-instrumentenschrank', 'Mitarbeiterin entnimmt ein Instrumententablett aus dem Schrank'],
    ['praxisteam-edenkoben-jubel', 'Das Praxisteam jubelt gemeinsam im Behandlungszimmer'],
    ['zahnarzt-edenkoben-intraoralscanner', 'Dr. Christian Zimmermann scannt die Zähne einer Patientin mit dem Intraoralscanner'],
    ['zfa-edenkoben-behandlungsvorbereitung', 'Mitarbeiterin bereitet den Behandlungsplatz vor'],
    ['zahnarztpraxis-edenkoben-digitales-roentgen', 'Mitarbeiterin positioniert eine Patientin am digitalen Röntgengerät'],
    ['zahnaerztin-edenkoben-behandlung', 'Dr. Charlotte Zimmermann behandelt eine Patientin'],
    ['praxisverwaltung-edenkoben-rezeption', 'Zwei Mitarbeiterinnen an der Rezeption der Praxis'],
    ['zahnaerztin-edenkoben-patientin-behandlung', 'Zahnärztin bei der Behandlung einer liegenden Patientin'],
    ['praxisteam-zahnaerzte-edenkoben-gruppe', 'Das gesamte Team der Gemeinschaftspraxis Dres. Zimmermann']
  ];
  function zeichneEinblicke() {
    var s = $('#schiene'); if (!s) return;
    s.innerHTML = EINBLICKE.map(function (b) { return bild(b[0], b[1]); }).join('');
    $$('.pfeil').forEach(function (p) {
      p.addEventListener('click', function () {
        var breite = s.firstElementChild ? s.firstElementChild.getBoundingClientRect().width + 14 : 300;
        s.scrollBy({ left: breite * (+p.getAttribute('data-richtung')) * 2, behavior: 'smooth' });
      });
    });
    s.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); var b = s.firstElementChild.getBoundingClientRect().width + 14; s.scrollBy({ left: e.key === 'ArrowRight' ? b : -b, behavior: 'smooth' }); }
    });
  }

  /* ---------- Formular (Entwurf: übergibt an das E-Mail-Programm) ---------- */
  function bindeFormular() {
    var f = $('#kontaktformular'); if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      $$('.feld', f).forEach(function (feld) {
        var inp = $('input,textarea', feld); if (!inp || !inp.required) return;
        var gut = inp.value.trim().length > 1 && (inp.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value));
        feld.classList.toggle('hat-fehler', !gut); inp.setAttribute('aria-invalid', gut ? 'false' : 'true');
        if (!gut) ok = false;
      });
      var z = $('#f-zustimmung'), zf = $('#f-zustimmung-fehler');
      zf.style.display = z.checked ? 'none' : 'block';
      if (!z.checked) ok = false;
      if (!ok) { (($('.hat-fehler input, .hat-fehler textarea', f)) || z).focus(); return; }
      var body = 'Anfrage über die Webseite\n\nName: ' + $('#f-vorname').value.trim() + ' ' + $('#f-nachname').value.trim() + '\nE-Mail: ' + $('#f-email').value.trim() + '\nTelefon: ' + $('#f-telefon').value.trim() + '\n\nNachricht:\n' + $('#f-nachricht').value.trim() + '\n\nZustimmung zur Datenschutzerklärung erteilt.';
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Anfrage über die Webseite') + '&body=' + encodeURIComponent(body);
      $('#danke').setAttribute('data-an', 'true');
      spur('Kontakt', 'Formular abgesendet', 'Startseite');
    });
  }

  /* ---------- Strukturierte Daten ---------- */
  function setzeSchema(id, obj) {
    var alt = document.getElementById(id); if (alt) alt.remove();
    if (!obj) return;
    var sc = document.createElement('script'); sc.type = 'application/ld+json'; sc.id = id; sc.textContent = JSON.stringify(obj); document.head.appendChild(sc);
  }
  function schemaStart() {
    setzeSchema('ld-org', {
      '@context': 'https://schema.org', '@type': 'Dentist', '@id': BASIS + '#praxis',
      'name': 'Gemeinschaftspraxis Dres. Zimmermann', 'alternateName': 'Zahnärzte Edenkoben Dres. Zimmermann',
      'url': BASIS, 'image': BASIS + 'img/zahnaerzte-edenkoben-praxisteam-dres-zimmermann.jpg', 'logo': BASIS + 'img/zimmermann-logo.png',
      'telephone': '+49 6323 93434', 'faxNumber': '+49 6323 93435', 'email': EMAIL,
      'address': { '@type': 'PostalAddress', 'streetAddress': 'Rappenstr. 19', 'addressLocality': 'Edenkoben', 'addressRegion': 'Rheinland-Pfalz', 'postalCode': '67480', 'addressCountry': 'DE' },
      'geo': { '@type': 'GeoCoordinates', 'latitude': 49.2847, 'longitude': 8.1310 },
      'openingHoursSpecification': [
        { '@type': 'OpeningHoursSpecification', 'dayOfWeek': ['Monday', 'Tuesday', 'Thursday'], 'opens': '08:00', 'closes': '18:00' },
        { '@type': 'OpeningHoursSpecification', 'dayOfWeek': 'Wednesday', 'opens': '08:30', 'closes': '17:00' },
        { '@type': 'OpeningHoursSpecification', 'dayOfWeek': 'Friday', 'opens': '08:00', 'closes': '14:00' }
      ],
 'hasMap': 'https://www.google.com/maps/search/?api=1&query=Gemeinschaftspraxis+Dres.+Zimmermann+Rappenstr.+19+67480+Edenkoben',
      'areaServed': [{ '@type': 'City', 'name': 'Edenkoben' }, { '@type': 'AdministrativeArea', 'name': 'Landkreis Südliche Weinstraße' }],
     
      'medicalSpecialty': 'Dentistry',
      'availableService': ['Digitaler Zahnersatz', 'Zahnheilkunde', 'Ästhetische Zahnmedizin', 'Prophylaxe & Vorsorge', 'Implantologie', 'Zahnerhalt & Parodontitis'].map(function (n) { return { '@type': 'MedicalProcedure', 'name': n }; }),
      'employee': [
        { '@type': 'Person', 'name': 'Dr. Christian Zimmermann', 'jobTitle': 'Zahnarzt' },
        { '@type': 'Person', 'name': 'Dr. Sandra Zimmermann', 'jobTitle': 'Zahnärztin' },
        { '@type': 'Person', 'name': 'Dr. Charlotte Zimmermann', 'jobTitle': 'Zahnärztin' }
      ]
    });
    var faq = $$('[data-ansicht="start"] .faq details').map(function (d) {
      return { '@type': 'Question', 'name': $('summary', d).textContent.trim(), 'acceptedAnswer': { '@type': 'Answer', 'text': $('.antwort', d).textContent.trim() } };
    });
    setzeSchema('ld-faq', { '@context': 'https://schema.org', '@type': 'FAQPage', 'mainEntity': faq });
  }

  /* ---------- Karte und Matomo erst nach Einwilligung ---------- */
  var KARTE_SRC = 'https://www.google.com/maps?q=' + encodeURIComponent('Gemeinschaftspraxis Dres. Zimmermann, Rappenstr. 19, 67480 Edenkoben') + '&output=embed&hl=de';
  function ladeKarte() {
    var k = $('#karte'); if (!k || k.getAttribute('data-geladen') === 'true') return;
    var f = document.createElement('iframe'); f.src = KARTE_SRC; f.title = 'Google Maps: Anfahrt zur Gemeinschaftspraxis Dres. Zimmermann, Rappenstr. 19, 67480 Edenkoben'; f.loading = 'lazy'; f.referrerPolicy = 'no-referrer-when-downgrade'; f.setAttribute('allowfullscreen', '');
    k.innerHTML = ''; k.appendChild(f); k.setAttribute('data-geladen', 'true');
  }
  function pruefeKarte() { var e = window.aoEinwilligung; if (e && e.entschieden() && e.erlaubt('medien')) ladeKarte(); }
  document.addEventListener('click', function (ev) { var b = ev.target.closest('[data-karte-laden]'); if (!b) return; if (window.aoEinwilligung) window.aoEinwilligung.setze('medien', true); ladeKarte(); });
  var matomoGeladen = false;
  function pruefeMatomo() {
    var e = window.aoEinwilligung;
    if (!MATOMO_URL || !MATOMO_SITE_ID || matomoGeladen || !e || !e.entschieden() || !e.erlaubt('statistik')) return;
    matomoGeladen = true;
    var _paq = window._paq = window._paq || [];
    _paq.push(['disableCookies']); _paq.push(['trackPageView']); _paq.push(['enableLinkTracking']);
    _paq.push(['setTrackerUrl', MATOMO_URL + 'matomo.php']); _paq.push(['setSiteId', MATOMO_SITE_ID]);
    var g = document.createElement('script'); g.async = true; g.src = MATOMO_URL + 'matomo.js'; document.head.appendChild(g);
  }
  function spur(kat, aktion, name) { if (window._paq && matomoGeladen) window._paq.push(['trackEvent', kat, aktion, name]); }
  document.addEventListener('ao:einwilligung', function () { pruefeKarte(); pruefeMatomo(); });

  /* ---------- Routing ---------- */
  var TITEL = {
    start: ['Zahnärzte Edenkoben | Gemeinschaftspraxis Dres. Zimmermann', 'Zahnärzte in Edenkoben: Familienpraxis Dres. Zimmermann in zweiter Generation. Digitaler Zahnersatz aus dem eigenen Labor, Implantologie, Prophylaxe, Ästhetik.'],
    impressum: ['Impressum | Dres. Zimmermann Zahnärzte Edenkoben', 'Impressum der Gemeinschaftspraxis Dres. Zimmermann, Edenkoben.'],
    datenschutz: ['Datenschutzerklärung | Dres. Zimmermann Zahnärzte Edenkoben', 'Datenschutzerklärung der Gemeinschaftspraxis Dres. Zimmermann, Edenkoben.'],
    gleichstellung: ['Gleichstellungshinweis | Dres. Zimmermann Zahnärzte Edenkoben', 'Hinweis zur Gleichstellung der Gemeinschaftspraxis Dres. Zimmermann.']
  };
  function setzeMeta(t, d) {
    document.title = t;
    $('meta[name="description"]').setAttribute('content', d);
    $('meta[property="og:title"]').setAttribute('content', t); $('meta[property="og:description"]').setAttribute('content', d);
    $('meta[name="twitter:title"]').setAttribute('content', t); $('meta[name="twitter:description"]').setAttribute('content', d);
    var h = location.hash && location.hash !== '#/' ? location.hash : '';
    $('link[rel="canonical"]').setAttribute('href', BASIS + h); $('meta[property="og:url"]').setAttribute('content', BASIS + h);
  }
  function zeige(name) {
    $$('[data-ansicht]').forEach(function (v) { v.setAttribute('data-aktiv', v.getAttribute('data-ansicht') === name ? 'true' : 'false'); });
    $('#kopf').classList.toggle('ist-unterseite', name !== 'start');
  }
  function fokusInhalt() { var m = $('#hauptinhalt'); if (m) m.focus({ preventScroll: true }); }
  function route() {
    var h = location.hash || '#/';
    schliesseMenue();
    var r = ['impressum', 'datenschutz', 'gleichstellung'].filter(function (n) { return h.indexOf('#/' + n) === 0; })[0];
    if (r) { zeige(r); setzeMeta.apply(null, TITEL[r]); setzeSchema('ld-faq', null); window.scrollTo(0, 0); fokusInhalt(); return; }
    var warAktiv = $('[data-ansicht="start"]').getAttribute('data-aktiv') === 'true';
    zeige('start'); setzeMeta.apply(null, TITEL.start); schemaStart();
    var ziel = h.split('#')[2];
    $$('.menue a').forEach(function (a) { a.removeAttribute('aria-current'); });
    var akt = $('.menue a[data-nav="' + (ziel || 'start') + '"]'); if (akt) akt.setAttribute('aria-current', 'true');
    if (ziel) { var el = document.getElementById(ziel); if (el) requestAnimationFrame(function () { el.scrollIntoView({ behavior: warAktiv ? 'smooth' : 'auto', block: 'start' }); }); }
    else window.scrollTo({ top: 0, behavior: warAktiv ? 'smooth' : 'auto' });
  }

  /* ---------- Menü ---------- */
  var burger = $('.burger'), menue = $('#menue');
  function schliesseMenue() { if (!burger) return; burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Menü öffnen'); menue.setAttribute('data-offen', 'false'); }
  if (burger) {
    burger.addEventListener('click', function () {
      var offen = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!offen)); burger.setAttribute('aria-label', offen ? 'Menü öffnen' : 'Menü schließen'); menue.setAttribute('data-offen', String(!offen));
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') { schliesseMenue(); burger.focus(); } });
    $$('a', menue).forEach(function (a) { a.addEventListener('click', function () { if (a.getAttribute('href') === location.hash) route(); }); });
  }
  var oben = $('#oben');
  window.addEventListener('scroll', function () { if (oben) oben.setAttribute('data-an', window.scrollY > 600 ? 'true' : 'false'); }, { passive: true });
  if (oben) oben.addEventListener('click', function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); fokusInhalt(); });

  zeichneEinblicke(); bindeFormular();
  $('#jahr').textContent = new Date().getFullYear();
  window.addEventListener('hashchange', route);
  route(); pruefeKarte(); pruefeMatomo();
})();
