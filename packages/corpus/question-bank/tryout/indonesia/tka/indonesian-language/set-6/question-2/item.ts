import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "child-helmets",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "program pinjam helm terbukti menyelamatkan nyawa anak-anak",
        },
        {
          correct: true,
          label:
            "pemakaian helm meningkat, tetapi data itu belum menunjukkan berkurangnya kecelakaan atau cedera",
        },
        {
          correct: false,
          label: "petugas puskesmas menolak program pinjam helm",
        },
        {
          correct: false,
          label: "jumlah anak yang dibonceng sepeda motor naik pada bulan Mei",
        },
        {
          correct: false,
          label: "semua anak sudah mengencangkan tali helm dengan benar",
        },
      ],
    },
  },
};

export default item;
