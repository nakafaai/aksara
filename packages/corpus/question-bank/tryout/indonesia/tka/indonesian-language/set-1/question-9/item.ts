import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "ia memantulkan cahaya dengan cermin hingga bantuan datang",
        },
        {
          isCorrect: false,
          label: "orang-orang mengira ia menjaga kebiasaan lama",
        },
        {
          isCorrect: false,
          label: "garis laut berubah gelap",
        },
        {
          isCorrect: false,
          label: "ketua kampung memujinya pada pagi hari",
        },
        {
          isCorrect: false,
          label: "lampu lama diletakkan di rak dermaga",
        },
      ],
    },
  },
  stimulusKey: "harbor-lamp",
};

export default item;
