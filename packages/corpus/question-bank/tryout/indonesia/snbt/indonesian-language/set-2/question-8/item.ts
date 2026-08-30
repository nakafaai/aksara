import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [{ kind: "text", text: "Uwet mencoba mengambil buah ceri" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Uwet berkebun di bawah pohon ceri" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Uwet mencari siput" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Uwet menangkap siput" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Uwet menunggu kedatangan Enjin dan Ensi" },
          ],
        },
      ],
    },
  },
};

export default item;
