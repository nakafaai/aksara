import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "text-relation",
  },
  stimulus: "tide-poem",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Menurut catatan penyair, percakapan di bait terakhir pernah benar-benar terjadi.",
        },
        {
          column: 2,
          label:
            "Catatan penyair menyebut bahwa air pasang di kampungnya datang sekali sehari pada jam yang sama.",
        },
        {
          column: 1,
          label:
            "Baris tentang pasang sebagai tamu yang datang dua kali sehari sejalan dengan keterangan dalam catatan penyair.",
        },
        {
          column: 2,
          label:
            "Penyair langsung memahami jawaban ayahnya ketika percakapan itu terjadi.",
        },
      ],
    },
  },
};

export default item;
