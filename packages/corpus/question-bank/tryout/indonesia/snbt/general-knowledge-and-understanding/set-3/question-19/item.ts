import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "koperasi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Bunga simpanan yang tampak kecil tidak berarti hasilnya kecil, sebab bunga yang dibiarkan masuk ke saldo membuat selisihnya dengan bunga tunggal terus melebar.",
        },
        {
          correct: false,
          label:
            "Bunga simpanan sukarela per bulan memang kecil, sehingga hasilnya baru terasa jika setoran awalnya besar.",
        },
        {
          correct: false,
          label:
            "Bunga majemuk dihitung dari saldo yang sudah ditambah bunga, sedangkan bunga tunggal selalu dihitung dari setoran awal.",
        },
        {
          correct: false,
          label:
            "Dalam dua bulan, bunga majemuk hanya menghasilkan $$\\text{Rp}100$$ lebih banyak daripada bunga tunggal.",
        },
        {
          correct: false,
          label:
            "Bunga majemuk lebih menguntungkan penyimpan daripada bunga tunggal sejak bulan pertama.",
        },
      ],
    },
  },
};

export default item;
