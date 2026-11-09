import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "reading",
    topic: "inference",
  },
  stimulus: "indigo-batik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Harga batik berwarna sintetis naik menjadi dua kali lipat.",
        },
        {
          correct: false,
          label: "Waktu membuat sehelai batik menjadi lebih singkat.",
        },
        {
          correct: false,
          label: "Wisatawan berhenti datang ke Desa Sidoluhur.",
        },
        {
          correct: false,
          label: "Kebun warga kekurangan pupuk.",
        },
        {
          correct: true,
          label: "Air sungai di Desa Sidoluhur menjadi lebih bersih.",
        },
      ],
    },
  },
};

export default item;
