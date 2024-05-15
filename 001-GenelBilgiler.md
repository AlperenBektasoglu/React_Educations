# Genel Bilgiler

## React Nedir?

React ücretsiz, açık kaynaklı bir js kütüphanesidir. Frontend geliştirmek için Facebook tarafından çıkarılmıştır.

## React Proje Oluşturma Süreci

**Not:** Visual Studio ile birlikte, React node.js e bağımlı olduğu için node.js kütüphanesininde indirilmesi gerekir.

1. Adım: Proje oluşturma vite.js üzerinden yapılmaktadır. Terminali açtıktan sonra aşağıdaki komut çalıştırılır.

```npm
$ npm create vite@latest
```

2. Adım terminaldeki komutlar takip edilerek kurulum işlemi tamamlanır. Kurarken proje klasörünün içerisinde olduğunuza emin olmalısınız.

3. nmp run dev komutu ile projeyi ayağa kaldırabilirsiniz.

## React Ana Bileşenler

React 3 temel yapısı vardır:

1. Component: React componentleri, uygulamanızdaki bir parçayı temsil eder. Componentler, props gibi verileri alır ve bunları kullanarak HTML döndürür. JSX formatındadır.
2. Props: Props, bir component'e dışarıdan veri geçirmek için kullanılır. Props, component içinde tanımlanmaz ve dışarıdan geçirilir.
3. State Management: Uygulamanın durumunu ve global verileri tutmak için kullanılan yöntemlere verilen genel isimdir.

**Not:** Eskiden class componentler ve function componentler vardı. Artık yeni react yapısı ile function componentler tercih edilmektedir.

## JSX Nedir?

React.js’te kullanılan bir sözdizimidir ve JavaScript’e HTML benzeri bir yapı ekler. JSX, JavaScript ve HTML’i bir araya getirerek React bileşenlerinin oluşturulmasını kolaylaştırır.

**Not:** Bir function componentte, js kodları return dışında html kodları return içinde yazılır. Html içerisinde js kodları kullanılmak istendiğinde ise jsx formatı uygulanmalıdır.

JSX Kurallları:

1. React üzerinde JSX kuralları içerisindeki en önemli kural, fonksiyon bir çıktı döndürürken mutlaka o çıktıyı bir html çıktısı olarak döndürmelidir.
2. Ek olarak bir değişken üzerinden parametre alırken veya JSX üzerinde HTML yapılarında bir JavaScript kodu kullanacağımız zaman "{}" etiketleri içerisinde kullanılmaktadır.
3. Fragments Kullanımı; Normalde JSX ile tek bir html elemanı döndürülebilir. Fragment yapısı ile oluşturduğumuz bir component veya bir fonksiyon içerisinde birden fazla HTML kodunu döndürebiliriz.Html elemanlarını Alt alta olacak şekilde (bir kapsayıcı içermeyecek) döndürmeniz durumunda hata verecektir. Ya elementler genel bir div içine alınır yada Fragment(<></>) kullanılır.
4. HTML üzerinde kullandığımız "class" tipi artık "className" olarak kullanılmaktadır.
   **Not:** HTML etiketileri içerisinde kullandığımız çoğu etiket artık React üzerinde camelCase yapısı olarak kullanılmaktadır.
5. HTML içerisinde gördüğünüz kadarıyla bazı etiketler kapatılmadan kullanılabilmektedir. Tüm Etiketleri Kapatın.
6. Style özelliğini kullanırken <a style={{}}></a> şeklinde bir kullanım yapmalısın. Burada birinci parantez JSX'in parantezi 2. parantez ise style'ın parantezidir.
7. "{}" Kullanımı: HTML kod yapımızın içerisine mesela JavaScript üzerinde oluşturduğumuz kod yapılarını veya değişkenlerimizi eklemek istiyoruz. Aşağıdaki örneği inceleyebilirsiniz:

```jsx
const MyInformation = {
  name: "Enes",
  surname: "Akkaya",
  mail: "enes@abc.com",
  city: "İstanbul",
};

const MyComponent = () => {
  return (
    <>
      <h2>
        {MyInformation.name}, {MyInformation.surname}
      </h2>
      <p>Mail Adresi: {MyInformation.mail}</p>
      <p>Şehir: {MyInformation.city}</p>
    </>
  );
};
```

## Component

React componentleri, uygulamanızdaki bir parçayı temsil eder. Componentler, props gibi verileri alır ve bunları kullanarak HTML döndürür. JSX formatındadır. Reacttaki yeniliklerle component oluşturulurken function component kullanımı tercih edilir.

```jsx
// Header.jsx
import React from ‘react’;
function Header() {
 const titleText = `Lorem ipsum dolor sit amet`;
 return(
 <h1>{titleText}</h1>
 )
}
export default Header;
```

```jsx
// App.jsx
import "./App.css";
import Header from "./Header";
function App() {
  return <Header></Header>;
}

export default App;
```

### App Component

Bütün komponentlerin çatısıdır. bütün komponentleri içinde barındırır.

### Export / Export Default Farkı

Componentleri dışarı açmak için kullanılırlar. Bütünü dışarı açmak için Export Default, parçayı dışarı açmak için Export ifadesi kullanılır. Componentin çağrıldığı yerde Export Default olarak export edilmiş componenti import ederken {} kullanmanıza gerek yoktur ama export ifadesiyle export edilmiş componenti {} ile import etmek zorundasınız.

## Props

Parent componentten child component'e veri taşıma işlemine props adı verilir.

```jsx
// Header.js
import React from "react";
function Header(props) {
  // Destructuring
  const { titleText, subtitleText } = props; //Destructuring işleminde prop isimleri aynı olmalıdır.
  return (
    <div>
      <h1>{titleText}</h1>
      <h3>{subtitleText}</h3>
    </div>
  );
}
export default Header;
```

```jsx
// App.js
import React from "react";
import Header from "./Header";
function App() {
  return <Header titleText="Title Here" subtitleText="Subtitle here"></Header>;
}

export default App;
```
