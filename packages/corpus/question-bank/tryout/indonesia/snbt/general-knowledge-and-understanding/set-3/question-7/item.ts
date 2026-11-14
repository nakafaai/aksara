import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "kedelai",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "dihitung setelah nitrogen yang ikut terangkut keluar saat panen dikurangkan",
        },
        {
          correct: false,
          label:
            "murni berasal dari udara, tidak termasuk nitrogen yang diserap dari tanah",
        },
        {
          correct: false,
          label: "tidak mencemari tanah karena bebas dari zat yang kotor",
        },
        {
          correct: false,
          label: "diberikan dengan tulus tanpa mengharapkan imbalan",
        },
        {
          correct: false,
          label: "tidak bercampur dengan nitrogen yang berasal dari pupuk urea",
        },
      ],
    },
  },
};

export default item;
