import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "temperature-scales",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kenaikan suhu sebesar $$5^\\circ\\text{C}$$ sama dengan kenaikan suhu sebesar $$9^\\circ\\text{F}$$.",
        },
        { column: 2, label: "Suhu 300 K sama dengan $$37^\\circ\\text{C}$$." },
        {
          column: 1,
          label:
            "Suhu $$100^\\circ\\text{F}$$ lebih tinggi daripada suhu $$37^\\circ\\text{C}$$.",
        },
        {
          column: 2,
          label:
            "Jika angka suhu dalam Celsius menjadi dua kali semula, angka suhu dalam Fahrenheit juga menjadi dua kali semula.",
        },
      ],
    },
  },
};

export default item;
