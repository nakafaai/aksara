import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Tim membandingkan rata-rata 28, 20, dan 22, membatasi simpulan pada rekaman tanpa pengulangan teknis selama uji singkat, serta merencanakan uji dengan lebih banyak tim dan aturan pencatatan yang sama.",
        },
        {
          correct: false,
          label:
            "Karena 28 lebih tinggi daripada 20 dan 22, tim menyatakan seluruh mutu rekaman meningkat dan menerapkan daftar pemeriksaan secara permanen.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan 28, 20, dan 22 serta merencanakan uji dengan lebih banyak tim tanpa membatasi cakupan simpulan.",
        },
        {
          correct: false,
          label:
            "Tim membatasi simpulan pada pengulangan teknis dan merencanakan uji lanjutan tanpa melaporkan perbandingan hasil.",
        },
        {
          correct: false,
          label:
            "Nilai 28, 20, dan 22 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pencatatan pengulangan.",
        },
      ],
    },
  },
};

export default item;
