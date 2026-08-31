import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Bewertenden verwenden ein Raster, das vor Kenntnis der Identitäten oder Endergebnisse festgelegt wurde.",
        },
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
            "Das Team prüft die Originalaufzeichnung, ihre Herkunft und ihre Änderungshistorie, bevor es sie verwendet.",
        },
        {
          isCorrect: true,
          label:
            "Die Behauptung stützt sich auf wiederholte Beobachtungen und Messungen statt nur auf Vermutungen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Reviewers use a rubric set before they know participant identities or final outcomes.",
        },
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
            "The team checks the original record, its provenance, and its change history before using it.",
        },
        {
          isCorrect: true,
          label:
            "The claim is built from repeated observations and measurements rather than assumption alone.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Penilai memakai rubrik yang ditetapkan sebelum mengetahui identitas peserta atau hasil akhirnya.",
        },
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
            "Tim memeriksa rekaman asli beserta asal dan riwayat perubahannya sebelum menggunakannya.",
        },
        {
          isCorrect: true,
          label:
            "Klaim disusun dari pengamatan berulang dan hasil pengukuran, bukan dari dugaan semata.",
        },
      ],
    },
  },
};

export default item;
