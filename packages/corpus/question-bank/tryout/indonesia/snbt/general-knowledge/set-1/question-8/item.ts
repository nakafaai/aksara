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
          isCorrect: true,
          label: "Veränderung von Viruslinien über Generationen hinweg.",
        },
        {
          isCorrect: false,
          label: "Veränderung, die schnell erfolgt.",
        },
        {
          isCorrect: false,
          label: "Wachstum.",
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
          isCorrect: true,
          label: "change in viral lineages across generations.",
        },
        {
          isCorrect: false,
          label: "change that occurs rapidly.",
        },
        {
          isCorrect: false,
          label: "growth.",
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
          isCorrect: true,
          label: "perubahan garis keturunan virus dari generasi ke generasi.",
        },
        {
          isCorrect: false,
          label: "perubahan yang terjadi secara cepat.",
        },
        {
          isCorrect: false,
          label: "pertumbuhan.",
        },
      ],
    },
  },
};

export default item;
