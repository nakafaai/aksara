import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "lontar",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Huruf pada lontar ditulis dengan tinta kemiri sebelum lembarannya digores.",
        },
        {
          column: 1,
          label: "Naskah lontar dapat memuat pengetahuan tentang pengobatan.",
        },
        {
          column: 1,
          label: "Udara yang lembap dapat merusak naskah lontar.",
        },
        {
          column: 2,
          label:
            "Naskah asli yang isinya sudah dipotret tidak perlu disimpan lagi.",
        },
      ],
    },
  },
};

export default item;
