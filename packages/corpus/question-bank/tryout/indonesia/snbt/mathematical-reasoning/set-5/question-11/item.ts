import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "sprint-times",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Jangkauan waktu lari kedelapan siswa adalah 2,9 detik.",
        },
        {
          column: 1,
          label:
            "Lebih dari separuh siswa berlari lebih cepat daripada rata-rata waktu.",
        },
        {
          column: 2,
          label:
            "Jika data waktu Fajar dihapus, median waktu tujuh siswa lainnya tetap 14,3 detik.",
        },
        {
          column: 2,
          label:
            "Jika setiap waktu dikurangi 0,3 detik, jangkauan waktu juga berkurang 0,3 detik.",
        },
      ],
    },
  },
};

export default item;
