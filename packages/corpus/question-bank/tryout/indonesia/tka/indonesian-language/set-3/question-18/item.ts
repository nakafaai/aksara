import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "meaning-relations",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Rafi diam-diam menulis banyak not baru",
        },
        {
          isCorrect: false,
          label: "penonton sudah memenuhi ruang konser",
        },
        {
          isCorrect: false,
          label: "Ayu tidak lagi memainkan cello",
        },
        {
          isCorrect: true,
          label: "diam diisi oleh perhatian dan kesediaan menunggu",
        },
        {
          isCorrect: false,
          label: "pelatih mengganti seluruh partitur",
        },
      ],
    },
  },
  stimulusKey: "empty-measure",
};

export default item;
