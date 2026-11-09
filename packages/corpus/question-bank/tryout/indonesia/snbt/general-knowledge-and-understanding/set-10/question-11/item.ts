import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "term-meaning",
  },
  stimulus: "bekantan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "terbagi menjadi beberapa ruang",
        },
        {
          correct: false,
          label: "berukuran sangat kecil dan sempit",
        },
        {
          correct: false,
          label: "dipenuhi oleh buah yang manis",
        },
        {
          correct: false,
          label: "mudah sekali terluka oleh daun",
        },
        {
          correct: false,
          label: "tidak dapat mencerna daun muda",
        },
      ],
    },
  },
};

export default item;
