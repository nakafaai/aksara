import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Der Schlaf von Tieren beweist, dass Katzen von ihren Aktivitäten im Wachzustand träumen.",
      value: false,
    },
    {
      label:
        "Träume hängen mit der Aktivität des schlafenden Gehirns und Bruchstücken von Erlebnissen zusammen, ihre genaue Funktion wird aber weiter erforscht.",
      value: true,
    },
    {
      label:
        "Jeder Traum wiederholt ein neues Erlebnis genau und stärkt dadurch diese Erinnerung.",
      value: false,
    },
    {
      label:
        "Träume entstehen nur im REM-Schlaf, weil das Gehirn in allen anderen Phasen inaktiv ist.",
      value: false,
    },
    {
      label:
        "Der Zweck des Träumens ist vollständig geklärt, weitere Forschung ist daher unnötig.",
      value: false,
    },
  ],
  en: [
    {
      label:
        "Animal sleep proves that cats dream about activities they perform while awake.",
      value: false,
    },
    {
      label:
        "Dreams draw on sleeping-brain activity and fragments of waking experience, but their precise function remains under study.",
      value: true,
    },
    {
      label:
        "Every dream directly replays a recent waking experience and strengthens that memory.",
      value: false,
    },
    {
      label:
        "Only REM sleep produces dreams because the brain is inactive in every other stage.",
      value: false,
    },
    {
      label:
        "The purpose of dreaming is fully understood, so further research is unnecessary.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Tidur pada hewan membuktikan bahwa kucing bermimpi tentang kegiatan yang dilakukannya ketika terjaga.",
      value: false,
    },
    {
      label:
        "Mimpi berkaitan dengan aktivitas otak saat tidur dan potongan pengalaman terjaga, tetapi fungsi tepatnya masih diteliti.",
      value: true,
    },
    {
      label:
        "Setiap mimpi menayangkan ulang pengalaman baru secara persis dan memperkuat ingatan tersebut.",
      value: false,
    },
    {
      label:
        "Mimpi hanya terjadi dalam tidur REM karena otak tidak aktif pada tahap lainnya.",
      value: false,
    },
    {
      label:
        "Tujuan mimpi sudah dipahami sepenuhnya sehingga tidak perlu diteliti lagi.",
      value: false,
    },
  ],
};

export default choices;
