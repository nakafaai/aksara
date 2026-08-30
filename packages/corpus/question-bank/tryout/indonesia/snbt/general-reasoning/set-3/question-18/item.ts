import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Alle Teilnehmenden wählten Tee mit Zuckerzusatz.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Alle Teetrinkenden gaben Zucker hinzu." },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Niemand trank Tee ohne Zuckerzusatz." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Mindestens eine Person trank Tee ohne Zuckerzusatz.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Alle Teilnehmenden, die ein Getränk wählten, wählten Tee.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every participant chose tea with added sugar.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Every tea drinker added sugar." }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "No participant drank tea without added sugar.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "At least one participant drank tea without added sugar.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every participant who chose a drink chose tea.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Setiap peserta memilih teh dengan tambahan gula.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Setiap peminum teh menambahkan gula." },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tidak ada peserta yang meminum teh tanpa tambahan gula.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Sekurang-kurangnya satu peserta meminum teh tanpa tambahan gula.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Setiap peserta yang memilih minuman memilih teh.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
