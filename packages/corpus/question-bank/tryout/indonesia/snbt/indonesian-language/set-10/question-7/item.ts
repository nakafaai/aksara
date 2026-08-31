import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Karena langkah "volume air yang sama dituangkan ke kolom pasir, lempung, dan campuran organik" dapat diulang, model sudah mencakup faktor yang hilang ketika tanah dalam botol telah terganggu sehingga berbeda dari lapisan tanah alami dan dapat menggantikan pengamatan lapangan.',
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa tanah dalam botol telah terganggu sehingga berbeda dari lapisan tanah alami membuat hubungan bahwa ukuran pori dan susunan partikel dapat memengaruhi laju masuknya air tidak dapat diperiksa, bahkan di dalam model.",
        },
        {
          isCorrect: true,
          label:
            "Pengulangan langkah pada model membantu memeriksa bahwa ukuran pori dan susunan partikel dapat memengaruhi laju masuknya air; karena tanah dalam botol telah terganggu sehingga berbeda dari lapisan tanah alami, pola itu menjadi hipotesis untuk pengamatan nyata, bukan bukti langsung tentang seluruh keadaan lapangan.",
        },
        {
          isCorrect: false,
          label:
            "Hubungan bahwa ukuran pori dan susunan partikel dapat memengaruhi laju masuknya air dapat diterapkan langsung pada keadaan nyata selama urutan model diulang dengan cara yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Definisi istilah pada akhir bacaan sudah cukup membuktikan hubungan sebab dalam kolom infiltrasi dari tiga jenis tanah, meskipun bagian model tidak dibandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
