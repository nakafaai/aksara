import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua nama lokal harus memiliki kedudukan hukum yang sama dengan nama administrasi.",
        },
        {
          correct: false,
          label:
            "Agar peta konsisten, semua nama selain nama resmi harus dihapus dari pencarian dan arsip.",
        },
        {
          correct: false,
          label: "Nama administrasi ditetapkan sebagai indeks utama.",
        },
        {
          correct: false,
          label:
            "Penyimpanan nama lokal sebagai alias otomatis memberinya kedudukan resmi yang sama dengan nama administrasi.",
        },
        {
          correct: true,
          label:
            "Menetapkan nama utama tidak mengharuskan penghapusan nama lain yang memiliki jejak penggunaan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
