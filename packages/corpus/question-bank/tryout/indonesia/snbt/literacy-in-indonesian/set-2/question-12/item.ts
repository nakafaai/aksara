import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "explicit-information",
  },
  stimulus: "sewing-machine",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Mbah Darsih awalnya meragukan pembeli yang memesan kebaya hanya dengan melihat foto.",
        },
        {
          column: 1,
          label:
            "Sekar mengusulkan agar bagian dalam kebaya dikerjakan lebih cepat karena tidak terlihat oleh pembeli.",
        },
        {
          column: 2,
          label:
            "Keesokan paginya, Mbah Darsih memuji hasil jahitan Sekar secara terang-terangan.",
        },
        {
          column: 2,
          label: "Mesin jahit itu dibeli oleh ibu Sekar.",
        },
      ],
    },
  },
};

export default item;
