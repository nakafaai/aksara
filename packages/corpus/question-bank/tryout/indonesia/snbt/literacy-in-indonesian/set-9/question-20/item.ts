import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "tutoring-scores",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada Agustus, rata-rata nilai seluruh $$300$$ siswa lebih dekat ke rata-rata kelompok yang tidak ikut bimbingan daripada ke kelompok yang ikut.",
        },
        {
          column: 2,
          label:
            "Pada tabel kedua, kenaikan siswa bimbingan dua kali lipat kenaikan siswa yang tidak ikut.",
        },
        {
          column: 1,
          label:
            "Lebih dari separuh siswa di tabel kedua adalah siswa yang ikut bimbingan.",
        },
        {
          column: 2,
          label:
            "Data guru itu membuktikan bahwa bimbingan sama sekali tidak berpengaruh terhadap nilai.",
        },
        {
          column: 2,
          label:
            "Menurut guru, siswa dengan nilai awal sama pasti sama juga dalam semangat belajarnya.",
        },
      ],
    },
  },
};

export default item;
