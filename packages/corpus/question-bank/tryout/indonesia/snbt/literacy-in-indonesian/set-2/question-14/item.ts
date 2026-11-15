import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "minimum-wage",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Laba turun $$10\\%$$, dan harga perlu naik $$4\\%$$." },
        { correct: false, label: "Laba turun $$80\\%$$, dan harga perlu naik $$10\\%$$." },
        { correct: false, label: "Laba turun $$20\\%$$, dan harga perlu naik $$4\\%$$." },
        { correct: true, label: "Laba turun $$80\\%$$, dan harga perlu naik $$4\\%$$." },
        { correct: false, label: "Laba turun $$80\\%$$, dan harga perlu naik $$40\\%$$." },
      ],
    },
  },
};

export default item;
