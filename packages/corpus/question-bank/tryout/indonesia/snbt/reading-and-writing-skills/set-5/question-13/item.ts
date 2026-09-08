import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "die Folgestudie des Teams zur Checkliste",
        },
        {
          isCorrect: false,
          label: "die Folge Studie des Teams zur Checkliste",
        },
        {
          isCorrect: false,
          label: "die Folge-studie des Teams zur Checkliste",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Team zur Checkliste",
        },
        {
          isCorrect: false,
          label: "die Folgestudie des Teems zur Checkliste",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "the team's follow-up study of the recording checklist",
        },
        {
          isCorrect: false,
          label: "the team's follow up study of the recording checklist",
        },
        {
          isCorrect: false,
          label: "the team's follow-uup study of the recording checklist",
        },
        {
          isCorrect: false,
          label: "the teams' follow--up study of the recording checklist",
        },
        {
          isCorrect: false,
          label: "the team follow-up-study of the recording checklist",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "kerja sama tim dalam uji daftar pemeriksaan",
        },
        {
          isCorrect: false,
          label: "kerjasama tim dalam uji daftar pemeriksaan",
        },
        {
          isCorrect: false,
          label: "kerja-sama tim dalam uji daftar pemeriksaan",
        },
        {
          isCorrect: false,
          label: "kerja samah tim dalam uji daftar pemeriksaan",
        },
        {
          isCorrect: false,
          label: "kerja sama-sama tim dalam uji daftar pemeriksaan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
