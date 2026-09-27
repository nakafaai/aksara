import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Alokasi anggaran pendidikan meningkat",
        },
        {
          isCorrect: false,
          label:
            "Banyak mahasiswa berprestasi dapat berkuliah di universitas terkemuka dalam negeri",
        },
        {
          isCorrect: true,
          label:
            "Banyak mahasiswa berprestasi terbaik Indonesia dapat berkuliah di universitas terkemuka di luar negeri",
        },
        {
          isCorrect: false,
          label:
            "Beberapa mahasiswa berprestasi terbaik Indonesia dapat berkuliah di universitas terkemuka di luar negeri",
        },
        {
          isCorrect: false,
          label:
            "Sebagian alokasi anggaran pendidikan tidak sepenuhnya terserap",
        },
      ],
    },
  },
};

export default item;
