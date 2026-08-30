import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: [{ kind: "text", text: "Proyek tanggul" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Tambrauw" }] },
        { isCorrect: false, label: [{ kind: "text", text: "Pantai" }] },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Kampung Pesisir Werur" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Kawasan pesisir Papua Barat Daya" }],
        },
      ],
    },
  },
};

export default item;
