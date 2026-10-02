import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Semua nama lokal harus memiliki kedudukan hukum yang sama dengan nama administrasi.",
        },
        {
          isCorrect: false,
          label:
            "Agar peta konsisten, semua nama selain nama resmi harus dihapus dari pencarian dan arsip.",
        },
        {
          isCorrect: false,
          label: "Nama administrasi ditetapkan sebagai indeks utama.",
        },
        {
          isCorrect: false,
          label:
            "Penyimpanan nama lokal sebagai alias otomatis memberinya kedudukan resmi yang sama dengan nama administrasi.",
        },
        {
          isCorrect: true,
          label:
            "Menetapkan nama utama tidak mengharuskan penghapusan nama lain yang memiliki jejak penggunaan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
