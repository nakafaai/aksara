import { defineAssessmentReadiness } from "#corpus/tryout/readiness/schema";

/**
 * Official schedule of the TU Darmstadt entrance mathematics test. The
 * admissions page gives about 40 minutes and the topic areas; the Kolleg's
 * sample states 8 tasks with six options each and 40 minutes. The admissions
 * procedure also has a German C-test, which this try-out does not include,
 * and the Kolleg publishes no points, so the paper scores raw.
 */
export const tuDarmstadtEntranceReadiness = defineAssessmentReadiness({
  countryKey: "germany",
  evidence: [
    {
      key: "tu-darmstadt-admission",
      label: "Aufnahmeverfahren T- und G-Kurs, Studienkolleg der TU Darmstadt",
      retrievedAt: "2026-11-08",
      url: "https://www.stk.tu-darmstadt.de/schwerpunktkurse_stk/tkurs_stk/aufnahmeverfahren_tkurs_stk/index.de.jsp",
    },
    {
      key: "tu-darmstadt-sample",
      label: "Beispiel eines Mathematik Tests, Studienkolleg der TU Darmstadt",
      retrievedAt: "2026-11-08",
      url: "https://www.stk.tu-darmstadt.de/media/stk/beispieleprfungen/atmatbeispiel.pdf",
    },
  ],
  examKey: "entrance-examination",
  sections: [
    {
      key: "tu-darmstadt-mathematics",
      order: 1,
      questionCount: {
        provenance: { evidenceKey: "tu-darmstadt-sample", kind: "official" },
        value: 8,
      },
      timeLimitSeconds: {
        provenance: { evidenceKey: "tu-darmstadt-sample", kind: "official" },
        value: 2400,
      },
    },
  ],
  sourceRevision: "2026-11-08",
  trackKey: "tu-darmstadt-studienkolleg",
});
