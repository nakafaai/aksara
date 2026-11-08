import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "pattern-interpretation",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Waktu mencair es selalu berkurang dengan selisih yang sama setiap kali suhu naik 5°C.",
        },
        {
          correct: false,
          label:
            "Pada suhu 45°C, es dengan ukuran yang sama pasti mencair tepat dalam 28 menit.",
        },
        {
          correct: false,
          label:
            "Es pada suhu 40°C mencair dalam waktu tepat setengah dari waktu pada suhu 20°C.",
        },
        {
          correct: false,
          label:
            "Kenaikan suhu ruang sama sekali tidak memengaruhi lamanya waktu yang dibutuhkan es untuk mencair.",
        },
        {
          correct: true,
          label:
            "Makin tinggi suhu, makin cepat es mencair, tetapi pengaruh tiap kenaikan 5°C makin kecil.",
        },
      ],
    },
  },
};

export default item;
