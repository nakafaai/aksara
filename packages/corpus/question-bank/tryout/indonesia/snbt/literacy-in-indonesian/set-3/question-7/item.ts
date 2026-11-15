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
            "Warsito pernah menganggap nasihat sopir lama sebagai dalih orang yang sudah lamban.",
        },
        {
          column: 2,
          label:
            "Bus tiba di Pulogebang lebih awal dari biasanya karena tidak mampir di Pemalang.",
        },
        {
          column: 1,
          label:
            "Pada malam itu, Bu Tarmi tidak mau menerima uang Warsito untuk melunasi bonnya.",
        },
        {
          column: 2,
          label:
            "Mulai Senin, Ardi akan bekerja sebagai kenek bus di perusahaan yang sama.",
        },
        {
          column: 2,
          label:
            "Nenek berkerudung biru turun dari bus di rumah makan Bu Tarmi.",
        },
      ],
    },
  },
};

export default item;
