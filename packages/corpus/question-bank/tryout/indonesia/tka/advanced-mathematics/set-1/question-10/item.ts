import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika intensitas bunyi menjadi $$100$$ kali semula, tingkat intensitasnya bertambah $$20$$ dB.",
        },
        {
          column: 2,
          label:
            "Intensitas bunyi yang tingkat intensitasnya $$80$$ dB adalah dua kali intensitas bunyi yang tingkat intensitasnya $$40$$ dB.",
        },
        {
          column: 2,
          label:
            "Setiap kali intensitas bunyi ditambah $$10^{-12}\\text{ W/m}^2$$, tingkat intensitasnya bertambah $$10$$ dB.",
        },
        {
          column: 1,
          label:
            "Bunyi dengan intensitas $$10^{-12}\\text{ W/m}^2$$ memiliki tingkat intensitas $$0$$ dB.",
        },
      ],
    },
  },
};

export default item;
