import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Cara Mengubah Selisih Desibel Menjadi Persentase Energi",
        },
        {
          correct: false,
          label: "Waktu Dengung sebagai Satu-satunya Ukuran Mutu Auditorium",
        },
        {
          correct: false,
          label: "Panel Gabus yang Pasti Cocok untuk Setiap Ruang",
        },
        {
          correct: false,
          label:
            "Mengapa Pengukuran pada $$250\\,\\text{Hz}$$ Tidak Lagi Diperlukan",
        },
        {
          correct: true,
          label:
            "Menguji Pengaruh Panel Gabus terhadap Bunyi dan Waktu Dengung",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
