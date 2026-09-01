import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Menghitung Keberhasilan Klinik dari Satu Ukuran",
        },
        {
          isCorrect: false,
          label: "Dari Uji Singkat Menuju Sistem Klinik yang Tetap",
        },
        {
          isCorrect: false,
          label: "Masukan Pasien sebagai Pengganti Data Perbandingan",
        },
        {
          isCorrect: true,
          label: "Menguji Penanda Alur Klinik: Hasil, Batas, dan Perbaikan",
        },
        {
          isCorrect: false,
          label: "Perbedaan Kebutuhan Medis yang Membatalkan Penanda Baru",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
