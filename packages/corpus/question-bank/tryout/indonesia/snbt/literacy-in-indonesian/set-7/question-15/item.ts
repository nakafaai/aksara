import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Menghitung Keberhasilan Klinik dari Satu Ukuran",
        },
        {
          correct: false,
          label: "Dari Uji Singkat Menuju Sistem Klinik yang Tetap",
        },
        {
          correct: false,
          label: "Masukan Pasien sebagai Pengganti Data Perbandingan",
        },
        {
          correct: true,
          label: "Menguji Penanda Alur Klinik: Hasil, Batas, dan Perbaikan",
        },
        {
          correct: false,
          label: "Perbedaan Kebutuhan Medis yang Membatalkan Penanda Baru",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
