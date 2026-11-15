import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "bus-ridership",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Koridor C dan Koridor D, dengan anggapan bus yang lebih sering tidak menambah penumpang sama sekali di koridor mana pun.",
        },
        {
          correct: true,
          label:
            "Koridor C dan Koridor D, dengan anggapan penumpang Koridor A dan B menanggapi tarif murah dengan cara yang sama seperti penumpang Koridor C dan D.",
        },
        {
          correct: false,
          label:
            "Total semua koridor, dengan anggapan semua koridor mendapat perubahan yang sama dari pemerintah kota.",
        },
        {
          correct: false,
          label:
            "Koridor A dan Koridor B, dengan anggapan bus yang lebih sering hanya menambah penumpang di koridor yang ramai.",
        },
        {
          correct: false,
          label:
            "Koridor C dan Koridor D, dengan anggapan setiap penumpang di sana membayar tarif penuh satu kali per hari.",
        },
      ],
    },
  },
};

export default item;
