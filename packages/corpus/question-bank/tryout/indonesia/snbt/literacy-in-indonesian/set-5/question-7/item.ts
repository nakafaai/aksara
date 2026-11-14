import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "conclusion",
  },
  stimulus: "ferry-mechanic",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pak Wiryo mengakui kepada Darto bahwa pembacaan suhu silinder empat itu benar.",
        },
        {
          column: 1,
          label:
            "Pemeriksaan Pak Wiryo sendiri membuktikan bahwa pembacaan Darto tentang silinder empat tepat.",
        },
        {
          column: 1,
          label:
            "Kepala Kamar Mesin sudah memperlakukan Pak Wiryo sebagai orang yang segera meninggalkan kapal.",
        },
        {
          column: 2,
          label:
            "Darto meremehkan cara kerja Pak Wiryo yang mengandalkan pendengaran.",
        },
        {
          column: 2,
          label:
            "Alasan yang diberikan Pak Wiryo untuk bunyi lututnya dapat diterima begitu saja oleh pembaca.",
        },
      ],
    },
  },
};

export default item;
