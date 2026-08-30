import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kereta seremonial" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kedai makanan siap saji Romawi" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Lukisan dinding erotis" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Perbudakan dan kerja paksa" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kampanye pemilihan umum" }],
        },
      ],
    },
  },
};

export default item;
