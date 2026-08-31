import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            'Karena langkah "air dengan volume sama dituangkan pada tanah terbuka dan tanah yang ditutup serat tumbuhan" dapat diulang, model sudah mencakup faktor yang hilang ketika baki kecil tidak meniru seluruh kemiringan, akar, dan curah hujan suatu lereng dan dapat menggantikan pengamatan lapangan.',
        },
        {
          isCorrect: true,
          label:
            "Pengulangan langkah pada model membantu memeriksa bahwa penutup permukaan dapat mengubah banyaknya tanah yang terbawa aliran; karena baki kecil tidak meniru seluruh kemiringan, akar, dan curah hujan suatu lereng, pola itu menjadi hipotesis untuk pengamatan nyata, bukan bukti langsung tentang seluruh keadaan lapangan.",
        },
        {
          isCorrect: false,
          label:
            "Keterbatasan bahwa baki kecil tidak meniru seluruh kemiringan, akar, dan curah hujan suatu lereng membuat hubungan bahwa penutup permukaan dapat mengubah banyaknya tanah yang terbawa aliran tidak dapat diperiksa, bahkan di dalam model.",
        },
        {
          isCorrect: false,
          label:
            "Hubungan bahwa penutup permukaan dapat mengubah banyaknya tanah yang terbawa aliran dapat diterapkan langsung pada keadaan nyata selama urutan model diulang dengan cara yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Definisi istilah pada akhir bacaan sudah cukup membuktikan hubungan sebab dalam model erosi menggunakan baki tanah, meskipun bagian model tidak dibandingkan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
