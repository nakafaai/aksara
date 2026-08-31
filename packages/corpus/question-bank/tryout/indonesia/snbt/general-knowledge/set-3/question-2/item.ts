import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Wiederholte Messungen bleiben trotz unterschiedlicher Erfassungszeiten in einem engen Bereich.",
        },
        {
          isCorrect: false,
          label:
            "Das Instrument wird geprüft, damit sein Wert tatsächlich das beabsichtigte Konstrukt abbildet.",
        },
        {
          isCorrect: false,
          label:
            "Die Daten werden nach einer geplanten Schrittfolge erhoben, die mit denselben Regeln wiederholt wird.",
        },
        {
          isCorrect: false,
          label:
            "Die Bewertenden verwenden ein Raster, das vor Kenntnis der Identitäten oder Endergebnisse festgelegt wurde.",
        },
        {
          isCorrect: true,
          label:
            "Einheiten, Rundungsregeln und Kategoriengrenzen werden vor Beginn der Erfassung festgelegt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Repeated measurements remain within a narrow range even when taken at different times.",
        },
        {
          isCorrect: false,
          label:
            "The instrument is tested to ensure that its score represents the construct it is meant to measure.",
        },
        {
          isCorrect: false,
          label:
            "Data are collected through a planned sequence of steps repeated under the same rules.",
        },
        {
          isCorrect: false,
          label:
            "Reviewers use a rubric set before they know participant identities or final outcomes.",
        },
        {
          isCorrect: true,
          label:
            "Units, rounding rules, and category boundaries are defined before recording begins.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Nilai pengukuran berulang tetap berada dalam rentang sempit meskipun waktu pengambilan berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Instrumen diuji untuk memastikan bahwa skor benar-benar mewakili konsep yang hendak diukur.",
        },
        {
          isCorrect: false,
          label:
            "Data dikumpulkan menurut urutan langkah yang direncanakan dan diulang dengan aturan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Penilai memakai rubrik yang ditetapkan sebelum mengetahui identitas peserta atau hasil akhirnya.",
        },
        {
          isCorrect: true,
          label:
            "Satuan, aturan pembulatan, dan batas setiap kategori ditetapkan sebelum pencatatan dimulai.",
        },
      ],
    },
  },
};

export default item;
