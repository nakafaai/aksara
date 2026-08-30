import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Nama ibu kandungnya",
        },
        {
          isCorrect: false,
          label: "Tempat kelahirannya",
        },
        {
          isCorrect: false,
          label: "Tahun kelahirannya",
        },
        {
          isCorrect: true,
          label: "Identitas ayah biologisnya",
        },
        {
          isCorrect: false,
          label: "Nama keluarga asuhnya",
        },
      ],
    },
  },
};

export default item;
