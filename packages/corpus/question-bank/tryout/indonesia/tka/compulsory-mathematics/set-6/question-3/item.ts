import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "tandon",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika kedua keran ditutup tepat ketika tandon penuh, isi tandon berhenti berkurang pada pukul 08.15.",
        },
        {
          column: 2,
          label:
            "Seandainya keran Q dibuka pada jam lain, asalkan sebelum tandon penuh, tandon pasti sudah penuh paling lambat pukul 07.00.",
        },
        {
          column: 1,
          label:
            "Seandainya keran P berhenti mengalir tepat pukul 06.25, saat keran Q dibuka, tandon tetap akan penuh, yaitu pada pukul 07.45.",
        },
      ],
    },
  },
};

export default item;
