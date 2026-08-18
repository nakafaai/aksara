import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "The education budget allocation is increasing", value: false },
    {
      label:
        "Many high-achieving students can attend leading universities within Indonesia",
      value: false,
    },
    {
      label:
        "Some of Indonesia's highest-achieving students can study at leading universities abroad",
      value: false,
    },
    {
      label: "Part of the education budget allocation is not fully spent",
      value: false,
    },
    {
      label:
        "Many of Indonesia's highest-achieving students can study at leading universities abroad",
      value: true,
    },
  ],
  id: [
    { label: "Alokasi anggaran pendidikan meningkat", value: false },
    {
      label:
        "Banyak mahasiswa berprestasi dapat berkuliah di universitas terkemuka dalam negeri",
      value: false,
    },
    {
      label:
        "Beberapa mahasiswa berprestasi terbaik Indonesia dapat berkuliah di universitas terkemuka di luar negeri",
      value: false,
    },
    {
      label: "Sebagian alokasi anggaran pendidikan tidak sepenuhnya terserap",
      value: false,
    },
    {
      label:
        "Banyak mahasiswa berprestasi terbaik Indonesia dapat berkuliah di universitas terkemuka di luar negeri",
      value: true,
    },
  ],
};

export default choices;
