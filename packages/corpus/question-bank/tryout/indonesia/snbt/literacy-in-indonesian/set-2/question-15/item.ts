import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "rice-irrigation",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Setiap meter kubik air irigasi menghasilkan lebih banyak gabah pada pengairan berselang.",
        },
        {
          column: 1,
          label:
            "Pengairan berselang memerlukan lebih dari dua kali lipat hari kerja penyiangan dibandingkan penggenangan terus-menerus.",
        },
        {
          column: 2,
          label:
            "Hasil gabah pengairan berselang lebih tinggi lebih dari 10 persen daripada hasil penggenangan terus-menerus.",
        },
        {
          column: 2,
          label: "Uji coba dilakukan pada musim hujan dan musim kemarau.",
        },
      ],
    },
  },
};

export default item;
