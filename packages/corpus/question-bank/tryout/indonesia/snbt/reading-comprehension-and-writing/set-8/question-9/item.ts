import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "punctuation",
  },
  stimulus: "infiltration-well",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Air hujan yang jatuh di halaman, langsung mengalir ke selokan, karena sebagian besar halaman rumah sudah ditutup semen.",
        },
        {
          correct: false,
          label:
            "Air hujan, yang jatuh di halaman langsung mengalir ke selokan karena sebagian besar halaman rumah sudah ditutup semen.",
        },
        {
          correct: false,
          label:
            "Air hujan yang jatuh di halaman langsung mengalir ke selokan, karena sebagian besar halaman rumah sudah ditutup semen.",
        },
        {
          correct: false,
          label:
            "Air hujan yang jatuh di halaman langsung, mengalir ke selokan karena sebagian besar halaman rumah sudah ditutup semen.",
        },
        {
          correct: true,
          label:
            "Air hujan yang jatuh di halaman langsung mengalir ke selokan karena sebagian besar halaman rumah sudah ditutup semen.",
        },
      ],
    },
  },
};

export default item;
