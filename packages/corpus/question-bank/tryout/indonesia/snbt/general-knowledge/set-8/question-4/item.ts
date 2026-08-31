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
            "Dieselbe Kodierregel wird auf jede Gruppe und jeden Messzeitraum angewendet.",
        },
        {
          isCorrect: true,
          label:
            "Das Instrument wird geprüft, damit sein Wert tatsächlich das beabsichtigte Konstrukt abbildet.",
        },
        {
          isCorrect: false,
          label:
            "Einheiten, Rundungsregeln und Kategoriengrenzen werden vor Beginn der Erfassung festgelegt.",
        },
        {
          isCorrect: false,
          label:
            "Die Bewertenden verwenden ein Raster, das vor Kenntnis der Identitäten oder Endergebnisse festgelegt wurde.",
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
            "The same coding rule is applied to every group and every measurement period.",
        },
        {
          isCorrect: true,
          label:
            "The instrument is tested to ensure that its score represents the construct it is meant to measure.",
        },
        {
          isCorrect: false,
          label:
            "Units, rounding rules, and category boundaries are defined before recording begins.",
        },
        {
          isCorrect: false,
          label:
            "Reviewers use a rubric set before they know participant identities or final outcomes.",
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
            "Aturan pengodean yang sama diterapkan pada setiap kelompok dan setiap waktu pengukuran.",
        },
        {
          isCorrect: true,
          label:
            "Instrumen diuji untuk memastikan bahwa skor benar-benar mewakili konsep yang hendak diukur.",
        },
        {
          isCorrect: false,
          label:
            "Satuan, aturan pembulatan, dan batas setiap kategori ditetapkan sebelum pencatatan dimulai.",
        },
        {
          isCorrect: false,
          label:
            "Penilai memakai rubrik yang ditetapkan sebelum mengetahui identitas peserta atau hasil akhirnya.",
        },
      ],
    },
  },
};

export default item;
