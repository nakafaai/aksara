import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Cara Mengubah Selisih Desibel Menjadi Persentase Energi",
        },
        {
          isCorrect: false,
          label: "Waktu Dengung sebagai Satu-satunya Ukuran Mutu Auditorium",
        },
        {
          isCorrect: false,
          label: "Panel Gabus yang Pasti Cocok untuk Setiap Ruang",
        },
        {
          isCorrect: false,
          label: "Mengapa Pengukuran pada 250 Hz Tidak Lagi Diperlukan",
        },
        {
          isCorrect: true,
          label:
            "Menguji Pengaruh Panel Gabus terhadap Bunyi dan Waktu Dengung",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
