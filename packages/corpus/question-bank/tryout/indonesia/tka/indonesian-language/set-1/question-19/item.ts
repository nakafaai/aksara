import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "ia tetap menyiapkan kursi ketujuh sebelum setiap latihan dan pertunjukan",
        },
        {
          isCorrect: false,
          label: "ia hampir menyimpan biolanya",
        },
        {
          isCorrect: false,
          label: "telepon Seno sempat tidak aktif",
        },
        {
          isCorrect: true,
          label: "ia mampu menyelesaikan pertunjukan meski Seno belum pulang",
        },
        {
          isCorrect: false,
          label: "Pak Damar berdiri di pintu",
        },
      ],
    },
  },
  stimulusKey: "seat-seven",
};

export default item;
