import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "generalization",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Semua jembatan yang berada di pesisir mengalami karat berat.",
        },
        {
          correct: false,
          label:
            "Umur jembatan tidak berpengaruh terhadap munculnya karat berat.",
        },
        {
          correct: false,
          label:
            "Lokasi jembatan hanya berpengaruh pada jembatan beton bertulang.",
        },
        {
          correct: false,
          label:
            "Jembatan baja yang berumur kurang dari $$20$$ tahun tidak mengalami karat berat, sedangkan jembatan baja yang berumur lebih tua selalu mengalami karat berat.",
        },
        {
          correct: true,
          label:
            "Jembatan baja di pesisir mengalami karat berat, sedangkan jembatan baja di pedalaman baru mengalami karat berat setelah berumur lebih tua.",
        },
      ],
    },
  },
};

export default item;
