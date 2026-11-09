import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "wall-clock",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "tidak tahu cara membetulkan jarum jam dinding",
        },
        {
          correct: true,
          label: "ingin menjaga kenangan tentang Kakek apa adanya",
        },
        {
          correct: false,
          label: "ingin membeli jam baru yang lebih tepat waktunya",
        },
        {
          correct: false,
          label: "kesal karena jam itu selalu terlambat setiap hari",
        },
        {
          correct: false,
          label: "menganggap waktu tidak penting dalam hidupnya",
        },
      ],
    },
  },
};

export default item;
