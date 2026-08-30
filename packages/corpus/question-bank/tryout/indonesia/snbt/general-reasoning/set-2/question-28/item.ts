import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Wenn keine Trockenzeit ist, werfen die Pflanzen ihre Blätter nicht ab.",
        },
        {
          isCorrect: false,
          label:
            "Wenn keine Trockenzeit ist, werfen die Pflanzen ihre Blätter ab.",
        },
        {
          isCorrect: false,
          label: "Wenn sich nicht viel Laub am Boden sammelt, ist Trockenzeit.",
        },
        {
          isCorrect: false,
          label:
            "Wenn Trockenzeit ist, sammelt sich möglicherweise viel Laub am Boden.",
        },
        {
          isCorrect: true,
          label: "Wenn Trockenzeit ist, sammelt sich viel Laub am Boden.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "If it is currently not the dry season, then plants will not shed their leaves",
        },
        {
          isCorrect: false,
          label:
            "If it is currently not the dry season, then plants will shed their leaves",
        },
        {
          isCorrect: false,
          label:
            "If there is currently not much scattered leaf litter, then it is currently the dry season",
        },
        {
          isCorrect: false,
          label:
            "If it is currently the dry season, then there might be a lot of scattered leaf litter",
        },
        {
          isCorrect: true,
          label:
            "If it is currently the dry season, then there is a lot of scattered leaf litter",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Jika saat ini sedang tidak musim kemarau maka tumbuh-tumbuhan tidak akan meranggas",
        },
        {
          isCorrect: false,
          label:
            "Jika saat ini sedang tidak musim kemarau maka tumbuh-tumbuhan akan meranggas",
        },
        {
          isCorrect: false,
          label:
            "Jika saat ini tidak banyak sampah daun maka sekarang sedang musim kemarau",
        },
        {
          isCorrect: false,
          label:
            "Jika saat ini sedang musim kemarau maka bisa saja banyak sampah daun berserakan",
        },
        {
          isCorrect: true,
          label:
            "Jika saat ini sedang musim kemarau maka banyak sampah daun berserakan",
        },
      ],
    },
  },
};

export default item;
