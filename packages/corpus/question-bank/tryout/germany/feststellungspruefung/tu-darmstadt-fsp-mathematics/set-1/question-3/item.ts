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
                  "Gut, über den parallelen Seitenvektor hast du die vierte Ecke direkt getroffen.",
                missed:
                  "In einem Parallelogramm sind gegenüberliegende Seitenvektoren gleich. Addiere den Vektor von B nach C zu A.",
              },
              label: "Vierte Ecke des Quadrats",
              met: "Die Lösung bestimmt D = A + BC = (0 | -3 | 3) (oder über den Mittelpunkt M von AC).",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig, gleich lange Seiten und ein rechter Winkel machen das Parallelogramm zum Quadrat.",
                missed:
                  "Prüfe zwei Dinge am Parallelogramm: Sind zwei Nachbarseiten gleich lang, und ist ihr Skalarprodukt gleich null?",
              },
              label: "Nachweis des Quadrats",
              met: "Die Lösung zeigt |AB| = |BC| = 6 und einen rechten Winkel über AB · BC = 8 - 16 + 8 = 0.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Sauber, Normalenvektor gekürzt und Punkt eingesetzt, die Ebenengleichung steht.",
                missed:
                  "Bilde das Kreuzprodukt zweier Seitenvektoren als Normalenvektor und setze einen Eckpunkt ein, um die rechte Seite zu bestimmen.",
              },
              label: "Koordinatengleichung der Ebene",
              met: "Die Lösung bestimmt einen Normalenvektor über das Kreuzprodukt (oder zwei Skalarprodukte), vereinfacht zu (2, -1, 2) (oder Vielfachem) und erhält E: 2x - y + 2z = 9.",
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
                  "Gut, aus Symmetriegründen liegen Spitze und Kugelmittelpunkt auf derselben Lotgeraden durch M.",
                missed:
                  "Bestimme zuerst den Quadratmittelpunkt M und seinen Abstand zu einer Ecke. Spitze und Kugelmittelpunkt liegen auf dem Lot durch M.",
              },
              label: "Mittelpunkt und halbe Diagonale",
              met: "Die Lösung bestimmt M(1 | 1 | 4) und den Abstand |MA| = √18 = 3√2 sowie die Achse M + u·(2, -1, 2) für die Spitze und den Kugelmittelpunkt. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Stark, du hast beide möglichen Höhen gefunden und keine der zwei Wurzeln übersehen.",
                missed:
                  "Drücke den Abstand des Kugelmittelpunkts zu A und zur Spitze über seine Höhe z_K aus und löse die quadratische Gleichung nach beiden positiven Höhen.",
              },
              label: "Beide möglichen Höhen",
              met: "Die Lösung stellt die Umkugelbedingung z_K^2 + 18 = 4,5^2 (oder (h^2 + 18)/(2h) = 4,5) auf und findet beide positiven Höhen h = 3 und h = 6. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Genau, erst der Blick auf das Vorzeichen der Höhe über der Grundfläche trennt die beiden Kugeln.",
                missed:
                  "Prüfe für jede gefundene Höhe, auf welcher Seite der Grundebene der Kugelmittelpunkt liegt. Nur zwischen null und h liegt er in der Pyramide.",
              },
              label: "Auswahl über das Innere",
              met: "Die Lösung begründet, dass für h = 3 der Kugelmittelpunkt bei z_K = -1,5 unterhalb der Grundebene E und damit außerhalb der Pyramide liegt, während er für h = 6 bei z_K = 1,5 (0 < 1,5 < 6) im Inneren der Pyramide liegt. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig, beide Punkte sitzen sauber auf der Lotgeraden durch M.",
                missed:
                  "Geh von M aus um h beziehungsweise z_K entlang des normierten Normalenvektors in Richtung des erlaubten Halbraums.",
              },
              label: "Koordinaten von Spitze und Mittelpunkt",
              met: "Die Lösung berechnet mit dem Einheitsnormalenvektor (2, -1, 2)/3 die Koordinaten S(5 | -1 | 8) und K(2 | 0,5 | 5). Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
          ],
        },
        {
          kind: "numericEntry",
          label: "c",
          points: 3,
          unit: "°",
          value: "101.5",
        },
        {
          kind: "extendedText",
          label: "d",
          points: 4,
          rubric: [
            {
              feedback: {
                earned:
                  "Sauber gezeigt, die beiden Geraden sind weder parallel noch schneiden sie sich.",
                missed:
                  "Zeig zwei Dinge: Die Richtungsvektoren sind keine Vielfachen voneinander, und das Gleichungssystem für einen Schnittpunkt hat keine Lösung.",
              },
              label: "Nachweis der Windschiefe",
              met: "Die Lösung stellt die Richtungsvektoren AS = (7, -2, 1) und BD = (-2, -8, -2) auf, zeigt, dass sie nicht kollinear sind, und weist nach, dass sich die Geraden AS und BD nicht schneiden (Widerspruch im Gleichungssystem oder Abstand > 0).",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Gut, du hast genau den Punkt gefunden, an dem die Verbindungsstrecke auf beiden Geraden senkrecht steht.",
                missed:
                  "Die Dreieckshöhe ist am kleinsten am Fußpunkt des gemeinsamen Lots. Setze einen Punkt auf AS und einen auf BD an und verlange rechte Winkel zu beiden Richtungen.",
              },
              label: "Gemeinsames Lot und Fußpunkt",
              met: "Die Lösung bestimmt den Fußpunkt T0 = (1/3 | 1/3 | 22/3) (Parameter λ = 1/3 auf AS) und M(1 | 1 | 4) auf BD über die Orthogonalität des Verbindungsvektors zu beiden Richtungen (oder Abstandsfunktion). Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Stark, du hast geprüft, dass das Minimum wirklich auf der endlichen Kante liegt und nicht außerhalb.",
                missed:
                  "Ein Punkt auf der Geraden AS liegt nur auf der Kante, wenn sein Parameter zwischen null und eins liegt. Prüfe das für deinen Fußpunkt.",
              },
              label: "Lage auf der Kante",
              met: "Die Lösung begründet über 0 ≤ λ = 1/3 ≤ 1, dass T0 tatsächlich auf der Kante AS liegt (und M als Quadratmittelpunkt auf BD). Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig, halbe Diagonale mal kürzeste Höhe ergibt sauber den exakten Minimalwert.",
                missed:
                  "Multipliziere die halbe Länge der Grundseite BD mit dem kürzesten Abstand und vereinfache das Produkt der Wurzeln exakt.",
              },
              label: "Kleinster Flächeninhalt",
              met: "Die Lösung berechnet |BD| = 6√2 und |M T0| = 2√3 und erhält F_min = 1/2 · 6√2 · 2√3 = 6√6. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
          ],
        },
        {
          kind: "extendedText",
          label: "e",
          points: 4,
          rubric: [
            {
              feedback: {
                earned:
                  "Gut, du hast den Parameter bestimmt und sofort gemerkt, dass t kleiner als zwei sein muss.",
                missed:
                  "Schneide den Lichtstrahl durch S mit der Ebene E und prüfe, für welche t der Strahl von S aus wirklich nach unten zur Ebene läuft.",
              },
              label: "Schnitt des Strahls mit der Ebene",
              met: "Die Lösung setzt S + μ·(-1, 2, t) in E ein, erhält μ = 9/(2 - t) für t ≠ 2 und hält fest, dass Licht von oberhalb der Ebene μ > 0, also t < 2 verlangt.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Richtig, durch Vergleich der Koordinaten siehst du, dass der Schatten immer auf der Geraden BC bleibt.",
                missed:
                  "Vergleiche deinen Schattenpunkt mit einem allgemeinen Punkt auf der Geraden durch B und C. Löse eine Zeile nach μ auf und prüfe die zweite.",
              },
              label: "Lage auf der Geraden durch die Kante",
              met: "Die Lösung vergleicht den Schattenpunkt (5 - μ | -1 + 2μ | 8 + μt) mit B + σ(C - B), erhält μ = 3 - 2σ und zeigt, dass die y-Zeile immer erfüllt ist, sodass der Schatten stets auf der Geraden BC liegt.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Sauber gelöst, genau zwischen minus sieben und minus eins wandert der Schatten von C nach B.",
                missed:
                  "Auf der Kante gilt null kleiner gleich σ kleiner gleich eins. Nutze t kleiner zwei für das Vorzeichen des Nenners und löse beide Ungleichungen.",
              },
              label: "Intervall für die Grundkante",
              met: "Die Lösung drückt σ = -3(1 + t)/(2(2 - t)) (oder t in σ) aus, nutzt 0 ≤ σ ≤ 1 zusammen mit t < 2 und erhält genau -7 ≤ t ≤ -1. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Schön geometrisch begründet: Wenn S' auf dem Rand des Quadrats liegt, bleiben alle Kantenschatten darin.",
                missed:
                  "Überleg dir, wohin die vier Seitenkanten projiziert werden. Wo liegen die Verbindungsstrecken von einem Punkt der Kante BC zu allen vier Ecken?",
              },
              label: "Kein Schatten außerhalb der Grundfläche",
              met: "Die Lösung begründet, dass der Schatten der Pyramide aus der Grundfläche und den Schatten der Seitenkanten (den Strecken vom Schattenpunkt S' zu A, B, C, D) besteht und jede dieser Strecken im Quadrat bleibt, weil S' auf der Kante BC des konvexen Quadrats liegt. Folgefehler zählt: richtig mit dem eigenen Zwischenergebnis, solange die Aufgabe dadurch nicht wesentlich leichter wird.",
              points: 1,
            },
          ],
        },
        {
          expression: "\\frac{3\\left(\\sqrt{5}-1\\right)}{2}",
          kind: "mathEntry",
          label: "f",
          points: 3,
        },
      ],
    },
  },
};

export default item;
