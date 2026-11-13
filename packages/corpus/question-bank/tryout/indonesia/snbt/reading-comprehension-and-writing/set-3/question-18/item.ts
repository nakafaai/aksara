import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "angkutan",
  versions: {
    id: {
      columns: ["Tepat", "Tidak tepat"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Kata *mengindahkan* pada kalimat (5) diganti dengan *menghiraukan*.",
        },
        {
          column: 1,
          label:
            "Kalimat (4) diubah menjadi *Setiap hari sekolah, delapan bus yang berangkat dari terminal kecamatan pukul 06.00 menjemput siswa di tiga puluh halte dan mengantar mereka pulang pukul 14.00.*",
        },
        {
          column: 1,
          label:
            "Kata *mengindahkan* pada kalimat (5) diganti dengan *mengabaikan*.",
        },
        {
          column: 2,
          label:
            "Kalimat (4) diubah menjadi *Setiap hari sekolah, delapan bus menjemput siswa yang berangkat dari terminal kecamatan pukul 06.00 di tiga puluh halte dan mengantar mereka pulang pukul 14.00.*",
        },
      ],
    },
  },
};

export default item;
