import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim membandingkan rata-rata 28, 20, dan 22, membatasi simpulan pada rekaman tanpa pengulangan teknis selama uji singkat, serta merencanakan uji dengan lebih banyak tim dan aturan pencatatan yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Karena 28 lebih tinggi daripada 20 dan 22, tim menyatakan seluruh mutu rekaman meningkat dan menerapkan daftar pemeriksaan secara permanen.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan 28, 20, dan 22 serta merencanakan uji dengan lebih banyak tim tanpa membatasi cakupan simpulan.",
        },
        {
          isCorrect: false,
          label:
            "Tim membatasi simpulan pada pengulangan teknis dan merencanakan uji lanjutan tanpa melaporkan perbandingan hasil.",
        },
        {
          isCorrect: false,
          label:
            "Nilai 28, 20, dan 22 tidak menunjukkan pola yang relevan sehingga tim akan mengubah aturan pencatatan pengulangan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
