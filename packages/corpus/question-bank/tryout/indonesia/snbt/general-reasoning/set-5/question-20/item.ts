import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Karyawan memilih untuk menutup perusahaan",
        },
        {
          isCorrect: false,
          label: "Sebagian karyawan menerima pesangon menurut hasil pertama",
        },
        {
          isCorrect: false,
          label: "Kedua hasil terjadi",
        },
        {
          isCorrect: false,
          label: "Tidak satu pun hasil terjadi",
        },
        {
          isCorrect: true,
          label:
            "Hasil pertama, yaitu karyawan mengundurkan diri dan menerima pesangon, tidak terjadi",
        },
      ],
    },
  },
};

export default item;
