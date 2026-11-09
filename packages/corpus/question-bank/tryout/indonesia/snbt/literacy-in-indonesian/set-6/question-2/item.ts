import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "liquefaction",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Tanah liat yang butirannya halus dan saling melekat lebih tahan terhadap likuefaksi.",
        },
        {
          column: 2,
          label:
            "Likuefaksi dapat dicegah sepenuhnya dengan memadatkan tanah setelah gempa terjadi.",
        },
        {
          column: 2,
          label:
            "Pada likuefaksi, air di rongga tanah sempat keluar sebelum tekanannya naik.",
        },
        {
          column: 1,
          label:
            "Sebagian lokasi likuefaksi terparah di Palu berada di lereng di bawah saluran irigasi.",
        },
      ],
    },
  },
};

export default item;
