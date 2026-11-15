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
            "Ponsel yang dibawa siswa selama pelajaran dapat mengganggu konsentrasi.",
        },
        {
          column: 2,
          label:
            "Larangan membawa ponsel sepanjang hari sekolah adalah kebijakan yang paling tepat.",
        },
        {
          column: 2,
          label:
            "Kenaikan nilai di SMA Harapan Bangsa membuktikan manfaat pembatasan ponsel.",
        },
        {
          column: 2,
          label:
            "Siswa yang harus dapat dihubungi keluarganya perlu dikecualikan dari aturan ponsel.",
        },
      ],
    },
  },
};

export default item;
