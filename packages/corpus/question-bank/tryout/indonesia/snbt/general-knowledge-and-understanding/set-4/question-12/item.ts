import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "pusaka",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "halus dan enak dipandang gerak-geriknya" },
        { correct: false, label: "mudah bergaul dengan siapa saja" },
        { correct: false, label: "longgar sehingga aturannya boleh dilanggar" },
        { correct: false, label: "mudah berubah sampai ke dasarnya" },
        {
          correct: true,
          label: "dapat menyesuaikan diri tanpa meninggalkan dasarnya",
        },
      ],
    },
  },
};

export default item;
