import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "explicit-information",
  },
  stimulus: "boat-race",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Ilham menyelesaikan lomba di urutan ketiga.",
        },
        {
          column: 2,
          label: "Anak dari desa seberang berteriak meminta tolong.",
        },
        {
          column: 1,
          label: "Layar perahu Pak Rasyid sudah tiga kali ditambal.",
        },
        {
          column: 1,
          label:
            "Ilham berlatih membaca angin di teluk selama sebulan sebelum lomba.",
        },
      ],
    },
  },
};

export default item;
