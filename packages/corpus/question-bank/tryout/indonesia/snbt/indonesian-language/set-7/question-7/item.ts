import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Karena langkah "setiap putaran menambah keping individu, sedangkan keping makanan dibatasi" dapat diulang, model sudah mencakup faktor yang hilang ketika aturan sederhana tidak memuat migrasi, umur, atau variasi genetik dan dapat menggantikan pengamatan lapangan.',
        },
        {
          isCorrect: true,
          label:
            "Pengulangan langkah pada model membantu memeriksa bahwa pertumbuhan populasi melambat ketika sumber daya menjadi terbatas; karena aturan sederhana tidak memuat migrasi, umur, atau variasi genetik, pola itu menjadi hipotesis untuk pengamatan nyata, bukan bukti langsung tentang seluruh keadaan lapangan.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa aturan sederhana tidak memuat migrasi, umur, atau variasi genetik membuat hubungan bahwa pertumbuhan populasi melambat ketika sumber daya menjadi terbatas tidak dapat diperiksa, bahkan di dalam model.",
        },
        {
          isCorrect: false,
          label:
            "Hubungan bahwa pertumbuhan populasi melambat ketika sumber daya menjadi terbatas dapat diterapkan langsung pada keadaan nyata selama urutan model diulang dengan cara yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Definisi istilah pada akhir bacaan sudah cukup membuktikan hubungan sebab dalam simulasi populasi dengan keping warna, meskipun bagian model tidak dibandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
