import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "bibit yang tidak ditemukan dapat dicatat mati agar jumlah akhir tetap lengkap",
        },
        {
          isCorrect: false,
          label: "pemantauan cukup dilakukan sekali",
        },
        {
          isCorrect: true,
          label:
            "status bibit dicatat sesuai kekuatan bukti agar hasil tidak terlalu pasti",
        },
        {
          isCorrect: false,
          label:
            "status bibit dapat ditentukan dari catatan lama tanpa menemukan kembali penandanya",
        },
        {
          isCorrect: false,
          label: "arus tidak memengaruhi lokasi tanam",
        },
      ],
    },
  },
  stimulusKey: "mangrove-nursery",
};

export default item;
