import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "dramatische Veränderung.",
        },
        {
          isCorrect: false,
          label: "rasante Entwicklung.",
        },
        {
          isCorrect: false,
          label: "Veränderung, die schnell erfolgt.",
        },
        {
          isCorrect: false,
          label: "Wachstum.",
        },
        {
          isCorrect: true,
          label: "Veränderung von Viruslinien über Generationen hinweg.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "dramatic change.",
        },
        {
          isCorrect: false,
          label: "rapid development.",
        },
        {
          isCorrect: false,
          label: "change that occurs rapidly.",
        },
        {
          isCorrect: false,
          label: "growth.",
        },
        {
          isCorrect: true,
          label: "change in viral lineages across generations.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "perubahan secara dramatis.",
        },
        {
          isCorrect: false,
          label: "perkembangan yang pesat.",
        },
        {
          isCorrect: false,
          label: "perubahan yang terjadi secara cepat.",
        },
        {
          isCorrect: false,
          label: "pertumbuhan.",
        },
        {
          isCorrect: true,
          label: "perubahan garis keturunan virus dari generasi ke generasi.",
        },
      ],
    },
  },
};

export default item;
