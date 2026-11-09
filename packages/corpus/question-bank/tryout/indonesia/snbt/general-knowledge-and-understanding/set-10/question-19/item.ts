import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "kunang",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kunang-kunang adalah sejenis lalat yang cahayanya berasal dari panas di dalam tubuhnya.",
        },
        {
          correct: true,
          label:
            "Kunang-kunang berpasangan lewat cahaya, tetapi terancam lampu dan hilangnya habitat.",
        },
        {
          correct: false,
          label:
            "Lampu jalan sebaiknya dimatikan di seluruh kota setiap malam demi menjaga kunang-kunang.",
        },
        {
          correct: false,
          label:
            "Larva kunang-kunang hanya dapat hidup di dalam air sungai yang dalam dan sangat jernih.",
        },
        {
          correct: false,
          label:
            "Enzim lusiferase menjadi satu-satunya penyebab berkurangnya jumlah kunang-kunang.",
        },
      ],
    },
  },
};

export default item;
