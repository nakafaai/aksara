import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Alle Teilnehmenden wählten Tee mit Zuckerzusatz.",
        },
        {
          isCorrect: false,
          label: "Alle Teetrinkenden gaben Zucker hinzu.",
        },
        {
          isCorrect: false,
          label: "Niemand trank Tee ohne Zuckerzusatz.",
        },
        {
          isCorrect: false,
          label: "Alle Teilnehmenden, die ein Getränk wählten, wählten Tee.",
        },
        {
          isCorrect: true,
          label: "Mindestens eine Person trank Tee ohne Zuckerzusatz.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every participant chose tea with added sugar.",
        },
        {
          isCorrect: false,
          label: "Every tea drinker added sugar.",
        },
        {
          isCorrect: false,
          label: "No participant drank tea without added sugar.",
        },
        {
          isCorrect: false,
          label: "Every participant who chose a drink chose tea.",
        },
        {
          isCorrect: true,
          label: "At least one participant drank tea without added sugar.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Setiap peserta memilih teh dengan tambahan gula.",
        },
        {
          isCorrect: false,
          label: "Setiap peminum teh menambahkan gula.",
        },
        {
          isCorrect: false,
          label: "Tidak ada peserta yang meminum teh tanpa tambahan gula.",
        },
        {
          isCorrect: false,
          label: "Setiap peserta yang memilih minuman memilih teh.",
        },
        {
          isCorrect: true,
          label:
            "Sekurang-kurangnya satu peserta meminum teh tanpa tambahan gula.",
        },
      ],
    },
  },
};

export default item;
