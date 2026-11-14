import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "flaw",
  },
  stimulus: "pengayaan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kepala sekolah tidak memperhitungkan bahwa pada Januari peserta sudah unggul $$4$$ poin atas siswa yang tidak mendaftar.",
        },
        {
          correct: false,
          label:
            "Kepala sekolah seharusnya membandingkan peserta dengan seluruh $$120$$ siswa yang tidak mengikuti kelas tambahan sehingga efek kelas itu sekitar $$6{,}5$$ poin.",
        },
        {
          correct: false,
          label:
            "Kelompok pembanding yang dipakai kepala sekolah hanya berisi $$30$$ siswa, separuh dari banyak peserta, sehingga rata-rata kedua kelompok tidak dapat dibandingkan.",
        },
        {
          correct: true,
          label:
            "Efek $$5$$ poin hanya diukur pada siswa yang mau mendaftar, padahal kelas wajib tahun depan juga diikuti siswa seperti $$90$$ siswa yang tahun ini tidak mendaftar.",
        },
        {
          correct: false,
          label:
            "Kepala sekolah mengabaikan bahwa pendaftar yang tidak mendapat tempat juga naik $$3$$ poin.",
        },
      ],
    },
  },
};

export default item;
