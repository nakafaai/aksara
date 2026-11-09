import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "training-wheels",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Arga menaikkan sadel sedikit pada minggu berikutnya.",
        },
        {
          correct: true,
          label:
            "Arga mengajak Raras ke lapangan voli yang selalu sepi pada pagi hari.",
        },
        {
          correct: false,
          label: "Arga membersihkan luka Raras dengan air dari botol minum.",
        },
        {
          correct: true,
          label:
            "Arga berkata bahwa di tempat latihan *juga tidak ada penonton*.",
        },
      ],
    },
  },
};

export default item;
