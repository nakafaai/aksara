import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "tone-attitude",
  },
  stimulus: "mangrove-carbon",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Menolak semua program penanaman karena mangrove dapat pulih sendiri.",
        },
        {
          correct: false,
          label:
            "Mendukung semua program penanaman tanpa syarat karena mangrove menyimpan banyak karbon.",
        },
        {
          correct: true,
          label:
            "Mendukung pemulihan, tetapi kritis terhadap penanaman yang mengabaikan lokasi dan jenis.",
        },
        {
          correct: false,
          label:
            "Tidak peduli terhadap berhasil atau gagalnya program penanaman mangrove.",
        },
        {
          correct: false,
          label:
            "Meragukan bahwa mangrove benar-benar berperan dalam menahan abrasi pantai.",
        },
      ],
    },
  },
};

export default item;
