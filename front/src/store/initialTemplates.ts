import Template1 from "../accets/img/Template-1.png";
import Template2 from "../accets/img/Template-2.png";
import Template3 from "../accets/img/Template-3.png";
import Template4 from "../accets/img/Template-4.png";

export let templates = [
  {
    fields: [
      {
        name: "Имя",
        placeholder: "Имя",
        type: "text",
        width: 20,
        height: 5,
        fieldDescription: "",
        descriptionPosition: "inline",
      },
      {
        name: "Фамилия",
        placeholder: "Фамилия",
        type: "text",
        width: 20,
        height: 5,
        fieldDescription: "",
        descriptionPosition: "inline",
      },
      {
        name: "Телефон",
        placeholder: "Введите номер телефона",
        type: "text",
        width: 20,
        height: 5,
        fieldDescription: "",
        descriptionPosition: "inline",
      },
      {
        name: "Почта",
        placeholder: "Введите почту",
        type: "email",
        width: 20,
        height: 5,
        fieldDescription: "",
        descriptionPosition: "inline",
      },
      {
        name: "Сообщение",
        placeholder: "Сообщение",
        type: "textarea",
        width: 60,
        height: 15,
        fieldDescription: "",
        descriptionPosition: "inline",
      },
    ],
    settings: {
      nameOfTemplate: "Шаблон 1",
      image: Template1,
      group: "Форма обратной связи",
      labelsPosition: "top",
      title: "Мы ответим на любые ваши вопросы",
      numOfFields: 2,
      buttWidth: 35,
      formWidth: 68,
      buttHeight: 6,
      descriptionColor: "#ffffff",
      formMarginTop: 2,
      generalBackgroundColor: "#ffffff",
      formBackgroundColor: "#a3a19f",
      textColor: "#ffffff",
      buttTextColor: "#fdfcff",
      titleColor: "#ffffff",
      buttColor: "#53c6b4",
    },
  },
  {
    fields: [
      {
        name: "Почта",
        placeholder: "Введите почту",
        type: "email",
        width: 15,
        height: 4,
        fieldDescription: "",
        descriptionPosition: "inline",
      },
    ],
    settings: {
      nameOfTemplate: "Шаблон 2",
      image: Template2,
      group: "Подписка на рассылку",
      labelsPosition: "left",
      title: "Подписка на рассылку",
      numOfFields: 1,
      formWidth: 28,
      buttWidth: 21,
      generalBackgroundColor: "#ffffff",
      formBackgroundColor: "#a3a19f",
      buttHeight: 6,
      formMarginTop: 25,
      descriptionColor: "#ffffff",
      textColor: "#ffffff",
      buttTextColor: "#fdfcff",
      titleColor: "#ffffff",
      buttColor: "#53c6b4",
    },
  },
  {
    fields: [
      {
        name: "Имя",
        placeholder: "Имя",
        type: "text",
        width: 20,
        height: 5,
        fieldDescription: "",
        descriptionPosition: "inline",
      },
      {
        name: "Телефон",
        placeholder: "Введите телефон",
        type: "text",
        width: 20,
        height: 5,
        fieldDescription: "",
        descriptionPosition: "inline",
      },
    ],
    settings: {
      nameOfTemplate: "Шаблон 3",
      image: Template3,
      group: "Заказ звонка",
      labelsPosition: "top",
      title: "Заказ звонка",
      numOfFields: 2,
      formWidth: 68,
      generalBackgroundColor: "#ffffff",
      formBackgroundColor: "#a3a19f",
      buttWidth: 35,
      buttHeight: 6,
      formMarginTop: 23,
      textColor: "#ffffff",
      buttTextColor: "#fdfcff",
      titleColor: "#ffffff",
      descriptionColor: "#ffffff",
      buttColor: "#53c6b4",
    },
  },
  {
    fields: [
      {
        name: "Имя",
        placeholder: "Имя",
        type: "text",
        width: 20,
        height: 5,
        fieldDescription: "",
        descriptionPosition: "inline",
      },
      {
        name: "Фамилия",
        placeholder: "Фамилия",
        type: "text",
        width: 20,
        height: 5,
        fieldDescription: "",
        descriptionPosition: "inline",
      },
      {
        name: "Телефон",
        placeholder: "Введите телефон",
        type: "text",
        width: 20,
        height: 5,
        fieldDescription: "",
        descriptionPosition: "inline",
      },
    ],
    settings: {
      nameOfTemplate: "Шаблон 4",
      image: Template4,
      group: "Оформление заказа",
      labelsPosition: "top",
      title: "Оформление заказа",
      numOfFields: 1,
      generalBackgroundColor: "#ffffff",
      formBackgroundColor: "#a3a19f",
      formWidth: 36,
      buttWidth: 23,
      buttHeight: 6,
      formMarginTop: 7,
      textColor: "#ffffff",
      descriptionColor: "#ffffff",
      buttTextColor: "#fdfcff",
      titleColor: "#ffffff",
      buttColor: "#53c6b4",
    },
  },
];