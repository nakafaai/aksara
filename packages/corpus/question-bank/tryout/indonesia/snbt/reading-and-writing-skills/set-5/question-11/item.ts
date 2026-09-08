import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "eine Wirksamkeitsanalise zur Checkliste im Aufnahmestudio",
        },
        {
          isCorrect: false,
          label: "eine Wirksamkaitsanalyse zur Checkliste im Aufnahmestudio",
        },
        {
          isCorrect: true,
          label: "eine Wirksamkeitsanalyse zur Checkliste im Aufnahmestudio",
        },
        {
          isCorrect: false,
          label: "eine Wirksamkeitsanalyse zur Checklsite im Aufnahmestudio",
        },
        {
          isCorrect: false,
          label: "eine Wirksamkeitsanalyse zur Checkliste im Aufnamestudio",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "an analysiss of the effectiveness of the recording checklist",
        },
        {
          isCorrect: false,
          label: "an analysis of the effectivness of the recording checklist",
        },
        {
          isCorrect: true,
          label: "an analysis of the effectiveness of the recording checklist",
        },
        {
          isCorrect: false,
          label: "an analisis of the effectiveness of the recording checklist",
        },
        {
          isCorrect: false,
          label: "an analysis of the effectivenes of the recording checklist",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "analisa efektivitas daftar pemeriksaan sebelum merekam",
        },
        {
          isCorrect: false,
          label: "analisis efektifitas daftar pemeriksaan sebelum merekam",
        },
        {
          isCorrect: true,
          label: "analisis efektivitas daftar pemeriksaan sebelum merekam",
        },
        {
          isCorrect: false,
          label: "analisa efektifitas daftar pemeriksaan sebelum merekam",
        },
        {
          isCorrect: false,
          label:
            "analisis efektivitas daftar pemeriksaan dalam kontek perekaman",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
