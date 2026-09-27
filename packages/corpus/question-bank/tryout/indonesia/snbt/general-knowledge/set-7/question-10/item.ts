import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Musyawarah hanya sah jika setiap usulan warga akhirnya diterima.",
        },
        {
          isCorrect: false,
          label:
            "Karena undangan terbuka, asal peserta dan alasan ketidakhadiran tidak perlu diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Hampir seluruh pembicara pertama berasal dari tiga rukun tetangga terdekat.",
        },
        {
          isCorrect: true,
          label:
            "Inklusif berarti menyediakan cara yang layak agar beragam kelompok dapat dipertimbangkan, bukan menjamin semua tuntutan menang.",
        },
        {
          isCorrect: false,
          label:
            "Masukan hanya layak dipertimbangkan jika disampaikan langsung secara lisan dalam pertemuan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
