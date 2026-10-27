import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kata *menemukan* pada kalimat (3).",
        },
        {
          correct: false,
          label: "kata *hidup* pada kalimat (4).",
        },
        {
          correct: true,
          label: "kata *penelitian* pada kalimat (6).",
        },
        {
          correct: false,
          label: "kata *sampel* pada kalimat (5).",
        },
        {
          correct: false,
          label: "kata *beredar* pada kalimat (8).",
        },
      ],
    },
  },
};

export default item;
