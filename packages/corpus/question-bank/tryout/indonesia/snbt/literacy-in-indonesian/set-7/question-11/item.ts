import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Klinik menetapkan penanda baru sebagai sistem tetap karena jumlah pasien yang tidak kembali ke meja sebelumnya meningkat dari $$40$$ menjadi $$56$$.",
        },
        {
          correct: false,
          label:
            "Klinik membatalkan penanda baru karena panah di lantai tidak dapat digunakan oleh semua pasien dalam setiap keadaan.",
        },
        {
          correct: false,
          label:
            "Klinik menyimpulkan bahwa penanda baru memperbaiki seluruh mutu layanan karena jadwal dan jumlah petugas tidak berubah.",
        },
        {
          correct: false,
          label:
            "Klinik mengutamakan masukan pengguna dan mengabaikan perbandingan angka karena kebutuhan medis pasien berbeda.",
        },
        {
          correct: true,
          label:
            "Klinik memakai hasil perbandingan dan masukan aksesibilitas untuk memperbaiki penanda, lalu melanjutkan pengujian secara terbatas sebelum memutuskan penerapan tetap.",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
