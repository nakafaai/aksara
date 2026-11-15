import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "character",
  },
  stimulus: "night-bus-driver",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Bu Tarmi menghapus sisa bon Warsito sebagai tanda perpisahan.",
        },
        {
          column: 2,
          label:
            "Ardi meminta Warsito mampir di rumah makan Bu Tarmi agar penumpang dapat beristirahat.",
        },
        {
          column: 2,
          label:
            "Bus tiba di Pulogebang tepat waktu karena Warsito tidak berhenti lama di Pemalang.",
        },
        {
          column: 1,
          label:
            "Warsito menyimpan papan nama trayek karena papan itu berarti baginya, bukan karena nilai besinya.",
        },
        {
          column: 2,
          label:
            "Kebiasaan Warsito memanaskan mesin jauh sebelum berangkat baru dimulai pada malam terakhir itu.",
        },
      ],
    },
  },
};

export default item;
