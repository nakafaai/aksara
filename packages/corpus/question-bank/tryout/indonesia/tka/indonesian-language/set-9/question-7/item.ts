import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "old-uniform",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Ibu Damar mengecilkan bagian pinggang seragam.",
        },
        {
          correct: true,
          label: "Damar melipat tangan di atas meja untuk menutupi noda tinta.",
        },
        {
          correct: false,
          label: "Damar mengambil buku catatan fisika milik Galih.",
        },
        {
          correct: true,
          label:
            "Damar bicara cepat lalu langsung duduk saat memperkenalkan diri.",
        },
      ],
    },
  },
};

export default item;
