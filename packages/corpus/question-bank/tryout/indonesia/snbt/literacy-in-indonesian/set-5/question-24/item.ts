import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "wayang-school",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penonton masa kini tidak lagi mengenal alur pokok lakon Mahabharata.",
        },
        {
          correct: true,
          label:
            "Goro-goro tidak terikat pada alur pokok sehingga dalang bebas mengisinya.",
        },
        {
          correct: false,
          label:
            "Semar adalah dewa sehingga nasihatnya wajib didengar oleh semua penonton.",
        },
        {
          correct: false,
          label:
            "Pertunjukan yang singkat memberi waktu lebih banyak untuk memberi nasihat.",
        },
        {
          correct: false,
          label:
            "UNESCO mewajibkan setiap pertunjukan wayang memuat pesan pendidikan.",
        },
      ],
    },
  },
};

export default item;
