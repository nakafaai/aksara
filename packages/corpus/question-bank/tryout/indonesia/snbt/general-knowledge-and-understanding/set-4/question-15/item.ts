import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "hoaks",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Tampilan situs yang meyakinkan sudah cukup untuk memastikan sebuah berita benar.",
        },
        {
          column: 1,
          label:
            "Judul yang memancing emosi mendorong orang membagikan berita sebelum membacanya.",
        },
        {
          column: 2,
          label:
            "Membaca secara lateral selalu lebih lambat daripada membaca berita sampai habis.",
        },
        {
          column: 1,
          label:
            "Berita lama dapat disebarkan ulang seolah-olah peristiwa baru.",
        },
      ],
    },
  },
};

export default item;
