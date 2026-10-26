import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            'Karena langkah "siswa menghubungkan kartu tumbuhan, ulat, burung, dan pengurai dengan benang" dapat diulang, model sudah mencakup faktor yang hilang ketika kartu tidak menggambarkan musim, penyakit, atau perpindahan hewan dan dapat menggantikan pengamatan lapangan.',
        },
        {
          correct: true,
          label:
            "Pengulangan langkah pada model membantu memeriksa bahwa perubahan satu populasi dapat memengaruhi lebih dari satu hubungan makan. Karena kartu tidak menggambarkan musim, penyakit, atau perpindahan hewan, pola itu menjadi hipotesis untuk pengamatan nyata, bukan bukti langsung tentang seluruh keadaan lapangan.",
        },
        {
          correct: false,
          label:
            "Keterbatasan bahwa kartu tidak menggambarkan musim, penyakit, atau perpindahan hewan membuat hubungan bahwa perubahan satu populasi dapat memengaruhi lebih dari satu hubungan makan tidak dapat diperiksa, bahkan di dalam model.",
        },
        {
          correct: false,
          label:
            "Hubungan bahwa perubahan satu populasi dapat memengaruhi lebih dari satu hubungan makan dapat diterapkan langsung pada keadaan nyata selama urutan model diulang dengan cara yang sama.",
        },
        {
          correct: false,
          label:
            "Definisi istilah pada akhir bacaan sudah cukup membuktikan hubungan sebab dalam model jaring-jaring makanan di kebun sekolah, meskipun bagian model tidak dibandingkan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
