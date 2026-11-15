import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "science-language",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Temuan yang penting bagi dunia terbit di jurnal berbahasa Inggris, dan versi lengkap berbahasa Indonesia disediakan bagi pemakai dalam negeri.",
        },
        {
          correct: false,
          label:
            "Semua dosen wajib menerbitkan hasil penelitiannya hanya di jurnal internasional berbahasa Inggris.",
        },
        {
          correct: false,
          label:
            "Semua hasil penelitian hanya boleh diterbitkan dalam bahasa Indonesia agar sesuai dengan undang-undang, tanpa versi bahasa Inggris.",
        },
        {
          correct: false,
          label:
            "Universitas berhenti menghitung sitasi, karena sitasi tidak mengukur manfaat penelitian.",
        },
        {
          correct: false,
          label:
            "Artikel tetap ditulis dalam bahasa Inggris saja, dan hanya abstraknya yang diterjemahkan ke bahasa Indonesia untuk pembaca dalam negeri.",
        },
      ],
    },
  },
};

export default item;
