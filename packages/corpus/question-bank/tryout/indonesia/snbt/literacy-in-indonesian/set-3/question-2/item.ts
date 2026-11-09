import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "mangrove-carbon",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Sebagian besar karbon di ekosistem mangrove tersimpan di dalam tanah.",
        },
        {
          column: 2,
          label:
            "Mengubah hutan mangrove menjadi tambak hanya menghilangkan karbon yang tersimpan di batang dan daun.",
        },
        {
          column: 2,
          label:
            "Menanam bibit sebanyak-banyaknya di dataran lumpur yang hampir selalu tergenang menjamin keberhasilan pemulihan mangrove.",
        },
        {
          column: 1,
          label:
            "Akar mangrove membantu menahan endapan sehingga garis pantai tidak mudah terkikis.",
        },
      ],
    },
  },
};

export default item;
