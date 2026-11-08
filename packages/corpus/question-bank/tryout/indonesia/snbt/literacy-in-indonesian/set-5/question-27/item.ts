import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "pollinators",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bunga durian terlalu kecil dan rumit bentuknya untuk dimasuki lebah madu.",
        },
        {
          correct: false,
          label:
            "Lebah madu bersarang di gua yang jaraknya puluhan kilometer dari kebun.",
        },
        {
          correct: false,
          label:
            "Kelelawar pemakan nektar mengusir lebah madu dari bunga-bunga durian.",
        },
        {
          correct: true,
          label:
            "Bunga durian mekar menjelang malam, ketika lebah sudah kembali ke sarangnya.",
        },
        {
          correct: false,
          label:
            "Nektar bunga durian terlalu sedikit untuk menarik lebah madu.",
        },
      ],
    },
  },
};

export default item;
