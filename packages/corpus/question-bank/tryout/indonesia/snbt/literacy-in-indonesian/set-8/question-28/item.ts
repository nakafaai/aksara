import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "framing-effect",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            '"Operasi ini memberi peluang hidup $$90\\%$$" dan "Operasi ini membawa risiko meninggal $$10\\%$$"',
        },
        {
          correct: false,
          label:
            '"Vaksin ini melindungi $$95\\%$$ penerimanya" dan "Vaksin itu melindungi $$80\\%$$ penerimanya"',
        },
        {
          correct: true,
          label:
            '"Daging ini $$75\\%$$ bebas lemak" dan "Daging ini mengandung $$25\\%$$ lemak"',
        },
        {
          correct: false,
          label:
            '"Harga sepatu ini dipotong Rp$$10{.}000$$" dan "Harga sepatu ini dipotong $$10\\%$$"',
        },
        {
          correct: true,
          label:
            '"Program ini menyelamatkan $$200$$ dari $$600$$ warga" dan "Dengan program ini, $$400$$ dari $$600$$ warga akan meninggal"',
        },
      ],
    },
  },
};

export default item;
