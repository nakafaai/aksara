import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "rumah-gadang",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Tiang rumah gadang yang diletakkan di atas batu sandi dapat bergeser ketika tanah berguncang.",
        },
        {
          column: 2,
          label:
            "Rumah gadang tidak pernah rusak oleh gempa, berapa pun umur kayunya.",
        },
        {
          column: 2,
          label:
            "Gonjong dibuat melengkung terutama agar rumah gadang lebih lentur saat gempa.",
        },
        {
          column: 2,
          label:
            "Rumah gadang baru yang tiangnya dicor ke fondasi beton lebih mudah bergeser saat gempa daripada rumah gadang lama.",
        },
      ],
    },
  },
};

export default item;
