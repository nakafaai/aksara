import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "scheduling",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Kegiatan D",
        },
        {
          correct: false,
          label: "Kegiatan A",
        },
        {
          correct: false,
          label: "Kegiatan B",
        },
        {
          correct: false,
          label: "Kegiatan C",
        },
        {
          correct: false,
          label: "Tidak dapat ditentukan",
        },
      ],
    },
  },
};

export default item;
