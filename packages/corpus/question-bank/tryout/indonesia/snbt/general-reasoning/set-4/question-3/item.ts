import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Mindestens ein Gericht ist nicht zugleich säuerlich und scharf",
        },
        {
          isCorrect: false,
          label: "Mindestens ein Gericht ist weder säuerlich noch scharf",
        },
        { isCorrect: false, label: "Jedes Gericht enthält rohes Gemüse" },
        { isCorrect: false, label: "Kein Gericht enthält rohes Gemüse" },
        {
          isCorrect: true,
          label:
            "Mindestens ein Gericht enthält kein rohes Gemüse und schmeckt säuerlich und scharf",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "At least one dish is not both sour and spicy",
        },
        {
          isCorrect: false,
          label: "At least one dish is neither sour nor spicy",
        },
        { isCorrect: false, label: "Every dish contains raw vegetables" },
        { isCorrect: false, label: "No dish contains raw vegetables" },
        {
          isCorrect: true,
          label:
            "At least one dish contains no raw vegetables and tastes sour and spicy",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Sedikitnya satu hidangan tidak sekaligus asam dan pedas",
        },
        {
          isCorrect: false,
          label: "Sedikitnya satu hidangan tidak asam dan tidak pedas",
        },
        {
          isCorrect: false,
          label: "Setiap hidangan mengandung sayuran mentah",
        },
        {
          isCorrect: false,
          label: "Tidak ada hidangan yang mengandung sayuran mentah",
        },
        {
          isCorrect: true,
          label:
            "Sedikitnya satu hidangan tidak mengandung sayuran mentah serta terasa asam dan pedas",
        },
      ],
    },
  },
};

export default item;
