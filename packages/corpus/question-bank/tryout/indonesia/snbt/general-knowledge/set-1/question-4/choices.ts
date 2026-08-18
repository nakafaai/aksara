import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
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
