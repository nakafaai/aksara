import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "seat-seven",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "ia tetap menyiapkan kursi ketujuh sebelum setiap latihan dan pertunjukan",
        },
        {
          correct: false,
          label: "ia hampir menyimpan biolanya",
        },
        {
          correct: false,
          label: "telepon Seno sempat tidak aktif",
        },
        {
          correct: true,
          label: "ia mampu menyelesaikan pertunjukan meski Seno belum pulang",
        },
        {
          correct: false,
          label: "Pak Damar berdiri di pintu",
        },
      ],
    },
  },
};

export default item;
