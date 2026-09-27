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
          isCorrect: true,
          label:
            "Banyaknya peserta tidak cukup untuk membuktikan keterwakilan jika akses antarkelompok berbeda.",
        },
        {
          isCorrect: false,
          label:
            "Hampir seluruh pembicara pertama berasal dari tiga rukun tetangga terdekat.",
        },
        {
          isCorrect: false,
          label:
            "Keputusan akhir akan mencatat pilihan, keberatan, dan pengaruh masukan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
