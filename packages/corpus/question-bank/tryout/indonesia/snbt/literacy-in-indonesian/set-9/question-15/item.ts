import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Menguji Aksesibilitas Papan Arah di Hutan Kota",
        },
        {
          correct: false,
          label: "Papan Baru yang Berhasil Sama Besar bagi Semua Pengunjung",
        },
        {
          correct: false,
          label: "Mengapa Persentase Gabungan Selalu Cukup untuk Menilai Akses",
        },
        {
          correct: false,
          label: "Peta Raba sebagai Bukti Akhir Jalur yang Aksesibel",
        },
        {
          correct: false,
          label: "Menilai Papan Arah tanpa Memisahkan Kelompok Pengguna",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
