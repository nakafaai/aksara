import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            'Karena langkah "air dipanaskan perlahan, uap menyentuh penutup dingin, lalu tetes air jatuh kembali" dapat diulang, model sudah mencakup faktor yang hilang ketika lampu dan es hanya meniru sebagian kecil kondisi atmosfer dan dapat menggantikan pengamatan lapangan.',
        },
        {
          correct: false,
          label:
            "Keterbatasan bahwa lampu dan es hanya meniru sebagian kecil kondisi atmosfer membuat hubungan bahwa air dapat berpindah tempat dan berubah wujud tanpa hilang dari sistem tertutup tidak dapat diperiksa, bahkan di dalam model.",
        },
        {
          correct: false,
          label:
            "Hubungan bahwa air dapat berpindah tempat dan berubah wujud tanpa hilang dari sistem tertutup dapat diterapkan langsung pada keadaan nyata selama urutan model diulang dengan cara yang sama.",
        },
        {
          correct: true,
          label:
            "Pengulangan langkah pada model membantu memeriksa bahwa air dapat berpindah tempat dan berubah wujud tanpa hilang dari sistem tertutup. Karena lampu dan es hanya meniru sebagian kecil kondisi atmosfer, pola itu menjadi hipotesis untuk pengamatan nyata, bukan bukti langsung tentang seluruh keadaan lapangan.",
        },
        {
          correct: false,
          label:
            "Definisi istilah pada akhir bacaan sudah cukup membuktikan hubungan sebab dalam model daur air dalam kotak transparan, meskipun bagian model tidak dibandingkan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
