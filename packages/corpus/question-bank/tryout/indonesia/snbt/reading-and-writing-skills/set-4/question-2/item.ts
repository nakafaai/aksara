import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "sesi ketika rak hanya memakai kode huruf lama sebagai acuan bagi sesi uji",
        },
        {
          isCorrect: false,
          label: "sesi ketika hasil akhir diumumkan kepada peminjam",
        },
        {
          isCorrect: false,
          label: "sesi pertama sebelum pencatatan nilai awal dimulai",
        },
        {
          isCorrect: false,
          label: "sesi ketika dua perubahan diuji sekaligus",
        },
        {
          isCorrect: false,
          label: "sesi tanpa kegiatan agar petugas dapat beristirahat",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
