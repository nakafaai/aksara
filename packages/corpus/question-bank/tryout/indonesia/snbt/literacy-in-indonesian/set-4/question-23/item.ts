import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "balai-pustaka",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menilai sebuah klub sepak bola hanya dari trofinya keliru, karena yang lebih penting adalah banyaknya penonton yang datang ke stadion.",
        },
        {
          correct: false,
          label:
            "Menilai sebuah klub sepak bola hanya dari pemain yang dicoretnya lebih tepat, karena di situlah watak asli klub itu tampak.",
        },
        {
          correct: false,
          label:
            "Menilai sebuah klub sepak bola dari trofi maupun pemain yang dicoret sama-sama tidak perlu, karena klub sebaiknya tidak dinilai sama sekali.",
        },
        {
          correct: false,
          label:
            "Menilai sebuah klub sepak bola hanya dari trofinya sama kelirunya dengan menilainya hanya dari stadionnya, karena keduanya tidak berhubungan dengan pemain.",
        },
        {
          correct: true,
          label:
            "Menilai sebuah klub sepak bola hanya dari trofinya sama kelirunya dengan menilainya hanya dari pemain yang dicoretnya, karena keduanya hasil dari cara klub memilih pemain.",
        },
      ],
    },
  },
};

export default item;
