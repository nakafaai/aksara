import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Arum mengganti arahan petugas dengan kartu alur karena petunjuk yang sederhana selalu lebih tepat daripada prosedur klinik.",
        },
        {
          correct: false,
          label:
            "Arum menyelesaikan masalah hanya dengan mengikuti panah yang tersedia sampai laboratorium tanpa meminta informasi tambahan.",
        },
        {
          correct: false,
          label:
            "Arum menyusun aturan layanan yang berlaku bagi semua pasien setelah mengetahui empat tahap umum pemeriksaan neneknya.",
        },
        {
          correct: true,
          label:
            "Arum mengubah kebingungan menjadi kartu alur yang diperiksa petugas, lalu memakainya sebagai alat bantu dengan tetap mencantumkan pengecualian.",
        },
        {
          correct: false,
          label:
            "Arum membuktikan bahwa setiap pasien akan mengikuti urutan yang sama selama nama dokumen ditulis dengan bahasa sederhana.",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
