# Hooks

React hooks bir class yazmadan react özelliklerini kullanmanıza olanak sağlayan bir yapıdır. React geliştiricilerinin hatırlayacağı üzere daha önce oluşturduğumuz class’ları react.component’ten extend ediyorduk ve bu sayede react özelliklerini kullanabiliyorduk. Şimdi buna gerek kalmadı. Bildiğiniz üzere React class lifecyle ‘nda componentDidMount, componentDidUpdate ve componentWillUnmount methodları yer almakta. Hooks ile birlikte bu methodların görevini useEffect üstleniyor. Ayrıca state yönetiminde ve kullanımında çok kolaylık sağlamaktadır.

React ın çıkardığı bir çok hook çeşidi bulunmaktadır. Bunlara en çok kullanılanlardan örnek vermek gerekirse useState, useEffect, useRef, useMemo, useReducer, useCallback sayabiliriz. Bu hookların dışında React bize kendi hookumuzu yazmak içnde bir kolaylık sağlıyor.

## useState Hook

useState aslında adından da anlaşılacağı üzere functional componentin içinde kullanabileceğimiz bir state(verilerimizi saklamaya yarayan bir değişken gibi) oluşturmamıza olanak sağlar. Burada unutulmaması gereken nokta state deki değer değiştirildiği zaman, satetin bulunduğu component tekrar render edilir. useState, renderlar arasında verimizi tutmayı sağlayan bir React Hookudur.

useState fonksiyonu bize iki nesneli bir array döndürür. Ilk nesne verimizin değerini veren bir değişken, ikinci nesne ise verimizi değiştirebileceğimiz bir fonksiyondur.

```jsx
import { useState, useEffect } from 'react’;

function Example() {

 // useStates
 const [count, setCount] = useState(0); // İlk Değer 0
 const [count0, setCount0] = useState(); // İlk Değer Undefined
 const [count1, setCount1] = useState("xxx"); // İlk Değer String
 const [count2, setCount2] = useState([]); // İlk Değer Boş Dizi
 const [count3, setCount3] = useState({}); // İlk Değer Boş Nesne

 const increaseCount = () => {
    setCount(count + 1)
 }

 return (
  <div>
   <p>{count} kere tıkladınız.</p>
   <button onClick={() => setCount(count + 1)}>Tıkla</button>
  </div>

  <p>{count} kere tıkladınız.</p>
   <button onClick={increaseCount}>Tıkla</button>
  </div>
 );
}
```

## useEffect Hook

useEffect Reactteki yaşam döngülerinin bir çoğunu barındıran bir hooktur. Mount, unmount ve update evrelerinin hepsinde çalışma kapasitesine sahiptir. Bu evreleri kullanmak için useEffectte belirli koşullar vardır.

```jsx
import React, { useState, useEffect } from "react";

function Example(props) {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("Component her render edildiğinde çalışır.");
  });

  useEffect(() => {
    console.log("Component ilk render edildiğinde çalışır.");
  }, []);

  useEffect(() => {
    console.log("Component ilk render edildiğinde ve name değeri değiştiğinde oluşacak olan render sürecinde çalışır.");
  }, [name]);

  useEffect(() => {
    console.log(
      "Component ilk render edildiğinde ve name yada count değeri değiştiğinde oluşacak olan render sürecinde çalışır."
    );
  }, [name, count]);

  return (
    <div>
      <p>
        You clicked {count} times. - Name Values: {name}
      </p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
    </div>
  );
}
```

## Memoization

Hesaplanması uzun süren işlevlerimizin sonuçlarını saklayarak aynı girdiler için aynı işlev çağrıldığında: işlevin tekrar çalıştırılmadan saklanılan sonucunun dönülmesine Memoization denir. Fakat sonuçların saklanması işlemi ucuz değildir. Bu yüzden sadece maliyetli ve aynı girdilerle aynı çıktıları üreten işlevlerde kullanılması önerilir.

### React.memo

Komponentimizi sardığımız üst katman bir bileşendir. Komponentimizin aldığı props ları yüzeysel olarak kontrol ederek, bir değişiklik yoksa son render edilen sonucu kullanır.

**Not:** Ana komponentin içerisinde child komponent kullandığımız zaman, ana komponent render edildiğinde child komponentte render edilir. Eğer ki child komponentteki props değerleri değişmediğinde ve ana komponent render edildiğinde child komponentin render edilmesini istemiyorsanız react.memo kullanabilirsiniz. Doğru kullanım performans artışı sağlar.

![Alternatif Metin](Assets/images/ScreenShot002.png)

farklı bir kullanım için:

![Alternatif Metin](Assets/images/ScreenShot004.png)

props kontrolleri üzerinde yetki sahibi olmak için, React.memo ‘ya ikinci parametre olarak bir işlev veririz. Bu işlev iki parametre alır. İlki mevcut props değerleri, ikincisi ise yeni props değerleridir. Bu işlev true değeri döndüğünde props değişikliği olmadığı için yeniden render işlemi yapılmaz. false döndüğünde bileşenimiz yeniden render edilir.

![Alternatif Metin](Assets/images/ScreenShot003.png)

