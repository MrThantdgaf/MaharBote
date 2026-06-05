# MaharBote

<p>
  <a href="README.md">
    <img alt="Read in English" src="https://img.shields.io/badge/Read%20in-English-2563eb?style=for-the-badge" />
  </a>
  <a href="README.my.md">
    <img alt="မြန်မာလို ဖတ်ရန်" src="https://img.shields.io/badge/Read%20in-Myanmar-f59e0b?style=for-the-badge" />
  </a>
</p>

<p>
  <a href="https://github.com/MrThantdgaf/MaharBote/actions/workflows/deploy.yml">
    <img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/MrThantdgaf/MaharBote/deploy.yml?branch=main&label=build&logo=githubactions&logoColor=white" />
  </a>
  <a href="https://github.com/MrThantdgaf/MaharBote/actions/workflows/deploy.yml">
    <img alt="Deployment status" src="https://img.shields.io/github/actions/workflow/status/MrThantdgaf/MaharBote/deploy.yml?branch=main&label=deployment&logo=githubpages&logoColor=white" />
  </a>
  <a href="LICENSE">
    <img alt="License" src="https://img.shields.io/badge/license-Apache%202.0-green" />
  </a>
</p>

<p>
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=000" />
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-Styles-1572B6?logo=css3&logoColor=fff" />
</p>

MaharBote သည် မွေးနေ့၊ မြန်မာနှစ်နှင့် မွေးနေ့နံကို အသုံးပြုပြီး မြန်မာ့ရိုးရာ မဟာဘုတ်အိမ်ကို တွက်ချက်ပေးသော React ဝက်ဘ်အက်ပ်ဖြစ်သည်။

အက်ပ်သည် အင်္ဂလိပ်/Gregorian မွေးရက်ကို မြန်မာနှစ်အဖြစ် ပြောင်းလဲတွက်ချက်နိုင်ပြီး မဟာဘုတ်ကြွင်းကို ရှာဖွေကာ နံ ၇ ခုကို အိမ်နေရာများအလိုက် ထားရှိပြီး သက်ဆိုင်ရာ မွေးအိမ်ကို ပြသပေးသည်။ မြန်မာ/အင်္ဂလိပ် ဘာသာစကားပြောင်းခြင်း၊ အလင်း/အမှောင် Theme ပြောင်းခြင်းနှင့် အိမ်အလိုက် ဖတ်ရှုချက်တိုများလည်း ပါဝင်သည်။

## Live Site

[GitHub Pages တွင် MaharBote ကို ဖွင့်ရန်](https://mrthantdgaf.github.io/MaharBote/)

## လုပ်ဆောင်ချက်များ

- အင်္ဂလိပ်/Gregorian မွေးရက်ဖြင့် မဟာဘုတ်ရလဒ် တွက်ချက်နိုင်သည်။
- မြန်မာနှစ်နှင့် မွေးနေ့နံကို ကိုယ်တိုင်ထည့်သွင်း တွက်ချက်နိုင်သည်။
- အဓိပတိ၊ အထွန်း၊ သိုက်၊ ရာဇ၊ မရဏ၊ ဘင်္ဂ၊ ပုတိ စသော မဟာဘုတ်အိမ်နေရာ ၇ ခုကို ကြည့်ရှုနိုင်သည်။
- မြန်မာနှစ်၊ မွေးနေ့နံ၊ ကြွင်း၊ မွေးနေ့နံပါတ်၊ နေရာချအစီအစဉ်နှင့် သက်ဆိုင်ရာအိမ်ကို ပြသပေးသည်။
- မြန်မာနှင့် အင်္ဂလိပ် ဘာသာစကားပြောင်းနိုင်သည်။
- အလင်း/အမှောင် Theme ပြောင်းနိုင်သည်။
- အိမ်အလိုက် စရိုက်၊ ရှေ့ရေးအရိပ်အမြွက်နှင့် ပေါ့ပေါ့ပါးပါး မှတ်ချက်များကို ဖတ်ရှုနိုင်သည်။

## အသုံးပြုထားသော နည်းပညာများ

<p>
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=000" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=fff" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=000" />
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-Styles-1572B6?logo=css3&logoColor=fff" />
</p>

## စတင်အသုံးပြုရန်

Dependencies များ ထည့်သွင်းရန်:

```bash
npm install
```

Development server စတင်ရန်:

```bash
npm run dev
```

Production build ပြုလုပ်ရန်:

```bash
npm run build
```

Production build ကို preview ကြည့်ရန်:

```bash
npm run preview
```

Lint စစ်ဆေးရန်:

```bash
npm run lint
```

## Project Structure

```text
src/
  App.jsx                         App UI နှင့် state များ
  App.css                         App style နှင့် theme များ
  i18n.js                         မြန်မာ/အင်္ဂလိပ် စာသား dictionary များ
  main.jsx                        React entry point
  utils/
    mahaboteCalculator.js         မြန်မာနှစ် ပြောင်းလဲတွက်ချက်ခြင်းနှင့် မဟာဘုတ် logic
  img/                            ဝက်ဘ်ဆိုက်တွင် အသုံးပြုသော ပုံများ
```

## တွက်ချက်မှုမှတ်ချက်

`src/utils/mahaboteCalculator.js` ထဲရှိ Julian day conversion constants များကို အသုံးပြုပြီး Gregorian ရက်စွဲမှ မြန်မာနှစ်ကို တွက်ချက်သည်။ ထို့နောက် မြန်မာနှစ်ကို ၇ ဖြင့်စားသော ကြွင်းအပေါ်မူတည်၍ မဟာဘုတ်နေရာချမှုကို ရွေးချယ်ပြီး မွေးနေ့နံနှင့် ကိုက်ညီသော အိမ်ကို သတ်မှတ်သည်။

ဤအက်ပ်သည် ယဉ်ကျေးမှု၊ ပညာရေးနှင့် ဖျော်ဖြေရေး ရည်ရွယ်ချက်အတွက်သာ ဖြစ်သည်။ ဗေဒင်ဖတ်ရှုချက်များကို အတိအကျ ဖြစ်ရမည်ဟု မယူဆဘဲ အဓိပ္ပာယ်ဖွင့်ဆိုမှုအဖြစ်သာ ဖတ်ရှုပါ။

## License

ဤ project ကို [LICENSE](LICENSE) ဖိုင်တွင် ဖော်ပြထားသော စည်းမျဉ်းများအတိုင်း license ပေးထားသည်။
