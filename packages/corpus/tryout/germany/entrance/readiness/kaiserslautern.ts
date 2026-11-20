import { defineAssessmentReadiness } from "#corpus/tryout/readiness/schema";

/**
 * Official schedule of the mathematics paper in the Aufnahmeprüfung of the
 * Internationales Studienkolleg at Hochschule Kaiserslautern. The Kolleg's
 * page gives 60 minutes, word problems at Abitur level and no aids; its
 * examination rules give a percentage scale with a pass at 50 % and rank
 * German and mathematics two to one. The number of tasks is not published, so
 * the 20 tasks are an editorial choice. The Aufnahmeprüfung also has a German
 * C-test, which this try-out does not include.
 */
export const kaiserslauternEntranceReadiness = defineAssessmentReadiness({
  countryKey: "germany",
  evidence: [
    {
      key: "hs-kaiserslautern-admission",
      label:
        "Aufnahmeprüfung, Internationales Studienkolleg der Hochschule Kaiserslautern",
      retrievedAt: "2026-11-20",
      url: "https://www.hs-kl.de/international/internationales-studienkolleg/aufnahmepruefung",
    },
    {
      key: "hs-kaiserslautern-rules",
      label:
        "Ordnung über die Aufnahme- und Feststellungsprüfung am Internationalen Studienkolleg der Hochschule Kaiserslautern vom 25.10.2024",
      retrievedAt: "2026-11-20",
      url: "https://www.hs-kl.de/fileadmin/stabsstelle-recht/LESE_PO_ISK.pdf",
    },
  ],
  examKey: "entrance-examination",
  sections: [
    {
      key: "hs-kaiserslautern-mathematics",
      order: 1,
      questionCount: {
        provenance: { kind: "editorial" },
        value: 20,
      },
      timeLimitSeconds: {
        provenance: {
          evidenceKey: "hs-kaiserslautern-admission",
          kind: "official",
        },
        value: 3600,
      },
    },
  ],
  sourceRevision: "2026-11-20",
  trackKey: "hs-kaiserslautern-mathematics",
});
