import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "rice-irrigation",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Apakah tambahan gabah dan air yang dihemat sepadan dengan upah delapan hari penyiangan tambahan.",
        },
        {
          correct: false,
          label:
            "Apakah varietas padi yang dipakai dalam uji coba sama dengan varietas yang ditanam di desa lain.",
        },
        {
          correct: false,
          label:
            "Apakah masa berbunga padi pada pengairan berselang lebih cepat daripada pada penggenangan terus-menerus.",
        },
        {
          correct: false,
          label:
            "Apakah air irigasi pada musim hujan cukup untuk menggenangi seluruh sawah.",
        },
        {
          correct: false,
          label:
            "Apakah tanah yang retak halus dapat merusak saluran irigasi milik tiga desa lain.",
        },
      ],
    },
  },
};

export default item;
