import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    { label: "Tiga korban yang ditemukan di bagian hunian", value: false },
    { label: "Lukisan dinding mewah di atrium rumah", value: false },
    { label: "Prasasti pemilihan umum pada dinding bangunan", value: false },
    {
      label: "Jendela berjeruji dan satu-satunya jalan keluar menuju atrium",
      value: true,
    },
    { label: "Oven besar dan wadah untuk mengaduk adonan", value: false },
  ],
};

export default choices;
