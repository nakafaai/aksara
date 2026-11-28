import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "parts",
      parts: [
        {
          kind: "extendedText",
          label: "a",
          points: 3,
          rubric: [
            {
              feedback: {
                earned:
                  "Genau, nach rechts ziehen beide Faktoren nach oben, also wächst der Graph ohne Grenze.",
                missed:
                  "Schau dir für große x die beiden Faktoren einzeln an, den quadratischen Teil und die e-Funktion. Wenn beide wachsen, wohin geht dann ihr Produkt?",
              },
              label: "Verhalten für große positive x",
              met: "Die Lösung gibt an, dass f_a(x) für x gegen plus unendlich gegen plus unendlich geht, und begründet es damit, dass x^2 - a und e^x beide gegen plus unendlich gehen.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig, links gewinnt die e-Funktion gegen den quadratischen Teil, darum geht der Graph gegen null.",
                missed:
                  "Links wächst der quadratische Teil, aber die e-Funktion schrumpft. Überleg dir, wer dieses Duell gewinnt, und begründe damit den Grenzwert.",
              },
              label: "Verhalten für große negative x",
              met: "Die Lösung gibt an, dass f_a(x) für x gegen minus unendlich gegen 0 geht, und begründet es damit, dass e^x schneller gegen 0 geht, als x^2 - a wächst.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Schön, du hast das Vorzeichen geprüft: Weit links ist der Graph immer positiv und kommt von oben an die Achse.",
                missed:
                  "Prüfe das Vorzeichen weit links: Welches Vorzeichen haben die beiden Faktoren dort? Daraus folgt, von welcher Seite der Graph kommt, und zwar für jedes a.",
              },
              label: "Seite der Annäherung",
              met: "Die Lösung begründet, dass f_a(x) > 0 für alle hinreichend kleinen x gilt (sobald x^2 > a, etwa für x < -√|a|), weil dann x^2 - a > 0 und e^x > 0 ist, und folgert, dass sich G_a für jedes a von oben der x-Achse nähert. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
          ],
        },
        {
          kind: "extendedText",
          label: "b",
          points: 4,
          rubric: [
            {
              feedback: {
                earned:
                  "Gut, die e-Funktion wird nie null, also entscheidet allein der quadratische Faktor.",
                missed:
                  "Ein Produkt ist null, wenn ein Faktor null ist. Frag dich zuerst, ob die e-Funktion überhaupt null werden kann.",
              },
              label: "Rolle der e-Funktion",
              met: "Die Lösung begründet, dass e^x > 0 für alle x gilt, sodass f_a(x) = 0 genau dann gilt, wenn x^2 - a = 0 ist.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig, für positive a gibt es zwei Nullstellen, spiegelbildlich zur y-Achse.",
                missed:
                  "Für positive a hat die Gleichung zwei Lösungen. Denk an beide Vorzeichen der Wurzel.",
              },
              label: "Fall mit zwei Nullstellen",
              met: "Die Lösung gibt für a > 0 die zwei Nullstellen x = -√a und x = √a an.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Genau, bei a gleich null wird die Nullstelle doppelt, und der Graph berührt die Achse nur.",
                missed:
                  "Untersuche den Fall, in dem beide Nullstellen zusammenfallen. Zeig dann, dass der Graph die Achse dort nur berührt, etwa über das Vorzeichen oder die Ableitung.",
              },
              label: "Fall mit Berührung",
              met: "Die Lösung gibt für a = 0 die einzige Nullstelle x = 0 an und begründet, dass G_0 die x-Achse dort berührt, zum Beispiel weil x = 0 doppelte Nullstelle ist, weil f_0(x) = x^2·e^x ≥ 0 gilt oder weil f_0'(0) = 0 ist. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig, bei negativem a bleibt der Graph strikt darüber, und mit dem Berührfall a gleich null gilt nichtnegativ genau für a kleiner gleich null.",
                missed:
                  "Prüfe neben dem Fall ohne Nullstelle auch, für welche Werte von a die Funktion nirgends negativ wird. Vergiss dabei den Berührfall nicht.",
              },
              label: "Fall ohne Nullstelle und Nichtnegativität",
              met: "Die Lösung begründet, dass f_a für a < 0 keine Nullstelle hat (x^2 - a > 0 für alle x) und schließt korrekt, dass f_a(x) ≥ 0 für alle x genau für a ≤ 0 gilt (einschließlich des Randfalls a = 0).",
              points: 1,
            },
          ],
        },
        {
          kind: "extendedText",
          label: "c",
          points: 6,
          rubric: [
            {
              feedback: {
                earned: "Sauber abgeleitet, die Produktregel sitzt.",
                missed:
                  "Leite mit der Produktregel ab: Ableitung des ersten Faktors mal zweiter Faktor plus erster Faktor mal Ableitung des zweiten. Klammere danach die e-Funktion aus.",
              },
              label: "Ableitung",
              met: "Die Lösung bestimmt mit der Produktregel f_a'(x) = (x^2 + 2x - a)·e^x.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Gut, du hast die Kandidaten gefunden und gesehen, dass die Wurzel nur für manche a existiert.",
                missed:
                  "Setze die Ableitung null und teile durch die e-Funktion. Die quadratische Gleichung, die bleibt, löst du mit der p-q-Formel. Achte darauf, wann die Wurzel existiert.",
              },
              label: "Kandidaten für Extremstellen",
              met: "Die Lösung setzt f_a'(x) = 0, nutzt e^x > 0 und erhält x^2 + 2x - a = 0 mit x = -1 ± √(1 + a), reell nur für a ≥ -1. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned: "Richtig begründet, links liegt der Hochpunkt.",
                missed:
                  "Ein Kandidat allein ist noch kein Extrempunkt. Prüfe den Vorzeichenwechsel der Ableitung an der linken Stelle oder setze in die zweite Ableitung ein.",
              },
              label: "Art an der linken Stelle",
              met: "Die Lösung weist für a > -1 bei x1 = -1 - √(1 + a) einen Hochpunkt nach, zum Beispiel mit dem Vorzeichenwechsel von f_a' von plus nach minus oder mit f_a''(x1) < 0. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig, rechts liegt der Tiefpunkt, und du hast es begründet.",
                missed:
                  "Prüfe auch die rechte Stelle: Wie wechselt dort das Vorzeichen der Ableitung? Die nach oben geöffnete Parabel im Faktor hilft dir.",
              },
              label: "Art an der rechten Stelle",
              met: "Die Lösung weist für a > -1 bei x2 = -1 + √(1 + a) einen Tiefpunkt nach, zum Beispiel mit dem Vorzeichenwechsel von f_a' von minus nach plus oder mit f_a''(x2) > 0. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Stark, du hast den Sattelpunkt erkannt und nicht als Extrempunkt gezählt.",
                missed:
                  "Schau dir den Wert von a an, bei dem die Wurzel null wird. Wechselt die Ableitung dort wirklich ihr Vorzeichen? Wenn nicht, ist es kein Extrempunkt.",
              },
              label: "Sonderfall mit doppelter Stelle",
              met: "Die Lösung erkennt, dass für a = -1 nur x = -1 als doppelte Nullstelle von f_a' auftritt, f_-1'(x) = (x + 1)^2·e^x ≥ 0 dort das Vorzeichen nicht wechselt und G_-1 dort einen Sattelpunkt, also keinen Extrempunkt hat. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig, dann steigt der Graph überall und hat keinen Extrempunkt.",
                missed:
                  "Für manche a hat die Gleichung gar keine Lösung. Zeig für diese a, dass die Ableitung immer positiv ist, zum Beispiel mit quadratischer Ergänzung.",
              },
              label: "Fall ohne Extrempunkte",
              met: "Die Lösung begründet, dass G_a für a < -1 keinen Extrempunkt hat, weil x^2 + 2x - a = (x + 1)^2 - (1 + a) > 0 und damit f_a'(x) > 0 für alle x gilt. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
          ],
        },
        {
          kind: "extendedText",
          label: "d",
          points: 4,
          rubric: [
            {
              feedback: {
                earned:
                  "Sauber ein zweites Mal abgeleitet, der quadratische Faktor stimmt.",
                missed:
                  "Leite deine erste Ableitung noch einmal mit der Produktregel ab und klammere wieder die e-Funktion aus.",
              },
              label: "Zweite Ableitung",
              met: "Die Lösung bestimmt mit der Produktregel f_a''(x) = (x^2 + 4x + 2 - a)·e^x. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Gut, durch Subtrahieren beider Bedingungen findest du Stelle und Parameter in einem Zug.",
                missed:
                  "Ein Wendepunkt auf der Achse erfüllt gleichzeitig f = 0 und f'' = 0. Teile beide durch die e-Funktion und ziehe sie voneinander ab, um a loszuwerden.",
              },
              label: "Stelle und Parameter",
              met: "Die Lösung verknüpft f_a(x) = 0 und f_a''(x) = 0 zu x^2 - a = 0 und x^2 + 4x + 2 - a = 0, eliminiert a zu 4x + 2 = 0 und erhält x = -1/2 sowie a = 1/4. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Stark, du hast den Vorzeichenwechsel bestätigt und auch den zweiten Wendepunkt geprüft.",
                missed:
                  "Zeig, dass f'' an deiner Stelle wirklich das Vorzeichen wechselt, und prüfe am zweiten Wendepunkt von G_{1/4}, dass sein Funktionswert nicht null ist.",
              },
              label: "Nachweis und zweiter Wendepunkt",
              met: "Die Lösung weist den Krümmungswechsel bei x = -1/2 nach (einfache Nullstelle von f'' oder f'''(-1/2) ≠ 0) und begründet, dass der zweite Wendepunkt bei x = -7/2 wegen f_{1/4}(-7/2) = 12·e^(-7/2) ≠ 0 nicht auf der x-Achse liegt. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Genau, Steigung und Punktformel ergeben sauber die gesuchte Wendetangente.",
                missed:
                  "Bestimme die Steigung über die erste Ableitung an der Wendestelle und setze sie zusammen mit dem Wendepunkt in die Geradengleichung ein.",
              },
              label: "Gleichung der Wendetangente",
              met: "Die Lösung berechnet die Steigung f_{1/4}'(-1/2) = -e^(-1/2) und gibt die Wendetangente t(x) = -e^(-1/2)·(x + 1/2) (oder gleichwertig) exakt an. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
          ],
        },
        {
          kind: "extendedText",
          label: "e",
          points: 5,
          rubric: [
            {
              feedback: {
                earned:
                  "Gut, du hast den Parameter durch die Stelle ausgedrückt, das ist der Kern einer Ortskurve.",
                missed:
                  "Für eine Ortskurve brauchst du a als Term in x. Nimm die Bedingung für Extremstellen aus Teil c und löse sie nach a auf.",
              },
              label: "Parameter durch x ausdrücken",
              met: "Die Lösung löst die Bedingung für Extremstellen nach a auf: a = x^2 + 2x. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig, alle Extrempunkte liegen auf derselben Kurve.",
                missed:
                  "Setze deinen Term für a in den Funktionsterm ein und vereinfache. Der quadratische Teil sollte sich dabei wegheben.",
              },
              label: "Gleichung der Ortskurve",
              met: "Die Lösung setzt a = x^2 + 2x in y = (x^2 - a)·e^x ein und erhält y = -2x·e^x. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Gut, du hast auch die Rückrichtung gezeigt: Jeder dieser Kurvenpunkte ist wirklich ein Extrempunkt.",
                missed:
                  "Zeig auch umgekehrt, dass zu jeder Stelle der Kurve ein passendes a gehört. Prüfe, ob dieses a im Bereich mit zwei Extrempunkten liegt.",
              },
              label: "Jeder Kurvenpunkt kommt vor",
              met: "Die Lösung begründet, dass zu jedem x ≠ -1 das Scharmitglied mit a = x^2 + 2x = (x + 1)^2 - 1 > -1 gehört, das bei x einen Extrempunkt hat.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Genau, dieser eine Punkt gehört zum Sattelpunkt und fällt heraus.",
                missed:
                  "Ein Punkt der Kurve gehört zu einem Graphen ohne Extrempunkt. Denk an den Sonderfall aus Teil c und an den Kurvenpunkt, der dazu passt.",
              },
              label: "Ausgenommener Punkt",
              met: "Die Lösung gibt an, dass der Punkt (-1 | 2/e) der Kurve zu a = -1 gehört, wo nur ein Sattelpunkt vorliegt, und deshalb zu keinem Extrempunkt gehört. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig zugeordnet, links vom Sattelpunkt liegen die Hochpunkte.",
                missed:
                  "Vergleiche die Stellen der Hochpunkte aus Teil c mit dem ausgenommenen Punkt. Auf welcher Seite liegen sie immer?",
              },
              label: "Lage der Hochpunkte",
              met: "Die Lösung begründet über x1 = -1 - √(1 + a) < -1, dass die Hochpunkte auf dem Teil der Kurve mit x < -1 liegen.",
              points: 1,
            },
          ],
        },
        {
          kind: "extendedText",
          label: "f",
          points: 6,
          rubric: [
            {
              feedback: {
                earned:
                  "Gut, du hast die Ortskurve aus Teil e weiterverwendet.",
                missed:
                  "Du brauchst die Koordinaten des Hochpunkts. Die Stelle kennst du aus Teil c, die Höhe liefert dir die Ortskurve aus Teil e.",
              },
              label: "Lage des Hochpunkts",
              met: "Die Lösung verwendet den Hochpunkt H_a(u | -2u·e^u) mit u = -1 - √(1 + a) < -1, oder gleichwertig seine Koordinaten in a. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig, halbe Grundseite mal Höhe, sauber in einer Variablen.",
                missed:
                  "Das Dreieck hat beim Lotfußpunkt einen rechten Winkel. Die Grundseite ist der Abstand zum Ursprung, die Höhe der Funktionswert. Achte auf Beträge, denn die Stelle ist negativ.",
              },
              label: "Flächeninhalt als Funktion",
              met: "Die Lösung stellt den Flächeninhalt des Dreiecks als Funktion auf, etwa D(u) = 1/2 · |u| · (-2u·e^u) = u^2·e^u für u < -1, oder gleichwertig in a.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Stark, du hast den Kandidaten außerhalb des erlaubten Bereichs aussortiert.",
                missed:
                  "Leite deine Flächenfunktion ab und setze sie null. Prüfe danach jeden Kandidaten: Liegt er überhaupt dort, wo Hochpunkte liegen können?",
              },
              label: "Kandidaten im Definitionsbereich",
              met: "Die Lösung bestimmt D'(u) = (u^2 + 2u)·e^u = u(u + 2)·e^u, findet u = 0 und u = -2 und verwirft u = 0, weil u < -1 gelten muss. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Sehr gut, du hast auch an die Ränder gedacht, erst damit ist das Maximum global.",
                missed:
                  "Ein lokales Maximum reicht hier nicht. Schau, was die Flächenfunktion an beiden Rändern ihres Bereichs macht, und vergleiche mit deinem Kandidaten.",
              },
              label: "Begründung des globalen Maximums",
              met: "Die Lösung begründet das globale Maximum bei u = -2: Vorzeichenwechsel von D' von plus nach minus (oder D''(-2) < 0) und Vergleich mit den Rändern, D(u) gegen 0 für u gegen minus unendlich und D(u) gegen 1/e für u gegen -1, beide kleiner als 4/e^2.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig, die beste Stelle gehört zum Scharmitglied mit a gleich null.",
                missed:
                  "Übersetze die beste Stelle zurück in den Parameter: Setze sie in die Formel für die Stelle des Hochpunkts ein und löse nach a auf.",
              },
              label: "Zugehöriger Parameter",
              met: "Die Lösung bestimmt aus -1 - √(1 + a) = -2 den Wert a = 0. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned: "Genau, das ist der größte Flächeninhalt.",
                missed:
                  "Setze deine beste Stelle in die Flächenfunktion ein und gib den Wert exakt an, nicht nur gerundet.",
              },
              label: "Maximaler Flächeninhalt",
              met: "Die Lösung gibt den maximalen Flächeninhalt exakt als 4/e^2 (etwa 0,54) an. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
          ],
        },
        {
          expression:
            "2\\left(\\sqrt{a}-1\\right)e^{\\sqrt{a}}+2\\left(\\sqrt{a}+1\\right)e^{-\\sqrt{a}}",
          kind: "mathEntry",
          label: "g",
          points: 4,
        },
        {
          kind: "extendedText",
          label: "h",
          points: 6,
          rubric: [
            {
              feedback: {
                earned:
                  "Gut, eine unbegrenzte Fläche rechnest du als Grenzwert, genau so.",
                missed:
                  "Eine Fläche, die nach links nie endet, kannst du nicht direkt integrieren. Integriere bis zu einer beweglichen Grenze und lass sie dann nach links laufen.",
              },
              label: "Ansatz als Grenzwert",
              met: "Die Lösung setzt den Inhalt als Grenzwert an, B(a) = Grenzwert für r gegen minus unendlich des Integrals von r bis -√a über f_a(x), und nutzt, dass f_a dort positiv ist.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig, du hast die Stammfunktion aus Teil g eingesetzt und den Grenzwert sauber begründet.",
                missed:
                  "Setze die Stammfunktion aus Teil g an beiden Grenzen ein und begründe den Grenzwert für r gegen minus unendlich, statt unendlich einzusetzen.",
              },
              label: "Stammfunktion und Grenzwert",
              met: "Die Lösung wertet das Integral mit einer Stammfunktion F_a(x) = (x^2 - 2x + 2 - a)·e^x aus und begründet, dass F_a(r) für r gegen minus unendlich gegen 0 geht, weil e^r schneller gegen 0 geht, als das Polynom wächst. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig, die Fläche ist unendlich lang und hat trotzdem einen endlichen Inhalt.",
                missed:
                  "Setze die rechte Grenze in deine Stammfunktion ein und vereinfache. Es kommt für jedes a eine feste Zahl heraus.",
              },
              label: "Endlicher Inhalt",
              met: "Die Lösung erhält B(a) = 2(√a + 1)·e^(-√a) und stellt fest, dass der Inhalt endlich ist. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned: "Gut, beim Gleichsetzen fällt der gemeinsame Teil weg.",
                missed:
                  "Setze deine beiden Flächenterme gleich. Ein Summand steht auf beiden Seiten und hebt sich weg.",
              },
              label: "Gleichung aufstellen",
              met: "Die Lösung setzt B(a) = A(a) und vereinfacht zu 2(√a - 1)·e^(√a) = 0. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned: "Richtig, nur a gleich eins erfüllt die Bedingung.",
                missed:
                  "Ein Produkt ist null, wenn ein Faktor null ist. Welcher Faktor kann hier überhaupt null werden?",
              },
              label: "Lösung der Gleichung",
              met: "Die Lösung folgert mit e^(√a) > 0, dass √a = 1 und damit a = 1 ist, und prüft a > 0. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Stark, du hast begründet, dass die unbegrenzte Fläche genau zwischen null und eins überwiegt.",
                missed:
                  "Bilde die Differenz B minus A und prüfe das Vorzeichen des Faktors eins minus Wurzel a zusammen mit a größer null.",
              },
              label: "Bereich mit größerer unbegrenzter Fläche",
              met: "Die Lösung untersucht B(a) - A(a) = 2(1 - √a)·e^(√a) > 0 (oder vergleicht beide Terme direkt) und begründet mit a > 0, dass B(a) > A(a) genau für 0 < a < 1 gilt. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
          ],
        },
      ],
    },
  },
};

export default item;
