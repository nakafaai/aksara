import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "rumah-gadang",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Rumah gadang baru yang tiangnya dicor ke fondasi beton dan disambung paku kehilangan cara kerja yang membuat rumah gadang lama lentur.",
        },
        {
          column: 2,
          label:
            "Makin kaku sebuah bangunan, makin kecil kemungkinannya patah saat guncangan besar.",
        },
        {
          column: 2,
          label:
            "Gonjong dibuat melengkung terutama agar rumah gadang lebih lentur saat gempa.",
        },
        {
          column: 1,
          label:
            "Dua rumah gadang yang bentuknya sama dapat berbeda ketahanannya saat gempa.",
        },
        {
          column: 2,
          label:
            "Menurut teks, anak laki-laki yang sudah menikah mendapat bilik di rumah gadang ibunya.",
        },
      ],
    },
  },
};

export default item;
