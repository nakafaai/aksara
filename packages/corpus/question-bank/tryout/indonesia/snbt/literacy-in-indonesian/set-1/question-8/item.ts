import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "lighthouse-keeper",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Sebelum lampu baru dipasang, penjaga mercusuar harus naik ke ruang lampu lebih dari sekali setiap malam.",
        },
        {
          column: 2,
          label:
            "Wulan meragukan kemampuan sensor lampu baru untuk membaca kabut.",
        },
        {
          column: 1,
          label:
            "Catatan di kolom paling kanan buku jaga berasal dari pengamatan Pak Darsa sendiri, bukan dari permintaan kantor.",
        },
        {
          column: 2,
          label:
            "Pak Darsa mulai menjadi penjaga mercusuar setelah ayahnya meninggal dunia.",
        },
        {
          column: 2,
          label:
            "Setelah lampu baru dipasang, kunci kuningan itu tidak lagi berguna di menara.",
        },
      ],
    },
  },
};

export default item;
