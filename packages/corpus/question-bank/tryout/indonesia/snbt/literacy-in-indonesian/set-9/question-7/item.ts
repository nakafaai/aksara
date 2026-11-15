import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "implicit-information",
  },
  stimulus: "old-translator",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pak Sastro sudah menerjemahkan surat kelima sebelum Dita menanyakan kalung itu kepadanya.",
        },
        {
          column: 2,
          label: "Bu Ratmi menulis surat-surat itu kepada suaminya.",
        },
        {
          column: 1,
          label:
            "Sampai membaca surat kelima, Pak Sastro mengira kalung itu hilang ketika mereka pindah rumah.",
        },
        {
          column: 2,
          label: "Dita mengusulkan agar Pak Sastro memakai kata pendiam.",
        },
        {
          column: 2,
          label:
            "Pak Sastro sudah memutuskan untuk tidak menerjemahkan surat yang tersisa.",
        },
      ],
    },
  },
};

export default item;
