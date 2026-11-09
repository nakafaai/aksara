import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "inference",
  },
  stimulus: "bayu",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Turbin tidak menghasilkan listrik ketika angin bertiup terlalu lemah.",
        },
        {
          column: 2,
          label:
            "Makin kencang angin bertiup, makin banyak listrik yang selalu dihasilkan turbin.",
        },
        {
          column: 1,
          label:
            "Pembangkit tenaga bayu dapat mengurangi pemakaian bahan bakar oleh pembangkit lain.",
        },
        {
          column: 2,
          label:
            "Pembangkit tenaga bayu di Sidenreng Rappang dibangun di tengah hutan yang lebat.",
        },
      ],
    },
  },
};

export default item;
