import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "digitale Signatur : Dokumentechtheit",
        },
        {
          isCorrect: false,
          label: "Komprimierung : Dateigröße",
        },
        {
          isCorrect: false,
          label: "Passwort : Bildschirmhelligkeit",
        },
        {
          isCorrect: false,
          label: "Backup : Netzwerkgeschwindigkeit",
        },
        {
          isCorrect: false,
          label: "Verschlüsselung : Druckauflösung",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "digital signature : document authenticity",
        },
        {
          isCorrect: false,
          label: "compression : file size",
        },
        {
          isCorrect: false,
          label: "password : screen brightness",
        },
        {
          isCorrect: false,
          label: "backup : network speed",
        },
        {
          isCorrect: false,
          label: "encryption : print resolution",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "tanda tangan digital : keaslian dokumen",
        },
        {
          isCorrect: false,
          label: "kompresi : ukuran berkas",
        },
        {
          isCorrect: false,
          label: "kata sandi : kecerahan layar",
        },
        {
          isCorrect: false,
          label: "cadangan data : kecepatan jaringan",
        },
        {
          isCorrect: false,
          label: "enkripsi : resolusi cetak",
        },
      ],
    },
  },
};

export default item;
