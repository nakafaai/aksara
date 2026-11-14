import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "strengthening",
  },
  stimulus: "pengayaan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Peserta yang menghadiri lebih dari $$90\\%$$ pertemuan naik rata-rata $$10$$ poin, sedangkan peserta lainnya naik rata-rata $$5$$ poin.",
        },
        {
          correct: false,
          label:
            "Kenaikan rata-rata peserta jauh lebih besar daripada kenaikan rata-rata seluruh $$120$$ siswa yang tidak mengikuti kelas tambahan.",
        },
        {
          correct: true,
          label:
            "Panitia menentukan $$60$$ peserta dengan mengundi nama seluruh pendaftar.",
        },
        {
          correct: false,
          label:
            "Sebagian pendaftar yang tidak mendapat tempat mengikuti bimbingan belajar berbayar di luar sekolah selama Februari sampai April.",
        },
        {
          correct: false,
          label:
            "Panitia memberikan tempat kepada pendaftar yang paling dahulu mengembalikan formulir pendaftaran.",
        },
      ],
    },
  },
};

export default item;
