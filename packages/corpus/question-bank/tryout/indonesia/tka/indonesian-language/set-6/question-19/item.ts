import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "wrong-hem",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kesal karena Tika merasa dipermalukan oleh pesan itu",
        },
        {
          correct: false,
          label: "sedih karena Tika takut kembali ke penjahit itu",
        },
        {
          correct: false,
          label: "khawatir karena celana Tika masih kepanjangan",
        },
        {
          correct: true,
          label:
            "ikut senang karena Tika menerima nasihat itu dengan senang hati dan ingin selalu mengingatnya",
        },
        {
          correct: false,
          label: "heran karena pesan itu tidak berhubungan dengan celana",
        },
      ],
    },
  },
};

export default item;
