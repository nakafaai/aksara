import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "jamu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "dibuat dari resep keluarga yang diwariskan turun-temurun",
        },
        {
          correct: true,
          label: "sudah diuji secara klinis pada manusia",
        },
        {
          correct: false,
          label: "lebih murah daripada jamu dan obat herbal terstandar",
        },
        {
          correct: false,
          label: "tidak pernah diuji pada hewan percobaan",
        },
        {
          correct: false,
          label: "hanya dibuat dari kunyit dan temulawak",
        },
      ],
    },
  },
};

export default item;
