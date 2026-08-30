import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "ong ybeeppz! yum!meeongw" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "yum ybeeppzpz! ong!meeongw" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "yum !meeongw ongybeeppz!" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "yum y!meeongw ongbeeppzpz!" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "ong beeppz! yum y!meeongw" }],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "ong ybeeppz! yum!meeongw" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "yum ybeeppzpz! ong!meeongw" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "yum !meeongw ongybeeppz!" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "yum y!meeongw ongbeeppzpz!" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "ong beeppz! yum y!meeongw" }],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [{ kind: "text", text: "ong ybeeppz! yum!meeongw" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "yum ybeeppzpz! ong!meeongw" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "yum !meeongw ongybeeppz!" }],
        },
        {
          isCorrect: true,
          label: [{ kind: "text", text: "yum y!meeongw ongbeeppzpz!" }],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "ong beeppz! yum y!meeongw" }],
        },
      ],
    },
  },
};

export default item;
