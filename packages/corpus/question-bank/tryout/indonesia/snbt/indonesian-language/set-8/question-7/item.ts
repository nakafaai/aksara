import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Karena langkah "wadah logam dan plastik berisi air hangat diukur suhunya pada selang waktu tetap" dapat diulang, model sudah mencakup faktor yang hilang ketika ketebalan penutup dan celah udara masih sulit dibuat benar-benar sama dan dapat menggantikan pengamatan lapangan.',
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa ketebalan penutup dan celah udara masih sulit dibuat benar-benar sama membuat hubungan bahwa jenis bahan dapat memengaruhi laju perubahan suhu tidak dapat diperiksa, bahkan di dalam model.",
        },
        {
          isCorrect: false,
          label:
            "Hubungan bahwa jenis bahan dapat memengaruhi laju perubahan suhu dapat diterapkan langsung pada keadaan nyata selama urutan model diulang dengan cara yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Definisi istilah pada akhir bacaan sudah cukup membuktikan hubungan sebab dalam kotak perbandingan perpindahan panas, meskipun bagian model tidak dibandingkan.",
        },
        {
          isCorrect: true,
          label:
            "Pengulangan langkah pada model membantu memeriksa bahwa jenis bahan dapat memengaruhi laju perubahan suhu; karena ketebalan penutup dan celah udara masih sulit dibuat benar-benar sama, pola itu menjadi hipotesis untuk pengamatan nyata, bukan bukti langsung tentang seluruh keadaan lapangan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
