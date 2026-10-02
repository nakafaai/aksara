import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Karena kondisi perubahan menghasilkan $$68$$, sedangkan nilai awal $$46$$ dan pembanding $$44$$, susunan kerikil, pasir, dan arang dengan ketebalan sama telah terisolasi sebagai satu-satunya penyebab selama volume awal, jenis wadah, dan lama pengendapan dibuat sama.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan paling informatif sebaiknya mengubah volume awal, jenis wadah, dan lama pengendapan bersamaan dengan susunan kerikil, pasir, dan arang dengan ketebalan sama agar gabungan kondisi yang lebih realistis dapat diuji.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa kejernihan visual tidak membuktikan bahwa air aman diminum memengaruhi ketelitian angka, tetapi tidak memengaruhi luas penerapan temuan tentang model penyaringan air keruh.",
        },
        {
          isCorrect: true,
          label:
            "Pada kondisi yang diuji, penyaringan berkaitan dengan rata-rata cahaya yang lewat sebesar $$68$$ persen, dibandingkan $$46$$ persen pada kondisi awal dan $$44$$ persen pada pembanding. Pola kejernihan perlu diuji ulang, sedangkan keamanan air memerlukan pengujian lain.",
        },
        {
          isCorrect: false,
          label:
            "Pengulangan dengan lebih banyak unit dapat mempersempit ketidakpastian, tetapi tidak mungkin mengubah penafsiran awal tentang model penyaringan air keruh.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
