# Redux-Toolkit

State bir React uygulaması içerisinde işimize yarayacak bilgileri sakladığımız değişkenlerdir. Bir component içerisinde bir state tutabilmek için React’in en temel hooklarından useState’i kullanıyoruz. Ancak burada aşmamız gereken bir problem ortaya çıkıyor. State’i parent component içerisinde tanımladığım zaman bildiğiniz gibi oluşturduğumuz state’i child component içerisine aktarmak için component’e prop olarak geçmemiz gerekiyor(prop drilling). Bununla birlikte child komponentte tanımlanana bir state'e, ana komponentten ulaşamıyoruz. Bu problemlerin üzerinden gelebilmek için state management yöntemleri geliştirimiştir.

Redux Toolkit, modern React uygulamalarında state yönetimi için en etkili araçlardan biridir. Redux'ın getirdiği bazı problemlere(basma kalıp kodların fazlalağı, kod karmaşıklığı vs.) çözüm olarak oluşturulmuştur. Redux yerine Redux Toolkit kullanımı tavsiye edilir.

İlk olarak, gerekli paketleri projenize eklemelisiniz.

```npm
npm install @reduxjs/toolkit react-redux
```

Yukarıdaki komut, Redux Toolkit ve React-Redux kütüphanelerini projenize ekler. Bu kütüphaneler, React uygulamalarında Redux kullanmanız için gerekli olan her şeyi içerir.

Kurulum tamamlandığında, store'unuzu oluşturabilir ve React uygulamanıza entegre edebilirsiniz.

**Not:** Store, ortak kullanılan değişkenleri ve metodları içinde barındıran bir havuzdur. Aslında Store içerisinde Reducer ları, Reducer lar ise içlerinde state leri ve ortak kullanılan metodları barındırırlar.

İşte basit bir store oluşturma örneği:

```jsx
import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
  },
});
```

Yukarıdaki kod, configureStore fonksiyonunu kullanarak Redux store'unu oluşturur ve tüm reducer'ları bir araya getirir. Bu yapı, store'u uygulamanıza entegre etmeyi ve state yönetimini kolaylaştırır.

Store'u oluşturduktan sonra, uygulamanızı Redux ile bağlamak için Provider bileşenini kullanabilirsiniz. Bu, uygulamanızın her yerinden Redux store'una erişim sağlar.

```jsx
//main.jsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store"; // Oluşturduğumuz store

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
```

Yukarıdaki kod, React uygulamanızı Redux store'u ile bağlar ve Provider bileşeni aracılığıyla uygulamanızın her yerinden state erişimi sağlar.

Aşağıda counterSlice'ın kodunu inceleyebilrisiniz:

```jsx
import { createSlice } from "@reduxjs/toolkit";


export const fetchUserById = createAsyncThunk(
  'users/fetchById', // ilk parametre işleme verilen herhangi bir isim
  async () => { // İkinci parametre ise http isteğinin atılacağı metod tanımı
    // Bu metodun içerisinde axios ile istek atabilirsin.
    return const response = await ...;
  }
)

const initialState = {
  value: 0,
  entities : [],
  loading: "idle"
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // HTTP isteği barındırmayan ortak metodlar buraya yazılır ve aşağıda ki gibi(Satır:79) export edilmelidir.
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers:{
    // HTTP isteği barındıran ortak metodlar'dan sonra yapılması gerken işlemlerin tanımlandığı yerdir.
        (builder) => {
        builder
        .addCase(fetchUserById.pending, state => { // İstek atılma sürecinde
            state.loading = 'pending'
        })
        .addCase(fetchUserById.fulfilled, (state, action) => { // İstek başarılı ise
            state.loading = 'idle'
            state.entities.push(action.payload)
        })
        .addCase(fetchUserById.rejected, (state, action) => { // İstek hatalı ise
            state.loading = 'idle'
            state.error = action.error.message
        })
    }
  }
});

 // createAsyncThunk ile oluşturulan http metodları için aşağıdaki gibi bir kod yazımına gerek yoktur.
export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;
```

Oluşturulan stateler aşağıdaki gibi istenilen komponentte kullanılabilir:

```jsx
import React from "react";
import type { RootState } from "../../app/store";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "./counterSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.value); // State'deki veri useSelector hook'u ile çekildi
  const dispatch = useDispatch(); // State'deki ortak metodların kullanılması için useDispatch hook'u tanımlandı

  return (
    <div>
      {count}
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </button>
        <span>{count}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
    </div>
  );
}
```

Detaylı Kaynak için Aşağıdaki Videoları inceleyebilirsiniz:
<a href="https://www.youtube.com/watch?v=z1O-oZ46o08&list=PLURN6mxdcwL-xIXzq92ZJN9yRW7Q0mjzw&index=28">Link</a>
<a href="https://www.youtube.com/watch?v=iIPS7DdY-wQ&list=PLURN6mxdcwL-xIXzq92ZJN9yRW7Q0mjzw&index=29">Link</a>
<a href="https://www.youtube.com/watch?v=5hLHpScCSLA&list=PLURN6mxdcwL-xIXzq92ZJN9yRW7Q0mjzw&index=30">Link</a>
Redux DevTools Chrome Eklentisi Kurulumu:
<a href="https://www.youtube.com/watch?v=cAJJ9Hcjbq0&list=PLURN6mxdcwL-xIXzq92ZJN9yRW7Q0mjzw&index=31">Link</a>
