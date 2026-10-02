import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Pengujian Label Lokasi pada Baki Bibit Mangrove",
        },
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Label Baki Diuji",
        },
        {
          isCorrect: false,
          label: "Pengujian Beberapa Perubahan Serentak dalam Pembagian Bibit",
        },
        {
          isCorrect: false,
          label: "Tanggapan atas Perancangan Ulang Permanen Pembagian Bibit",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Seluruh Kegiatan Pembibitan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
