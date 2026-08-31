import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Karena langkah "siswa memindahkan penanda karbon mengikuti proses fotosintesis, respirasi, dan penguraian" dapat diulang, model sudah mencakup faktor yang hilang ketika panah pada kartu tidak menunjukkan besarnya aliran atau lamanya penyimpanan dan dapat menggantikan pengamatan lapangan.',
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa panah pada kartu tidak menunjukkan besarnya aliran atau lamanya penyimpanan membuat hubungan bahwa karbon berpindah di antara atmosfer, makhluk hidup, tanah, dan perairan tidak dapat diperiksa, bahkan di dalam model.",
        },
        {
          isCorrect: false,
          label:
            "Hubungan bahwa karbon berpindah di antara atmosfer, makhluk hidup, tanah, dan perairan dapat diterapkan langsung pada keadaan nyata selama urutan model diulang dengan cara yang sama.",
        },
        {
          isCorrect: true,
          label:
            "Pengulangan langkah pada model membantu memeriksa bahwa karbon berpindah di antara atmosfer, makhluk hidup, tanah, dan perairan; karena panah pada kartu tidak menunjukkan besarnya aliran atau lamanya penyimpanan, pola itu menjadi hipotesis untuk pengamatan nyata, bukan bukti langsung tentang seluruh keadaan lapangan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi istilah pada akhir bacaan sudah cukup membuktikan hubungan sebab dalam peta kartu daur karbon, meskipun bagian model tidak dibandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
