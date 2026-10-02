import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Arum mengganti arahan petugas dengan kartu alur karena petunjuk yang sederhana selalu lebih tepat daripada prosedur klinik.",
        },
        {
          isCorrect: false,
          label:
            "Arum menyelesaikan masalah hanya dengan mengikuti panah yang tersedia sampai laboratorium tanpa meminta informasi tambahan.",
        },
        {
          isCorrect: false,
          label:
            "Arum menyusun aturan layanan yang berlaku bagi semua pasien setelah mengetahui empat tahap umum pemeriksaan neneknya.",
        },
        {
          isCorrect: true,
          label:
            "Arum mengubah kebingungan menjadi kartu alur yang diperiksa petugas, lalu memakainya sebagai alat bantu dengan tetap mencantumkan pengecualian.",
        },
        {
          isCorrect: false,
          label:
            "Arum membuktikan bahwa setiap pasien akan mengikuti urutan yang sama selama nama dokumen ditulis dengan bahasa sederhana.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
