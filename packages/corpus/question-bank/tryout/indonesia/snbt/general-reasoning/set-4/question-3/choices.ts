import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Mindestens ein Gericht ist nicht zugleich säuerlich und scharf",
      value: false,
    },
    {
      label: "Mindestens ein Gericht ist weder säuerlich noch scharf",
      value: false,
    },
    { label: "Jedes Gericht enthält rohes Gemüse", value: false },
    { label: "Kein Gericht enthält rohes Gemüse", value: false },
    {
      label:
        "Mindestens ein Gericht enthält kein rohes Gemüse und schmeckt säuerlich und scharf",
      value: true,
    },
  ],
  en: [
    {
      label: "At least one dish is not both sour and spicy",
      value: false,
    },
    { label: "At least one dish is neither sour nor spicy", value: false },
    { label: "Every dish contains raw vegetables", value: false },
    { label: "No dish contains raw vegetables", value: false },
    {
      label:
        "At least one dish contains no raw vegetables and tastes sour and spicy",
      value: true,
    },
  ],
  id: [
    {
      label: "Sedikitnya satu hidangan tidak sekaligus asam dan pedas",
      value: false,
    },
    {
      label: "Sedikitnya satu hidangan tidak asam dan tidak pedas",
      value: false,
    },
    { label: "Setiap hidangan mengandung sayuran mentah", value: false },
    {
      label: "Tidak ada hidangan yang mengandung sayuran mentah",
      value: false,
    },
    {
      label:
        "Sedikitnya satu hidangan tidak mengandung sayuran mentah serta terasa asam dan pedas",
      value: true,
    },
  ],
};

export default choices;
