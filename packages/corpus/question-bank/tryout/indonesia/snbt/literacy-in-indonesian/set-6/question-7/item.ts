import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            'Karena langkah "air dengan volume sama dituangkan pada tanah terbuka dan tanah yang ditutup serat tumbuhan" dapat diulang, model sudah mencakup faktor yang hilang ketika baki kecil tidak meniru seluruh kemiringan, akar, dan curah hujan suatu lereng dan dapat menggantikan pengamatan lapangan.',
        },
        {
          correct: true,
          label:
            "Selisih yang muncul pada kedua ulangan mendukung dugaan bahwa penutup mengurangi tanah terbawa, tetapi model belum dapat memprediksi besarnya erosi pada lereng dengan akar, tanah, dan hujan yang berbeda.",
        },
        {
          correct: false,
          label:
            "Keterbatasan bahwa baki kecil tidak meniru seluruh kemiringan, akar, dan curah hujan suatu lereng membuat hubungan bahwa penutup permukaan dapat mengubah banyaknya tanah yang terbawa aliran tidak dapat diperiksa, bahkan di dalam model.",
        },
        {
          correct: false,
          label:
            "Hubungan bahwa penutup permukaan dapat mengubah banyaknya tanah yang terbawa aliran dapat diterapkan langsung pada keadaan nyata selama urutan model diulang dengan cara yang sama.",
        },
        {
          correct: false,
          label:
            "Definisi istilah pada akhir bacaan sudah cukup membuktikan hubungan sebab dalam model erosi menggunakan baki tanah, meskipun bagian model tidak dibandingkan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
