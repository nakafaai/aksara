import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "track-laps",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Pertemuan ketiga Andi dan Bima terjadi tepat di titik $$S$$.",
        },
        {
          column: 1,
          label:
            "Andi menyelesaikan putaran ke-$$16$$ lebih dulu daripada Bima menyelesaikan putaran ke-$$15$$.",
        },
        {
          column: 2,
          label:
            "Kecepatan rata-rata Andi selama $$25$$ menit itu, termasuk waktu minumnya, lebih dari $$4{,}4\\text{ m/s}$$.",
        },
        {
          column: 2,
          label:
            "Selama $$25$$ menit itu, jarak tempuh Andi tidak pernah melebihi jarak tempuh Bima lebih dari $$400\\text{ m}$$.",
        },
      ],
    },
  },
};

export default item;
