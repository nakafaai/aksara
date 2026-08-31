import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Die Bildungszuweisung steigt",
        },
        {
          isCorrect: false,
          label:
            "Viele leistungsstarke Studierende können an führenden Universitäten in Indonesien studieren",
        },
        {
          isCorrect: true,
          label:
            "Viele der leistungsstärksten Studierenden Indonesiens können an führenden Universitäten im Ausland studieren",
        },
        {
          isCorrect: false,
          label:
            "Einige der leistungsstärksten Studierenden Indonesiens können an führenden Universitäten im Ausland studieren",
        },
        {
          isCorrect: false,
          label:
            "Ein Teil der Bildungszuweisung wird nicht vollständig ausgegeben",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The education budget allocation is increasing",
        },
        {
          isCorrect: false,
          label:
            "Many high-achieving students can attend leading universities within Indonesia",
        },
        {
          isCorrect: true,
          label:
            "Many of Indonesia's highest-achieving students can study at leading universities abroad",
        },
        {
          isCorrect: false,
          label:
            "Some of Indonesia's highest-achieving students can study at leading universities abroad",
        },
        {
          isCorrect: false,
          label: "Part of the education budget allocation is not fully spent",
        },
      ],
    },
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
