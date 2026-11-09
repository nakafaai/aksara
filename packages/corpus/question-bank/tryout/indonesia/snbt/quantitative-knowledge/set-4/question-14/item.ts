import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Volume tabung adalah $$72\\pi\\text{ cm}^3$$." },
        {
          column: 1,
          label:
            "Jarak terjauh antara dua titik pada tabung adalah $$10\\text{ cm}$$.",
        },
        {
          column: 2,
          label: "Luas selimut tabung adalah $$24\\pi\\text{ cm}^2$$.",
        },
        {
          column: 2,
          label:
            "Jika tingginya dijadikan dua kali semula dan jari-jarinya tetap, volume tabung menjadi empat kali semula.",
        },
      ],
    },
  },
};

export default item;
