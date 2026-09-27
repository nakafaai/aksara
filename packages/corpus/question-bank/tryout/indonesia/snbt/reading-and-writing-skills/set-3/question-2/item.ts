import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "menyusun dugaan sementara yang dapat diuji",
        },
        {
          isCorrect: false,
          label: "menetapkan penyebab sebagai simpulan akhir",
        },
        {
          isCorrect: false,
          label: "menghapus data yang tidak sesuai dengan dugaan",
        },
        {
          isCorrect: false,
          label: "merangkum hasil setelah seluruh uji selesai",
        },
        {
          isCorrect: false,
          label: "mengganti pengukuran dengan penilaian peserta",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
