import { defineAssessmentReadiness } from "#corpus/tryout/readiness";

/** Current official TKA structure plus explicitly editorial set sizing. */
export const tkaReadiness = defineAssessmentReadiness({
  countryKey: "indonesia",
  evidence: [
    {
      key: "tka-framework",
      label: "Kerangka Asesmen TKA SMA, MA, SMK, dan MAK",
      retrievedAt: "2026-08-30",
      url: "https://pusmendik.kemendikdasmen.go.id/tka/page/download_file/370807_44",
    },
    {
      key: "tka-pedoman-2026",
      label: "Kepmendikdasmen Nomor 56 Tahun 2026",
      retrievedAt: "2026-08-30",
      url: "https://pusmendik.kemendikdasmen.go.id/tka/page/download_file/336200_46",
    },
  ],
  examKey: "tka",
  sections: [
    {
      blueprint: {
        cognitiveLevels: [
          { editorialMinimum: 12, key: "knowledge-understanding" },
          { editorialMinimum: 16, key: "application" },
          { editorialMinimum: 12, key: "reasoning" },
        ],
        contentDomains: [
          { editorialMinimum: 4, key: "numbers" },
          { editorialMinimum: 14, key: "algebra" },
          { editorialMinimum: 10, key: "geometry-measurement" },
          { editorialMinimum: 8, key: "data-probability" },
          { editorialMinimum: 4, key: "trigonometry" },
        ],
        evidenceKey: "tka-framework",
        groupedStimulusEditorialMinimum: 4,
        responseMinimums: [
          { editorialMinimum: 32, kind: "single-choice" },
          { editorialMinimum: 4, kind: "multiple-choice" },
          { editorialMinimum: 4, kind: "category" },
        ],
        topics: [
          {
            contentDomain: "numbers",
            editorialMinimum: 4,
            key: "real-numbers",
          },
          {
            contentDomain: "algebra",
            editorialMinimum: 5,
            key: "linear-equations-inequalities",
          },
          {
            contentDomain: "algebra",
            editorialMinimum: 5,
            key: "functions",
          },
          {
            contentDomain: "algebra",
            editorialMinimum: 4,
            key: "sequences-series",
          },
          {
            contentDomain: "geometry-measurement",
            editorialMinimum: 3,
            key: "geometry-objects",
          },
          {
            contentDomain: "geometry-measurement",
            editorialMinimum: 3,
            key: "geometry-transformations",
          },
          {
            contentDomain: "geometry-measurement",
            editorialMinimum: 4,
            key: "measurement",
          },
          {
            contentDomain: "trigonometry",
            editorialMinimum: 4,
            key: "trigonometric-ratios",
          },
          {
            contentDomain: "data-probability",
            editorialMinimum: 4,
            key: "data",
          },
          {
            contentDomain: "data-probability",
            editorialMinimum: 4,
            key: "probability",
          },
        ],
      },
      key: "mathematics",
      order: 1,
      questionCount: {
        provenance: { kind: "editorial" },
        value: 40,
      },
      timeLimitSeconds: {
        provenance: {
          evidenceKey: "tka-pedoman-2026",
          kind: "official",
        },
        value: 3000,
      },
    },
  ],
  sourceRevision: "2026-08-30",
  trackKey: "mathematics",
});
