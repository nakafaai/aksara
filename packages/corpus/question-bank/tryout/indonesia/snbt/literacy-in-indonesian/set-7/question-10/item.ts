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
            "Menurut catatan penyair, puisi itu baru selesai sesudah percakapan di bait terakhir terjadi.",
        },
        {
          column: 1,
          label:
            "Menurut catatan penyair, dalam satu minggu waktu datangnya pasang di kampungnya dapat bergeser beberapa jam.",
        },
        {
          column: 2,
          label:
            "Catatan penyair dan bait pertama sama-sama menunjukkan bahwa ayah memakai tabel pasang.",
        },
        {
          column: 2,
          label:
            "Penyair langsung memahami jawaban ayahnya ketika percakapan itu terjadi.",
        },
        {
          column: 2,
          label: "Puisi itu ditulis sebelum ayah penyair berhenti melaut.",
        },
      ],
    },
  },
};

export default item;
