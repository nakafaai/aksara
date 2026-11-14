import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "interpretation",
  },
  stimulus: "kite-maker",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Tokoh _aku_ mengakui dengan terus terang kepada Kakek bahwa ia menyesal membeli layangan naga.",
        },
        {
          column: 1,
          label:
            "Ucapan terakhir tokoh _aku_ berfungsi sebagai permintaan maaf yang tidak diucapkan secara langsung.",
        },
        {
          column: 1,
          label:
            "Kakek sengaja membuat simpul dengan pelan agar cucunya dapat belajar dari melihat.",
        },
        {
          column: 2,
          label:
            "Kakek memperhatikan wajah cucunya untuk memastikan apakah cucunya menangis.",
        },
        {
          column: 2,
          label:
            "Di mata tokoh _aku_, layangan putih itu lebih indah daripada layangan naga.",
        },
      ],
    },
  },
};

export default item;
