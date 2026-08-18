import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "Use exceeds the limit and the power is cut", value: false },
    {
      label: "If the power is not cut, use did not exceed the limit",
      value: false,
    },
    {
      label: "Use does not exceed the limit or the power is cut",
      value: false,
    },
    {
      label: "Use exceeds the limit and the power is not cut",
      value: true,
    },
    {
      label:
        "It is not the case that use exceeds the limit while power remains on",
      value: false,
    },
  ],
  id: [
    {
      label: "Pemakaian melebihi batas dan aliran listrik terputus",
      value: false,
    },
    {
      label:
        "Jika aliran listrik tidak terputus, pemakaian tidak melebihi batas",
      value: false,
    },
    {
      label: "Pemakaian tidak melebihi batas atau aliran listrik terputus",
      value: false,
    },
    {
      label: "Pemakaian melebihi batas dan aliran listrik tidak terputus",
      value: true,
    },
    {
      label:
        "Tidak benar bahwa pemakaian melebihi batas sementara listrik tetap menyala",
      value: false,
    },
  ],
};

export default choices;
