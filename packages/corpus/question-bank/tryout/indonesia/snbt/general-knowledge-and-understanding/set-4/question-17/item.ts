import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pemetaan yang tertib dapat memakai satu indeks resmi sambil mempertahankan nama lain beserta bukti dan konteksnya.",
        },
        {
          correct: false,
          label: "Nama administrasi ditetapkan sebagai indeks utama.",
        },
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
          label:
            "Bukti baru dapat mengubah catatan tanpa menghapus riwayat nama sebelumnya.",
        },
      ],
    },
  },
};

export default item;
