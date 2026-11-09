import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "main-idea",
  },
  stimulus: "tenun",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kain tenun ikat hanya dibuat dengan pewarna biru dari daun tarum.",
        },
        {
          correct: false,
          label:
            "Mesin cetak menghasilkan kain tenun ikat yang sama persis dengan buatan tangan.",
        },
        {
          correct: true,
          label:
            "Proses tenun ikat panjang dan rumit, sehingga kainnya bernilai tinggi.",
        },
        {
          correct: false,
          label:
            "Motif tenun ikat dibuat secara acak tanpa makna tertentu bagi pemakainya maupun daerahnya.",
        },
        {
          correct: false,
          label:
            "Benang tenun ikat diwarnai setelah kainnya selesai ditenun oleh para perajin.",
        },
      ],
    },
  },
};

export default item;
