import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "lichen-air",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Ketika udara memburuk, lumut kerak berbentuk semak berumbai umumnya hilang lebih dulu daripada lumut kerak berbentuk kerak tipis.",
        },
        {
          column: 2,
          label:
            "Kawasan yang hanya ditumbuhi lumut kerak berbentuk kerak tipis kemungkinan berudara lebih bersih daripada kawasan yang juga ditumbuhi lumut berbentuk semak berumbai.",
        },
        {
          column: 2,
          label:
            "Keadaan lumut kerak di suatu pohon menunjukkan kualitas udara pada hari survei dilakukan.",
        },
        {
          column: 1,
          label:
            "Membandingkan lumut kerak hanya pada pohon sejenis membantu mengurangi pengaruh perbedaan kulit kayu terhadap hasil survei.",
        },
      ],
    },
  },
};

export default item;
