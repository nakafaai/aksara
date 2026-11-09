import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "essay-scoring",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Kedua teks mengakui bahwa mesin dapat memberikan umpan balik dengan cepat.",
        },
        {
          column: 2,
          label:
            "Teks 1 menjelaskan cara mesin menilai esai yang tidak menjawab pertanyaan.",
        },
        {
          column: 1,
          label: "Teks 2 menyarankan agar nilai akhir tetap ditentukan guru.",
        },
        {
          column: 2,
          label:
            "Teks 2 menyatakan bahwa angka kecocokan dalam Teks 1 dihitung dengan cara yang salah.",
        },
      ],
    },
  },
};

export default item;
