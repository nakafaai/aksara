import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "dramatische Veränderung." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "rasante Entwicklung." }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Veränderung von Viruslinien über Generationen hinweg.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Veränderung, die schnell erfolgt." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Wachstum." }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "dramatic change." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "rapid development." }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "change in viral lineages across generations.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "change that occurs rapidly." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "growth." }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "perubahan secara dramatis." }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "perkembangan yang pesat." }],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "perubahan garis keturunan virus dari generasi ke generasi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "perubahan yang terjadi secara cepat." },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "pertumbuhan." }],
        },
      ],
    },
  },
};

export default item;
