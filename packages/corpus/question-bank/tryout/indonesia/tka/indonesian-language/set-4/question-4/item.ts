import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "loanwords",
  },
  stimulus: "solar-lamps",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kelompok ahli yang diminta menilai hasil pemasangan lampu",
        },
        {
          correct: false,
          label: "papan pengumuman yang dipasang di balai desa",
        },
        { correct: false, label: "kotak logam yang menyimpan baterai lampu" },
        {
          correct: true,
          label:
            "lempeng penangkap cahaya matahari yang dipasang di puncak tiang",
        },
        {
          correct: false,
          label: "tombol yang mengatur waktu menyala dan padamnya lampu",
        },
      ],
    },
  },
};

export default item;
