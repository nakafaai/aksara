import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "daily-relevance",
  },
  stimulus: "classroom-noise",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "melarang siswa berbicara selama berada di dalam aula",
        },
        {
          correct: false,
          label:
            "mengganti pengeras suara di aula dengan pengeras suara yang lebih keras",
        },
        {
          correct: true,
          label:
            "menempatkan bahan lembut seperti kain atau gabus pada dinding yang paling banyak memantulkan bunyi",
        },
        {
          correct: false,
          label: "mengecat ulang dinding aula agar permukaannya lebih licin",
        },
        {
          correct: false,
          label:
            "mengukur gaung hanya ketika aula penuh agar hasilnya terlihat kecil",
        },
      ],
    },
  },
};

export default item;
