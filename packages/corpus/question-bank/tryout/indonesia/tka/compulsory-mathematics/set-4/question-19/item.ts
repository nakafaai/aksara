import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Satu putaran pedal memindahkan sepeda sejauh $$6{,}6\\text{ m}$$.",
        },
        {
          column: 2,
          label:
            "Untuk menempuh jarak $$1{,}32\\text{ km}$$, pedal harus diputar $$600$$ kali.",
        },
        {
          column: 2,
          label:
            "Jika gir belakang diganti dengan gir $$24$$ gigi, satu putaran pedal memindahkan sepeda sejauh $$9{,}9\\text{ m}$$.",
        },
        {
          column: 1,
          label:
            "Jika pedal diputar $$60$$ kali setiap menit, kelajuan sepeda adalah $$23{,}76\\text{ km/jam}$$.",
        },
      ],
    },
  },
};

export default item;
