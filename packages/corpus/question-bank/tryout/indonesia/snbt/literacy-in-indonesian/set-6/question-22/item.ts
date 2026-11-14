import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "detail",
  },
  stimulus: "pranata-mangsa",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pranata mangsa disusun menurut peredaran bulan, seperti kalender Jawa yang lain.",
        },
        {
          column: 1,
          label:
            "Pada tahun yang hujannya datang terlambat, Lintang Waluku tetap tampak pada letak dan waktu yang biasa.",
        },
        {
          column: 1,
          label:
            "Jadwal pranata mangsa tidak dapat langsung dipakai di daerah yang musim hujannya datang pada bulan lain.",
        },
        {
          column: 2,
          label:
            "Perubahan iklim membuat tanda dari hewan dan tumbuhan tidak lagi berguna bagi petani.",
        },
      ],
    },
  },
};

export default item;
