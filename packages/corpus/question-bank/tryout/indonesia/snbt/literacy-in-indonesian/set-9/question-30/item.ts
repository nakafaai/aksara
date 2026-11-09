import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "explicit-information",
  },
  stimulus: "film-review",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Tokoh ibu hanya muncul dalam satu adegan di awal film.",
        },
        {
          correct: true,
          label:
            "Ia muncul di banyak adegan, tetapi pikirannya tidak pernah ditunjukkan.",
        },
        {
          correct: false,
          label: "Pemeran tokoh ibu baru pertama kali berakting dalam film.",
        },
        {
          correct: false,
          label:
            "Tokoh ibu tidak pernah ikut menonton lomba layang-layang bersama Bima.",
        },
        {
          correct: false,
          label: "Tokoh ibu menentang Bima menjual layang-layang di lapangan.",
        },
      ],
    },
  },
};

export default item;
