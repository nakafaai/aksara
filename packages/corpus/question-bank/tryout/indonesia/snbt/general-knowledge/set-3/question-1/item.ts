import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Quelle, Methode und Datenweg können unabhängig geprüft werden, bevor die Behauptung akzeptiert wird.",
        },
        {
          isCorrect: false,
          label:
            "Das Instrument wird geprüft, damit sein Wert tatsächlich das beabsichtigte Konstrukt abbildet.",
        },
        {
          isCorrect: false,
          label:
            "Die Bewertenden verwenden ein Raster, das vor Kenntnis der Identitäten oder Endergebnisse festgelegt wurde.",
        },
        {
          isCorrect: true,
          label:
            "Das Team verwirft eine ansprechende Grafik, weil sie die Forschungsfrage nicht beantwortet.",
        },
        {
          isCorrect: false,
          label:
            "Das Team legt Daten, Methoden, Ausschlussgründe und Grenzen offen, damit der Prozess geprüft werden kann.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The source, method, and data trail can be checked independently before the claim is accepted.",
        },
        {
          isCorrect: false,
          label:
            "The instrument is tested to ensure that its score represents the construct it is meant to measure.",
        },
        {
          isCorrect: false,
          label:
            "Reviewers use a rubric set before they know participant identities or final outcomes.",
        },
        {
          isCorrect: true,
          label:
            "The team rejects an attractive chart because it does not answer the research question.",
        },
        {
          isCorrect: false,
          label:
            "The team discloses data, methods, exclusion reasons, and limitations so the process can be examined.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sumber, metode, dan jejak data dapat diperiksa secara mandiri sebelum klaim diterima.",
        },
        {
          isCorrect: false,
          label:
            "Instrumen diuji untuk memastikan bahwa skor benar-benar mewakili konsep yang hendak diukur.",
        },
        {
          isCorrect: false,
          label:
            "Penilai memakai rubrik yang ditetapkan sebelum mengetahui identitas peserta atau hasil akhirnya.",
        },
        {
          isCorrect: true,
          label:
            "Tim menolak grafik yang menarik karena grafik itu tidak menjawab pertanyaan penelitian.",
        },
        {
          isCorrect: false,
          label:
            "Tim membuka data, metode, alasan pengecualian, dan keterbatasan agar proses dapat diperiksa.",
        },
      ],
    },
  },
};

export default item;
