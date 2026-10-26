import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "harbor-lamp",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "ia memantulkan cahaya dengan cermin hingga bantuan datang",
        },
        {
          correct: false,
          label: "orang-orang mengira ia menjaga kebiasaan lama",
        },
        {
          correct: false,
          label: "garis laut berubah gelap",
        },
        {
          correct: false,
          label: "ketua kampung memujinya pada pagi hari",
        },
        {
          correct: false,
          label: "lampu lama diletakkan di rak dermaga",
        },
      ],
    },
  },
};

export default item;
