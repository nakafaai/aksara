import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pemetaan yang tertib dapat memakai satu indeks resmi sambil mempertahankan nama lain beserta bukti dan konteksnya.",
        },
        {
          isCorrect: false,
          label: "Nama administrasi ditetapkan sebagai indeks utama.",
        },
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
          label:
            "Bukti baru dapat mengubah catatan tanpa menghapus riwayat nama sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
