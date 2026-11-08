import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "scooter-energy",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Untuk jarak yang sama, biaya energi skuter listrik adalah $$20\\,\\%$$ dari biaya energi skuter bensin.",
        },
        {
          column: 2,
          label: "Jika harga bensin turun $$25\\,\\%$$, biaya energi skuter bensin untuk $$100\\text{ km}$$ menjadi $$\\text{Rp}24{.}000$$.",
        },
        {
          column: 2,
          label: "Dengan biaya energi $$\\text{Rp}90{.}000$$, skuter listrik dapat menempuh $$1{.}800\\text{ km}$$.",
        },
        {
          column: 1,
          label: "Jika harga listrik naik $$50\\,\\%$$, biaya energi skuter listrik untuk jarak yang sama masih kurang dari sepertiga biaya energi skuter bensin.",
        },
      ],
    },
  },
};

export default item;
