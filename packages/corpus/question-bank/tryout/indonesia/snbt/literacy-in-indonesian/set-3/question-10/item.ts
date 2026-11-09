import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "last-angkot",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ia ingin menunjukkan kepada petugas bahwa ia pengemudi yang paling rajin.",
        },
        {
          correct: true,
          label:
            "Ia tetap peduli pada penumpang lamanya walaupun harus menyimpang dari jadwal.",
        },
        {
          correct: false,
          label:
            "Ia menyesal telah meninggalkan pekerjaannya sebagai sopir angkot trayek 07.",
        },
        {
          correct: false,
          label:
            "Ia sengaja memperlambat bus agar penumpang lain merasa tidak nyaman.",
        },
        {
          correct: false,
          label:
            "Ia berharap Mak Inah membayarnya lagi seperti pada hari terakhir angkot.",
        },
      ],
    },
  },
};

export default item;
