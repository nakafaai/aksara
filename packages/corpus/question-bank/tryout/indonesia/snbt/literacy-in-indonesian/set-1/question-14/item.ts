import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "phone-ban",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Notifikasi ponsel selama pelajaran dapat memecah perhatian siswa.",
        },
        {
          column: 1,
          label: "Ponsel sebaiknya dijauhkan dari siswa selama jam pelajaran.",
        },
        {
          column: 2,
          label:
            "Aturan yang tidak dapat diawasi guru hanya akan dipatuhi oleh siswa yang memang tertib.",
        },
        {
          column: 2,
          label:
            "Kenaikan nilai di SMA Harapan Bangsa mungkin sebagian disebabkan oleh hal lain selain pembatasan ponsel.",
        },
        {
          column: 2,
          label: "Jam istirahat sebaiknya juga bebas dari ponsel.",
        },
      ],
    },
  },
};

export default item;
