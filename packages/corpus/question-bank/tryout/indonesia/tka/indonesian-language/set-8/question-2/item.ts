import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "meaning-relations",
  },
  stimulus: "sea-sasi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "ukuran lola yang besar membuat warga memperpanjang masa larangan",
        },
        {
          correct: false,
          label: "masa larangan membuat lola yang dipanen menjadi lebih kecil",
        },
        {
          correct: false,
          label: "ukuran lola tidak berhubungan dengan masa larangan",
        },
        {
          correct: true,
          label:
            "masa larangan memberi siput waktu untuk tumbuh sehingga lola yang dipanen lebih besar",
        },
        {
          correct: false,
          label:
            "lola menjadi besar karena perahu dari luar daerah tidak datang",
        },
      ],
    },
  },
};

export default item;
