import Localization from './config/Localization';
import LangConfig from './config/LangConfig';
import React, { useState } from 'react';

function App () {
  const [language, setLanguage] = useState(LangConfig.langType.VN);

  const onButtonClick = function () {
      if (language === LangConfig.langType.VN) {
        Localization.changeLanguage(LangConfig.langType.EN);
        setLanguage(LangConfig.langType.EN);
      }
      else {
        Localization.changeLanguage(LangConfig.langType.VN);
        setLanguage(LangConfig.langType.VN);
      }
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
            Ngôn ngữ: {Localization.text("txt_language")}
        </p>
        <button onClick={onButtonClick}>Đổi ngôn ngữ</button>
      </header>
    </div>
  );
}

export default App;
