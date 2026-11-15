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
            "Kelompok yang membaca tiga kali lalu mengingat sekali unggul atas kelompok yang membaca empat kali pada tes satu minggu, tetapi tidak pada tes lima menit.",
        },
        {
          column: 2,
          label:
            "Kelompok yang membaca empat kali memperkirakan dirinya akan mengingat paling sedikit.",
        },
        {
          column: 1,
          label:
            "Pada tes satu minggu, kelompok yang membaca sekali lalu mengingat tiga kali mengingat $$21$$ poin persen lebih banyak daripada kelompok yang membaca empat kali.",
        },
        {
          column: 2,
          label:
            "Menurut teks, latihan mengingat tanpa umpan balik selalu lebih baik daripada membaca ulang.",
        },
        {
          column: 2,
          label:
            "Makin sering mahasiswa berlatih mengingat, makin banyak yang diingatnya pada tes lima menit.",
        },
      ],
    },
  },
};

export default item;
