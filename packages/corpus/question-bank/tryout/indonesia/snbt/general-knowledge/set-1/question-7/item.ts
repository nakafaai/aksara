import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "kata *menemukan* pada kalimat (3).",
        },
        {
          isCorrect: false,
          label: "kata *hidup* pada kalimat (4).",
        },
        {
          isCorrect: true,
          label: "kata *penelitian* pada kalimat (6).",
        },
        {
          isCorrect: false,
          label: "kata *sampel* pada kalimat (5).",
        },
        {
          isCorrect: false,
          label: "kata *beredar* pada kalimat (8).",
        },
      ],
    },
  },
};

export default item;
