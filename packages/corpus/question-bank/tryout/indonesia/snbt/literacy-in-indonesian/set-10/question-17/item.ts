import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "fuel-subsidy",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dua kelompok teratas bersama-sama menikmati lebih dari separuh subsidi.",
        },
        {
          column: 2,
          label:
            "Setiap rumah tangga di kelompok terbawah menerima subsidi lebih besar daripada setiap rumah tangga di kelompok teratas.",
        },
        {
          column: 1,
          label:
            "Sebagai bagian dari pengeluarannya, subsidi lebih berarti bagi rumah tangga terbawah daripada bagi rumah tangga teratas.",
        },
        {
          column: 2,
          label:
            "Kelompok tengah menikmati sekitar sepertiga dari total subsidi.",
        },
        {
          column: 2,
          label:
            "Menurut teks, menghapus subsidi pasti menghemat anggaran tanpa merugikan kelompok terbawah sedikit pun.",
        },
      ],
    },
  },
};

export default item;
