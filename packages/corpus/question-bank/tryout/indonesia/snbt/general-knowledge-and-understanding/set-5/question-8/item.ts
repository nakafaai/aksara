import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Dokumen pada bagian awal menetapkan satu hari perpindahan, lalu bagian berikutnya menghapus kesaksian tentang perpindahan bertahap.",
        },
        {
          correct: false,
          label:
            "Bagian awal membandingkan keyakinan narasumber, lalu bagian berikutnya memilih suara yang paling meyakinkan untuk pameran.",
        },
        {
          correct: false,
          label:
            "Bagian awal menjelaskan kerusakan gedung, lalu bagian berikutnya menilai teknik pembangunan yang mempercepat perpindahan.",
        },
        {
          correct: true,
          label:
            "Pertentangan kesaksian memicu pemeriksaan dokumen, lalu hasilnya dipakai untuk menyusun tafsir yang tetap menampilkan kedua suara.",
        },
        {
          correct: false,
          label:
            "Bagian awal mengumpulkan sumber tertulis, lalu bagian berikutnya menyatakan rekonstruksi sudah final dan tidak perlu diperiksa ulang.",
        },
      ],
    },
  },
};

export default item;
