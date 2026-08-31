import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Der begrenzte Test beweist, dass Gebühren in jedem Fall abgeschafft werden müssen.",
        },
        {
          isCorrect: false,
          label:
            "Der Erfolg der Regel wird vor allem durch die Höhe der Gebühreneinnahmen bestimmt.",
        },
        {
          isCorrect: false,
          label:
            "Einige Nutzer erhielten wegen geänderter Telefonnummern keine Nachricht.",
        },
        {
          isCorrect: false,
          label:
            "Der Test wird um zwei Erinnerungswege und ein Einspruchsverfahren erweitert.",
        },
        {
          isCorrect: true,
          label:
            "Abgestufte Sperren und Erinnerungen können gerechter sein, doch Kommunikationswege und Ausnahmen müssen weiter geprüft werden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The limited trial proves that fines must be removed in every circumstance.",
        },
        {
          isCorrect: false,
          label:
            "Policy success is determined mainly by how much fine revenue is collected.",
        },
        {
          isCorrect: false,
          label:
            "Some users did not receive messages because their phone numbers had changed.",
        },
        {
          isCorrect: false,
          label:
            "The trial will expand with two reminder channels and an appeal process.",
        },
        {
          isCorrect: true,
          label:
            "Graduated restrictions and reminders may be fairer, but communication channels and exceptions still require testing.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Uji terbatas membuktikan bahwa denda harus dihapus untuk semua keadaan.",
        },
        {
          isCorrect: false,
          label:
            "Keberhasilan kebijakan terutama ditentukan oleh banyaknya uang denda yang berhasil dikumpulkan.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian pengguna tidak menerima pesan karena nomor telepon berubah.",
        },
        {
          isCorrect: false,
          label:
            "Uji akan diperluas dengan dua saluran pengingat dan proses banding.",
        },
        {
          isCorrect: true,
          label:
            "Sanksi bertahap dan pengingat berpotensi lebih adil, tetapi jalur komunikasi dan pengecualian masih perlu diuji.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
