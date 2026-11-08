import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-view",
  },
  stimulus: "sugar-tax",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Penerimaan cukai sebaiknya dikembalikan dalam bentuk yang langsung dirasakan masyarakat.",
        },
        {
          column: 2,
          label:
            "Cukai minuman berpemanis cukup untuk menyelesaikan seluruh masalah gizi.",
        },
        {
          column: 1,
          label:
            "Biaya pengobatan penyakit akibat gula berlebih pada akhirnya ikut ditanggung bersama.",
        },
        {
          column: 2,
          label:
            "Kebijakan cukai sebaiknya ditunda sampai ada solusi yang menyelesaikan semua masalah gizi.",
        },
      ],
    },
  },
};

export default item;
