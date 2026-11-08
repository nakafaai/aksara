import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "mikroplastik",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Mikroplastik dapat terbentuk dari plastik besar yang hancur menjadi potongan kecil.",
        },
        {
          column: 2,
          label: "Semua mikroplastik di sungai berasal dari produk kosmetik.",
        },
        {
          column: 1,
          label:
            "Mencuci pakaian sintetis dengan air bersuhu rendah dapat mengurangi serat yang terlepas.",
        },
        {
          column: 2,
          label:
            "Para peneliti sudah memastikan seberapa besar kerusakan yang ditimbulkan mikroplastik pada kesehatan manusia.",
        },
      ],
    },
  },
};

export default item;
