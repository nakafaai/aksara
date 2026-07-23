import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    { label: "$$37^{\\text{th}}$$ Month", value: false },
    { label: "$$38^{\\text{th}}$$ Month", value: true },
    { label: "$$39^{\\text{th}}$$ Month", value: false },
    { label: "$$40^{\\text{th}}$$ Month", value: false },
    { label: "$$41^{\\text{st}}$$ Month", value: false },
  ],
  id: [
    { label: "Bulan ke-$$37$$", value: false },
    { label: "Bulan ke-$$38$$", value: true },
    { label: "Bulan ke-$$39$$", value: false },
    { label: "Bulan ke-$$40$$", value: false },
    { label: "Bulan ke-$$41$$", value: false },
  ],
};

export default choices;
