import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Pengujian Kartu Pertanyaan dalam Tur Laboratorium Terbuka",
        },
        {
          correct: false,
          label: "Catatan Awal Sebelum Kartu Pertanyaan Diuji",
        },
        {
          correct: false,
          label: "Pengujian Beberapa Perubahan Serentak pada Tur Laboratorium",
        },
        {
          correct: false,
          label: "Tanggapan atas Perancangan Ulang Permanen Tur Laboratorium",
        },
        {
          correct: false,
          label: "Evaluasi Menyeluruh atas Seluruh Kegiatan Laboratorium",
        },
      ],
    },
  },
};

export default item;
