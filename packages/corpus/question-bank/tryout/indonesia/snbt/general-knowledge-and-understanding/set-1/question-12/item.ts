import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "paragraph-relation",
  },
  stimulus: "bahasa",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Paragraf pertama menjelaskan tanda bahasa terancam punah, sedangkan paragraf kedua menawarkan upaya untuk mengatasinya.",
        },
        {
          correct: false,
          label:
            "Paragraf pertama menyebutkan akibat, sedangkan paragraf kedua menyebutkan penyebabnya.",
        },
        {
          correct: false,
          label:
            "Paragraf pertama menyampaikan pendapat, sedangkan paragraf kedua membantah pendapat itu.",
        },
        {
          correct: false,
          label:
            "Paragraf pertama dan kedua menceritakan peristiwa secara berurutan menurut waktu.",
        },
        {
          correct: false,
          label:
            "Paragraf pertama memberikan contoh, sedangkan paragraf kedua menyimpulkan contoh itu.",
        },
      ],
    },
  },
};

export default item;
