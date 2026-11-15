import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "railway-java",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jalur kereta api pertama di Hindia Belanda tidak dibangun oleh pemerintah kolonial.",
        },
        {
          column: 1,
          label:
            "Pembangunan jalur Semarang ke Tanggung, dari peletakan batu pertama sampai kereta mulai berjalan, memakan waktu lebih dari tiga tahun.",
        },
        {
          column: 2,
          label:
            "Pada 1867, kereta api sudah dapat berjalan dari Semarang sampai Surakarta.",
        },
        {
          column: 2,
          label:
            "Lebar rel jalur Semarang ke pedalaman sama dengan lebar rel yang akhirnya dipakai di sebagian besar Jawa.",
        },
      ],
    },
  },
};

export default item;
