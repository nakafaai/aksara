import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Menguji Aksesibilitas Papan Arah di Hutan Kota",
        },
        {
          isCorrect: false,
          label: "Papan Baru yang Berhasil Sama Besar bagi Semua Pengunjung",
        },
        {
          isCorrect: false,
          label: "Mengapa Persentase Gabungan Selalu Cukup untuk Menilai Akses",
        },
        {
          isCorrect: false,
          label: "Peta Raba sebagai Bukti Akhir Jalur yang Aksesibel",
        },
        {
          isCorrect: false,
          label: "Menilai Papan Arah tanpa Memisahkan Kelompok Pengguna",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
