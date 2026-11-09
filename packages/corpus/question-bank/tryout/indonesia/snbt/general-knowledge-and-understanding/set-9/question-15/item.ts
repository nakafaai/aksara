import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "application",
  },
  stimulus: "tempe",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "tempe dibiarkan terlalu lama sehingga kapang membentuk spora",
        },
        {
          correct: false,
          label: "kedelai sudah direbus sampai matang sebelum diberi ragi",
        },
        {
          correct: true,
          label: "bungkusnya tertutup rapat sehingga kapang kekurangan udara",
        },
        {
          correct: false,
          label: "kulit ari kedelai sudah dikupas sebelum kedelai direbus",
        },
        {
          correct: false,
          label: "ragi yang ditaburkan berisi spora kapang *Rhizopus*",
        },
      ],
    },
  },
};

export default item;