### useMemo Hook

Memoization da bahsettiğimiz tekniğin React hook’u olarak yapılmasını sağlayan bir işlevdir. İki parametre alır, ilki memoization uygulamak istediğimiz işlemi tutan bir işlevdir. Diğeri o işlemin girdilerini tutan bir dizidir.

![Alternatif Metin](Assets/images/ScreenShot005.png)

Yukarıdaki görsele göre memoizedValue , a ve b girdileri aynı olduğu sürece önceden üretilen değeri döndürecek. Tekrar computeExpensiveValue işlevini çalıştırmayacaktır. Memoization başlığı altında da bahsettiğimiz gibi işlemimiz buna değecek pahalı bir işlem olmalıdır. Basit işlemlerin sonuçlarının saklanma ve kontrol giderleri, işlemlerin kendilerinden daha maliyetli olabilir.

### useCallback Hook

useMemo nun aksine aldığı işlevin sonucunu saklamak yerine işlevin kendisini saklar. ikinci parametre olarak verilen değerler değişmediği sürece de sakladığı işlevi döndürür.

![Alternatif Metin](Assets/images/ScreenShot006.png)

Bunun faydası şudur. Komponent içinde tanımladığımız işlevler, o komponent yeniden render edildiğinde yeniden tanımlanır ve farklı bir referansa sahip olur. Bu yüzden bu işlevler props olarak iletildiğinde aslında işlev değişmemesine rağmen iletildiği komponentin yeniden render edilmesine neden olurlar.
Çünkü komponentler fonksiyon olarak aldığı propsların referanslarını karşılaştırarak değişip değişmediğini hesaplar.

## useRef Hook - forwardRef Hook

React'de bir DOM elemanına ulaşmak için useRef() ile ref'lemek gerekiyor. Örneğin;

![Alternatif Metin](Assets/images/ScreenShot007.png)

Ancak bu senaryoda input etiketi bir React Component'i olsaydı, bu şekilde bir refleme çalışmayacaktı. İşte bu noktada devreye forwardRef() giriyor. Alt component'den üst component'e refi iletmemizi sağlıyor. Şimdi aynı örneği input'un component olduğu senaryoda yazalım.

![Alternatif Metin](Assets/images/ScreenShot008.png)

## Context API - useContext Hook

Prop drilling, bir state’in, component ağacımızın daha yukarısında bulunan bir parent component’ten, component ağacımızın altlarında bulunan bir child component’e props yoluyla aktarılarak state’in ulaştırılmasına denir. Buradaki sorun, state yukarıdan aşağıya doğru aktarılırken, arada köprü olarak kullandığımız componentlerin sadece bu değeri ulaştırmak için gereksiz yere kullanılıyor olmasıdır. Bunun önüne context api kullanılarak geçilebilir. Fakat komponentlerin tekrar kullanılabilirliğini azalttığından dolayı tercih edilmez. Aşağıdaki video'dan ilgili yapıyı inceleyebilirsiniz.

<a href="https://www.youtube.com/watch?v=BIios4z_uwU"> Konu Anlatım Linki </a>

## useReducer Hook

"useReducer" aynı useState ile benzer işlemi yapan ve state yönetimi olarak kullanabileceğimiz bir yapıdır. Özellikle daha çok karmaşık yapılarda kullanabileceğimiz bir yapı diyebiliriz fakat küçük ve basit yapılar üzerinde useState kullanmaya devam edebiliriz. useReducer, içerisinde güncelleyeceğimiz bir state ve state güncelleyen bir fonksiyonumuz bulunmaktadır. useReducer, özellikle birden fazla state değişikliğini koordine etmek, state güncellemelerini yönetmek, state değişikliklerini izlemek, componentler arasında state paylaşımını sağlamak ve React uygulamalarındaki state yönetim sürecini daha verimli hale getirmek için kullanılan bir React hook’udur.

useReducer, iki adet parametre alan bir React hook’udur:

Bir reducer fonksiyonu: Bu fonksiyon, mevcut state ve action olarak adlandırılan bir nesne alır ve action nesnesinde belirtilen işlemleri uygulayarak yeni bir state döndürür.
Başlangıç State’i:Bu parametre, React uygulamasında kullanılacak başlangıç state değerini belirtir.
Reducer fonksiyonu, React uygulamasındaki state değişikliklerini yönetmek için kullanılır. Bu fonksiyon, state’i güncellemek için gerekli işlemleri uygulayarak yeni bir state döndürür. Action nesnesi, bu işlemlerin ne olduğunu belirtir. Başlangıç state’i ise, React uygulamasının başlangıç durumunu belirlemek için kullanılır.

useReducer ayrıca bir dispatch fonksiyonudöndürür.Dispatch fonksiyonu, state’i değiştirmek için kullanılır ve React bileşenleri içinde event handler fonksiyonlarında veya başka yerlerde kullanılabilir.

![Alternatif Metin](Assets/images/ScreenShot009.png)

Daha detaylı anlatım için: <a href="https://www.youtube.com/watch?v=uqnVXx9EMvE"> Konu Anlatım Linki </a>
