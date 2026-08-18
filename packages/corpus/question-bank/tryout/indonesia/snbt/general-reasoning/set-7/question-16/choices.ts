import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Protected habitats must be mapped before construction begins.",
      value: false,
    },
    {
      label: "A design segment crossing a protected habitat must be relocated.",
      value: false,
    },
    {
      label:
        "The original bridge alignment may remain unchanged through construction.",
      value: true,
    },
    {
      label:
        "The original bridge alignment crossed a protected hornbill habitat.",
      value: false,
    },
    {
      label: "The team relocated the bridge alignment before construction.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Habitat yang dilindungi harus dipetakan sebelum konstruksi dimulai.",
      value: false,
    },
    {
      label:
        "Bagian rancangan yang melintasi habitat yang dilindungi harus dipindahkan.",
      value: false,
    },
    {
      label:
        "Jalur jembatan semula boleh tetap digunakan tanpa perubahan selama konstruksi.",
      value: true,
    },
    {
      label:
        "Jalur jembatan semula melintasi habitat rangkong yang dilindungi.",
      value: false,
    },
    {
      label: "Tim memindahkan jalur jembatan sebelum konstruksi.",
      value: false,
    },
  ],
};

export default choices;
