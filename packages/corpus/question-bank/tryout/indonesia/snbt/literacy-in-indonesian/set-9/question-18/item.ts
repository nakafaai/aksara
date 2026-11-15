import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "tutoring-scores",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Brosur salah menghitung, karena selisih nilai Februari kedua kelompok kurang dari $$10$$ poin, dan tabel pertama menunjukkannya.",
        },
        {
          correct: false,
          label:
            "Siswa yang tidak ikut juga naik, sehingga bimbingan terbukti tidak berpengaruh sama sekali, dan tabel pertama menunjukkan kenaikan $$9$$ poin.",
        },
        {
          correct: true,
          label:
            "Siswa bimbingan sudah unggul $$7$$ poin sebelum bimbingan dimulai, dan tabel kedua menunjukkan bahwa dengan titik awal sama, selisih kenaikannya hanya $$2$$ poin.",
        },
        {
          correct: false,
          label:
            "Siswa bimbingan sudah unggul $$7$$ poin sebelum bimbingan dimulai, dan tabel kedua menunjukkan bahwa dengan titik awal sama, selisih kenaikannya $$11$$ poin.",
        },
        {
          correct: false,
          label:
            "Kelompok bimbingan lebih sedikit siswanya, sehingga rata-ratanya tidak dapat dibandingkan sama sekali, dan tabel pertama menunjukkan $$120$$ banding $$180$$ siswa.",
        },
      ],
    },
  },
};

export default item;
