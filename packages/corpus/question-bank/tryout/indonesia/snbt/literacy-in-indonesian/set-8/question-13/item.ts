import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "science-language",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Menurut Teks B, undang-undang mewajibkan bahasa Indonesia dalam publikasi karya ilmiah di Indonesia.",
        },
        {
          column: 1,
          label:
            "Dalam data Teks A, rata-rata sitasi artikel berbahasa Inggris empat kali rata-rata sitasi artikel berbahasa Indonesia.",
        },
        {
          column: 2,
          label:
            "Data Teks A membuktikan bahwa menulis dalam bahasa Inggris melipatgandakan sitasi sebuah artikel menjadi empat kali.",
        },
        {
          column: 1,
          label:
            "Teks B memakai istilah daring dan luring sebagai contoh kemampuan bahasa Indonesia membentuk istilah baru.",
        },
      ],
    },
  },
};

export default item;
