import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "main-supporting-ideas",
  },
  stimulus: "training-wheels",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Raras merasa konyol karena sepeda birunya terlalu kecil",
        },
        {
          correct: false,
          label: "Arga menurunkan sadel agar sepeda dapat melaju lebih cepat",
        },
        {
          correct: false,
          label: "Raras bermain otopet selama setengah jam di lapangan",
        },
        {
          correct: false,
          label: "Raras langsung bisa mengayuh tanpa jatuh pada hari pertama",
        },
        {
          correct: true,
          label:
            "Arga melatih keseimbangan Raras lebih dahulu sebelum mengajarinya mengayuh",
        },
      ],
    },
  },
};

export default item;
