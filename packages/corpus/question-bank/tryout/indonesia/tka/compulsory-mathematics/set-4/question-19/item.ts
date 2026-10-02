import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  responses: {
    id: {
      categories: ["Benar", "Salah"],
      kind: "category",
      statements: [
        {
          correctCategoryOrder: 1,
          label: "Satu putaran pedal memindahkan sepeda sejauh $$6{,}6\\text{ m}$$.",
        },
        {
          correctCategoryOrder: 2,
          label: "Untuk menempuh jarak $$1{,}32\\text{ km}$$, pedal harus diputar $$600$$ kali.",
        },
        {
          correctCategoryOrder: 2,
          label:
            "Jika gir belakang diganti dengan gir $$24$$ gigi, satu putaran pedal memindahkan sepeda sejauh $$9{,}9\\text{ m}$$.",
        },
        {
          correctCategoryOrder: 1,
          label:
            "Jika pedal diputar $$60$$ kali setiap menit, kelajuan sepeda adalah $$23{,}76\\text{ km/jam}$$.",
        },
      ],
    },
  },
};

export default item;
