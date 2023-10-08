import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';

const Context = React.createContext({
  Cart: false,
  openCart: () => {},
  closeCart: () => {},
  List: [],
  Merchandise: [],
  CartList: [],
  addCart: () => {},
  removeCart: () => {},
  changeCart: () => {},
  isLogIn: false,
  logIn: () => {},
  logOut: () => {},
  token: null,
  userEmail: '',
  addItemToCart: () => {},
  getCartItems: () => {},
});

export function ContextProvider(props) {
  const crudUrl = 'https://crudcrud.com/api/c0bdd57e7354493db5d572689620db84'; // Replace with your CRUD API URL

  const List = [
    {
      item: "Stereo Hearts",
      id: "Stereo-Hearts",
      // url: "https://c.saavncdn.com/947/Stereo-Hearts-feat-Adam-Levine--English-2011-20190607045815-500x500.jpg",
url:"https://iili.io/JdtBR3P.th.jpg",
      price: "150",
      star: 5,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc blandit, risus vel pulvinar volutpat, dolor neque accumsan dui, id ullamcorper tellus erat non leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec at dolor ac mauris sagittis faucibus eget ac odio. Etiam justo dolor, tincidunt eget mauris vel, malesuada suscipit tortor. Proin semper metus in justo dignissim placerat. Fusce rhoncus, massa in molestie suscipit, nulla orci varius orci, quis finibus ante turpis vitae odio. Suspendisse pellentesque risus eu est vulputate consectetur.",
    },
    {
      item: "The Nights",
      id: "The-Nights",
      url: "https://iili.io/JdtBDPV.th.jpg" ,
      price: "178",
      star: 4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc blandit, risus vel pulvinar volutpat, dolor neque accumsan dui, id ullamcorper tellus erat non leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec at dolor ac mauris sagittis faucibus eget ac odio. Etiam justo dolor, tincidunt eget mauris vel, malesuada suscipit tortor. Proin semper metus in justo dignissim placerat. Fusce rhoncus, massa in molestie suscipit, nulla orci varius orci, quis finibus ante turpis vitae odio. Suspendisse pellentesque risus eu est vulputate consectetur.",
    },
    {
      item: "Rise",
      id: "Rise",
      url: "https://iili.io/JdtCdNa.th.jpg",
      price: "128",
      star: 3,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc blandit, risus vel pulvinar volutpat, dolor neque accumsan dui, id ullamcorper tellus erat non leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec at dolor ac mauris sagittis faucibus eget ac odio. Etiam justo dolor, tincidunt eget mauris vel, malesuada suscipit tortor. Proin semper metus in justo dignissim placerat. Fusce rhoncus, massa in molestie suscipit, nulla orci varius orci, quis finibus ante turpis vitae odio. Suspendisse pellentesque risus eu est vulputate consectetur.",
    },
    {
      item: "Me, Myself & I",
      id: "Me,-Myself-&-I",
      url: "https://iili.io/JdtCfPp.th.jpg",
      price: "195",
      star: 5,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc blandit, risus vel pulvinar volutpat, dolor neque accumsan dui, id ullamcorper tellus erat non leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec at dolor ac mauris sagittis faucibus eget ac odio. Etiam justo dolor, tincidunt eget mauris vel, malesuada suscipit tortor. Proin semper metus in justo dignissim placerat. Fusce rhoncus, massa in molestie suscipit, nulla orci varius orci, quis finibus ante turpis vitae odio. Suspendisse pellentesque risus eu est vulputate consectetur.",
    },
  ];

  const Merchandise = [
    {
      item: "Love it Cup",
      id: "Love-it-Cup",
      url: "https://iili.io/JdtnBXj.th.jpg",
      price: "75",
      star: 3,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc blandit, risus vel pulvinar volutpat, dolor neque accumsan dui, id ullamcorper tellus erat non leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec at dolor ac mauris sagittis faucibus eget ac odio. Etiam justo dolor, tincidunt eget mauris vel, malesuada suscipit tortor. Proin semper metus in justo dignissim placerat. Fusce rhoncus, massa in molestie suscipit, nulla orci varius orci, quis finibus ante turpis vitae odio. Suspendisse pellentesque risus eu est vulputate consectetur.",
    },
    {
      item: "Legendary T-shirt",
      id: "Legendary-T-shirt",
      url: "https://iili.io/JdtnUv9.th.jpg",
      price: "250",
      star: 3,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc blandit, risus vel pulvinar volutpat, dolor neque accumsan dui, id ullamcorper tellus erat non leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec at dolor ac mauris sagittis faucibus eget ac odio. Etiam justo dolor, tincidunt eget mauris vel, malesuada suscipit tortor. Proin semper metus in justo dignissim placerat. Fusce rhoncus, massa in molestie suscipit, nulla orci varius orci, quis finibus ante turpis vitae odio. Suspendisse pellentesque risus eu est vulputate consectetur.",
    },
    {
      item: "Cool Grocery Bag",
      id: "Cool-Grocery-Bag",
      url: "https://iili.io/JdtnmyF.th.jpg",
      price: "100",
      star: 5,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc blandit, risus vel pulvinar volutpat, dolor neque accumsan dui, id ullamcorper tellus erat non leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec at dolor ac mauris sagittis faucibus eget ac odio. Etiam justo dolor, tincidunt eget mauris vel, malesuada suscipit tortor. Proin semper metus in justo dignissim placerat. Fusce rhoncus, massa in molestie suscipit, nulla orci varius orci, quis finibus ante turpis vitae odio. Suspendisse pellentesque risus eu est vulputate consectetur.",
    },
    {
      item: "Premium Bottles",
      id: "Premium-Bottles",
      url: "https://iili.io/JdtoxZG.th.jpg",
      price: "395",
      star: 4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc blandit, risus vel pulvinar volutpat, dolor neque accumsan dui, id ullamcorper tellus erat non leo. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec at dolor ac mauris sagittis faucibus eget ac odio. Etiam justo dolor, tincidunt eget mauris vel, malesuada suscipit tortor. Proin semper metus in justo dignissim placerat. Fusce rhoncus, massa in molestie suscipit, nulla orci varius orci, quis finibus ante turpis vitae odio. Suspendisse pellentesque risus eu est vulputate consectetur.",
    },
  ];

  const [CartList, setCartList] = useState([]);
  const [Cart, setCart] = useState(false);
  const [isLogIn, setLogIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userEmail, setEmail] = useState('');

  // Function to add an item to the cart and post it to the backend
  const addCartToBackend = async (cartData) => {
    try {
      const storeData = JSON.parse(localStorage.getItem('token'));

      if (!storeData.id) {
        const response = await axios.post(`${crudUrl}/${storeData.email}`, {
          cartData: cartData,
        });

        storeData.id = response.data._id;
        localStorage.setItem('token', JSON.stringify(storeData));
      } else {
        await axios.put(`${crudUrl}/${storeData.email}/${storeData.id}`, {
          cartData: cartData,
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Function to get cart items from the backend
  const getCart = useCallback(async () => {
    try {
      const storeData = JSON.parse(localStorage.getItem('token'));

      if (storeData.id) {
        const response = await axios.get(`${crudUrl}/${storeData.email}/${storeData.id}`);
        setCartList(response.data.cartData);
      }
    } catch (error) {
      console.error('Error getting cart:', error);
    }
  }, [crudUrl]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const storeData = JSON.parse(localStorage.getItem('token'));
      setEmail(storeData.email);
      setToken(storeData.token);
      setLogIn(true);
      // Call getCart when a user logs in to retrieve cart items
      getCart();
    }
  }, [getCart]);

  // ... (rest of your code, including logIn, logOut, openCart, closeCart, addCart, removeCart, changeCart functions)
  async function firstCheck(email) {
    try {
      const newResponse = await axios.get(`${crudUrl}/cart/${email}`);
      if (newResponse.data.length !== 0) {
        const storeData = JSON.parse(localStorage.getItem('token'));
        if (!storeData.id) {
          storeData.id = newResponse.data[0]._id;
          localStorage.setItem('token', JSON.stringify(storeData));
        }
        return {
          length: newResponse.data[0].cartData.length,
          cartId: newResponse.data[0]._id,
        };
      } else {
        return { length: 0 };
      }
    } catch (error) {
      console.error('Error checking cart:', error);
    }
  }

  function logIn(id, email) {
    localStorage.setItem(
      'token',
      JSON.stringify({
        token: id,
        email: email.replace(/[^A-Za-z0-9]/gi, ''),
      })
    );
  
    setEmail(email);
    setToken(id);
    setLogIn(true);
  
    // Only set CartList if it's empty, to prevent clearing the cart on login
    if (CartList.length === 0) {
      // Call getCart when a user logs in to retrieve cart items
      getCart();
    }
  }
  

  function logOut() {
    localStorage.removeItem('token');
    setEmail('');
    setToken(null);
    setLogIn(false);
    setCartList([]);
  }

  function openCart() {
    setCart(true);
  }

  function closeCart() {
    setCart(false);
  }

  function addCart(data) {
    if (
      CartList.every((item) => {
        return item.id !== data.id;
      })
    ) {
      data.quantity = 1;
      addCartToBackend([...CartList, data]);
      setCartList((oldCart) => {
        return [...oldCart, data];
      });
    }
  }

  function removeCart(id) {
    addCartToBackend(
      CartList.filter((item) => {
        return item.id !== id;
      })
    );
    setCartList((oldCart) => {
      const cartData = oldCart.filter((item) => {
        return item.id !== id;
      });
      return cartData;
    });
  }

  function changeCart(id, value) {
    let newCartData = CartList.map((item) => {
      if (item.id === id) {
        let Quantity = item.quantity + value;
        if (Quantity > 0) {
          item.quantity = Quantity;
        }
      }
      return item;
    });
    addCartToBackend(newCartData);
    setCartList(newCartData);
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const storeData = JSON.parse(localStorage.getItem('token'));
      setEmail(storeData.email);
      setToken(storeData.token);
      setLogIn(true);
      getCart();
    }
  }, [getCart]);
  async function addItemToCart(item) {
    // Ensure the user is logged in before adding items to the cart
    if (!isLogIn) {
      console.error('User is not logged in.');
      return;
    }

    try {
      // Create a copy of the current cart items with the new item
      const updatedCart = [...CartList, item];

      // Update the cart items in the state
      setCartList(updatedCart);

      // Update the cart items in the backend
      await addCartToBackend(updatedCart);
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  }

  return (
    <Context.Provider
      value={{
        Cart: Cart,
        openCart: openCart,
        closeCart: closeCart,
        List: List,
        Merchandise: Merchandise,
        CartList: CartList,
        addCart: addCart,
        removeCart: removeCart,
        changeCart: changeCart,
        isLogIn: isLogIn,
        userEmail: userEmail,
        logIn: logIn,
        logOut: logOut,
        token: token,
        addItemToCart: addItemToCart,
        getCartItems: getCart,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default Context;
