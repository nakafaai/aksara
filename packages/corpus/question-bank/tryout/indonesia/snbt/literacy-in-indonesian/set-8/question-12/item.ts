import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "plot-function",
  },
  stimulus: "jamu-seller",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia merasa bosan karena buku kuliahnya terlalu sulit dipahami.",
        },
        {
          correct: true,
          label:
            "Ia sadar ibunya sudah lama menguasai takaran dan pantangan yang ia pelajari.",
        },
        {
          correct: false,
          label:
            "Ia ingin memastikan ibunya sudah tidur nyenyak sebelum ia kembali ke kota besok.",
        },
        {
          correct: false,
          label:
            "Ia memutuskan bahwa ilmu farmasi tidak berguna bagi penjual jamu.",
        },
        {
          correct: false,
          label: "Ia ingin membaca buku itu bersama ibunya pada sore hari.",
        },
      ],
    },
  },
};

export default item;
