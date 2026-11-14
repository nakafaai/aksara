import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "blood-drive",
  versions: {
    id: {
      columns: ["Syarat dan prosedur", "Hasil kegiatan", "Saran petugas"],
      kind: "matrix",
      statements: [
        { column: 2, label: "Sebanyak 132 kantong darah terkumpul." },
        {
          column: 1,
          label:
            "Siswa yang mendaftar paling sedikit berusia 17 tahun dan berat badannya 45 kilogram.",
        },
        {
          column: 3,
          label: "Pendaftar diingatkan untuk tidur cukup dan sarapan.",
        },
        {
          column: 1,
          label: "Tekanan darah dan hemoglobin diperiksa sebelum donor.",
        },
      ],
    },
  },
};

export default item;
