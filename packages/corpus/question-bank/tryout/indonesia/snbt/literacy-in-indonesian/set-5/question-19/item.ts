import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "electric-cars",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Teks 2 menyatakan bahwa mobil listrik sama sekali tidak lebih unggul daripada mobil bensin.",
        },
        {
          column: 1,
          label:
            "Teks 1 mengakui bahwa mobil listrik yang baru dibuat membawa jejak karbon lebih besar daripada mobil bensin.",
        },
        {
          column: 1,
          label:
            "Menurut Teks 1, keunggulan mobil listrik makin besar ketika listriknya makin bersih.",
        },
        {
          column: 2,
          label:
            "Teks 2 mengusulkan agar dana untuk bus listrik dialihkan ke mobil pribadi.",
        },
      ],
    },
  },
};

export default item;
