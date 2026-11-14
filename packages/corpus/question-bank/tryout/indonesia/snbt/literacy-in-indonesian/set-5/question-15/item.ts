import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "mountain-quota",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia menolaknya, karena setiap perubahan cara membagi kuota akan menambah beban gunung.",
        },
        {
          correct: true,
          label:
            "Ia tidak punya alasan untuk menolaknya, karena usul itu tidak menambah pendaki per hari sehingga tidak menyentuh alasan ekologi dan keselamatannya.",
        },
        {
          correct: false,
          label:
            "Ia menolaknya, karena menurutnya pendapatan warga tidak perlu diperhitungkan dalam pengelolaan gunung.",
        },
        {
          correct: false,
          label:
            "Ia menerimanya, asalkan kuota harian dinaikkan supaya operator dari kota tidak dirugikan.",
        },
        {
          correct: false,
          label:
            "Ia menerimanya, karena usul yang sama sudah ia kemukakan pada alinea terakhir tulisannya.",
        },
      ],
    },
  },
};

export default item;
