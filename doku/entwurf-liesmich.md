# Hauptwebseite Dres. Zimmermann, Edenkoben (Nachbau als HTML)

Stand: 02.10.2026. Eins zu eins übernommen von b45p5s.myrdbx.io (Divi-Entwurf): alle Texte, Sprechzeiten, Ärzte mit Vita, Behandlungsschwerpunkte mit den Original-Icons, Angst-Kasten, Praxiseinblicke, Notdienst, Kontakt, FAQ, Rechtstexte.

## Öffnen

Doppelklick auf `index.html`. Alles in einer Datei, Unterseiten per Adresse: `index.html#/impressum`, `#/datenschutz`, `#/gleichstellung`. Abschnitte: `#/#aerzte`, `#/#behandlungsschwerpunkte`, `#/#kontakt`, `#/#faq`.

Hinweis: Unter `file://` meldet Chrome in der Konsole einen CORS-Fehler für die Schrift-Preloads, eine Eigenart des Protokolls, über HTTP tritt er nicht auf.

## Aufbau

Wie die Karriereseite: `index.html` (CSS und JS inline), `assets/` (AO-Banner und Barrierefreiheits-Widget), `fonts/` (Montserrat lokal), `img/` (WebP + JPG, SEO-Namen, Original-Icons als PNG), `src/` (Quelltexte und `bauen.py`). Änderungen in `src/` machen und `python3 src/bauen.py` ausführen.

## Was gegenüber dem Divi-Entwurf anders ist

- **Hero-Bild**: das bearbeitete Picdrop-Bild 2-2 (grün freigegeben, Hintergrund bereinigt) statt Shooting26.
- **Google-Bewertungen**: Karte im AO-Standard (Google-Logo, fünf Sterne, 4.9, 12 Bewertungen) als Link auf die Google-Bewertungen, ohne Fremdskript. Die Zahlen sind fest eingetragen (Stand 03.10.2026, von der Divi-Seite übernommen) und müssen bei Änderung in `src/seite.html` nachgezogen werden. Kein aggregateRating im Schema (Google-Rezensionen als eigene auszuzeichnen kann eine manuelle Maßnahme auslösen). Das Logo ist die Datei, die die bestehende Seite über das Trustindex-Plugin nutzt.
- **Vita** als aufklappbarer Bereich je Arzt, Inhalte wortgleich.
- **Praxiseinblicke** als Schiene mit Pfeilen und Tastaturbedienung, 11 Bilder in der Reihenfolge des Originals.
- **Formular** verschickt im Entwurf nichts an einen Server: Pflichtfeldprüfung, dann öffnet sich das E-Mail-Programm mit den Angaben an info@zahnaerzte-edenkoben.de. Vor dem Livegang Formulardienst festlegen.
- **Google Analytics** durch Matomo ersetzt (lädt erst nach Einwilligung; `MATOMO_URL` und `MATOMO_SITE_ID` oben in `src/skript.js`). **Google Fonts** lokal. **reCAPTCHA** und **Borlabs** entfallen. **Karte** erst nach Klick oder Einwilligung.
- **Eine zusätzliche FAQ** mit Adresse, Sprechzeiten und Kontakt (Ortsbezug für die lokale Suche, AO-Standard).
- **Icons** der Behandlungsschwerpunkte sind die Original-PNGs der Divi-Seite (500 px, transparent).

## Google, SEO, Geo

Dentist/LocalBusiness-Schema mit Adresse, Telefon, Fax, Sprechzeiten, Geo-Koordinaten, Leistungen und den drei Ärzten als Personen. FAQPage-Schema deckungsgleich mit dem sichtbaren Text. Title, Description, Canonical, Open Graph, Twitter Cards je Ansicht. `sitemap.xml`, `robots.txt`, Platzhalter für die Search-Console-Verifizierung. Canonical-Domain ist `https://www.zahnaerzte-edenkoben.de/` als Platzhalter (Konstante `BASIS` in `src/skript.js` und im `<head>`).

## Offene Punkte vor dem Livegang

1. Impressum: Kammer, KZV, berufsrechtliche Regelungen, Vertretungsberechtigte, Bildnachweis (gelb markiert, Vorschlag eingetragen).
2. Datenschutz: Hoster nach Umzug, Matomo-Hosting, Formularweg (gelb markiert).
3. Geo-Koordinaten (49.2847, 8.1310) geschätzt, bitte prüfen.
4. Bewertungen: Link zeigt auf die Google-Suche nach der Praxis; sobald die Google-Business-Profil-URL vorliegt, in `src/seite.html` eintragen (Klasse `bewertung`).
5. Fotos: Namen der Ärzte stehen in Alt-Texten und Schema, wie auf der bestehenden Seite. Mitarbeiterinnen werden nicht namentlich genannt.

## Geprüft

Playwright bei 1920, 1440, 1240, 1024, 768 und 390 px: kein horizontales Scrollen, Burger ab 860 px, genau eine h1 je Ansicht, lückenlose Überschriften, keine defekten Bilder, alle Bilder mit Alt-Text, JSON-LD gültig, keine Konsolenfehler, keine Anfrage an einen fremden Host vor der Einwilligung, Banner-Knöpfe gleich groß auf einer Zeile, Formular prüft Pflichtfelder.

## Änderungen 03.10.2026

Bewertungskarte im AO-Standard, Title und Description auf Google-Länge gekürzt, Menüpunkt „Startseite“ scrollt wieder nach oben, Schema um hasMap und areaServed ergänzt, Silbentrennung, Knopf im dunklen Kasten korrigiert.

## Funktionsprüfung 03.10.2026

Automatisch geprüft: Banner blockiert vor Entscheidung, Karte lädt erst nach Klick, Cookie-Einstellungen aus der Fußzeile, alle Menüpunkte und Fußzeilen-Links, Logo zur Startseite, Vita, Praxiseinblicke-Pfeile, FAQ, Formular leer (Fehler) und gefüllt (Danke), Burger-Menü, Title und Description in Google-Länge, eine h1, JSON-LD gültig, Bilder mit Maßen und Alt, keine toten Anker, externe Links mit noopener, keine Konsolenfehler.
