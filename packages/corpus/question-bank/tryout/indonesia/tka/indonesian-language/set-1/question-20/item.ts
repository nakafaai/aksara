import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "lega karena ketekunan Mira akhirnya menjamin Seno akan pulang",
        },
        {
          isCorrect: false,
          label:
            "kecewa karena pertunjukan tanpa dua pemain dianggap kehilangan makna",
        },
        {
          isCorrect: true,
          label:
            "terharu karena Mira mengubah harapan akan kepulangan menjadi kekuatan untuk tetap tampil",
        },
        {
          isCorrect: false,
          label:
            "marah karena Pak Damar mempertahankan kursi kosong ketika Seno tidak hadir",
        },
        {
          isCorrect: false,
          label:
            "cemas karena Mira memilih berhenti berlatih setelah panggilan Seno",
        },
      ],
    },
  },
  stimulusKey: "seat-seven",
};

export default item;
