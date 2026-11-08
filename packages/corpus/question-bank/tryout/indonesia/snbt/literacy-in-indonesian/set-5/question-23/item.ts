import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "wayang-school",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Mahabharata dan Ramayana adalah epos yang berasal dari India.",
        },
        {
          column: 2,
          label:
            "Punakawan sudah menjadi tokoh dalam kisah Mahabharata versi India.",
        },
        {
          column: 2,
          label:
            "Goro-goro biasanya berlangsung pada awal pertunjukan, sebelum tengah malam.",
        },
        {
          column: 1,
          label: "Bagian goro-goro tidak terikat pada alur pokok lakon.",
        },
      ],
    },
  },
};

export default item;
