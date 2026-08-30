import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Die Bildungszuweisung steigt" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Viele leistungsstarke Studierende können an führenden Universitäten in Indonesien studieren",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Einige der leistungsstärksten Studierenden Indonesiens können an führenden Universitäten im Ausland studieren",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ein Teil der Bildungszuweisung wird nicht vollständig ausgegeben",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Viele der leistungsstärksten Studierenden Indonesiens können an führenden Universitäten im Ausland studieren",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The education budget allocation is increasing",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Many high-achieving students can attend leading universities within Indonesia",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Some of Indonesia's highest-achieving students can study at leading universities abroad",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Part of the education budget allocation is not fully spent",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Many of Indonesia's highest-achieving students can study at leading universities abroad",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Alokasi anggaran pendidikan meningkat" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Banyak mahasiswa berprestasi dapat berkuliah di universitas terkemuka dalam negeri",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Beberapa mahasiswa berprestasi terbaik Indonesia dapat berkuliah di universitas terkemuka di luar negeri",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Sebagian alokasi anggaran pendidikan tidak sepenuhnya terserap",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Banyak mahasiswa berprestasi terbaik Indonesia dapat berkuliah di universitas terkemuka di luar negeri",
            },
          ],
        },
      ],
    },
  },
};

export default item;
