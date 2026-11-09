import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "remote-work",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Teks 2 menolak segala bentuk kerja dari rumah.",
        },
        {
          column: 2,
          label:
            "Teks 1 membahas kesulitan karyawan baru yang bekerja dari rumah.",
        },
        {
          column: 1,
          label:
            "Teks 1 menyebut perusahaan dapat merekrut orang dari kota mana saja.",
        },
        {
          column: 1,
          label:
            "Teks 2 menyebut karyawan baru yang bekerja dari rumah lebih mudah merasa terasing.",
        },
      ],
    },
  },
};

export default item;
