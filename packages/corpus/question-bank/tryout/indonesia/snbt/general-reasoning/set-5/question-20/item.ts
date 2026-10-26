import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Karyawan memilih untuk menutup perusahaan",
        },
        {
          correct: false,
          label: "Sebagian karyawan menerima pesangon menurut hasil pertama",
        },
        {
          correct: false,
          label: "Kedua hasil terjadi",
        },
        {
          correct: false,
          label: "Tidak satu pun hasil terjadi",
        },
        {
          correct: true,
          label:
            "Hasil pertama, yaitu karyawan mengundurkan diri dan menerima pesangon, tidak terjadi",
        },
      ],
    },
  },
};

export default item;
