"use client";

export default function LanguageDropdown({
  language,
  setLanguage
}: {
  language: string;
  setLanguage: (lang: string) => void;
}) {
  const options = [
    {
      label: "Chinese", value: "ch_sim"
    },
    {
      label: "Dutch", value: "nl"
    },
    {
      label: "English", value: "en"
    },
    {
      label: "French", value: "fr"
    },
    {
      label: "German", value: "de"
    },
    {
      label: "Indonesian", value: "id"
    },
    {
      label: "Italian", value: "it"
    },
    {
      label: "Japanese", value: "ja"
    },
    {
      label: "Korean", value: "ko"
    },
    {
      label: "Polish", value: "pl"
    },
    {
      label: "Portuguese", value: "pt"
    },
    {
      label: "Romanian", value: "ro"
    },
    {
      label: "Russian", value: "ru"
    },
    {
      label: "Spanish", value: "es"
    },
    {
      label: "Ukrainian", value: "uk"
    },
  ];

  return (
    <div className="select">
      <div className="h-10 selected">
        <span>{ options.find(o => o.value === language)?.label }</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
          className="arrow"
        >
          <path
            d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
          ></path>
        </svg>
      </div>
      <div className="options">
        {options.map((opt) => (
          <div key={opt.value}>
            <input id={opt.value} name="language" type="radio" onChange={() => setLanguage(opt.value)}/>
            <label className="option" htmlFor={opt.value} data-txt={opt.label}></label>
          </div>
        ))}
      </div>
    </div>
  );
}