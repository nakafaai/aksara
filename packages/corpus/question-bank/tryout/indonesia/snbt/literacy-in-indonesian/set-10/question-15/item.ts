import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Peta Baru yang Membuat Semua Alat Inklusif",
        },
        {
          isCorrect: true,
          label: "Menguji Peta Akses di Taman Bermain",
        },
        {
          isCorrect: false,
          label: "Satu Ikon Tenang untuk Semua Kebutuhan Sensorik",
        },
        {
          isCorrect: false,
          label: "Menggabungkan Hasil Semua Keluarga dalam Satu Angka",
        },
        {
          isCorrect: false,
          label: "Kecepatan Menemukan Alat sebagai Bukti Akhir Inklusi",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
