import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "contextual-meaning",
  },
  stimulus: "cabai",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "masa ketika pasokan cabai di pasar sedang sedikit",
        },
        {
          correct: false,
          label: "masa ketika pasar cabai sepi pembeli",
        },
        {
          correct: false,
          label: "musim kemarau ketika tanaman cabai kekurangan air",
        },
        {
          correct: false,
          label: "masa ketika harga semua bahan pangan naik bersamaan",
        },
        {
          correct: false,
          label: "masa sulit ketika harga cabai anjlok dan petani merugi",
        },
      ],
    },
  },
};

export default item;
