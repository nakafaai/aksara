import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Pengujian Kartu Pertanyaan dalam Tur Laboratorium Terbuka",
        },
        {
          isCorrect: false,
          label: "Catatan Awal Sebelum Kartu Pertanyaan Diuji",
        },
        {
          isCorrect: false,
          label: "Pengujian Beberapa Perubahan Serentak pada Tur Laboratorium",
        },
        {
          isCorrect: false,
          label: "Tanggapan atas Perancangan Ulang Permanen Tur Laboratorium",
        },
        {
          isCorrect: false,
          label: "Evaluasi Menyeluruh atas Seluruh Kegiatan Laboratorium",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
