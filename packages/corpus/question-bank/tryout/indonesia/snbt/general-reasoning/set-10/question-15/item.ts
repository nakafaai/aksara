import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Einige Forschungssammlungen sind keine öffentlichen Datensätze.",
        },
        {
          isCorrect: false,
          label: "Alle Forschungssammlungen sind verschlüsselt.",
        },
        {
          isCorrect: false,
          label: "Einige öffentliche Datensätze sind verschlüsselte Archive.",
        },
        {
          isCorrect: false,
          label: "Jeder Datensatz mit Schlüssel ist ein Forschungsbestand.",
        },
        {
          isCorrect: false,
          label: "Kein Forschungsbestand ist öffentlich.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Some research collections are not public datasets.",
        },
        {
          isCorrect: false,
          label: "Every research collection is encrypted.",
        },
        {
          isCorrect: false,
          label: "Some public datasets are encrypted archives.",
        },
        {
          isCorrect: false,
          label: "Every dataset requiring a key is a research collection.",
        },
        {
          isCorrect: false,
          label: "No research collection is public.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Sebagian koleksi riset bukan dataset publik.",
        },
        {
          isCorrect: false,
          label: "Semua koleksi riset terenkripsi.",
        },
        {
          isCorrect: false,
          label: "Sebagian dataset publik merupakan arsip terenkripsi.",
        },
        {
          isCorrect: false,
          label: "Setiap dataset yang memerlukan kunci adalah koleksi riset.",
        },
        {
          isCorrect: false,
          label: "Tidak ada koleksi riset yang bersifat publik.",
        },
      ],
    },
  },
};

export default item;
