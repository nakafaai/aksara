import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "explicit-information",
  },
  stimulus: "infiltration-well",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sumur warga terlalu dalam.",
        },
        {
          correct: true,
          label: "Sebagian besar halaman rumah sudah ditutup semen.",
        },
        {
          correct: false,
          label: "Kampung itu jarang diguyur hujan.",
        },
        {
          correct: false,
          label: "Selokan kampung tersumbat sampah.",
        },
        {
          correct: false,
          label: "Atap rumah warga bocor.",
        },
      ],
    },
  },
};

export default item;
