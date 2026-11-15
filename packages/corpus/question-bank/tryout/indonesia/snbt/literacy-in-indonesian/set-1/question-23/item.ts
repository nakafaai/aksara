import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "detail",
  },
  stimulus: "spelling-reform",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Pembaruan 1972 mengganti lebih banyak huruf atau gabungan huruf daripada pembaruan 1947." },
        { column: 2, label: "Pembaruan 2015 dan 2022 terutama mengganti huruf untuk bunyi konsonan." },
        { column: 2, label: "Pada 1947, setiap tanda petik untuk hamzah diganti huruf *k*." },
        { column: 2, label: "Indonesia dan Malaysia sudah memakai ejaan yang sama sejak 1947." },
      ],
    },
  },
};

export default item;
