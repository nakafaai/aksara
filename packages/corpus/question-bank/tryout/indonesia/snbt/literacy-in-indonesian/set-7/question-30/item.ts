import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "testing-effect",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada tes lima menit, kelompok yang membaca empat kali mengingat paling banyak.",
        },
        {
          column: 2,
          label:
            "Kelompok yang membaca empat kali memperkirakan dirinya akan mengingat paling sedikit.",
        },
        {
          column: 1,
          label:
            "Pada tes satu minggu, kelompok yang mengingat tiga kali mengingat lebih dari satu setengah kali gagasan yang diingat kelompok yang membaca empat kali.",
        },
        {
          column: 2,
          label:
            "Menurut teks, latihan mengingat tanpa umpan balik selalu lebih baik daripada membaca ulang.",
        },
      ],
    },
  },
};

export default item;
