import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  id: [
    { label: "Ruangan luas dan lembab", value: false },
    { label: "Ruangan dengan perlindungan ketat", value: false },
    { label: "Ruangan sempit dan tidak ada pandangan dunia", value: true },
    { label: "Ruangan besi, pintu besi, dan alat penyiksa", value: false },
    { label: "Ruangan bawa tanah yang sulit diakses", value: false },
  ],
};

export default choices;
