import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "oil-soap",
  versions: {
    id: {
      columns: [
        "Masalah jelantah",
        "Proses pembuatan sabun",
        "Rencana kelompok",
      ],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Minyak yang mengeras di dalam pipa dapat menyumbat saluran.",
        },
        { column: 2, label: "Jelantah direndam dengan arang selama sehari." },
        {
          column: 3,
          label: "Jeriken penampung jelantah akan dipasang di setiap RT.",
        },
        {
          column: 2,
          label: "Sabun didiamkan sekitar empat minggu sebelum dipakai.",
        },
      ],
    },
  },
};

export default item;
