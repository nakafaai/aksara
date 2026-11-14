import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "can-design",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Volume kaleng desain A sama dengan volume kaleng desain B.",
        },
        {
          column: 2,
          label:
            "Kaleng desain B memerlukan bahan lebih sedikit daripada kaleng desain A.",
        },
        {
          column: 1,
          label:
            "Jika jari-jari desain A dijadikan dua kali semula dan tingginya tetap, volumenya menjadi empat kali semula.",
        },
        {
          column: 2,
          label:
            "Luas selimut kaleng desain B lebih besar daripada luas selimut kaleng desain A.",
        },
      ],
    },
  },
};

export default item;
