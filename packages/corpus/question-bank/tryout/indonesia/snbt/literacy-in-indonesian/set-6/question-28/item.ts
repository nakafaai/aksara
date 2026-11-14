import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "marshmallow-test",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Penelitian 2018 menemukan bahwa lama menunggu tidak berhubungan sama sekali dengan prestasi pada usia $$15$$ tahun.",
        },
        {
          column: 1,
          label:
            "Anak-anak dalam uji awal di Stanford tidak mewakili anak-anak dari berbagai latar ekonomi.",
        },
        {
          column: 1,
          label:
            "Sebagian kekuatan hubungan dalam temuan awal kemungkinan berasal dari latar keluarga yang tidak diperhitungkan.",
        },
        {
          column: 2,
          label:
            "Anak yang langsung memakan kudapannya dalam uji awal kelak pasti memperoleh nilai ujian yang rendah.",
        },
        {
          column: 2,
          label:
            "Penulis menganggap pengendalian diri tidak berpengaruh apa pun pada sukses seseorang.",
        },
      ],
    },
  },
};

export default item;
