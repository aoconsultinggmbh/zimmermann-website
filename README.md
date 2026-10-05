# Dres. Zimmermann Zahnärzte, Edenkoben – Hauptwebseite

Kundenprojekt der AO Consulting GmbH. Entwurf von Ovidiu Rieger (Oktober 2026),
Nachbau des Divi-Entwurfs (b45p5s.myrdbx.io) als reine HTML-Seite.

- **Vorschau:** https://zimmermann.vorschau.ao-consult.de (Suchmaschinen ausgesperrt)
- **Spätere Domain:** www.zahnaerzte-edenkoben.de (Platzhalter, noch nicht bestätigt)
- **Karriereseite:** eigenes Projekt `zimmermann-karriere`

## Aufbau

| Ordner | wofür |
|---|---|
| `website/` | die Seite – nur was hier liegt, geht online. Eine `index.html` (alles in einer Datei), Unterseiten über die Adresse: `#/impressum`, `#/datenschutz`, `#/gleichstellung` |
| `quelltexte/` | Quelltexte `seite.html`, `stil.css`, `skript.js`, `datenschutz.html` und `bauen.py` |
| `doku/` | Unterlagen: Hinweise aus dem Entwurf, Checkliste Livegang |
| `.github/workflows/` | die zwei Abläufe: `vorschau.yml` (main → Vorschau), `livegang.yml` (live → Hoster) |

## Ändern

Änderungen an Text, Stil oder Skript in `quelltexte/` machen, dann im Projektordner
`python3 quelltexte/bauen.py` ausführen. Das setzt `website/index.html`,
`sitemap.xml` und `robots.txt` neu zusammen. Wer nur die `index.html` ändert,
verliert die Änderung beim nächsten Bauen.

## Die zwei Zweige

- **`main`** = Vorschau. Hier passiert die ganze Arbeit.
- **`live`** = die echte Seite. Erst wenn `live` auf den Stand von `main` gesetzt wird,
  geht etwas zum Hoster. **Nichts geht ohne Freigabe live.**

## Was drin ist, was nicht

- Keine externen Schriften, Skripte oder Tracker. Montserrat liegt lokal in `website/fonts/`.
- Karte (Google Maps) lädt erst nach Klick oder Einwilligung.
- Matomo ist vorbereitet, aber leer (`MATOMO_URL`, `MATOMO_SITE_ID` in `quelltexte/skript.js`).
- Formular verschickt im Entwurf nichts an einen Server, sondern öffnet das E-Mail-Programm
  (an info@zahnaerzte-edenkoben.de). Vor dem Livegang auf `anfrage-senden.php` umstellen.

## Vor dem Livegang zu erledigen

1. Impressum: Kammer, KZV, berufsrechtliche Regelungen, Vertretungsberechtigte, Bildnachweis (im Entwurf gelb markiert) – von der Praxis bestätigen lassen.
2. Datenschutz: Hoster (All-Inkl), Matomo-Hosting, Formularweg eintragen; Raidboxes-Absatz prüfen.
3. Formular scharf schalten (PHP-Versand, Honigtopf, Zeitsperre), Empfängeradresse mit der Praxis klären.
4. Matomo-Seite auf statistik.ao-consult.de anlegen, Kennung eintragen, Einwilligungs-Text prüfen.
5. Geo-Koordinaten (49.2847, 8.1310) prüfen; Google-Business-Profil-Adresse für den Bewertungs-Link eintragen.
6. Domain klären (zahnaerzte-edenkoben.de ist Platzhalter) und überall eintragen: canonical, sitemap, robots.
7. `.htaccess` mit kasserver-Ausnahme, Zwischenspeicher-Regeln und Weiterleitungen der alten Adressen.
8. Die ganze Liste: `doku/checkliste-livegang.md`.

Keine Passwörter, keine Zugänge, keine Schlüssel in dieses Projekt – es ist öffentlich.
