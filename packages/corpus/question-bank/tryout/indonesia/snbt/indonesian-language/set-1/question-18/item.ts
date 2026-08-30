import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Nama ibu kandungnya" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Tempat kelahirannya" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Tahun kelahirannya" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Identitas ayah biologisnya" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Nama keluarga asuhnya" }],
        },
      ],
    },
  },
};

export default item;
