import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "borrowed-words",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Kata *meja* dan *jendela* berasal dari bahasa Belanda.",
        },
        {
          column: 1,
          label: "Kata *kulkas* berasal dari kata Belanda *koelkast*.",
        },
        {
          column: 2,
          label:
            "Dalam bahasa Indonesia, kata *sengsara* masih berarti perputaran kelahiran dan kematian.",
        },
        {
          column: 1,
          label: "Kata *daring* merupakan singkatan dari *dalam jaringan*.",
        },
      ],
    },
  },
};

export default item;
