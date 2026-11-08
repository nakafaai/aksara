import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "spatial-reasoning",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Rumah Dedi berada di sebelah timur laut rumah Budi.",
        },
        {
          correct: false,
          label: "Rumah Dedi berada tepat di sebelah selatan rumah Ani.",
        },
        {
          correct: false,
          label: "Rumah Budi berada di sebelah barat laut rumah Dedi.",
        },
        {
          correct: true,
          label: "Rumah Cici berada di sebelah timur laut rumah Budi.",
        },
        {
          correct: false,
          label:
            "Rumah Ani dan rumah Dedi berada pada satu garis utara dan selatan.",
        },
      ],
    },
  },
};

export default item;
