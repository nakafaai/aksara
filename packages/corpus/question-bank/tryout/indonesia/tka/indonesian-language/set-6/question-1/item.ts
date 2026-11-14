import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  stimulus: "child-helmets",
  versions: {
    id: {
      columns: ["Keadaan awal", "Pelaksanaan program", "Rencana berikutnya"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Sekolah menyediakan rak helm anak yang dapat dipinjam.",
        },
        {
          column: 1,
          label: "Hanya 300 dari 1.250 anak yang dibonceng memakai helm.",
        },
        { column: 2, label: "Guru mengajarkan cara mengencangkan tali helm." },
        {
          column: 3,
          label: "Data kecelakaan anak akan diminta dari kepolisian.",
        },
      ],
    },
  },
};

export default item;
