import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "detail",
  },
  stimulus: "rawa",
  versions: {
    id: {
      columns: ["Sesuai", "Tidak sesuai"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Karbon di dalam gambut yang dikeringkan baru terlepas ke udara jika gambut itu terbakar.",
        },
        {
          column: 2,
          label:
            "Metana lebih merugikan iklim daripada karbon dioksida karena menahan panas lebih kuat dan bertahan lebih lama di atmosfer.",
        },
        {
          column: 1,
          label:
            "Bagian karbon tanah dunia yang tersimpan di lahan gambut jauh lebih besar daripada bagian daratan yang ditempati lahan gambut.",
        },
        {
          column: 1,
          label:
            "Membasahi kembali gambut yang telah dikeringkan dapat menambah pelepasan salah satu gas rumah kaca, tetapi menurut banyak kajian tetap menguntungkan iklim dalam jangka panjang.",
        },
      ],
    },
  },
};

export default item;
