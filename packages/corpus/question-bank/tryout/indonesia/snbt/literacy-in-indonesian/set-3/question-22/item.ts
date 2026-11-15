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
            "Dari peletakan batu pertama sampai kereta mulai berjalan, pembangunan jalur Semarang ke Tanggung memakan waktu lebih dari tiga tahun.",
        },
        {
          column: 2,
          label:
            "Ketika kereta pertama mulai berjalan, rel sudah mencapai Surakarta.",
        },
        {
          column: 1,
          label:
            "Selisih lebar rel jalur pertama dan rel yang akhirnya dipakai di sebagian besar Jawa lebih dari $$35$$ cm.",
        },
        {
          column: 2,
          label:
            "Rel selebar $$1{.}067$$ mm pertama kali dipakai di jalur Semarang ke Tanggung.",
        },
        {
          column: 1,
          label:
            "Sebelum lebar rel diseragamkan, barang dari jalur Semarang yang menuju jalur pemerintah harus dipindahkan ke kereta lain.",
        },
      ],
    },
  },
};

export default item;
