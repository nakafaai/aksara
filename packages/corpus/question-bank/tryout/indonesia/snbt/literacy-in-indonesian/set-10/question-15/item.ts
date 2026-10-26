import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Peta Baru yang Membuat Semua Alat Inklusif",
        },
        {
          correct: true,
          label: "Menguji Peta Akses di Taman Bermain",
        },
        {
          correct: false,
          label: "Satu Ikon Tenang untuk Semua Kebutuhan Sensorik",
        },
        {
          correct: false,
          label: "Menggabungkan Hasil Semua Keluarga dalam Satu Angka",
        },
        {
          correct: false,
          label: "Kecepatan Menemukan Alat sebagai Bukti Akhir Inklusi",
        },
      ],
    },
  },
  stimulus: "passage-3",
};

export default item;
