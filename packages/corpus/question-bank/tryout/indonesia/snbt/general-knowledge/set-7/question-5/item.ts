import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Partisipasi yang inklusif menuntut pengurangan hambatan nyata dan pemeriksaan keterwakilan, bukan sekadar undangan terbuka.",
        },
        {
          isCorrect: false,
          label:
            "Hampir seluruh pembicara pertama berasal dari tiga rukun tetangga terdekat.",
        },
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
            "Keputusan akhir akan mencatat pilihan, keberatan, dan pengaruh masukan.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
