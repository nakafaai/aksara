import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "botanic-garden",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Kebun Raya Bogor didirikan sebelum Indonesia merdeka." },
        { column: 2, label: "Pendiri Kebun Raya Bogor adalah seorang ahli botani berkebangsaan Belanda." },
        { column: 2, label: "Kelapa sawit yang kini ditanam di Sumatra adalah tumbuhan asli Nusantara." },
        { column: 1, label: "Pada masa kini, kebun itu terutama berfungsi menjaga tumbuhan yang terancam punah di alam." },
        { column: 1, label: "Tidak semua tumbuhan yang dikumpulkan kebun itu disimpan dalam keadaan hidup." },
      ],
    },
  },
};

export default item;
