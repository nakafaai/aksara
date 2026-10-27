import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "mangrove-nursery",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "bibit yang tidak ditemukan dapat dicatat mati agar jumlah akhir tetap lengkap",
        },
        {
          correct: false,
          label: "pemantauan cukup dilakukan sekali",
        },
        {
          correct: true,
          label:
            "status bibit dicatat sesuai kekuatan bukti agar hasil tidak terlalu pasti",
        },
        {
          correct: false,
          label:
            "status bibit dapat ditentukan dari catatan lama tanpa menemukan kembali penandanya",
        },
        {
          correct: false,
          label: "arus tidak memengaruhi lokasi tanam",
        },
      ],
    },
  },
};

export default item;
