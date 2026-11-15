import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "weaver-daughter",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Ibu tidak pernah secara langsung melarang Laras berangkat." },
        { column: 1, label: "Ibu menggunting kain dari alat tenun sebelum kain itu selesai sepanjang ukuran yang direncanakan." },
        { column: 2, label: "Laras berjanji kepada Ibu bahwa ia tidak akan pulang sebelum kuliahnya selesai." },
        { column: 2, label: "Ibu menenun motif garis lurus pada kain itu setelah Laras berangkat ke Bandung." },
      ],
    },
  },
};

export default item;
