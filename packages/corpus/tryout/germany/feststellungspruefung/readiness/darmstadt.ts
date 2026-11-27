import { defineAssessmentReadiness } from "#corpus/tryout/readiness/schema";

/**
 * Official schedule of the mathematics paper in the Feststellungsprüfung of
 * the T course at the Studienkolleg of TU Darmstadt. The Kolleg's Muster-FSP
 * of December 2024 gives 180 minutes, a non-graphing, non-programmable
 * calculator, a monolingual dictionary and one handwritten A4 formula sheet,
 * and three Aufgaben of 38, 4 and 21 points. The examination rules of 2017
 * give three hours for the written paper and make the final grade of each
 * subject the mean of the course grade (Vornote), the written grade and, where
 * one is held, the oral grade. So the written paper, the course grade and the
 * oral exam weigh one each. The oral exam is held only when the written grade
 * and the course grade differ by more than two grades or on request, and the
 * course grade comes from the course itself: this try-out includes neither.
 * The player offers no dictionary, the Muster-FSP is "nur eine Auswahl" of
 * possible tasks, and the Kolleg publishes no conversion from points to
 * grades.
 */
export const tuDarmstadtFspReadiness = defineAssessmentReadiness({
  countryKey: "germany",
  evidence: [
    {
      key: "tu-darmstadt-fsp",
      label: "Feststellungsprüfung T-Kurs, Studienkolleg der TU Darmstadt",
      retrievedAt: "2026-11-20",
      url: "https://www.stk.tu-darmstadt.de/schwerpunktkurse_stk/tkurs_stk/feststellungspruefungt_stk/index.de.jsp",
    },
    {
      key: "tu-darmstadt-fsp-sample",
      label:
        "Muster-FSP Mathematik, Dezember 2024, Studienkolleg der TU Darmstadt",
      retrievedAt: "2026-11-20",
      url: "https://www.stk.tu-darmstadt.de/media/stk/beispieleprfungen/2024-12_MusterFSP_Ma.pdf",
    },
    {
      key: "tu-darmstadt-rules",
      label:
        "Prüfungsordnung des Studienkollegs der TU Darmstadt, in Kraft seit 1. August 2017",
      retrievedAt: "2026-11-20",
      url: "https://www.stk.tu-darmstadt.de/media/stk/Pruefungsordnung_August_2017.pdf",
    },
  ],
  examKey: "feststellungspruefung",
  excluded: [
    {
      key: "course-grade",
      weight: {
        provenance: { evidenceKey: "tu-darmstadt-rules", kind: "official" },
        value: 1,
      },
    },
    {
      key: "oral-exam",
      weight: {
        provenance: { evidenceKey: "tu-darmstadt-rules", kind: "official" },
        value: 1,
      },
    },
  ],
  sections: [
    {
      aids: {
        provenance: {
          evidenceKey: "tu-darmstadt-fsp-sample",
          kind: "official",
        },
        value: ["calculator-scientific", "formula-sheet"],
      },
      key: "tu-darmstadt-fsp-mathematics",
      order: 1,
      questionCount: {
        provenance: {
          evidenceKey: "tu-darmstadt-fsp-sample",
          kind: "official",
        },
        value: 3,
      },
      questionPoints: {
        provenance: {
          evidenceKey: "tu-darmstadt-fsp-sample",
          kind: "official",
        },
        value: [38, 4, 21],
      },
      timeLimitSeconds: {
        provenance: {
          evidenceKey: "tu-darmstadt-fsp-sample",
          kind: "official",
        },
        value: 10_800,
      },
      totalPoints: {
        provenance: {
          evidenceKey: "tu-darmstadt-fsp-sample",
          kind: "official",
        },
        value: 63,
      },
      weight: {
        provenance: { evidenceKey: "tu-darmstadt-rules", kind: "official" },
        value: 1,
      },
    },
  ],
  sourceRevision: "2026-11-20",
  trackKey: "tu-darmstadt-fsp-mathematics",
});
