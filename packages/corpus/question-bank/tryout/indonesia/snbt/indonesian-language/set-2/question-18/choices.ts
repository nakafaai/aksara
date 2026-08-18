import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    {
      label: "Menggiling biji-bijian yang diperlukan untuk membuat roti",
      value: true,
    },
    { label: "Menjaga pintu masuk rumah dari pencuri", value: false },
    { label: "Membawa hasil panen dari luar kota", value: false },
    {
      label: "Menghias bagian hunian dengan lukisan dinding",
      value: false,
    },
    { label: "Menjual roti langsung kepada pembeli di jalan", value: false },
  ],
};

export default choices;
