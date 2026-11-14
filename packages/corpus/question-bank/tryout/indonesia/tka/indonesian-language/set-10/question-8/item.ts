import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "grandma-recipe",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kesal karena nastar itu terlalu keras untuk dimakan",
        },
        {
          correct: false,
          label: "geli karena Ibu kepanasan setelah makan nastar",
        },
        {
          correct: true,
          label:
            "terharu karena rasa nastar itu menghadirkan kembali kenangan tentang Nenek",
        },
        { correct: false, label: "cemas karena Ibu sedang sakit" },
        {
          correct: false,
          label:
            "kecewa karena nastar itu sama sekali tidak mirip buatan Nenek",
        },
      ],
    },
  },
};

export default item;
