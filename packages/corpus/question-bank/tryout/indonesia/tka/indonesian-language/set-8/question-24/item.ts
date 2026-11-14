import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "electric-bus",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "bus listrik memiliki kekurangan berupa harga mahal, penggantian baterai, dan jarak tempuh yang berkurang saat cuaca panas",
        },
        {
          correct: false,
          label: "bus listrik lebih murah daripada bus solar dalam segala hal",
        },
        {
          correct: false,
          label: "pendingin udara membuat bus listrik melaju lebih cepat",
        },
        {
          correct: false,
          label: "baterai bus listrik tidak pernah perlu diganti",
        },
        {
          correct: false,
          label: "harga bus solar dua kali lipat harga bus listrik",
        },
      ],
    },
  },
};

export default item;
