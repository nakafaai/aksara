import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    { label: "Tahapan mengidentifikasi gajah sasaran", value: false },
    { label: "Perkiraan populasi gajah sumatra di Riau", value: false },
    {
      label:
        "Pemanfaatan GPS Collar untuk memitigasi interaksi negatif manusia dan gajah",
      value: true,
    },
    {
      label: "Peran BBKSDA Riau dalam konservasi satwa liar",
      value: false,
    },
    {
      label: "Kerja sama masyarakat dalam memulihkan habitat gajah",
      value: false,
    },
  ],
};

export default choices;
