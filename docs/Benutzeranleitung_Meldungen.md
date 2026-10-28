# Benutzeranleitung – Meldungen verwalten

Stand: 28.10.2026 · Kopie des Claude-Dokuments [Benutzeranleitung – Meldungen verwalten](https://claude.ai/artifact/C6FkzsAvM7aJrCZvE2x2Zf)

## Einleitung

Mit dem Admin-Bereich der Praxis-Website verwalten Sie die Meldungen, die Patientinnen und Patienten auf der Startseite unter „Aktuelles!“ sehen, zum Beispiel Urlaubsschließungen und Vertretungen. Sie brauchen dafür keine technischen Kenntnisse, nur einen Browser und das Admin-Passwort.

Diese Anleitung richtet sich an Mitarbeiterinnen und Mitarbeiter der Praxis. Sie erklärt alle Funktionen in der Reihenfolge, in der Sie sie im Alltag brauchen.

**Grundregel für die Sichtbarkeit:** Eine Meldung ist auf der Website zu sehen, sobald sie **aktiviert** ist und ihr **Enddatum noch nicht vorbei** ist. Das Startdatum steuert die Sichtbarkeit nicht. Eine Urlaubsankündigung erscheint also schon vor Urlaubsbeginn, sobald Sie sie aktivieren, und verschwindet nach dem Enddatum automatisch.

| Zustand | Auf der Website sichtbar? |
| --- | --- |
| Aktiviert, Enddatum heute oder in der Zukunft | Ja |
| Aktiviert, Enddatum vorbei | Nein (verschwindet automatisch) |
| Deaktiviert | Nein |

Gibt es keine sichtbare Meldung, blendet die Website den Bereich „Aktuelles!“ komplett aus.

## Anmelden und Abmelden

Der Admin-Bereich ist mit einem Passwort geschützt. Sie erreichen ihn unter **https://www.praxis-chosnis.de/admin/login**.

1. Öffnen Sie die Adresse im Browser.
2. Geben Sie das Passwort ein.
3. Klicken Sie auf **Anmelden** oder drücken Sie die Eingabetaste.

Nach erfolgreicher Anmeldung öffnet sich die Übersicht „Aktuelles verwalten“.

| Meldung beim Anmelden | Bedeutung und Lösung |
| --- | --- |
| Falsches Passwort. Bitte erneut versuchen. | Passwort prüfen (Groß-/Kleinschreibung, Feststelltaste). |
| Zu viele Fehlversuche. Bitte einige Minuten warten. | Nach 5 falschen Eingaben in 10 Minuten wird die Anmeldung vorübergehend gesperrt. Etwa 10 Minuten warten, dann erneut versuchen. |
| Login fehlgeschlagen. Bitte später erneut versuchen. | Technisches Problem am Server. Später erneut versuchen oder die technische Betreuung informieren. |

**Abmelden:** Klicken Sie oben rechts auf **Abmelden**, wenn Sie fertig sind, besonders an gemeinsam genutzten Rechnern. Ohne Abmeldung endet die Sitzung automatisch nach 8 Stunden.

**Wichtig:** Verwenden Sie immer dieselbe Adresse mit „www“. Eine Anmeldung unter praxis-chosnis.de (ohne „www“) gilt nicht für www.praxis-chosnis.de und umgekehrt.

## Die Übersicht „Aktuelles verwalten“

Die Übersicht listet alle Meldungen als Karten untereinander. Jede Karte zeigt den Titel, den Zeitraum (Start → Ende) und ein farbiges Status-Etikett. Meldungen, die gerade auf der Website sichtbar sind, haben links einen blauen Rand.

| Status-Etikett | Bedeutung |
| --- | --- |
| **Aktiv & Sichtbar** (grün) | Die Meldung ist jetzt auf der Website zu sehen. |
| **Aktiviert (abgelaufen)** (gelb) | Die Meldung ist aktiviert, aber das Enddatum ist vorbei. Sie ist nicht mehr sichtbar. |
| **Deaktiviert** (grau) | Die Meldung ist gespeichert, aber nicht sichtbar. |

| Schaltfläche | Funktion |
| --- | --- |
| **+ Neue Meldung** (oben rechts) | Öffnet das Formular für eine neue Meldung. |
| **Auf Website ansehen** | Zeigt die Meldung in einem neuen Tab auf der echten Startseite, auch wenn sie deaktiviert ist. |
| **Aktivieren / Deaktivieren** | Schaltet die Sichtbarkeit sofort um und speichert. |
| **Bearbeiten** | Öffnet die Meldung im Formular. |
| **Löschen** | Entfernt die Meldung nach einer Sicherheitsabfrage endgültig. |

Nach jeder Änderung erscheint oben ein Hinweis: „Wird gespeichert…“, dann „Erfolgreich gespeichert!“ (grün). Bei „Fehler beim Speichern“ (rot) wurde die Änderung **nicht** übernommen; siehe Abschnitt „Häufige Fragen und Problemlösung“.

## Neue Meldung erstellen

Eine neue Meldung besteht aus Titel, Zeitraum und Inhalt. Sie wird zunächst **deaktiviert** gespeichert, damit nichts versehentlich online geht.

1. Klicken Sie in der Übersicht auf **+ Neue Meldung**.
2. **Titel** eingeben, z. B. „Sommerurlaub vom {startDate} bis {endDate}“. Die Platzhalter werden auf der Website durch die Daten ersetzt, im Titel in langer Form („03. Januar 2026“).
3. **Startdatum** und **Enddatum** wählen. Das ist der Zeitraum, in dem die Praxis geschlossen ist. Das Enddatum bestimmt, bis wann die Meldung sichtbar ist.
4. Den Schalter **Meldung aktivieren** ausgeschaltet lassen (empfohlen, siehe Abschnitt „Vorschau prüfen und aktivieren“).
5. Unter **Inhalt** den Text in Blöcken eingeben. Der erste Block ist schon vorhanden; mit **+ Block hinzufügen** kommen weitere dazu. Details im nächsten Abschnitt.
6. Optional: **Vorschau** klicken. Unter dem Formular erscheint, wie die Meldung aussehen wird. Es wird noch nichts gespeichert.
7. Auf **Speichern** klicken. Das Formular schließt sich, die Meldung steht in der Übersicht.

Mit **Abbrechen** verlassen Sie das Formular, ohne zu speichern.

**Beim Speichern gilt:**

- Ohne Titel erscheint „Bitte geben Sie einen Titel ein.“
- Leere Textblöcke werden beim Speichern automatisch entfernt. Ist danach kein Block übrig, erscheint „Mindestens ein Inhaltsblock ist erforderlich.“
- Die Daten werden nicht auf Plausibilität geprüft. Achten Sie selbst darauf, dass das Enddatum nicht vor dem Startdatum liegt.

## Inhaltsblöcke gestalten

Der Inhalt einer Meldung besteht aus Blöcken, ein Block pro Absatz oder Zeile. Sie wählen für jeden Block einen **Typ**; der Typ bestimmt das Aussehen auf der Website. Farben und Schriften sind fest vorgegeben, damit alle Meldungen einheitlich aussehen.

### Blocktypen

| Typ (Auswahlliste) | Darstellung auf der Website | Typische Verwendung |
| --- | --- | --- |
| Absatz | Normaler Fließtext | Anrede, Erklärungen, Grußformel |
| Überschrift (bunt, fett) | Farbig und fett | Zwischenüberschrift innerhalb der Meldung |
| Fettgedruckt | Ganzer Block fett | Hervorhebung, z. B. „Vertretungspraxis:“ |
| Listenpunkt | Aufzählungspunkt | Adressen, Telefonnummern, einzelne Punkte |
| Notfallhinweis (rot) | Roter Text | Bereitschaftsdienst 116 117, Notruf 112 |
| ── Trennlinie ── | Horizontale Linie | Abschnitte optisch trennen |
| ↕ Leerzeile | Leere Zeile | Abstand zwischen Abschnitten |

Bei Trennlinie und Leerzeile gibt es kein Textfeld und keine Formatierung.

### Text eingeben und hervorheben

Tippen Sie den Text in das Feld neben der Typ-Auswahl. Zwei Sonderzeichen helfen dabei:

- **Einzelne Wörter fett:** Wörter in doppelte Sternchen setzen. `**geschlossen**` erscheint als **geschlossen**.
- **Daten automatisch einsetzen:** `{startDate}` und `{endDate}` werden durch Start- und Enddatum ersetzt, im Text in kurzer Form („03.01.2026“). Wenn Sie die Daten später ändern, passt sich der Text von selbst an.

HTML oder andere Formatierungen funktionieren nicht; sie erscheinen als normaler Text.

### Ausrichtung, Einzug und Zeilenabstand

Unter jedem Textblock gibt es drei Einstellungen. Sie gelten nur für diesen Block.

| Einstellung | Möglichkeiten | Hinweis |
| --- | --- | --- |
| Ausrichtung | Li (links), Mi (Mitte), Re (rechts) | Erneuter Klick auf die aktive Ausrichtung setzt sie zurück auf Standard. |
| Einzug | keiner, Links, Rechts; Tiefe 1–10 em | Rückt den Block ein, z. B. für Adressen. Standardtiefe 2. |
| Zeilenabstand | Standard, 0.5 bis 3.0, Benutzerdefiniert… | „Benutzerdefiniert…“ erlaubt einen eigenen Wert zwischen 0.5 und 4. |

### Blöcke hinzufügen, verschieben und entfernen

- **Hinzufügen:** **+ Block hinzufügen** unter dem letzten Block hängt einen neuen Block an.
- **Verschieben:** Mit den Pfeilen ▲ und ▼ links am Block eine Position nach oben oder unten. Alternativ den Griff ⠿ mit der Maus an die gewünschte Stelle ziehen.
- **Entfernen:** ✕ rechts am Block. Der letzte verbliebene Block lässt sich nicht entfernen.

Änderungen an Blöcken werden erst mit **Speichern** übernommen.

## Vorschau prüfen und aktivieren

Aktivieren Sie eine Meldung erst, nachdem Sie sie auf der echten Website geprüft haben. So sehen Patientinnen und Patienten nie eine Meldung mit Tippfehlern oder falschem Datum.

**Empfohlener Ablauf:**

1. Meldung **deaktiviert** speichern.
2. In der Übersicht bei der Meldung auf **Auf Website ansehen** klicken. Die Startseite öffnet sich in einem neuen Tab und zeigt nur diese Meldung.
3. Prüfen: Rechtschreibung, Daten, Telefonnummern, Adressen, Darstellung.
4. Bei Fehlern: Tab schließen, **Bearbeiten**, korrigieren, speichern, erneut ansehen.
5. Wenn alles stimmt: In der Übersicht auf **Aktivieren** klicken. Das Etikett wechselt auf **Aktiv & Sichtbar**.

**Zwei Arten der Vorschau:**

| Vorschau | Wo | Zweck |
| --- | --- | --- |
| **Vorschau** im Formular | Unter dem Formular, vor dem Speichern | Schneller Blick während des Schreibens |
| **Auf Website ansehen** in der Übersicht | Echte Startseite, neuer Tab | Endkontrolle im echten Seitenlayout |

In der Website-Ansicht steht oben ein gelber Hinweis „Vorschaumodus“. Er bedeutet: Die Meldung ist nur über diesen besonderen Link zu sehen. Besucher der Website sehen sie erst nach dem Aktivieren. Senden Sie diesen Link nicht an Dritte, um keinen falschen Eindruck zu erwecken.

**Deaktivieren:** Ein Klick auf **Deaktivieren** nimmt die Meldung sofort von der Website, ohne sie zu löschen. Sie können sie später wieder aktivieren, z. B. für den nächsten Urlaub mit neuen Daten.

## Meldung bearbeiten und löschen

### Bearbeiten

1. In der Übersicht bei der Meldung auf **Bearbeiten** klicken.
2. Titel, Daten oder Blöcke wie beim Erstellen ändern.
3. Auf **Speichern** klicken.

Eine bereits aktive Meldung bleibt beim Bearbeiten aktiv. Korrekturen sind nach dem Speichern sofort auf der Website sichtbar. Für größere Änderungen schalten Sie im Formular **Meldung aktivieren** aus, speichern, prüfen mit **Auf Website ansehen** und aktivieren danach wieder.

**Meldung wiederverwenden:** Statt jedes Jahr neu zu schreiben, können Sie eine abgelaufene Meldung (gelbes Etikett) bearbeiten: neue Daten eintragen, Text anpassen, speichern. Mit `{startDate}` und `{endDate}` im Text aktualisieren sich die Daten von selbst.

### Löschen

1. In der Übersicht auf **Löschen** klicken.
2. Die Sicherheitsabfrage „Möchten Sie diese Meldung wirklich löschen?“ bestätigen.

Gelöschte Meldungen lassen sich im Admin-Bereich **nicht wiederherstellen**. Wenn Sie eine Meldung nur vorübergehend ausblenden wollen, nutzen Sie **Deaktivieren**.

## Vorlagen einrichten und verwenden

Vorlagen sparen Schreibarbeit bei wiederkehrenden Meldungen. Es gibt zwei Arten: **Titelvorlagen** für den Titel und **Textvorlagen** für einen oder mehrere Inhaltsblöcke, z. B. die Angaben zur Vertretungspraxis.

**Wichtig:** Vorlagen werden nur **in dem Browser auf dem Rechner gespeichert**, auf dem Sie sie angelegt haben. Sie gelten nicht für andere Rechner oder andere Browser und gehen verloren, wenn die Browserdaten gelöscht werden. Die Meldungen selbst sind davon nicht betroffen; sie liegen sicher auf dem Server.

### Titelvorlagen

| Aktion | So geht es |
| --- | --- |
| Anlegen | Titel ins Feld schreiben, z. B. „Urlaub vom {startDate} bis {endDate}“, dann auf den Stern ⭐ rechts neben dem Titel klicken. |
| Anzeigen | Auf 📋 neben dem Stern klicken. Die Zahl zeigt, wie viele Titelvorlagen es gibt. |
| Verwenden | Zuerst Start- und Enddatum wählen, dann in der Liste bei der Vorlage auf **Übernehmen** klicken. Die Daten werden fest in Kurzform („03.01.2026“) eingesetzt. Wenn Sie die Daten danach ändern, übernehmen Sie die Vorlage erneut. Ohne gewählte Daten bleiben die Stellen leer. |
| Löschen | In der Liste auf ✕ neben der Vorlage klicken. |

### Textvorlagen

| Aktion | So geht es |
| --- | --- |
| Einen Block speichern | Beim Block auf den Stern ⭐ klicken, einen Namen vergeben, bestätigen. |
| Alle Blöcke speichern | Unter den Blöcken auf **⭐ Alle als Vorlage** klicken und einen Namen vergeben, z. B. „Vertretung Dr. Müller“. Speichert den ganzen Inhalt inklusive Formatierung. |
| Anzeigen | Oberhalb von „Inhalt“ auf **📋 Textvorlagen** klicken. Jede Vorlage zeigt Name, Textanfang und die Zahl weiterer Blöcke. |
| Verwenden | Bei der Vorlage auf **+ Einfügen** klicken. Die Blöcke werden **am Ende** des Inhalts angehängt; bei Bedarf mit ▲ ▼ verschieben. |
| Löschen | Auf ✕ neben der Vorlage klicken. |

**Tipp:** Legen Sie eine Textvorlage für jede Vertretungspraxis an und eine für den Notfallhinweis. Eine neue Urlaubsmeldung ist dann in wenigen Klicks fertig.

## Beispiel: Urlaubsschließung ankündigen

So kündigen Sie eine Schließung vom 20.07. bis 07.08.2026 an. Planen Sie etwa 10 Minuten ein und veröffentlichen Sie die Meldung 2 bis 3 Wochen vor Urlaubsbeginn.

1. Anmelden unter www.praxis-chosnis.de/admin/login.
2. **+ Neue Meldung** klicken.
3. Titel: „Sommerurlaub vom {startDate} bis {endDate}“.
4. Startdatum 20.07.2026, Enddatum 07.08.2026.
5. Inhalt aufbauen, z. B.:
    1. Absatz: „Liebe Patientinnen und Patienten,“
    2. Absatz: „unsere Praxis bleibt vom {startDate} bis einschließlich {endDate} **geschlossen**.“
    3. Fettgedruckt: „Vertretungspraxis:“
    4. Listenpunkt: Name, Adresse und Telefonnummer der Vertretung (oder Textvorlage einfügen)
    5. Notfallhinweis (rot): „In dringenden Fällen: ärztlicher Bereitschaftsdienst 116 117, im Notfall 112.“
    6. Absatz: „Ab Montag, den 10.08.2026 sind wir wieder für Sie da.“
6. **Vorschau** klicken und grob prüfen.
7. Mit ausgeschaltetem Aktiv-Schalter **Speichern**.
8. **Auf Website ansehen** klicken und sorgfältig prüfen.
9. **Aktivieren** klicken. Prüfen, dass das Etikett **Aktiv & Sichtbar** zeigt und oben „Erfolgreich gespeichert!“ erschien.
10. **Abmelden**.

Nach dem 07.08.2026 verschwindet die Meldung von selbst. Sie müssen nichts tun. Für den nächsten Urlaub können Sie diese Meldung bearbeiten und mit neuen Daten wieder aktivieren.

## Häufige Fragen und Problemlösung

| Problem | Ursache | Lösung |
| --- | --- | --- |
| Meldung ist aktiviert, aber nicht auf der Website | Enddatum ist vorbei (gelbes Etikett) | Enddatum korrigieren und speichern. |
| Meldung erscheint schon vor Urlaubsbeginn | So gewollt: Sichtbar ab Aktivierung bis zum Enddatum | Erst aktivieren, wenn die Meldung erscheinen soll. |
| „Fehler beim Speichern“ mit „HTTP 401“ | Sitzung abgelaufen (nach 8 Stunden) oder abgemeldet | Neu anmelden und die Änderung wiederholen. |
| „Fehler beim Speichern“ mit anderem Code oder „Netzwerkfehler“ | Keine Internetverbindung oder Serverproblem | Verbindung prüfen, Seite neu laden, erneut versuchen. Bleibt der Fehler, die technische Betreuung mit dem angezeigten Text informieren. |
| Vorlagen sind verschwunden | Anderer Rechner oder Browser, oder Browserdaten gelöscht | Vorlagen gelten nur im Browser, in dem sie angelegt wurden. Neu anlegen. |
| Datum erscheint als „{startDate}“ | Schreibweise falsch, z. B. Leerzeichen oder Großbuchstaben | Genau `{startDate}` bzw. `{endDate}` schreiben. |
| Sternchen erscheinen auf der Website | Nur ein Sternchen oder nicht geschlossen | Immer zwei Sternchen davor und danach: `**Text**`. |
| Website zeigt noch den alten Stand | Browser zeigt eine zwischengespeicherte Seite | Seite neu laden (F5). |
| Passwort vergessen | Das Passwort kann nur die technische Betreuung neu setzen | Technische Betreuung kontaktieren. |

**Gute Gewohnheiten:**

- Jede Meldung vor dem Aktivieren mit **Auf Website ansehen** prüfen.
- Nach jeder Änderung auf die grüne Bestätigung „Erfolgreich gespeichert!“ achten.
- Nicht mehr benötigte Meldungen deaktivieren statt löschen, wenn sie wiederverwendet werden sollen.
- Das Passwort nicht notieren oder weitergeben; nach der Arbeit **Abmelden**.
