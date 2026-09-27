import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Dokumen pada bagian awal menetapkan satu hari perpindahan, lalu bagian berikutnya menghapus kesaksian tentang perpindahan bertahap.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal membandingkan keyakinan narasumber, lalu bagian berikutnya memilih suara yang paling meyakinkan untuk pameran.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal menjelaskan kerusakan gedung, lalu bagian berikutnya menilai teknik pembangunan yang mempercepat perpindahan.",
        },
        {
          isCorrect: true,
          label:
            "Pertentangan kesaksian memicu pemeriksaan dokumen, lalu hasilnya dipakai untuk menyusun tafsir yang tetap menampilkan kedua suara.",
        },
        {
          isCorrect: false,
          label:
            "Bagian awal mengumpulkan sumber tertulis, lalu bagian berikutnya menyatakan rekonstruksi sudah final dan tidak perlu diperiksa ulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
